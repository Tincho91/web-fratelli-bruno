"use client";

export default function Contacto() {
  return (
    <section id="contacto" className="bg-old-paper/70 py-20">
      <div className="mx-auto max-w-6xl space-y-12 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr,1fr]">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.4em] text-sepia">Contáctanos</p>
            <h2 className="text-3xl font-semibold text-ink sm:text-4xl">
              Hablemos sobre tu proyecto turístico o inmobiliario
            </h2>
            <p className="text-ink/70">
              Cuéntanos tus metas de inversión o expansión. Prepararemos una propuesta integral que combine planeación
              financiera, arquitectura, construcción y operación para garantizar resultados medibles.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-sepia/20 bg-white/80 p-5 shadow-sm">
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-sepia">Oficina central</h3>
                <p className="mt-2 text-sm text-ink/70">Via Roma 125, Verona, Italia</p>
              </div>
              <div className="rounded-2xl border border-sepia/20 bg-white/80 p-5 shadow-sm">
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-sepia">Contacto directo</h3>
                <p className="mt-2 text-sm text-ink/70">+39 045 123 4567</p>
                <p className="text-sm text-ink/70">projects@fratellibruno.it</p>
              </div>
            </div>
          </div>

          <form className="space-y-5 rounded-3xl border border-sepia/20 bg-white/90 p-6 shadow-lg">
            <div>
              <label htmlFor="nombre" className="block text-sm font-semibold text-ink">
                Nombre completo
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                required
                className="mt-2 w-full rounded-xl border border-sepia/30 bg-old-paper/60 px-4 py-3 text-sm text-ink focus:border-sepia focus:outline-none focus:ring-2 focus:ring-sepia/30"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-ink">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-2 w-full rounded-xl border border-sepia/30 bg-old-paper/60 px-4 py-3 text-sm text-ink focus:border-sepia focus:outline-none focus:ring-2 focus:ring-sepia/30"
              />
            </div>
            <div>
              <label htmlFor="mensaje" className="block text-sm font-semibold text-ink">
                Cuéntanos sobre tu idea
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={4}
                className="mt-2 w-full rounded-xl border border-sepia/30 bg-old-paper/60 px-4 py-3 text-sm text-ink focus:border-sepia focus:outline-none focus:ring-2 focus:ring-sepia/30"
                placeholder="Tipo de proyecto, ubicación, fechas previstas..."
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-sepia px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-old-paper transition hover:bg-ink"
            >
              Enviar mensaje
            </button>
            <p className="text-xs text-ink/50">
              Al enviar el formulario, autorizas a FRATELLI BRUNO Francesco e Carlo & C. S.n.c. a contactarte para ofrecer
              información sobre sus servicios.
            </p>
          </form>
        </div>

        <div className="overflow-hidden rounded-3xl border border-sepia/20 shadow-lg">
          <iframe
            title="Ubicación Fratelli Bruno"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11393.837047473493!2d10.9886937!3d45.438384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477f5f717c4b1f5d%3A0xb53dd0b191d257a7!2sVerona%20VR%2C%20Italia!5e0!3m2!1ses!2sit!4v1701638940000!5m2!1ses!2sit"
            width="100%"
            height="360"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
