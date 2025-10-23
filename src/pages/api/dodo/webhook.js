import { Webhooks } from '@dodopayments/nextjs'
import firebase, { firestore } from '../../../lib/firebase'
import { verifySubscriptionActive } from '../../../lib/dodo'

export const config = {
  api: {
    bodyParser: false,
  },
}

const webhookHandler = Webhooks({
  webhookKey: process.env.DODO_WEBHOOK_SECRET,
  onSubscriptionActive: async payload => {
    await upsertSubscriptionState(payload, 'active')
  },
  onSubscriptionCancelled: async payload => {
    await upsertSubscriptionState(payload, 'cancelled')
  },
  onSubscriptionExpired: async payload => {
    await upsertSubscriptionState(payload, 'expired')
  },
  onSubscriptionFailed: async payload => {
    await upsertSubscriptionState(payload, 'failed')
  },
  onSubscriptionOnHold: async payload => {
    await upsertSubscriptionState(payload, 'on_hold')
  },
  onPayload: async payload => {
    await upsertSubscriptionState(payload, payload?.data?.status || 'received')
  },
})

async function readRawBody(req) {
  const chunks = []
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }

  return Buffer.concat(chunks).toString('utf8')
}

function buildRequest(req, rawBody) {
  const protocol = req.headers['x-forwarded-proto'] || 'https'
  const host = req.headers['host']
  const url = `${protocol}://${host}${req.url}`

  const headers = new Headers(req.headers)
  if (rawBody) {
    headers.set('content-length', Buffer.byteLength(rawBody).toString())
  }

  return new Request(url, {
    method: req.method,
    headers,
    body: rawBody,
  })
}

async function sendResponse(response, res) {
  const headers = Object.fromEntries(response.headers.entries())
  Object.entries(headers).forEach(([key, value]) => {
    res.setHeader(key, value)
  })

  const text = await response.text()
  try {
    const data = text ? JSON.parse(text) : null
    res.status(response.status).json(data)
  } catch (error) {
    res.status(response.status).send(text)
  }
}

function extractSubscriptionMetadata(payload) {
  const data = payload?.data || payload
  const metadata = data?.metadata || {}

  return {
    subscriptionId: data?.id || data?.subscription_id,
    status: data?.status,
    customerId: data?.customer_id || metadata?.customer_id,
    uid: metadata?.uid || metadata?.userId || metadata?.user_id,
  }
}

async function upsertSubscriptionState(payload, status) {
  const { subscriptionId, customerId, uid } = extractSubscriptionMetadata(payload)
  if (!uid) {
    console.warn('Received subscription webhook without uid metadata')
    return
  }

  const verification = await verifySubscriptionActive(subscriptionId)
  const isActive = verification.active
  const resolvedCustomerId = customerId || verification.customerId

  const update = {
    customDomainStatus: isActive ? 'active' : status,
    customDomainSubscriptionId: subscriptionId || null,
    customDomainLastVerifiedAt: firebase.firestore.FieldValue.serverTimestamp(),
  }

  if (resolvedCustomerId) {
    update.dodoCustomerId = resolvedCustomerId
  }

  await firestore.collection('users').doc(uid).set(update, { merge: true })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }

  try {
    const rawBody = await readRawBody(req)
    const response = await webhookHandler.POST(buildRequest(req, rawBody))
    await sendResponse(response, res)
  } catch (error) {
    console.error('Failed to process webhook', error)
    res.status(500).json({ error: 'Webhook handling failed' })
  }
}
