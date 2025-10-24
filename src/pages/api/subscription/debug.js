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
      hasApiKey: !!process.env.DODO_PAYMENTS_API_KEY,
      apiKeyLength: process.env.DODO_PAYMENTS_API_KEY?.length || 0,
      apiKeyPrefix: process.env.DODO_PAYMENTS_API_KEY?.substring(0, 10) || 'not set',
      hasProductId: !!process.env.DODO_SUBSCRIPTION_PRODUCT_ID,
      productId: process.env.DODO_SUBSCRIPTION_PRODUCT_ID === 'your_product_id_here' 
        ? 'PLACEHOLDER - NEEDS TO BE SET!' 
        : process.env.DODO_SUBSCRIPTION_PRODUCT_ID || 'not set',
      hasWebhookSecret: !!process.env.DODO_WEBHOOK_SECRET,
      webhookSecret: process.env.DODO_WEBHOOK_SECRET === 'your_webhook_secret_here'
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
        !envCheck.hasApiKey && 'DODO_PAYMENTS_API_KEY is not set',
        envCheck.productId === 'PLACEHOLDER - NEEDS TO BE SET!' && 'DODO_SUBSCRIPTION_PRODUCT_ID needs to be updated',
        envCheck.webhookSecret === 'PLACEHOLDER - NEEDS TO BE SET!' && 'DODO_WEBHOOK_SECRET needs to be updated'
      ].filter(Boolean)
    })
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      stack: error.stack
    })
  }
}
