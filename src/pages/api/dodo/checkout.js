import { Checkout } from '@dodopayments/nextjs'

import { buildCheckoutSessionPayload, ensureCheckoutConfiguration } from '../../../lib/dodo'

const checkoutHandler = Checkout({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY,
  returnUrl: process.env.DODO_PAYMENTS_RETURN_URL,
  environment: process.env.DODO_PAYMENTS_ENVIRONMENT,
  type: 'session',
})

function buildRequest(req, body) {
  const protocol = req.headers['x-forwarded-proto'] || 'https'
  const host = req.headers['host']
  const url = `${protocol}://${host}${req.url}`

  const init = {
    method: req.method,
    headers: new Headers(req.headers),
  }

  if (body && req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = JSON.stringify(body)
    init.headers.set('content-type', 'application/json')
  } else if (req.method !== 'GET' && req.method !== 'HEAD' && req.body) {
    init.body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body)
    if (!init.headers.has('content-type')) {
      init.headers.set('content-type', 'application/json')
    }
  }

  return new Request(url, init)
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

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method === 'POST') {
    try {
      ensureCheckoutConfiguration()

      const { uid, email, metadata } = req.body || {}
      if (!uid) {
        res.status(400).json({ error: 'Missing uid' })
        return
      }

      const sessionPayload = buildCheckoutSessionPayload({ uid, email, metadata })
      const request = buildRequest(req, sessionPayload)
      const response = await checkoutHandler.POST(request)
      await sendResponse(response, res)
      return
    } catch (error) {
      console.error('Failed to initialise checkout session', error)
      res.status(500).json({ error: 'Unable to create checkout session' })
      return
    }
  }

  if (req.method === 'GET') {
    try {
      const request = buildRequest(req)
      const response = await checkoutHandler.GET(request)
      await sendResponse(response, res)
      return
    } catch (error) {
      console.error('Failed to load checkout configuration', error)
      res.status(500).json({ error: 'Unable to load checkout handler' })
      return
    }
  }

  res.setHeader('Allow', ['GET', 'POST'])
  res.status(405).json({ error: 'Method Not Allowed' })
}
