import { useState, useEffect } from 'react'

export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const height = document.documentElement.scrollHeight - window.innerHeight
      if (height > 0) setProgress((scrollY / height) * 100)
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return progress
}
