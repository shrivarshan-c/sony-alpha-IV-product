"use client"
import { useEffect, useRef } from "react"
import { gsap, ScrollTrigger } from "@/lib/gsap"

const SPEC_CATEGORIES = [
  {
    title: "SENSOR & PROCESSOR",
    specs: [
      { label: "SENSOR TYPE", value: "35mm Full Frame Exmor R CMOS" },
      { label: "EFFECTIVE PIXELS", value: "Approx. 33.0 Megapixels" },
      { label: "PROCESSOR", value: "BIONZ XR™ Next-gen Engine" },
      { label: "ISO SENSITIVITY", value: "100–51200 (Exp. to 50–204800)" },
      { label: "DYNAMIC RANGE", value: "15+ Stops (S-Log3)" }
    ]
  },
  {
    title: "VIDEO CAPABILITIES",
    specs: [
      { label: "RESOLUTION", value: "4K 60p (10-bit 4:2:2 All-I)" },
      { label: "OVERSAMPLING", value: "7K (Full Pixel Readout)" },
      { label: "COLOR SCIENCE", value: "S-Cinetone™ / S-Log3 / HLG" },
      { label: "SLOW MOTION", value: "FHD 120p / 4K 60p" },
      { label: "CODECS", value: "XAVC S-I / XAVC HS" }
    ]
  },
  {
    title: "AUTOFOCUS SYSTEM",
    specs: [
      { label: "AF POINTS", value: "759 Phase-detection Points" },
      { label: "COVERAGE", value: "Approx. 94% of Image Area" },
      { label: "EYE AF", value: "Human / Animal / Bird (Real-time)" },
      { label: "TRACKING", value: "AI-based Real-time Tracking" },
      { label: "AF SENSITIVITY", value: "EV-4 to EV20" }
    ]
  },
  {
    title: "DESIGN & INTERFACE",
    specs: [
      { label: "STABILIZATION", value: "5-axis In-body (5.5 stops)" },
      { label: "EVF", value: "3.69M-dot OLED (120 fps)" },
      { label: "LCD", value: "Side-opening Vari-angle Touch" },
      { label: "MEDIA SLOTS", value: "CFexpress Type A / SDXC (UHS-II)" },
      { label: "WEIGHT", value: "Approx. 658g (with battery)" }
    ]
  }
]

export default function SpecsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!sectionRef.current) return

    categoryRefs.current.forEach((cat, i) => {
      if (!cat) return
      
      gsap.fromTo(cat, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: cat,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      )
    })
  }, [])

  return (
    <section id="specs" ref={sectionRef} className="pg-specs-section">
      <div className="pg-specs-container">
        
        {/* Section Header */}
        <div className="pg-specs-header">
          <div className="pg-header-accent" />
          <h2 className="pg-specs-title">TECHNICAL SPECIFICATIONS</h2>
          <p className="pg-specs-subtitle">THE NEW BENCHMARK FOR HYBRID CREATORS</p>
        </div>

        {/* Specs Grid */}
        <div className="pg-specs-grid">
          {SPEC_CATEGORIES.map((cat, idx) => (
            <div 
              key={idx} 
              ref={el => { categoryRefs.current[idx] = el }}
              className="pg-spec-category"
            >
              <h3 className="pg-cat-title">{cat.title}</h3>
              <div className="pg-spec-list">
                {cat.specs.map((item, sidx) => (
                  <div key={sidx} className="pg-spec-item">
                    <span className="pg-spec-label">{item.label}</span>
                    <span className="pg-spec-value">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Decorative background element */}
        <div className="pg-specs-bg-watermark">SPECS</div>
      </div>

      <style jsx>{`
        .pg-specs-section {
          background-color: #060606;
          padding: 120px 60px;
          position: relative;
          overflow: hidden;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .pg-specs-container {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }

        .pg-specs-header {
          margin-bottom: 80px;
        }

        .pg-header-accent {
          width: 40px;
          height: 2px;
          background-color: #c4a96d;
          margin-bottom: 24px;
        }

        .pg-specs-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.5rem, 5vw, 4rem);
          letter-spacing: 0.05em;
          color: #f0ece4;
          line-height: 1;
          margin-bottom: 8px;
        }

        .pg-specs-subtitle {
          font-family: 'DM Mono', monospace;
          font-size: 0.75rem;
          letter-spacing: 0.3em;
          color: #666;
          text-transform: uppercase;
        }

        .pg-specs-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 60px 100px;
        }

        .pg-cat-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.5rem;
          letter-spacing: 0.1em;
          color: #c4a96d;
          margin-bottom: 32px;
          border-bottom: 1px solid rgba(196, 169, 109, 0.2);
          padding-bottom: 12px;
        }

        .pg-spec-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .pg-spec-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .pg-spec-label {
          font-family: 'DM Mono', monospace;
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          color: #555;
          text-transform: uppercase;
        }

        .pg-spec-value {
          font-family: 'DM Mono', monospace;
          font-size: 0.95rem;
          color: #f0ece4;
          font-weight: 300;
        }

        .pg-specs-bg-watermark {
          position: absolute;
          top: 50%;
          right: -5%;
          transform: translateY(-50%) rotate(90deg);
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20vw;
          color: #ffffff;
          opacity: 0.02;
          pointer-events: none;
          z-index: -1;
        }

        @media (max-width: 1024px) {
          .pg-specs-grid {
            gap: 40px 60px;
            padding: 0 10px;
          }
        }

        @media (max-width: 768px) {
          .pg-specs-section {
            padding: 64px 20px;
          }
          .pg-specs-header { margin-bottom: 48px; }
          .pg-specs-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .pg-specs-bg-watermark { display: none; }
        }
      `}</style>
    </section>
  )
}
