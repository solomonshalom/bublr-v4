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

    let isInGracePeriod = false
    let gracePeriodDaysLeft = 0

    if (userData.subscriptionStatus === 'on_hold' && userData.subscriptionGracePeriodEnds) {
      const now = new Date()
      const gracePeriodEnd = userData.subscriptionGracePeriodEnds.toDate()
      
      if (now < gracePeriodEnd) {
        isInGracePeriod = true
        const diffTime = gracePeriodEnd - now
        gracePeriodDaysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      } else {
        await firestore.collection('users').doc(userId).update({
          subscriptionStatus: 'cancelled',
          customDomainActive: false,
          updatedAt: Date.now()
        })
        
        return res.status(200).json({
          subscriptionStatus: 'cancelled',
          isActive: false,
          customDomain: userData.customDomain || null,
          customDomainActive: false,
          domainVerified: userData.domainVerified || false
        })
      }
    }

    const isActive = userData.subscriptionStatus === 'active' || 
                     (userData.subscriptionStatus === 'on_hold' && isInGracePeriod)

    return res.status(200).json({
      subscriptionStatus: userData.subscriptionStatus || 'none',
      subscriptionId: userData.subscriptionId || null,
      isActive,
      isInGracePeriod,
      gracePeriodDaysLeft,
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
