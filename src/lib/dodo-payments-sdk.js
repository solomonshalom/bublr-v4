import axios from 'axios'

const DEFAULT_BASE_URL = 'https://api.dodo-payments.com/v1'

export class DodoPaymentsSDK {
  constructor({ apiKey, baseUrl } = {}) {
    if (!apiKey) {
      throw new Error('Dodo Payments API key is required')
    }

    this.apiKey = apiKey
    this.baseUrl = baseUrl || DEFAULT_BASE_URL
    this.http = axios.create({
      baseURL: this.baseUrl,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
    })
  }

  async createSubscriptionSession({
    amount,
    currency,
    interval,
    successUrl,
    cancelUrl,
    metadata = {},
    description,
  }) {
    const { data } = await this.http.post('/subscriptions', {
      amount,
      currency,
      interval,
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata,
      description,
    })

    if (!data || !data.checkout_url || !data.subscription_id) {
      throw new Error('Invalid response from Dodo Payments when creating subscription')
    }

    return {
      checkoutUrl: data.checkout_url,
      subscriptionId: data.subscription_id,
      status: data.status || 'pending',
    }
  }

  async retrieveSubscription(subscriptionId) {
    if (!subscriptionId) {
      throw new Error('Subscription id is required')
    }

    const { data } = await this.http.get(`/subscriptions/${subscriptionId}`)

    if (!data || !data.id || !data.status) {
      throw new Error('Invalid response from Dodo Payments when retrieving subscription')
    }

    return {
      id: data.id,
      status: data.status,
      currentPeriodEnd: data.current_period_end,
      cancelAtPeriodEnd: data.cancel_at_period_end,
    }
  }
}

export function createDodoPaymentsClient() {
  const apiKey = process.env.DODO_PAYMENTS_API_KEY

  if (!apiKey) {
    throw new Error('Missing Dodo Payments credentials')
  }

  return new DodoPaymentsSDK({
    apiKey,
    baseUrl: process.env.DODO_PAYMENTS_API_BASE_URL,
  })
}
