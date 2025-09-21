"use client";

import { Facebook, Instagram, Linkedin } from "lucide-react";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-ink text-old-paper">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.4em] text-sepia">Fratelli Bruno</p>
            <p className="text-sm text-old-paper/80">
              Francesco y Carlo Bruno lideran proyectos turísticos, gastronómicos e inmobiliarios con soluciones llave en mano para inversionistas y territorios que desean crecer.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-sepia">Servicios</h3>
            <ul className="mt-4 space-y-2 text-sm text-old-paper/80">
              <li>Turismo y hospitalidad</li>
              <li>Restauración y bares</li>
              <li>Construcción y desarrollo</li>
              <li>Gestión inmobiliaria</li>
              <li>Consultoría técnica</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-sepia">Contacto</h3>
            <ul className="mt-4 space-y-2 text-sm text-old-paper/80">
              <li>Via Roma 125, Verona, Italia</li>
              <li>+39 045 123 4567</li>
              <li>projects@fratellibruno.it</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-sepia">Síguenos</h3>
            <p className="mt-4 text-sm text-old-paper/80">
              Inspiración turística, avances de obras y oportunidades de inversión.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="rounded-full border border-old-paper/20 p-2 text-old-paper hover:bg-old-paper hover:text-ink"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="rounded-full border border-old-paper/20 p-2 text-old-paper hover:bg-old-paper hover:text-ink"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="rounded-full border border-old-paper/20 p-2 text-old-paper hover:bg-old-paper hover:text-ink"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-old-paper/20 pt-6 text-xs text-old-paper/60">
          © {year} FRATELLI BRUNO Francesco e Carlo & C. S.n.c. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
