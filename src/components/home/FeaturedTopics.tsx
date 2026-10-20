import Link from 'next/link'
import { TOPIC_CARDS } from '@/lib/content'

export default function FeaturedTopics() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8">
          <h2 className="text-xl font-semibold tracking-tight text-stone-900">Featured Topics</h2>
          <p className="mt-1 text-sm text-stone-500">Start with any topic that interests you.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOPIC_CARDS.map((card) => (
            <Link
              key={card.id}
              href={`/topics/${card.slug}`}
              className="group rounded-2xl border border-stone-200 bg-white p-5 transition-all hover:border-stone-400 hover:shadow-sm"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{card.icon}</span>
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-stone-400">
                    {card.category}
                  </p>
                  <h3 className="mt-0.5 text-sm font-semibold text-stone-900 group-hover:text-stone-700">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-stone-500">{card.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
