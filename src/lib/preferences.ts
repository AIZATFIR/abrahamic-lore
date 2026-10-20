import type { Tradition, UserPreferences } from '@/types'

const STORAGE_KEY = 'al_preferences'

const defaults: UserPreferences = {
  tradition: null,
  onboardingCompleted: false,
  learningInterests: [],
}

export function getPreferences(): UserPreferences {
  if (typeof window === 'undefined') return defaults
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? { ...defaults, ...JSON.parse(raw) } : defaults
  } catch {
    return defaults
  }
}

export function setPreferences(prefs: Partial<UserPreferences>): void {
  if (typeof window === 'undefined') return
  const current = getPreferences()
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, ...prefs }))
}

export function setTradition(tradition: Tradition | null): void {
  setPreferences({ tradition })
}

export function completeOnboarding(tradition: Tradition | null): void {
  setPreferences({ tradition, onboardingCompleted: true })
}

export function clearPreferences(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}
