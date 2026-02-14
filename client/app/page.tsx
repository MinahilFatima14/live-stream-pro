import HeroSection from '@/src/components/landing/HeroSection'
import HowItWorks from '@/src/components/landing/HowItWorks'
import CoreFeatures from '@/src/components/landing/CoreFeatures'
import UseCases from '@/src/components/landing/UseCases'
import FinalCTA from '@/src/components/landing/FinalCTA'

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <HowItWorks />
        <CoreFeatures />
        <UseCases />
        <FinalCTA />
      </main>
    </>
  )
}
