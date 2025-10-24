import crypto from 'crypto'
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
    const signature = req.headers['x-signature']
    
    if (!signature) {
      console.error('No webhook signature found')
      return res.status(400).json({ error: 'No signature provided' })
    }

    const hmac = crypto.createHmac('sha256', process.env.LEMON_SQUEEZY_WEBHOOK_SECRET)
    hmac.update(rawBody)
    const digest = hmac.digest('hex')
    
    if (digest !== signature) {
      console.error('Webhook signature verification failed')
      return res.status(400).json({ error: 'Invalid signature' })
    }

    const event = JSON.parse(rawBody)

    console.log('Webhook event received:', event.meta.event_name)

    const userId = event.meta.custom_data?.user_id
    
    if (!userId) {
      console.error('No user ID in webhook payload')
      return res.status(400).json({ error: 'No user ID in custom data' })
    }

    const userDoc = await firestore.collection('users').doc(userId).get()

    if (!userDoc.exists) {
      console.error('User not found:', userId)
      return res.status(404).json({ error: 'User not found' })
    }

    const subscriptionId = event.data.id
    const eventName = event.meta.event_name
    const subscriptionStatus = event.data.attributes?.status

    switch (eventName) {
      case 'subscription_created':
      case 'subscription_payment_success':
        await firestore.collection('users').doc(userId).update({
          subscriptionId: subscriptionId,
          subscriptionStatus: 'active',
          subscriptionExpiresAt: null,
          updatedAt: Date.now()
        })
        break

      case 'subscription_payment_failed':
        await firestore.collection('users').doc(userId).update({
          subscriptionStatus: 'past_due',
          updatedAt: Date.now()
        })
        break

      case 'subscription_payment_recovered':
        await firestore.collection('users').doc(userId).update({
          subscriptionStatus: 'active',
          subscriptionExpiresAt: null,
          updatedAt: Date.now()
        })
        break

      case 'subscription_cancelled':
        await firestore.collection('users').doc(userId).update({
          subscriptionStatus: 'cancelled',
          subscriptionExpiresAt: firebase.firestore.Timestamp.now(),
          updatedAt: Date.now()
        })
        break

      case 'subscription_expired':
        await firestore.collection('users').doc(userId).update({
          subscriptionStatus: 'expired',
          customDomainActive: false,
          subscriptionExpiresAt: firebase.firestore.Timestamp.now(),
          updatedAt: Date.now()
        })
        break

      case 'subscription_paused':
        await firestore.collection('users').doc(userId).update({
          subscriptionStatus: 'paused',
          updatedAt: Date.now()
        })
        break

      case 'subscription_unpaused':
        await firestore.collection('users').doc(userId).update({
          subscriptionStatus: 'active',
          updatedAt: Date.now()
        })
        break

      default:
        console.log('Unhandled event type:', eventName)
    }

    return res.status(200).json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return res.status(500).json({ error: 'Webhook processing failed' })
  }
}
