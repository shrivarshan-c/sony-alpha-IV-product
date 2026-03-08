import HeroSequence from '@/components/hero/HeroSequence'
import Ticker from '@/components/features/Ticker'
import FeaturesSection from '@/components/features/FeaturesSection'
import LensShowcase from '@/components/lens/LensShowcase'
import LensBentoGrid from '@/components/lens/LensBentoGrid'
import OtherLenses from '@/components/lens/OtherLenses'
import SpecsSection from '@/components/specs/SpecsSection'
import PhotoGallery from '@/components/gallery/PhotoGallery'
import Footer from '@/components/footer/Footer'

export default function Home() {
  return (
    <main className="bg-sony-black flex min-h-screen flex-col">
      <HeroSequence />
      <Ticker />
      <FeaturesSection />
      <LensShowcase />
      <LensBentoGrid />
      <OtherLenses />
      <SpecsSection />
      <PhotoGallery />
      <Footer />
    </main>
  )
}

