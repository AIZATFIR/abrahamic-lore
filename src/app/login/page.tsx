'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { login } from '@/lib/actions'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setError(null)
    startTransition(async () => {
      const result = await login(formData)
      if (result?.error) setError(result.error)
    })
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar tradition={null} />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-semibold tracking-tight text-stone-900">Sign in</h1>
          <p className="mt-2 text-sm text-stone-500">
            Save your preferences and learning history across devices.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-stone-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1.5 w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm text-stone-900 outline-none focus:border-stone-400 focus:ring-1 focus:ring-stone-300 transition"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xs font-medium text-stone-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                minLength={8}
                className="mt-1.5 w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm text-stone-900 outline-none focus:border-stone-400 focus:ring-1 focus:ring-stone-300 transition"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-2.5 text-xs text-red-600" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-xl bg-stone-900 py-3 text-sm font-medium text-white hover:bg-stone-700 transition-colors disabled:opacity-60"
            >
              {pending ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-stone-500">
            Don't have an account?{' '}
            <Link href="/register" className="text-stone-900 underline underline-offset-2 hover:text-stone-600">
              Create one
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
