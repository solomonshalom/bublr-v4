import { lemonSqueezySetup, createCheckout } from '@lemonsqueezy/lemonsqueezy.js'
import { firestore, auth } from '../../../lib/firebase'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Validate environment variables first
    if (!process.env.LEMONSQUEEZY_API_KEY) {
      return res.status(500).json({ 
        error: 'Configuration error',
        details: 'LEMONSQUEEZY_API_KEY is not set in environment variables'
      })
    }

    if (!process.env.LEMONSQUEEZY_STORE_ID) {
      return res.status(500).json({ 
        error: 'Configuration error',
        details: 'LEMONSQUEEZY_STORE_ID is not set. Get it from Settings > Stores in Lemon Squeezy dashboard'
      })
    }

    if (!process.env.LEMONSQUEEZY_VARIANT_ID) {
      return res.status(500).json({ 
        error: 'Configuration error',
        details: 'LEMONSQUEEZY_VARIANT_ID is not set. Create a subscription product and copy the variant ID'
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

    // Configure Lemon Squeezy
    lemonSqueezySetup({
      apiKey: process.env.LEMONSQUEEZY_API_KEY,
      onError: (error) => console.error('Lemon Squeezy Error:', error)
    })

    // Create checkout session
    const checkout = await createCheckout(
      process.env.LEMONSQUEEZY_STORE_ID,
      process.env.LEMONSQUEEZY_VARIANT_ID,
      {
        checkoutData: {
          email: decodedToken.email,
          name: userData.displayName || userData.name,
          custom: {
            user_id: userId
          }
        },
        checkoutOptions: {
          embed: false,
          media: true,
          logo: true,
          desc: true,
          discount: true,
          dark: false,
          subscriptionPreview: true,
          buttonColor: '#7C3AED'
        },
        expiresAt: null,
        preview: false,
        testMode: process.env.NODE_ENV !== 'production'
      }
    )

    if (checkout.error) {
      throw new Error(checkout.error.message || 'Failed to create checkout')
    }

    // Update user subscription status to pending
    await firestore.collection('users').doc(userId).update({
      subscriptionStatus: 'pending',
      updatedAt: Date.now()
    })

    return res.status(200).json({ 
      checkout_url: checkout.data.data.attributes.url,
      checkout_id: checkout.data.data.id
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
      hint: 'Please check that LEMONSQUEEZY_API_KEY, LEMONSQUEEZY_STORE_ID, and LEMONSQUEEZY_VARIANT_ID are set correctly'
    })
  }
}
