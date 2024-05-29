'use client'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { SelectTipos } from '@/components/SelectTipos'
import { dataTypesVehicles } from '@/utils/dataTypesVehicles'

import { FormProviderBase } from '@/components/FormProviderBase'

import { VeiculosContentForm, VeiculosOpcionais } from './styles'
import { InsertImg } from '../../components/InsertImg'
import { useFirebase } from '@/app/(app)/[slug]/hooks/useFirebase'
import { useStorage } from '@/app/(app)/[slug]/contexts/useStorage'
import { dataCores } from '@/utils/dataColors'
import { useRouter } from 'next/navigation'
import {
  cylinderCapacity,
  dataBrandMotorcycles,
  dataVersionMotorcycle,
  dataFuelMotorcycle,
} from '@/utils/dataMotorcycles'
import Link from 'next/link'
import { MotorcyclesDataProps } from '@/app/types/motorcyclesDataProps'
import { useState } from 'react'

const schemaFormProduto = yup.object({
  title: yup.string().required('Titulo e obrigatório').min(3),
  type: yup.string().required('Tipo de veículos obrigatório'),
  brand: yup.string().required('Marca de veículos obrigatório'), // marca
  model: yup.string().required('Modelo e obrigatório'),
  version_motorcycle: yup.string().required('Versão e obrigatório'),
  year_model: yup
    .string()
    .min(4)
    .max(4)
    .required('Ano Modelo/ Fabricação e obrigatório'), // ano/model
  mileage: yup.string().required('Quilometragem e obrigatório'), // quilometragem
  color_motorcycle: yup.string().required('Cor e obrigatório'),
  cylinder_capacity_motorcycle: yup.string().required('Cilindrada obrigatório'),
  fuel_motorcycle: yup.string().required('Tipo de Combustível obrigatório'),
  price: yup.string().required('Preço e obrigatório'),
  description: yup.string().required('Descrição e obrigatório'),

  opcionais: yup.object({
    alarme: yup.boolean(),
    som: yup.boolean(),
    abs: yup.boolean(),
    on_board_computer: yup.boolean(),
    sports_exhaust: yup.boolean(),
    baggage_compartment: yup.boolean(),
    counterweight_without_guide: yup.boolean(),
    steering_damper: yup.boolean(),
    fog_lights: yup.boolean(),
    gps: yup.boolean(),
  }),
})

export default function MotorcycleRegistrationForm() {
  const { InsertVehicle, UpdateVehicle, slug } = useFirebase()
  const { refImage, motorcycle, dataMotorcycle } = useStorage()
  const [buttonState, setButtonState] = useState(false)
  const router = useRouter()

  type FormData = yup.InferType<typeof schemaFormProduto>

  const useFormReturn = useForm<FormData>({
    resolver: yupResolver(schemaFormProduto),
    defaultValues: {
      title: motorcycle?.title,
      type: motorcycle?.type || '2',
      brand: motorcycle?.brand,
      model: motorcycle?.model,
      version_motorcycle: motorcycle?.version_motorcycle,
      year_model: motorcycle?.year_model,
      mileage: motorcycle?.mileage,
      color_motorcycle: motorcycle?.color_motorcycle,
      cylinder_capacity_motorcycle: motorcycle?.cylinder_capacity_motorcycle,
      fuel_motorcycle: motorcycle?.fuel_motorcycle,
      price: motorcycle?.price,
      description: motorcycle?.description,
      opcionais: {
        alarme: motorcycle.opcionais?.alarme,
        som: motorcycle.opcionais?.som,
        abs: motorcycle.opcionais?.abs,
        on_board_computer: motorcycle.opcionais?.on_board_computer,
        sports_exhaust: motorcycle.opcionais?.sports_exhaust,
        baggage_compartment: motorcycle.opcionais?.baggage_compartment,
        fog_lights: motorcycle.opcionais?.fog_lights,
        gps: motorcycle.opcionais?.gps,
        counterweight_without_guide:
          motorcycle.opcionais?.counterweight_without_guide,
        steering_damper: motorcycle.opcionais?.steering_damper,
      },
    },
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useFormReturn

  const handleSubmitForm = async (data: FormData) => {
    if (refImage.length === 0) {
      alert('Insira pelo menos uma imagem')
      return
    }
    try {
      setButtonState(true)
      if (motorcycle.id) {
        await UpdateVehicle({ ...data, refImage }, motorcycle.id)
        dataMotorcycle({} as MotorcyclesDataProps)
        reset() // limpa o formulário
        router.push(`/${slug}/details/${motorcycle.id}`)
        setButtonState(false)
        alert('Atualizado com sucesso!')
      } else {
        const ref = await InsertVehicle({ ...data, refImage })
        router.push(`/${slug}/details/${ref.id}`)
        reset() // limpa o formulário
        setButtonState(false)
        alert('Cadastrado com sucesso!')
        // console.log('Document written with ID cadastrado: ', ref.id)
        // console.log(data, refImage)
      }
    } catch (error) {
      console.error(
        'Error adding document: (Erro ao cadastrar Veiculo) ',
        error,
      )
    }
  }
  return (
    <FormProviderBase useFormReturn={useFormReturn}>
      <VeiculosContentForm onSubmit={handleSubmit(handleSubmitForm)}>
        <div>
          {motorcycle.id ? (
            <Link href={`/${slug}/details/${motorcycle.id}`}>Voltar</Link>
          ) : (
            <Link href={`/${slug}/veiculos`}>Voltar</Link>
          )}
        </div>
        <div>
          <section>
            <label>Tipo</label>
            <SelectTipos
              dataOptions={dataTypesVehicles.filter((i) => i.value === '2')}
              name="type"
            />
            <p>{errors.type?.message}</p>
          </section>
          <section>
            <label>
              Titulo <small>(Breve descrição)</small>
            </label>
            <input
              id="title"
              {...register('title')}
              placeholder="ex: Harley-Davidson - Fat Boy Low Special - 2011          "
            />
            <p>{errors.title?.message}</p>
          </section>

          <section>
            <label>Marcas</label>
            <SelectTipos dataOptions={dataBrandMotorcycles} name="brand" />
            <p>{errors.brand?.message}</p>
          </section>
          <section>
            <label>Versão</label>
            <SelectTipos
              dataOptions={dataVersionMotorcycle}
              name="version_motorcycle"
            />
            <p>{errors.version_motorcycle?.message}</p>
          </section>
          <section>
            <label>Modelo</label>
            <input
              placeholder="Informe a Modelo"
              {...register('model')}
              id="model"
            />
            <p>{errors.model?.message}</p>
          </section>
          <section>
            <label>Quilometragem</label>
            <input
              type="text"
              placeholder="Informe a km"
              {...register('mileage')}
              id="mileage"
            />
            <p>{errors.mileage?.message}</p>
          </section>
          <section>
            <label>Ano ou Modelo</label>
            <input
              type="text"
              placeholder="Informe a Ano/Fabricação"
              {...register('year_model')}
              id="year_model"
            />
            <p>{errors.year_model?.message}</p>
          </section>
          <section>
            <label>Cor</label>
            <SelectTipos dataOptions={dataCores} name="color_motorcycle" />
            <p>{errors.color_motorcycle?.message}</p>
          </section>
          <section>
            <label>Cilindrada</label>
            <SelectTipos
              dataOptions={cylinderCapacity}
              name="cylinder_capacity_motorcycle"
            />
            <p>{errors.cylinder_capacity_motorcycle?.message}</p>
          </section>
          <section>
            <label>Combustível</label>
            <SelectTipos
              dataOptions={dataFuelMotorcycle}
              name="fuel_motorcycle"
            />
            <p>{errors.fuel_motorcycle?.message}</p>
          </section>
        </div>

        <legend>Opcionais</legend>
        <VeiculosOpcionais>
          <section>
            <input
              type="checkbox"
              id="alarme"
              {...register('opcionais.alarme')}
              defaultChecked={motorcycle.opcionais?.alarme}
            />
            <label>ALARME</label>
          </section>
          <section>
            <input
              type="checkbox"
              id="som"
              {...register('opcionais.som')}
              defaultChecked={motorcycle.opcionais?.som}
            />
            <label>SOM</label>
          </section>
          <section>
            <input
              type="checkbox"
              id="abs"
              {...register('opcionais.abs')}
              defaultChecked={motorcycle.opcionais?.abs}
            />
            <label>ABS</label>
          </section>
          <section>
            <input
              type="checkbox"
              id="on_board_computer"
              {...register('opcionais.on_board_computer')}
              defaultChecked={motorcycle.opcionais?.on_board_computer}
            />
            <label>COMPUTADOR DE BORDO</label>
          </section>
          <section>
            <input
              type="checkbox"
              id="trava-eletrica"
              {...register('opcionais.sports_exhaust')}
              defaultChecked={motorcycle.opcionais?.sports_exhaust}
            />
            <label>ESCAPAMENTO ESPORTIVO</label>
          </section>
          <section>
            <input
              type="checkbox"
              id="baggage_compartment"
              {...register('opcionais.baggage_compartment')}
              defaultChecked={motorcycle.opcionais?.baggage_compartment}
            />
            <label>BOLSA/BAÚ/BAULETO</label>
          </section>
          <section>
            <input
              type="checkbox"
              id="counterweight_without_guide"
              {...register('opcionais.counterweight_without_guide')}
              defaultChecked={motorcycle.opcionais?.counterweight_without_guide}
            />
            <label>CONTRA PESO NO GUIDON</label>
          </section>
          <section>
            <input
              type="checkbox"
              id="steering_damper"
              {...register('opcionais.steering_damper')}
              defaultChecked={motorcycle.opcionais?.steering_damper}
            />
            <label>AMORTECEDOR DE DIREÇÃO</label>
          </section>

          <section>
            <input
              type="checkbox"
              id="fog_lights"
              {...register('opcionais.fog_lights')}
              defaultChecked={motorcycle.opcionais?.fog_lights}
            />
            <label>LUZES DE NEBLINA</label>
          </section>
          <section>
            <input
              type="checkbox"
              id="gps"
              {...register('opcionais.gps')}
              defaultChecked={motorcycle.opcionais?.gps}
            />
            <label>GPS</label>
          </section>
        </VeiculosOpcionais>
        <section>
          <InsertImg />
        </section>

        <footer>
          <section>
            <label>Preço</label>
            <input
              type="number"
              id="price"
              {...register('price')}
              defaultValue={motorcycle.price}
            />
            <p>{errors.price?.message}</p>
          </section>

          <section>
            <legend>Descrição</legend>
            <textarea
              placeholder="Mensagem"
              id="description"
              {...register('description')}
              defaultValue={motorcycle.description}
            />
            <p>{errors.description?.message}</p>
          </section>
        </footer>
        <button type="submit" disabled={buttonState}>
          {motorcycle.id === undefined ? 'Cadastrar' : 'Atualizar'}
        </button>
      </VeiculosContentForm>
    </FormProviderBase>
  )
}
