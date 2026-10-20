import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Abrahamic Lore — Explore Judaism, Christianity, and Islam',
  description:
    'One environment to explore the traditions, histories, scriptures, and wisdom of the Abrahamic world.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="antialiased">
      <body className="min-h-screen bg-white text-stone-900">{children}</body>
    </html>
  )
}
