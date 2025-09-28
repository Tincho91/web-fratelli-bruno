"use client"

import dynamic from "next/dynamic";
const Nosotros = dynamic(() => import("../components/Nosotros"), { ssr: false });

import Header from '@/components/Header'
import Servicios from '@/components/Servicios'
import CallToAction from '@/components/CallToAction'
import Contatti from "@/components/Contacto";

export default function Home() {
  return (
    <div className="relative isolate min-h-screen flex flex-col">
      <Header />
      <Nosotros />
      <Servicios />
      <CallToAction />
      <Contatti />
    </div>
  )
}
