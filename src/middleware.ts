// import { NextRequest, NextResponse } from 'next/server'

// export default function middleware(request: NextRequest) {
//   // const token = request.cookies.get('tokenVehicles')?.value
//   // const signInURL = new URL('/', request.url)
//   // const signInURLs = new URL('/[slug]', request.url)
//   const { pathname } = request.nextUrl
//   const hostname = request.headers.get('host') || ''

//   if (!(pathname.startsWith('/dashboard') || pathname.startsWith('/api'))) {
//     const url = request.nextUrl.clone()
//     // divisão parar encontrar a primeira parte[0]
//     let slug = hostname.split(':')[0]
//     console.log('slug1 linha 14', slug)

//     if (
//       hostname.indexOf('.catalogoveiculos.com.br') >= 0 ||
//       hostname.indexOf('.app-local') >= 0
//     ) {
//       // subdomínio
//       slug = hostname.split('.')[0]
//       console.log('slug2', slug)
//     }

//     console.log('hostname', hostname)
//     if (hostname === 'localhost') {
//       slug = 'meutenant'
//       return ''
//     }

//     url.pathname = '/' + slug + '' + pathname
//     console.log('asdadasd linha 30 ', slug, url)

//     if (
//       hostname !== 'localhost:3000' &&
//       hostname !== 'catalogoveiculos.com.br'
//       // então e customdomain
//     ) {
//       console.log('dentro do linha 45', url.basePath)
//       return NextResponse.rewrite(url)
//     }
//   }

//   // return NextResponse.next()
// }

// export const config = {
//   matcher: [
//     '/',
//     '/veiculos/:path*',
//     '/dashboard/veiculos/:path*',
//     '/[slug]/veiculos/:path*',
//   ],
// }

// import { NextRequest, NextResponse } from 'next/server'

// export default function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl
//   const hostname = request.headers.get('host') || ''

//   // Check if the request path starts with '/app' or '/api'
//   if (pathname.startsWith('/dashboard') || pathname.startsWith('/api')) {
//     return NextResponse.next()
//   }

//   // Process the hostname to determine the slug
//   let slug = hostname.split(':')[0]

//   if (
//     hostname.indexOf('.catalogoveiculos.com.br') >= 0 ||
//     hostname.indexOf('.app-local') >= 0
//   ) {
//     // Extract the subdomain slug
//     slug = hostname.split('.')[0]
//   }

//   // Special case for localhost
//   if (hostname === 'localhost') {
//     slug = 'meutenant'
//   }

//   // Rewrite the URL to include the slug in the pathname
//   const url = request.nextUrl.clone()
//   url.pathname = `/${slug}${pathname}`

//   // Perform the rewrite if the hostname is not the main domain
//   if (hostname !== 'localhost:3000' && hostname !== 'catalogoveiculos.com.br') {
//     return NextResponse.rewrite(url)
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: [
//     '/',
//     '/veiculos/:path*',
//     '/dashboard/veiculos/:path*',
//     '/[slug]/veiculos/:path*',
//   ],
// }

// melhor ate
// import { NextRequest, NextResponse } from 'next/server'

// export default function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl
//   const hostname = request.headers.get('host') || ''

//   // Verifica se o caminho é /dashboard, /api ou na raiz (app)/(site)
//   if (pathname.startsWith('/app') || pathname.startsWith('/api')) {
//     return NextResponse.next()
//   }

//   // Pega o slug do subdomínio
//   let slug = hostname.split(':')[0]

//   if (
//     hostname.indexOf('.catalogoveiculos.com.br') >= 0 ||
//     hostname.indexOf('.app-local') >= 0
//   ) {
//     // subdomínio
//     slug = hostname.split('.')[0]
//   }

//   const url = request.nextUrl.clone()
//   url.pathname = `/${slug}${pathname}`

//   // Reescreve a URL se não for um domínio padrão
//   if (hostname !== 'localhost:3000' && hostname !== 'catalogoveiculos.com.br') {
//     return NextResponse.rewrite(url)
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: [
//     '/',
//     '/veiculos/:path*',
//     '/dashboard/veiculos/:path*',
//     '/[slug]/veiculos/:path*',
//   ],
// }

import { NextRequest, NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hostname = request.headers.get('host') || ''

  // Verifica se o caminho é /dashboard, /api ou na raiz (app)/(site)
  if (pathname.startsWith('/app') || pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  // Pega o slug do subdomínio
  let slug = hostname.split(':')[0]

  if (
    hostname.indexOf('.catalogoveiculos.com.br') >= 0 ||
    hostname.indexOf('.app-local') >= 0
  ) {
    // subdomínio
    slug = hostname.split('.')[0]
  }

  const url = request.nextUrl.clone()
  url.pathname = `/${slug}${pathname}`

  // Reescreve a URL se não for um domínio padrão
  if (
    (hostname === 'localhost:3000' || hostname === 'catalogoveiculos.com.br') &&
    pathname === '/'
  ) {
    // return NextResponse.rewrite(
    //   new URL('/src/app/(site)/index.tsx', 'http://localhost:3000'),
    // )
    return NextResponse.next()
  } else if (
    hostname !== 'localhost:3000' &&
    hostname !== 'catalogoveiculos.com.br'
  ) {
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/veiculos/:path*',
    '/dashboard/veiculos/:path*',
    '/[slug]/veiculos/:path*',
  ],
}
