import { EmpresaContainer, EmpresaContent } from './styles'
import Image from 'next/image'

import LogoIng from '../../../../../public/assets/logo.svg'

export default function Empresa() {
  return (
    <EmpresaContainer>
      <EmpresaContent>
        <header>
          <Image src={LogoIng} width={120} alt="logo" priority />
        </header>
        <h1>
          Apresentando FestCar: Sua Destinação para Qualidade e Confiança
          Automotiva!
        </h1>
        <p>
          Bem-vindo à FestCar, uma instituição familiar que tem sido o epicentro
          da indústria automobilística há 15 anos! Nosso compromisso inabalável
          com a excelência e a satisfação do cliente estabeleceu nossa reputação
          como líderes em revenda de carros na região.{' '}
        </p>

        <h3>Quem Somos:</h3>
        <p>
          A FestCar foi fundada com uma visão clara: oferecer uma experiência de
          compra de carros excepcional, enraizada em confiança, integridade e
          qualidade. Como uma empresa familiar, entendemos o valor dos laços
          pessoais e nos esforçamos para construir relacionamentos duradouros
          com nossos clientes.
        </p>

        <h3>Nossa Missão:</h3>
        <p>
          Na FestCar, nossa missão é simples: oferecer uma ampla seleção de
          veículos de qualidade, atendimento ao cliente incomparável e preços
          justos. Estamos comprometidos em ajudar nossos clientes a encontrar o
          carro dos seus sonhos, enquanto garantimos transparência em cada etapa
          do processo.
        </p>

        <h3>O Que Oferecemos:</h3>
        <p>
          Como especialistas em compra e venda de carros, na FestCar, você
          encontrará uma variedade de veículos cuidadosamente selecionados, que
          atendem a uma variedade de necessidades e orçamentos. Nossa equipe
          dedicada está aqui para orientá-lo durante todo o processo de compra,
          garantindo que você faça uma escolha informada e satisfatória.
        </p>

        <h3>Por Que Escolher a FestCar?</h3>
        <p>
          Experiência de 15 anos no mercado automotivo. Atendimento
          personalizado e familiar. Ampla gama de veículos de qualidade.
          Transparência e integridade em todas as transações. Compromisso com a
          satisfação do cliente. Na FestCar, estamos aqui para tornar sua
          jornada de compra de carro memorável, tranquila e, acima de tudo,
          gratificante. Visite-nos hoje mesmo e descubra por que somos a escolha
          preferida de tantos entusiastas automotivos em nossa comunidade!
        </p>
      </EmpresaContent>
    </EmpresaContainer>
  )
}
