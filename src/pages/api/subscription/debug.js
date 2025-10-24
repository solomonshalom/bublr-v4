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
      hasApiKey: !!process.env.LEMON_SQUEEZY_API_KEY,
      apiKeyLength: process.env.LEMON_SQUEEZY_API_KEY?.length || 0,
      apiKeyPrefix: process.env.LEMON_SQUEEZY_API_KEY?.substring(0, 10) || 'not set',
      hasStoreId: !!process.env.LEMON_SQUEEZY_STORE_ID,
      storeId: process.env.LEMON_SQUEEZY_STORE_ID || 'not set',
      hasVariantId: !!process.env.LEMON_SQUEEZY_VARIANT_ID,
      variantId: process.env.LEMON_SQUEEZY_VARIANT_ID === 'your_product_variant_id' 
        ? 'PLACEHOLDER - NEEDS TO BE SET!' 
        : process.env.LEMON_SQUEEZY_VARIANT_ID || 'not set',
      hasWebhookSecret: !!process.env.LEMON_SQUEEZY_WEBHOOK_SECRET,
      webhookSecret: process.env.LEMON_SQUEEZY_WEBHOOK_SECRET === 'your_webhook_secret'
        ? 'PLACEHOLDER - NEEDS TO BE SET!'
        : 'set',
      appUrl: process.env.NEXT_PUBLIC_APP_URL,
      userId: decodedToken.uid,
      userEmail: decodedToken.email
    }

    return res.status(200).json({
      status: 'Debug info',
      environment: envCheck,
      issues: [
        !envCheck.hasApiKey && 'LEMON_SQUEEZY_API_KEY is not set',
        !envCheck.hasStoreId && 'LEMON_SQUEEZY_STORE_ID is not set',
        envCheck.variantId === 'PLACEHOLDER - NEEDS TO BE SET!' && 'LEMON_SQUEEZY_VARIANT_ID needs to be updated',
        envCheck.webhookSecret === 'PLACEHOLDER - NEEDS TO BE SET!' && 'LEMON_SQUEEZY_WEBHOOK_SECRET needs to be updated'
      ].filter(Boolean)
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      stack: error.stack
    })
  }
}
