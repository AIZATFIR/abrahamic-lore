import Link from 'next/link'
import { TOPIC_CARDS } from '@/lib/content'
import type { Tradition } from '@/types'

interface RecommendedProps {
  tradition: Tradition | null
}

// Simple editorial defaults — in v2 this becomes a real recommendation engine
function getRecommended(tradition: Tradition | null) {
  const defaults = TOPIC_CARDS.slice(0, 4)
  if (!tradition) return defaults

  const priority: Record<string, string[]> = {
    islam: ['sacred-texts', 'prophets-figures', 'religious-history', 'theology-beliefs'],
    christianity: ['sacred-texts', 'stories-narratives', 'theology-beliefs', 'traditions-practices'],
    judaism: ['sacred-texts', 'religious-history', 'traditions-practices', 'theology-beliefs'],
  }

  const ids = priority[tradition] ?? defaults.map((c) => c.id)
  return ids.map((id) => TOPIC_CARDS.find((c) => c.id === id)).filter(Boolean) as typeof TOPIC_CARDS
}

export default function RecommendedForYou({ tradition }: RecommendedProps) {
  const cards = getRecommended(tradition)

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8">
          <h2 className="text-xl font-semibold tracking-tight text-stone-900">Recommended for You</h2>
          <p className="mt-1 text-sm text-stone-500">
            A starting point based on your selected perspective.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {cards.map((card) => (
            <Link
              key={card.id}
              href={`/topics/${card.slug}`}
              className="group rounded-2xl border border-stone-200 bg-white p-5 transition-all hover:border-stone-400 hover:shadow-sm"
            >
              <span className="text-3xl">{card.icon}</span>
              <h3 className="mt-3 text-sm font-semibold text-stone-900 group-hover:text-stone-700">
                {card.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-stone-500 line-clamp-2">
                {card.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
