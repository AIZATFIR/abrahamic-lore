'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { register } from '@/lib/actions'
import { getPreferences } from '@/lib/preferences'

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null)
  const [transferPrefs, setTransferPrefs] = useState(true)
  const [pending, startTransition] = useTransition()

  const guestPrefs = typeof window !== 'undefined' ? getPreferences() : null

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setError(null)
    startTransition(async () => {
      const result = await register(
        formData,
        transferPrefs && guestPrefs?.tradition ? guestPrefs.tradition : null,
      )
      if (result?.error) setError(result.error)
    })
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar tradition={null} />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-semibold tracking-tight text-stone-900">Create account</h1>
          <p className="mt-2 text-sm text-stone-500">
            Your preferences and history will be saved across devices.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-stone-700">Email</label>
              <input
                id="email" name="email" type="email" autoComplete="email" required
                className="mt-1.5 w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm outline-none focus:border-stone-400 focus:ring-1 focus:ring-stone-300 transition"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xs font-medium text-stone-700">Password</label>
              <input
                id="password" name="password" type="password" autoComplete="new-password" required minLength={8}
                className="mt-1.5 w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm outline-none focus:border-stone-400 focus:ring-1 focus:ring-stone-300 transition"
                placeholder="At least 8 characters"
              />
            </div>

            {/* Guest preference transfer offer */}
            {guestPrefs?.tradition && (
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-stone-200 p-4">
                <input
                  type="checkbox"
                  checked={transferPrefs}
                  onChange={(e) => setTransferPrefs(e.target.checked)}
                  className="mt-0.5 accent-stone-900"
                />
                <span className="text-xs text-stone-600 leading-relaxed">
                  Save my current preference (<strong>{guestPrefs.tradition}</strong>) to this account
                </span>
              </label>
            )}

            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-2.5 text-xs text-red-600" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit" disabled={pending}
              className="w-full rounded-xl bg-stone-900 py-3 text-sm font-medium text-white hover:bg-stone-700 transition-colors disabled:opacity-60"
            >
              {pending ? 'Creating account…' : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-stone-500">
            Already have an account?{' '}
            <Link href="/login" className="text-stone-900 underline underline-offset-2 hover:text-stone-600">
              Sign in
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
