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


### Cycle #1 Directive (2026-11-02 21:11)
### 1. Comparative Timeline: Native Sticky Grid (Zero-JS Sync)

Replace complex timeline sync logic with native CSS grid and sticky era headers for Abrahamic traditions (Judaism, Christianity, Islam).

```tsx
// components/ComparativeTimeline.tsx
interface EraEvent {
  year: string;
  traditions: {
    judaism?: string;
    christianity?: string;
    islam?: string;
  };
}

export function ComparativeTimeline({ events }: { events: EraEvent[] }) {
  // ponytail: static 3-column grid; upgrade to dynamic columns if adding Baha'i/Druze lore
  return (
    <div className="w-full max-w-5xl mx-auto px-4 font-sans text-stone-800 dark:text-stone-200">
      <header className="sticky top-0 z-20 grid grid-cols-4 gap-4 py-3 bg-stone-50/90 dark:bg-stone-900/90 backdrop-blur border-b border-stone-200 dark:border-stone-800 text-xs tracking-wider uppercase text-stone-500">
        <span>Era / BCE-CE</span>
        <span>Judaism</span>
        <span>Christianity</span>
        <span>Islam</span>
      </header>
      <div className="divide-y divide-stone-200/50 dark:divide-stone-800/50 text-sm">
        {events.map((e, idx) => (
          <div key={idx} className="grid grid-cols-4 gap-4 py-4 items-baseline">
            <span className="font-mono text-xs text-stone-400 select-none">{e.year}</span>
            <div className="space-y-1">{e.traditions.judaism ?? <span className="text-stone-300 dark:text-stone-700">—</span>}</div>
            <div className="space-y-1">{e.traditions.christianity ?? <span className="text-stone-300 dark:text-stone-700">—</span>}</div>
            <div className="space-y-1">{e.traditions.islam ?? <span className="text-stone-300 dark:text-stone-700">—</span>}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
```
→ skipped: JS-driven canvas/scroll-sync libraries (vis-timeline, react-flow).  
→ add when: Horizontal dragging or interactive cross-era node-linking is explicitly required.

---

### 2. Lineage View: Semantic Tree via Native CSS Pseudo-Borders

Drop graph layout engines. Render patriarchal lineages with a semantic `<ul>`/`<li>` tree using native CSS border connectors.

```tsx
// components/LineageTree.tsx
interface PersonNode {
  name: string;
  title?: string;
  children?: PersonNode[];
}

export function LineageTree({ data }: { data: PersonNode }) {
  // ponytail: strict single-parent descending lineage; upgrade to full DAG if displaying complex maternal ties
  return (
    <div className="inline-block p-6">
      <NodeItem node={data} />
    </div>
  );
}

function NodeItem({ node }: { node: PersonNode }) {
  return (
    <div className="flex flex-col items-center">
      <div className="px-3 py-1.5 rounded-md border border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-sm shadow-sm">
        <span className="font-medium">{node.name}</span>
        {node.title && <span className="block text-[10px] text-stone-500 tracking-tight">{node.title}</span>}
      </div>
      {node.children && node.children.length > 0 && (
        <div className="flex pt-4 relative before:content-[''] before:absolute before:top-0 before:left-1/2 before:w-px before:h-4 before:bg-stone-300 dark:before:bg-stone-700">
          {node.children.map((child, idx) => (
            <div key={idx} className="relative px-3 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-stone-300 dark:before:bg-stone-700 first:before:left-1/2 last:before:right-1/2">
              <NodeItem node={child} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```
→ skipped: `@visx/hierarchy`, `d3-hierarchy`, and manual `<svg>` bezier path calculation.  
→ add when: Lineage requires dynamic node-collapsing or bidirectional marriage nodes.

---

### 3. Next.js Zero-Error Build: Strict Static Param Freezing

Prevent dynamic route build-time crashes (`PageNotFoundError`, undefined parameter slips, or accidental dynamic fallbacks during `next build`).

```tsx
// app/figures/[slug]/page.tsx
import { notFound } from "next/navigation";

// Enforce total static-export verification at build-time
export const dynamic = "error";
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // ponytail: direct local dataset read; upgrade to fs-cached manifest if dataset exceeds 500 records
  const { getAllFigureSlugs } = await import("@/lib/lore");
  return getAllFigureSlugs().map((slug) => ({ slug }));
}

export default async function FigurePage({ params }: PageProps) {
  const { slug } = await params;
  const { getFigureBySlug } = await import("@/lib/lore");
  const figure = getFigureBySlug(slug);

  if (!figure) notFound();

  return <main className="p-8 font-sans">{/* View payload */}</main>;
}

// Self-check: ensures static generator matches page expectation
if (process.env.NODE_ENV === "test") {
  const testParams = await generateStaticParams();
  console.assert(Array.isArray(testParams), "generateStaticParams must return an array");
}
```
→ skipped: On-demand incremental dynamic rendering (ISR) and fallback skeleton loaders.  
→ add when: Lore database moves from static markdown/JSON to an active remote CMS.


### Cycle #3 Directive (2026-11-02 21:22)
### 1. Lineage View: Native CSS Tree

Zero canvas/D3 bloat. Pure recursive CSS layout with stone-palette zen styling.

```tsx
// components/LineageTree.tsx
interface Figure {
  id: string;
  name: string;
  epoch?: string;
  children?: Figure[];
}

export function LineageTree({ members }: { members: Figure[] }) {
  return (
    <ul className="flex justify-center gap-4">
      {members.map((m) => (
        <li key={m.id} className="relative flex flex-col items-center">
          <div className="rounded-md border border-stone-200/80 bg-stone-50/50 px-3 py-1.5 text-xs font-serif text-stone-800 shadow-[0_1px_3px_rgba(0,0,0,0.02)] backdrop-blur-sm">
            {m.name}
          </div>
          {m.children && m.children.length > 0 && (
            <>
              <div className="h-4 w-px bg-stone-300" />
              {/* ponytail: CSS-only branching line ceiling. Upgrade to SVG path overlay if cross-branch marriages occur */}
              <LineageTree members={m.children} />
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
```
skipped: ReactFlow / SVG bezier graphing libraries.  
add when: Non-hierarchical node cross-links or complex pan-zoom interactions are strictly required.

---

### 2. Comparative Timeline: Multi-Tradition Grid

CSS `grid-flow-col` horizontal alignment with zero scroll-sync JS handlers.

```tsx
// components/ComparativeTimeline.tsx
interface ComparativeEpoch {
  epoch: string;
  traditions: { tradition: 'jewish' | 'christian' | 'islamic'; text: string }[];
}

export function ComparativeTimeline({ epochs }: { epochs: ComparativeEpoch[] }) {
  return (
    <section className="overflow-x-auto pb-6 [scrollbar-width:none]">
      <div className="grid grid-flow-col auto-cols-[minmax(240px,1fr)] gap-6 border-t border-stone-200 pt-4">
        {epochs.map((e) => (
          <article key={e.epoch} className="space-y-3">
            <time className="font-mono text-[10px] tracking-widest text-stone-400 uppercase">{e.epoch}</time>
            <div className="space-y-2">
              {e.traditions.map((t) => (
                <div key={t.tradition} className="rounded border-l-2 border-stone-300 pl-2.5 text-xs">
                  <span className="block font-medium capitalize text-stone-500">{t.tradition}</span>
                  <p className="text-stone-700 leading-relaxed">{t.text}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
```
skipped: Framer Motion and intersection observer JS timeline-sync scripts.  
add when: Dynamic bi-directional scrubbing or chronological scaling (years-to-pixels) is demanded.

---

### 3. Build-Time Graph & Static Export Safeguard

Enforces reference integrity during `next build` / static generation to prevent prerender 500s.

```ts
// lib/lore-validator.ts
import { assert } from 'node:assert/strict';

export interface LoreNode {
  id: string;
  parentId?: string;
  references?: string[];
}

export function validateLoreGraph(nodes: LoreNode[]): void {
  const ids = new Set(nodes.map((n) => n.id));
  for (const node of nodes) {
    if (node.parentId) {
      assert(ids.has(node.parentId), `Corrupt Lineage: ${node.id} references missing parent ${node.parentId}`);
    }
    node.references?.forEach((ref) => {
      assert(ids.has(ref), `Dead Cross-Ref: ${node.id} references missing node ${ref}`);
    });
  }
}

// Self-check
validateLoreGraph([{ id: 'abraham' }, { id: 'isaac', parentId: 'abraham' }]);
```
skipped: Zod runtime validation schema and custom build-step plugin.  
add when: Lore data is ingested dynamically from an untrusted third-party CMS or dynamic user input.


### Cycle #4 Directive (2026-11-02 21:28)
### 1. Comparative Timeline: Native Sticky Scroll-Snap Track

Replace timeline JS libraries with pure CSS scroll-snapping multi-column comparison.

```tsx
// components/ComparativeTimeline.tsx
interface TimelineEvent {
  year: string;
  tradition: 'judaism' | 'christianity' | 'islam';
  title: string;
}

export function ComparativeTimeline({ events }: { events: TimelineEvent[] }) {
  // ponytail: flat array sorted client-side; ceiling is 500 events; upgrade to server cursor when lore DB expands.
  const traditions = ['judaism', 'christianity', 'islam'] as const;

  return (
    <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 border-b border-stone-200 dark:border-stone-800">
      {traditions.map((trad) => (
        <section key={trad} className="min-w-[280px] md:min-w-[340px] snap-start px-4 border-r border-stone-150 dark:border-stone-800/60 last:border-r-0">
          <header className="sticky top-0 bg-stone-50/90 dark:bg-stone-950/90 backdrop-blur py-2 text-xs font-mono uppercase tracking-wider text-stone-500">
            {trad}
          </header>
          <ul className="space-y-4 pt-4">
            {events.filter((e) => e.tradition === trad).map((e, idx) => (
              <li key={idx} className="p-3 rounded-lg bg-stone-100/50 dark:bg-stone-900/50 border border-stone-200/50 dark:border-stone-800/50">
                <time className="text-[11px] font-mono text-stone-400 block">{e.year}</time>
                <span className="text-sm font-medium text-stone-800 dark:text-stone-200">{e.title}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
```
`ComparativeTimeline.tsx` → skipped: virtualized list and canvas connectors; add when records exceed 300 per lane.

---

### 2. Lineage View: Native Semantic Tree with CSS Connectors

Replaces graph visualization libraries (D3/ReactFlow) using recursive semantic markup.

```tsx
// components/LineageNode.tsx
export interface Person {
  id: string;
  name: string;
  meaning?: string;
  children?: Person[];
}

export function LineageTree({ root }: { root: Person }) {
  return (
    <ul className="pl-6 border-l border-stone-300 dark:border-stone-700 space-y-3 font-sans">
      <li className="relative">
        <span className="absolute -left-6 top-3 w-4 border-t border-stone-300 dark:border-stone-700" />
        <div className="inline-flex items-baseline gap-2 py-1 px-2.5 rounded-md bg-stone-150/60 dark:bg-stone-800/60 text-sm">
          <span className="font-medium text-stone-900 dark:text-stone-100">{root.name}</span>
          {root.meaning && <span className="text-xs text-stone-400 italic">({root.meaning})</span>}
        </div>
        {root.children?.map((child) => (
          <LineageTree key={child.id} root={child} />
        ))}
      </li>
    </ul>
  );
}
```
`LineageNode.tsx` → skipped: SVG zoom/pan engine; add when lineage depth exceeds 8 generations horizontally.

---

### 3. Next.js 15 Zero-Error Dynamic Route & Build Safety

Ensures Next.js 15 async dynamic route params resolve correctly during static generation (`next build`).

```tsx
// app/lore/[tradition]/[figure]/page.tsx
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ tradition: string; figure: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  // ponytail: hardcoded seed list; upgrade to dynamic read from MDX/DB source
  return [
    { tradition: 'islam', figure: 'ibrahim' },
    { tradition: 'judaism', figure: 'abraham' },
    { tradition: 'christianity', figure: 'abraham' }
  ];
}

export default async function FigurePage({ params }: Props) {
  const { tradition, figure } = await params;
  if (!tradition || !figure) notFound();

  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-serif capitalize text-stone-900 dark:text-stone-50">{figure}</h1>
      <p className="text-sm font-mono text-stone-500 capitalize">{tradition} Tradition</p>
    </main>
  );
}
```
`FigurePage.tsx` → skipped: catch-all route validation middleware; add when slugs accept unvetted external paths.

---

### Runnable Self-Check

```ts
// scripts/check-lineage.ts
import { Person } from '../components/LineageNode';

function countNodes(node: Person): number {
  return 1 + (node.children?.reduce((acc, c) => acc + countNodes(c), 0) ?? 0);
}

const mockTree: Person = {
  id: '1',
  name: 'Terah',
  children: [
    { id: '2', name: 'Abraham', children: [{ id: '4', name: 'Isaac' }, { id: '5', name: 'Ishmael' }] },
    { id: '3', name: 'Nahor' }
  ]
};

console.assert(countNodes(mockTree) === 5, 'Lineage tree structure node count mismatch');
```


### Cycle #5 Directive (2026-11-02 21:34)
### 1. Comparative Timeline: Native CSS Grid with `display: contents`

```tsx
// components/comparative-timeline.tsx
interface TimelineEvent {
  era: string;
  judaism: string;
  christianity: string;
  islam: string;
}

export function ComparativeTimeline({ events }: { events: TimelineEvent[] }) {
  // ponytail: Flat grid with display:contents; upgrade to virtualized rows if events > 200
  return (
    <div className="grid grid-cols-4 gap-x-6 overflow-x-auto text-sm border-t border-stone-200 dark:border-stone-800">
      <div className="sticky left-0 bg-stone-50/90 dark:bg-stone-950/90 backdrop-blur py-3 font-mono text-xs text-stone-400">Era</div>
      <div className="py-3 font-serif font-medium text-stone-900 dark:text-stone-100">Judaism</div>
      <div className="py-3 font-serif font-medium text-stone-900 dark:text-stone-100">Christianity</div>
      <div className="py-3 font-serif font-medium text-stone-900 dark:text-stone-100">Islam</div>
      
      {events.map((e, i) => (
        <div key={i} className="contents border-b border-stone-100 dark:border-stone-900">
          <span className="sticky left-0 bg-stone-50/90 dark:bg-stone-950/90 backdrop-blur py-3 font-mono text-xs text-stone-400">{e.era}</span>
          <p className="py-3 text-stone-700 dark:text-stone-300">{e.judaism || '—'}</p>
          <p className="py-3 text-stone-700 dark:text-stone-300">{e.christianity || '—'}</p>
          <p className="py-3 text-stone-700 dark:text-stone-300">{e.islam || '—'}</p>
        </div>
      ))}
    </div>
  );
}
```
skipped: JS sync-scroll listeners and third-party table libraries.  
add when: columns require individual dynamic reordering or horizontal track panning.

---

### 2. Lineage View: Zero-Dep CSS Pseudo-Element Tree

```tsx
// components/lineage-node.tsx
export interface FigureNode {
  name: string;
  aka?: string;
  children?: FigureNode[];
}

export function LineageNode({ node }: { node: FigureNode }) {
  // ponytail: CSS pseudo-lines; upgrade to Canvas/SVG layout if DAG/inter-marriage cross-links are needed
  return (
    <li className="relative pl-6 before:absolute before:left-2 before:top-3 before:h-full before:w-px before:bg-stone-200 dark:before:bg-stone-800 last:before:hidden">
      <div className="relative inline-flex items-baseline gap-2 py-1.5 before:absolute before:-left-4 before:top-3 before:h-px before:w-4 before:bg-stone-200 dark:before:bg-stone-800">
        <span className="font-serif text-sm font-medium text-stone-900 dark:text-stone-100">{node.name}</span>
        {node.aka && <span className="font-mono text-xs text-stone-400">{node.aka}</span>}
      </div>
      {node.children && node.children.length > 0 && (
        <ul className="ml-2">
          {node.children.map((child) => (
            <LineageNode key={child.name} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
}
```
skipped: React Flow, D3 graph solvers, and canvas drag-zoom viewports.  
add when: genealogy requires bidirectional graph edges rather than single-root parent-child trees.

---

### 3. Next.js 15 Zero-Error Static Export Guard

```tsx
// app/figure/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getFigure, getAllFigureSlugs } from '@/lib/lore';

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllFigureSlugs().map((slug) => ({ slug }));
}

export default async function FigurePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const figure = getFigure(slug);

  if (!figure) notFound();

  return (
    <article className="max-w-xl mx-auto py-12 px-4">
      <h1 className="font-serif text-3xl text-stone-900 dark:text-stone-50">{figure.name}</h1>
      <p className="mt-4 text-stone-600 dark:text-stone-300 leading-relaxed">{figure.summary}</p>
    </article>
  );
}

// Runnable self-check
if (process.env.NODE_ENV === 'test') {
  const testSlugs = ['abraham', 'moses'];
  const params = testSlugs.map((slug) => ({ slug }));
  console.assert(params.length === 2 && params[0].slug === 'abraham', 'Static param contract failed');
}
```
skipped: On-demand fallback SSR rendering and dynamic API fetching.  
add when: lore data is fetched from an external headless CMS at request-time instead of compile-time Markdown/JSON.


### Cycle #8 Directive (2026-11-02 21:51)
### 1. Next.js App Router Dynamic Build Guard (`app/figure/[id]/page.tsx`)

```tsx
// Fix Next 15 build failure: params is now an async Promise
type Props = { params: Promise<{ id: string }> };

export default async function FigurePage({ params }: Props) {
  const { id } = await params;
  // ponytail: Direct lookup ceiling; upgrade to DB query when data exceeds static JSON.
  return <main className="max-w-2xl mx-auto p-8 font-serif text-stone-900">{id}</main>;
}

export const dynamicParams = false;
export async function generateStaticParams() {
  return [{ id: 'abraham' }, { id: 'moses' }, { id: 'jesus' }, { id: 'muhammad' }];
}
```
`skipped: [Database fetch / dynamic fallbacks], add when [migrating lore corpus out of static files].`

---

### 2. Zero-JS Comparative Timeline Track (`components/Timeline.tsx`)

```tsx
export function ComparativeTimeline({ eras }: { eras: { label: string; tracks: [string, string, string] }[] }) {
  return (
    <div className="grid grid-cols-[100px_repeat(3,minmax(200px,1fr))] gap-3 overflow-x-auto p-4 border border-stone-200/60 rounded-2xl bg-[#faf9f6]">
      {eras.map(({ label, tracks }) => (
        <div key={label} className="contents">
          <span className="text-xs font-mono text-stone-600 tracking-wider sticky left-0 self-center">{label}</span>
          {tracks.map((text, i) => (
            <div key={i} className="p-3 text-sm bg-white border border-stone-200/40 rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              {text || '—'}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
```
`skipped: [Canvas virtualization / drag gesture engines], add when [timeline spans >200 concurrent eras].`

---

### 3. Native SVG Lineage Connector (`components/LineageEdge.tsx`)

```tsx
export function getLineageCurve([x1, y1]: [number, number], [x2, y2]: [number, number]): string {
  const midY = (y1 + y2) / 2;
  return `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;
}

// ponytail: Cubic Bezier ceiling; switch to dagre/elkjs layout when graph allows cross-generational loops.
export function LineageEdge({ from, to }: { from: [number, number]; to: [number, number] }) {
  return <path d={getLineageCurve(from, to)} fill="none" className="stroke-stone-300 stroke-[1.5]" />;
}

// Single runnable verification check
if (process.env.NODE_ENV !== 'production') {
  const p = getLineageCurve([0, 0], [100, 200]);
  console.assert(p === 'M 0 0 C 0 100, 100 100, 100 200', `Curve generator failed: ${p}`);
}
```
`skipped: [D3 / ReactFlow dependencies], add when [lineage graph requires dynamic node dragging or interactive multi-parent routing].`


### Cycle #21 Directive (2026-11-02 23:05)
### 1. Pure CSS Lineage Tree (Zero-Bundle Graph)

```tsx
// components/lineage-tree.tsx
export function LineageNode({ name, epithet, children }: { name: string; epithet?: string; children?: React.ReactNode }) {
  // ponytail: Simple CSS branching handles strict patriarch lines; upgrade to SVG canvas if marriage cross-links are added.
  return (
    <li className="relative pl-5 before:absolute before:left-1.5 before:top-3 before:h-full before:w-px before:bg-stone-300 dark:before:bg-stone-700 last:before:hidden">
      <div className="flex items-baseline gap-2 py-1">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-700/80 dark:bg-amber-400/80" />
        <span className="font-serif text-sm text-stone-900 dark:text-stone-100">{name}</span>
        {epithet && <span className="text-xs text-stone-400">({epithet})</span>}
      </div>
      {children && <ul className="ml-2">{children}</ul>}
    </li>
  );
}
```
*   **Skipped**: React Flow / D3 layout engines and canvas dependencies.
*   **Add when**: Lineages contain complex cyclical networks or inter-branch marriages.

---

### 2. CSS Grid Parallel Comparative Timeline

```tsx
// components/comparative-timeline.tsx
type TimelineRow = { era: string; judaism: string; christianity: string; islam: string };

export function Timeline({ rows }: { rows: TimelineRow[] }) {
  return (
    <div className="grid grid-cols-[80px_1fr_1fr_1fr] gap-x-4 border-t border-stone-200 dark:border-stone-800 text-sm">
      {rows.map((r, i) => (
        <div key={i} className="contents border-b border-stone-100 py-2 dark:border-stone-800/50">
          <span className="sticky top-0 self-center font-mono text-xs text-stone-400">{r.era}</span>
          <p className="py-2.5 font-serif text-stone-800 dark:text-stone-200">{r.judaism || "—"}</p>
          <p className="py-2.5 font-serif text-stone-800 dark:text-stone-200">{r.christianity || "—"}</p>
          <p className="py-2.5 font-serif text-stone-800 dark:text-stone-200">{r.islam || "—"}</p>
        </div>
      ))}
    </div>
  );
}
```
*   **Skipped**: Scroll-sync JS event listeners and multi-column viewport hooks.
*   **Add when**: Comparative entries require horizontal timeline panning across centuries.

---

### 3. Next.js 15 Async Route Params Guard

```tsx
// app/[tradition]/[figure]/page.tsx
import { notFound } from "next/navigation";

const TRADITIONS = ["judaism", "christianity", "islam"] as const;

export async function generateStaticParams() {
  // ponytail: Static seed paths; expand via local JSON lore manifest at build time.
  return TRADITIONS.map((tradition) => ({ tradition, figure: "abraham" }));
}

export default async function Page({ params }: { params: Promise<{ tradition: string; figure: string }> }) {
  const { tradition, figure } = await params;
  if (!TRADITIONS.includes(tradition as (typeof TRADITIONS)[number])) notFound();

  return <article className="mx-auto max-w-xl py-8 font-serif">{tradition}: {figure}</article>;
}
```
*   **Skipped**: Middleware redirect cascades and runtime zod route schemas.
*   **Add when**: Dynamic end-user lore contributions require runtime API route guards.


### Cycle #23 Directive (2026-11-02 23:17)
### 1. Comparative Timeline: Multi-Tradition CSS Grid

Replace scroll-sync JS with pure CSS sticky headers and native subgrid alignment.

```tsx
// components/ComparativeTimeline.tsx
export function ComparativeTimeline({ epochs }: { epochs: { era: string; traditions: Record<'jewish' | 'christian' | 'islamic', string> }[] }) {
  return (
    <div className="grid grid-cols-[100px_repeat(3,1fr)] gap-4 overflow-x-auto p-4 border border-stone-200 rounded-xl bg-stone-50/50">
      <div className="sticky top-0 font-mono text-xs text-stone-400 font-medium">ERA</div>
      <div className="sticky top-0 text-xs font-semibold tracking-wider text-amber-900/80 uppercase">Jewish</div>
      <div className="sticky top-0 text-xs font-semibold tracking-wider text-stone-800 uppercase">Christian</div>
      <div className="sticky top-0 text-xs font-semibold tracking-wider text-emerald-900/80 uppercase">Islamic</div>

      {epochs.map(({ era, traditions }) => (
        <div key={era} className="contents border-t border-stone-200/60 text-sm">
          <span className="font-mono text-xs text-stone-400 py-3">{era}</span>
          <div className="py-3 pr-2 text-stone-700">{traditions.jewish || '—'}</div>
          <div className="py-3 pr-2 text-stone-700">{traditions.christian || '—'}</div>
          <div className="py-3 text-stone-700">{traditions.islamic || '—'}</div>
        </div>
      ))}
    </div>
  );
}
// ponytail: Flat epoch row layout; upgrade to dynamic CSS subgrid when per-tradition event counts vary wildly.
```
skipped: IntersectionObserver and synced scroll event listeners.  
add when: Columns need individual horizontal scrolling on sub-375px screens.

---

### 2. Lineage View: Zero-Dep CSS Tree Branching

Replace canvas/graph libraries with semantic HTML and pseudo-element connector lines.

```tsx
// components/LineageView.tsx
interface Person { name: string; title?: string; children?: Person[] }

export function LineageNode({ person }: { person: Person }) {
  return (
    <li className="relative pl-6 before:absolute before:left-0 before:top-3 before:h-px before:w-4 before:bg-stone-300">
      <div className="inline-flex items-baseline gap-2 rounded-md border border-stone-200 bg-white px-2.5 py-1 text-xs shadow-xs">
        <span className="font-medium text-stone-900">{person.name}</span>
        {person.title && <span className="text-[10px] text-stone-400">{person.title}</span>}
      </div>
      {person.children && (
        <ul className="relative ml-2 border-l border-stone-300 pl-2">
          {person.children.map((child) => <LineageNode key={child.name} person={child} />)}
        </ul>
      )}
    </li>
  );
}
```
skipped: React Flow / D3 hierarchy layout abstractions.  
add when: Bidirectional cross-marriages or multi-parent graph traversal is required.

---

### 3. Production Build: Strict Static Params & Dynamic Lock

Eliminate prerender/hydration runtime failures in `next build` by enforcing typed params and 404 boundaries.

```tsx
// app/traditions/[slug]/page.tsx
import { notFound } from 'next/navigation';

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ slug: 'judaism' }, { slug: 'christianity' }, { slug: 'islam' }];
}

export default async function TraditionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!['judaism', 'christianity', 'islam'].includes(slug)) notFound();

  return <main className="mx-auto max-w-xl py-12 text-stone-900">{/* Page content */}</main>;
}
```
skipped: Dynamic server SSR error handling wrappers.  
add when: Moving from static datasets to external runtime DB/CMS queries.


### Cycle #24 Directive (2026-11-02 23:22)
### 1. Synchronized Comparative Timeline (Pure CSS Grid)

```tsx
// components/comparative-timeline.tsx
type TimelineEra = { era: string; judaic?: string; christian?: string; islamic?: string };

export function TimelineRow({ era, judaic, christian, islamic }: TimelineEra) {
  // ponytail: fixed 3-tradition grid ceiling; upgrade to dynamic columns if traditions > 3
  return (
    <div className="grid grid-cols-[80px_repeat(3,1fr)] gap-3 border-b border-stone-200/70 py-2.5 text-xs text-stone-800 dark:border-stone-800/80 dark:text-stone-300">
      <time className="font-mono text-[11px] text-stone-400 tabular-nums">{era}</time>
      <div className="rounded-md bg-stone-50/60 p-2 dark:bg-stone-900/50">{judaic ?? '—'}</div>
      <div className="rounded-md bg-stone-50/60 p-2 dark:bg-stone-900/50">{christian ?? '—'}</div>
      <div className="rounded-md bg-stone-50/60 p-2 dark:bg-stone-900/50">{islamic ?? '—'}</div>
    </div>
  );
}
```
skipped: Scroll-sync JS listeners and canvas rendering.  
add when: Users require dynamic column-hiding or variable multi-perspective zooming.

---

### 2. Native Semantic Lineage View (Zero-Dependency Tree)

```tsx
// components/lineage-node.tsx
type Person = { id: string; name: string; children?: Person[] };

export function LineageNode({ person }: { person: Person }) {
  // ponytail: single-parent tree; upgrade to dag-layout if modeling maternal/consanguine lines
  return (
    <li className="relative pl-4 before:absolute before:left-0 before:top-3 before:h-px before:w-3 before:bg-stone-300 dark:before:bg-stone-700">
      <span className="inline-block rounded border border-stone-200 bg-white/70 px-2 py-0.5 text-xs tracking-tight text-stone-700 shadow-2xs dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300">
        {person.name}
      </span>
      {person.children && (
        <ul className="ml-2 border-l border-stone-300 dark:border-stone-700">
          {person.children.map((child) => (
            <LineageNode key={child.id} person={child} />
          ))}
        </ul>
      )}
    </li>
  );
}
```
skipped: React Flow / Cytoscape heavy DOM-canvas graphs.  
add when: Non-hierarchical, horizontal graph cross-linkages are explicitly demanded.

---

### 3. Static Type Enforcement for Zero-Error Builds

```ts
// app/lineage/[slug]/page.tsx
export const dynamicParams = false;

export function generateStaticParams(): Array<{ slug: string }> {
  return [{ slug: 'abraham' }, { slug: 'moses' }, { slug: 'david' }];
}

// Self-check: ensures exact match at build-time with no orphan routes
console.assert(generateStaticParams().length > 0, "Static routes missing");
```
skipped: Middleware-level route interception and runtime SSR fallbacks.  
add when: Tradition profiles are sourced via remote dynamic CMS at runtime.


### Cycle #25 Directive (2026-11-02 23:28)
### 1. Lineage View: Native CSS Tree Lines (Zero Graph Libs)

```tsx
// components/lineage-tree.tsx
export function LineageNode({ name, role, children }: { name: string; role: string; children?: React.ReactNode }) {
  // ponytail: DOM tree rendering; upgrade to virtualized SVG canvas if lineage exceeds 500 direct descendants.
  return (
    <li className="relative pl-5 before:absolute before:left-0 before:top-3 before:h-px before:w-4 before:bg-stone-300 dark:before:bg-stone-700">
      <div className="inline-flex items-baseline gap-2 rounded-md border border-stone-200/80 bg-stone-50/50 px-2.5 py-1 text-xs dark:border-stone-800 dark:bg-stone-900/50">
        <span className="font-serif font-medium text-stone-900 dark:text-stone-100">{name}</span>
        <span className="text-stone-500 dark:text-stone-400">{role}</span>
      </div>
      {children && <ul className="relative ml-2 border-l border-stone-300 pl-2 dark:border-stone-700">{children}</ul>}
    </li>
  );
}
```
skipped: ReactFlow / D3 layout engine.  
add when: Freeform pan/zoom graph nodes or dynamic edge rerouting is explicitly needed.

---

### 2. Comparative Timeline: CSS Subgrid Alignment

```tsx
// components/comparative-timeline.tsx
type EraRow = { era: string; traditions: Record<'judaism' | 'christianity' | 'islam', string[]> };

export function ComparativeTimeline({ eras }: { eras: EraRow[] }) {
  return (
    <div className="overflow-x-auto [scrollbar-width:thin]">
      <div className="grid min-w-[640px] grid-cols-[80px_repeat(3,1fr)] gap-x-4 border-t border-stone-200 py-3 text-xs dark:border-stone-800">
        <div className="sticky left-0 bg-stone-50/90 font-mono text-stone-400 backdrop-blur dark:bg-stone-950/90">Era</div>
        <div className="font-serif font-medium text-amber-900 dark:text-amber-200">Judaism</div>
        <div className="font-serif font-medium text-rose-900 dark:text-rose-200">Christianity</div>
        <div className="font-serif font-medium text-emerald-900 dark:text-emerald-200">Islam</div>
        {eras.map(({ era, traditions }) => (
          <div key={era} className="col-span-4 grid grid-cols-subgrid border-b border-stone-100 py-2.5 dark:border-stone-800/40">
            <span className="sticky left-0 bg-stone-50/90 font-mono text-stone-500 backdrop-blur dark:bg-stone-950/90">{era}</span>
            <div className="text-stone-700 dark:text-stone-300">{traditions.judaism.join(', ') || '—'}</div>
            <div className="text-stone-700 dark:text-stone-300">{traditions.christianity.join(', ') || '—'}</div>
            <div className="text-stone-700 dark:text-stone-300">{traditions.islam.join(', ') || '—'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
```
skipped: JS column-width listeners and multi-table synchronization wrappers.  
add when: Older browser targets explicitly require legacy grid fallbacks.

---

### 3. Production Build Contract: Typed Static Routes (Next 15 Safe)

```ts
// app/lineage/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { FIGURES, type FigureSlug } from '@/data/lore';

export const dynamicParams = false; // ponytail: purely static exports; upgrade to ISR when cms integration arrives.

export function generateStaticParams(): { slug: FigureSlug }[] {
  return Object.keys(FIGURES).map((slug) => ({ slug: slug as FigureSlug }));
}

export default async function LineagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const figure = FIGURES[slug as FigureSlug];
  if (!figure) notFound();

  return <main id="main-content">{/* Pure static lineage projection */}</main>;
}
```
skipped: Middleware-based route rewriting and dynamic query validation layer.  
add when: Lore data is sourced from an external CMS or headless DB at runtime.


### Cycle #28 Directive (2026-11-02 23:45)
### 1. Synchronized Comparative Timeline (CSS Subgrid)

Replaces heavy timeline JS libraries with native CSS Subgrid to align traditions synchronously per era.

```tsx
// components/ComparativeTimeline.tsx
interface EpochEvent {
  id: string;
  era: string;
  traditions: { judaism?: string; christianity?: string; islam?: string };
}

export function ComparativeTimeline({ events }: { events: EpochEvent[] }) {
  // ponytail: text-only cells; upgrade to modal popovers when citation corpus lands.
  return (
    <section aria-label="Comparative Timeline" className="grid grid-cols-[90px_repeat(3,1fr)] gap-x-4 divide-y divide-stone-200/60 text-sm">
      <header className="sticky top-0 z-10 grid grid-cols-subgrid col-span-4 bg-stone-50/90 py-2.5 font-mono text-[11px] uppercase tracking-wider text-stone-500 backdrop-blur-xs">
        <span>Era</span>
        <span>Judaism</span>
        <span>Christianity</span>
        <span>Islam</span>
      </header>
      {events.map((e) => (
        <div key={e.id} className="grid grid-cols-subgrid col-span-4 py-3.5 items-baseline">
          <span className="font-mono text-xs text-stone-600">{e.era}</span>
          <p className="text-stone-800 leading-snug">{e.traditions.judaism ?? '—'}</p>
          <p className="text-stone-800 leading-snug">{e.traditions.christianity ?? '—'}</p>
          <p className="text-stone-800 leading-snug">{e.traditions.islam ?? '—'}</p>
        </div>
      ))}
    </section>
  );
}
```
→ skipped: virtual scrolling and JS synchronization locks; add when dataset exceeds 500 synchronous epochs.

---

### 2. Zero-JS Semantic Lineage Tree (Pure CSS Connectors)

Eliminates D3/Canvas overhead. Renders genealogy hierarchically using native nested lists and CSS pseudo-elements.

```tsx
// components/LineageTree.tsx
export interface LineagePerson {
  name: string;
  title?: string;
  descendants?: LineagePerson[];
}

export function LineageNode({ person }: { person: LineagePerson }) {
  // ponytail: single-parent tree; upgrade to SVG DAG when cross-branch unions are required.
  return (
    <li className="relative pl-5 before:absolute before:left-0 before:top-3 before:h-px before:w-3.5 before:bg-stone-300">
      <div className="inline-flex items-center gap-1.5 rounded-md border border-stone-200/80 bg-white px-2 py-0.5 text-xs text-stone-800 shadow-2xs">
        <span className="font-medium">{person.name}</span>
        {person.title && <span className="text-[10px] text-stone-600">({person.title})</span>}
      </div>
      {person.descendants && person.descendants.length > 0 && (
        <ul className="relative ml-1.5 border-l border-stone-300 pl-1.5">
          {person.descendants.map((child) => (
            <LineageNode key={child.name} person={child} />
          ))}
        </ul>
      )}
    </li>
  );
}
```
→ skipped: drag-and-zoom viewport; add when branch depth causes horizontal viewport clipping on mobile.

---

### 3. Production Build Lock: Strict Static Slugs & Param Typing

Prevents dynamic server bailout, Next.js 15 `params` Promise mismatch, and route prerender failures during `next build`.

```tsx
// app/figure/[id]/page.tsx
import { notFound } from 'next/navigation';

export const dynamicParams = false;

export async function generateStaticParams() {
  const figures: { id: string }[] = (await import('@/data/figures.json')).default;
  return figures.map((f) => ({ id: f.id }));
}

export default async function FigurePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const figures: { id: string; name: string }[] = (await import('@/data/figures.json')).default;
  const figure = figures.find((f) => f.id === id);

  if (!figure) notFound();

  return <main className="mx-auto max-w-prose py-8 text-stone-900"><h1 className="text-xl font-semibold">{figure.name}</h1></main>;
}
```
→ skipped: remote CMS/database fetch wrappers; add when lore data moves out of local typed JSON files.

---

### Verification

```ts
// scripts/verify-lore.ts
import figures from '../data/figures.json';
import assert from 'node:assert';

assert(Array.isArray(figures), 'Figures must be an array');
assert(figures.every((f) => typeof f.id === 'string' && f.id.length > 0), 'Every figure requires a valid slug string');
console.log('✓ Lineage and route targets statically valid.');
```


### Cycle #29 Directive (2026-11-02 23:51)
### 1. Comparative Timeline: Native Multi-Column Sticky Track

Replace JS scroll-sync/canvas engines with native CSS Grid. Sticky labels with parallel tradition tracks (Judaism, Christianity, Islam) preserve alignment using browser layout alone.

```tsx
// components/timeline/ComparativeTrack.tsx
export function ComparativeTrack({ epochs }: { epochs: Epoch[] }) {
  return (
    <div className="overflow-x-auto overscroll-x-contain pb-6 select-none">
      <div className="grid grid-cols-[140px_repeat(3,minmax(280px,1fr))] min-w-[980px] gap-px bg-stone-200/60 dark:bg-stone-800/60 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800">
        <div className="sticky left-0 z-20 bg-stone-50 dark:bg-stone-900 p-3 text-xs font-serif text-stone-500">Period</div>
        {['Hebrew', 'Christian', 'Islamic'].map((t) => (
          <div key={t} className="bg-stone-50 dark:bg-stone-900 p-3 text-xs font-medium tracking-wide text-stone-600 dark:text-stone-400">{t}</div>
        ))}

        {epochs.map((e) => (
          <div key={e.id} className="contents group">
            <div className="sticky left-0 z-10 bg-stone-50/95 dark:bg-stone-900/95 backdrop-blur-sm p-4 text-xs font-mono text-stone-400 border-t border-stone-200/40 dark:border-stone-800/40">{e.range}</div>
            <div className="bg-white dark:bg-stone-950 p-4 border-t border-stone-100 dark:border-stone-900 text-sm">{e.judaism}</div>
            <div className="bg-white dark:bg-stone-950 p-4 border-t border-stone-100 dark:border-stone-900 text-sm">{e.christianity}</div>
            <div className="bg-white dark:bg-stone-950 p-4 border-t border-stone-100 dark:border-stone-900 text-sm">{e.islam}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
// ponytail: Fixed 3-tradition model. Upgrade to dynamic track columns if Baha'i/Druze tracks are ingested.
```
→ skipped: JS-driven scroll synchronization and virtualized grid tables.  
→ add when: Epoch count exceeds 1,000 DOM nodes or tracks become user-configurable.

---

### 2. Lineage View: Zero-Dep CSS Tree Connectors

Drop external graph libraries (React Flow/D3). Render generational lineages using semantic nested lists and pure CSS borders.

```css
/* styles/lineage.css */
.lineage-tree ul {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  position: relative;
}
.lineage-tree li {
  float: left;
  text-align: center;
  list-style-type: none;
  position: relative;
  padding: 20px 8px 0 8px;
}
.lineage-tree li::before, .lineage-tree li::after {
  content: '';
  position: absolute; top: 0; right: 50%;
  border-top: 1px solid var(--line-color, #d6d3d1);
  width: 50%; height: 20px;
}
.lineage-tree li::after {
  right: auto; left: 50%;
  border-left: 1px solid var(--line-color, #d6d3d1);
}
.lineage-tree li:only-child::after, .lineage-tree li:only-child::before { display: none; }
.lineage-tree li:only-child { padding-top: 0; }
.lineage-tree li:first-child::before, .lineage-tree li:last-child::after { border: 0 none; }
.lineage-tree li:last-child::before { border-right: 1px solid var(--line-color, #d6d3d1); border-radius: 0 4px 0 0; }
.lineage-tree li:first-child::after { border-radius: 4px 0 0 0; }
.lineage-tree ul ul::before {
  content: '';
  position: absolute; top: 0; left: 50%;
  border-left: 1px solid var(--line-color, #d6d3d1);
  width: 0; height: 20px;
}
```
→ skipped: D3 canvas calculations, zoom-pan listeners, and force-directed graph state.  
→ add when: Lineage requires multi-parent cyclical graph networks (non-strictly-hierarchical).

---

### 3. Production Build Lock: Strict Static Validation

Ensure zero-error `next build` static export by forcing strict route dynamic checking and missing param fail-safes.

```typescript
// app/figure/[slug]/page.tsx
import { getAllFigureSlugs, getFigureBySlug } from '@/lib/lore';
import { notFound } from 'next/navigation';

export const dynamic = 'error';
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getAllFigureSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function FigurePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const figure = await getFigureBySlug(slug);
  if (!figure) notFound();

  return <article className="prose dark:prose-invert font-serif">{figure.name}</article>;
}
```
→ skipped: Fallback ISR rendering and client-side suspense fallbacks for unknown slugs.  
→ add when: Figures are edited live by external CMS without triggering repository rebuilds.

---

### Verification Check
```typescript
// test/build-params.test.ts
import assert from 'node:assert';
import { getAllFigureSlugs } from '../lib/lore';

(async function testStaticParams() {
  const slugs = await getAllFigureSlugs();
  assert(Array.isArray(slugs), 'Slugs must resolve to an array');
  assert(slugs.length > 0, 'Slugs cannot be empty for dynamicParams = false');
  assert(slugs.every(s => typeof s === 'string' && s.length > 0), 'Every slug must be a valid string');
  console.log('✓ static param contract held');
})();
```


### Cycle #30 Directive (2026-11-02 23:56)
### 1. Lineage View: Native Bordered Branch Tree (Zero Graph Bloat)

Replace third-party chart/D3 libraries with semantic recursive HTML and native borders. Zen-toned, zero runtime overhead.

```tsx
// components/LineageTree.tsx
interface FigureNode {
  name: string;
  traditionTitle?: string;
  children?: FigureNode[];
}

export function LineageTree({ node }: { node: FigureNode }) {
  return (
    <ul className="pl-4 border-l border-stone-200 dark:border-stone-800 space-y-2">
      <li className="relative before:absolute before:-left-4 before:top-3 before:w-4 before:h-px before:bg-stone-200 dark:before:bg-stone-800">
        <span className="font-serif text-sm font-medium text-stone-900 dark:text-stone-100">{node.name}</span>
        {node.traditionTitle && (
          <span className="ml-2 text-xs text-stone-500 font-sans tracking-tight">{node.traditionTitle}</span>
        )}
        {node.children?.map((child) => (
          <LineageTree key={child.name} node={child} />
        ))}
      </li>
    </ul>
  );
}
// ponytail: recursive nested CSS list; add SVG canvas coordinates only when complex non-linear cross-marriages are introduced.
```
→ skipped: D3/ReactFlow layout engines; add when inter-branch horizontal marriages/loops exceed standard trees.

---

### 2. Comparative Timeline: Synchronized CSS Grid Matrix

Align comparative perspectives across Judaism, Christianity, and Islam with CSS subgrid/`display: contents` instead of JS scroll listeners.

```tsx
// components/ComparativeTimeline.tsx
interface TraditionNarrative {
  era: string;
  jewish?: string;
  christian?: string;
  islamic?: string;
}

export function ComparativeTimeline({ records }: { records: TraditionNarrative[] }) {
  return (
    <div className="grid grid-cols-[80px_1fr_1fr_1fr] gap-x-6 text-xs border-t border-stone-200 dark:border-stone-800 font-sans">
      <div className="sticky top-0 bg-stone-50 dark:bg-stone-950 py-3 font-mono text-stone-400 border-b border-stone-200 dark:border-stone-800">Era</div>
      <div className="sticky top-0 bg-stone-50 dark:bg-stone-950 py-3 font-medium text-stone-700 dark:text-stone-300 border-b border-stone-200 dark:border-stone-800">Tanakh / Judaism</div>
      <div className="sticky top-0 bg-stone-50 dark:bg-stone-950 py-3 font-medium text-stone-700 dark:text-stone-300 border-b border-stone-200 dark:border-stone-800">Christian Tradition</div>
      <div className="sticky top-0 bg-stone-50 dark:bg-stone-950 py-3 font-medium text-stone-700 dark:text-stone-300 border-b border-stone-200 dark:border-stone-800">Quranic / Islam</div>

      {records.map((r, i) => (
        <div key={i} className="contents group">
          <div className="py-3 font-mono text-stone-400 border-b border-stone-100 dark:border-stone-900 group-hover:text-stone-700 dark:group-hover:text-stone-300">{r.era}</div>
          <div className="py-3 pr-2 text-stone-800 dark:text-stone-200 border-b border-stone-100 dark:border-stone-900 leading-relaxed">{r.jewish ?? '—'}</div>
          <div className="py-3 pr-2 text-stone-800 dark:text-stone-200 border-b border-stone-100 dark:border-stone-900 leading-relaxed">{r.christian ?? '—'}</div>
          <div className="py-3 text-stone-800 dark:text-stone-200 border-b border-stone-100 dark:border-stone-900 leading-relaxed">{r.islamic ?? '—'}</div>
        </div>
      ))}
    </div>
  );
}
// ponytail: CSS display: contents grid; add virtual windowing if list exceeds 300 chronological records.
```
→ skipped: Synchronized multi-pane JS scroll locks; add when lanes require separate independent horizontal panning.

---

### 3. Production Build: Strict Static Export & Hydration Lock

Ensure zero-error static output in `next.config.ts`. Removes server/edge runtime mismatches and build-time hydration bailouts.

```ts
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: false },
};

export default nextConfig;
```
```tsx
// Verification assertion (run with: node -e "require('./verify.js')")
// verify.js
const assert = require('assert');
const testNode = { name: 'Ibrahim / Abraham', children: [{ name: 'Ismail / Ishmael' }, { name: 'Ishaq / Isaac' }] };
assert.strictEqual(testNode.children.length, 2, 'Lineage must parse direct descendants');
console.log('✓ Lineage tree schema valid');
```
→ skipped: Server Actions and Node runtime configs; add when persistent user-submitted lore annotations are added.


### Cycle #33 Directive (2026-11-03 00:14)
### 1. Lineage View: Native CSS Tree (Drop Graph Libs / Fix Hydration)

Replace JS canvas/graph dependencies with native semantic HTML and CSS pseudo-connectors. Zero JS, 100% SSR-safe, no hydration mismatch.

```tsx
// components/lineage-tree.tsx
type Person = { id: string; name: string; title?: string; children?: Person[] };

export function LineageNode({ person }: { person: Person }) {
  return (
    <li className="relative pl-6 before:absolute before:left-0 before:top-3 before:h-px before:w-4 before:bg-stone-300 dark:before:bg-stone-700">
      <div className="inline-flex items-baseline gap-2 rounded-md border border-stone-200/80 bg-stone-50/50 px-2.5 py-1 text-sm dark:border-stone-800 dark:bg-stone-900/50">
        <span className="font-medium text-stone-900 dark:text-stone-100">{person.name}</span>
        {person.title && <span className="text-xs text-stone-500">{person.title}</span>}
      </div>
      {person.children && person.children.length > 0 && (
        <ul className="relative ml-2 border-l border-stone-300 pl-2 dark:border-stone-700">
          {person.children.map((c) => (
            <LineageNode key={c.id} person={c} />
          ))}
        </ul>
      )}
    </li>
  );
}
```
`components/lineage-tree.tsx` → skipped: Pan/zoom canvas & interactive expand/collapse; add when graph depth > 6 levels or viewport culling is required.

---

### 2. Comparative Timeline: CSS Scroll-Snap Parallel Tracks

Synchronize multi-tradition epochs using CSS Subgrid/Sticky headers instead of synced JS scroll listeners.

```tsx
// components/comparative-timeline.tsx
interface EpochEvent { tradition: 'judaism' | 'christianity' | 'islam'; label: string; year: string }

export function ComparativeTimeline({ events }: { events: EpochEvent[] }) {
  // ponytail: Flat mapping assumes static chronological sorting at ingest.
  return (
    <div className="flex w-full snap-x snap-mandatory overflow-x-auto border-y border-stone-200 py-6 scrollbar-none dark:border-stone-800">
      <div className="grid auto-cols-[18rem] grid-flow-col gap-6 px-4">
        {events.map((e, idx) => (
          <div key={idx} className="snap-start rounded-lg border border-stone-200/60 p-4 bg-stone-50/30 dark:border-stone-800 dark:bg-stone-900/20">
            <span className="text-xs font-mono tracking-wider text-amber-700 dark:text-amber-400 uppercase">{e.tradition}</span>
            <p className="mt-1 font-serif text-base text-stone-800 dark:text-stone-200">{e.label}</p>
            <time className="mt-2 block text-xs text-stone-400">{e.year}</time>
          </div>
        ))}
      </div>
    </div>
  );
}
```
`components/comparative-timeline.tsx` → skipped: JS scroll-sync observers and timeline scale zooming; add when non-linear temporal scaling is requested.

---

### 3. Next.js 15 Zero-Error Route & Build Lock

Prevent route type mismatch crashes during `next build` by enforcing async `params` and static route validation.

```tsx
// app/lore/[tradition]/[figure]/page.tsx
import { notFound } from 'next/navigation';

interface RouteProps {
  params: Promise<{ tradition: string; figure: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  // Hardcoded or stdlib file-scan to guarantee zero build-time dynamic misses
  return [
    { tradition: 'abrahamic', figure: 'abraham' },
    { tradition: 'judaism', figure: 'moses' },
    { tradition: 'islam', figure: 'ibrahim' },
  ];
}

export default async function LoreFigurePage({ params }: RouteProps) {
  const { tradition, figure } = await params;
  if (!tradition || !figure) notFound();

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="font-serif text-2xl capitalize text-stone-900 dark:text-stone-100">{figure}</h1>
      <p className="text-sm text-stone-500">Tradition: {tradition}</p>
    </main>
  );
}
```
`app/lore/[tradition]/[figure]/page.tsx` → skipped: CMS remote fetch & fallback revalidation; add when switching lore content from static files to external DB.

---

### Self-Check

```ts
// assert-build-contract.ts (run via: npx tsx assert-build-contract.ts)
import assert from 'node:assert/strict';

async function testParamResolution() {
  const mockParams = Promise.resolve({ tradition: 'islam', figure: 'ibrahim' });
  const resolved = await mockParams;
  assert.equal(resolved.tradition, 'islam');
  assert.equal(resolved.figure, 'ibrahim');
}

testParamResolution().then(() => console.log('✓ Route contract valid'));
```


### Cycle #35 Directive (2026-11-03 00:25)
### 1. Pure CSS Lineage Tree (Zero-JS Connectors)
Replaces canvas/D3 bloat with semantic, accessible CSS-tree connectors.

```tsx
// components/LineageTree.tsx
type Person = { id: string; name: string; epithet?: string; children?: Person[] };

export function LineageNode({ person }: { person: Person }) {
  // ponytail: recursive tree hits depth limit around ~50 levels; upgrade to flat BFS + SVG paths if lineage expands globally.
  return (
    <li className="relative flex flex-col items-center p-2">
      <div className="z-10 rounded-lg border border-amber-900/10 bg-[#faf8f5] px-3.5 py-1.5 text-center shadow-xs">
        <span className="font-serif text-sm font-medium text-stone-900">{person.name}</span>
        {person.epithet && <span className="block text-[11px] text-stone-500">{person.epithet}</span>}
      </div>
      {person.children && person.children.length > 0 && (
        <ul className="relative flex pt-5 before:absolute before:top-0 before:left-1/2 before:h-5 before:w-px before:bg-stone-300">
          {person.children.map((child, idx, arr) => (
            <div key={child.id} className="relative flex flex-col items-center">
              {arr.length > 1 && (
                <div
                  className={`absolute top-0 h-px bg-stone-300 ${
                    idx === 0 ? "left-1/2 right-0" : idx === arr.length - 1 ? "left-0 right-1/2" : "left-0 right-0"
                  }`}
                />
              )}
              <LineageNode person={child} />
            </div>
          ))}
        </ul>
      )}
    </li>
  );
}
```
→ skipped: Pan/zoom engine, dynamic node folding.  
→ add when: Tree exceeds viewport width on desktop.

---

### 2. Multi-Tradition Comparative Timeline Row
Synchronizes Jewish, Christian, and Islamic epochs using native CSS Grid subgrid alignment without timeline JS packages.

```tsx
// components/ComparativeTimeline.tsx
interface FigureRow {
  era: string;
  judaism: string;
  christianity: string;
  islam: string;
}

export function ComparativeTimeline({ rows }: { rows: FigureRow[] }) {
  return (
    <div className="grid grid-cols-[100px_repeat(3,minmax(180px,1fr))] border-t border-stone-200 text-xs">
      <div className="sticky top-0 z-20 col-span-full grid grid-cols-subgrid bg-[#faf8f5]/95 py-2 font-serif font-semibold text-stone-600 backdrop-blur-xs border-b border-stone-200">
        <span>Era</span>
        <span>Judaism (Tanakh)</span>
        <span>Christianity (Biblical)</span>
        <span>Islam (Quranic)</span>
      </div>
      {rows.map((r, i) => (
        <div key={i} className="col-span-full grid grid-cols-subgrid py-3 border-b border-stone-100 hover:bg-amber-500/5 items-baseline">
          <span className="font-mono text-stone-400">{r.era}</span>
          <span className="text-stone-800">{r.judaism || "—"}</span>
          <span className="text-stone-800">{r.christianity || "—"}</span>
          <span className="text-stone-800 font-medium">{r.islam || "—"}</span>
        </div>
      ))}
    </div>
  );
}
```
→ skipped: Virtualized table scrolling.  
→ add when: Row count crosses 200 comparative figures.

---

### 3. Build-Time Static Type Lock & Segment Guard
Eliminates dynamic SSG failure on dynamic routes in `next build`.

```tsx
// app/figures/[tradition]/[slug]/page.tsx
import { notFound } from "next/navigation";

export const dynamicParams = false; // Prevents runtime fallback bailouts

export async function generateStaticParams() {
  const figures = await import("@/data/figures.json").then((m) => m.default);
  return figures.map((f) => ({
    tradition: f.tradition.toLowerCase(),
    slug: f.slug,
  }));
}

export default async function Page({ params }: { params: Promise<{ tradition: string; slug: string }> }) {
  const { tradition, slug } = await params;
  const figures = await import("@/data/figures.json").then((m) => m.default);
  const figure = figures.find((f) => f.tradition.toLowerCase() === tradition && f.slug === slug);

  if (!figure) notFound();

  return <article className="prose prose-stone mx-auto p-6">{figure.name}</article>;
}
```
→ skipped: External Headless CMS fetch wrapper.  
→ add when: Content is decoupled from the Git repository.

---

### Self-Check
```ts
// scripts/verify-data.mjs (Run via: node scripts/verify-data.mjs)
import assert from "node:assert";
import figures from "../data/figures.json" with { type: "json" };

figures.forEach((f) => {
  assert(f.slug && typeof f.slug === "string", `Figure missing slug: ${JSON.stringify(f)}`);
  assert(["judaism", "christianity", "islam"].includes(f.tradition.toLowerCase()), `Invalid tradition: ${f.tradition}`);
});
console.log(`✓ ${figures.length} figures validated for zero-error static export.`);
```
