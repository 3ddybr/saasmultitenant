'use client'
import styled from 'styled-components'

export const LayoutContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;

  h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3.2rem;
    line-height: 3.5rem;
    color: var(--title);

    width: 100%;
    margin-top: 3.4rem;
    /* margin-bottom: 3.4rem; */

    border-bottom: 1px solid var(--gray-300);
  }
`
