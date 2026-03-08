"use client"
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export default function Particles() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const particles = containerRef.current.children
    gsap.to(particles, {
      y: "random(-30, -50)", x: "random(-10, 10)", rotation: "random(-15, 15)",
      duration: "random(6, 12)", repeat: -1, yoyo: true, ease: "sine.inOut",
      stagger: { each: 0.6, from: "random" }
    })
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-[5]">
      <div className="absolute w-1 h-1 rounded-full bg-sony-red shadow-[0_0_8px_#e8001d] top-[20%] left-[15%]" />
      <div className="absolute w-1 h-1 rounded-full bg-sony-red shadow-[0_0_8px_#e8001d] top-[35%] left-[52%]" />
      <div className="absolute w-1 h-1 rounded-full bg-sony-red shadow-[0_0_8px_#e8001d] top-[65%] left-[38%]" />
      <div className="absolute w-1 h-1 rounded-full bg-sony-red shadow-[0_0_8px_#e8001d] top-[55%] right-[25%]" />
      <div className="absolute w-1 h-1 rounded-full bg-sony-red shadow-[0_0_8px_#e8001d] top-[28%] left-[72%]" />
      <div className="absolute w-1 h-1 rounded-full bg-sony-red shadow-[0_0_8px_#e8001d] top-[78%] left-[25%]" />
      <div className="absolute w-1 h-1 rounded-full bg-sony-red shadow-[0_0_8px_#e8001d] top-[42%] right-[15%]" />
      <div className="absolute w-1 h-1 rounded-full bg-sony-red shadow-[0_0_8px_#e8001d] top-[60%] right-[40%]" />
      
      <div className="absolute top-[25%] right-[20%] w-3 h-3 opacity-30 before:absolute before:inset-x-0 before:top-1/2 before:-translate-y-1/2 before:h-px before:bg-sony-white after:absolute after:inset-y-0 after:left-1/2 after:-translate-x-1/2 after:w-px after:bg-sony-white" />
      <div className="absolute top-[70%] left-[20%] w-3 h-3 opacity-30 before:absolute before:inset-x-0 before:top-1/2 before:-translate-y-1/2 before:h-px before:bg-sony-white after:absolute after:inset-y-0 after:left-1/2 after:-translate-x-1/2 after:w-px after:bg-sony-white" />
      <div className="absolute top-[45%] right-[35%] w-3 h-3 opacity-30 before:absolute before:inset-x-0 before:top-1/2 before:-translate-y-1/2 before:h-px before:bg-sony-white after:absolute after:inset-y-0 after:left-1/2 after:-translate-x-1/2 after:w-px after:bg-sony-white" />
      <div className="absolute top-[15%] left-[45%] w-3 h-3 opacity-30 before:absolute before:inset-x-0 before:top-1/2 before:-translate-y-1/2 before:h-px before:bg-sony-white after:absolute after:inset-y-0 after:left-1/2 after:-translate-x-1/2 after:w-px after:bg-sony-white" />
    </div>
  )
}
