"use client"
import { useEffect, useRef, useState } from 'react'
import { useImagePreloader } from '@/hooks/useImagePreloader'
import { gsap, ScrollTrigger } from '@/lib/gsap'

// 3 scenes — wide spacing, jaw-dropping copy
// Frames 1–30  → compact closed lens  → "THE STANDARD IS WRONG"
// Frames 31–58 → barrel extending     → "WATCH IT BREATHE"
// Frames 59–81 → fully extended, open → "24 TO 70. NOTHING LEFT OUT."
const SCENES = [
  {
    range: [0, 30],  // frames 0–29
    progress: [0, 0.38],
    focal: '24mm',
    copy: ['THE STANDARD', 'IS WRONG.'],
    lens: 'FE 24-70mm f/2.8 GM II',
    sub: 'Wide enough to silence everything around the subject.',
    accent: '#e8001d',
  },
  {
    range: [31, 58], // frames 30–57
    progress: [0.38, 0.72],
    focal: 'f/2.8',
    copy: ['WATCH IT', 'BREATHE.'],
    lens: 'FE 24-70mm f/2.8 GM II · Extending',
    sub: 'Glass in motion. Constant aperture at every step.',
    accent: '#c8a055',
  },
  {
    range: [59, 81], // frames 58–80
    progress: [0.72, 1.0],
    focal: '70mm',
    copy: ['24 TO 70.', 'NOTHING', 'LEFT OUT.'],
    lens: 'FE 24-70mm f/2.8 GM II · Full Reach',
    sub: 'One barrel. Every story. Zero excuses.',
    accent: '#f5f0eb',
  },
]

export default function LensShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const panelRefs = useRef<(HTMLDivElement | null)[]>([])
  const focalRefs = useRef<(HTMLDivElement | null)[]>([])
  const flashRef = useRef<HTMLDivElement>(null)
  const [loadPct, setLoadPct] = useState(0)
  const [ready, setReady] = useState(false)

  const { progress, frames, isLoaded } = useImagePreloader('/lens-section/ezgif-frame-', 1, 81)

  // Mirror the loading progress state
  useEffect(() => { setLoadPct(progress) }, [progress])

  useEffect(() => {
    if (isLoaded) {
      // Short delay so the "100%" flash is readable
      setTimeout(() => setReady(true), 600)
    }
  }, [isLoaded])

  useEffect(() => {
    if (!isLoaded || !canvasRef.current || !containerRef.current || frames.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      draw(frames[0])
    }

    const draw = (img: HTMLImageElement | undefined) => {
      if (!img || !ctx) return
      const cw = window.innerWidth
      const ch = window.innerHeight
      // Cover: fill the viewport, center crop if needed
      const scale = Math.max(cw / img.width, ch / img.height)
      const w = img.width * scale
      const h = img.height * scale
      const x = (cw - w) / 2
      const y = (ch - h) / 2
      ctx.clearRect(0, 0, cw, ch)
      ctx.drawImage(img, x, y, w, h)
    }

    window.addEventListener('resize', resize)
    resize()

    let currentScene = -1

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.5,
      onUpdate: (self) => {
        const p = self.progress
        // Map 0–1 progress to frame index 0–80
        const fi = Math.min(Math.max(Math.round(p * 80), 0), 80)
        draw(frames[fi])

        // Determine which scene we're in
        const si = SCENES.findIndex(s => p >= s.progress[0] && p < s.progress[1])
        const active = si === -1 ? SCENES.length - 1 : si

        if (active !== currentScene) {
          // Flash
          if (flashRef.current) {
            gsap.fromTo(flashRef.current, { opacity: 0.6 }, { opacity: 0, duration: 0.2, ease: 'power2.out' })
          }
          // Out
          if (currentScene >= 0 && panelRefs.current[currentScene]) {
            gsap.to(panelRefs.current[currentScene], { opacity: 0, y: -12, duration: 0.15, ease: 'none' })
            gsap.to(focalRefs.current[currentScene], { opacity: 0, duration: 0.15 })
          }
          // In
          if (panelRefs.current[active]) {
            gsap.fromTo(panelRefs.current[active], { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.3, ease: 'expo.out' })
            const lines = panelRefs.current[active]!.querySelectorAll('.copy-line')
            gsap.fromTo(lines, { y: '60%', opacity: 0 }, { y: '0%', opacity: 1, stagger: 0.05, duration: 0.3, ease: 'expo.out' })
          }
          if (focalRefs.current[active]) {
            gsap.fromTo(focalRefs.current[active], { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'expo.out' })
          }
          currentScene = active
        }
      }
    })

    return () => { window.removeEventListener('resize', resize); st.kill() }
  }, [isLoaded, frames])

  return (
    <div id="lenses" className="bg-sony-black">

      {/* ── Section Intro ── */}
      <div className="px-[20px] md:px-[60px] pt-16 md:pt-20 pb-8 md:pb-10 border-t border-white/5">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-7 h-[1px] bg-sony-red" />
          <span className="font-dmmono text-[0.52rem] md:text-[0.58rem] tracking-[0.35em] md:tracking-[0.45em] text-sony-red uppercase">
            G Master · FE 24-70mm f/2.8 GM II
          </span>
        </div>
        <h2 className="font-bebas text-[clamp(2rem,4vw,5rem)] leading-[0.88] text-sony-white tracking-[0.01em]">
          THE GLASS<br />
          <span className="text-sony-red">DEFINES</span> THE SHOT.
        </h2>
      </div>

      {/* ── Canvas Sequence ── */}
      {/* 1000vh: gives 81 frames ~12.3vh each, plenty of room */}
      <div ref={containerRef} className="relative w-full" style={{ height: '1000vh' }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-sony-black">

          {/* Preloader overlay */}
          {!ready && (
            <div className="absolute inset-0 z-[60] bg-sony-black flex flex-col items-center justify-center">
              <span style={{ fontFamily: 'var(--font-dmmono)', fontSize: '0.62rem', letterSpacing: '0.4em', color: '#888', textTransform: 'uppercase', marginBottom: '28px' }}>
                Preparing lens
              </span>
              <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-sony-red transition-all duration-150" style={{ width: `${loadPct}%` }} />
              </div>
              <span style={{ fontFamily: 'var(--font-dmmono)', fontSize: '0.7rem', color: '#e8001d', marginTop: '12px' }}>{loadPct}%</span>
            </div>
          )}

          {/* Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 z-0" />

          {/* Shutter flash */}
          <div ref={flashRef} className="absolute inset-0 z-[38] bg-white opacity-0 pointer-events-none" />

          {/* Vignette */}
          <div className="absolute inset-0 z-[5] pointer-events-none" style={{
            background: `
              linear-gradient(to top, rgba(6,6,6,0.92) 0%, rgba(6,6,6,0.3) 25%, transparent 50%),
              linear-gradient(to bottom, rgba(6,6,6,0.5) 0%, transparent 20%),
              radial-gradient(ellipse at center, transparent 35%, rgba(6,6,6,0.45) 100%)
            `
          }} />

          {/* Text panels */}
          <div className="absolute inset-0 z-20 pointer-events-none select-none">
            {SCENES.map((scene, idx) => (
              <div
                key={idx}
                ref={el => { panelRefs.current[idx] = el }}
                className="absolute bottom-0 left-0 w-full px-[20px] md:px-[60px] pb-10 md:pb-14"
                style={{ opacity: idx === 0 ? 1 : 0 }}
              >
                {/* Giant ghost focal watermark — bottom-right */}
                <div
                  ref={el => { focalRefs.current[idx] = el }}
                  className="absolute pointer-events-none"
                  style={{
                    fontFamily: 'var(--font-bebas)',
                    fontSize: 'clamp(6rem, 14vw, 16rem)',
                    lineHeight: 0.78,
                    color: 'transparent',
                    WebkitTextStroke: '1px rgba(255,255,255,0.035)',
                    letterSpacing: '-0.03em',
                    right: '-1vw',
                    bottom: '-2vh',
                    opacity: idx === 0 ? 1 : 0,
                    userSelect: 'none',
                  }}
                >
                  {scene.focal}
                </div>

                {/* Main copy */}
                <div className="overflow-hidden mb-5">
                  {scene.copy.map((line, li) => (
                    <div
                      key={li}
                      className="copy-line block overflow-hidden"
                      style={{
                        fontFamily: 'var(--font-bebas)',
                        fontSize: 'clamp(2rem, 4.5vw, 6rem)',
                        letterSpacing: '0.01em',
                        lineHeight: 0.88,
                        color: '#f5f0eb',
                      }}
                    >
                      <span style={{ color: scene.accent }}>{line[0]}</span>{line.slice(1)}
                    </div>
                  ))}
                </div>

                {/* Bottom row */}
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 md:gap-6">
                  <div className="max-w-[400px]">
                    <div style={{ fontFamily: 'var(--font-dmmono)', fontSize: '0.65rem md:0.72rem', color: 'rgba(245,240,235,0.45)', fontStyle: 'italic', marginBottom: '4px', letterSpacing: '0.02em' }}>
                      {scene.sub}
                    </div>
                    <div className="font-dmmono text-[0.48rem] md:text-[0.55rem] tracking-[0.25em] md:tracking-[0.3em] uppercase" style={{ color: scene.accent }}>
                      {scene.lens}
                    </div>
                  </div>

                  <div style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(1.4rem, 2.5vw, 3rem)', color: scene.accent, lineHeight: 1, letterSpacing: '0.01em', flexShrink: 0 }}>
                    {scene.focal}
                  </div>
                </div>
              </div>
            ))}

            {/* Scroll progress indicator */}
            <div className="absolute bottom-10 md:bottom-14 left-[20px] md:left-[60px] flex items-center gap-2 md:gap-3" style={{ zIndex: 10 }}>
              {SCENES.map((_, i) => (
                <div key={i} className="h-[1px] w-6 md:w-8 bg-white/10" />
              ))}
            </div>

            {/* Frame counter — top right */}
            <div className="absolute top-8 right-[60px]" style={{ fontFamily: 'var(--font-dmmono)', fontSize: '0.5rem', color: 'rgba(245,240,235,0.18)', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
              G Master Series · E-Mount
            </div>
          </div>
        </div>
      </div>

      {/* ── Section outro ── */}
      <div className="px-[20px] md:px-[60px] py-10 md:py-14 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="font-bebas text-[clamp(1.5rem,2.5vw,2.8rem)] text-sony-white/10 tracking-[0.04em]">
          24–70mm · f/2.8 · Constant Aperture
        </div>
        <div className="font-dmmono text-[0.48rem] md:text-[0.55rem] text-sony-white/20 tracking-[0.25em] md:tracking-[0.3em] uppercase">
          Full E-Mount Compatibility
        </div>
      </div>
    </div>
  )
}
