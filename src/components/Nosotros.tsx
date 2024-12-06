"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function Nosotros() {
  const x = useMotionValue(100); 
  const [lastScrollY, setLastScrollY] = useState(0);

  const desktopTransform = useTransform(x, [100, 0, -100], [
    "translateX(100px)", 
    "translateX(0px)", 
    "translateX(-100px)"
  ]);
  const mobileTransform = useTransform(x, [100, 0, -100], [
    "translateY(100px)", 
    "translateY(0px)", 
    "translateY(-100px)"
  ]);

  const opacity = useTransform(x, [100, 0, -100], [0, 1, 0]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY !== lastScrollY) {
        setLastScrollY(currentScrollY); // Update lastScrollY if it changes
      }

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const section = document.getElementById("image-container");
          if (!section) return;

          const rect = section.getBoundingClientRect();
          const viewportCenter = window.innerHeight / 2;
          const distanceFromCenter = rect.top + rect.height / 2 - viewportCenter;

          const normalizedX = Math.max(
            -100,
            Math.min(100, (distanceFromCenter / (window.innerHeight / 2)) * 100)
          );
          x.set(normalizedX);

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [x, lastScrollY]);

  return (
    <section id="noi" className="pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 top-20">
        <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8">
          {/* Texto */}
          <div className="flex-1 z-10 text-left md:relative">
            <h2 className="text-3xl font-serif mb-6">Chi Siamo</h2>
            <p className="mb-4">
              Fondata nel 1995 da Fiore Bruno, la nostra azienda ha una
              lunga storia di eccellenza nel settore
              dell&apos;ospitalità e della gestione immobiliare. Da allora,
              abbiamo continuato a crescere e ad evolverci,
              mantenendo sempre i valori di qualità e servizio che
              ci hanno reso un punto di riferimento nel nostro
              settore.
            </p>
          </div>

          {/* Imagen animada */}
          <motion.div
            id="image-container"
            style={{
              transform: window.innerWidth >= 768 ? desktopTransform : mobileTransform,
              opacity: opacity,
            }}
            className="flex-1 w-full max-w-xs md:max-w-lg"
          >
            <img
              src="/brunoFranco.png"
              alt="Foto d'archivio"
              className="rounded-lg max-w-[75%] mx-auto h-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
