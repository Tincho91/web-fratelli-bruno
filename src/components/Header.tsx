"use client"

import { useEffect, useState } from "react";

export default function Header() {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    setOffsetY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="relative h-screen flex items-center justify-center overflow-hidden">
      <img
        src="/headingBg.png"
        alt="Mapa antiguo"
        className="absolute inset-0 w-full h-full object-cover md:object-contain z-0"
        style={{ transform: `translateY(${offsetY * -0.3}px)` }}
      />
      <div className="z-10 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-sepia text-shadow mb-4">
          Dal 1995, ospitalità e gestione immobiliare
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl text-shadow mb-8">
          Una tradizione di eccellenza iniziata da Fiore Bruno.
        </p>
        <a
          href="#servicios"
          className="py-3 rounded-md text-lg font-medium transition-colors inline-block"
        >
          Scopri la nostra storia
        </a>
      </div>
    </header>
  );
}

