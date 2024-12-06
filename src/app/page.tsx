
import Header from '@/components/Header'
import Nosotros from '@/components/Nosotros'
import Servicios from '@/components/Servicios'
import CallToAction from '@/components/CallToAction'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Nosotros />
      <Servicios />
      <CallToAction />
    </div>
  )
}

