"use client"
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

const items = [
  "33 Megapixels",
  "759 Phase-Detect AF Points",
  "5-Axis In-Body Stabilization",
  "4K 60p Video",
  "Real-Time Eye AF",
  "Weather Sealed Magnesium Body",
]
const allItems = [...items, ...items, ...items, ...items, ...items, ...items]

export default function Ticker() {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!trackRef.current) return
    gsap.to(trackRef.current, { x: "-50%", duration: 30, ease: "none", repeat: -1 })
  }, [])

  return (
    <div className="border-t border-b border-sony-white/5 py-[18px] overflow-hidden relative bg-sony-black">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-sony-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-sony-black to-transparent z-10 pointer-events-none" />
      
      <div ref={trackRef} className="flex whitespace-nowrap w-max">
        {allItems.map((item, index) => (
          <div key={index} className="flex items-center px-10">
            <span className="font-rajdhani font-semibold text-[0.7rem] tracking-[0.3em] text-sony-white/25 uppercase">{item}</span>
            <div className="w-1 h-1 bg-sony-red rounded-full ml-10" />
          </div>
        ))}
      </div>
    </div>
  )
}
