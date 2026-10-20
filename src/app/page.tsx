'use client'

import { useState } from 'react'
import type { Tradition } from '@/types'
import { usePreferences } from '@/hooks/usePreferences'
import OnboardingModal from '@/components/onboarding/OnboardingModal'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/home/Hero'
import FeaturedTopics from '@/components/home/FeaturedTopics'
import ExploreAcrossTraditions from '@/components/home/ExploreAcrossTraditions'
import RecommendedForYou from '@/components/home/RecommendedForYou'
import ContinueLearning from '@/components/home/ContinueLearning'

export default function HomePage() {
  const { prefs, update, ready } = usePreferences()
  const [showOnboarding, setShowOnboarding] = useState(false)

  // Show onboarding on first visit once client is ready
  // We use a derived flag so it only fires once the prefs are loaded from localStorage
  const shouldOnboard = ready && !prefs.onboardingCompleted

  function handleOnboardingComplete(tradition: Tradition | null) {
    update({ tradition, onboardingCompleted: true })
    setShowOnboarding(false)
  }

  if (!ready) {
    // Skeleton — prevents layout shift while reading localStorage
    return (
      <div className="min-h-screen bg-white">
        <div className="h-14 border-b border-stone-200 bg-white/80" />
        <div className="py-28 text-center">
          <div className="mx-auto h-8 w-64 rounded-lg bg-stone-100 animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <>
      {(shouldOnboard || showOnboarding) && (
        <OnboardingModal onComplete={handleOnboardingComplete} />
      )}

      <div className="flex min-h-screen flex-col bg-white">
        <Navbar
          tradition={prefs.tradition}
          onChangeTradition={() => setShowOnboarding(true)}
        />
        <main className="flex-1">
          <Hero
            tradition={prefs.tradition}
            onChangeTradition={() => setShowOnboarding(true)}
          />
          <RecommendedForYou tradition={prefs.tradition} />
          <FeaturedTopics />
          <ContinueLearning />
          <ExploreAcrossTraditions />
        </main>
        <Footer />
      </div>
    </>
  )
}
