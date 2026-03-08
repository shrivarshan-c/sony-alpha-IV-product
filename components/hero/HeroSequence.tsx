"use client"
import { useEffect, useRef } from 'react'
import { useImagePreloader } from '@/hooks/useImagePreloader'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import HeroText from './HeroText'
import Particles from './Particles'

export default function HeroSequence() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const loadingRef = useRef<HTMLDivElement>(null)
  const lastFrame = useRef<number>(-1)
  const { progress, frames, isLoaded } = useImagePreloader('/hero-section/ezgif-frame-', 1, 40)

  useEffect(() => {
    if (isLoaded && loadingRef.current) {
      gsap.to(loadingRef.current, {
        opacity: 0,
        duration: 0.8,
        onComplete: () => {
          if (loadingRef.current) loadingRef.current.style.display = 'none'
        }
      })
    }
  }, [isLoaded])

  useEffect(() => {
    if (!isLoaded || !canvasRef.current || !containerRef.current || frames.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const updateCanvasSize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      
      const width = parent.offsetWidth
      const height = parent.offsetHeight
      
      canvas.width = width * window.devicePixelRatio
      canvas.height = height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      
      drawFrame(frames[0])
    }

    const drawFrame = (img: HTMLImageElement | undefined) => {
      if (!img || !ctx) return
      const parent = canvas.parentElement
      if (!parent) return

      const cw = parent.offsetWidth
      const ch = parent.offsetHeight
      const scale = Math.max(cw / img.width, ch / img.height)
      const w = img.width * scale
      const h = img.height * scale
      const x = (cw - w) / 2
      const y = (ch - h) / 2

      ctx.clearRect(0, 0, cw, ch)
      ctx.drawImage(img, x, y, w, h)
    }

    window.addEventListener('resize', updateCanvasSize)
    updateCanvasSize()

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        const frameIndex = Math.min(Math.max(Math.round(self.progress * 39), 0), 39)
        // Optimization: Only draw if the frame actually changed
        if (frameIndex !== lastFrame.current) {
          lastFrame.current = frameIndex
          requestAnimationFrame(() => drawFrame(frames[frameIndex]))
        }
      }
    })

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      st.kill()
    }
  }, [isLoaded, frames])

  return (
    <>
      <div ref={loadingRef} className="fixed inset-0 z-[50] bg-sony-black flex flex-col items-center justify-center">
        <h2 className="font-rajdhani text-[1rem] text-sony-white tracking-[0.4em] uppercase mb-8">Loading Experience</h2>
        <div className="w-64 h-1 bg-sony-white/20 overflow-hidden relative">
          <div className="absolute top-0 left-0 h-full bg-sony-red transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-sony-red font-rajdhani mt-4">{progress}%</p>
      </div>

      <div ref={containerRef} className="h-[500vh] relative bg-sony-black">
        <div className="sticky top-0 h-screen overflow-hidden bg-sony-black">
          <canvas 
            ref={canvasRef} 
            className="absolute inset-0 z-0 opacity-100" 
            style={{ willChange: 'transform' }} // Hardware acceleration hint
          />
          <HeroText containerRef={containerRef} />
          <Particles />
        </div>
      </div>
    </>
  )
}
