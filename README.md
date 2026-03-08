# Sony α7 IV — The Cinematic Experience

A premium, high-performance product landing page dedicated to the Sony α7 IV. This experience is designed to mirror the technical precision and artistic soul of the Alpha series, blending high-end editorial aesthetics with cutting-edge web performance.

---

## 📽️ Key Cinematic Moments

### **1. Infinite Hero Sequence**
A 500vh immersive canvas-based frame sequence. As you scroll, the α7 IV is revealed in microscopic detail through a high-fps image sequence, perfectly synchronized with **GSAP** and **Lenis** for buttery-smooth interaction.

### **2. G Master Lens Showcase**
An interactive horizontal and bento-style reveal of Sony's legendary glass. Features include:
- **Horizontal Scroll Depth**: Watch the 24-70mm f/2.8 GM II extend and breathe as you navigate.
- **Antigravity Bento Grid**: A floating, interactive grid highlighting the "Trinity" lenses with parallax zoom effects.

### **3. "Field Notes" Editorial Gallery**
A sophisticated, asymmetrical magazine-style spread inspired by high-end print journalism. Features high-quality portraits with detailed EXIF metadata credits, emphasizing the camera's real-world capability.

### **4. Technical Precision**
- **Specs Section**: A clean, data-heavy grid breakdown of sensor, video, AF, and design benchmarks.
- **Cinematic Footer**: Features a "Shutter Easter Egg"—click the giant watermark to trigger a real α7 shutter sound and screen flash.

---

## 🛠️ Technical Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Engine**: [React 19](https://react.dev/)
- **Animations**: [GSAP](https://greensock.com/gsap/) (ScrollTrigger, Flip)
- **Smooth Scroll**: [Lenis](https://lenis.darkroom.engineering/)
- **Styling**: [Tailwind CSS 3.4+](https://tailwindcss.com/)
- **Typography**: [Google Fonts](https://fonts.google.com/) (Bebas Neue, DM Mono, Playfair Display)

---

## ⚡ Performance Engineered

The project is optimized for a permanent **60fps** experience:
- **GSAP Ticker Sync**: Lenis and GSAP share a single rendering pass to eliminate desync lag.
- **GPU Acceleration**: Heavy transforms use `will-change: transform` to offload painting to the hardware.
- **Frame Guards**: Intelligent redraw logic ensures the canvas only paints when a new frame index is reached.
- **Scroll Restoration**: Forced scroll-to-top on reload ensures the cinematic story always starts from the beginning.

---

## 📱 Fully Responsive

The site adapts elegantly across three primary breakpoints:
- **Mobile (375px+)**: Editorial layouts collapse into high-impact vertical flows.
- **Tablet (768px+)**: Grids balanced for touch-first navigation.
- **Desktop (1200px+)**: The full widescreen cinematic experience.

---

## 🚀 Getting Started

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the development server**:
   ```bash
   npm run dev
   ```
4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🎨 Design Philosophy
The visual language is "Sony × Editorial". It utilizes a **Sony Black (#060606)** base with **Sony Red (#E8001D)** and **Gold (#C4A96D)** accents, accented by subtle grain textures and high-fashion typography.

© 2026 Sony α Series Fan Project.
