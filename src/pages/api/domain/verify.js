import { firestore, auth } from '../../../lib/firebase'
import firebase from '../../../lib/firebase'
import { verifyDNS } from '../../../lib/domain-utils'

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

    if (!userData.customDomain) {
      return res.status(400).json({ 
        error: 'No domain set',
        message: 'Please set a custom domain first'
      })
    }

    if (userData.subscriptionStatus !== 'active' && userData.subscriptionStatus !== 'past_due') {
      return res.status(403).json({ 
        error: 'Active subscription required',
        message: 'Your subscription must be active to verify a domain'
      })
    }

    const targetDomain = process.env.NEXT_PUBLIC_APP_DOMAIN || 'bublr.life'
    
    const verification = await verifyDNS(userData.customDomain, targetDomain)

    if (verification.verified) {
      await firestore.collection('users').doc(userId).update({
        domainVerified: true,
        customDomainActive: true,
        domainVerifiedAt: firebase.firestore.Timestamp.now(),
        updatedAt: Date.now()
      })

      return res.status(200).json({
        verified: true,
        message: 'Domain verified successfully!',
        recordType: verification.recordType,
        domain: userData.customDomain
      })
    } else {
      return res.status(400).json({
        verified: false,
        error: verification.error,
        message: 'DNS verification failed',
        domain: userData.customDomain
      })
    }
  } catch (error) {
    console.error('Error verifying domain:', error)
    return res.status(500).json({ 
      error: 'Failed to verify domain',
      details: error.message 
    })
  }
}
