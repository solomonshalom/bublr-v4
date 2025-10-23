const LIVE_BASE_URL = 'https://api.dodopayments.com';
const TEST_BASE_URL = 'https://api.sandbox.dodopayments.com';

const SUBSCRIPTION_ACTIVE_STATES = new Set(['active', 'trialing']);

function getApiBase() {
  const env = process.env.DODO_PAYMENTS_ENVIRONMENT?.toLowerCase();
  if (env && env.includes('test')) {
    return TEST_BASE_URL;
  }
  return LIVE_BASE_URL;
}

function getAuthHeaders() {
  const token = process.env.DODO_PAYMENTS_API_KEY;
  if (!token) {
    throw new Error('DODO_PAYMENTS_API_KEY environment variable is not configured.');
  }

  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

export async function verifySubscriptionActive(subscriptionId) {
  if (!subscriptionId) {
    return { active: false, status: 'missing', customerId: null };
  }

  const baseUrl = getApiBase();
  const url = `${baseUrl}/subscriptions/${subscriptionId}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const statusText = await response.text().catch(() => response.statusText);
      console.warn('Failed to verify subscription', response.status, statusText);
      return { active: false, status: 'unknown', customerId: null };
    }

    const payload = await response.json();
    const status = payload?.status || payload?.state || 'unknown';
    const customerId = payload?.customer_id || payload?.customerId || null;

    return {
      active: SUBSCRIPTION_ACTIVE_STATES.has(status),
      status,
      customerId,
      payload,
    };
  } catch (error) {
    console.error('Error verifying subscription', error);
    return { active: false, status: 'error', customerId: null };
  }
}

export async function cancelSubscription(subscriptionId) {
  if (!subscriptionId) {
    return { success: false, status: 'missing' };
  }

  const baseUrl = getApiBase();
  const url = `${baseUrl}/subscriptions/${subscriptionId}`;

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      const message = await response.text().catch(() => response.statusText);
      return { success: false, status: message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error cancelling subscription', error);
    return { success: false, status: 'error' };
  }
}

export function ensureCheckoutConfiguration() {
  const missing = [];

  if (!process.env.DODO_PAYMENTS_API_KEY) {
    missing.push('DODO_PAYMENTS_API_KEY');
  }

  if (!process.env.DODO_PAYMENTS_CUSTOM_DOMAIN_PLAN_ID) {
    missing.push('DODO_PAYMENTS_CUSTOM_DOMAIN_PLAN_ID');
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing Dodo Payments configuration: ${missing.join(', ')}. Add them to your environment settings.`,
    );
  }
}

export function buildCheckoutSessionPayload({ uid, email, metadata = {} }) {
  ensureCheckoutConfiguration();

  const priceId = process.env.DODO_PAYMENTS_CUSTOM_DOMAIN_PLAN_ID;
  const returnUrl = process.env.DODO_PAYMENTS_RETURN_URL;

  return {
    mode: 'subscription',
    prices: [
      {
        price_id: priceId,
        quantity: 1,
      },
    ],
    success_url: returnUrl || undefined,
    cancel_url: returnUrl || undefined,
    customer_email: email,
    metadata: {
      feature: 'custom_domain',
      uid,
      ...metadata,
    },
  };
}
