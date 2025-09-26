"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const pillars = [
  {
    title: "Missione",
    description:
      "Accompagnare investitori e territori nel costruire ospitalita, residenze e hub commerciali che emozionano e generano ritorni misurabili.",
  },
  {
    title: "Metodo",
    description:
      "Un team unico per analisi, concept, progettazione e gestione. Dal masterplan fino all apertura quotidiana degli spazi.",
  },
];

const highlights = [
  "General contractor con focus su hospitality premium",
  "Piani economici e operativi integrati",
  "Gestione diretta o in co-partnership",
  "Presenza in Italia, Svizzera e Balcani",
];

export default function Nosotros() {
  return (
    <section id="noi" className="relative z-20 py-32">
      <div className="relative mx-auto grid max-w-6xl gap-16 px-6 sm:px-8 lg:grid-cols-[1.05fr,0.95fr] lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="space-y-10"
        >
          <div className="space-y-4">
            <div className="relative inline-flex flex-col gap-3">
              <div className="pointer-events-none absolute -inset-x-6 -inset-y-4 -z-10 rounded-[2rem] bg-black/65 blur-3xl opacity-70" aria-hidden />
              <span className="text-xs uppercase tracking-[0.6em] text-foreground text-shadow">Chi siamo</span>
              <h2 className="text-4xl font-heading uppercase leading-tight text-foreground text-shadow sm:text-5xl">
              Una regia unica per ospitalita, costruzioni e gestione immobiliare
            </h2>
            </div>
            <p className="text-sm text-foreground/85 text-shadow sm:text-base">
              Dal 1995 firmiamo resort, residenze e spazi commerciali con un approccio end-to-end. Valutiamo il potenziale
              del territorio, definiamo il concept e coordiniamo cantieri e operazioni quotidiane.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="rounded-4xl bg-background/80 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.35)] backdrop-blur">
                <h3 className="text-sm uppercase tracking-[0.35em] text-foreground">{pillar.title}</h3>
                <p className="mt-3 text-sm text-foreground/85">{pillar.description}</p>
              </div>
            ))}
          </div>

          <div className="rounded-4xl bg-background/70 p-6 shadow-[0_20px_40px_rgba(0,0,0,0.35)] backdrop-blur">
            <h3 className="text-xs uppercase tracking-[0.45em] text-muted">Cosa ci distingue</h3>
            <ul className="mt-4 grid gap-2 text-sm text-foreground/85 sm:grid-cols-2">
              {highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-2">
                  <span className="mt-[6px] h-1 w-6 bg-accent" aria-hidden />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative flex items-center justify-center"
        >
          <div className="relative mx-auto aspect-square w-full max-w-sm sm:mx-0">
            <Image
              src="/brunoFranco.png"
              alt="Team Fratelli Bruno"
              fill
              sizes="(max-width: 768px) 90vw, 440px"
              className="object-contain"
            />
            <div className="pointer-events-none absolute -inset-x-16 -inset-y-16 -z-10 rounded-full bg-black/70 blur-[220px] opacity-75" aria-hidden />
            <div className="pointer-events-none absolute inset-x-[-20%] bottom-[-26%] h-36 bg-gradient-to-t from-background via-background/70 to-transparent blur-[180px] opacity-65" aria-hidden />
          </div>
        </motion.div>
      </div>
    </section>
  );
}




