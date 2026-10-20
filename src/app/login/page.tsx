import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

// ponytail: placeholder page — full login/register flow comes in Phase 2 (Supabase Auth)
export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar tradition={null} />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-semibold tracking-tight text-stone-900">Sign in</h1>
          <p className="mt-2 text-sm text-stone-500">
            Save your preferences and learning history across devices.
          </p>

          <form className="mt-8 space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-stone-700">
                Email
              </label>
              <input
                id="email"
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
                type="password"
                autoComplete="current-password"
                required
                className="mt-1.5 w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm text-stone-900 outline-none focus:border-stone-400 focus:ring-1 focus:ring-stone-300 transition"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-stone-900 py-3 text-sm font-medium text-white hover:bg-stone-700 transition-colors"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-stone-500">
            Don't have an account?{' '}
            <Link href="/register" className="text-stone-900 underline underline-offset-2 hover:text-stone-600">
              Create one
            </Link>
          </p>
          <p className="mt-3 text-center text-xs text-stone-400">
            Authentication powered by Supabase — coming in Phase 2.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
