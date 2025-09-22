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
    <section id="noi" className="relative isolate overflow-hidden py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,var(--accent-soft),transparent_65%)]" aria-hidden />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(135deg,rgba(255,255,255,0.04)_0%,rgba(0,0,0,0)_60%)]" aria-hidden />

      <div className="relative mx-auto grid max-w-6xl gap-16 px-6 sm:px-8 lg:grid-cols-[1.05fr,0.95fr] lg:px-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="space-y-10"
        >
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-[0.6em] text-muted">Chi siamo</span>
            <h2 className="text-4xl font-heading uppercase leading-tight sm:text-5xl">
              Una regia unica per ospitalita, costruzioni e gestione immobiliare
            </h2>
            <p className="text-sm text-foreground/70 sm:text-base">
              Dal 1995 firmiamo resort, residenze e spazi commerciali con un approccio end-to-end. Valutiamo il potenziale
              del territorio, definiamo il concept e coordiniamo cantieri e operazioni quotidiane.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="rounded-4xl border border-border/60 bg-background/60 p-6 backdrop-blur">
                <h3 className="text-sm uppercase tracking-[0.35em] text-foreground/80">{pillar.title}</h3>
                <p className="mt-3 text-sm text-foreground/65">{pillar.description}</p>
              </div>
            ))}
          </div>

          <div className="rounded-4xl border border-border/60 bg-background/40 p-6 backdrop-blur">
            <h3 className="text-xs uppercase tracking-[0.45em] text-muted">Cosa ci distingue</h3>
            <ul className="mt-4 grid gap-2 text-sm text-foreground/70 sm:grid-cols-2">
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
          <div className="relative mx-auto w-full max-w-md overflow-hidden aspect-[3/5] max-h-[60vh] sm:mx-0 sm:max-w-full lg:max-h-none rounded-4xl border border-border/60 bg-background/50 shadow-[0_40px_80px_rgba(0,0,0,0.45)]">
            <Image
              src="/brunoFranco.png"
              alt="Team Fratelli Bruno"
              fill
              sizes="(max-width: 1024px) 100vw, 480px"
              className="object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" aria-hidden />
          </div>
        </motion.div>
      </div>
    </section>
  );
}



