"use client"
import { useEffect, useRef } from 'react'

const GOLD = '#c4a96d'
const RED  = '#e8001d'

const LENSES = [
  {
    id: 1,
    src: '/Other-lens/Whisk_722a67f879788d3859f44342661a0fd0dr.jpeg',
    badge: 'G Master · FE Mount',
    name: 'FE 24-70mm',
    sub: 'f/2.8 GM II',
    tag: 'Zoom',
    description:
      'The definitive standard zoom. Dual XD Linear Motors deliver instantaneous, whisper-quiet autofocus while the 11-blade aperture renders silk-smooth bokeh from 24mm to 70mm — all at a constant f/2.8.',
    specs: [
      { label: 'Focal Range', value: '24–70mm' },
      { label: 'Max Aperture', value: 'f/2.8 constant' },
      { label: 'Elements', value: '20 in 15 groups' },
      { label: 'Weight', value: '695g' },
    ],
    accent: GOLD,
    watermark: '2470',
  },
  {
    id: 2,
    src: '/Other-lens/Whisk_89c28bd62c3773582cb4f8a4a54afe1adr.jpeg',
    badge: 'G Master · FE Mount',
    name: 'FE 14mm',
    sub: 'f/1.8 GM',
    tag: 'Ultra-Wide',
    description:
      'See the world uncompromised. At just 460g, this featherweight ultra-wide G Master delivers tack-sharp edges corner-to-corner, even wide open. Urban nightscapes, architecture, astro — nothing escapes it.',
    specs: [
      { label: 'Focal Length', value: '14mm' },
      { label: 'Max Aperture', value: 'f/1.8' },
      { label: 'Elements', value: '14 in 11 groups' },
      { label: 'Weight', value: '460g' },
    ],
    accent: '#e83030',
    watermark: '14mm',
  },
  {
    id: 3,
    src: '/Other-lens/Whisk_ad3785ac0d7286a9a5841fdc45eef346dr.jpeg',
    badge: 'G Master · FE Mount',
    name: 'FE 50mm',
    sub: 'f/1.2 GM',
    tag: 'Prime',
    description:
      'The closest thing to seeing with your eyes — then making it better. At f/1.2, this 50mm G Master produces a three-dimensional separation between subject and background that no zoom can replicate.',
    specs: [
      { label: 'Focal Length', value: '50mm' },
      { label: 'Max Aperture', value: 'f/1.2' },
      { label: 'Elements', value: '14 in 10 groups' },
      { label: 'Weight', value: '778g' },
    ],
    accent: GOLD,
    watermark: '50mm',
  },
  {
    id: 4,
    src: '/Other-lens/Whisk_d9b39e8f9b79bd799a944dbe9878d230dr.jpeg',
    badge: 'G Master · FE Mount',
    name: 'FE 70-200mm',
    sub: 'f/2.8 GM II',
    tag: 'Telephoto',
    description:
      'Reach further without compromise. The second-generation 70-200mm GM II is 29% lighter than its predecessor while gaining speed. Sports, wildlife, portraits from a distance — f/2.8 holds through every frame.',
    specs: [
      { label: 'Focal Range', value: '70–200mm' },
      { label: 'Max Aperture', value: 'f/2.8 constant' },
      { label: 'Elements', value: '17 in 14 groups' },
      { label: 'Weight', value: '1045g' },
    ],
    accent: '#c8b88a',
    watermark: '200',
  },
]

export default function OtherLenses() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll<HTMLElement>('.ol-card')
    if (!cards) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const i = parseInt(el.dataset.idx || '0', 10)
            el.style.transitionDelay = `${i * 0.12}s`
            el.classList.add('ol-card--visible')
            io.unobserve(el)
          }
        })
      },
      { threshold: 0.12 }
    )

    cards.forEach((card) => io.observe(card))
    return () => io.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="ol-section">
      {/* Grain overlay */}
      <div className="ol-grain" aria-hidden="true" />

      {/* Header */}
      <div className="ol-header">
        <div className="ol-header-eyebrow">
          <div className="ol-header-line" />
          <span>Compatible Lenses · G Master Series · Full E-Mount</span>
        </div>
        <h2 className="ol-header-title">
          EXPAND<br />
          <span style={{ color: GOLD }}>YOUR REACH.</span>
        </h2>
        <p className="ol-header-sub">
          Every lens below is engineered to meet the Sony α7 IV's full-frame sensor
          head-on — with G Master optics that extract every photon.
        </p>
      </div>

      {/* Cards */}
      <div className="ol-grid">
        {LENSES.map((lens, idx) => (
          <div key={lens.id} className="ol-card" data-idx={idx}>
            {/* Image */}
            <div className="ol-img-wrap">
              <img
                src={lens.src}
                alt={`${lens.name} ${lens.sub}`}
                className="ol-img"
              />
              <div className="ol-img-vignette" />
              {/* Tag pill */}
              <div className="ol-tag" style={{ borderColor: lens.accent, color: lens.accent }}>
                {lens.tag}
              </div>
            </div>

            {/* Body */}
            <div className="ol-body">
              {/* Badge */}
              <div className="ol-badge">
                <div className="ol-badge-dot" style={{ background: lens.accent }} />
                {lens.badge}
              </div>

              {/* Name */}
              <div className="ol-name-block">
                <div className="ol-name" style={{ color: '#f5f0eb' }}>
                  {lens.name}
                </div>
                <div className="ol-name-sub" style={{ color: lens.accent }}>
                  {lens.sub}
                </div>
              </div>

              {/* Description */}
              <p className="ol-desc">{lens.description}</p>

              {/* Specs grid */}
              <div className="ol-specs">
                {lens.specs.map((s) => (
                  <div key={s.label} className="ol-spec-item">
                    <div className="ol-spec-label">{s.label}</div>
                    <div className="ol-spec-value" style={{ color: lens.accent }}>{s.value}</div>
                  </div>
                ))}
              </div>

              {/* Watermark */}
              <div
                className="ol-watermark"
                style={{ WebkitTextStroke: `1px rgba(255,255,255,0.04)`, color: 'transparent' }}
                aria-hidden="true"
              >
                {lens.watermark}
              </div>

              {/* Corner decorations */}
              <div className="ol-corner ol-corner-tl" style={{ borderColor: `${lens.accent}44` }} />
              <div className="ol-corner ol-corner-br" style={{ borderColor: `${lens.accent}44` }} />

              {/* CTA */}
              <div className="ol-cta-row">
                <div className="ol-divider" style={{ background: `${lens.accent}33` }} />
                <button className="ol-cta" style={{ color: lens.accent }}>
                  View Lens
                  <span className="ol-cta-arrow">→</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Outro */}
      <div className="ol-outro">
        <div className="ol-outro-left">
          <span>Full E-Mount Ecosystem</span>
          <span className="ol-outro-sep">·</span>
          <span>G Master Optics</span>
          <span className="ol-outro-sep">·</span>
          <span>All lenses weather-sealed</span>
        </div>
        <div className="ol-outro-right">
          <div className="ol-outro-line" style={{ background: GOLD }} />
          <span style={{ color: GOLD }}>EXPLORE ALL LENSES</span>
          <div className="ol-outro-line" style={{ background: GOLD }} />
        </div>
      </div>

      <style>{`
        /* ══════════════════════════════════════
           OTHER LENSES SECTION
        ══════════════════════════════════════ */

        .ol-section {
          background: #060606;
          position: relative;
          padding: 0 0 80px;
          overflow: hidden;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        /* Grain */
        .ol-grain {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 50;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        /* Header */
        .ol-header {
          padding: 80px 60px 56px;
          position: relative;
          z-index: 2;
        }
        .ol-header-eyebrow {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 18px;
          font-family: var(--font-dmmono, 'DM Mono', monospace);
          font-size: 0.56rem;
          letter-spacing: 0.45em;
          color: ${GOLD};
          text-transform: uppercase;
        }
        .ol-header-line {
          width: 28px;
          height: 1px;
          background: ${GOLD};
          flex-shrink: 0;
        }
        .ol-header-title {
          font-family: var(--font-bebas, 'Bebas Neue', sans-serif);
          font-size: clamp(2.5rem, 5vw, 6rem);
          line-height: 0.88;
          color: #f5f0eb;
          letter-spacing: 0.01em;
          margin: 0 0 20px;
        }
        .ol-header-sub {
          font-family: var(--font-dmmono, 'DM Mono', monospace);
          font-size: 0.7rem;
          color: rgba(245,240,235,0.38);
          letter-spacing: 0.04em;
          line-height: 1.8;
          max-width: 520px;
          margin: 0;
          font-style: italic;
        }

        /* Grid */
        .ol-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          padding: 0 60px;
          position: relative;
          z-index: 2;
        }

        /* Card */
        .ol-card {
          background: #0e0e0e;
          border: 1px solid #1e1e1e;
          border-radius: 4px;
          overflow: hidden;
          position: relative;
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.7s cubic-bezier(0.23,1,0.32,1),
                      transform 0.7s cubic-bezier(0.23,1,0.32,1),
                      box-shadow 0.5s cubic-bezier(0.23,1,0.32,1),
                      border-color 0.4s ease;
          cursor: default;
          display: flex;
          flex-direction: column;
        }
        .ol-card--visible {
          opacity: 1;
          transform: translateY(0);
        }
        .ol-card:hover {
          border-color: rgba(196,169,109,0.3);
          box-shadow:
            0 20px 50px rgba(0,0,0,0.6),
            0 0 0 1px rgba(196,169,109,0.2);
          transform: translateY(-6px);
        }
        .ol-card--visible:hover {
          transform: translateY(-6px);
        }

        /* Image */
        .ol-img-wrap {
          position: relative;
          width: 100%;
          height: 260px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .ol-img {
          width: 100%;
          height: 115%;
          object-fit: cover;
          object-position: center;
          display: block;
          transition: transform 0.8s cubic-bezier(0.23,1,0.32,1);
        }
        .ol-card:hover .ol-img {
          transform: scale(1.05);
        }
        .ol-img-vignette {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to top, rgba(14,14,14,1) 0%, rgba(14,14,14,0.3) 50%, transparent 100%),
            radial-gradient(ellipse at center, transparent 40%, rgba(6,6,6,0.4) 100%);
        }

        /* Tag pill */
        .ol-tag {
          position: absolute;
          top: 14px;
          right: 14px;
          font-family: var(--font-dmmono, 'DM Mono', monospace);
          font-size: 0.48rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          padding: 4px 10px;
          border: 1px solid;
          border-radius: 2px;
          background: rgba(6,6,6,0.6);
          backdrop-filter: blur(8px);
        }

        /* Body */
        .ol-body {
          padding: 22px 20px 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
          position: relative;
          overflow: hidden;
        }

        .ol-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-dmmono, 'DM Mono', monospace);
          font-size: 0.48rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(245,240,235,0.3);
          margin-bottom: 12px;
        }
        .ol-badge-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .ol-name-block {
          margin-bottom: 14px;
        }
        .ol-name {
          font-family: var(--font-bebas, 'Bebas Neue', sans-serif);
          font-size: clamp(1.8rem, 2.5vw, 2.6rem);
          letter-spacing: 0.01em;
          line-height: 0.88;
        }
        .ol-name-sub {
          font-family: var(--font-dmmono, 'DM Mono', monospace);
          font-size: 0.58rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          margin-top: 4px;
        }

        .ol-desc {
          font-family: var(--font-dmmono, 'DM Mono', monospace);
          font-size: 0.62rem;
          color: rgba(245,240,235,0.42);
          line-height: 1.75;
          letter-spacing: 0.02em;
          margin: 0 0 18px;
          font-style: italic;
        }

        /* Specs */
        .ol-specs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px 12px;
          margin-bottom: 18px;
        }
        .ol-spec-item {
          position: relative;
          padding: 8px 10px;
          background: rgba(255,255,255,0.025);
          border-radius: 2px;
          border-left: 1px solid rgba(255,255,255,0.06);
        }
        .ol-spec-label {
          font-family: var(--font-dmmono, 'DM Mono', monospace);
          font-size: 0.45rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(245,240,235,0.28);
          margin-bottom: 3px;
        }
        .ol-spec-value {
          font-family: var(--font-dmmono, 'DM Mono', monospace);
          font-size: 0.6rem;
          letter-spacing: 0.08em;
          font-weight: 500;
        }

        /* Watermark */
        .ol-watermark {
          position: absolute;
          font-family: var(--font-bebas, 'Bebas Neue', sans-serif);
          font-size: clamp(5rem, 8vw, 9rem);
          letter-spacing: -0.04em;
          line-height: 1;
          right: -4%;
          bottom: 15%;
          pointer-events: none;
          user-select: none;
          z-index: 0;
          animation: olWatermarkDrift 12s ease-in-out infinite;
        }
        @keyframes olWatermarkDrift {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-8px); }
        }

        /* Corner decorations */
        .ol-corner {
          position: absolute;
          width: 10px;
          height: 10px;
          pointer-events: none;
          z-index: 12;
          border-style: solid;
          border-width: 0;
        }
        .ol-corner-tl {
          top: 8px;
          left: 8px;
          border-top-width: 1px;
          border-left-width: 1px;
        }
        .ol-corner-br {
          bottom: 8px;
          right: 8px;
          border-bottom-width: 1px;
          border-right-width: 1px;
        }

        /* CTA row */
        .ol-cta-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: auto;
          position: relative;
          z-index: 2;
        }
        .ol-divider {
          flex: 1;
          height: 1px;
        }
        .ol-cta {
          font-family: var(--font-dmmono, 'DM Mono', monospace);
          font-size: 0.5rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0;
          transition: gap 0.3s ease;
        }
        .ol-cta:hover {
          gap: 14px;
        }
        .ol-cta-arrow {
          font-size: 0.75rem;
          transition: transform 0.3s ease;
        }
        .ol-cta:hover .ol-cta-arrow {
          transform: translateX(4px);
        }

        /* Outro */
        .ol-outro {
          padding: 48px 60px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 48px;
          border-top: 1px solid rgba(255,255,255,0.04);
          position: relative;
          z-index: 2;
        }
        .ol-outro-left {
          font-family: var(--font-dmmono, 'DM Mono', monospace);
          font-size: 0.52rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(245,240,235,0.15);
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }
        .ol-outro-sep {
          opacity: 0.4;
        }
        .ol-outro-right {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-dmmono, 'DM Mono', monospace);
          font-size: 0.5rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
        }
        .ol-outro-line {
          width: 24px;
          height: 1px;
          opacity: 0.4;
        }

        /* Responsive */
        @media (max-width: 1200px) {
          .ol-grid {
            grid-template-columns: repeat(2, 1fr);
            padding: 0 40px;
          }
          .ol-header { padding: 60px 40px 40px; }
        }
        @media (max-width: 768px) {
          .ol-grid {
            grid-template-columns: 1fr;
            padding: 0 20px;
            gap: 16px;
          }
          .ol-header {
            padding: 48px 20px 32px;
          }
          .ol-img-wrap { height: 220px; }
          .ol-outro {
            padding: 32px 20px 0;
            flex-direction: column;
            align-items: flex-start;
            gap: 14px;
          }
        }
      `}</style>
    </section>
  )
}
