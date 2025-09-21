"use client";

const SERVICES = [
  {
    title: "Turismo y Hospitalidad",
    description:
      "Operamos hoteles, resorts boutique y residencias turísticas con servicios gastronómicos y experiencias personalizadas.",
    details: ["Dirección hotelera", "Restauración y bares", "Programas de bienestar y eventos"],
  },
  {
    title: "Construcción y Desarrollo",
    description:
      "Actuamos como general contractor para nuevas edificaciones, ampliaciones y renovaciones completas de complejos turísticos.",
    details: ["Gestión de obra y licencias", "Diseño arquitectónico y técnico", "Entrega llave en mano"],
  },
  {
    title: "Gestión Inmobiliaria",
    description:
      "Adquirimos, transformamos y administramos inmuebles comerciales, urbanos y rurales con estrategias de valorización.",
    details: ["Due diligence y análisis financiero", "Arrendamiento y ventas", "Facility management"],
  },
  {
    title: "Consultoría Inmobiliaria",
    description:
      "Apoyamos a inversores y operadores con estudios de viabilidad, asistencia técnica y planes de posicionamiento.",
    details: ["Estudios de mercado", "Modelos operativos y financieros", "Estrategia de marca y comunicación"],
  },
];

export default function Servicios() {
  return (
    <section id="servizi" className="bg-white/70 py-20">
      <div className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-sepia">Servicios</p>
          <h2 className="mt-4 text-3xl font-semibold text-ink sm:text-4xl">
            Soluciones 360° para destinos turísticos e inversiones inmobiliarias
          </h2>
          <p className="mt-4 text-base text-ink/70">
            Diseñamos, construimos y gestionamos activos con un enfoque integral que abarca la operación diaria, la
            experiencia del huésped y la rentabilidad a largo plazo.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {SERVICES.map((service) => (
            <article key={service.title} className="relative overflow-hidden rounded-3xl border border-sepia/20 bg-old-paper/70 p-8 shadow-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-sepia/5 to-transparent" aria-hidden />
              <div className="relative z-10 space-y-4">
                <h3 className="text-2xl font-semibold text-ink">{service.title}</h3>
                <p className="text-sm text-ink/70">{service.description}</p>
                <ul className="space-y-2 text-sm text-ink/80">
                  {service.details.map((detail) => (
                    <li key={detail}>• {detail}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
