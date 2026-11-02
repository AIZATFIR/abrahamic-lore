'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { ComparisonEntity } from '@/data/abrahamic_entities'

interface CompareInteractiveViewProps {
  entity: ComparisonEntity
  allComparisons: { slug: string; title: string; category: string }[]
}

type TraditionKey = 'judaism' | 'christianity' | 'islam'

const TRADITION_CONFIG: Record<
  TraditionKey,
  {
    name: string
    badgeBg: string
    badgeText: string
    activeBorder: string
    icon: string
    accentColor: string
  }
> = {
  judaism: {
    name: 'Judaism',
    badgeBg: 'bg-blue-50',
    badgeText: 'text-blue-700',
    activeBorder: 'border-blue-500',
    icon: '✡️',
    accentColor: 'text-blue-800',
  },
  christianity: {
    name: 'Christianity',
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-800',
    activeBorder: 'border-amber-500',
    icon: '✝️',
    accentColor: 'text-amber-900',
  },
  islam: {
    name: 'Islam',
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-700',
    activeBorder: 'border-emerald-500',
    icon: '☪️',
    accentColor: 'text-emerald-800',
  },
}

export default function CompareInteractiveView({
  entity,
  allComparisons,
}: CompareInteractiveViewProps) {
  const [activeTab, setActiveTab] = useState<'matrix' | 'deep-dive' | 'divergence'>('matrix')
  const [selectedTraditions, setSelectedTraditions] = useState<TraditionKey[]>([
    'judaism',
    'christianity',
    'islam',
  ])
  const [filterQuery, setFilterQuery] = useState('')

  const toggleTradition = (key: TraditionKey) => {
    if (selectedTraditions.includes(key)) {
      if (selectedTraditions.length > 1) {
        setSelectedTraditions(selectedTraditions.filter((t) => t !== key))
      }
    } else {
      setSelectedTraditions([...selectedTraditions, key])
    }
  }

  const highlightMatches = (text: string, query: string) => {
    if (!query.trim()) return text
    const parts = text.split(new RegExp(`(${query.trim()})`, 'gi'))
    return parts.map((part, i) =>
      part.toLowerCase() === query.trim().toLowerCase() ? (
        <mark key={i} className="bg-amber-200 text-stone-900 px-0.5 rounded">
          {part}
        </mark>
      ) : (
        part
      ),
    )
  }

  const traditionsList: TraditionKey[] = ['judaism', 'christianity', 'islam']

  return (
    <div className="space-y-10">
      {/* Controls Bar */}
      <section
        aria-label="Filter and display options"
        className="rounded-2xl border border-stone-200 bg-stone-50/70 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs"
      >
        {/* View switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-200/60 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'matrix'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Side-by-Side Matrix
          </button>
          <button
            onClick={() => setActiveTab('deep-dive')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'deep-dive'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Scripture & Perspectives
          </button>
          <button
            onClick={() => setActiveTab('divergence')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeTab === 'divergence'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Convergence & Divergence
          </button>
        </div>

        {/* Filter and Tradition Toggles */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Highlight keyword..."
              aria-label="Highlight keyword in comparison"
              className="w-44 sm:w-52 rounded-xl border border-stone-200 bg-white px-3 py-1.5 text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400"
            />
            {filterQuery && (
              <button
                onClick={() => setFilterQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-stone-400 mr-1 hidden sm:inline">Traditions:</span>
            {traditionsList.map((t) => {
              const active = selectedTraditions.includes(t)
              const cfg = TRADITION_CONFIG[t]
              return (
                <button
                  key={t}
                  onClick={() => toggleTradition(t)}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${
                    active
                      ? `${cfg.badgeBg} ${cfg.badgeText} border-stone-300`
                      : 'bg-white text-stone-400 border-stone-200 line-through opacity-60'
                  }`}
                  title={active ? `Hide ${cfg.name}` : `Show ${cfg.name}`}
                >
                  <span>{cfg.icon}</span>
                  <span>{cfg.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* MATRIX VIEW */}
      {activeTab === 'matrix' && (
        <div
          className={`grid grid-cols-1 gap-6 ${
            selectedTraditions.length === 1
              ? 'md:grid-cols-1 max-w-2xl mx-auto'
              : selectedTraditions.length === 2
                ? 'md:grid-cols-2'
                : 'md:grid-cols-3'
          }`}
        >
          {traditionsList
            .filter((t) => selectedTraditions.includes(t))
            .map((t) => {
              const data = entity.traditions[t]
              const cfg = TRADITION_CONFIG[t]
              return (
                <article
                  key={t}
                  className="flex flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-xs hover:border-stone-300 transition-all"
                >
                  <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{cfg.icon}</span>
                      <h2 className="text-sm font-semibold tracking-wide text-stone-900">
                        {cfg.name}
                      </h2>
                    </div>
                    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${cfg.badgeBg} ${cfg.badgeText}`}>
                      {t.toUpperCase()}
                    </span>
                  </div>

                  <div className="mt-4 flex-1 space-y-4">
                    <div>
                      <p className="text-xs uppercase font-semibold text-stone-400">Designation</p>
                      <h3 className="mt-0.5 text-base font-semibold text-stone-900">
                        {highlightMatches(data.name, filterQuery)}
                      </h3>
                      {data.titleOrHonorific && (
                        <p className="text-xs text-stone-500 italic mt-0.5">
                          {highlightMatches(data.titleOrHonorific, filterQuery)}
                        </p>
                      )}
                    </div>

                    <div>
                      <p className="text-xs uppercase font-semibold text-stone-400">Core Identity & Role</p>
                      <p className="mt-1 text-sm text-stone-700 leading-relaxed">
                        {highlightMatches(data.role, filterQuery)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase font-semibold text-stone-400">Theological Weight</p>
                      <p className="mt-1 text-xs text-stone-600 leading-relaxed bg-stone-50 p-3 rounded-xl border border-stone-100">
                        {highlightMatches(data.keyTheologicalSignificance, filterQuery)}
                      </p>
                    </div>

                    {data.notableQuoteOrVerse && (
                      <div className="pt-2">
                        <blockquote className="border-l-2 border-stone-300 pl-3 py-1 text-xs italic text-stone-600">
                          “{highlightMatches(data.notableQuoteOrVerse.text, filterQuery)}”
                        </blockquote>
                        <cite className="block text-[11px] text-stone-400 mt-1 not-italic font-medium">
                          — {data.notableQuoteOrVerse.source}
                        </cite>
                      </div>
                    )}
                  </div>
                </article>
              )
            })}
        </div>
      )}

      {/* SCRIPTURE & PERSPECTIVES DEEP DIVE */}
      {activeTab === 'deep-dive' && (
        <div className="space-y-6">
          {traditionsList
            .filter((t) => selectedTraditions.includes(t))
            .map((t) => {
              const data = entity.traditions[t]
              const cfg = TRADITION_CONFIG[t]
              return (
                <section
                  key={t}
                  className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{cfg.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-semibold text-stone-900">{cfg.name} Perspective</h2>
                        <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${cfg.badgeBg} ${cfg.badgeText}`}>
                          {data.name}
                        </span>
                      </div>
                      {data.titleOrHonorific && (
                        <p className="text-xs text-stone-500 mt-0.5">{data.titleOrHonorific}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-4">
                      <div>
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                          Scriptural Narrative & Meaning
                        </h3>
                        <p className="mt-2 text-sm text-stone-700 leading-relaxed whitespace-pre-line">
                          {highlightMatches(data.coreNarrative, filterQuery)}
                        </p>
                      </div>

                      <div className="rounded-xl bg-stone-50 p-4 border border-stone-100">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                          Theological Meaning
                        </h3>
                        <p className="mt-1.5 text-xs text-stone-600 leading-relaxed">
                          {highlightMatches(data.keyTheologicalSignificance, filterQuery)}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-xl border border-stone-200 bg-stone-50/50 p-4">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                          Key Scripture References
                        </h3>
                        <ul className="mt-2.5 space-y-1.5 text-xs text-stone-600">
                          {data.scriptureReferences.map((ref, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <span className="text-stone-400">•</span>
                              <span>{highlightMatches(ref, filterQuery)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {data.notableQuoteOrVerse && (
                        <div className="rounded-xl bg-stone-900 text-stone-100 p-4 shadow-sm">
                          <p className="text-[11px] uppercase tracking-widest text-stone-400 font-medium">
                            Highlighted Passage
                          </p>
                          <blockquote className="mt-2 text-xs italic text-stone-200 leading-relaxed">
                            “{highlightMatches(data.notableQuoteOrVerse.text, filterQuery)}”
                          </blockquote>
                          <cite className="mt-2 block text-[11px] text-stone-400 text-right not-italic font-semibold">
                            {data.notableQuoteOrVerse.source}
                          </cite>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              )
            })}
        </div>
      )}

      {/* CONVERGENCE & DIVERGENCE VIEW */}
      {activeTab === 'divergence' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Common Ground */}
            <section className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-6 sm:p-7">
              <div className="flex items-center gap-2 text-emerald-800">
                <span className="text-xl">🤝</span>
                <h2 className="text-base font-semibold">Points of Convergence (Shared Ground)</h2>
              </div>
              <p className="mt-1 text-xs text-emerald-700/80">
                Foundational principles and narrative agreements recognized across traditions:
              </p>
              <ul className="mt-5 space-y-3.5">
                {entity.convergencePoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs text-stone-800 leading-relaxed">
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] mt-0.5">
                      ✓
                    </span>
                    <span>{highlightMatches(pt, filterQuery)}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Distinct Perspectives */}
            <section className="rounded-2xl border border-amber-200 bg-amber-50/40 p-6 sm:p-7">
              <div className="flex items-center gap-2 text-amber-900">
                <span className="text-xl">⚡</span>
                <h2 className="text-base font-semibold">Points of Divergence (Distinct Emphases)</h2>
              </div>
              <p className="mt-1 text-xs text-amber-800/80">
                Theological departures, legal interpretations, and contrasting perspectives:
              </p>
              <ul className="mt-5 space-y-3.5">
                {entity.divergencePoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs text-stone-800 leading-relaxed">
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-800 font-bold text-[10px] mt-0.5">
                      !
                    </span>
                    <span>{highlightMatches(pt, filterQuery)}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Historical Context Section */}
          <section className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
              Historical Milieu & Comparative Context
            </h2>
            <p className="mt-2 text-sm text-stone-700 leading-relaxed">
              {highlightMatches(entity.historicalContext, filterQuery)}
            </p>
          </section>
        </div>
      )}

      {/* Tags and Related Entities */}
      <section className="border-t border-stone-200/80 pt-8 space-y-6">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-400">Topics & Tags</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {entity.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-600 font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Other Comparisons Navigation */}
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">
            Explore Other Comparative Analyses
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {allComparisons
              .filter((c) => c.slug !== entity.slug)
              .slice(0, 4)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/compare/${c.slug}`}
                  className="group rounded-xl border border-stone-200 bg-white p-3.5 hover:border-stone-400 hover:shadow-xs transition-all"
                >
                  <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wide truncate">
                    {c.category}
                  </p>
                  <h3 className="mt-1 text-xs font-semibold text-stone-900 group-hover:text-stone-700 line-clamp-1">
                    {c.title}
                  </h3>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}
