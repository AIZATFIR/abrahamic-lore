'use client'

import Link from 'next/link'
import { useState } from 'react'
import { TRADITION_LABELS } from '@/lib/content'
import type { Tradition } from '@/types'

interface NavbarProps {
  tradition: Tradition | null
  onChangeTradition?: () => void
}

export default function Navbar({ tradition, onChangeTradition }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/60 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-base font-semibold tracking-tight text-stone-900">
            Abrahamic Lore
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm text-stone-600 sm:flex">
          <Link href="/explore" className="hover:text-stone-900 transition-colors">Explore</Link>
          <Link href="/traditions" className="hover:text-stone-900 transition-colors">Traditions</Link>
          <Link href="/topics" className="hover:text-stone-900 transition-colors">Topics</Link>
          <Link href="/search" className="hover:text-stone-900 transition-colors">Search</Link>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">
          {tradition && (
            <button
              onClick={onChangeTradition}
              className="hidden rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-600 hover:bg-stone-200 transition-colors sm:block"
            >
              {TRADITION_LABELS[tradition]}
            </button>
          )}
          <Link
            href="/login"
            className="rounded-full bg-stone-900 px-4 py-1.5 text-sm text-white hover:bg-stone-700 transition-colors"
          >
            Sign In
          </Link>
          {/* Mobile menu button */}
          <button
            className="sm:hidden p-1.5 text-stone-600"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 7.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="border-t border-stone-100 bg-white px-4 py-3 sm:hidden">
          <div className="flex flex-col gap-3 text-sm text-stone-600">
            <Link href="/explore" onClick={() => setMenuOpen(false)}>Explore</Link>
            <Link href="/traditions" onClick={() => setMenuOpen(false)}>Traditions</Link>
            <Link href="/topics" onClick={() => setMenuOpen(false)}>Topics</Link>
            <Link href="/search" onClick={() => setMenuOpen(false)}>Search</Link>
            {tradition && (
              <button onClick={() => { setMenuOpen(false); onChangeTradition?.() }} className="text-left text-stone-500">
                Perspective: {TRADITION_LABELS[tradition]}
              </button>
            )}
          </div>
        </nav>
      )}
    </header>
  )
}
