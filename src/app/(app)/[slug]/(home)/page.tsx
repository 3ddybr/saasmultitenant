'use client'
import { useEffect, useState } from 'react'
import { Banner } from '@/components/Banner'
import { Cards } from '@/components/Cards'

import { HomeContainer, HomeContent } from './styles'
import { useFirebase } from '../hooks/useFirebase'
import { dataExchangeCars } from '@/utils/dataCars'
import { cylinderCapacity } from '@/utils/dataMotorcycles'
import { VehiclesGeralProps } from '@/app/types/VehiclesGeralPros'
import { useStorage } from '../contexts/useStorage'
import { SkeletonCards } from '@/components/SkeletonCards'

export default function Home() {
  const { getLimitVehicles } = useFirebase()
  const { vehicles } = useStorage()
  const [docLimitVehicles, setDocLimitVehicles] = useState<
    VehiclesGeralProps[]
  >([])

  useEffect(() => {
    async function LimitVehicles() {
      const limitVehicles = await getLimitVehicles(9)

      setDocLimitVehicles(limitVehicles)
    }
    if (vehicles.length === 0) {
      LimitVehicles()
    } else {
      setDocLimitVehicles(vehicles)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicles])
  return (
    <HomeContainer>
      <Banner />
      <HomeContent>
        {docLimitVehicles.length === 0 ? (
          <>
            <SkeletonCards />
            <SkeletonCards />
            <SkeletonCards />
            <SkeletonCards />
            <SkeletonCards />
            <SkeletonCards />
          </>
        ) : (
          <>
            {docLimitVehicles.map((doc) => {
              return doc.type === '1' ? (
                <Cards
                  key={doc.title}
                  mileage={doc.mileage}
                  price={doc.price}
                  imgUrl={doc.refImage.map((i) => ({
                    original: i.imgUrl,
                    thumbnail: i.imgUrl,
                  }))}
                  // gerar opcao pelo type no exchange ou cilinder capacity
                  exchange={
                    dataExchangeCars.filter(
                      (i) => i.value === doc.exchange_car,
                    )[0]?.label
                  }
                  title={doc.title}
                  year={doc.year_model}
                  id={doc.id}
                />
              ) : (
                <Cards
                  key={doc.title}
                  mileage={doc.mileage}
                  price={doc.price}
                  imgUrl={doc.refImage.map((i) => ({
                    original: i.imgUrl,
                    thumbnail: i.imgUrl,
                  }))}
                  // gerar opcao pelo type no exchange ou cilinder capacity
                  exchange={
                    cylinderCapacity.filter(
                      (i) => i.value === doc.cylinder_capacity_motorcycle,
                    )[0]?.label
                  }
                  title={doc.title}
                  year={doc.year_model}
                  id={doc.id}
                />
              )
            })}
          </>
        )}
      </HomeContent>
    </HomeContainer>
  )
}
