'use client'

import { useState, useEffect } from 'react'
import type { Tradition } from '@/types'
import { usePreferences } from '@/hooks/usePreferences'
import { useUser } from '@/hooks/useUser'
import { createClient } from '@/lib/supabase/client'
import { updateTradition } from '@/lib/actions'
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
  const { user, loading: userLoading } = useUser()
  const [showOnboarding, setShowOnboarding] = useState(false)

  // When user logs in, load their saved profile preference
  useEffect(() => {
    if (!user || !ready) return
    const supabase = createClient()
    supabase
      .from('profiles')
      .select('religion_preference, onboarding_completed')
      .eq('id', user.id)
      .single()
      .then(({ data }) => {
        if (!data) return
        if (data.religion_preference) {
          update({
            tradition: data.religion_preference as Tradition,
            onboardingCompleted: data.onboarding_completed,
          })
        }
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id])

  const shouldOnboard = false // Disable intrusive full-page blocking modal on SSR/first load

  async function handleOnboardingComplete(tradition: Tradition | null) {
    update({ tradition, onboardingCompleted: true })
    setShowOnboarding(false)
    // Persist to DB if logged in
    if (user) await updateTradition(tradition)
  }

  if (!ready || userLoading) {
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
          <Hero tradition={prefs.tradition} onChangeTradition={() => setShowOnboarding(true)} />
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
