/* global React */
const { useEffect, useRef, useState } = React;

/* ---------- Imagery (Unsplash documentary) ---------- */
const IMG = {
  hero:    "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2000&q=80", // solar field
  wind:    "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1600&q=80", // wind turbines terrain
  bess:    "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1600&q=80", // industrial
  digital: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1600&q=80", // data center
  vision:  "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=2000&q=80", // mountain dawn
  grid:    "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1600&q=80", // transmission lines
  solar2:  "https://images.unsplash.com/photo-1545209463-e2825498edbf?auto=format&fit=crop&w=1600&q=80", // utility-scale solar farm aerial
  terrain: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2000&q=80", // terrain
};

/* ---------- reveal hook ---------- */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .split-word");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* Word-splitter that outputs inline spans with stagger */
function SplitHeading({ text, className = "", as: Tag = "h1", delayStep = 70 }) {
  const words = text.split(" ");
  return (
    <Tag className={className}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span className="split-word" style={{ transitionDelay: `${i * delayStep}ms` }}>
            <span style={{ transitionDelay: `${i * delayStep}ms` }}>{w}</span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </React.Fragment>
      ))}
    </Tag>
  );
}

/* ---------- NAV ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState("ES");
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        transition: "background .35s ease, backdrop-filter .35s ease, border-color .35s ease",
        background: scrolled ? "rgba(245,241,232,0.78)" : "transparent",
        backdropFilter: scrolled ? "saturate(140%) blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "saturate(140%) blur(12px)" : "none",
        borderBottom: `1px solid ${scrolled ? "rgba(22,58,67,0.08)" : "transparent"}`,
      }}
    >
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        padding: "18px 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Monogram size={26} />
          <span className="serif" style={{ fontSize: 22, letterSpacing: "0.04em" }}>CINFRA</span>
        </a>
        <nav style={{ display: "flex", gap: 36, alignItems: "center" }}>
          <a href="#enfoque" className="navlink">Enfoque</a>
          <a href="#sectores" className="navlink">Sectores</a>
          <a href="#vision"   className="navlink">Visión</a>
          <a href="#contacto" className="navlink">Contacto</a>
          <div style={{
            display: "flex", alignItems: "center", gap: 0,
            border: "1px solid var(--ink-12)",
            borderRadius: 999, padding: 3, marginLeft: 8,
            fontSize: 11, letterSpacing: "0.14em",
          }}>
            {["ES", "EN"].map((l) => (
              <button key={l} onClick={() => setLang(l)}
                style={{
                  border: 0, cursor: "pointer",
                  background: lang === l ? "var(--ink)" : "transparent",
                  color: lang === l ? "#fff" : "var(--ink-65)",
                  padding: "6px 11px", borderRadius: 999,
                  letterSpacing: "0.14em", fontWeight: 500,
                  transition: "all .25s ease",
                }}>{l}</button>
            ))}
          </div>
        </nav>
      </div>
      <style>{`
        .navlink {
          font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--ink-65); position: relative; padding: 6px 0;
          transition: color .25s ease;
        }
        .navlink::after {
          content: ""; position: absolute; left: 0; right: 0; bottom: -2px;
          height: 1px; background: var(--ink);
          transform: scaleX(0); transform-origin: left;
          transition: transform .35s cubic-bezier(.2,.7,.2,1);
        }
        .navlink:hover { color: var(--ink); }
        .navlink:hover::after { transform: scaleX(1); }
      `}</style>
    </div>
  );
}

function Monogram({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden>
      <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      <path d="M13 20 Q20 10 27 20" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <path d="M13 22 Q20 30 27 22" stroke="currentColor" strokeWidth="1.4" fill="none" opacity="0.5" />
    </svg>
  );
}

/* ---------- HERO ---------- */
function Hero({ treatment }) {
  return (
    <section id="top" style={{
      position: "relative", minHeight: "100vh",
      paddingTop: 120, paddingBottom: 60,
      display: "flex", alignItems: "center",
      overflow: "hidden",
    }}>
      {treatment === "photo" && (
        <div aria-hidden style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${IMG.hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "saturate(0.85) contrast(0.95)",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(180deg, rgba(245,241,232,0.96) 0%, rgba(245,241,232,0.82) 45%, rgba(22,58,67,0.55) 100%)",
          }} />
        </div>
      )}

      <div style={{
        position: "relative", zIndex: 2,
        maxWidth: 1280, margin: "0 auto", padding: "0 40px",
        width: "100%",
      }}>
        <div className="reveal" style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          padding: "9px 18px", borderRadius: 999,
          border: "1px solid var(--ink-12)",
          background: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(4px)",
          fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase",
          color: "var(--ink-65)", fontWeight: 500,
          marginBottom: 40,
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: 999,
            background: "var(--ink)", display: "inline-block",
          }} />
          Consorcio Infraestructura
        </div>

        <SplitHeading
          as="h1"
          className="serif"
          text="Inversión vanguardista en infraestructura y activos renovables de alta calidad."
          delayStep={55}
        />

        <p className="reveal d3" style={{
          marginTop: 32, maxWidth: 620,
          fontSize: 19, lineHeight: 1.65, color: "var(--ink-75)",
          fontWeight: 400,
        }}>
          Una plataforma con visión de largo plazo, orientada a oportunidades
          selectivas en transición energética, infraestructura estratégica y
          nuevas tecnologías.
        </p>

        <div className="reveal d4" style={{ marginTop: 44, display: "flex", flexWrap: "wrap", gap: 14 }}>
          <a href="#contacto" className="btn btn-primary">Contacto</a>
          <a href="#enfoque"  className="btn btn-ghost">Conocer más</a>
        </div>

        {/* Stat strip */}
        <div className="reveal d5" style={{
          marginTop: 110,
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          gap: 0,
          borderTop: "1px solid var(--ink-12)",
          paddingTop: 28,
          maxWidth: 920,
        }}>
          {[
            ["Horizonte", "Largo plazo"],
            ["Foco", "Calidad selectiva"],
            ["Sectores", "Energía · Digital"],
            ["Geografía", "Latinoamérica"],
          ].map(([k, v], i) => (
            <div key={i} style={{ paddingRight: 20 }}>
              <div className="eyebrow" style={{ fontSize: 10 }}>{k}</div>
              <div className="serif" style={{ fontSize: 22, marginTop: 8, letterSpacing: "-0.01em" }}>{v}</div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: 32, right: 40,
          display: "flex", alignItems: "center", gap: 12,
          fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase",
          color: "var(--ink-55)",
        }}>
          <span>Scroll</span>
          <div style={{
            width: 1, height: 48, background: "var(--ink-12)",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", left: 0, right: 0, top: 0, height: 14,
              background: "var(--ink)",
              animation: "scrollPulse 2.2s cubic-bezier(.6,.1,.4,.9) infinite",
            }} />
          </div>
        </div>
      </div>

      <style>{`
        .btn {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 16px 28px; border-radius: 999px;
          font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase;
          font-weight: 500;
          transition: all .3s cubic-bezier(.2,.7,.2,1);
          cursor: pointer;
        }
        .btn-primary { background: var(--ink); color: #fff; border: 1px solid var(--ink); }
        .btn-primary:hover { background: var(--ink-2); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(22,58,67,.16); }
        .btn-ghost { background: rgba(255,255,255,0.4); color: var(--ink); border: 1px solid var(--ink-12); backdrop-filter: blur(4px); }
        .btn-ghost:hover { background: rgba(255,255,255,0.7); border-color: var(--ink); }

        @keyframes scrollPulse {
          0%   { transform: translateY(-100%); }
          60%  { transform: translateY(340%); }
          100% { transform: translateY(340%); }
        }

        h1.serif {
          font-size: clamp(44px, 7vw, 96px);
          line-height: 0.98;
          letter-spacing: -0.022em;
          max-width: 1100px;
          margin: 0;
          font-weight: 400;
        }
      `}</style>
    </section>
  );
}

/* ---------- ENFOQUE ---------- */
const FOCUS = [
  {
    num: "01",
    title: "Activos renovables",
    body: "Interés en oportunidades vinculadas a generación y almacenamiento de energía, con foco en activos de alta calidad y desempeño de largo plazo.",
    img: IMG.solar2,
    tags: ["Solar", "Eólica", "BESS"],
  },
  {
    num: "02",
    title: "Diversidad tecnológica",
    body: "Apertura a distintos vectores de infraestructura sostenible, incluyendo solar, almacenamiento en baterías, eólica y otras tecnologías complementarias.",
    img: IMG.wind,
    tags: ["Transición", "Híbridos", "Almacenamiento"],
  },
  {
    num: "03",
    title: "Nuevas infraestructuras",
    body: "Exploración de sectores con alto potencial estratégico, incluyendo infraestructura digital y plataformas asociadas a tendencias estructurales de largo plazo.",
    img: IMG.digital,
    tags: ["Digital", "Data centers", "Fibra"],
  },
];

function FocusEditorial() {
  const [hovered, setHovered] = useState(0);

  return (
    <section id="enfoque" style={{
      padding: "140px 0 160px",
      position: "relative",
      borderTop: "1px solid var(--ink-10)",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: 80, alignItems: "start",
        }}>
          {/* Left — heading + list */}
          <div>
            <div className="eyebrow reveal">— Enfoque</div>
            <h2 className="serif reveal d1" style={{
              fontSize: "clamp(36px, 4.2vw, 62px)",
              lineHeight: 1.02,
              marginTop: 20, marginBottom: 0,
              maxWidth: 620,
              fontWeight: 400,
            }}>
              Una plataforma sobria, moderna y preparada para crecer.
            </h2>

            <div style={{ marginTop: 72 }}>
              {FOCUS.map((f, i) => {
                const isActive = hovered === i;
                return (
                  <div
                    key={f.num}
                    className="reveal"
                    style={{ transitionDelay: `${i * 120 + 160}ms` }}
                    onMouseEnter={() => setHovered(i)}
                  >
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "64px 1fr auto",
                      gap: 24, alignItems: "baseline",
                      padding: "32px 0",
                      borderTop: i === 0 ? "1px solid var(--ink-12)" : "none",
                      borderBottom: "1px solid var(--ink-12)",
                      cursor: "pointer",
                      transition: "padding .4s cubic-bezier(.2,.7,.2,1)",
                      paddingLeft: isActive ? 12 : 0,
                    }}>
                      <div className="serif" style={{
                        fontSize: 20, fontStyle: "italic",
                        color: isActive ? "var(--ink)" : "var(--ink-55)",
                        transition: "color .3s ease",
                      }}>{f.num}</div>

                      <div>
                        <h3 className="serif" style={{
                          fontSize: "clamp(26px, 2.6vw, 34px)",
                          margin: 0, fontWeight: 400,
                          letterSpacing: "-0.01em",
                          lineHeight: 1.1,
                        }}>{f.title}</h3>
                        <div style={{
                          maxHeight: isActive ? 200 : 0,
                          opacity: isActive ? 1 : 0,
                          overflow: "hidden",
                          transition: "max-height .6s cubic-bezier(.2,.7,.2,1), opacity .4s ease, margin-top .4s ease",
                          marginTop: isActive ? 14 : 0,
                        }}>
                          <p style={{
                            margin: 0, fontSize: 16, lineHeight: 1.65,
                            color: "var(--ink-75)", maxWidth: 520,
                          }}>{f.body}</p>
                          <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 6 }}>
                            {f.tags.map((t) => (
                              <span key={t} style={{
                                fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase",
                                padding: "5px 10px",
                                border: "1px solid var(--ink-12)",
                                borderRadius: 999,
                                color: "var(--ink-65)",
                              }}>{t}</span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden style={{
                        transform: isActive ? "translateX(4px) rotate(-45deg)" : "rotate(-45deg)",
                        transition: "transform .4s cubic-bezier(.2,.7,.2,1), opacity .3s",
                        opacity: isActive ? 1 : 0.4,
                        alignSelf: "center",
                      }}>
                        <path d="M3 11 H19 M12 4 L19 11 L12 18" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — image preview */}
          <div className="reveal d2" style={{ position: "sticky", top: 120 }}>
            <div style={{
              position: "relative",
              aspectRatio: "4/5",
              borderRadius: 4,
              overflow: "hidden",
              background: "var(--ink)",
            }}>
              {FOCUS.map((f, i) => (
                <div key={f.num} style={{
                  position: "absolute", inset: 0,
                  backgroundImage: `url(${f.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  opacity: hovered === i ? 1 : 0,
                  transform: hovered === i ? "scale(1)" : "scale(1.04)",
                  transition: "opacity 1s cubic-bezier(.2,.7,.2,1), transform 1.6s cubic-bezier(.2,.7,.2,1)",
                  filter: "saturate(0.82) contrast(0.96)",
                }} />
              ))}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(180deg, transparent 40%, rgba(22,58,67,0.55) 100%)",
              }} />
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                padding: "24px 26px",
                color: "#fff",
                display: "flex", justifyContent: "space-between", alignItems: "flex-end",
              }}>
                <div>
                  <div style={{
                    fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase",
                    opacity: 0.7, marginBottom: 6,
                  }}>Referencia visual</div>
                  <div className="serif" style={{ fontSize: 22, lineHeight: 1 }}>
                    {FOCUS[hovered].title}
                  </div>
                </div>
                <div className="serif" style={{
                  fontSize: 36, fontStyle: "italic", opacity: 0.55,
                }}>{FOCUS[hovered].num}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Original 3-card grid variant */
function FocusGrid() {
  return (
    <section id="enfoque" style={{
      padding: "120px 0 140px",
      background: "rgba(255,255,255,0.35)",
      borderTop: "1px solid var(--ink-10)",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
        <div style={{ marginBottom: 72, maxWidth: 640 }}>
          <div className="eyebrow reveal">— Enfoque</div>
          <h2 className="serif reveal d1" style={{
            fontSize: "clamp(34px, 3.8vw, 52px)",
            lineHeight: 1.08, margin: "20px 0 0", fontWeight: 400,
          }}>Una plataforma sobria, moderna y preparada para crecer.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
          {FOCUS.map((f, i) => (
            <div key={f.num} className="reveal" style={{
              transitionDelay: `${i * 120}ms`,
              padding: 36, borderRadius: 28,
              background: "#F8F5EE",
              border: "1px solid var(--ink-10)",
            }}>
              <div className="serif" style={{ fontStyle: "italic", color: "var(--ink-55)", marginBottom: 24 }}>{f.num}</div>
              <h3 className="serif" style={{ fontSize: 28, margin: 0, fontWeight: 400 }}>{f.title}</h3>
              <p style={{ marginTop: 18, color: "var(--ink-75)", lineHeight: 1.65, fontSize: 15 }}>{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- SECTORES marquee ---------- */
const SECTORS = [
  { name: "Solar",       img: IMG.solar2,  meta: "Generación fotovoltaica" },
  { name: "Eólica",      img: IMG.wind,    meta: "Onshore · Latinoamérica" },
  { name: "BESS",        img: IMG.bess,    meta: "Almacenamiento en baterías" },
  { name: "Transmisión", img: IMG.grid,    meta: "Infraestructura de red" },
  { name: "Digital",     img: IMG.digital, meta: "Data centers · Fibra" },
  { name: "Terreno",     img: IMG.terrain, meta: "Desarrollo greenfield" },
];

function Sectores({ imageryOn }) {
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(null);

  return (
    <section id="sectores" style={{
      padding: "120px 0 140px",
      borderTop: "1px solid var(--ink-10)",
      overflow: "hidden",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px 48px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 40, flexWrap: "wrap" }}>
          <div>
            <div className="eyebrow reveal">— Sectores</div>
            <h2 className="serif reveal d1" style={{
              fontSize: "clamp(32px, 3.4vw, 48px)",
              lineHeight: 1.08, margin: "20px 0 0", fontWeight: 400,
              maxWidth: 640,
            }}>
              Vectores donde exploramos oportunidades.
            </h2>
          </div>
          <p className="reveal d2" style={{
            maxWidth: 380, color: "var(--ink-65)", lineHeight: 1.65, margin: 0,
            fontSize: 15,
          }}>
            Apertura a distintos vectores de infraestructura sostenible y
            plataformas asociadas a tendencias estructurales de largo plazo.
          </p>
        </div>
      </div>

      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => { setPaused(false); setHovered(null); }}
        style={{
          position: "relative",
          maskImage: "linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 0, #000 8%, #000 92%, transparent 100%)",
        }}>
        <div style={{
          display: "flex", gap: 22,
          animation: "marquee 50s linear infinite",
          animationPlayState: paused ? "paused" : "running",
          width: "max-content",
        }}>
          {[...SECTORS, ...SECTORS].map((s, i) => (
            <div key={i}
              onMouseEnter={() => setHovered(i)}
              style={{
                position: "relative",
                flex: "0 0 auto",
                width: 360, height: 460,
                borderRadius: 4,
                overflow: "hidden",
                background: "var(--ink)",
                cursor: "pointer",
                filter: hovered !== null && hovered !== i ? "grayscale(60%) brightness(0.75)" : "none",
                transform: hovered === i ? "scale(1.02)" : "scale(1)",
                transition: "filter .5s ease, transform .5s cubic-bezier(.2,.7,.2,1)",
              }}>
              {imageryOn ? (
                <div style={{
                  position: "absolute", inset: 0,
                  backgroundImage: `url(${s.img})`,
                  backgroundSize: "cover", backgroundPosition: "center",
                  filter: "saturate(0.82) contrast(0.95)",
                  transform: hovered === i ? "scale(1.06)" : "scale(1)",
                  transition: "transform 2s cubic-bezier(.2,.7,.2,1)",
                }} />
              ) : (
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(180deg, #1d4a55 0%, #0E2A31 100%)",
                }} />
              )}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(180deg, rgba(22,58,67,0.0) 45%, rgba(22,58,67,0.8) 100%)",
              }} />
              <div style={{
                position: "absolute", left: 24, top: 22,
                color: "#fff",
                fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase",
                opacity: 0.82,
              }}>
                {String(((i % SECTORS.length) + 1)).padStart(2, "0")} · Sector
              </div>
              <div style={{
                position: "absolute", left: 24, right: 24, bottom: 24,
                color: "#fff",
              }}>
                <div className="serif" style={{
                  fontSize: 42, lineHeight: 1, letterSpacing: "-0.01em",
                }}>{s.name}</div>
                <div style={{
                  marginTop: 8, fontSize: 13, opacity: 0.8, letterSpacing: "0.01em",
                }}>{s.meta}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

/* ---------- VISIÓN (dark parallax) ---------- */
function Vision() {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = (vh - rect.top) / (vh + rect.height);
      setOffset(Math.max(-0.1, Math.min(1.1, progress)) * 80 - 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="vision" ref={ref} style={{
      position: "relative",
      background: "var(--ink)",
      color: "#fff",
      overflow: "hidden",
      padding: "150px 0 170px",
    }}>
      <div aria-hidden style={{
        position: "absolute", inset: "-10% 0",
        backgroundImage: `url(${IMG.vision})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.28,
        filter: "saturate(0.7) contrast(1.05)",
        transform: `translateY(${offset}px) scale(1.06)`,
        transition: "transform .05s linear",
      }} />
      <div aria-hidden style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(22,58,67,0.2) 0%, rgba(22,58,67,0.7) 55%, rgba(14,42,49,0.95) 100%)",
      }} />

      <div style={{
        position: "relative", zIndex: 2,
        maxWidth: 1280, margin: "0 auto", padding: "0 40px",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80,
      }}>
        <div>
          <div className="eyebrow reveal" style={{ color: "rgba(255,255,255,0.55)" }}>— Visión</div>
          <h2 className="serif reveal d1" style={{
            fontSize: "clamp(40px, 5vw, 72px)",
            lineHeight: 1.02, margin: "20px 0 0",
            maxWidth: 560, fontWeight: 400, letterSpacing: "-0.015em",
          }}>
            Una plataforma con visión selectiva y ambición de largo plazo.
          </h2>
        </div>

        <div className="reveal d2" style={{
          fontSize: 19, lineHeight: 1.7, color: "rgba(255,255,255,0.82)",
          maxWidth: 520,
        }}>
          <p style={{ margin: 0 }}>
            CINFRA busca posicionarse en la intersección entre infraestructura,
            transición energética y nuevas tecnologías, capturando oportunidades
            que requieran criterio, estructura y capacidad de ejecución.
          </p>
          <p style={{ marginTop: 22 }}>
            La propuesta prioriza calidad sobre volumen, relaciones de largo
            plazo y una aproximación disciplinada al desarrollo y gestión de
            activos.
          </p>

          <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
            {[
              ["Criterio", "Selectividad disciplinada sobre volumen."],
              ["Permanencia", "Relaciones y activos de largo plazo."],
              ["Ejecución", "Capacidad operativa y estructuración."],
              ["Apertura", "Vectores tecnológicos complementarios."],
            ].map(([k, v]) => (
              <div key={k} style={{
                paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.18)",
              }}>
                <div className="serif" style={{ fontSize: 22, letterSpacing: "-0.005em" }}>{k}</div>
                <div style={{ marginTop: 6, fontSize: 14, color: "rgba(255,255,255,0.62)", lineHeight: 1.55 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- PRESENCIA + CONTACTO (closing) ---------- */
function Closing({ alternation }) {
  const bg = alternation === "bone" ? "#EFE8D6" : "transparent";
  return (
    <section id="contacto" style={{
      padding: "140px 0 60px",
      background: bg,
      borderTop: alternation === "bone" ? "1px solid var(--ink-10)" : "none",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px" }}>
        {/* Presencia */}
        <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 80, marginBottom: 120 }}>
          <div>
            <div className="eyebrow reveal">— Presencia</div>
            <h2 className="serif reveal d1" style={{
              fontSize: "clamp(36px, 4vw, 56px)",
              lineHeight: 1.04, margin: "20px 0 0", fontWeight: 400,
              maxWidth: 440,
            }}>
              Infraestructura, criterio y permanencia.
            </h2>
          </div>
          <div className="reveal d2" style={{ fontSize: 18, lineHeight: 1.7, color: "var(--ink-75)", maxWidth: 620 }}>
            <p style={{ margin: 0 }}>
              Esta primera presencia digital está diseñada para transmitir una
              identidad clara, contenida y confiable. La narrativa prioriza
              sobriedad institucional, apertura estratégica y visión de largo
              plazo, sin necesidad de sobreexponer proyectos o pipeline en esta
              etapa.
            </p>
          </div>
        </div>

        {/* Contacto */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "0.9fr 1.1fr",
          gap: 80, alignItems: "start",
          paddingTop: 60,
          borderTop: "1px solid var(--ink-12)",
        }}>
          <div>
            <div className="eyebrow reveal">— Contacto</div>
            <SplitHeading as="h2" className="serif reveal-h" text="Conversemos." delayStep={0} />
            <p className="reveal d2" style={{
              marginTop: 20, fontSize: 18, lineHeight: 1.65,
              color: "var(--ink-75)", maxWidth: 420,
            }}>
              Para oportunidades, alianzas o mayor información, puedes
              contactarnos directamente.
            </p>

            <div className="reveal d3" style={{ marginTop: 48, display: "grid", gap: 20 }}>
              {[
                ["Correo",    "contacto@cinfra.cl"],
                ["Ubicación", "Santiago · Chile"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "grid", gridTemplateColumns: "110px 1fr", alignItems: "baseline" }}>
                  <div className="eyebrow" style={{ fontSize: 10 }}>{k}</div>
                  <div className="serif" style={{ fontSize: 22, letterSpacing: "-0.005em" }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          <ContactForm />
        </div>

        {/* Footer */}
        <footer style={{
          marginTop: 140, paddingTop: 36, paddingBottom: 8,
          borderTop: "1px solid var(--ink-12)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 20,
          fontSize: 12, letterSpacing: "0.04em", color: "var(--ink-65)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Monogram size={22} />
            <span className="serif" style={{ fontSize: 18, letterSpacing: "0.04em" }}>CINFRA</span>
            <span style={{ marginLeft: 14, opacity: 0.6 }}>Consorcio Infraestructura</span>
          </div>
          <div style={{ display: "flex", gap: 24 }}>
            <span>© 2026 CINFRA</span>
            <a href="#" style={{ textDecoration: "underline", textUnderlineOffset: 3, opacity: 0.7 }}>Aviso legal</a>
            <a href="#" style={{ textDecoration: "underline", textUnderlineOffset: 3, opacity: 0.7 }}>Privacidad</a>
          </div>
        </footer>
      </div>

      <style>{`
        .reveal-h.serif { font-size: clamp(44px, 5vw, 72px); margin: 20px 0 0; font-weight: 400; letter-spacing: -0.02em; line-height: 1; }
      `}</style>
    </section>
  );
}

function ContactForm() {
  const [values, setValues] = useState({ nombre: "", correo: "", mensaje: "" });
  const [focused, setFocused] = useState(null);
  const [sent, setSent] = useState(false);

  const onChange = (k) => (e) => setValues((v) => ({ ...v, [k]: e.target.value }));
  const onSubmit = (e) => {
    e.preventDefault();
    if (!values.nombre || !values.correo) return;
    setSent(true);
    setTimeout(() => setSent(false), 3500);
    setValues({ nombre: "", correo: "", mensaje: "" });
  };

  const Field = ({ k, label, type = "text", area }) => {
    const active = focused === k || values[k];
    const Tag = area ? "textarea" : "input";
    return (
      <div style={{ position: "relative", borderBottom: `1px solid ${focused === k ? "var(--ink)" : "var(--ink-12)"}`, transition: "border-color .3s" }}>
        <label style={{
          position: "absolute", left: 0, top: active ? 6 : 26,
          fontSize: active ? 10 : 14,
          letterSpacing: active ? "0.2em" : "0",
          textTransform: active ? "uppercase" : "none",
          color: active ? "var(--ink-65)" : "var(--ink-55)",
          transition: "all .35s cubic-bezier(.2,.7,.2,1)",
          pointerEvents: "none",
        }}>{label}</label>
        <Tag
          type={type}
          value={values[k]}
          onChange={onChange(k)}
          onFocus={() => setFocused(k)}
          onBlur={() => setFocused(null)}
          rows={area ? 3 : undefined}
          style={{
            width: "100%",
            padding: area ? "28px 0 14px" : "28px 0 14px",
            border: 0, outline: "none",
            background: "transparent",
            color: "var(--ink)",
            fontFamily: "inherit", fontSize: 17,
            resize: area ? "none" : undefined,
          }}
        />
      </div>
    );
  };

  return (
    <form onSubmit={onSubmit} className="reveal d1" style={{ display: "grid", gap: 22 }}>
      <Field k="nombre" label="Nombre" />
      <Field k="correo" label="Correo electrónico" type="email" />
      <Field k="mensaje" label="Mensaje" area />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16, flexWrap: "wrap", gap: 16 }}>
        <div style={{
          fontSize: 12, color: "var(--ink-55)", maxWidth: 320, lineHeight: 1.55,
        }}>
          Al enviar este formulario, aceptas ser contactado por nuestro equipo.
        </div>
        <button type="submit" className="btn btn-primary" style={{ alignSelf: "flex-end" }}>
          <span>{sent ? "Enviado" : "Enviar mensaje"}</span>
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
            <path d={sent ? "M3 8 L7 12 L13 4" : "M3 8 H13 M9 4 L13 8 L9 12"} stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </form>
  );
}

/* expose */
Object.assign(window, {
  Nav, Hero, FocusEditorial, FocusGrid, Sectores, Vision, Closing, useReveal,
});
