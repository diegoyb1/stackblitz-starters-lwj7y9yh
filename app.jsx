/* global React, ReactDOM */
const { useEffect, useState } = React;

function App() {
  const [tweaks, setTweaks] = useState(window.__TWEAKS);

  // reveal observer
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .split-word");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });

  // texture body class
  useEffect(() => {
    document.body.classList.toggle("grain", tweaks.texture === "grain");
    document.body.classList.toggle("paper", tweaks.texture === "paper");
  }, [tweaks.texture]);

  // --- Tweak bridge ---
  useEffect(() => {
    const onMsg = (e) => {
      if (!e.data || typeof e.data !== "object") return;
      if (e.data.type === "__activate_edit_mode") setEdit(true);
      if (e.data.type === "__deactivate_edit_mode") setEdit(false);
    };
    window.addEventListener("message", onMsg);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const [edit, setEdit] = useState(false);

  const update = (patch) => {
    const next = { ...tweaks, ...patch };
    setTweaks(next);
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: patch }, "*");
  };

  return (
    <>
      <Nav />
      <Hero treatment={tweaks.heroTreatment} />
      {tweaks.focusLayout === "grid" ? <FocusGrid /> : <FocusEditorial />}
      <Sectores imageryOn={tweaks.imagery === "on"} />
      <Vision />
      <Closing alternation={tweaks.alternation} />

      {edit && <TweaksPanel tweaks={tweaks} update={update} />}
    </>
  );
}

function TweaksPanel({ tweaks, update }) {
  const Row = ({ label, value, options, onChange }) => (
    <div style={{ display: "grid", gap: 8 }}>
      <div style={{
        fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
        color: "rgba(255,255,255,0.55)", fontWeight: 500,
      }}>{label}</div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {options.map((o) => (
          <button key={o.v} onClick={() => onChange(o.v)} style={{
            padding: "7px 11px", borderRadius: 6,
            border: "1px solid rgba(255,255,255,0.18)",
            background: value === o.v ? "#fff" : "transparent",
            color: value === o.v ? "var(--ink)" : "#fff",
            fontSize: 11, letterSpacing: "0.04em",
            cursor: "pointer", fontFamily: "inherit",
            transition: "all .2s ease",
          }}>{o.l}</button>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{
      position: "fixed", bottom: 20, right: 20, zIndex: 100,
      width: 300, padding: 22,
      background: "var(--ink-2)", color: "#fff",
      borderRadius: 14,
      boxShadow: "0 24px 60px rgba(0,0,0,0.28)",
      display: "grid", gap: 18,
      fontFamily: "var(--sans)",
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.12)",
      }}>
        <div className="serif" style={{ fontSize: 20, fontFamily: "var(--serif)" }}>Tweaks</div>
        <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
          CINFRA
        </div>
      </div>

      <Row label="Hero" value={tweaks.heroTreatment}
        options={[{ v: "photo", l: "Photo + scrim" }, { v: "type", l: "Typographic" }, { v: "mark", l: "Monogram" }]}
        onChange={(v) => update({ heroTreatment: v })} />

      <Row label="Enfoque layout" value={tweaks.focusLayout}
        options={[{ v: "editorial", l: "Editorial list" }, { v: "grid", l: "3-card grid" }]}
        onChange={(v) => update({ focusLayout: v })} />

      <Row label="Texture" value={tweaks.texture}
        options={[{ v: "off", l: "Off" }, { v: "grain", l: "Grain" }, { v: "paper", l: "Paper dots" }]}
        onChange={(v) => update({ texture: v })} />

      <Row label="Section alternation" value={tweaks.alternation}
        options={[{ v: "cream", l: "Cream only" }, { v: "bone", l: "+ Bone" }]}
        onChange={(v) => update({ alternation: v })} />

      <Row label="Sector imagery" value={tweaks.imagery}
        options={[{ v: "on", l: "Photography" }, { v: "off", l: "Typographic" }]}
        onChange={(v) => update({ imagery: v })} />
    </div>
  );
}

/* Simpler fallback hero treatments */
const _Hero = window.Hero;
window.Hero = function WrappedHero({ treatment }) {
  if (treatment === "type") {
    return <HeroTypographic />;
  }
  if (treatment === "mark") {
    return <HeroMark />;
  }
  return <_Hero treatment="photo" />;
};

function HeroTypographic() {
  return (
    <section id="top" style={{
      position: "relative", minHeight: "100vh",
      paddingTop: 140, paddingBottom: 80,
      display: "flex", alignItems: "center",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px", width: "100%" }}>
        <div className="reveal eyebrow" style={{ marginBottom: 24 }}>— Consorcio Infraestructura</div>
        <h1 className="serif reveal d1" style={{
          fontSize: "clamp(64px, 11vw, 180px)",
          lineHeight: 0.92, margin: 0, fontWeight: 400,
          letterSpacing: "-0.035em",
        }}>
          Infra<span style={{ fontStyle: "italic" }}>estructura</span>,<br/>
          criterio y<br/>
          permanencia.
        </h1>
        <div className="reveal d3" style={{
          marginTop: 60,
          display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 60,
          paddingTop: 40, borderTop: "1px solid var(--ink-12)",
        }}>
          <p style={{ margin: 0, fontSize: 19, lineHeight: 1.65, color: "var(--ink-75)", maxWidth: 560 }}>
            Una plataforma con visión de largo plazo, orientada a
            oportunidades selectivas en transición energética, infraestructura
            estratégica y nuevas tecnologías.
          </p>
          <div style={{ display: "flex", gap: 12, alignSelf: "end", justifyContent: "flex-end", flexWrap: "wrap" }}>
            <a href="#contacto" className="btn btn-primary">Contacto</a>
            <a href="#enfoque"  className="btn btn-ghost">Conocer más</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroMark() {
  return (
    <section id="top" style={{
      position: "relative", minHeight: "100vh",
      paddingTop: 140, paddingBottom: 80,
      display: "flex", alignItems: "center",
      background: "radial-gradient(60% 80% at 50% 40%, #EFE8D6 0%, var(--cream) 60%)",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px", width: "100%", textAlign: "center" }}>
        <div className="reveal" style={{ display: "flex", justifyContent: "center", marginBottom: 48 }}>
          <svg width="180" height="180" viewBox="0 0 200 200" fill="none" aria-hidden>
            <circle cx="100" cy="100" r="98" stroke="var(--ink)" strokeWidth="1" opacity="0.2"/>
            <circle cx="100" cy="100" r="70" stroke="var(--ink)" strokeWidth="1" opacity="0.35"/>
            <path d="M45 105 Q100 40 155 105" stroke="var(--ink)" strokeWidth="1.5" fill="none"/>
            <path d="M45 115 Q100 180 155 115" stroke="var(--ink)" strokeWidth="1.5" fill="none" opacity="0.5"/>
            <text x="100" y="108" textAnchor="middle" className="serif"
                  style={{ fontFamily: "var(--serif)", fontSize: 22, letterSpacing: "0.24em", fill: "var(--ink)" }}>
              CINFRA
            </text>
          </svg>
        </div>
        <div className="eyebrow reveal d1">Consorcio Infraestructura</div>
        <h1 className="serif reveal d2" style={{
          fontSize: "clamp(40px, 6vw, 88px)",
          lineHeight: 1, letterSpacing: "-0.02em",
          margin: "24px auto 0", maxWidth: 1000, fontWeight: 400,
        }}>
          Inversión vanguardista en infraestructura y activos renovables de alta calidad.
        </h1>
        <p className="reveal d3" style={{
          margin: "32px auto 0", maxWidth: 620, fontSize: 18, lineHeight: 1.65, color: "var(--ink-75)",
        }}>
          Una plataforma con visión de largo plazo, orientada a
          oportunidades selectivas en transición energética, infraestructura
          estratégica y nuevas tecnologías.
        </p>
        <div className="reveal d4" style={{ marginTop: 40, display: "flex", justifyContent: "center", gap: 12 }}>
          <a href="#contacto" className="btn btn-primary">Contacto</a>
          <a href="#enfoque"  className="btn btn-ghost">Conocer más</a>
        </div>
      </div>
    </section>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
