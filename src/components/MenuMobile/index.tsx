'use client'
import Link from 'next/link'
import { X } from '@phosphor-icons/react/dist/ssr'
import { useEffect } from 'react'
import ActiveLink from '../ActiveLink'
import { MenuContainer, MenuContainerMobile, MobileButtonLink } from './styles'
import { useAuth } from '@/app/(app)/[slug]/contexts/useAuth'
import { useFirebase } from '@/app/(app)/[slug]/hooks/useFirebase'

type MenuMobileProps = {
  menuIsVisible: boolean
  setMenuIsVisible: (value: boolean) => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function MenuMobile({
  menuIsVisible,
  setMenuIsVisible,
}: MenuMobileProps) {
  useEffect(() => {
    document.body.style.overflow = menuIsVisible ? 'hidden' : 'auto'
  }, [menuIsVisible])

  const { token } = useAuth()
  const { slug } = useFirebase()
  return (
    <>
      {menuIsVisible === false ? (
        <MenuContainer>
          <X size={45} onClick={() => setMenuIsVisible(false)} color="white" />
          <div>
            <nav onClick={() => setMenuIsVisible(false)}>
              <ActiveLink href="/app">
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
            </nav>

            <Link href={`/${slug}/login`}>
              <MobileButtonLink onClick={() => setMenuIsVisible(false)}>
                Login
              </MobileButtonLink>
            </Link>
          </div>
        </MenuContainer>
      ) : (
        <>
          <MenuContainerMobile>
            <X
              size={45}
              onClick={() => setMenuIsVisible(false)}
              color="white"
            />
            <div>
              <nav onClick={() => setMenuIsVisible(false)}>
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
              </nav>

              {/* <MagnifyingGlass size={17} weight="bold" color="var(--bg)" /> */}
              <Link href={`/${slug}/login`}>
                <MobileButtonLink onClick={() => setMenuIsVisible(false)}>
                  Login
                </MobileButtonLink>
              </Link>
            </div>
          </MenuContainerMobile>
        </>
      )}
    </>
  )
}
