"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function CallToAction() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  } as const;

  return (
    <section className="py-20">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 rounded-3xl border border-sepia/20 bg-gradient-to-br from-old-paper/90 via-white to-old-paper/70 px-8 py-16 text-center shadow-xl">
        <h2 className="text-3xl font-semibold text-ink sm:text-4xl">
          Listos para liderar tu próximo destino turístico o desarrollo inmobiliario
        </h2>
        <p className="max-w-3xl text-base text-ink/70">
          Con un equipo multidisciplinario, coordinamos cada fase del proyecto: análisis del terreno, diseño, construcción,
          operaciones hoteleras y marketing. Cuéntanos qué quieres crear y te acompañaremos como socio estratégico.
        </p>
        <motion.div
          ref={ref}
          variants={variants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <a
            href="#contacto"
            className="inline-flex items-center gap-3 rounded-full bg-sepia px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-old-paper transition hover:bg-ink"
          >
            Agendar una reunión
          </a>
        </motion.div>
      </div>
    </section>
  );
}
