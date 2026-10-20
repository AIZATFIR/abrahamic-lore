import Link from 'next/link'
import { FEATURED_COMPARISONS } from '@/lib/content'
import { TRADITION_LABELS } from '@/lib/content'

export default function ExploreAcrossTraditions() {
  return (
    <section className="border-t border-stone-100 bg-stone-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8">
          <h2 className="text-xl font-semibold tracking-tight text-stone-900">
            Explore Across Traditions
          </h2>
          <p className="mt-1 text-sm text-stone-500">
            Discover how Judaism, Christianity, and Islam share history — and differ in meaning.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {FEATURED_COMPARISONS.map((item) => (
            <Link
              key={item.id}
              href={`/compare/${item.slug}`}
              className="group rounded-2xl border border-stone-200 bg-white p-6 transition-all hover:border-stone-400 hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-stone-900 group-hover:text-stone-700">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-stone-500">{item.description}</p>
                </div>
                <svg
                  className="mt-0.5 shrink-0 text-stone-300 group-hover:text-stone-500 transition-colors"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {item.traditions.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[11px] text-stone-500"
                  >
                    {TRADITION_LABELS[t]}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
