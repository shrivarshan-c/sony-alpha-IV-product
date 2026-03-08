"use client"
import { useEffect, ReactNode } from 'react'
import { initLenis } from '@/lib/lenis'

export default function ClientLenis({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Disable browser's default scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    const lenis = initLenis()

    // Force scroll to top on mount
    window.scrollTo(0, 0)
    lenis.scrollTo(0, { immediate: true })

    return () => { 
      lenis.destroy() 
    }
  }, [])

  return <>{children}</>
}
