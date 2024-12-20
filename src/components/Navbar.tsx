"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  function scrollToSection(id: string): void {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth", // Desplazamiento suave
        block: "center", // Posiciona la sección en el centro de la ventana
      });
    } else {
      console.warn(`Elemento con id "${id}" no encontrado.`);
    }
  }

  return (
    <nav className="fixed w-full z-50">
      <div className="backdrop-blur-md bg-slate-200 bg-opacity-70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/" className="text-2xl font-bold text-sepia">
                  Fratelli Bruno
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {/* Enlace con desplazamiento suave */}
                <a
                  href="https://fratelli-bruno.vercel.app/#noi"
                  className="text-sepia hover:bg-sepia hover:text-old-paper px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("noi");
                  }}
                >
                  Chi Siamo
                </a>

                {/* Enlace externo */}
                <Link
                  href="https://fratelli-bruno.vercel.app/#servizi"
                  className="text-sepia hover:bg-sepia hover:text-old-paper px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("servizi");
                  }}
                >
                  Servizi
                </Link>

                {/* Enlace interno estándar */}
                <Link
                  href="/galleria"
                  className="text-sepia hover:bg-sepia hover:text-old-paper px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Galleria
                </Link>
              </div>
            </div>
            <div className="md:hidden">
              <button className="text-sepia hover:text-ink" onClick={toggleMenu}>
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden absolute top-16 left-0 w-full z-50 backdrop-blur-md bg-slate-200 bg-opacity-70"
          >
            <div className="shadow-lg px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="https://fratelli-bruno.vercel.app/#noi"
                className="text-sepia hover:bg-sepia hover:text-old-paper block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => {
                  scrollToSection("noi");
                  closeMenu(); // Cierra el menú
                }}
              >
                Chi Siamo
              </Link>
              <Link
                href="https://fratelli-bruno.vercel.app/#servizi"
                className="text-sepia hover:bg-sepia hover:text-old-paper block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => {
                  scrollToSection("servizi");
                  closeMenu(); // Cierra el menú
                }}
              >
                Servizi
              </Link>
              <Link
                href="/galleria"
                className="text-sepia hover:bg-sepia hover:text-old-paper block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={closeMenu} // Solo cierra el menú
              >
                Galleria
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}