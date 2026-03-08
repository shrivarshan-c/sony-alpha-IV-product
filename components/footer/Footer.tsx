"use client"
import { useState, useRef } from "react"

const BOKEH_SRC = "/other-lens/sony-fe-24-70mm-f2-8-gm-ii-lens-1.jpg" // Using an existing lens image for a subtle bokeh blur

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribed(true)
  }

  const triggerShutter = () => {
    // Basic base64 shutter sound
    if (!audioRef.current) {
      const audio = new Audio("data:audio/mp3;base64,//OExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//OExAAAAANIAAAAAExBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq")
      audio.volume = 0.5
      audioRef.current = audio
    }
    
    // Play sound
    audioRef.current.currentTime = 0
    audioRef.current.play().catch(() => {})

    // Flash animation
    const flash = document.createElement("div")
    flash.style.position = "fixed"
    flash.style.inset = "0"
    flash.style.backgroundColor = "white"
    flash.style.zIndex = "9999"
    flash.style.pointerEvents = "none"
    flash.style.transition = "opacity 0.4s ease-out"
    flash.style.opacity = "1"
    
    document.body.appendChild(flash)
    
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        flash.style.opacity = "0"
        setTimeout(() => flash.remove(), 400)
      })
    })
  }

  return (
    <footer className="pg-cinematic-footer">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,400&display=swap');
      `}} />

      {/* Decorative Sprocket Holes Top Border */}
      <div className="pg-sprocket-border" />

      {/* Subtle Background Textures */}
      <div className="pg-footer-bg">
        <div className="pg-footer-bokeh" style={{ backgroundImage: `url(${BOKEH_SRC})` }} />
        <div className="pg-footer-noise" />
      </div>

      <div className="pg-footer-content-wrapper">
        
        {/* HERO MOMENT */}
        <div className="pg-footer-hero">
          <h2 className="pg-hero-tagline">THE CAMERA THAT CHANGED EVERYTHING</h2>
          <div className="pg-hero-gold-rule" />
          {/* Giant Interactive Watermark */}
          <h1 
            className="pg-hero-watermark" 
            onClick={triggerShutter}
            title="Click for a photo"
          >
            α7
          </h1>
        </div>

        {/* 4 COLUMN GRID */}
        <div className="pg-footer-grid">
          
          {/* Column 1: Brand & Socials */}
          <div className="pg-col pg-col-brand">
            <div className="pg-brand-header">
              <svg className="pg-sony-alpha-logo" viewBox="0 0 100 100" fill="currentColor">
                <path d="M48.2,74.5c-15.6,0-25.2-10.2-25.2-24.5c0-14,9-24.2,23.5-24.2c9.5,0,16.2,5,19.2,12.8h10.8 c-3.8-13.8-15.2-21.5-29.8-21.5C27,17.2,12.5,31.5,12.5,50s14.2,33.2,34.5,33.2c15.2,0,27.2-7.8,31.2-22h-10.8 C64.2,69,57.8,74.5,48.2,74.5z M82.8,24.8v57.5h10V24.8H82.8z"/>
              </svg>
              <span className="pg-tagline">See the unseen.</span>
            </div>
            
            <div className="pg-social-links">
              {/* Instagram */}
              <a href="https://www.instagram.com/sonyalpha" target="_blank" rel="noopener noreferrer" className="pg-social-icon" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              {/* YouTube */}
              <a href="https://www.youtube.com/@sony" target="_blank" rel="noopener noreferrer" className="pg-social-icon" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
              {/* Twitter/X */}
              <a href="https://x.com/sonyalpha" target="_blank" rel="noopener noreferrer" className="pg-social-icon" aria-label="X">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4l11.73 16h5L9 4H4z"></path>
                  <path d="M4 20l6.76-6.76"></path>
                  <path d="M20 4l-6.76 6.76"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div className="pg-col pg-col-nav">
            <h4 className="pg-nav-title">EXPLORE</h4>
            <ul className="pg-nav-list">
              <li><a href="#" className="pg-nav-link">Hero</a></li>
              <li><a href="#" className="pg-nav-link">Lenses</a></li>
              <li><a href="#" className="pg-nav-link">Gallery</a></li>
              <li><a href="#" className="pg-nav-link">Kit Builder</a></li>
              <li><a href="#" className="pg-nav-link">Specs</a></li>
            </ul>
          </div>

          {/* Column 3: Ecosystem */}
          <div className="pg-col pg-col-nav">
            <h4 className="pg-nav-title">ECOSYSTEM</h4>
            <ul className="pg-nav-list">
              <li><a href="#" className="pg-nav-link">E-Mount Lenses</a></li>
              <li><a href="#" className="pg-nav-link">Accessories</a></li>
              <li><a href="#" className="pg-nav-link">Software</a></li>
              <li><a href="#" className="pg-nav-link">Support</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="pg-col pg-col-newsletter">
            <h4 className="pg-nav-title">STAY IN FRAME</h4>
            <p className="pg-newsletter-desc">Subscribe for the latest α series updates and professional tips.</p>
            <form className="pg-newsletter-form" onSubmit={handleSubscribe}>
              <input 
                type="email" 
                className="pg-newsletter-input" 
                placeholder="Enter your email" 
                required 
                disabled={subscribed}
              />
              <button 
                type="submit" 
                className={`pg-newsletter-btn ${subscribed ? 'pg-subscribed' : ''}`}
                disabled={subscribed}
              >
                {subscribed ? "YOU'RE IN FRAME ✓" : "SUBSCRIBE"}
              </button>
            </form>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pg-footer-bottom">
          <div className="pg-bottom-left">
            <span>© 2026 Sony Electronics. All rights reserved.</span>
          </div>
          <div className="pg-bottom-center">
            <span className="pg-made-with">MADE WITH  ♡  and some ☕️</span>
          </div>
          <div className="pg-bottom-right">
            <a href="#">Privacy</a>
            <span className="pg-dot">·</span>
            <a href="#">Terms</a>
            <span className="pg-dot">·</span>
            <a href="#">Cookies</a>
          </div>
        </div>

      </div>

      <style>{`
        /* ══════════════════════════════════════
           CINEMATIC FOOTER CSS
        ══════════════════════════════════════ */
        
        .pg-cinematic-footer {
          position: relative;
          background-color: #060606;
          color: #f0ece4;
          padding-top: 24px;
          overflow: hidden;
          border-top: 1px solid rgba(196, 169, 109, 0.4); /* Thin gold top border */
          font-family: 'DM Mono', monospace;
        }

        /* ── Film Sprockets ── */
        .pg-sprocket-border {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 16px;
          background-image: radial-gradient(circle, transparent 4px, #060606 5px);
          background-size: 24px 16px;
          background-position: 0 0;
          z-index: 10;
          opacity: 0.15;
          pointer-events: none;
        }
        /* Create the white film edge illusion behind the holes */
        .pg-sprocket-border::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100%;
          background: rgba(255,255,255,0.03);
          z-index: -1;
        }

        /* ── Background Elements ── */
        .pg-footer-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .pg-footer-bokeh {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          filter: blur(40px) saturate(0.5);
          opacity: 0.06; /* Extremely faint */
        }
        .pg-footer-noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E");
          mix-blend-mode: overlay;
        }

        .pg-footer-content-wrapper {
          position: relative;
          z-index: 10;
          max-width: 1400px;
          margin: 0 auto;
          padding: 60px 20px 40px;
        }

        @media (min-width: 768px) {
          .pg-footer-content-wrapper {
            padding: 80px 40px 40px;
          }
        }

        /* ── Hero Moment ── */
        .pg-footer-hero {
          position: relative;
          text-align: center;
          margin-bottom: 120px;
          padding-top: 40px;
        }
        
        .pg-hero-tagline {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2rem, 4vw, 3rem);
          letter-spacing: 0.1em;
          color: #ffffff;
          margin: 0;
          position: relative;
          z-index: 2;
        }
        
        .pg-hero-gold-rule {
          width: 80px;
          height: 2px;
          background-color: #c4a96d; /* Sony Gold */
          margin: 24px auto 0;
          position: relative;
          z-index: 2;
        }

        .pg-hero-watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-family: 'Bebas Neue', sans-serif;
          font-size: 40vw; /* Larger on mobile for IMPACT */
          line-height: 0.8;
          color: #ffffff;
          opacity: 0.04;
          margin: 0;
          white-space: nowrap;
          cursor: pointer; /* Easter egg target */
          z-index: 1;
          pointer-events: auto;
          user-select: none;
          transition: opacity 0.3s ease;
        }
        .pg-hero-watermark:hover {
          opacity: 0.08; /* Subtle hint that it's interactive */
        }

        /* ── Main Grid ── */
        .pg-footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
          gap: 60px;
          margin-bottom: 100px;
          position: relative;
          z-index: 2; /* Sit above the giant watermark */
          pointer-events: none; /* Let clicks pass through empty space to watermark */
        }
        
        .pg-col {
          pointer-events: auto; /* Re-enable for the actual columns */
        }

        /* ── Column 1: Brand ── */
        .pg-brand-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 32px;
        }
        .pg-sony-alpha-logo {
          width: 32px;
          height: 32px;
          color: #f0ece4;
        }
        .pg-tagline {
          font-family: 'Inter', sans-serif;
          font-weight: 300;
          font-size: 0.85rem;
          color: #a0a0a0;
          letter-spacing: 0.05em;
        }
        
        .pg-social-links {
          display: flex;
          gap: 20px;
        }
        .pg-social-icon {
          color: #888;
          width: 24px;
          height: 24px;
          transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        /* CSS Antigravity & Gold Hover */
        .pg-social-icon:hover {
          color: #c4a96d;
          transform: translateY(-4px);
        }

        /* ── Nav Columns ── */
        .pg-nav-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.5rem;
          letter-spacing: 0.1em;
          color: #fff;
          margin-bottom: 24px;
        }
        .pg-nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        /* Sliding Gold Underline Hover */
        .pg-nav-link {
          color: #a0a0a0;
          text-decoration: none;
          font-size: 0.85rem;
          position: relative;
          transition: color 0.3s ease;
          display: inline-block;
        }
        .pg-nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: #c4a96d;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .pg-nav-link:hover {
          color: #f0ece4;
        }
        .pg-nav-link:hover::after {
          transform: scaleX(1);
        }

        /* ── Newsletter ── */
        .pg-newsletter-desc {
          font-size: 0.8rem;
          color: #888;
          line-height: 1.6;
          margin-bottom: 24px;
        }
        .pg-newsletter-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .pg-newsletter-input {
          background: transparent;
          border: none;
          border-bottom: 1px solid #3a3a3a;
          color: #f0ece4;
          font-family: 'DM Mono', monospace;
          font-size: 0.85rem;
          padding: 12px 0;
          transition: border-color 0.3s ease;
          outline: none;
        }
        .pg-newsletter-input:focus {
          border-bottom-color: #c4a96d;
        }
        .pg-newsletter-input::placeholder {
          color: #555;
        }
        
        .pg-newsletter-btn {
          background: transparent;
          border: 1px solid #3a3a3a;
          color: #f0ece4;
          font-family: 'DM Mono', monospace;
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          padding: 14px 24px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
        }
        .pg-newsletter-btn:hover:not(:disabled) {
          border-color: #c4a96d;
          color: #c4a96d;
        }
        .pg-newsletter-btn.pg-subscribed {
          border-color: #c4a96d;
          color: #060606;
          background-color: #c4a96d; /* Filled gold when subscribed */
          cursor: default;
        }

        /* ── Bottom Bar ── */
        .pg-footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 32px;
          border-top: 1px solid #1a1a1a;
          font-size: 0.75rem;
          color: #666;
          position: relative;
          z-index: 2;
        }
        
        .pg-made-with {
          color: #c4a96d;
          letter-spacing: 0.1em;
        }

        .pg-bottom-right {
          display: flex;
          gap: 12px;
        }
        .pg-bottom-right a {
          color: #666;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .pg-bottom-right a:hover {
          color: #f0ece4;
        }
        .pg-dot {
          color: #333;
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .pg-footer-hero { margin-bottom: 80px; }
          .pg-footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 48px;
          }
          .pg-hero-watermark {
            font-size: 35vw; 
          }
        }
        @media (max-width: 768px) {
          .pg-footer-hero { margin-bottom: 60px; }
          .pg-hero-tagline { font-size: 1.5rem; }
          .pg-hero-watermark { font-size: 50vw; top: 60%; }
          .pg-footer-grid {
            grid-template-columns: 1fr;
            gap: 40px;
            text-align: center;
          }
          .pg-brand-header { flex-direction: column; gap: 8px; margin-bottom: 24px; }
          .pg-social-links { justify-content: center; }
          .pg-footer-bottom {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }
          .pg-bottom-right { justify-content: center; }
        }
      `}</style>
    </footer>
  )
}
