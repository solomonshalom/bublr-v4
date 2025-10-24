import dns from 'dns/promises'

export function validateDomainFormat(domain) {
  if (!domain || typeof domain !== 'string') {
    return { valid: false, error: 'Domain is required' }
  }

  let cleanDomain = domain.trim().toLowerCase()

  if (cleanDomain.startsWith('http://') || cleanDomain.startsWith('https://')) {
    cleanDomain = cleanDomain.replace(/^https?:\/\//, '')
  }

  if (cleanDomain.includes('/')) {
    return { valid: false, error: 'Domain cannot contain paths. Use only the domain name (e.g., blog.example.com)' }
  }

  if (cleanDomain.includes(' ')) {
    return { valid: false, error: 'Domain cannot contain spaces' }
  }

  const domainRegex = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/
  if (!domainRegex.test(cleanDomain)) {
    return { valid: false, error: 'Invalid domain format. Use only letters, numbers, dots, and hyphens' }
  }

  const parts = cleanDomain.split('.')
  if (parts.length < 2) {
    return { valid: false, error: 'Domain must have at least a name and TLD (e.g., example.com)' }
  }

  const tld = parts[parts.length - 1]
  const validTLDs = ['com', 'net', 'org', 'io', 'dev', 'co', 'app', 'me', 'blog', 'site', 'online', 'xyz', 'tech', 'life']
  if (tld.length < 2) {
    return { valid: false, error: 'Invalid TLD (top-level domain)' }
  }

  if (cleanDomain === process.env.NEXT_PUBLIC_APP_DOMAIN) {
    return { valid: false, error: 'Cannot use the main app domain' }
  }

  return { valid: true, domain: cleanDomain }
}

export async function verifyDNS(domain, targetDomain) {
  try {
    const records = await dns.resolve(domain, 'A')
    if (records && records.length > 0) {
      return { verified: true, recordType: 'A', records }
    }
  } catch (err) {
    console.log('A record not found, trying CNAME...')
  }

  try {
    const records = await dns.resolve(domain, 'CNAME')
    if (records && records.length > 0) {
      const pointsToTarget = records.some(record => 
        record.toLowerCase().includes(targetDomain.toLowerCase())
      )
      if (pointsToTarget) {
        return { verified: true, recordType: 'CNAME', records }
      } else {
        return { 
          verified: false, 
          error: `CNAME found but doesn't point to ${targetDomain}. Points to: ${records.join(', ')}` 
        }
      }
    }
  } catch (err) {
    console.log('CNAME record not found')
  }

  return { 
    verified: false, 
    error: 'No valid DNS records found. Please add an A record or CNAME pointing to ' + targetDomain 
  }
}
