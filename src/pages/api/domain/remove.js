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

    await firestore.collection('users').doc(userId).update({
      customDomain: null,
      domainVerified: false,
      customDomainActive: false,
      domainVerifiedAt: null,
      updatedAt: Date.now()
    })

    return res.status(200).json({ 
      success: true,
      message: 'Custom domain removed successfully'
    })
  } catch (error) {
    console.error('Error removing domain:', error)
    return res.status(500).json({ 
      error: 'Failed to remove domain',
      details: error.message 
    })
  }
}
