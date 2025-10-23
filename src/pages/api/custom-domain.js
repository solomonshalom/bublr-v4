import firebase, { firestore } from '../../lib/firebase'
import { userWithCustomDomainExists } from '../../lib/db'
import { verifySubscriptionActive } from '../../lib/dodo'
import { isValidDomain } from '../../lib/utils'

function normaliseDomain(domain) {
  return domain?.trim().toLowerCase()
}

async function getUserSnapshot(uid) {
  if (!uid) {
    throw new Error('Missing uid')
  }

  const snapshot = await firestore.collection('users').doc(uid).get()
  if (!snapshot.exists) {
    const error = new Error('User not found')
    error.statusCode = 404
    throw error
  }

  return snapshot
}

async function resolveSubscriptionState(subscriptionId) {
  const verification = await verifySubscriptionActive(subscriptionId)
  return {
    active: verification.active,
    status: verification.status,
    customerId: verification.customerId,
    raw: verification.payload,
  }
}

export default async function handler(req, res) {
  const { method } = req

  try {
    if (method === 'GET') {
      const { uid } = req.query || {}
      const snapshot = await getUserSnapshot(uid)
      const data = snapshot.data()
      const subscriptionId = data.customDomainSubscriptionId
      const verification = await resolveSubscriptionState(subscriptionId)

      res.status(200).json({
        domain: data.customDomain || '',
        status: data.customDomainStatus || 'inactive',
        subscriptionId: subscriptionId || null,
        subscriptionActive: verification.active,
        subscriptionStatus: verification.status,
        customerId: data.dodoCustomerId || verification.customerId || null,
        lastVerifiedAt: data.customDomainLastVerifiedAt?.toMillis?.() || null,
      })
      return
    }

    if (method === 'POST') {
      const { uid, domain } = req.body || {}
      if (!uid || !domain) {
        res.status(400).json({ error: 'Missing uid or domain' })
        return
      }

      const normalised = normaliseDomain(domain)
      if (!isValidDomain(normalised)) {
        res.status(400).json({ error: 'Enter a valid domain (e.g. example.com)' })
        return
      }

      const domainInUse = await userWithCustomDomainExists(normalised, { excludeUserId: uid })
      if (domainInUse) {
        res.status(409).json({ error: 'That domain is already linked to another profile' })
        return
      }

      const snapshot = await getUserSnapshot(uid)
      const data = snapshot.data()
      const subscriptionId = data.customDomainSubscriptionId

      if (!subscriptionId) {
        res.status(402).json({ error: 'Custom domain access requires an active subscription' })
        return
      }

      const verification = await resolveSubscriptionState(subscriptionId)
      if (!verification.active) {
        res.status(402).json({ error: 'Subscription is not active. Update your billing to continue.' })
        return
      }

      const update = {
        customDomain: normalised,
        customDomainStatus: 'active',
        customDomainLastVerifiedAt: firebase.firestore.FieldValue.serverTimestamp(),
      }

      if (verification.customerId && !data.dodoCustomerId) {
        update.dodoCustomerId = verification.customerId
      }

      await firestore.collection('users').doc(uid).set(update, { merge: true })

      res.status(200).json({
        domain: normalised,
        status: 'active',
        subscriptionId,
        subscriptionActive: true,
      })
      return
    }

    if (method === 'DELETE') {
      const { uid } = req.body || {}
      if (!uid) {
        res.status(400).json({ error: 'Missing uid' })
        return
      }

      await firestore
        .collection('users')
        .doc(uid)
        .set(
          {
            customDomain: firebase.firestore.FieldValue.delete(),
            customDomainStatus: 'inactive',
            customDomainLastVerifiedAt: firebase.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true },
        )

      res.status(200).json({ status: 'inactive' })
      return
    }

    res.setHeader('Allow', ['GET', 'POST', 'DELETE'])
    res.status(405).json({ error: 'Method Not Allowed' })
  } catch (error) {
    const status = error.statusCode || 500
    console.error('Custom domain handler error', error)
    res.status(status).json({ error: error.message || 'Unexpected error' })
  }
}
