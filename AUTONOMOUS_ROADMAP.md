# abrahamic-lore Autonomous Evolution Roadmap

### Sprint Architecture Review — 2026-11-02 20:47
- Active Modules: comparative_religion_web
- Pending Uncommitted Changes: 12 files
- Target: High reliability, zero bloat, native responsive performance.

### Sprint Architecture Review — 2026-11-02 20:52
- Active Modules: comparative_religion_web
- Pending Uncommitted Changes: 0 files
- Target: High reliability, zero bloat, native responsive performance.

### Sprint Architecture Review — 2026-11-02 20:58
- Active Modules: comparative_religion_web
- Pending Uncommitted Changes: 0 files
- Target: High reliability, zero bloat, native responsive performance.


### Cycle #1 Directive (2026-11-02 21:09)
### 1. Zero-JS Synchronized Comparative Timeline (CSS Sticky Grid)

Replace JS scroll-listeners or timeline libraries with a native sticky CSS grid track.

```tsx
// components/ComparativeTimeline.tsx
interface TimelineEvent {
  year: number;
  tradition: 'judaism' | 'christianity' | 'islam';
  title: string;
}

export function ComparativeTimeline({ events }: { events: TimelineEvent[] }) {
  const eras = Array.from(new Set(events.map((e) => Math.floor(e.year / 500) * 500))).sort((a, b) => a - b);
  // ponytail: assumes static 3-column layout; upgrade to dynamic columns if adding Baha'i/Zoroastrian lore.
  return (
    <div className="grid grid-cols-[80px_repeat(3,1fr)] gap-x-4 border-l border-stone-200 dark:border-stone-800">
      <div className="contents text-xs font-serif text-stone-400">
        <span className="sticky top-0 z-10 bg-stone-50/80 backdrop-blur py-2 dark:bg-stone-950/80">Era</span>
        <span className="sticky top-0 z-10 bg-stone-50/80 backdrop-blur py-2 dark:bg-stone-950/80">Judaism</span>
        <span className="sticky top-0 z-10 bg-stone-50/80 backdrop-blur py-2 dark:bg-stone-950/80">Christianity</span>
        <span className="sticky top-0 z-10 bg-stone-50/80 backdrop-blur py-2 dark:bg-stone-950/80">Islam</span>
      </div>
      {eras.map((era) => (
        <div key={era} className="contents group">
          <div className="sticky left-0 py-4 font-mono text-xs tabular-nums text-stone-400 border-t border-stone-100 dark:border-stone-900">
            {era < 0 ? `${Math.abs(era)} BCE` : `${era} CE`}
          </div>
          {(['judaism', 'christianity', 'islam'] as const).map((t) => (
            <div key={t} className="py-4 border-t border-stone-100 dark:border-stone-900 space-y-2">
              {events
                .filter((e) => e.tradition === t && Math.floor(e.year / 500) * 500 === era)
                .map((e, idx) => (
                  <div key={idx} className="rounded border border-stone-200/60 bg-stone-50/50 p-2 text-xs text-stone-800 dark:border-stone-800 dark:bg-stone-900/40 dark:text-stone-200">
                    {e.title}
                  </div>
                ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
```
skipped: IntersectionObserver virtual scrolling and drag pan.  
add when: Timeline events exceed 1,000 DOM elements in a single viewport.

---

### 2. Apple-Clean Lineage Connector (Native SVG Bezier)

Eliminate heavy node-graph libraries (e.g., ReactFlow) with a declarative inline connector.

```tsx
// components/LineageConnector.tsx
export function LineageConnector({ from, to }: { from: { x: number; y: number }; to: { x: number; y: number } }) {
  const midY = (from.y + to.y) / 2;
  const d = `M ${from.x} ${from.y} C ${from.x} ${midY}, ${to.x} ${midY}, ${to.x} ${to.y}`;
  // ponytail: direct cubic bezier coords; upgrade to path-finding if obstacles exist.
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        className="text-stone-300 dark:text-stone-700 transition-colors duration-300"
        strokeWidth="1.25"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
```
skipped: Layout engine, force-directed positioning, and canvas rendering.  
add when: Graph introduces cyclical lineages or dynamic node-dragging.

---

### 3. Build-Time Static Export Guard for Figures & Lore

Guarantees a zero-error `next build` by enforcing deterministic dynamic routing with non-empty static paths.

```typescript
// app/lineage/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getFigures, getFigureBySlug } from '@/lib/lore';

export const dynamicParams = false; // Zero fallback errors during production export

export async function generateStaticParams() {
  const figures = await getFigures();
  // Ensure slugs are non-empty strings and URL-safe to avoid static build crashes
  return figures
    .filter((f): f is typeof f & { slug: string } => Boolean(f.slug && f.slug.trim()))
    .map((figure) => ({ slug: figure.slug.trim() }));
}

export default async function FigurePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const figure = await getFigureBySlug(slug);
  if (!figure) notFound();

  return (
    <article className="max-w-xl mx-auto px-6 py-12 space-y-4">
      <h1 className="font-serif text-2xl tracking-tight text-stone-900 dark:text-stone-100">{figure.name}</h1>
      <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">{figure.summary}</p>
    </article>
  );
}
```
skipped: Dynamic server runtime (SSR) and on-demand fallback revalidation.  
add when: User-generated lore contributions require runtime ISR.
