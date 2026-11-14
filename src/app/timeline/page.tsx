import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ComparativeTimeline } from '@/components/timeline/ComparativeTimeline'
import { LineageTree } from '@/components/timeline/LineageTree'

export const metadata = {
  title: 'Abrahamic Timeline & Prophetic Lineage | Abrahamic Lore',
  description: 'Chronological timeline from Abraham to Muhammad, paired with genealogical lineage trees across Judaism, Christianity, and Islam.',
}

export default function TimelinePage() {
  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      <Navbar tradition={null} />

      <main className="flex-1 mx-auto max-w-6xl px-4 py-12 sm:px-6 space-y-12">
        <section className="text-center space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">
            Chronology & Genealogy
          </p>
          <h1 className="text-4xl font-serif font-bold text-stone-900 sm:text-5xl">
            Timeline & Prophetic Lineage
          </h1>
          <p className="text-stone-600 max-w-2xl mx-auto text-base">
            Trace the unfolding of divine covenants across epochs and see how prophetic genealogies intertwine.
          </p>
        </section>

        {/* Section 1: Lineage Tree */}
        <section className="space-y-4">
          <LineageTree />
        </section>

        {/* Section 2: Comparative Chronology */}
        <section className="space-y-4">
          <ComparativeTimeline />
        </section>
      </main>

      <Footer />
    </div>
  )
}
