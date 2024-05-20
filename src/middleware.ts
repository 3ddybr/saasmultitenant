import { NextRequest, NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
  // const token = request.cookies.get('tokenVehicles')?.value
  // const signInURL = new URL('/', request.url)
  // const signInURLs = new URL('/[slug]', request.url)
  const { pathname } = request.nextUrl
  const hostname = request.headers.get('host') || ''

  if (!(pathname.startsWith('/app') || pathname.startsWith('/api'))) {
    const url = request.nextUrl.clone()
    // divisão parar encontrar a primeira parte[0]
    let slug = hostname.split(':')[0]
    console.log('slug1 linha 14', slug)

    if (
      hostname.indexOf('.catalogoveiculos.com.br') >= 0 ||
      hostname.indexOf('.app-local') >= 0
    ) {
      // subdomínio
      slug = hostname.split('.')[0]
      console.log('slug2', slug)
    }

    console.log('hostname', hostname)
    if (hostname === 'localhost') {
      slug = 'meutenant'
      return ''
    }

    url.pathname = '/' + slug + '' + pathname
    console.log('asdadasd linha 30 ', slug, url)

    if (
      hostname !== 'localhost:3000' &&
      hostname !== 'catalogoveiculos.com.br'
      // então e customdomain
    ) {
      console.log('dentro do linha 45', url.basePath)
      return NextResponse.rewrite(url)
    }
  }

  // return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/veiculos/:path*',
    '/app/veiculos/:path*',
    '/[slug]/veiculos/:path*',
  ],
}
