"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const metrics = [
  { value: "30+", label: "anni sul territorio" },
  { value: "18", label: "cantieri attivi" },
  { value: "5", label: "destinazioni lanciate" },
];

export default function Header() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const imageShift = useTransform(scrollYProgress, [0, 1], ["0vh", "32vh"]);
  const overlayStrength = useTransform(scrollYProgress, [0, 1], [0.35, 0.6]);

  return (
    <section ref={containerRef} className="relative h-[115vh] overflow-hidden">
      <motion.div style={{ y: imageShift }} className="absolute inset-0">
        <Image
          src="/headingBg.png"
          alt="Panorama di localita italiana"
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      <motion.div
        aria-hidden
        style={{ opacity: overlayStrength }}
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/80"
      />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-6 sm:px-8 lg:px-0">
        <div className="max-w-3xl space-y-6">
          <span className="text-xs uppercase tracking-[0.6em] text-muted">Fratelli Bruno</span>
          <h1 className="text-4xl font-heading uppercase leading-tight tracking-tight text-foreground sm:text-6xl md:text-7xl">
            Idee che respirano tra ospitalita, cantieri e gestione patrimoniale
          </h1>
          <p className="max-w-xl text-sm text-foreground/70 sm:text-base">
            Trasformiamo luoghi in esperienze dinamiche: resort, residenze e asset commerciali che evolvono con chi li
            vive. Guidiamo visione, architettura e operativita con un unico team.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              href="#servizi"
              className="inline-flex items-center justify-center rounded-full border border-foreground/50 px-6 py-3 text-xs uppercase tracking-[0.4em] transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              Esplora servizi
            </motion.a>
            <motion.a
              whileHover={{ x: 4 }}
              href="#contatti"
              className="inline-flex items-center text-xs uppercase tracking-[0.4em] text-foreground/70 transition-colors duration-300 hover:text-accent"
            >
              Parliamo del tuo progetto
            </motion.a>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 text-xs uppercase tracking-[0.35em] text-foreground/60 sm:mt-24 sm:flex-row sm:items-center sm:justify-between">
          <div className="hidden h-px flex-1 bg-foreground/20 sm:block" aria-hidden />
          <div className="flex flex-wrap gap-6 sm:gap-10">
            {metrics.map((metric) => (
              <div key={metric.label} className="space-y-2">
                <p className="text-3xl font-heading tracking-tight text-foreground sm:text-4xl">{metric.value}</p>
                <p>{metric.label}</p>
              </div>
            ))}
          </div>
          <div className="hidden h-px flex-1 bg-foreground/20 sm:block" aria-hidden />
        </div>
      </div>
    </section>
  );
}
