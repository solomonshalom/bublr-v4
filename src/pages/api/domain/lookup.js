import { getUserByDomain } from '../../../lib/db'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { domain } = req.query

    if (!domain) {
      return res.status(400).json({ error: 'Domain is required' })
    }

    try {
      const user = await getUserByDomain(domain)

      if (user.subscriptionStatus === 'active' || user.subscriptionStatus === 'past_due') {
        if (!user.customDomainActive) {
          return res.status(404).json({ 
            error: 'Domain inactive',
            active: false 
          })
        }

        return res.status(200).json({
          active: true,
          user: {
            id: user.id,
            name: user.name,
            displayName: user.displayName
          }
        })
      } else {
        return res.status(404).json({ 
          error: 'Domain inactive',
          active: false 
        })
      }
    } catch (err) {
      if (err.code === 'user/not-found') {
        return res.status(404).json({ 
          error: 'Domain not found',
          active: false 
        })
      }
      throw err
    }
  } catch (error) {
    console.error('Domain lookup error:', error)
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    })
  }
}
