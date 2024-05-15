'use client'
import styled from 'styled-components'

export const VeiculosContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 60vh;
`

export const VeiculosContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;
  max-width: 59.5rem;

  padding: 2.5rem;

  gap: 2rem;

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 2rem;

    section {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      cursor: pointer;
      padding: 2rem;
      box-shadow: 0px 4px 15px rgba(14, 52, 140, 0.25);
      border-radius: 10px;

      &:hover {
        color: var(--blue-400);
        box-shadow: 0px 4px 15px var(--blue-400);
        transition: 0.3s;
      }

      p {
        font-size: 2rem;
      }
    }
  }
`
