"use client"

import dynamic from "next/dynamic";
const Nosotros = dynamic(() => import("../components/Nosotros"), { ssr: false });

import Header from '@/components/Header'
import Servicios from '@/components/Servicios'
import CallToAction from '@/components/CallToAction'
import Contacto from "@/components/Contacto";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Nosotros />
      <Servicios />
      <CallToAction />
      <Contacto />
    </div>
  )
}

