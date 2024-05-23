import { NextRequest, NextResponse } from 'next/server'

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hostname = request.headers.get('host') || ''

  // Verifica se o caminho é /dashboard, /api ou na raiz (app)/(site)
  if (!(pathname.startsWith('/dashboard') || pathname.startsWith('/api'))) {
    // Pega o slug do subdomínio
    let slug = hostname.split(':')[0]
    console.log('log do slug 115', slug)
    console.log('log do hostname', hostname)
    if (
      hostname.indexOf('.catalogoveiculos.com.br') >= 0 ||
      hostname.indexOf('.app-local') >= 0
    ) {
      // subdomínio
      slug = hostname.split('.')[0]
      console.log('slug linha 123', slug)
      const url = request.nextUrl.clone()
      url.pathname = `/${slug}${pathname}`

      console.log('log da url', url)
    }

    // Reescreve a URL se não for um domínio padrão
    if (
      hostname !== 'localhost:3000' &&
      hostname !== 'catalogoveiculos.com.br'
    ) {
      const url = request.nextUrl.clone()
      url.pathname = `/${slug}${pathname}`
      return NextResponse.rewrite(url)
    }

    return NextResponse.next()
  }
}

export const config = {
  matcher: ['/', '/veiculos/:path*, /dashboard/:path*'],
}
