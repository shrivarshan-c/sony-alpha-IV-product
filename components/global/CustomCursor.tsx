"use client"
import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!dotRef.current || !ringRef.current) return
    document.body.style.cursor = 'none'

    const xDot = gsap.quickTo(dotRef.current, "x", {duration: 0, ease: "none"})
    const yDot = gsap.quickTo(dotRef.current, "y", {duration: 0, ease: "none"})
    const xRing = gsap.quickTo(ringRef.current, "x", {duration: 0.15, ease: "power3"})
    const yRing = gsap.quickTo(ringRef.current, "y", {duration: 0.15, ease: "power3"})

    const handleMouseMove = (e: MouseEvent) => {
      xDot(e.clientX)
      yDot(e.clientY)
      xRing(e.clientX - 16)
      yRing(e.clientY - 16)
    }

    const handleMouseEnter = () => gsap.to(ringRef.current, { scale: 2, borderColor: 'rgba(232,0,29,0.8)', duration: 0.3 })
    const handleMouseLeave = () => gsap.to(ringRef.current, { scale: 1, borderColor: 'rgba(232,0,29,0.5)', duration: 0.3 })

    window.addEventListener('mousemove', handleMouseMove)
    const elements = document.querySelectorAll('a, button, .cursor-pointer')
    elements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      elements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
      document.body.style.cursor = 'auto'
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="fixed top-0 left-0 w-[6px] h-[6px] bg-sony-red rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2" />
      <div ref={ringRef} className="fixed top-0 left-0 w-[32px] h-[32px] border border-[rgba(232,0,29,0.5)] rounded-full pointer-events-none z-[9998]" />
    </>
  )
}
