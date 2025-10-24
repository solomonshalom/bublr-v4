import { Webhook } from 'standardwebhooks'
import { firestore } from '../../../lib/firebase'
import firebase from '../../../lib/firebase'

export const config = {
  api: {
    bodyParser: false,
  },
}

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', chunk => {
      data += chunk
    })
    req.on('end', () => {
      resolve(data)
    })
    req.on('error', reject)
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const rawBody = await getRawBody(req)
    const signature = req.headers['webhook-signature'] || req.headers['x-webhook-signature']
    
    if (!signature) {
      console.error('No webhook signature found')
      return res.status(400).json({ error: 'No signature provided' })
    }

    const webhook = new Webhook(process.env.DODO_WEBHOOK_SECRET)
    
    let event
    try {
      event = webhook.verify(rawBody, {
        'webhook-signature': signature,
        'webhook-id': req.headers['webhook-id'] || '',
        'webhook-timestamp': req.headers['webhook-timestamp'] || ''
      })
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return res.status(400).json({ error: 'Invalid signature' })
    }

    const eventData = typeof event === 'string' ? JSON.parse(event) : event

    console.log('Webhook event received:', eventData.event_type)

    const subscriptionId = eventData.data?.subscription_id || eventData.subscription_id
    
    if (!subscriptionId) {
      console.error('No subscription ID in webhook payload')
      return res.status(400).json({ error: 'No subscription ID' })
    }

    const usersQuery = await firestore
      .collection('users')
      .where('subscriptionId', '==', subscriptionId)
      .get()

    if (usersQuery.empty) {
      console.error('User not found for subscription:', subscriptionId)
      return res.status(404).json({ error: 'User not found' })
    }

    const userDoc = usersQuery.docs[0]
    const userId = userDoc.id

    switch (eventData.event_type) {
      case 'subscription.active':
      case 'subscription.activated':
      case 'subscription.created':
        await firestore.collection('users').doc(userId).update({
          subscriptionStatus: 'active',
          subscriptionExpiresAt: null,
          subscriptionGracePeriodEnds: null,
          updatedAt: Date.now()
        })
        break

      case 'subscription.renewed':
        await firestore.collection('users').doc(userId).update({
          subscriptionStatus: 'active',
          subscriptionExpiresAt: null,
          subscriptionGracePeriodEnds: null,
          updatedAt: Date.now()
        })
        break

      case 'subscription.on_hold':
      case 'subscription.payment_failed':
        const gracePeriodEnd = new Date()
        gracePeriodEnd.setDate(gracePeriodEnd.getDate() + 3)
        
        await firestore.collection('users').doc(userId).update({
          subscriptionStatus: 'on_hold',
          subscriptionExpiresAt: firebase.firestore.Timestamp.now(),
          subscriptionGracePeriodEnds: firebase.firestore.Timestamp.fromDate(gracePeriodEnd),
          updatedAt: Date.now()
        })
        break

      case 'subscription.cancelled':
      case 'subscription.expired':
        await firestore.collection('users').doc(userId).update({
          subscriptionStatus: 'cancelled',
          customDomainActive: false,
          subscriptionExpiresAt: firebase.firestore.Timestamp.now(),
          updatedAt: Date.now()
        })
        break

      default:
        console.log('Unhandled event type:', eventData.event_type)
    }

    return res.status(200).json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return res.status(500).json({ error: 'Webhook processing failed' })
  }
}
