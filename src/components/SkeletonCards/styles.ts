'use client'
import styled from 'styled-components'

export const SkeletonCardContainer = styled.div`
  width: 100%;
  max-width: 30rem;
  height: 40rem;

  margin: 0.8rem;

  box-shadow: 0px 4px 15px rgba(14, 52, 140, 0.25);

  /* border: 1px solid red; */
`

export const SkeletonCardContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  padding: 0.5rem;
`
