import type { Metadata } from 'next'
import Link from 'next/link'
import { COMPARISON_ENTITIES } from '@/data/abrahamic_entities'
import CompareInteractiveView from '@/components/compare/CompareInteractiveView'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const entity = COMPARISON_ENTITIES[slug]

  if (!entity) {
    return {
      title: 'Comparison Not Found | Abrahamic Lore',
    }
  }

  return {
    title: `${entity.title} — Cross-Tradition Comparison | Abrahamic Lore`,
    description: entity.summary,
  }
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const entity = COMPARISON_ENTITIES[slug]

  if (!entity) {
    // If slug is not found, provide fallback list or 404
    const available = Object.values(COMPARISON_ENTITIES)
    return (
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="text-center space-y-4">
          <span className="text-4xl">⚖️</span>
          <h1 className="text-2xl font-bold text-stone-900">Comparison Not Found</h1>
          <p className="text-stone-600 max-w-md mx-auto text-sm">
            We couldn’t find an analytical comparison for &ldquo;{slug}&rdquo;. Explore our available cross-tradition studies below:
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {available.map((c) => (
            <Link
              key={c.slug}
              href={`/compare/${c.slug}`}
              className="rounded-xl border border-stone-200 bg-white p-5 hover:border-stone-400 hover:shadow-xs transition-all"
            >
              <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-400">
                {c.category}
              </span>
              <h2 className="mt-1 text-sm font-semibold text-stone-900">{c.title}</h2>
              <p className="mt-2 text-xs text-stone-600 line-clamp-2">{c.summary}</p>
            </Link>
          ))}
        </div>
      </main>
    )
  }

  const allSummaries = Object.values(COMPARISON_ENTITIES).map((c) => ({
    slug: c.slug,
    title: c.title,
    category: c.category,
  }))

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 space-y-8">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-stone-500">
        <Link href="/" className="hover:text-stone-900 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-stone-400">Comparisons</span>
        <span>/</span>
        <span className="text-stone-900 font-medium truncate max-w-xs">{entity.title}</span>
      </nav>

      {/* Header Banner */}
      <header className="rounded-3xl border border-stone-200 bg-linear-to-b from-stone-50 via-white to-stone-50/40 p-6 sm:p-10 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center rounded-full bg-stone-200/70 px-3 py-1 text-xs font-semibold text-stone-700">
            {entity.category}
          </span>
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
            <span>Traditions:</span>
            <span className="rounded-md bg-blue-50 px-2 py-0.5 text-blue-700 font-medium">Judaism</span>
            <span className="rounded-md bg-amber-50 px-2 py-0.5 text-amber-800 font-medium">Christianity</span>
            <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-emerald-700 font-medium">Islam</span>
          </div>
        </div>

        <h1 className="mt-4 text-2xl sm:text-4xl font-serif font-bold tracking-tight text-stone-900">
          {entity.title}
        </h1>
        <p className="mt-3 text-base text-stone-600 max-w-3xl leading-relaxed">
          {entity.summary}
        </p>
      </header>

      {/* Main Interactive Comparison View */}
      <CompareInteractiveView entity={entity} allComparisons={allSummaries} />
    </main>
  )
}
