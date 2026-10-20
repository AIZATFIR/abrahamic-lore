import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar tradition={null} />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">Compare</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900 capitalize">
            {slug.replace(/-/g, ' ')}
          </h1>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {['Judaism', 'Christianity', 'Islam'].map((t) => (
              <div key={t} className="rounded-2xl border border-stone-200 bg-stone-50 p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">{t}</p>
                <p className="mt-4 text-sm text-stone-400 italic">
                  Content coming in Phase 2.
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
