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

function verifySignature(rawBody, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret)
  const digest = hmac.update(rawBody).digest('hex')
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature))
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

    if (!process.env.LEMONSQUEEZY_WEBHOOK_SECRET) {
      console.error('LEMONSQUEEZY_WEBHOOK_SECRET not configured')
      return res.status(500).json({ error: 'Webhook secret not configured' })
    }

    // Verify webhook signature
    const isValid = verifySignature(rawBody, signature, process.env.LEMONSQUEEZY_WEBHOOK_SECRET)
    if (!isValid) {
      console.error('Invalid webhook signature')
      return res.status(400).json({ error: 'Invalid signature' })
    }

    const event = JSON.parse(rawBody)
    const eventName = event.meta.event_name
    const subscriptionId = event.data.id
    const customData = event.data.attributes.first_subscription_item?.subscription_id || 
                       event.data.attributes.custom_data?.user_id

    console.log('Webhook event received:', eventName, 'Subscription ID:', subscriptionId)

    // Find user by custom data or subscription ID
    let userId = customData
    if (!userId) {
      // Try to find user by subscription ID
      const usersQuery = await firestore
        .collection('users')
        .where('subscriptionId', '==', subscriptionId)
        .get()

      if (!usersQuery.empty) {
        userId = usersQuery.docs[0].id
      }
    }

    if (!userId) {
      console.error('User not found for subscription:', subscriptionId)
      return res.status(404).json({ error: 'User not found' })
    }

    // Handle different subscription events
    switch (eventName) {
      case 'subscription_created':
        await firestore.collection('users').doc(userId).update({
          subscriptionId: subscriptionId,
          subscriptionStatus: 'active',
          subscriptionExpiresAt: null,
          subscriptionGracePeriodEnds: null,
          updatedAt: Date.now()
        })
        break

      case 'subscription_updated':
        const status = event.data.attributes.status
        const updateData = {
          subscriptionStatus: status === 'active' ? 'active' : status,
          updatedAt: Date.now()
        }

        if (status === 'active') {
          updateData.subscriptionExpiresAt = null
          updateData.subscriptionGracePeriodEnds = null
        }

        await firestore.collection('users').doc(userId).update(updateData)
        break

      case 'subscription_payment_success':
      case 'subscription_payment_recovered':
        await firestore.collection('users').doc(userId).update({
          subscriptionStatus: 'active',
          subscriptionExpiresAt: null,
          subscriptionGracePeriodEnds: null,
          updatedAt: Date.now()
        })
        break

      case 'subscription_payment_failed':
        const gracePeriodEnd = new Date()
        gracePeriodEnd.setDate(gracePeriodEnd.getDate() + 3)
        
        await firestore.collection('users').doc(userId).update({
          subscriptionStatus: 'on_hold',
          subscriptionExpiresAt: firebase.firestore.Timestamp.now(),
          subscriptionGracePeriodEnds: firebase.firestore.Timestamp.fromDate(gracePeriodEnd),
          updatedAt: Date.now()
        })
        break

      case 'subscription_cancelled':
      case 'subscription_expired':
      case 'subscription_paused':
        await firestore.collection('users').doc(userId).update({
          subscriptionStatus: 'cancelled',
          customDomainActive: false,
          subscriptionExpiresAt: firebase.firestore.Timestamp.now(),
          updatedAt: Date.now()
        })
        break

      case 'subscription_resumed':
      case 'subscription_unpaused':
        await firestore.collection('users').doc(userId).update({
          subscriptionStatus: 'active',
          subscriptionExpiresAt: null,
          subscriptionGracePeriodEnds: null,
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
