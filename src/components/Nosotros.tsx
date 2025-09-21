/* eslint-disable @next/next/no-img-element */
"use client";

export default function Nosotros() {
  return (
    <section id="noi" className="py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.4em] text-sepia">Quiénes somos</p>
          <h2 className="text-3xl font-semibold text-ink sm:text-4xl">
            Tradición familiar para proyectos turísticos, gastronómicos e inmobiliarios
          </h2>
          <p className="text-ink/80">
            FRATELLI BRUNO Francesco e Carlo & C. S.n.c. es una sociedad en nombre colectivo dirigida por los hermanos
            Francesco y Carlo Bruno. Desde 1995 impulsamos destinos turísticos a través de complejos hoteleros,
            restaurantes, bares y residencias que combinan autenticidad, confort y sostenibilidad.
          </p>
          <p className="text-ink/80">
            Acompañamos cada inversión con consultoría técnica, gestión operativa y soluciones llave en mano que cubren
            la compra de suelos, la construcción y la administración cotidiana de los activos.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-sepia/20 bg-white/80 p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-ink">Misión</h3>
              <p className="mt-2 text-sm text-ink/70">
                Crear experiencias de hospitalidad con identidad local y excelencia operativa, cuidando cada detalle del
                viaje del huésped.
              </p>
            </div>
            <div className="rounded-2xl border border-sepia/20 bg-white/80 p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-ink">Visión</h3>
              <p className="mt-2 text-sm text-ink/70">
                Ser el aliado estratégico de referencia para proyectos turísticos y de inversión inmobiliaria en Italia y
                Europa.
              </p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-sepia/10 via-transparent to-sepia/10" aria-hidden />
          <img
            src="/brunoFranco.png"
            alt="Socios fundadores de Fratelli Bruno"
            className="relative z-10 w-full rounded-3xl border border-sepia/20 object-cover shadow-xl"
          />
          <div className="relative z-10 mt-6 rounded-2xl border border-sepia/20 bg-white/90 p-6 shadow-md">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-sepia">Capacidades clave</h3>
            <ul className="mt-3 space-y-2 text-sm text-ink/80">
              <li>• Dirección integral de hoteles, resorts, restaurantes y bares.</li>
              <li>• Construcción, ampliación y remodelación de complejos turísticos.</li>
              <li>• Compra, venta y gestión de activos comerciales, urbanos y rurales.</li>
              <li>• Consultoría técnica y rol de general contractor en desarrollos inmobiliarios.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

