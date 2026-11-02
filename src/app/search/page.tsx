'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { usePreferences } from '@/hooks/usePreferences'
import { TOPIC_CARDS, FEATURED_COMPARISONS } from '@/lib/content'

const ALL_RESULTS = [
  ...TOPIC_CARDS.map((c) => ({ ...c, type: 'topic' as const })),
  ...FEATURED_COMPARISONS.map((c) => ({ ...c, type: 'compare' as const, icon: '🔗', category: 'Comparative' })),
]

export default function SearchPage() {
  const { prefs } = usePreferences()
  const [query, setQuery] = useState('')

  const results = query.trim()
    ? ALL_RESULTS.filter(
        (r) =>
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.description.toLowerCase().includes(query.toLowerCase()),
      )
    : []

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar tradition={prefs.tradition} />
      <main className="flex-1">
        {/* Search header */}
        <div className="border-b border-stone-100 bg-stone-50 py-12">
          <div className="mx-auto max-w-2xl px-4 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">Search</p>
            <div className="mt-3 relative">
              <input
                autoFocus
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search scriptures, people, history, concepts…"
                className="w-full rounded-2xl border border-stone-200 bg-white px-5 py-4 pr-12 text-sm text-stone-900 shadow-sm outline-none ring-0 transition placeholder:text-stone-400 focus:border-stone-400 focus:ring-1 focus:ring-stone-300"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-stone-300">
                ⌘K
              </span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
          {query && results.length === 0 && (
            <p className="text-sm text-stone-500">
              No results for <strong>&ldquo;{query}&rdquo;</strong>. Try a different term.
            </p>
          )}

          {results.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs text-stone-400">{results.length} result{results.length !== 1 ? 's' : ''}</p>
              {results.map((r) => (
                <Link
                  key={r.id}
                  href={r.type === 'topic' ? `/topics/${r.slug}` : `/compare/${r.slug}`}
                  className="group flex items-start gap-4 rounded-2xl border border-stone-200 bg-white p-5 hover:border-stone-400 hover:shadow-sm transition-all"
                >
                  <span className="text-2xl">{r.icon}</span>
                  <div>
                    <p className="text-xs text-stone-400">{r.category}</p>
                    <h2 className="text-sm font-semibold text-stone-900 group-hover:text-stone-700">
                      {r.title}
                    </h2>
                    <p className="mt-1 text-xs leading-relaxed text-stone-500">{r.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!query && (
            <div>
              <p className="mb-5 text-sm text-stone-500">Try searching for a person, text, or concept.</p>
              <div className="flex flex-wrap gap-2">
                {['Abraham', 'Quran', 'Moses', 'Torah', 'Covenant', 'Prophets'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="rounded-full border border-stone-200 px-3 py-1.5 text-xs text-stone-600 hover:border-stone-400 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
