import type { Metadata } from 'next'
import Link from 'next/link'
import { TOPIC_DETAILS, COMPARISON_ENTITIES } from '@/data/abrahamic_entities'
import TopicDetailView from '@/components/topics/TopicDetailView'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const topic = TOPIC_DETAILS[slug]

  if (!topic) {
    return {
      title: 'Topic Not Found | Abrahamic Lore',
    }
  }

  return {
    title: `${topic.title} | Abrahamic Lore`,
    description: topic.summary,
  }
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const topic = TOPIC_DETAILS[slug]

  if (!topic) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <div className="text-center space-y-4">
          <span className="text-4xl">📖</span>
          <h1 className="text-2xl font-bold text-stone-900">Topic Not Found</h1>
          <p className="text-stone-600 max-w-md mx-auto text-sm">
            We couldn’t find &ldquo;{slug}&rdquo;. Explore our available topics below:
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Object.values(TOPIC_DETAILS).map((t) => (
            <Link
              key={t.slug}
              href={`/topics/${t.slug}`}
              className="rounded-xl border border-stone-200 bg-white p-5 hover:border-stone-400 hover:shadow-xs transition-all"
            >
              <span className="text-2xl">{t.icon}</span>
              <h2 className="mt-2 text-sm font-semibold text-stone-900">{t.title}</h2>
              <p className="mt-1 text-xs text-stone-600 line-clamp-2">{t.summary}</p>
            </Link>
          ))}
        </div>
      </main>
    )
  }

  // Resolve related comparisons
  const relatedComparisons = (topic.relatedComparisonSlugs || [])
    .map((cSlug) => COMPARISON_ENTITIES[cSlug])
    .filter(Boolean)

  const otherTopics = Object.values(TOPIC_DETAILS).map((t) => ({
    slug: t.slug,
    title: t.title,
    category: t.category,
    icon: t.icon,
  }))

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 space-y-8">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-stone-500">
        <Link href="/" className="hover:text-stone-900 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-stone-400">Topics</span>
        <span>/</span>
        <span className="text-stone-900 font-medium truncate max-w-xs">{topic.title}</span>
      </nav>

      {/* Header Banner */}
      <header className="rounded-3xl border border-stone-200 bg-linear-to-b from-stone-50 via-white to-stone-50/40 p-6 sm:p-10 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{topic.icon}</span>
          <span className="inline-flex items-center rounded-full bg-stone-200/70 px-3 py-0.5 text-xs font-semibold text-stone-700">
            {topic.category}
          </span>
        </div>

        <h1 className="mt-4 text-3xl sm:text-4xl font-serif font-bold tracking-tight text-stone-900">
          {topic.title}
        </h1>
        <p className="mt-3 text-base text-stone-600 max-w-3xl leading-relaxed">
          {topic.summary}
        </p>
      </header>

      {/* Interactive Detail Content View */}
      <TopicDetailView
        topic={topic}
        relatedComparisons={relatedComparisons}
        otherTopics={otherTopics}
      />
    </main>
  )
}
