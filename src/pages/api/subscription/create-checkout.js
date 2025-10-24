import DodoPayments from 'dodopayments'
import { firestore, auth } from '../../../lib/firebase'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized - No token provided' })
    }

    const token = authHeader.split('Bearer ')[1]
    const decodedToken = await auth.verifyIdToken(token)
    const userId = decodedToken.uid

    const userDoc = await firestore.collection('users').doc(userId).get()
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' })
    }

    const userData = userDoc.data()

    if (userData.subscriptionStatus === 'active') {
      return res.status(400).json({ error: 'You already have an active subscription' })
    }

    const dodo = new DodoPayments({
      bearerToken: process.env.DODO_PAYMENTS_API_KEY
    })

    const checkoutSession = await dodo.subscriptions.create({
      payment_link: process.env.DODO_SUBSCRIPTION_PRODUCT_ID,
      customer: {
        email: decodedToken.email,
        name: userData.displayName || userData.name
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://bublr.life'}/dashboard?subscription=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://bublr.life'}/dashboard?subscription=cancelled`
    })

    await firestore.collection('users').doc(userId).update({
      subscriptionId: checkoutSession.subscription_id || null,
      subscriptionStatus: 'pending',
      updatedAt: Date.now()
    })

    return res.status(200).json({ 
      payment_link: checkoutSession.payment_link,
      subscription_id: checkoutSession.subscription_id
    })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return res.status(500).json({ 
      error: 'Failed to create checkout session',
      details: error.message 
    })
  }
}
