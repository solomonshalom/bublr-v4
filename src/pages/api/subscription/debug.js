import { firestore, auth } from '../../../lib/firebase'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized - No token provided' })
    }

    const token = authHeader.split('Bearer ')[1]
    const decodedToken = await auth.verifyIdToken(token)

    const envCheck = {
      hasApiKey: !!process.env.LEMONSQUEEZY_API_KEY,
      apiKeyLength: process.env.LEMONSQUEEZY_API_KEY?.length || 0,
      apiKeyPrefix: process.env.LEMONSQUEEZY_API_KEY?.substring(0, 10) || 'not set',
      hasStoreId: !!process.env.LEMONSQUEEZY_STORE_ID,
      storeId: process.env.LEMONSQUEEZY_STORE_ID || 'not set',
      hasVariantId: !!process.env.LEMONSQUEEZY_VARIANT_ID,
      variantId: process.env.LEMONSQUEEZY_VARIANT_ID || 'not set',
      hasWebhookSecret: !!process.env.LEMONSQUEEZY_WEBHOOK_SECRET,
      webhookSecret: process.env.LEMONSQUEEZY_WEBHOOK_SECRET ? 'set (hidden)' : 'not set',
      appUrl: process.env.NEXT_PUBLIC_APP_URL,
      userId: decodedToken.uid,
      userEmail: decodedToken.email
    }

    return res.status(200).json({
      status: 'Debug info',
      provider: 'Lemon Squeezy',
      environment: envCheck,
      issues: [
        !envCheck.hasApiKey && 'LEMONSQUEEZY_API_KEY is not set - Get it from https://app.lemonsqueezy.com/settings/api',
        !envCheck.hasStoreId && 'LEMONSQUEEZY_STORE_ID is not set - Get it from https://app.lemonsqueezy.com/settings/stores',
        !envCheck.hasVariantId && 'LEMONSQUEEZY_VARIANT_ID is not set - Create a subscription product and copy the variant ID',
        !envCheck.hasWebhookSecret && 'LEMONSQUEEZY_WEBHOOK_SECRET is not set - Create a webhook and copy the secret'
      ].filter(Boolean),
      nextSteps: envCheck.issues?.length > 0 ? [
        '1. Go to https://app.lemonsqueezy.com',
        '2. Get your API key from Settings > API',
        '3. Get your Store ID from Settings > Stores',
        '4. Create a subscription product and get the Variant ID',
        '5. Create a webhook at Settings > Webhooks',
        '6. Update your .env.local file',
        '7. Restart your dev server'
      ] : ['All configuration looks good! Try subscribing now.']
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      stack: error.stack
    })
  }
}
