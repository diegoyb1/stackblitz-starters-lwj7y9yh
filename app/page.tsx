export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F1E8] text-[#163A43]">
      <section className="mx-auto max-w-7xl px-6 py-10 md:px-10 md:py-14">
        <header className="flex items-center justify-between border-b border-[#163A43]/10 pb-6">
          <div className="font-serif text-2xl tracking-[0.04em] md:text-3xl">
            CINFRA
          </div>

          <nav className="hidden gap-8 text-sm uppercase tracking-[0.16em] text-[#163A43]/65 md:flex">
            <a href="#enfoque" className="hover:text-[#163A43]">
              Enfoque
            </a>
            <a href="#vision" className="hover:text-[#163A43]">
              Visión
            </a>
            <a href="#contacto" className="hover:text-[#163A43]">
              Contacto
            </a>
          </nav>
        </header>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-6 md:px-10 md:pb-28 md:pt-10">
        <div className="grid items-center gap-14 md:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="mb-8 inline-block rounded-full border border-[#163A43]/12 px-5 py-2.5 text-sm uppercase tracking-[0.18em] text-[#163A43]/60">
              Consorcio Infraestructura
            </div>

            <h1 className="max-w-5xl font-serif text-[52px] leading-[0.95] tracking-[-0.02em] md:text-[88px]">
              Inversión vanguardista en infraestructura y activos renovables de
              alta calidad para un futuro sostenible.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#163A43]/75 md:text-xl">
              Una plataforma con visión de largo plazo, orientada a
              oportunidades selectivas en transición energética,
              infraestructura estratégica y nuevas tecnologías.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#contacto"
                className="rounded-2xl bg-[#163A43] px-7 py-4 text-sm uppercase tracking-[0.14em] text-white transition hover:opacity-95"
              >
                Contacto
              </a>

              <a
                href="#enfoque"
                className="rounded-2xl border border-[#163A43]/15 px-7 py-4 text-sm uppercase tracking-[0.14em] text-[#163A43] transition hover:bg-white/40"
              >
                Conocer más
              </a>
            </div>
          </div>

          <div>
            <div className="rounded-[36px] border border-[#163A43]/10 bg-white/60 p-7 shadow-[0_10px_30px_rgba(22,58,67,0.06)] md:p-10">
              <div className="rounded-[28px] border border-[#163A43]/8 bg-[#F5F1E8] px-8 py-16 text-center md:px-10 md:py-20">
                <div className="font-serif text-6xl tracking-[-0.03em] md:text-7xl">
                  CINFRA
                </div>
                <div className="mt-5 text-sm uppercase tracking-[0.24em] text-[#163A43]/62 md:text-base">
                  Consorcio Infraestructura
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="enfoque"
        className="border-t border-[#163A43]/10 bg-white/30 py-20 md:py-24"
      >
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="mb-12 max-w-3xl">
            <div className="mb-4 text-sm uppercase tracking-[0.18em] text-[#163A43]/55">
              Enfoque
            </div>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl">
              Una plataforma sobria, moderna y preparada para crecer.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-[28px] border border-[#163A43]/10 bg-[#F8F5EE] p-8">
              <h3 className="font-serif text-2xl">Activos renovables</h3>
              <p className="mt-4 leading-7 text-[#163A43]/74">
                Interés en oportunidades vinculadas a generación y
                almacenamiento de energía, con foco en activos de alta calidad y
                desempeño de largo plazo.
              </p>
            </div>

            <div className="rounded-[28px] border border-[#163A43]/10 bg-[#F8F5EE] p-8">
              <h3 className="font-serif text-2xl">Diversidad tecnológica</h3>
              <p className="mt-4 leading-7 text-[#163A43]/74">
                Apertura a distintos vectores de infraestructura sostenible,
                incluyendo solar, almacenamiento en baterías, eólica y otras
                tecnologías complementarias.
              </p>
            </div>

            <div className="rounded-[28px] border border-[#163A43]/10 bg-[#F8F5EE] p-8">
              <h3 className="font-serif text-2xl">Nuevas infraestructuras</h3>
              <p className="mt-4 leading-7 text-[#163A43]/74">
                Exploración de sectores con alto potencial estratégico,
                incluyendo infraestructura digital y plataformas asociadas a
                tendencias estructurales de largo plazo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="vision" className="bg-[#163A43] py-20 text-white md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:px-10">
          <div>
            <div className="mb-4 text-sm uppercase tracking-[0.18em] text-white/55">
              Visión
            </div>
            <h2 className="max-w-xl font-serif text-4xl leading-tight md:text-5xl">
              Una plataforma con visión selectiva y ambición de largo plazo.
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-white/78">
            <p>
              CINFRA busca posicionarse en la intersección entre
              infraestructura, transición energética y nuevas tecnologías,
              capturando oportunidades que requieran criterio, estructura y
              capacidad de ejecución.
            </p>
            <p>
              La propuesta prioriza calidad sobre volumen, relaciones de largo
              plazo y una aproximación disciplinada al desarrollo y gestión de
              activos.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-10 rounded-[32px] border border-[#163A43]/10 bg-white/55 p-8 md:grid-cols-[0.9fr_1.1fr] md:p-12">
            <div>
              <div className="mb-4 text-sm uppercase tracking-[0.18em] text-[#163A43]/55">
                Presencia
              </div>
              <h2 className="font-serif text-4xl leading-tight md:text-5xl">
                Infraestructura, criterio y permanencia.
              </h2>
            </div>

            <div className="text-lg leading-8 text-[#163A43]/75">
              <p>
                Esta primera presencia digital está diseñada para transmitir una
                identidad clara, contenida y confiable. La narrativa prioriza
                sobriedad institucional, apertura estratégica y visión de largo
                plazo, sin necesidad de sobreexponer proyectos o pipeline en
                esta etapa.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="pb-20 md:pb-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-10 rounded-[32px] border border-[#163A43]/10 bg-[#F8F5EE] p-8 md:grid-cols-[0.9fr_1.1fr] md:p-12">
            <div>
              <div className="mb-4 text-sm uppercase tracking-[0.18em] text-[#163A43]/55">
                Contacto
              </div>
              <h2 className="font-serif text-4xl md:text-5xl">Conversemos.</h2>
              <p className="mt-5 max-w-md text-lg leading-8 text-[#163A43]/75">
                Para oportunidades, alianzas o mayor información, puedes
                contactarnos directamente.
              </p>
            </div>

            <form className="grid gap-4">
              <input
                type="text"
                placeholder="Nombre"
                className="rounded-2xl border border-[#163A43]/12 bg-white/80 px-5 py-4 text-[#163A43] outline-none placeholder:text-[#163A43]/35"
              />
              <input
                type="email"
                placeholder="Correo"
                className="rounded-2xl border border-[#163A43]/12 bg-white/80 px-5 py-4 text-[#163A43] outline-none placeholder:text-[#163A43]/35"
              />
              <textarea
                placeholder="Mensaje"
                className="min-h-[160px] rounded-2xl border border-[#163A43]/12 bg-white/80 px-5 py-4 text-[#163A43] outline-none placeholder:text-[#163A43]/35"
              />
              <button
                type="submit"
                className="mt-2 w-fit rounded-2xl bg-[#163A43] px-7 py-4 text-sm uppercase tracking-[0.14em] text-white transition hover:opacity-95"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}