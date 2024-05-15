export type VehiclesGeralProps = {
  // destaque: boolean;
  id: string
  title: string
  type: string
  brand: string // marca
  model: string // descrição da tabela fipe
  version_car?: string
  version_motorcycle?: string
  year_model: string // ano/model
  mileage: string // quilometragem
  color_car?: string
  color_motorcycle?: string
  price: string
  description: string
  exchange_car?: string // Câmbio
  cylinder_capacity_motorcycle?: string
  fuel_car?: string
  fuel_motorcycle?: string

  opcionais: {
    alarme: boolean
    som: boolean
    abs?: boolean
    on_board_computer?: boolean
    sports_exhaust?: boolean // escapamento esportivo
    baggage_compartment?: boolean // bolsa / bau / bauleto
    counterweight_without_guide?: boolean // Contra peso no guia
    steering_damper?: boolean // Amortecedor de direção
    fog_lights?: boolean // Luzes de neblina
    gps?: boolean

    airbag?: boolean
    trava_eletrica?: boolean
    vidro_eletrico?: boolean
    direcao_hidraulica?: boolean
    ar_condicionado?: boolean
    camera_re?: boolean
    sensor_re?: boolean
    kit_gas?: boolean
    armored?: boolean // blindado
  }
  refImage: [
    {
      imgRefFullPath: string
      imgUrl: string
    },
  ]
}
