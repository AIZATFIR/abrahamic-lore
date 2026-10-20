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
    setPrefs(getPreferences())
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
