import { firestore } from '../../../lib/firebase'
import { createDodoPaymentsClient } from '../../../lib/dodo-payments-sdk'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end('Method Not Allowed')
  }

  const { subscriptionId, uid } = req.body || {}

  if (!subscriptionId || !uid) {
    return res.status(400).json({ error: 'Missing subscription details' })
  }

  try {
    const client = createDodoPaymentsClient()
    const subscription = await client.retrieveSubscription(subscriptionId)

    const updates = {
      customDomainSubscription: {
        subscriptionId,
        status: subscription.status,
        lastSyncedAt: Date.now(),
        currentPeriodEnd: subscription.currentPeriodEnd || null,
        cancelAtPeriodEnd: subscription.cancelAtPeriodEnd || false,
      },
    }

    if (subscription.status !== 'active') {
      updates.customDomain = null
    }

    await firestore.collection('users').doc(uid).set(updates, { merge: true })

    return res.status(200).json({ status: subscription.status })
  } catch (error) {
    console.error('[dodo] refresh-subscription failed', error)
    return res.status(500).json({ error: error?.message || 'Unable to refresh subscription' })
  }
}
