export default function Servicios() {
  return (
    <section className="py-16"> 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
        <h2 className="text-3xl font-serif mb-6">I Nostri Servizi</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div 
            className="bg-center bg-no-repeat p-6 rounded-lg relative shadow" 
            style={{ backgroundImage: "url(/cardsBg.png)" }}
          >
            <div className="relative z-10"> 
              <h3 className="text-xl font-semibold mb-2 text-black">Gestione immobiliare</h3>
              <p className="text-black">Offriamo servizi completi di amministrazione, locazione e vendita immobili.</p>
            </div>
          </div>
          <div 
            className="bg-center bg-no-repeat p-6 rounded-lg relative shadow" 
            style={{ backgroundImage: "url(/cardsBg.png)" }}
          >
            <div className="relative z-10"> 
              <h3 className="text-xl font-semibold mb-2 text-black">Ospitalità e ricettività</h3>
              <p className="text-black">La nostra esperienza nel settore alberghiero garantisce un'accoglienza di qualità.</p>
            </div>
          </div>
          <div 
            className="bg-center bg-no-repeat p-6 rounded-lg relative shadow" 
            style={{ backgroundImage: "url(/cardsBg.png)" }}
          >
            <div className="relative z-10">
              <h3 className="text-xl font-semibold mb-2 text-black">Progetti futuri</h3>
              <p className="text-black">Siamo sempre alla ricerca di nuove opportunità per crescere e innovare.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}