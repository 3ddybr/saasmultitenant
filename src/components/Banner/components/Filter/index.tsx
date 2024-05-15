'use client'
import { FilterButtonLink, FilterContainer, FilterContent } from './styles'
import { useForm } from 'react-hook-form'
import { SelectTipos } from '../../../SelectTipos'
import { dataTypesVehicles } from '@/utils/dataTypesVehicles'
import { dataBrandCars } from '@/utils/dataCars'
import { FormProviderBase } from '@/components/FormProviderBase'
import { useState } from 'react'
import { dataBrandMotorcycles } from '@/utils/dataMotorcycles'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useStorage } from '@/app/(app)/[slug]/contexts/useStorage'
import { useFirebase } from '@/app/(app)/[slug]/hooks/useFirebase'

const schemaFormSearch = yup.object({
  type: yup.string(),
  brand: yup.string(),
})
export function Filter() {
  const [typeFilter, setTypeFilter] = useState('')
  const [brandFilter, setBrandFilter] = useState('')
  const { SearchVehicleType, SearchVehicleTypeBrand } = useFirebase()
  const { ListCar } = useStorage()
  const [buttonState, setButtonState] = useState(false)

  type FormSearch = yup.InferType<typeof schemaFormSearch>
  const useFormReturn = useForm<FormSearch>({
    resolver: yupResolver(schemaFormSearch),
  })

  const { handleSubmit } = useFormReturn
  const handleSubmitForm = async () => {
    setButtonState(true)
    if (typeFilter && brandFilter !== '') {
      setBrandFilter('')
      const vehiclesList = await SearchVehicleTypeBrand(typeFilter, brandFilter)
      ListCar(vehiclesList)
      setButtonState(false)
      // console.log(vehiclesList)
    } else if (typeFilter && brandFilter === '') {
      const vehiclesList = await SearchVehicleType(typeFilter)
      ListCar(vehiclesList)
      setButtonState(false)
    }
    setButtonState(false)
    // console.log(typeFilter, brandFilter)
  }

  return (
    <FormProviderBase useFormReturn={useFormReturn}>
      <FilterContainer>
        <FilterContent onSubmit={handleSubmit(handleSubmitForm)}>
          <section>
            <label>Tipo</label>
            <SelectTipos
              dataOptions={dataTypesVehicles}
              onChange={(e) => {
                setTypeFilter(e.target.value)
                setBrandFilter('')
              }}
              name="type"
            />
          </section>
          <section>
            {typeFilter === '1' && (
              <>
                <label>Marca</label>
                <SelectTipos
                  dataOptions={dataBrandCars}
                  name="brand"
                  onChange={(e) => setBrandFilter(e.target.value)}
                />
              </>
            )}
            {typeFilter === '2' && (
              <>
                <label>Marca</label>
                <SelectTipos
                  dataOptions={dataBrandMotorcycles}
                  name="brand"
                  onChange={(e) => setBrandFilter(e.target.value)}
                />
              </>
            )}
          </section>
          <FilterButtonLink type="submit" disabled={buttonState}>
            Pesquisar
          </FilterButtonLink>
        </FilterContent>
      </FilterContainer>
    </FormProviderBase>
  )
}
