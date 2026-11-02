'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { TopicDetail, ComparisonEntity } from '@/data/abrahamic_entities'

interface TopicDetailViewProps {
  topic: TopicDetail
  relatedComparisons: ComparisonEntity[]
  otherTopics: { slug: string; title: string; category: string; icon: string }[]
}

const TRADITION_STYLE = {
  judaism: {
    name: 'Judaism',
    badge: 'bg-blue-50 text-blue-700 border-blue-200',
    border: 'border-blue-100',
    headerBg: 'bg-blue-50/50',
    icon: '✡️',
    title: 'Jewish Perspective & Halakhic Context',
  },
  christianity: {
    name: 'Christianity',
    badge: 'bg-amber-50 text-amber-800 border-amber-200',
    border: 'border-amber-100',
    headerBg: 'bg-amber-50/50',
    icon: '✝️',
    title: 'Christian Perspective & Christological Lens',
  },
  islam: {
    name: 'Islam',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    border: 'border-emerald-100',
    headerBg: 'bg-emerald-50/50',
    icon: '☪️',
    title: 'Islamic Perspective & Tawhidic Lens',
  },
}

export default function TopicDetailView({
  topic,
  relatedComparisons,
  otherTopics,
}: TopicDetailViewProps) {
  const [activeTradition, setActiveTradition] = useState<
    'all' | 'judaism' | 'christianity' | 'islam'
  >('all')

  const filteredPerspectives =
    activeTradition === 'all'
      ? topic.perspectives
      : topic.perspectives.filter((p) => p.tradition === activeTradition)

  return (
    <div className="space-y-12">
      {/* Historical Overview */}
      <section className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
          Historical Overview & Evolution
        </h2>
        <p className="mt-3 text-base text-stone-700 leading-relaxed font-sans">
          {topic.historicalOverview}
        </p>

        <div className="mt-6 rounded-2xl bg-stone-50 border border-stone-200/80 p-5">
          <div className="flex items-start gap-3">
            <span className="text-lg">⚖️</span>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-stone-600">
                Comparative Takeaway
              </h3>
              <p className="mt-1 text-sm text-stone-700 leading-relaxed">
                {topic.comparativeTakeaway}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Traditions View Section */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-serif font-bold text-stone-900">
              Tradition Perspectives
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Compare theological formulations, focal figures, and canonical texts.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-xl w-fit">
            <button
              onClick={() => setActiveTradition('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTradition === 'all'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All 3 Traditions
            </button>
            <button
              onClick={() => setActiveTradition('judaism')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTradition === 'judaism'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              ✡ Judaism
            </button>
            <button
              onClick={() => setActiveTradition('christianity')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTradition === 'christianity'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              ✝ Christianity
            </button>
            <button
              onClick={() => setActiveTradition('islam')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                activeTradition === 'islam'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              ☪ Islam
            </button>
          </div>
        </div>

        {/* Perspective Cards */}
        <div className="grid grid-cols-1 gap-6">
          {filteredPerspectives.map((persp) => {
            const style = TRADITION_STYLE[persp.tradition]
            return (
              <article
                key={persp.tradition}
                className="rounded-3xl border border-stone-200 bg-white shadow-xs overflow-hidden transition-all hover:border-stone-300"
              >
                <div className={`p-5 sm:p-6 border-b border-stone-100 ${style.headerBg} flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{style.icon}</span>
                    <div>
                      <h3 className="text-base font-semibold text-stone-900">
                        {style.name}
                      </h3>
                      <p className="text-xs text-stone-500 font-medium">{style.title}</p>
                    </div>
                  </div>
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${style.badge}`}>
                    {style.name.toUpperCase()}
                  </span>
                </div>

                <div className="p-6 sm:p-8 space-y-6">
                  <div>
                    <h4 className="text-base font-semibold text-stone-900">
                      {persp.headline}
                    </h4>
                    <p className="mt-2 text-sm text-stone-700 leading-relaxed">
                      {persp.content}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-100">
                    <div className="rounded-xl bg-stone-50 p-4 border border-stone-100">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                        Canonical Texts & Sources
                      </p>
                      <ul className="mt-2 space-y-1 text-xs text-stone-700">
                        {persp.keyTexts.map((txt, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="text-stone-400">📜</span>
                            <span>{txt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-xl bg-stone-50 p-4 border border-stone-100">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                        Prominent Figures & Exponents
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {persp.focalFigures.map((fig, i) => (
                          <span
                            key={i}
                            className="rounded-lg bg-white border border-stone-200 px-2.5 py-1 text-xs text-stone-700 font-medium"
                          >
                            {fig}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      {/* Linked Comparative Analyses */}
      {relatedComparisons.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-serif font-bold text-stone-900">
                Interactive Cross-Tradition Comparisons
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Side-by-side matrices and divergence analysis related to this topic.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {relatedComparisons.map((c) => (
              <Link
                key={c.slug}
                href={`/compare/${c.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-5 hover:border-stone-400 hover:shadow-xs transition-all"
              >
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                    {c.category}
                  </span>
                  <h3 className="mt-1 text-sm font-semibold text-stone-900 group-hover:text-stone-700">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-xs text-stone-600 line-clamp-2">
                    {c.summary}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-stone-900 group-hover:translate-x-0.5 transition-transform">
                  <span>Open comparative matrix</span>
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* More Topics */}
      <section className="border-t border-stone-200/80 pt-8 space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
          Other Foundational Topics
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {otherTopics
            .filter((t) => t.slug !== topic.slug)
            .slice(0, 4)
            .map((t) => (
              <Link
                key={t.slug}
                href={`/topics/${t.slug}`}
                className="group rounded-xl border border-stone-200 bg-white p-3.5 hover:border-stone-400 hover:shadow-xs transition-all"
              >
                <span className="text-xl">{t.icon}</span>
                <h3 className="mt-2 text-xs font-semibold text-stone-900 group-hover:text-stone-700 line-clamp-1">
                  {t.title}
                </h3>
                <span className="text-[10px] text-stone-400 uppercase tracking-wide">
                  {t.category}
                </span>
              </Link>
            ))}
        </div>
      </section>
    </div>
  )
}
