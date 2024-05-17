'use client'

import { useRouter } from 'next/navigation'
import { VeiculosContainer, VeiculosContent } from './styles'
import { CarProfile, Motorcycle } from '@phosphor-icons/react'
import { MotorcyclesDataProps } from '@/app/types/motorcyclesDataProps'
import { VehiclesDataProps } from '@/app/types/vehiclesDataProps'
import { useStorage } from '../contexts/useStorage'

export default function Veiculos() {
  const { dataCar, dataMotorcycle } = useStorage()
  const router = useRouter()

  return (
    <>
      <VeiculosContainer>
        <VeiculosContent>
          <h1>Qual veículo deseja registrar?</h1>
          <div>
            <section
              onClick={() => {
                router.push('/veiculos/VehicleRegistrationForm')
                dataCar({} as VehiclesDataProps)
              }}
            >
              <CarProfile size={82} />
              <p>Carros</p>
            </section>
            <section
              onClick={() => {
                router.push('/veiculos/MotorcycleRegistrationForm')
                dataMotorcycle({} as MotorcyclesDataProps)
              }}
            >
              <Motorcycle size={82} />
              <p>Motos</p>
            </section>
          </div>
        </VeiculosContent>
      </VeiculosContainer>
    </>
  )
}
