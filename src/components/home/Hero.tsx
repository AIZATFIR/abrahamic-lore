import type { Tradition } from '@/types'
import { getHeroContent } from '@/lib/content'
import Link from 'next/link'

interface HeroProps {
  tradition: Tradition | null
  onChangeTradition: () => void
}

export default function Hero({ tradition, onChangeTradition }: HeroProps) {
  const { headline, description } = getHeroContent(tradition)

  return (
    <section className="relative overflow-hidden border-b border-stone-100 bg-gradient-to-b from-stone-50 to-white py-20 sm:py-28">
      {/* Subtle decorative rings */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.03]"
      >
        <div className="h-[600px] w-[600px] rounded-full border-2 border-stone-900" />
        <div className="absolute h-[400px] w-[400px] rounded-full border border-stone-900" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
          Abrahamic Lore
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl leading-[1.1]">
          {headline}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-stone-500">
          {description}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/explore"
            className="rounded-full bg-stone-900 px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-stone-700 transition-colors"
          >
            Start Exploring
          </Link>
          <Link
            href="/traditions"
            className="rounded-full border border-stone-300 bg-white px-6 py-2.5 text-sm text-stone-700 hover:bg-stone-50 transition-colors"
          >
            Explore All Traditions
          </Link>
        </div>

        {tradition && (
          <button
            onClick={onChangeTradition}
            className="mt-6 text-xs text-stone-400 hover:text-stone-600 transition-colors underline underline-offset-2"
          >
            Change perspective
          </button>
        )}
      </div>
    </section>
  )
}
