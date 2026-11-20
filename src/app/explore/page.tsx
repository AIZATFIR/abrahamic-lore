import Link from 'next/link'
import { COMPARISON_ENTITIES, TOPIC_DETAILS } from '@/data/abrahamic_entities'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Icon from '@/components/ui/Icon'

export const metadata = {
  title: 'Explore Sacred Lineages & Comparisons | Abrahamic Lore',
  description: 'Explore comparative deep-dives, theological convergence, and sacred figures across Judaism, Christianity, and Islam.',
}

export default function ExplorePage() {
  const comparisons = Object.values(COMPARISON_ENTITIES)
  const topics = Object.values(TOPIC_DETAILS)

  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      <Navbar tradition={null} />

      <main className="flex-1 mx-auto max-w-6xl px-4 py-12 sm:px-6 space-y-12">
        {/* Header */}
        <section className="text-center space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">
            Comparative Corpus
          </p>
          <h1 className="text-4xl font-serif font-bold text-stone-900 sm:text-5xl">
            Explore Sacred Perspectives
          </h1>
          <p className="text-stone-600 max-w-2xl mx-auto text-base">
            Journey through shared roots, distinctive revelations, and theological nuances across the Abrahamic traditions.
          </p>
        </section>

        {/* Featured Comparative Entities */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <h2 className="text-xl font-bold font-serif text-stone-900">
              Comparative Analysis & Figures
            </h2>
            <span className="text-xs text-stone-500">{comparisons.length} deep-dives</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {comparisons.map((c) => (
              <Link
                key={c.slug}
                href={`/compare/${c.slug}`}
                className="group rounded-2xl border border-stone-200 bg-white p-6 shadow-xs hover:border-stone-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-stone-700">
                      {c.category}
                    </span>
                    <span className="text-xs font-medium text-stone-400 group-hover:text-stone-900 transition-colors">
                      Compare →
                    </span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-sm text-stone-600 leading-relaxed line-clamp-2">
                    {c.summary}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <div className="flex gap-2">
                    <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded font-medium">Judaism</span>
                    <span className="px-1.5 py-0.5 bg-purple-50 text-purple-700 rounded font-medium">Christianity</span>
                    <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 rounded font-medium">Islam</span>
                  </div>
                  <span>{c.convergencePoints?.length || 0} convergences</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Thematic Topics */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <h2 className="text-xl font-bold font-serif text-stone-900">
              Thematic Categories
            </h2>
            <span className="text-xs text-stone-500">{topics.length} topics</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topics.map((t) => (
              <Link
                key={t.slug}
                href={`/topics/${t.slug}`}
                className="rounded-xl border border-stone-200 bg-white p-5 hover:border-stone-400 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <Icon name={t.icon} className="h-6 w-6 mb-2 text-stone-700" />
                  <h3 className="text-base font-bold text-stone-900">{t.title}</h3>
                  <p className="mt-1 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {t.summary}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
                  <span>{t.category}</span>
                  <span className="font-semibold text-stone-700">Explore →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
