import { NextRequest, NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('tokenVehicles')?.value
  const signInURL = new URL('/', request.url)
  // const veiculosURL = new URL('/login', request.url)
  const hostname = request.headers.get('host') || ''
  const { pathname } = request.nextUrl
  console.log('dentro do middle', pathname)

  if (!token) {
    if (request.nextUrl.pathname === '/') {
      return NextResponse.next()
    }
    return NextResponse.redirect(signInURL)
  }
  if (!(pathname.startsWith('/app') || pathname.startsWith('/api'))) {
    const url = request.nextUrl.clone()
    // divisão parar encontrar a primeira parte[0]
    let slug = hostname.split(':')[0]
    if (hostname.indexOf('.catalogoveiculos.com.br') >= 0) {
      // subdomínio
      slug = hostname.split('.')[0]
      console.log('slug', slug)
    }
    if (hostname === 'localhost') {
      slug = 'meutenant'
      return ''
    }

    url.pathname = '/' + slug + '' + pathname
    if (
      hostname !== 'localhost:3000' &&
      hostname !== '.catalogoveiculos.com.br'
      // hostname !== 'socialmediabelt.vercel.app'
    ) {
      return NextResponse.rewrite(url)
    }
  }

  return NextResponse.next()

  // if (req.nextUrl.pathname === '/veiculos') {
  //   return NextResponse.redirect(veiculosURL)
  // }
}

export const config = {
  matcher: ['/', '/veiculos/:path*'],
}
