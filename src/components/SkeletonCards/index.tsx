// 'use client'
import { SkeletonCardContainer, SkeletonCardContent } from './styles'

import { Skeleton } from 'antd'

export function SkeletonCards() {
  return (
    <SkeletonCardContainer>
      <SkeletonCardContent>
        <Skeleton.Image active style={{ width: '30rem', height: '15rem' }} />
        <Skeleton paragraph={{ rows: 4 }} active />
        <Skeleton.Button
          style={{ width: '100vw', maxWidth: '27.5rem', height: '4.2rem' }}
          active
        />
      </SkeletonCardContent>
    </SkeletonCardContainer>
  )
}
