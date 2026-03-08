import './globals.css'
import type { Metadata } from 'next'
import { Playfair_Display, Rajdhani, Crimson_Pro, Bebas_Neue, DM_Mono } from 'next/font/google'
import CustomCursor from '@/components/global/CustomCursor'
import ScrollProgress from '@/components/global/ScrollProgress'
import Navigation from '@/components/global/Navigation'
import ClientLenis from './ClientLenis'

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['700', '900'], style: ['normal', 'italic'], variable: '--font-playfair' })
const rajdhani = Rajdhani({ subsets: ['latin'], weight: ['600', '700'], variable: '--font-rajdhani' })
const crimson = Crimson_Pro({ subsets: ['latin'], weight: ['300'], style: ['italic'], variable: '--font-crimson' })
const bebas = Bebas_Neue({ subsets: ['latin'], weight: ['400'], variable: '--font-bebas' })
const dmmono = DM_Mono({ subsets: ['latin'], weight: ['400', '500'], style: ['normal', 'italic'], variable: '--font-dmmono' })

export const metadata: Metadata = {
  title: 'Sony α7 IV | See Beyond Everything',
  description: 'The new benchmark for hybrid creators.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${rajdhani.variable} ${crimson.variable} ${bebas.variable} ${dmmono.variable} antialiased bg-sony-black`}>
      <body className="font-sans text-sony-white overflow-x-hidden">
        <ClientLenis>
          <CustomCursor />
          <ScrollProgress />
          <Navigation />
          {children}
        </ClientLenis>
      </body>
    </html>
  )
}
