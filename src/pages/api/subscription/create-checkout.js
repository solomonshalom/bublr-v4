import { lemonSqueezySetup, createCheckout } from '@lemonsqueezy/lemonsqueezy.js'
import { firestore, auth } from '../../../lib/firebase'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    if (!process.env.LEMON_SQUEEZY_API_KEY) {
      return res.status(500).json({ 
        error: 'Configuration error',
        details: 'LEMON_SQUEEZY_API_KEY is not set in environment variables'
      })
    }

    if (!process.env.LEMON_SQUEEZY_STORE_ID) {
      return res.status(500).json({ 
        error: 'Configuration error',
        details: 'LEMON_SQUEEZY_STORE_ID is not set in environment variables'
      })
    }

    if (!process.env.LEMON_SQUEEZY_VARIANT_ID || 
        process.env.LEMON_SQUEEZY_VARIANT_ID === 'your_product_variant_id') {
      return res.status(500).json({ 
        error: 'Configuration error',
        details: 'LEMON_SQUEEZY_VARIANT_ID is not set or is still a placeholder. Please create a subscription product in Lemon Squeezy dashboard and update .env.local'
      })
    }

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

    lemonSqueezySetup({
      apiKey: process.env.LEMON_SQUEEZY_API_KEY
    })

    const checkout = await createCheckout(
      process.env.LEMON_SQUEEZY_STORE_ID,
      process.env.LEMON_SQUEEZY_VARIANT_ID,
      {
        checkoutData: {
          email: decodedToken.email,
          name: userData.displayName || userData.name,
          custom: {
            user_id: userId
          }
        },
        productOptions: {
          redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'https://bublr.life'}/dashboard?subscription=success`
        }
      }
    )

    await firestore.collection('users').doc(userId).update({
      subscriptionStatus: 'pending',
      updatedAt: Date.now()
    })

    return res.status(200).json({ 
      checkout_url: checkout.data.attributes.url,
      session_id: checkout.data.id
    })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      response: error.response?.data
    })
    return res.status(500).json({ 
      error: 'Failed to create checkout session',
      details: error.message,
      hint: 'Please check that LEMON_SQUEEZY_API_KEY, LEMON_SQUEEZY_STORE_ID, and LEMON_SQUEEZY_VARIANT_ID are set correctly in environment variables'
    })
  }
}
