export default function Contacto() {
  return (
    <section id="contacto" className="py-12 bg-old-paper bg-opacity-80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-serif mb-6">Contáctanos</h2>
        <form className="grid grid-cols-1 gap-6">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-ink">Nombre</label>
            <input type="text" id="nombre" name="nombre" className="mt-1 block w-full border border-sepia rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sepia focus:border-sepia bg-old-paper text-ink" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-ink">Email</label>
            <input type="email" id="email" name="email" className="mt-1 block w-full border border-sepia rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sepia focus:border-sepia bg-old-paper text-ink" />
          </div>
          <div>
            <label htmlFor="mensaje" className="block text-sm font-medium text-ink">Mensaje</label>
            <textarea id="mensaje" name="mensaje" rows={4} className="mt-1 block w-full border border-sepia rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sepia focus:border-sepia bg-old-paper text-ink"></textarea>
          </div>
          <div>
            <button type="submit" className="bg-sepia text-old-paper hover:bg-ink border border-sepia rounded-md py-2 px-4 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sepia">
              Enviar Mensaje
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
