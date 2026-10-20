import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <p className="text-sm font-semibold text-stone-900">Abrahamic Lore</p>
            <p className="mt-2 text-xs leading-relaxed text-stone-500">
              One environment to explore Judaism, Christianity, Islam, and the traditions they carry.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">Explore</p>
            <ul className="mt-3 space-y-2 text-sm text-stone-500">
              <li><Link href="/traditions" className="hover:text-stone-900 transition-colors">Browse Traditions</Link></li>
              <li><Link href="/topics" className="hover:text-stone-900 transition-colors">Topics</Link></li>
              <li><Link href="/search" className="hover:text-stone-900 transition-colors">Search</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">Platform</p>
            <ul className="mt-3 space-y-2 text-sm text-stone-500">
              <li><Link href="/about" className="hover:text-stone-900 transition-colors">About</Link></li>
              <li><Link href="/sources" className="hover:text-stone-900 transition-colors">Sources & Editorial Principles</Link></li>
              <li><Link href="/feedback" className="hover:text-stone-900 transition-colors">Contact & Feedback</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">Legal</p>
            <ul className="mt-3 space-y-2 text-sm text-stone-500">
              <li><Link href="/privacy" className="hover:text-stone-900 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-stone-900 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-stone-200 pt-6 text-xs text-stone-400">
          © {new Date().getFullYear()} Abrahamic Lore. A shared space for learning.
        </div>
      </div>
    </footer>
  )
}
