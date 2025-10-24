import { firestore, auth } from '../../../lib/firebase'
import { validateDomainFormat } from '../../../lib/domain-utils'
import { domainExists } from '../../../lib/db'

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

    if (userData.subscriptionStatus !== 'active') {
      return res.status(403).json({ 
        error: 'Active subscription required',
        message: 'You need an active subscription to use custom domains'
      })
    }

    const { domain } = req.body

    if (!domain) {
      return res.status(400).json({ error: 'Domain is required' })
    }

    const validation = validateDomainFormat(domain)
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error })
    }

    const cleanDomain = validation.domain

    if (userData.customDomain !== cleanDomain) {
      const exists = await domainExists(cleanDomain)
      if (exists) {
        return res.status(400).json({ 
          error: 'Domain already in use',
          message: 'This domain is already registered to another user'
        })
      }
    }

    await firestore.collection('users').doc(userId).update({
      customDomain: cleanDomain,
      domainVerified: false,
      customDomainActive: false,
      domainVerifiedAt: null,
      updatedAt: Date.now()
    })

    return res.status(200).json({ 
      success: true,
      domain: cleanDomain,
      message: 'Domain saved. Please verify DNS settings.'
    })
  } catch (error) {
    console.error('Error setting domain:', error)
    return res.status(500).json({ 
      error: 'Failed to set domain',
      details: error.message 
    })
  }
}
