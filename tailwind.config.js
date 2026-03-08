import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'sony-red': '#e8001d',
        'sony-black': '#060606',
        'sony-gold': '#c8a055',
        'sony-white': '#f5f0eb',
        'sony-grey': '#888888',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        rajdhani: ['var(--font-rajdhani)', 'sans-serif'],
        crimson: ['var(--font-crimson)', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config
