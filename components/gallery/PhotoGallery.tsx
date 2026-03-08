"use client"
import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

/* ─────────────────────────────────────────────────────
   AUTHENTIC MAGAZINE SPREAD
   High-end editorial layout with precise metadata
───────────────────────────────────────────────────── */

const PHOTOS = [
  {
    id: 1,
    src: '/Random-portraits/Whisk_24c4f01465fbf6daed24c2f249e15d6bdr.jpeg',
    title: 'NIGHT DRIVE', // The Porsche driving blur
    lens: 'FE 24-70mm f/2.8 GM II',
    focal: '35mm',
    aperture: 'f/4.0',
    shutter: '1/30s', // Slow shutter for motion blur
    iso: 'ISO 1600',
    body: 'α7 IV',
    area: 'spread', // Massive two-column feature
  },
  {
    id: 2,
    src: '/Random-portraits/Whisk_0d030b1eeba060ebdd844a7d79a50041dr.jpeg',
    title: 'CANDID MOMENTS', // The smiling child portrait
    lens: 'FE 50mm f/1.2 GM',
    focal: '50mm',
    aperture: 'f/1.2', // Wide open for perfect portrait bokeh
    shutter: '1/1000s',
    iso: 'ISO 100',
    body: 'α7 IV',
    area: 'port-left',
  },
  {
    id: 3,
    src: '/Random-portraits/Whisk_42ff2b6f3f5dd40924d436efbd9172a8dr.jpeg',
    title: 'MACRO DETAILS', // The water drop on spiderweb
    lens: 'FE 90mm f/2.8 Macro G',
    focal: '90mm',
    aperture: 'f/5.6', // Slightly stopped down for macro sharpness
    shutter: '1/250s',
    iso: 'ISO 200',
    body: 'α7 IV',
    area: 'sq-right',
  },
  {
    id: 4,
    src: '/Random-portraits/Whisk_8067d601bc30e26bf9b4fba970d8a333dr.jpeg',
    title: 'TOKYO NIGHTS', // The B&W Japanese street scene
    lens: 'FE 35mm f/1.4 GM',
    focal: '35mm',
    aperture: 'f/1.4',
    shutter: '1/125s',
    iso: 'ISO 3200', // High ISO for night
    body: 'α7 IV',
    area: 'port-center',
  },
  {
    id: 5,
    src: '/Random-portraits/Whisk_04c12a1b4aa1d4e860940ff37460212bdr.jpeg',
    title: 'GOLDEN HOUR PORTRAIT', // The woman looking back at sunset
    lens: 'FE 85mm f/1.4 GM',
    focal: '85mm',
    aperture: 'f/1.4',
    shutter: '1/2000s',
    iso: 'ISO 100',
    body: 'α7 IV',
    area: 'sq-left',
  },
  {
    id: 6,
    src: '/Random-portraits/Whisk_7bbbdab97612b0c816d461189600849cdr.jpeg',
    title: 'URBAN SYMMETRY', // The upward shot of skyscrapers
    lens: 'FE 14mm f/1.8 GM', // Ultra-wide needed for architecture
    focal: '14mm',
    aperture: 'f/8.0',
    shutter: '1/60s',
    iso: 'ISO 400',
    body: 'α7 IV',
    area: 'port-right',
  },
]

export default function PhotoGallery() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Scene entrance: Elements fade/slide in cleanly
      const titleEls = gsap.utils.toArray('.pg-reveal')
      gsap.fromTo(titleEls, 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.1, 
          duration: 1.2, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          }
        }
      )

      // 2. Photos entrance: Scattered -> Magazine layout
      const photoBlocks = gsap.utils.toArray<HTMLElement>('.pg-photo-block')
      
      photoBlocks.forEach((block) => {
        // Subtle scatter, not chaotic, just "placing on table"
        const rotation = gsap.utils.random(-8, 8)
        const yOffset = gsap.utils.random(40, 100)
        
        gsap.set(block, {
          y: yOffset,
          rotationZ: rotation,
          opacity: 0,
        })
      })

      ScrollTrigger.create({
        trigger: '.pg-editorial-grid',
        start: 'top 70%',
        once: true,
        onEnter: () => {
          gsap.to(photoBlocks, {
            y: 0,
            rotationZ: 0,
            opacity: 1,
            duration: 1.4,
            stagger: 0.15,
            ease: 'expo.out', 
            clearProps: 'transform',
          })
        }
      })

      // 3. Smooth Parallax Effect for Images
      const parallaxImages = gsap.utils.toArray<HTMLElement>('.pg-parallax-img')
      parallaxImages.forEach((img) => {
        gsap.to(img, {
          yPercent: 15, // Smoothly shifts the image within the frame
          ease: 'none',
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1, // High scrub value for extra buttery movement
          }
        })
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="gallery" ref={containerRef} className="pg-editorial-section">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500&display=swap');
      `}} />

      {/* Elegant Editorial Header */}
      <div className="pg-magazine-header">
        <div className="pg-header-content">
          <p className="pg-issue-tag pg-reveal">Vol. 01 — The Alpha Gallery</p>
          <h2 className="pg-magazine-title pg-reveal">Field Notes</h2>
          <p className="pg-magazine-lead pg-reveal">
            Captured entirely on the Sony α7 IV. A curation of light, shadow, and impeccable detail. 
            No excuses. Just raw capability translated into physical emotion.
          </p>
          <div className="pg-magazine-divider pg-reveal" />
        </div>
      </div>

      {/* Spacious Asymmetrical Grid */}
      <div className="pg-editorial-grid">
        {PHOTOS.map((photo) => (
          <div key={photo.id} className={`pg-photo-block pg-area-${photo.area}`}>
            <div className="pg-image-frame overflow-hidden">
              <img 
                src={photo.src} 
                alt={photo.title} 
                className="pg-image pg-parallax-img scale-110" 
                style={{ willChange: 'transform' }}
              />
            </div>
            
            {/* Highly Detailed EXIF Data Block */}
            <div className="pg-exif-block">
              <h4 className="pg-photo-title">{photo.title}</h4>
              <ul className="pg-exif-list">
                <li><span>Camera</span>{photo.body}</li>
                <li><span>Lens</span>{photo.lens}</li>
                <li><span>Focal Length</span>{photo.focal}</li>
                <li><span>Exposure</span>{photo.aperture} at {photo.shutter}</li>
                <li><span>Sensitivity</span>{photo.iso}</li>
              </ul>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        /* ══════════════════════════════════════
           MAGAZINE SPREAD CSS
        ══════════════════════════════════════ */
        
        .pg-editorial-section {
          background-color: #050505; /* Deep, rich studio black */
          color: #e5e5e5;
          padding: 120px 0 160px;
          min-height: 100vh;
        }

        /* ── Header ── */
        .pg-magazine-header {
          padding: 0 5%;
          max-width: 1400px;
          margin: 0 auto 100px auto;
          display: flex;
          justify-content: center;
          text-align: center;
        }
        .pg-header-content {
          max-width: 600px;
        }
        .pg-issue-tag {
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #888;
          margin-bottom: 24px;
        }
        .pg-magazine-title {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: clamp(3rem, 6vw, 5rem);
          font-weight: 400;
          line-height: 1.1;
          color: #ffffff;
          margin-bottom: 24px;
        }
        .pg-magazine-lead {
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          line-height: 1.7;
          font-weight: 300;
          color: #aaa;
          margin-bottom: 40px;
        }
        .pg-magazine-divider {
          width: 40px;
          height: 1px;
          background: #333;
          margin: 0 auto;
        }

        /* ── Spacious Asymmetrical Grid ── */
        .pg-editorial-grid {
          padding: 0 5%;
          max-width: 1600px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 40px;
          align-items: start;
        }

        /* ── Specific Area Placements (The "Magazine Spread" look) ── */
        
        /* 1. Massive feature stretching 10 columns */
        .pg-area-spread { 
          grid-column: 2 / 12; 
          margin-bottom: 80px;
        }
        
        /* 2. Left portrait */
        .pg-area-port-left { 
          grid-column: 1 / 6; 
          margin-top: 40px;
        }
        
        /* 3. Right square, offset lower */
        .pg-area-sq-right { 
          grid-column: 7 / 13; 
          margin-top: 180px;
          margin-bottom: 80px;
        }
        
        /* 4. Center portrait, stands alone */
        .pg-area-port-center { 
          grid-column: 4 / 10; 
          margin-bottom: 120px;
        }

        /* 5. Left square */
        .pg-area-sq-left {
          grid-column: 2 / 7;
        }

        /* 6. Right portrait, offsetting the square */
        .pg-area-port-right {
          grid-column: 8 / 12;
          margin-top: -100px;
        }

        /* ── The Photo Block ── */
        .pg-photo-block {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .pg-image-frame {
          position: relative;
          background: #111;
          transition: filter 0.4s ease;
        }
        
        .pg-image-frame:hover {
          filter: brightness(1.1);
        }

        .pg-image {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
        }

        .pg-area-spread .pg-image { aspect-ratio: 16/9; }
        .pg-area-port-left .pg-image, 
        .pg-area-port-center .pg-image, 
        .pg-area-port-right .pg-image { aspect-ratio: 4/5; }
        .pg-area-sq-left .pg-image, 
        .pg-area-sq-right .pg-image { aspect-ratio: 1/1; }

        /* ── Detailed EXIF Metadata Typography ── */
        .pg-exif-block {
          padding: 8px 0;
          border-top: 1px solid #222;
        }

        .pg-photo-title {
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          color: #fff;
          margin-bottom: 16px;
        }

        .pg-exif-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .pg-exif-list li {
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          font-weight: 300;
          color: #999;
          display: flex;
          justify-content: space-between;
          padding: 4px 0;
          border-bottom: 1px solid #1a1a1a;
        }
        .pg-exif-list li:last-child {
          border-bottom: none;
        }

        .pg-exif-list li span {
          color: #555;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          width: 40%;
        }

        /* ── Responsive Decoupling ── */
        @media (max-width: 1024px) {
          .pg-editorial-section { padding: 80px 0 100px; }
          .pg-magazine-header { margin-bottom: 60px; }
          .pg-magazine-lead { padding: 0 20px; font-size: 0.85rem; }
          
          .pg-editorial-grid {
            display: flex;
            flex-direction: column;
            gap: 80px;
          }
          .pg-photo-block {
            margin: 0 !important;
            width: 100%;
          }
          .pg-exif-block {
            padding: 8px 20px;
          }
        }
      `}</style>
    </section>
  )
}
