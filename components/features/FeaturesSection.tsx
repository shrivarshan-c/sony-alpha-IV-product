"use client"
import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

interface FeatureRowProps {
  number: string
  stat: string
  unit: string
  title: string
  accentWord: string
  description: string
  detail: string
  imageSrc: string
  flip?: boolean
  idx: number
}

function FeatureRow({ number, stat, unit, title, accentWord, description, detail, imageSrc, flip = false, idx }: FeatureRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const imgWrapRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (!rowRef.current) return

    // Image parallax on scroll
    const img = imgWrapRef.current?.querySelector('img')
    if (img) {
      gsap.fromTo(img,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: { trigger: rowRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.2 }
        }
      )
    }

    // Content slide in
    const delay = idx * 0.05
    gsap.fromTo(contentRef.current,
      { opacity: 0, x: flip ? 40 : -40 },
      {
        opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay,
        scrollTrigger: { trigger: rowRef.current, start: 'top 80%', toggleActions: 'play none none none' }
      }
    )
  }, [flip, idx])

  const content = (
    <div
      ref={contentRef}
      className="flex flex-col justify-center px-6 md:px-16 py-12 md:py-16 relative z-10 h-full"
      style={{ opacity: 1 }}
    >
      {/* Big ghost number */}
      <div
        className="absolute font-playfair font-black select-none pointer-events-none"
        style={{
          fontSize: 'clamp(6rem, 12vw, 14rem)',
          lineHeight: 1,
          color: 'rgba(232,0,29,0.04)',
          top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          letterSpacing: '-0.05em',
          whiteSpace: 'nowrap',
        }}
      >
        {stat}
      </div>

      {/* Index label */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-[1px] bg-sony-red" />
        <span className="font-rajdhani text-[0.65rem] tracking-[0.5em] text-sony-red uppercase">{number} / 06</span>
      </div>

      {/* Stat */}
      <div className="flex items-baseline gap-3 mb-6">
        <span
          className="font-rajdhani font-bold text-sony-red"
          style={{ fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)', lineHeight: 1, letterSpacing: '-0.04em' }}
        >
          {stat}
        </span>
        <span className="font-rajdhani font-semibold text-sony-red/60 tracking-widest" style={{ fontSize: '1rem' }}>
          {unit}
        </span>
      </div>

      {/* Title */}
      <h3
        className="font-playfair font-black text-sony-white leading-[1] mb-2"
        style={{ fontSize: 'clamp(1.3rem, 2.2vw, 2.2rem)' }}
      >
        {title.split(accentWord).map((part, i, arr) =>
          i < arr.length - 1
            ? <span key={i}>{part}<em className="text-sony-red not-italic">{accentWord}</em></span>
            : <span key={i}>{part}</span>
        )}
      </h3>

      {/* Thin red line */}
      <div
        className="h-[1px] my-6 transition-all duration-700 origin-left"
        style={{
          background: 'linear-gradient(to right, #e8001d, transparent)',
          width: hovered ? '100%' : '40%',
        }}
      />

      {/* Description */}
      <p className="font-crimson italic text-sony-white/60 leading-[1.75] mb-3" style={{ fontSize: '1.1rem', maxWidth: '380px' }}>
        {description}
      </p>
      <p className="font-rajdhani text-[0.7rem] tracking-[0.25em] text-sony-grey uppercase">{detail}</p>
    </div>
  )

  const image = (
    <div
      ref={imgWrapRef}
      className="relative overflow-hidden h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={imageSrc}
        alt={title}
        className="w-full h-full object-cover transition-all duration-[800ms]"
        style={{
          transform: hovered ? 'scale(1.05)' : 'scale(1.0)',
          filter: hovered ? 'brightness(0.9)' : 'brightness(0.75)',
          willChange: 'transform',
        }}
      />
      {/* Gradient toward content */}
      <div
        className="absolute inset-0"
        style={{
          background: flip
            ? 'linear-gradient(to right, transparent 60%, #060606 100%)'
            : 'linear-gradient(to left, transparent 60%, #060606 100%)'
        }}
      />
    </div>
  )

  return (
    <div
      ref={rowRef}
      className="grid grid-cols-1 md:grid-cols-2 border-t border-sony-white/5"
      style={{ minHeight: 'auto' }}
    >
      {/* On mobile, always show image then content. On desktop, follow flip. */}
      <div className="md:contents flex flex-col">
        {flip ? (
          <div className="flex flex-col md:contents">
            <div className="order-2 md:order-1">{content}</div>
            <div className="order-1 md:order-2 h-[400px] md:h-auto">{image}</div>
          </div>
        ) : (
          <div className="flex flex-col md:contents">
            <div className="order-1 h-[400px] md:h-auto">{image}</div>
            <div className="order-2">{content}</div>
          </div>
        )}
      </div>
    </div>
  )
}

const FEATURES = [
  {
    number: '01', stat: '33', unit: 'MP',
    title: 'Full Frame Sensor',
    accentWord: 'Sensor',
    description: 'A back-illuminated full-frame CMOS with 33 effective megapixels. Renders extraordinary detail, low-light luminosity, and cinematic dynamic range.',
    detail: 'Sony 35mm Full-Frame BSI CMOS · 15+ stops DR',
    imageSrc: '/features/feature1.jpeg',
  },
  {
    number: '02', stat: '759', unit: 'pts',
    title: 'Intelligent Focus',
    accentWord: 'Focus',
    description: '759 phase-detect AF points blanketing 94% of the frame. Real-Time Eye AF locks on to humans, animals, and birds — even in low light.',
    detail: 'Phase-Detect · Real-Time Eye AF · Animal & Bird Tracking',
    imageSrc: '/features/feature2.jpeg',
    flip: true,
  },
  {
    number: '03', stat: '5.5', unit: 'stops',
    title: 'Rock-Solid Stability',
    accentWord: 'Stability',
    description: '5-axis in-body image stabilization delivers up to 5.5 stops of shake correction — so every handheld shot stays sharp.',
    detail: '5-Axis IBIS · 5.5 Stops Compensation',
    imageSrc: '/features/feature3.jpeg',
  },
  {
    number: '04', stat: '4K', unit: '60p',
    title: 'Cinema Grade Video',
    accentWord: 'Video',
    description: 'Full-pixel 4K 60p readout. 10-bit 4:2:2 recording with S-Cinetone colour science baked in. Zero crop. Maximum latitude in post.',
    detail: '4K 60p · 10-bit 4:2:2 · S-Cinetone · S-Log3',
    imageSrc: '/features/feature4.jpeg',
    flip: true,
  },
  {
    number: '05', stat: 'RT', unit: '-AF',
    title: 'Real-Time Eye AF',
    accentWord: 'Eye AF',
    description: 'AI processing in the body predicts and reacts. Locks on instantly, holds on decisively — in portraits, wildlife, documentary, everywhere.',
    detail: 'AI Object Recognition · Priority Subject Lock',
    imageSrc: '/features/feature5.jpeg',
  },
  {
    number: '06', stat: 'IP', unit: '★',
    title: 'Weather Sealed Body',
    accentWord: 'Sealed',
    description: 'Magnesium alloy chassis with comprehensive dust and moisture sealing. Engineered for the field, the studio, and everywhere in between.',
    detail: 'Mg-Alloy Body · Dust & Moisture Resistant',
    imageSrc: '/features/feature6.jpeg',
    flip: true,
  },
]

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!headerRef.current) return
    const children = Array.from(headerRef.current.children)
    gsap.fromTo(children,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      }
    )
  }, [])

  return (
    <section ref={sectionRef} id="features" className="bg-sony-black">
      {/* Header */}
      <div ref={headerRef} className="px-[20px] md:px-[60px] pt-16 md:pt-[120px] pb-8 md:pb-[80px] flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-4 mb-4 md:mb-5">
            <div className="w-10 h-[1px] bg-sony-red" />
            <span className="font-rajdhani font-bold text-[0.58rem] md:text-[0.65rem] tracking-[0.4em] md:tracking-[0.5em] text-sony-red uppercase">Engineering Excellence</span>
          </div>
          <h2 className="font-playfair font-black leading-none" style={{ fontSize: 'clamp(3rem, 5.5vw, 6rem)' }}>
            <div className="text-sony-white">Built for</div>
            <div className="text-sony-red italic">Mastery.</div>
          </h2>
        </div>
        <div
          className="font-playfair font-black select-none pointer-events-none hidden md:block"
          style={{ fontSize: 'clamp(7rem, 14vw, 18rem)', lineHeight: 1, color: 'rgba(245,240,235,0.03)', letterSpacing: '-0.06em' }}
        >
          06
        </div>
      </div>

      {/* Feature rows */}
      {FEATURES.map((f, i) => (
        <FeatureRow key={i} idx={i} flip={f.flip ?? false} {...f} />
      ))}

      {/* Bottom spacer */}
      <div className="h-24 border-t border-sony-white/5" />
    </section>
  )
}
