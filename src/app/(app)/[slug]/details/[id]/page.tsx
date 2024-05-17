'use client'
import { useEffect, useState } from 'react'

import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'

import {
  ButtonDeled,
  ProductCarousel,
  ProductContainer,
  ProductContent,
  ProductDetails,
  ProductDetailsCarrousel,
  ProductDetailsInfo,
  ProductDetailsSummary,
  ProductsDetailsDescription,
  ProductsDetailsOpcionais,
} from './stylesProduct'
import { Gauge, Swap, Pencil, Check, Trash } from '@phosphor-icons/react'
import { Cards } from '@/components/Cards'
import { VehiclesDataProps } from '@/app/types/vehiclesDataProps'
import Link from 'next/link'

import {
  dataExchangeCars,
  dataFuelCars,
  dataVersionCars,
} from '@/utils/dataCars'
import { dataCores } from '@/utils/dataColors'
import {
  cylinderCapacity,
  dataFuelMotorcycle,
  dataVersionMotorcycle,
} from '@/utils/dataMotorcycles'
import { MotorcyclesDataProps } from '@/app/types/motorcyclesDataProps'
import { VehiclesGeralProps } from '@/app/types/VehiclesGeralPros'
import { SkeletonCards } from '@/components/SkeletonCards'
import { useStorage } from '../../contexts/useStorage'
import { useFirebase } from '../../hooks/useFirebase'
import { useAuth } from '../../contexts/useAuth'
import { useRouter } from 'next/navigation'
// import { MotorcyclesDataProps } from '@/app/types/motorcyclesDataProps'

interface ProductProps {
  params: {
    id: string
  }
}

export default function Product({ params }: ProductProps) {
  const { dataCar, dataMotorcycle } = useStorage()
  const { getLimitVehicles, getVehicle, deleteImg, deleteVehicle } =
    useFirebase()
  const [docLimitVehicles, setDocLimitVehicles] = useState<
    VehiclesGeralProps[]
  >([])
  const [car, setCar] = useState<VehiclesGeralProps>({} as VehiclesGeralProps)
  const { token } = useAuth()
  const router = useRouter()

  useEffect(() => {
    async function VehicleData() {
      const VehicleData = await getVehicle(params.id)
      const limitVehicles = await getLimitVehicles(6)

      setCar(VehicleData)
      // console.log(VehicleData.type)
      // dataCar(VehicleData)
      setDocLimitVehicles(limitVehicles)
    }
    VehicleData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id])

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja deletar o veículo?')) {
      for (let i = 0; i < car.refImage.length; i++) {
        await deleteImg(car.refImage[i].imgRefFullPath)
      }
      await deleteVehicle(car.id)
      router.push('/')
    }
  }

  if (!car) {
    return null
  }
  return (
    <ProductContainer>
      <>
        <ProductContent key={car.id}>
          <ProductDetails>
            <ProductDetailsSummary>
              <ProductDetailsCarrousel>
                <ImageGallery
                  items={
                    !car.refImage
                      ? []
                      : car.refImage.map((i) => ({
                          original: i.imgUrl,
                          thumbnail: i.imgUrl,
                        }))
                  }
                  showThumbnails={true}
                  showFullscreenButton={true}
                  showPlayButton={false}
                  showNav={false}
                  showBullets={true}
                  // autoPlay={true}
                  infinite={true}
                  slideInterval={3000}
                />
              </ProductDetailsCarrousel>
              <ProductsDetailsOpcionais>
                <h2>Resumo do veículo</h2>
                <section>
                  <div>
                    <p>Ano</p>
                    <strong>{car.year_model}</strong>
                  </div>

                  <div>
                    <p>Modelo</p>
                    <strong>{car.model}</strong>
                  </div>
                  <div>
                    <p>Combustível</p>
                    {car.type === '1' ? (
                      <strong>
                        {
                          dataFuelCars.filter(
                            (i) => i.value === car.fuel_car,
                          )[0]?.label
                        }
                      </strong>
                    ) : (
                      <strong>
                        {
                          dataFuelMotorcycle.filter(
                            (i) => i.value === car.fuel_motorcycle,
                          )[0]?.label
                        }
                      </strong>
                    )}
                  </div>

                  <div>
                    <p>Versão</p>
                    {car.type === '1' ? (
                      <strong>
                        {
                          dataVersionCars.filter(
                            (i) => i.value === car.version_car,
                          )[0]?.label
                        }
                      </strong>
                    ) : (
                      <strong>
                        {
                          dataVersionMotorcycle.filter(
                            (i) => i.value === car.version_motorcycle,
                          )[0]?.label
                        }
                      </strong>
                    )}
                  </div>
                  <div>
                    <p>Cor</p>
                    <strong>
                      {car.type === '1'
                        ? dataCores.filter((i) => i.value === car.color_car)[0]
                            ?.label
                        : dataCores.filter(
                            (i) => i.value === car.color_motorcycle,
                          )[0]?.label}
                    </strong>
                  </div>
                </section>

                <section className="options_boolean">
                  {car.opcionais?.alarme ? (
                    <span>
                      <Check size={20} color="#263660" weight="bold" /> Alarme
                    </span>
                  ) : (
                    ''
                  )}

                  {car.opcionais?.som ? (
                    <span>
                      <Check size={20} color="#263660" weight="bold" /> Som
                    </span>
                  ) : (
                    ''
                  )}

                  {car.opcionais?.airbag ? (
                    <span>
                      <Check size={20} color="#263660" weight="bold" /> Airbag
                    </span>
                  ) : (
                    ''
                  )}

                  {car.opcionais?.trava_eletrica ? (
                    <span>
                      <Check size={20} color="#263660" weight="bold" /> Trava
                      Eletrica
                    </span>
                  ) : (
                    ''
                  )}

                  {car.opcionais?.vidro_eletrico ? (
                    <span>
                      <Check size={20} color="#263660" weight="bold" /> Vidro
                      Eletrico
                    </span>
                  ) : (
                    ''
                  )}

                  {car.opcionais?.direcao_hidraulica ? (
                    <span>
                      <Check size={20} color="#263660" weight="bold" /> Direção
                      Hidraulica
                    </span>
                  ) : (
                    ''
                  )}
                  {car.opcionais?.ar_condicionado ? (
                    <span>
                      <Check size={20} color="#263660" weight="bold" />
                      Ar condicionado
                    </span>
                  ) : (
                    ''
                  )}

                  {car.opcionais?.camera_re ? (
                    <span>
                      <Check size={20} color="#263660" weight="bold" /> Camera
                      de ré
                    </span>
                  ) : (
                    ''
                  )}
                  {car.opcionais?.sensor_re ? (
                    <span>
                      <Check size={20} color="#263660" weight="bold" /> Sensor
                      de ré
                    </span>
                  ) : (
                    ''
                  )}
                  {car.opcionais?.kit_gas ? (
                    <span>
                      <Check size={20} color="#263660" weight="bold" /> Kit gás
                    </span>
                  ) : (
                    ''
                  )}
                  {car.opcionais?.armored ? (
                    <span>
                      <Check size={20} color="#263660" weight="bold" /> Blindado
                    </span>
                  ) : (
                    ''
                  )}
                  {car.opcionais?.abs ? (
                    <span>
                      <Check size={20} color="#263660" weight="bold" /> ABS
                    </span>
                  ) : (
                    ''
                  )}
                  {car.opcionais?.on_board_computer ? (
                    <span>
                      <Check size={20} color="#263660" weight="bold" />{' '}
                      Computador de bordo
                    </span>
                  ) : (
                    ''
                  )}
                  {car.opcionais?.sports_exhaust ? (
                    <span>
                      <Check size={20} color="#263660" weight="bold" />{' '}
                      Escapamento esportivo
                    </span>
                  ) : (
                    ''
                  )}
                  {car.opcionais?.baggage_compartment ? (
                    <span>
                      <Check size={20} color="#263660" weight="bold" /> Bolsa /
                      Baú / Bauleto
                    </span>
                  ) : (
                    ''
                  )}
                  {car.opcionais?.counterweight_without_guide ? (
                    <span>
                      <Check size={20} color="#263660" weight="bold" /> Contra
                      peso no guia
                    </span>
                  ) : (
                    ''
                  )}
                  {car.opcionais?.steering_damper ? (
                    <span>
                      <Check size={20} color="#263660" weight="bold" />{' '}
                      Amortecedor de Direção
                    </span>
                  ) : (
                    ''
                  )}
                  {car.opcionais?.fog_lights ? (
                    <span>
                      <Check size={20} color="#263660" weight="bold" /> Luzes de
                      Neblina
                    </span>
                  ) : (
                    ''
                  )}
                  {car.opcionais?.gps ? (
                    <span>
                      <Check size={20} color="#263660" weight="bold" /> Gps
                    </span>
                  ) : (
                    ''
                  )}
                </section>
              </ProductsDetailsOpcionais>
              <ProductsDetailsDescription>
                <h3>Informações sobre o carro</h3>
                <p>
                  {car.description}
                  <span>.</span>
                </p>
              </ProductsDetailsDescription>
            </ProductDetailsSummary>
            <ProductDetailsInfo>
              <div>
                <h1>{car.title}</h1>
                <header>
                  <span>
                    <Gauge size={24} />
                    {car.mileage}
                  </span>
                  <span>
                    <Swap size={24} />
                    {car.type === '1'
                      ? dataExchangeCars.filter(
                          (i) => i.value === car.exchange_car,
                        )[0]?.label
                      : cylinderCapacity.filter(
                          (i) => i.value === car.cylinder_capacity_motorcycle,
                        )[0]?.label}
                  </span>

                  {token ? (
                    <>
                      {car.type === '1' ? (
                        <Link
                          onClick={() => dataCar(car as VehiclesDataProps)}
                          href={`/veiculos/VehicleRegistrationForm`}
                        >
                          <span>
                            <Pencil size={24} />
                            Editar
                          </span>
                        </Link>
                      ) : (
                        <Link
                          onClick={() =>
                            dataMotorcycle(car as MotorcyclesDataProps)
                          }
                          href={`/veiculos/MotorcycleRegistrationForm`}
                        >
                          <span>
                            <Pencil size={24} />
                            Editar
                          </span>
                        </Link>
                      )}
                    </>
                  ) : (
                    ''
                  )}
                </header>
                <section>
                  <p>Por apenas</p>
                  <h1>
                    {parseInt(car.price).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </h1>
                </section>
                <section>
                  {' '}
                  {token ? (
                    // <Link href={`/`}>
                    <ButtonDeled onClick={() => handleDelete()}>
                      <Trash size={24} color="#ffffff" />
                      Excluir
                    </ButtonDeled>
                  ) : (
                    ''
                  )}
                </section>
                <section>
                  <p>Enviar mensagem</p>
                  <label>Nome</label>
                  <input type="text" placeholder="Nome Completo" />
                  <label>Telefone</label>
                  <input type="text" placeholder="(00) 0000-0000" />
                  <label>Mensagem</label>
                  <textarea placeholder="Escreva aqui sua mensagem"></textarea>
                  <button>Enviar</button>
                </section>
              </div>
            </ProductDetailsInfo>
          </ProductDetails>
          <ProductCarousel>
            <p>Produtos relacionados</p>
            <h3>Veículos com sua personalidade</h3>
            <section>
              {docLimitVehicles.length === 0 ? (
                <>
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
            </section>
          </ProductCarousel>
        </ProductContent>
      </>
    </ProductContainer>
  )
}
