"use client"
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { gsap } from '@/lib/gsap'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      const heroSectionEnd = window.innerHeight * 5 // 500vh
      
      // Calculate Lens Showcase bounds
      const lensesElement = document.getElementById('lenses')
      let isInLenses = false
      
      if (lensesElement) {
        const rect = lensesElement.getBoundingClientRect()
        const top = rect.top + y
        const bottom = rect.bottom + y
        // Hide while the sticky content is active (within the 1000vh container)
        // We hide slightly before it hits top and show slightly after it leaves
        isInLenses = y > top + 100 && y < bottom - window.innerHeight - 100
      }

      // Background blur effect once past 50px
      setScrolled(y > 50)

      // Hide nav while inside the hero antigravity scroll (first 500vh)
      // OR while inside the Lens Showcase sticky scroll
      if (navRef.current) {
        const isInHero = y > 80 && y < heroSectionEnd - window.innerHeight
        const shouldHide = isInHero || isInLenses

        gsap.to(navRef.current, {
          y: shouldHide ? -100 : 0,
          opacity: shouldHide ? 0 : 1,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: true,
        })
      }

      lastScrollY.current = y
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-[100] px-[20px] md:px-[60px] py-[20px] md:py-[24px] flex justify-between items-center transition-all duration-300 ${
        scrolled ? 'bg-[rgba(6,6,6,0.85)] backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center gap-3 md:gap-4">
        <span className="font-rajdhani font-bold text-lg md:text-xl tracking-[0.3em] md:tracking-[0.4em] uppercase text-sony-white">Sony</span>
        <span className="font-crimson italic text-sony-red text-lg md:text-xl">α7 IV</span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        <Link href="#features" className="font-rajdhani font-semibold text-sony-white/50 tracking-[0.25em] uppercase text-sm hover:text-sony-red transition-colors">
          Features
        </Link>
        <Link href="#gallery" className="font-rajdhani font-semibold text-sony-white/50 tracking-[0.25em] uppercase text-sm hover:text-sony-red transition-colors">
          Gallery
        </Link>
        <Link href="#specs" className="font-rajdhani font-semibold text-sony-white/50 tracking-[0.25em] uppercase text-sm hover:text-sony-red transition-colors">
          Specs
        </Link>
      </div>
      {/* Mobile Menu Placeholder (Minimalist) */}
      <div className="md:hidden flex items-center">
        <div className="w-6 h-[1px] bg-sony-white/40" />
      </div>
    </nav>
  )
}
