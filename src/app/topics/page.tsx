import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { TOPIC_DETAILS } from '@/data/abrahamic_entities'

export const metadata = {
  title: 'All Topics | Abrahamic Lore',
  description: 'Browse all sacred themes, historical timelines, scripture origins, and foundational lore.',
}

export default function TopicsIndexPage() {
  const topics = Object.values(TOPIC_DETAILS)

  // Group by category
  const categories = Array.from(new Set(topics.map((t) => t.category)))

  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      <Navbar tradition={null} />

      <main className="flex-1 mx-auto max-w-6xl px-4 py-12 sm:px-6 space-y-12">
        <section className="text-center space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">
            Knowledge Index
          </p>
          <h1 className="text-4xl font-serif font-bold text-stone-900 sm:text-5xl">
            Sacred Topics & Historical Lore
          </h1>
          <p className="text-stone-600 max-w-2xl mx-auto text-base">
            Detailed thematic examinations spanning scriptures, historical developments, covenants, and prophetic lineage.
          </p>
        </section>

        {categories.map((category) => {
          const categoryTopics = topics.filter((t) => t.category === category)
          return (
            <section key={category} className="space-y-4">
              <div className="border-b border-stone-200 pb-2 flex items-center justify-between">
                <h2 className="text-xl font-serif font-bold text-stone-900">
                  {category}
                </h2>
                <span className="text-xs text-stone-500">{categoryTopics.length} topics</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryTopics.map((topic) => (
                  <Link
                    key={topic.slug}
                    href={`/topics/${topic.slug}`}
                    className="rounded-2xl border border-stone-200 bg-white p-5 shadow-xs hover:border-stone-400 hover:shadow-sm transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-2xl mb-2">{topic.icon}</div>
                      <h3 className="font-bold text-stone-900 text-base">{topic.title}</h3>
                      <p className="mt-1 text-xs text-stone-600 line-clamp-3 leading-relaxed">
                        {topic.summary}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                      <span className="text-stone-400">
                        {topic.perspectives?.length || 3} traditions
                      </span>
                      <span className="font-semibold text-stone-900">Read topic →</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}
      </main>

      <Footer />
    </div>
  )
}
