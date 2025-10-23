import { CustomerPortal } from '@dodopayments/nextjs'

const customerPortalHandler = CustomerPortal({
  bearerToken: process.env.DODO_PAYMENTS_API_KEY,
  environment: process.env.DODO_PAYMENTS_ENVIRONMENT || 'live_mode',
})

function buildRequest(req) {
  const protocol = req.headers['x-forwarded-proto'] || 'https'
  const host = req.headers['host']
  const url = `${protocol}://${host}${req.url}`

  return new Request(url, {
    method: req.method,
    headers: new Headers(req.headers),
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

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }

  const { customer_id: customerId } = req.query || {}
  if (!customerId) {
    res.status(400).json({ error: 'Missing customer_id parameter' })
    return
  }

  try {
    const response = await customerPortalHandler.GET(buildRequest(req))
    await sendResponse(response, res)
  } catch (error) {
    console.error('Failed to load customer portal link', error)
    res.status(500).json({ error: 'Unable to create customer portal session' })
  }
}
