'use client'

import { useState } from 'react'
import type { Tradition } from '@/types'
import { completeOnboarding } from '@/lib/preferences'

interface OnboardingProps {
  onComplete: (tradition: Tradition | null) => void
}

const MAIN_OPTIONS: { value: Tradition; label: string; description: string }[] = [
  {
    value: 'islam',
    label: 'Islam',
    description: 'Explore the Quran, Islamic history, theology, prophets, and traditions.',
  },
  {
    value: 'christianity',
    label: 'Christianity',
    description: 'Explore the Bible, Christian history, theology, denominations, and traditions.',
  },
  {
    value: 'judaism',
    label: 'Judaism',
    description: 'Explore Jewish scripture, traditions, history, theology, and interpretations.',
  },
]

const ADDITIONAL_OPTIONS: { value: Tradition; label: string }[] = [
  { value: 'other', label: 'Other Abrahamic tradition' },
  { value: 'multiple', label: 'Exploring multiple traditions' },
  { value: 'educational', label: 'Exploring religion for educational purposes' },
  { value: 'undisclosed', label: 'Prefer not to say' },
]

export default function OnboardingModal({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState<'welcome' | 'select'>('welcome')
  const [selected, setSelected] = useState<Tradition | null>(null)

  function handleContinue() {
    completeOnboarding(selected)
    onComplete(selected)
  }

  if (step === 'welcome') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/40 p-4 backdrop-blur-sm">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">Welcome</p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-stone-900 leading-snug">
            Explore the traditions, stories, and knowledge of the Abrahamic world.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-stone-500">
            A shared space to learn about Judaism, Christianity, Islam, and other traditions connected to the Abrahamic world.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={() => setStep('select')}
              className="w-full rounded-xl bg-stone-900 py-3 text-sm font-medium text-white hover:bg-stone-700 transition-colors"
            >
              Get Started
            </button>
            <button
              onClick={() => handleContinue()}
              className="w-full rounded-xl bg-stone-100 py-3 text-sm text-stone-600 hover:bg-stone-200 transition-colors"
            >
              Explore Without an Account
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl">
        <button
          onClick={() => setStep('welcome')}
          className="mb-4 text-xs text-stone-400 hover:text-stone-600 transition-colors"
          aria-label="Go back"
        >
          ← Back
        </button>

        <h2 className="text-xl font-semibold tracking-tight text-stone-900">
          Which tradition would you like to explore from?
        </h2>
        <p className="mt-2 text-sm text-stone-500">
          This helps us personalize your homepage. You can change your selection anytime.
        </p>

        {/* Main 3 traditions */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {MAIN_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSelected(opt.value)}
              className={[
                'rounded-xl border p-4 text-left transition-all',
                selected === opt.value
                  ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                  : 'border-stone-200 hover:border-stone-400',
              ].join(' ')}
            >
              <p className="text-sm font-semibold text-stone-900">{opt.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-stone-500">{opt.description}</p>
            </button>
          ))}
        </div>

        {/* Additional options */}
        <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {ADDITIONAL_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSelected(opt.value)}
              className={[
                'rounded-xl border px-4 py-3 text-left text-sm transition-all',
                selected === opt.value
                  ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900 text-stone-900'
                  : 'border-stone-200 text-stone-500 hover:border-stone-400',
              ].join(' ')}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleContinue}
            className="flex-1 rounded-xl bg-stone-900 py-3 text-sm font-medium text-white hover:bg-stone-700 transition-colors"
          >
            Continue
          </button>
          {selected && (
            <button
              onClick={() => { setSelected(null); handleContinue() }}
              className="text-sm text-stone-400 hover:text-stone-600 transition-colors px-2"
            >
              Skip
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
