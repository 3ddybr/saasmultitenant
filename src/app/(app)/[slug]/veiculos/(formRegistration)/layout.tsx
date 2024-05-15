// 'use client'
import { ReactNode } from 'react'
import type { Metadata } from 'next'

import { LayoutContainer } from './styles'

export const metadata: Metadata = {
  title: 'FestCar',
  description: 'Cadastro de veículos',
}

export default function RegistrationLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <LayoutContainer>
      <h1>Cadastro de veículos</h1>
      {children}
    </LayoutContainer>
  )
}
