import { firestore } from '../../../lib/firebase'
import { createDodoPaymentsClient } from '../../../lib/dodo-payments-sdk'

const DEFAULT_SUCCESS_PATH = '/settings?customDomain=success'
const DEFAULT_CANCEL_PATH = '/settings?customDomain=cancelled'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end('Method Not Allowed')
  }

  const { uid } = req.body || {}

  if (!uid) {
    return res.status(400).json({ error: 'Missing user identifier' })
  }

  try {
    const client = createDodoPaymentsClient()

    const origin = req.headers.origin || process.env.NEXT_PUBLIC_APP_URL
    const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null
    const fallbackBase = process.env.NEXT_PUBLIC_APP_URL || 'https://bublr.life'
    const baseUrl = origin || vercelUrl || fallbackBase

    const { checkoutUrl, subscriptionId } = await client.createSubscriptionSession({
      amount: 200,
      currency: 'USD',
      interval: 'month',
      successUrl: `${baseUrl || ''}${DEFAULT_SUCCESS_PATH}`,
      cancelUrl: `${baseUrl || ''}${DEFAULT_CANCEL_PATH}`,
      metadata: { uid },
      description: 'Bublr Custom Domain Access',
    })

    await firestore
      .collection('users')
      .doc(uid)
      .set(
        {
          customDomainSubscription: {
            status: 'pending',
            subscriptionId,
            lastCheckoutCreatedAt: Date.now(),
          },
        },
        { merge: true },
      )

    return res.status(200).json({ checkoutUrl })
  } catch (error) {
    console.error('[dodo] create-checkout-session failed', error)
    return res.status(500).json({
      error: error?.message || 'Unable to create checkout session',
    })
  }
}
