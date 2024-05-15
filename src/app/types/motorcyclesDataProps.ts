export type MotorcyclesDataProps = {
  // destaque: boolean;
  id: string
  title: string
  type: string
  brand: string // marca
  model: string // descrição da tabela fipe
  version_motorcycle: string
  year_model: string // ano/model
  mileage: string // quilometragem
  color_motorcycle: string
  price: string
  description: string
  cylinder_capacity_motorcycle: string
  fuel_motorcycle: string

  opcionais: {
    alarme: boolean
    som: boolean
    abs: boolean
    on_board_computer: boolean
    sports_exhaust: boolean // escapamento esportivo
    baggage_compartment: boolean // bolsa / bau / bauleto
    counterweight_without_guide: boolean // Contra peso sem guia
    steering_damper: boolean // Amortecedor de direção
    fog_lights: boolean // Luzes de neblina
    gps: boolean
  }
  refImage: [
    {
      imgRefFullPath: string
      imgUrl: string
    },
  ]
}
