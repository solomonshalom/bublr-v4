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
    const userId = decodedToken.uid

    const userDoc = await firestore.collection('users').doc(userId).get()
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' })
    }

    const userData = userDoc.data()

    const isActive = userData.subscriptionStatus === 'active' || 
                     userData.subscriptionStatus === 'past_due' ||
                     userData.subscriptionStatus === 'on_trial'

    const isPastDue = userData.subscriptionStatus === 'past_due'

    return res.status(200).json({
      subscriptionStatus: userData.subscriptionStatus || 'none',
      subscriptionId: userData.subscriptionId || null,
      isActive,
      isPastDue,
      customDomain: userData.customDomain || null,
      customDomainActive: userData.customDomainActive || false,
      domainVerified: userData.domainVerified || false,
      domainVerifiedAt: userData.domainVerifiedAt ? userData.domainVerifiedAt.toDate().getTime() : null
    })
  } catch (error) {
    console.error('Error fetching subscription status:', error)
    return res.status(500).json({ 
      error: 'Failed to fetch subscription status',
      details: error.message 
    })
  }
}
