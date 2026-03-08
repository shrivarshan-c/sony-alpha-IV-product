"use client"
import { useScrollProgress } from '@/hooks/useScrollProgress'

export default function ScrollProgress() {
  const progress = useScrollProgress()
  return <div className="fixed top-0 left-0 h-[2px] bg-sony-red z-[200]" style={{ width: `${progress}%` }} />
}
