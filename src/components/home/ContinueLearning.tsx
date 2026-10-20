import Link from 'next/link'

// Curated intro cards for guests / new users with no history
const INTRO_PICKS = [
  { id: 'who-is-abraham', title: 'Who Is Abraham?', description: 'The founding figure of three traditions.', icon: '🕊️', slug: 'who-is-abraham' },
  { id: 'three-books', title: 'Three Sacred Books', description: 'The Torah, Bible, and Quran — their origins and structure.', icon: '📖', slug: 'three-books' },
  { id: 'abrahamic-timeline', title: 'An Abrahamic Timeline', description: 'From Abraham to Muhammad — key moments in sequence.', icon: '🏛️', slug: 'abrahamic-timeline' },
  { id: 'shared-stories', title: 'Stories Told in All Three', description: 'Narratives that appear in every Abrahamic tradition.', icon: '📜', slug: 'shared-stories' },
]

export default function ContinueLearning() {
  return (
    <section className="border-t border-stone-100 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8">
          <h2 className="text-xl font-semibold tracking-tight text-stone-900">Start Here</h2>
          <p className="mt-1 text-sm text-stone-500">
            Introductory topics for anyone exploring the Abrahamic traditions.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INTRO_PICKS.map((item) => (
            <Link
              key={item.id}
              href={`/topics/${item.slug}`}
              className="group flex items-start gap-3 rounded-2xl border border-stone-200 bg-white p-5 transition-all hover:border-stone-400 hover:shadow-sm"
            >
              <span className="text-2xl">{item.icon}</span>
              <div>
                <h3 className="text-sm font-semibold text-stone-900 group-hover:text-stone-700">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-stone-500">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
