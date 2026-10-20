import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

// ponytail: stub — full content system comes in Phase 2
export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar tradition={null} />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">Topic</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-stone-900 capitalize">
            {slug.replace(/-/g, ' ')}
          </h1>
          <div className="mt-8 rounded-2xl border border-stone-200 bg-stone-50 p-8 text-center">
            <p className="text-sm text-stone-500">
              Full content pages are coming in Phase 2. This is a placeholder for{' '}
              <strong>{slug}</strong>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
