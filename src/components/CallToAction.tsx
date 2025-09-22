"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function CallToAction() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section className="py-28">
      <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-0">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-4xl border border-border/60 bg-background/80 px-8 py-16 sm:px-12 sm:py-20"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--accent-soft),transparent_60%)] opacity-70" aria-hidden />
          <div className="relative z-10 flex flex-col gap-8 text-center">
            <h2 className="text-3xl font-heading uppercase leading-tight sm:text-5xl">
              Pronti a riaccendere la tua prossima destinazione
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-foreground/70 sm:text-base">
              Lavoriamo con amministrazioni, fondi e famiglie imprenditoriali per trasformare spazi in ecosistemi
              redditizi. Raccontaci il contesto: creiamo un piano operativo, finanziario e narrativo su misura.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                href="#contatti"
                className="inline-flex items-center justify-center rounded-full border border-accent px-8 py-3 text-xs uppercase tracking-[0.4em] text-accent transition-colors duration-300 hover:border-foreground hover:text-foreground"
              >
                Pianifica un incontro
              </motion.a>
              <motion.a
                whileHover={{ x: 4 }}
                href="#servizi"
                className="inline-flex items-center text-xs uppercase tracking-[0.35em] text-foreground/70 transition-colors duration-300 hover:text-accent"
              >
                Guarda i servizi
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
