'use client'

import { useState, useEffect } from 'react'
import type { UserPreferences } from '@/types'
import { getPreferences, setPreferences } from '@/lib/preferences'

export function usePreferences() {
  const [prefs, setPrefs] = useState<UserPreferences>({
    tradition: null,
    onboardingCompleted: false,
    learningInterests: [],
  })
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const p = getPreferences()
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPrefs(p)
    setReady(true)
  }, [])

  function update(next: Partial<UserPreferences>) {
    setPrefs((p) => {
      const merged = { ...p, ...next }
      setPreferences(merged)
      return merged
    })
  }

  return { prefs, update, ready }
}
