'use client'
import Image from 'next/image'
import Link from 'next/link'

import LogoIng from '../../../public/assets/logo.svg'
import ActiveLink from '../ActiveLink'
import { List } from '@phosphor-icons/react'
import { usePathname } from 'next/navigation'
import { HeaderButtonLink, HeaderContainer, HeaderContent } from './styles'
import { useAuth } from '@/app/(app)/[slug]/contexts/useAuth'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Header({ setMenuIsVisible }: any) {
  const { token, handleLogout } = useAuth()
  const pathname = usePathname()

  const slug = 'testeslug'

  console.log(pathname)
  return (
    <HeaderContainer>
      <HeaderContent>
        <Link className={`link ${pathname === '/' ? 'active' : ''}`} href="/">
          <Image src={LogoIng} width={120} alt="logo" priority />
        </Link>
        <div>
          <nav>
            <ul>
              <ActiveLink href="/">
                <span>Inicio</span>
              </ActiveLink>
              {token === null || token === undefined ? (
                ''
              ) : (
                <ActiveLink href={`/${slug}/veiculos`}>
                  <span>Veículos</span>
                </ActiveLink>
              )}
              <ActiveLink href={`/${slug}/empresa`}>
                <span>Empresa</span>
              </ActiveLink>
              <ActiveLink href={`/${slug}/contato`}>
                <span>Contato</span>
              </ActiveLink>
            </ul>
          </nav>
          {/* 
          <MagnifyingGlass
            className="iconBusca"
            size={17}
            weight="bold"
            color="var(--bg)"
          /> */}
          {token === null || token === undefined ? (
            <Link
              className={`link ${pathname === '/login' ? 'active' : ''}`}
              href={`/${slug}/login`}
            >
              <HeaderButtonLink>Login</HeaderButtonLink>
            </Link>
          ) : (
            <HeaderButtonLink onClick={handleLogout}>Logout</HeaderButtonLink>
          )}
        </div>

        <div className="mobile">
          <List
            size={32}
            color="var(--bg)"
            onClick={() => setMenuIsVisible(true)}
          />
        </div>
      </HeaderContent>
    </HeaderContainer>
  )
}
