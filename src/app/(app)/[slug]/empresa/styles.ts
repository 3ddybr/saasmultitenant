'use client'
import styled from 'styled-components'

export const EmpresaContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
`

export const EmpresaContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  max-width: 59.5rem;

  padding: 2.5rem;

  gap: 2rem;

  header {
    background-color: var(--blue-800);
    width: 20rem;
    height: 8rem;

    border-radius: 10px;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  h3 {
    font-size: 1.5rem;
  }

  p {
    font-size: 1.2rem;
  }
`
