/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="relative flex h-[85vh] items-center justify-center overflow-hidden">
      <img
        src="/headingBg.png"
        alt="Plano histórico de destinos turísticos"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ transform: `translateY(${offsetY * -0.25}px)` }}
      />
      <div className="relative z-10 max-w-4xl px-4 text-center text-ink">
        <p className="text-xs uppercase tracking-[0.4em] text-sepia">Fratelli Bruno Francesco e Carlo & C. S.n.c.</p>
        <h1 className="mt-6 text-4xl font-bold sm:text-5xl md:text-6xl">
          Hospitalidad, construcción y gestión inmobiliaria con visión integral
        </h1>
        <p className="mt-6 text-lg text-ink/80 sm:text-xl">
          Desde la costa italiana hasta destinos rurales, diseñamos experiencias turísticas, dirigimos proyectos de restauración y actuamos como general contractor para complejos hoteleros, residenciales y comerciales.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#servizi"
            className="rounded-full bg-sepia px-6 py-3 text-sm font-semibold uppercase tracking-widest text-old-paper transition hover:bg-ink"
          >
            Ver servicios
          </a>
          <a
            href="#contacto"
            className="rounded-full border border-sepia/40 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-sepia transition hover:bg-ink hover:text-old-paper"
          >
            Solicitar consultoría
          </a>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-old-paper/80 via-old-paper/20 to-transparent" aria-hidden />
    </header>
  );
}

