"use client";

import { motion } from "framer-motion";

const SERVICES = [
  {
    title: "Turismo e ospitalita",
    description:
      "Gestiamo resort, aparthotel e residenze turistiche con format tailor made su food, wellness ed eventi.",
    details: ["Direzione alberghiera", "Ristorazione e mixology", "Programmi benessere"],
  },
  {
    title: "Costruzioni e sviluppo",
    description:
      "Guidiamo masterplan, permessi e cantieri come general contractor, coordinando professionisti e forniture.",
    details: ["Project e construction management", "Coordinamento esecutivo", "Consegna chiavi in mano"],
  },
  {
    title: "Gestione immobiliare",
    description:
      "Valorizziamo asset urbani e rurali con piani economici, locazioni strategiche e governance operativa.",
    details: ["Asset e facility management", "Locazioni e leasing", "Monitoraggio performance"],
  },
  {
    title: "Consulenza strategica",
    description:
      "Supportiamo investitori con studi di fattibilita, brand strategy e modelli finanziari evolutivi.",
    details: ["Business e market analysis", "Brand e positioning", "Financial modeling"],
  },
];

export default function Servicios() {
  return (
    <section id="servizi" className="relative z-20 py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-0">
        <div className="flex flex-col gap-6 text-left sm:max-w-3xl">
          <span className="text-xs uppercase tracking-[0.6em] text-muted">Servizi</span>
          <h2 className="text-4xl font-heading uppercase leading-tight sm:text-5xl">
            Soluzioni elastiche per destinazioni, cantieri e patrimoni che evolvono
          </h2>
          <p className="text-sm text-foreground/70 sm:text-base">
            Ogni incarico viene costruito come un movimento continuo: esploriamo scenari, modelliamo il concept,
            coordiniamo lavori e restiamo in cabina di regia con team operativi dedicati.
          </p>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {SERVICES.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ translateY: -8 }}
              className="group relative overflow-hidden rounded-4xl border border-border/60 bg-background/60 p-8 backdrop-blur"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
              <div className="relative z-10 flex h-full flex-col gap-6">
                <div className="space-y-3">
                  <h3 className="text-lg font-heading uppercase tracking-tight text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-sm text-foreground/70">{service.description}</p>
                </div>
                <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.35em] text-foreground/60">
                  {service.details.map((detail) => (
                    <span key={detail} className="rounded-full border border-border/60 px-4 py-2 transition-colors duration-300 group-hover:border-accent group-hover:text-accent">
                      {detail}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

