"use client"

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function CallToAction() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // "once: true" para que la animación se ejecute solo una vez

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="py-16 text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-serif mb-6">Scopri di più su di noi</h2>
        <p className="mb-8">Esplora la nostra storia, i nostri servizi e la nostra visione per il futuro.</p>
        <motion.div
          ref={ref}
          variants={variants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="inline-block"
        >
          <a href="/chi-siamo"
            className="bg-cover bg-center bg-no-repeat p-6 rounded-lg relative"
            style={{ backgroundImage: "url(/cardsBg.png)" }}
          >
            Esplora
          </a>
        </motion.div>
      </div>
    </section>
  );
}
