"use client"
import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

interface FeatureCardProps {
  number: string
  stat: string
  unit: string
  titlePart1: string
  titleAccent: string
  titlePart2?: string
  description: string
  imageSrc: string
  layout?: 'normal' | 'wide' | 'tall' | 'full'
  accentColor?: string
}

export default function FeatureCard({
  number, stat, unit, titlePart1, titleAccent, titlePart2 = '', description, imageSrc, layout = 'normal'
}: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={cardRef}
      className="feature-card group relative overflow-hidden cursor-pointer bg-[#0a0a0a] opacity-100 w-full h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background image */}
      <img
        ref={imgRef}
        src={imageSrc}
        alt={titleAccent}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-[900ms]"
        style={{
          opacity: hovered ? 0.5 : 0.3,
          transform: hovered ? 'scale(1.08)' : 'scale(1.0)',
          transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)'
        }}
      />

      {/* Red top sweep line on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-sony-red origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 z-30" />

      {/* Giant background stat number — purely decorative */}
      <div
        className="absolute font-playfair font-black text-sony-white pointer-events-none select-none z-10 transition-all duration-700"
        style={{
          fontSize: layout === 'full' ? 'clamp(8rem,18vw,22rem)' : 'clamp(6rem,12vw,14rem)',
          lineHeight: 1,
          opacity: hovered ? 0.06 : 0.04,
          bottom: layout === 'full' ? '-2rem' : '-1rem',
          right: '1rem',
          letterSpacing: '-0.05em',
        }}
      >
        {stat}
      </div>

      {/* Vertical number badge */}
      <div
        className="absolute top-6 left-0 z-20 flex flex-col items-center"
        style={{ borderLeft: '2px solid rgba(232,0,29,0.4)' }}
      >
        <span
          className="font-rajdhani font-bold text-sony-red tracking-[0.15em]"
          style={{ fontSize: '0.6rem', writingMode: 'vertical-rl', padding: '10px 8px', letterSpacing: '0.3em' }}
        >
          {number} — 06
        </span>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-6 pl-8">
        {/* Stat value */}
        <div className="flex items-baseline gap-2 mb-2">
          <span
            className="font-rajdhani font-bold text-sony-red leading-none"
            style={{ fontSize: layout === 'full' ? 'clamp(3rem,5vw,5rem)' : 'clamp(2.4rem,4vw,3.6rem)', letterSpacing: '-0.03em' }}
          >
            {stat}
          </span>
          <span className="font-rajdhani text-sony-red/70 text-lg font-semibold tracking-widest">{unit}</span>
        </div>

        {/* Title */}
        <h3
          className="font-playfair font-bold text-sony-white leading-[1.1] mb-2"
          style={{ fontSize: layout === 'full' ? 'clamp(1.6rem,2.5vw,2.4rem)' : 'clamp(1.2rem,1.8vw,1.8rem)' }}
        >
          {titlePart1}{' '}
          <span className="text-sony-red italic">{titleAccent}</span>
          {titlePart2 ? ` ${titlePart2}` : ''}
        </h3>

        {/* Divider */}
        <div
          className="h-[1px] bg-gradient-to-r from-sony-red/60 to-transparent mb-3 origin-left transition-all duration-500"
          style={{ transform: hovered ? 'scaleX(1)' : 'scaleX(0.4)', width: '80%' }}
        />

        {/* Description */}
        <p
          className="font-crimson italic text-sony-white/50 leading-[1.65] transition-all duration-500"
          style={{
            fontSize: '0.95rem',
            maxWidth: layout === 'full' ? '600px' : '280px',
            opacity: hovered ? 0.8 : 0.5,
          }}
        >
          {description}
        </p>
      </div>

      {/* Corner bracket decoration */}
      <div className="absolute bottom-0 right-0 w-8 h-8 z-20 opacity-20 group-hover:opacity-50 transition-opacity duration-500">
        <div className="absolute bottom-0 right-0 w-full h-[1px] bg-sony-red" />
        <div className="absolute bottom-0 right-0 w-[1px] h-full bg-sony-red" />
      </div>
    </div>
  )
}
