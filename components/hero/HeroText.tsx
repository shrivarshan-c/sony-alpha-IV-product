"use client"
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export default function HeroText({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const specsRef = useRef<HTMLDivElement>(null)
  const specRef1 = useRef<HTMLDivElement>(null)
  const specRef2 = useRef<HTMLDivElement>(null)
  const specRef3 = useRef<HTMLDivElement>(null)
  const panelRefs = useRef<(HTMLDivElement | null)[]>([])
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (specRef1.current) gsap.to(specRef1.current, { y: -14, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    if (specRef2.current) gsap.to(specRef2.current, { y: -18, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.5 })
    if (specRef3.current) gsap.to(specRef3.current, { y: -12, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.8 })
    if (scrollIndicatorRef.current) gsap.to(scrollIndicatorRef.current, { scaleY: 0.4, opacity: 0.2, duration: 2.2, repeat: -1, yoyo: true })

    const p0 = panelRefs.current[0]
    if (p0) gsap.fromTo(Array.from(p0.querySelectorAll('[data-anim]')),
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, stagger: 0.09, duration: 1, delay: 0.25, ease: 'power3.out' }
    )

    if (!containerRef.current) return

    panelRefs.current.forEach((panel, idx) => {
      if (!panel) return
      if (idx === 0) {
        gsap.to(panel, { opacity: 0, y: -22, scrollTrigger: { trigger: containerRef.current, start: '18% top', end: '25% top', scrub: 1 } })
      } else {
        gsap.fromTo(panel, { opacity: 0, y: 22 }, { opacity: 1, y: 0, scrollTrigger: { trigger: containerRef.current, start: `${idx * 25}% top`, end: `${idx * 25 + 9}% top`, scrub: 1 } })
        if (idx < 3) {
          gsap.to(panel, { opacity: 0, y: -22, scrollTrigger: { trigger: containerRef.current, start: `${idx * 25 + 18}% top`, end: `${idx * 25 + 26}% top`, scrub: 1 } })
        }
      }
    })

    if (wrapperRef.current) gsap.to(wrapperRef.current, { x: -55, opacity: 0, scrollTrigger: { trigger: containerRef.current, start: '68% top', end: '82% top', scrub: 1 } })
    if (specsRef.current) gsap.to(specsRef.current, { x: 55, opacity: 0, scrollTrigger: { trigger: containerRef.current, start: '72% top', end: '86% top', scrub: 1 } })
  }, [containerRef])

  return (
    <div className="absolute inset-0 z-[10] pointer-events-none select-none">
      {/* Gradient overlay */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(108deg, rgba(6,6,6,0.9) 0%, rgba(6,6,6,0.35) 50%, transparent 100%), linear-gradient(to top, rgba(6,6,6,0.8) 0%, transparent 40%)' }} />

      {/* Full-width ghost text bleeding across hero bottom */}
      <div className="absolute bottom-[8%] left-0 w-full pointer-events-none overflow-hidden hidden md:block" style={{ zIndex: 5 }}>
        <div
          className="font-playfair font-black text-transparent whitespace-nowrap"
          style={{ fontSize: 'clamp(3.5rem,8vw,11rem)', lineHeight: 0.85, WebkitTextStroke: '1px rgba(245,240,235,0.04)', letterSpacing: '-0.03em', paddingLeft: '60px' }}
        >
          DESIGNED TO OUTLAST EVERY MOMENT.
        </div>
      </div>

      {/* Panel container */}
      <div ref={wrapperRef} className="absolute left-[20px] md:left-[60px] top-1/2 -translate-y-1/2" style={{ width: 'calc(100% - 40px)', maxWidth: '580px' }}>

    
        <div ref={el => { panelRefs.current[0] = el }} className="absolute top-0 left-0 w-full" style={{ opacity: 1 }}>
          <div data-anim className="flex items-center gap-4 mb-5">
            <div className="w-10 h-[1px] bg-sony-red" />
            <span className="font-rajdhani text-[0.58rem] tracking-[0.6em] text-sony-red uppercase">ILCE-7M4 · 2024</span>
          </div>

          {/* Sony α7IV — tight, powerful */}
          <div data-anim style={{ marginBottom: '1.2rem' }}>
            <div className="font-playfair font-black text-transparent" style={{ fontSize: 'clamp(4.5rem, 8vw, 10rem)', lineHeight: 0.8, WebkitTextStroke: '1px rgba(245,240,235,0.1)', letterSpacing: '-0.02em' }}>
              sony
            </div>
            <div className="font-playfair font-black text-sony-white" style={{ fontSize: 'clamp(4.5rem, 8vw, 10rem)', lineHeight: 0.82, letterSpacing: '-0.03em' }}>
              α7<span className="text-sony-red">IV</span>
            </div>
          </div>

          {/* The jaw-dropper line */}
          <div data-anim className="font-playfair font-bold text-sony-white" style={{ fontSize: 'clamp(1rem, 1.6vw, 1.65rem)', lineHeight: 1.25, maxWidth: '380px', marginBottom: '1.4rem' }}>
            You don't capture moments.<br />
            <span className="text-sony-red italic">You define them.</span>
          </div>

          {/* Spec strip — two-line value + unit */}
          <div data-anim style={{ borderTop: '1px solid rgba(232,0,29,0.22)', borderBottom: '1px solid rgba(232,0,29,0.22)', padding: '7px 0', marginBottom: '1.2rem' }}>
            <div className="flex">
              {[['33', 'MP'], ['759', 'AF pts'], ['4K', '60p'], ['5.5', 'stops']].map(([v, u], i) => (
                <div key={i} className="flex-1 text-center" style={{ borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                  <div className="font-rajdhani font-bold text-sony-white" style={{ fontSize: '0.85rem', letterSpacing: '0.05em' }}>{v}</div>
                  <div className="font-rajdhani text-sony-grey uppercase" style={{ fontSize: '0.48rem', letterSpacing: '0.25em' }}>{u}</div>
                </div>
              ))}
            </div>
          </div>

          <div data-anim className="font-crimson italic text-sony-white/38" style={{ fontSize: '0.95rem', lineHeight: 1.8, maxWidth: '310px' }}>
            Every specification engineered with one obsession — to not exist between you and the image.
          </div>
        </div>

        {/* ── PANEL 1 — SENSOR: "Some cameras record the world. This one reveals it." ── */}
        <div ref={el => { panelRefs.current[1] = el }} className="absolute top-0 left-0 w-full" style={{ opacity: 0 }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-[1px] bg-sony-red" />
            <span className="font-rajdhani text-[0.58rem] tracking-[0.6em] text-sony-red uppercase">01 · Full-Frame Sensor</span>
          </div>

          {/* Small pre-line */}
          <div className="font-rajdhani text-sony-white/30 mb-3" style={{ fontSize: '0.7rem', letterSpacing: '0.35em', textTransform: 'uppercase' }}>
            Some cameras record the world.
          </div>

          {/* Main statement */}
          <div className="font-playfair font-black text-sony-white leading-[0.88] mb-6" style={{ fontSize: 'clamp(3.2rem, 5.5vw, 6.5rem)' }}>
            This one<br />
            <span className="text-transparent italic" style={{ WebkitTextStroke: '1px rgba(245,240,235,0.2)' }}>reveals</span>{' '}
            <span className="text-sony-white">it.</span>
          </div>

          <div className="font-rajdhani font-bold text-sony-red" style={{ fontSize: 'clamp(2.8rem, 5vw, 5rem)', letterSpacing: '-0.04em', lineHeight: 1 }}>
            33.0<span style={{ fontSize: '32%', letterSpacing: '0.3em', marginLeft: '0.5rem', opacity: 0.7, verticalAlign: 'middle' }}>MP</span>
          </div>
          <div className="font-rajdhani text-sony-grey uppercase mt-1" style={{ fontSize: '0.58rem', letterSpacing: '0.4em' }}>
            35mm BSI-CMOS · 15+ Stops Dynamic Range
          </div>
        </div>

        {/* ── PANEL 2 — AF: "759 points. Zero excuses." ── */}
        <div ref={el => { panelRefs.current[2] = el }} className="absolute top-0 left-0 w-full" style={{ opacity: 0 }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-[1px] bg-sony-red" />
            <span className="font-rajdhani text-[0.58rem] tracking-[0.6em] text-sony-red uppercase">02 · Autofocus</span>
          </div>

          {/* THE number */}
          <div className="font-rajdhani font-bold text-sony-red leading-[0.82] mb-3" style={{ fontSize: 'clamp(4.5rem, 9.5vw, 11rem)', letterSpacing: '-0.05em' }}>
            759
          </div>

          {/* Punchy sub-statement */}
          <div className="font-playfair font-bold text-sony-white mb-2" style={{ fontSize: 'clamp(1.3rem, 2.2vw, 2.4rem)', lineHeight: 1.1 }}>
            Points.
            <span className="text-sony-red italic"> Zero excuses.</span>
          </div>

          <div className="font-rajdhani text-sony-grey uppercase mb-5" style={{ fontSize: '0.58rem', letterSpacing: '0.4em' }}>
            Phase-Detect · 94% Frame Coverage · Real-Time Eye AF
          </div>

          <div className="font-crimson italic text-sony-white/38" style={{ fontSize: '0.95rem', lineHeight: 1.8, maxWidth: '300px' }}>
            The shot you almost missed? With 759 phase-detect points blanks across the frame — it was never in danger.
          </div>
        </div>

        {/* ── PANEL 3 — VIDEO: "Your editor will ask what film stock you used." ── */}
        <div ref={el => { panelRefs.current[3] = el }} className="absolute top-0 left-0 w-full" style={{ opacity: 0 }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-[1px] bg-sony-red" />
            <span className="font-rajdhani text-[0.58rem] tracking-[0.6em] text-sony-red uppercase">04 · Cinema</span>
          </div>

          {/* Film data table */}
          <div className="mb-5" style={{ borderLeft: '2px solid rgba(232,0,29,0.4)', paddingLeft: '16px' }}>
            {[
              ['FORMAT', '4K UHD'],
              ['FRAME RT', '60p'],
              ['BIT DEPTH', '10-bit'],
              ['CHROMA', '4:2:2'],
              ['COLOUR SCI', 'S-Cinetone'],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-6 mb-[5px]">
                <span className="font-rajdhani text-sony-grey uppercase w-20 flex-shrink-0" style={{ fontSize: '0.55rem', letterSpacing: '0.25em' }}>{k}</span>
                <span className="font-rajdhani font-bold text-sony-white" style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}>{v}</span>
              </div>
            ))}
          </div>

          {/* The laugh-out-loud one-liner */}
          <div className="font-playfair font-black text-sony-white" style={{ fontSize: 'clamp(1.8rem, 3vw, 3.5rem)', lineHeight: 1.05 }}>
            Your editor will ask<br />
            <em className="text-sony-red">what film stock</em><br />
            you used.
          </div>
        </div>

        {/* Invisible spacer for height */}
        <div style={{ visibility: 'hidden', fontSize: 'clamp(4.5rem, 8vw, 10rem)', lineHeight: 0.82 }}>
          <div className="font-playfair font-black">sony</div>
          <div className="font-playfair font-black">α7IV</div>
          <div style={{ fontSize: '1.65rem', marginTop: '1.2rem' }}>You don't capture moments.<br />You define them.</div>
          <div style={{ fontSize: '0.95rem', marginTop: '1.2rem', maxWidth: '310px' }}>spacer text</div>
        </div>
      </div>

      {/* Right floating specs */}
      <div ref={specsRef} className="absolute right-[60px] top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-9">
        {[
          { ref: specRef1, value: '33', sup: 'MP', label: 'Full-Frame' },
          { ref: specRef2, value: '759', sup: 'pts', label: 'AF Points' },
          { ref: specRef3, value: '4K', sup: '60p', label: 'Video' },
        ].map(({ ref, value, sup, label }) => (
          <div key={label} ref={ref} className="relative text-right pr-5">
            <div className="font-playfair font-bold text-sony-white leading-none" style={{ fontSize: '2.2rem' }}>
              {value}<sup className="font-rajdhani text-sony-red ml-1 align-top" style={{ fontSize: '0.8rem', fontWeight: 700 }}>{sup}</sup>
            </div>
            <div className="font-rajdhani font-semibold text-sony-grey uppercase mt-1" style={{ fontSize: '0.52rem', letterSpacing: '0.28em' }}>{label}</div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[5px] h-[5px] border border-sony-red rounded-full" />
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 w-full flex justify-between items-end px-[20px] md:px-[60px] py-6 md:py-9">
        <div className="font-rajdhani text-[0.52rem] tracking-[0.3em] text-sony-white/18 uppercase leading-[2.2]">
          Sony Electronics · α Series<br />ILCE-7M4 / 2024
        </div>
        <div className="flex flex-col items-center gap-3">
          <div className="font-rajdhani text-[0.55rem] text-sony-white/28 tracking-[0.22em] uppercase" style={{ writingMode: 'vertical-lr' }}>Scroll</div>
          <div ref={scrollIndicatorRef} className="w-[1px] h-14 origin-top" style={{ background: 'linear-gradient(to bottom, #e8001d, transparent)' }} />
        </div>
      </div>
    </div>
  )
}
