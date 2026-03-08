"use client"
import { useRef } from 'react'

/* ─────────────────────────────────────────────────────
   LENS BENTO GRID
   7 mixed-size cards — ANTIGRAVITY EFFECT throughout
───────────────────────────────────────────────────── */

const GOLD = '#c4a96d'

/* Card definitions — grid placement via CSS grid-area */
const CARDS = [
  {
    id: 1,
    area: 'c1',
    mediaType: 'video' as const,
    mediaClass: 'video-1',
    mediaSrc: '/lens-features/feature3.mp4',
    label: 'FE 24-70mm f/2.8 GM II · Sony G Master',
    title: ['THE', 'STANDARD', 'REDEFINED.'],
    spec: 'FE 24-70mm f/2.8 GM II · Constant Aperture · E-Mount',
    focal: 'GM',
    size: 'hero',
  },
  {
    id: 2,
    area: 'c2',
    mediaType: 'video' as const,
    mediaClass: 'video-2',
    mediaSrc: '/lens-features/feature5.mp4',
    label: 'Linear AF Motor · XD Drive',
    title: ['SILENT.', 'INSTANT.'],
    spec: 'Dual XD Linear Motor · 0.07s AF · Silent Drive',
    focal: 'AF',
    size: 'md-wide',
  },
  {
    id: 3,
    area: 'c3',
    mediaType: 'video' as const,
    mediaClass: 'video-3',
    mediaSrc: '/lens-features/feature6.mp4',
    label: 'Zoom Mechanism · Barrel',
    title: ['24MM', 'TO', '70MM.'],
    spec: 'Internal Zoom · Constant f/2.8 Throughout',
    focal: '70',
    size: 'tall-narrow',
  },
  {
    id: 4,
    area: 'c4',
    mediaType: 'video' as const,
    mediaClass: 'video-4',
    mediaSrc: '/lens-features/feature7.mp4',
    label: 'Aperture Blades · 11-Blade',
    title: ['f/2.8', 'WIDE.'],
    spec: '11 Circular Aperture Blades · Smooth Bokeh',
    focal: 'f2',
    size: 'sm',
  },
  {
    id: 5,
    area: 'c5',
    mediaType: 'image' as const,
    mediaClass: 'img-1',
    mediaSrc: '/lens-features/feature1.jpeg',
    label: 'FE 24-70mm f/2.8 GM II · Lens Body',
    title: ['BUILT FOR', 'MASTERS.'],
    spec: 'Weather Sealed · Magnesium Body · 695g',
    focal: '24',
    size: 'md',
  },
  {
    id: 6,
    area: 'c6',
    mediaType: 'image' as const,
    mediaClass: 'img-2',
    mediaSrc: '/lens-features/feature2.jpeg',
    label: 'Optical Formula · 11 Elements',
    title: ['11 ELEMENTS.', '9 GROUPS.'],
    spec: '2× XA · 1× Super ED · Nano AR Coating II',
    focal: '11',
    size: 'wide-short',
  },
  {
    id: 7,
    area: 'c7',
    mediaType: 'image' as const,
    mediaClass: 'img-3',
    mediaSrc: '/lens-features/feature4.jpeg',
    label: 'In the Field · Sony α7',
    title: ['SHOOT', 'EVERYTHING.'],
    spec: 'Sony α Series · Full Frame Compatible',
    focal: 'α7',
    size: 'sm',
  },
]

/* Particle positions — deterministic so no SSR mismatch */
function genParticles(count: number, seed: number) {
  const particles = []
  let s = seed
  for (let i = 0; i < count; i++) {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    const x = ((s >>> 0) % 100)
    s = (s * 1664525 + 1013904223) & 0xffffffff
    const y = ((s >>> 0) % 120)
    s = (s * 1664525 + 1013904223) & 0xffffffff
    const dur = 6 + ((s >>> 0) % 14)
    s = (s * 1664525 + 1013904223) & 0xffffffff
    const del = -((s >>> 0) % (dur * 10)) / 10
    s = (s * 1664525 + 1013904223) & 0xffffffff
    const size = 1 + ((s >>> 0) % 3)
    particles.push({ x, y, dur, del, size })
  }
  return particles
}

interface CardProps {
  card: typeof CARDS[0]
}

function BentoCard({ card }: CardProps) {
  const particles = genParticles(18, card.id * 31337)

  /* font sizes per card size */
  const titleSize =
    card.size === 'hero' ? 'clamp(3.5rem, 7vw, 9rem)' :
    card.size === 'tall-narrow' ? 'clamp(1.6rem, 3vw, 3.8rem)' :
    card.size === 'md-wide' ? 'clamp(1.4rem, 2.5vw, 3rem)' :
    card.size === 'wide-short' ? 'clamp(1.5rem, 2.8vw, 3.2rem)' :
    card.size === 'md' ? 'clamp(1.5rem, 2.6vw, 3rem)' :
    'clamp(1.2rem, 2vw, 2.2rem)'

  return (
    <div
      className="bento-card"
      style={{ gridArea: card.area }}
    >
      {/* ── Media Layer ── */}
      <div className="bento-media-wrap">
        {card.mediaType === 'video' ? (
          <video
            className={`bento-media ${card.mediaClass}`}
            autoPlay
            muted
            loop
            playsInline
            src={card.mediaSrc}
          />
        ) : (
          <img
            className={`bento-media ${card.mediaClass}`}
            src={card.mediaSrc}
            alt={card.label}
          />
        )}
        {/* Vignette */}
        <div className="bento-vignette" />
      </div>

      {/* ── Floating Particles ── */}
      <div className="bento-particles" aria-hidden="true">
        {particles.map((p, i) => (
          <div
            key={i}
            className="bento-particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.del}s`,
            }}
          />
        ))}
      </div>

      {/* ── Corner Decorations ── */}
      <div className="bento-corner bento-corner-tl" />
      <div className="bento-corner bento-corner-tr" />
      <div className="bento-corner bento-corner-br" />
      <span className="bento-dot bento-dot-1" />
      <span className="bento-dot bento-dot-2" />
      <span className="bento-ring" />

      {/* ── Focal Watermark ── */}
      <div className="bento-watermark" aria-hidden="true">
        {card.focal}
      </div>

      {/* ── Text Block ── */}
      <div className="bento-text">
        {/* Label */}
        <div className="bento-label">{card.label}</div>

        {/* Title — each word floats independently */}
        <div className="bento-title-block">
          {card.title.map((word, wi) => (
            <div
              key={wi}
              className={`bento-title-word float-word-${(wi % 5) + 1}`}
              style={{ fontSize: titleSize, lineHeight: card.size === 'hero' ? 0.84 : 0.88 }}
            >
              {word.split('').map((ch, ci) => (
                <span
                  key={ci}
                  className={`bento-letter float-letter-${((wi * 7 + ci) % 8) + 1}`}
                >
                  {ch === ' ' ? '\u00a0' : ch}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Spec */}
        <div className="bento-spec">{card.spec}</div>
      </div>

      {/* Gold border glow overlay — shows on hover via CSS */}
      <div className="bento-glow-border" />
    </div>
  )
}

export default function LensBentoGrid() {
  return (
    <section id="lens-bento" className="bento-section">
      {/* Grain overlay */}
      <div className="bento-grain" aria-hidden="true" />

      {/* Section header */}
      <div className="bento-header">
        <div className="bento-header-label">
          <div className="bento-header-line" />
          <span>Lens Architecture · FE 24-70mm f/2.8 GM II</span>
        </div>
        <h2 className="bento-header-title">
          THE LENS<br />
          <span style={{ color: GOLD }}>IN SPACE.</span>
        </h2>
      </div>

      {/* Grid */}
      <div className="bento-grid">
        {CARDS.map(card => (
          <BentoCard key={card.id} card={card} />
        ))}
      </div>

      {/* Bottom outro */}
      <div className="bento-outro">
        <div className="bento-outro-text">G Master · FE 24-70mm f/2.8 GM II · 11 Elements · 9 Groups · Nano AR Coating II</div>
        <div className="bento-outro-spec">Zero Gravity. All Glass.</div>
      </div>

      <style>{`
        /* ════════════════════════════════════════════
           BENTO GRID STYLES — ANTIGRAVITY EDITION
        ════════════════════════════════════════════ */

        .bento-section {
          background: #060606;
          position: relative;
          padding: 0 0 80px;
          overflow: hidden;
        }

        /* ── Grain ── */
        .bento-grain {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 100;
          opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 240px 240px;
        }

        /* ── Header ── */
        .bento-header {
          padding: 80px 60px 48px;
          border-top: 1px solid rgba(255,255,255,0.05);
          position: relative;
          z-index: 2;
        }
        .bento-header-label {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 16px;
          font-family: var(--font-dmmono, 'DM Mono', monospace);
          font-size: 0.58rem;
          letter-spacing: 0.45em;
          color: ${GOLD};
          text-transform: uppercase;
        }
        .bento-header-line {
          width: 28px;
          height: 1px;
          background: ${GOLD};
          flex-shrink: 0;
        }
        .bento-header-title {
          font-family: var(--font-bebas, 'Bebas Neue', sans-serif);
          font-size: clamp(2.5rem, 5vw, 6rem);
          line-height: 0.88;
          color: #f5f0eb;
          letter-spacing: 0.01em;
          margin: 0;
        }

        /* ── GRID ── */
        .bento-grid {
          display: grid;
          padding: 0 60px;
          gap: 10px;
          grid-template-columns: 2.2fr 1.4fr 1fr;
          grid-template-rows: 520px 280px 360px;
          grid-template-areas:
            "c1 c2 c3"
            "c1 c4 c3"
            "c5 c6 c7";
          position: relative;
          z-index: 2;
        }

        /* ── CARD BASE ── */
        .bento-card {
          position: relative;
          background: #111111;
          border: 1px solid #1e1e1e;
          border-radius: 4px;
          overflow: hidden;
          cursor: default;
          transition: transform 0.5s cubic-bezier(0.23,1,0.32,1), box-shadow 0.5s cubic-bezier(0.23,1,0.32,1), border-color 0.4s ease;
        }
        .bento-card:hover {
          transform: translateY(-8px);
          box-shadow:
            0 24px 60px rgba(0,0,0,0.7),
            0 4px 24px rgba(196,169,109,0.12),
            0 0 0 1px rgba(196,169,109,0.35);
          border-color: rgba(196,169,109,0.4);
        }
        .bento-card:hover .bento-glow-border {
          opacity: 1;
        }
        .bento-card:hover .bento-media {
          animation-play-state: running;
        }

        /* ── Media ── */
        .bento-media-wrap {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .bento-media {
          width: 100%;
          height: 112%;
          object-fit: cover;
          object-position: center;
          display: block;
          animation: mediaFloat 20s ease-in-out infinite;
        }
        @keyframes mediaFloat {
          0%   { transform: translateY(0%) scale(1.04); }
          50%  { transform: translateY(-6%) scale(1.07); }
          100% { transform: translateY(0%) scale(1.04); }
        }
        .bento-vignette {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to top, rgba(6,6,6,0.96) 0%, rgba(6,6,6,0.5) 40%, rgba(6,6,6,0.1) 70%, transparent 100%),
            linear-gradient(to bottom, rgba(6,6,6,0.6) 0%, transparent 25%),
            radial-gradient(ellipse at center, transparent 40%, rgba(6,6,6,0.5) 100%);
        }

        /* ── Particles ── */
        .bento-particles {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 8;
        }
        .bento-particle {
          position: absolute;
          border-radius: 50%;
          background: rgba(255,255,255,0.55);
          animation: particleDrift linear infinite;
        }
        @keyframes particleDrift {
          0%   { transform: translateY(0px) translateX(0px); opacity: 0; }
          10%  { opacity: 0.8; }
          90%  { opacity: 0.4; }
          100% { transform: translateY(-140px) translateX(8px); opacity: 0; }
        }

        /* ── Corner Decorations ── */
        .bento-corner {
          position: absolute;
          width: 12px;
          height: 12px;
          pointer-events: none;
          z-index: 12;
        }
        .bento-corner-tl { top: 8px; left: 8px; border-top: 1px solid rgba(196,169,109,0.4); border-left: 1px solid rgba(196,169,109,0.4); }
        .bento-corner-tr { top: 8px; right: 8px; border-top: 1px solid rgba(196,169,109,0.4); border-right: 1px solid rgba(196,169,109,0.4); }
        .bento-corner-br { bottom: 8px; right: 8px; border-bottom: 1px solid rgba(196,169,109,0.4); border-right: 1px solid rgba(196,169,109,0.4); }

        .bento-dot {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: ${GOLD};
          opacity: 0.5;
          pointer-events: none;
          z-index: 12;
        }
        .bento-dot-1 {
          bottom: 8px;
          left: 8px;
          animation: dotFloat1 4s ease-in-out infinite;
        }
        .bento-dot-2 {
          top: 50%;
          right: 12px;
          animation: dotFloat2 5.5s ease-in-out infinite;
          animation-delay: -2s;
        }
        @keyframes dotFloat1 {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }
        @keyframes dotFloat2 {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        .bento-ring {
          position: absolute;
          top: 50%;
          left: 12px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 1px solid rgba(196,169,109,0.18);
          transform: translateY(-50%);
          pointer-events: none;
          z-index: 12;
          animation: ringPulse 6s ease-in-out infinite;
          animation-delay: -3s;
        }
        @keyframes ringPulse {
          0%,100% { transform: translateY(-50%) scale(1); opacity: 0.4; }
          50%      { transform: translateY(-60%) scale(1.3); opacity: 0.15; }
        }

        /* ── Watermark ── */
        .bento-watermark {
          position: absolute;
          font-family: var(--font-bebas, 'Bebas Neue', sans-serif);
          font-size: clamp(4rem, 9vw, 12rem);
          line-height: 1;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.04);
          letter-spacing: -0.04em;
          right: -2%;
          bottom: -5%;
          pointer-events: none;
          user-select: none;
          z-index: 9;
          animation: watermarkFloat 14s ease-in-out infinite;
        }
        @keyframes watermarkFloat {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-12px); }
        }

        /* ── Text ── */
        .bento-text {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 20px 20px 22px;
          z-index: 10;
        }
        .bento-label {
          font-family: var(--font-dmmono, 'DM Mono', monospace);
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: ${GOLD};
          margin-bottom: 8px;
        }
        .bento-title-block {
          overflow: visible;
          margin-bottom: 10px;
        }
        .bento-title-word {
          font-family: var(--font-bebas, 'Bebas Neue', sans-serif);
          color: #f5f0eb;
          letter-spacing: 0.01em;
          display: block;
          white-space: nowrap;
          overflow: visible;
        }
        .bento-letter {
          display: inline-block;
          will-change: transform;
        }
        .bento-spec {
          font-family: var(--font-dmmono, 'DM Mono', monospace);
          font-size: 9px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: ${GOLD};
          opacity: 0.75;
        }

        /* ── FLOATING LETTER ANIMATIONS ── 8 variants ── */
        .float-letter-1 { animation: letterFloat1 3.1s ease-in-out infinite; }
        .float-letter-2 { animation: letterFloat2 3.7s ease-in-out infinite; animation-delay: -0.8s; }
        .float-letter-3 { animation: letterFloat3 2.9s ease-in-out infinite; animation-delay: -1.5s; }
        .float-letter-4 { animation: letterFloat4 4.2s ease-in-out infinite; animation-delay: -0.3s; }
        .float-letter-5 { animation: letterFloat5 3.5s ease-in-out infinite; animation-delay: -2.1s; }
        .float-letter-6 { animation: letterFloat6 2.7s ease-in-out infinite; animation-delay: -1.1s; }
        .float-letter-7 { animation: letterFloat7 3.9s ease-in-out infinite; animation-delay: -0.6s; }
        .float-letter-8 { animation: letterFloat8 3.3s ease-in-out infinite; animation-delay: -1.8s; }

        @keyframes letterFloat1 { 0%,100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-4px) rotate(0.3deg); } }
        @keyframes letterFloat2 { 0%,100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-6px) rotate(-0.4deg); } }
        @keyframes letterFloat3 { 0%,100% { transform: translateY(0px) rotate(0deg); } 40% { transform: translateY(-3px) rotate(0.2deg); } 80% { transform: translateY(-5px); } }
        @keyframes letterFloat4 { 0%,100% { transform: translateY(0px); } 60% { transform: translateY(-7px) rotate(0.5deg); } }
        @keyframes letterFloat5 { 0%,100% { transform: translateY(0px) rotate(-0.3deg); } 50% { transform: translateY(-5px) rotate(0.3deg); } }
        @keyframes letterFloat6 { 0%,100% { transform: translateY(-2px); } 50% { transform: translateY(-6px) rotate(-0.2deg); } }
        @keyframes letterFloat7 { 0%,100% { transform: translateY(0px); } 30% { transform: translateY(-3px); } 70% { transform: translateY(-8px) rotate(0.4deg); } }
        @keyframes letterFloat8 { 0%,100% { transform: translateY(-1px) rotate(0.2deg); } 50% { transform: translateY(-5px) rotate(-0.3deg); } }

        /* ── Word float variants (whole word drift) ── */
        .float-word-1 { animation: wordDrift1 5.5s ease-in-out infinite; }
        .float-word-2 { animation: wordDrift2 6.2s ease-in-out infinite; animation-delay: -1.5s; }
        .float-word-3 { animation: wordDrift3 4.9s ease-in-out infinite; animation-delay: -3s; }
        .float-word-4 { animation: wordDrift4 7.1s ease-in-out infinite; animation-delay: -0.8s; }
        .float-word-5 { animation: wordDrift5 5.8s ease-in-out infinite; animation-delay: -2.2s; }

        @keyframes wordDrift1 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-3px); } }
        @keyframes wordDrift2 { 0%,100% { transform: translateY(-1px); } 50% { transform: translateY(-5px); } }
        @keyframes wordDrift3 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-2px); } }
        @keyframes wordDrift4 { 0%,100% { transform: translateY(-2px); } 50% { transform: translateY(-4px); } }
        @keyframes wordDrift5 { 0%,100% { transform: translateY(0px); } 60% { transform: translateY(-6px); } }

        /* ── Gold Glow Border ── */
        .bento-glow-border {
          position: absolute;
          inset: 0;
          border-radius: 4px;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.4s ease;
          box-shadow:
            inset 0 0 0 1px rgba(196,169,109,0.5),
            inset 0 0 30px rgba(196,169,109,0.05);
          z-index: 20;
        }

        /* ── OUTRO ── */
        .bento-outro {
          padding: 40px 60px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          z-index: 2;
          margin-top: 40px;
          border-top: 1px solid rgba(255,255,255,0.04);
        }
        .bento-outro-text {
          font-family: var(--font-dmmono, 'DM Mono', monospace);
          font-size: 0.55rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(245,240,235,0.15);
        }
        .bento-outro-spec {
          font-family: var(--font-bebas, 'Bebas Neue', sans-serif);
          font-size: clamp(1rem, 2vw, 1.8rem);
          color: rgba(196,169,109,0.25);
          letter-spacing: 0.06em;
        }

        /* ── Responsive ── */
        @media (max-width: 1100px) {
          .bento-grid {
            grid-template-columns: 1.4fr 1.2fr 1fr;
            grid-template-rows: 380px 220px 280px;
            padding: 0 40px;
          }
          .bento-header { padding: 60px 40px 32px; }
        }
        @media (max-width: 768px) {
          .bento-grid {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            grid-template-areas:
              "c1" "c2" "c3" "c5" "c6" "c4" "c7";
            gap: 16px;
            padding: 0 20px;
          }
          .bento-card { height: 420px; }
          .bento-card[style*="grid-area: c1"] { height: 520px; }
          .bento-header { padding: 48px 20px 24px; }
          .bento-outro { padding: 32px 20px 0; flex-direction: column; align-items: flex-start; gap: 12px; }
        }
      `}</style>
    </section>
  )
}
