import { NextResponse } from 'next/server'

export async function middleware(request) {
  const host = request.headers.get('host')
  const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN || 'bublr.life'
  
  if (!host || host.includes(appDomain) || host.includes('localhost') || host.includes('127.0.0.1')) {
    return NextResponse.next()
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'https://bublr.life'}/api/domain/lookup?domain=${host}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      const data = await response.json()
      
      if (data.user && data.active) {
        const url = request.nextUrl.clone()
        url.pathname = `/${data.user.name}${url.pathname === '/' ? '' : url.pathname}`
        
        return NextResponse.rewrite(url)
      }
    }
  } catch (error) {
    console.error('Custom domain middleware error:', error)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
