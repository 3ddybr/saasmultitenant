'use client'
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'
import { VehiclesDataProps } from '@/app/types/vehiclesDataProps'
import { MotorcyclesDataProps } from '@/app/types/motorcyclesDataProps'

type ImageProps = {
  imgRefFullPath: string
  imgUrl: string
}

interface StorageProviderProps {
  // quando as props vao receber qualquer conteúdo do tipo react usa-se ReactNode
  children: ReactNode
}

interface StorageContextProps {
  refImage: ImageProps[]
  updateRefImages: (imgRef: ImageProps) => void
  deleteImgContext: (imgRef: ImageProps[]) => void
  dataCar: (data: VehiclesDataProps) => void
  ListCar: (data: VehiclesDataProps[]) => void
  dataMotorcycle: (data: MotorcyclesDataProps) => void
  ListMotorcycles: (data: MotorcyclesDataProps[]) => void
  vehicle: VehiclesDataProps
  vehicles: VehiclesDataProps[]
  motorcycle: MotorcyclesDataProps
  motorcycles: MotorcyclesDataProps[]
}

const StorageContext = createContext<StorageContextProps>(
  {} as StorageContextProps,
)

export const StorageProvider = ({ children }: StorageProviderProps) => {
  const [refImage, setRefImage] = useState<ImageProps[]>([])
  const [vehicle, setVehicle] = useState<VehiclesDataProps>(
    {} as VehiclesDataProps,
  )
  const [motorcycle, setMotorcycle] = useState<MotorcyclesDataProps>(
    {} as MotorcyclesDataProps,
  )
  const [vehicles, setVehicles] = useState<VehiclesDataProps[]>([])
  const [motorcycles, setMotorcycles] = useState<MotorcyclesDataProps[]>([])

  // const updateRefImages = (refImg: ImageProps) => {
  //   setRefImage((prevState) => [...prevState, refImg])
  // }
  const updateRefImages = useCallback(
    (refImg: ImageProps) => {
      setRefImage((prevState) => [...prevState, refImg])
    },
    [setRefImage],
  )

  const deleteImgContext = useCallback(
    (refImg: ImageProps[]) => {
      setRefImage(refImg)
    },
    [setRefImage],
  )

  const dataCar = useCallback(
    (data: VehiclesDataProps) => {
      setVehicle(data)
      setRefImage(data.refImage ?? [])
    },
    [setVehicle, setRefImage],
  )

  const dataMotorcycle = useCallback(
    (data: MotorcyclesDataProps) => {
      setMotorcycle(data)
      setRefImage(data.refImage ?? [])
    },
    [setMotorcycle, setRefImage],
  )

  const ListMotorcycles = useCallback(
    (data: MotorcyclesDataProps[]) => {
      setMotorcycles(data)
    },
    [setMotorcycles],
  )

  const ListCar = useCallback(
    (data: VehiclesDataProps[]) => {
      setVehicles(data)
    },
    [setVehicles],
  )

  return (
    <StorageContext.Provider
      value={{
        refImage,
        updateRefImages,
        deleteImgContext,
        vehicle,
        vehicles,
        dataCar,
        motorcycle,
        motorcycles,
        dataMotorcycle,
        ListMotorcycles,
        ListCar,
      }}
    >
      {children}
    </StorageContext.Provider>
  )
}

export function useStorage() {
  const context = useContext(StorageContext)
  return context
}
