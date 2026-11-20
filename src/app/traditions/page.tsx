import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { COMPARISON_ENTITIES } from '@/data/abrahamic_entities'
import Icon from '@/components/ui/Icon'

export const metadata = {
  title: 'Abrahamic Traditions | Comparative Study',
  description: 'Deep dive into the distinctive viewpoints of Judaism, Christianity, and Islam.',
}

export default function TraditionsPage() {
  const comparisons = Object.values(COMPARISON_ENTITIES)

  const traditions = [
    {
      id: 'judaism',
      title: 'Judaism',
      subtitle: 'The Covenant & The Torah',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: 'star-of-david' as const,
      summary: 'Centered upon the eternal Brit (Covenant) forged at Sinai, the mitzvot (commandments), and the preservation of divine law through the Tanakh and Talmud.',
      coreScripture: 'Tanakh (Torah, Nevi\'im, Ketuvim)',
      keyConcept: 'Halakha, Chessed, Tikkun Olam',
    },
    {
      id: 'christianity',
      title: 'Christianity',
      subtitle: 'Grace, Incarnation & The Gospel',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
      icon: 'cross' as const,
      summary: 'Centered upon the life, death, and resurrection of Jesus of Nazareth (Yeshua / Christ), the incarnation of the Word, and salvation through faith and divine grace.',
      coreScripture: 'The Holy Bible (Old & New Testaments)',
      keyConcept: 'Grace (Charis), Trinity / Logos, Agape',
    },
    {
      id: 'islam',
      title: 'Islam',
      subtitle: 'Tawhid & Final Revelation',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      icon: 'crescent' as const,
      summary: 'Centered upon pure primordial monotheism (Tawhid), submission to the uncreated Word revealed to Prophet Muhammad ﷺ, and the continuous prophetic line.',
      coreScripture: 'Al-Qur\'an Al-Karim & Sunnah',
      keyConcept: 'Tawhid, Risalah, Akhirah',
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      <Navbar tradition={null} />

      <main className="flex-1 mx-auto max-w-6xl px-4 py-12 sm:px-6 space-y-12">
        <section className="text-center space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">
            Tradition Perspectives
          </p>
          <h1 className="text-4xl font-serif font-bold text-stone-900 sm:text-5xl">
            The Three Great Streams
          </h1>
          <p className="text-stone-600 max-w-2xl mx-auto text-base">
            Understand how each faith tradition views historical events, divine revelations, and common ancestral figures.
          </p>
        </section>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {traditions.map((trad) => (
            <div
              key={trad.id}
              className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 flex flex-col justify-between shadow-xs"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Icon name={trad.icon} className="h-8 w-8 text-stone-700" />
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${trad.badgeColor}`}>
                    {trad.subtitle}
                  </span>
                </div>

                <div>
                  <h2 className="text-xl font-serif font-bold text-stone-900">{trad.title}</h2>
                  <p className="mt-2 text-sm text-stone-600 leading-relaxed">{trad.summary}</p>
                </div>

                <div className="space-y-2 pt-4 border-t border-stone-100 text-xs">
                  <div>
                    <span className="font-semibold text-stone-500 uppercase tracking-wide">Core Scripture:</span>
                    <p className="text-stone-800 font-medium">{trad.coreScripture}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-stone-500 uppercase tracking-wide">Pillar Concepts:</span>
                    <p className="text-stone-800 font-medium">{trad.keyConcept}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100">
                <Link
                  href={`/search?q=${trad.id}`}
                  className="block text-center rounded-xl bg-stone-100 hover:bg-stone-200 py-2.5 text-xs font-semibold text-stone-800 transition-colors"
                >
                  View Related Entities →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Comparative Table of Key Figures */}
        <section className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-stone-100 pb-4">
            <h3 className="text-2xl font-serif font-bold text-stone-900">
              Cross-Tradition Convergence
            </h3>
            <p className="text-sm text-stone-600 mt-1">
              Select any figure or sacred topic to see side-by-side perspectives.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {comparisons.map((c) => (
              <Link
                key={c.slug}
                href={`/compare/${c.slug}`}
                className="p-4 rounded-xl border border-stone-100 bg-stone-50/50 hover:bg-stone-100 hover:border-stone-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-medium text-stone-400">{c.category}</span>
                  <h4 className="font-bold text-stone-900 text-sm mt-1">{c.title}</h4>
                </div>
                <span className="text-xs text-amber-700 font-semibold mt-3 flex items-center gap-1">
                  Read 3 Perspectives →
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
