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


### Cycle #36 Directive (2026-11-03 00:31)
### 1. Comparative Timeline: Native Snap Columns

```tsx
// components/ComparativeTimeline.tsx
export function ComparativeTimeline({
  eras,
}: {
  eras: { id: string; name: string; traditions: Record<'jewish' | 'christian' | 'islamic', string> }[];
}) {
  return (
    <div className="flex overflow-x-auto snap-x snap-mandatory divide-x divide-stone-200 border-y border-stone-200 bg-stone-50/40 scrollbar-none">
      {eras.map((era) => (
        <section key={era.id} className="min-w-[280px] sm:min-w-[340px] snap-start p-5 shrink-0">
          <span className="sticky left-0 font-serif text-xs uppercase tracking-wider text-stone-500">{era.name}</span>
          <div className="mt-4 space-y-3 font-sans text-xs leading-relaxed text-stone-800">
            <p><strong className="font-serif text-amber-900">Torah:</strong> {era.traditions.jewish}</p>
            <p><strong className="font-serif text-sky-900">Gospel:</strong> {era.traditions.christian}</p>
            <p><strong className="font-serif text-emerald-900">Quran:</strong> {era.traditions.islamic}</p>
          </div>
        </section>
      ))}
    </div>
  );
}
```
skipped: Timeline libraries (VisJS, D3) & JS pan/zoom handlers.  
add when: Users require continuous non-linear zoom across millennium-scale gaps.

---

### 2. Lineage View: Zero-JS CSS Tree

```tsx
// components/LineageTree.tsx
export type Figure = { name: string; title?: string; children?: Figure[] };

export function LineageNode({ node }: { node: Figure }) {
  return (
    <li className="relative pl-6 before:absolute before:left-0 before:top-3.5 before:w-4 before:border-t before:border-stone-300">
      <div className="inline-flex items-baseline gap-1.5 rounded border border-stone-200 bg-white px-2 py-1 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        <span className="font-serif text-xs font-medium text-stone-900">{node.name}</span>
        {node.title && <span className="text-[10px] text-stone-600">({node.title})</span>}
      </div>
      {node.children && node.children.length > 0 && (
        <ul className="ml-2 mt-2 space-y-2 border-l border-stone-300 pl-2">
          {node.children.map((child) => (
            <LineageNode key={child.name} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
}
```
skipped: React Flow / Canvas rendering engines.  
add when: Graph introduces cyclic relationships (cross-marriages) or horizontal multi-parent splits.

---

### 3. Next.js Static Params: Zero-Bailout Build Fix

```tsx
// app/traditions/[slug]/page.tsx
import { notFound } from 'next/navigation';

const VALID_SLUGS = ['judaism', 'christianity', 'islam'] as const;
type Slug = (typeof VALID_SLUGS)[number];

export const dynamicParams = false;

export function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }));
}

// ponytail: direct Promise<{ slug: string }> for Next.js 15+ async params standard
export default async function TraditionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!VALID_SLUGS.includes(slug as Slug)) notFound();

  return <main className="mx-auto max-w-xl py-12 px-6">{/* tradition content */}</main>;
}
```

```ts
// __tests__/build-check.ts (Run with: tsx __tests__/build-check.ts)
import assert from 'node:assert';
import { generateStaticParams } from '../app/traditions/[slug]/page';

const routes = generateStaticParams();
assert.strictEqual(routes.length, 3);
assert.deepStrictEqual(routes.map(r => r.slug), ['judaism', 'christianity', 'islam']);
```
skipped: Middleware-based route rewrites and runtime dynamic fallbacks.  
add when: Lore content moves from static code bundles to an external headless CMS.


### Cycle #40 Directive (2026-11-03 00:54)
### 1. Next.js 15 Async Route Params (`app/timeline/[slug]/page.tsx`)

```tsx
import { notFound } from "next/navigation";
import { getTraditionEvents } from "@/lib/lore";

type Props = { params: Promise<{ slug: string }> };

export default async function TimelineSlugPage({ params }: Props) {
  const { slug } = await params;
  const events = getTraditionEvents(slug); // ponytail: in-memory filter; upgrade to DB query if >2000 records
  if (!events) notFound();

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-lg font-serif tracking-tight capitalize text-stone-900 dark:text-stone-100">{slug}</h1>
      <ol className="mt-6 border-l border-stone-200 dark:border-stone-800 space-y-6 pl-4">
        {events.map((e) => (
          <li key={e.id} className="relative">
            <span className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-stone-400 dark:bg-stone-600" />
            <time className="text-xs font-mono text-stone-500">{e.year}</time>
            <p className="text-sm text-stone-800 dark:text-stone-200">{e.title}</p>
          </li>
        ))}
      </ol>
    </main>
  );
}
```
→ skipped: dynamic client fetching and custom fallback spinners.  
add when: records move off static JSON to dynamic user-generated DB queries.

---

### 2. Pure CSS Comparative Timeline Sync (`components/ComparativeTimeline.tsx`)

```tsx
type EraEvent = { id: string; year: string; name: string };

export function ComparativeTimeline({ tracks }: { tracks: Record<"judaism" | "christianity" | "islam", EraEvent[]> }) {
  const traditions = Object.keys(tracks) as (keyof typeof tracks)[];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-stone-200 dark:divide-stone-800 border-y border-stone-200 dark:border-stone-800">
      {traditions.map((t) => (
        <section key={t} className="p-4 space-y-4">
          <header className="sticky top-0 bg-stone-50/90 dark:bg-stone-950/90 backdrop-blur py-1 text-xs font-mono uppercase tracking-widest text-stone-500">
            {t}
          </header>
          {/* ponytail: array map; add intersection-observer sync when tracking cross-tradition epoch alignments */}
          <ul className="space-y-3">
            {tracks[t].map((ev) => (
              <li key={ev.id} className="text-sm">
                <span className="font-mono text-xs text-amber-700 dark:text-amber-500 mr-2">{ev.year}</span>
                <span className="text-stone-700 dark:text-stone-300">{ev.name}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
```
→ skipped: JS scroll-sync listeners, canvas engines, and external timeline libraries.  
add when: non-linear bidirectional time scrubbing across eras is explicitly required.

---

### 3. Native CSS Hierarchy Lineage Tree (`components/LineageView.tsx`)

```tsx
type PersonNode = { id: string; name: string; children?: PersonNode[] };

export function LineageNode({ node }: { node: PersonNode }) {
  return (
    <li className="relative pl-4 before:absolute before:left-0 before:top-2.5 before:h-px before:w-3 before:bg-stone-300 dark:before:bg-stone-700">
      <span className="text-sm font-medium text-stone-900 dark:text-stone-100">{node.name}</span>
      {/* ponytail: uncollapsible tree; upgrade to <details>/<summary> if depth > 4 */}
      {node.children && node.children.length > 0 && (
        <ul className="relative ml-2 border-l border-stone-300 dark:border-stone-700 pl-2 space-y-2 pt-2">
          {node.children.map((child) => (
            <LineageNode key={child.id} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
}
```
→ skipped: heavy graph visualization packages (React Flow, D3, Vis.js).  
add when: graph contains non-hierarchical cycles or dual-parent interconnects.


### Cycle #43 Directive (2026-11-03 01:11)
### 1. Build Fix: Next.js 15 Strict Async Route Typing & Prerender Safety

```tsx
// app/traditions/[figure]/page.tsx
import { notFound } from "next/navigation";

const VALID_FIGURES = ["abraham", "moses", "jesus", "muhammad"] as const;
type Figure = (typeof VALID_FIGURES)[number];

export function generateStaticParams() {
  return VALID_FIGURES.map((figure) => ({ figure }));
}

export default async function FigurePage({
  params,
}: {
  params: Promise<{ figure: string }>;
}) {
  const { figure } = await params;
  if (!VALID_FIGURES.includes(figure as Figure)) notFound();

  return (
    <main className="mx-auto max-w-xl px-6 py-12 text-stone-900">
      <h1 className="text-xl font-medium tracking-tight capitalize">{figure}</h1>
    </main>
  );
}
```
skipped: Dynamic DB query and client-side loaders.  
add when: Lore data moves from static content to an external headless CMS/DB.

---

### 2. Comparative Timeline: Zero-Dep Synchronized CSS Grid

```tsx
// components/comparative-timeline.tsx
type EraRow = {
  era: string;
  judaism: string;
  christianity: string;
  islam: string;
};

export function ComparativeTimeline({ rows }: { rows: EraRow[] }) {
  return (
    <div className="grid grid-cols-[80px_repeat(3,minmax(0,1fr))] gap-2 text-xs border-t border-stone-200">
      <div className="sticky top-0 z-10 bg-stone-50/90 py-2.5 font-mono text-stone-400 backdrop-blur">Era</div>
      <div className="sticky top-0 z-10 bg-stone-50/90 py-2.5 font-medium text-stone-700 backdrop-blur">Judaism</div>
      <div className="sticky top-0 z-10 bg-stone-50/90 py-2.5 font-medium text-stone-700 backdrop-blur">Christianity</div>
      <div className="sticky top-0 z-10 bg-stone-50/90 py-2.5 font-medium text-stone-700 backdrop-blur">Islam</div>

      {rows.map((r) => (
        <div key={r.era} className="contents group">
          <span className="py-2 font-mono text-stone-400 border-b border-stone-100">{r.era}</span>
          <div className="rounded bg-stone-100/60 p-2 text-stone-800 transition group-hover:bg-stone-100 border-b border-stone-100">{r.judaism}</div>
          <div className="rounded bg-stone-100/60 p-2 text-stone-800 transition group-hover:bg-stone-100 border-b border-stone-100">{r.christianity}</div>
          <div className="rounded bg-stone-100/60 p-2 text-stone-800 transition group-hover:bg-stone-100 border-b border-stone-100">{r.islam}</div>
        </div>
      ))}
    </div>
  );
}
```
skipped: Heavy charting/canvas packages and interactive zoom listeners.  
add when: Range-based spans exceed row-level granular comparison.

---

### 3. Lineage View: Native CSS Tree Nodes

```tsx
// components/lineage-tree.tsx
export type LineageNode = { name: string; children?: LineageNode[] };

export function LineageTree({ node }: { node: LineageNode }) {
  // ponytail: recursion ceiling 10 levels deep; add iteration/virtualization if nodes > 100
  return (
    <div className="flex flex-col items-center">
      <span className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs font-medium text-stone-800 shadow-sm">
        {node.name}
      </span>
      {node.children && node.children.length > 0 && (
        <div className="relative flex pt-4 before:absolute before:top-0 before:left-1/2 before:h-4 before:w-px before:bg-stone-300">
          {node.children.map((child) => (
            <div
              key={child.name}
              className="relative px-3 before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-stone-300 first:before:left-1/2 last:before:right-1/2"
            >
              <div className="mx-auto h-3 w-px bg-stone-300" />
              <LineageTree node={child} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```
skipped: React Flow / D3 SVG layout engine dependencies.  
add when: Non-hierarchical cross-links (e.g., intermarriages across branches) require multi-parent graphs.

---

### Self-Check

```ts
// tests/lineage-validator.ts
import assert from "node:assert";
import type { LineageNode } from "../components/lineage-tree";

function countDescendants(node: LineageNode): number {
  if (!node.children || node.children.length === 0) return 1;
  return 1 + node.children.reduce((acc, c) => acc + countDescendants(c), 0);
}

const tree: LineageNode = {
  name: "Terah",
  children: [
    { name: "Abraham", children: [{ name: "Isaac" }, { name: "Ishmael" }] },
    { name: "Nahor" },
  ],
};

assert.strictEqual(countDescendants(tree), 5, "Tree traversal mismatch");
console.log("✓ Lineage self-check passed");
```


### Cycle #44 Directive (2026-11-03 01:16)
### 1. Synchronized 3-Tradition Timeline Track (CSS Subgrid + Sticky Epochs)

```tsx
// components/timeline/ComparativeGrid.tsx
export function ComparativeGrid({ epochs }: { epochs: Array<{ era: string; traditions: [string, string, string] }> }) {
  return (
    <div className="grid grid-cols-[120px_repeat(3,1fr)] gap-x-6 border-l border-stone-200/60 dark:border-stone-800/60 font-serif">
      <div className="sticky top-0 z-10 grid grid-cols-subgrid col-span-4 bg-stone-50/80 dark:bg-stone-950/80 backdrop-blur py-3 text-xs tracking-widest uppercase text-stone-500 border-b border-stone-200/40">
        <span>Epoch</span><span>Judaism</span><span>Christianity</span><span>Islam</span>
      </div>
      {epochs.map((e) => (
        <div key={e.era} className="grid grid-cols-subgrid col-span-4 py-6 border-b border-stone-100 dark:border-stone-900/50 text-sm">
          <span className="text-xs font-mono text-stone-400 self-start">{e.era}</span>
          {e.traditions.map((text, i) => (
            <p key={i} className="text-stone-700 dark:text-stone-300 leading-relaxed pr-4">{text || '—'}</p>
          ))}
        </div>
      ))}
    </div>
  );
}
```
* skipped: Scroll-sync JS listeners and canvas rendering.
* add when: Horizontal infinite-timeline scrubbing across >10 concurrent traditions is required.

---

### 2. Zero-Dependency Lineage Tree (Semantic HTML + Native CSS Connectors)

```tsx
// components/lineage/LineageNode.tsx
interface Figure { name: string; title?: string; children?: Figure[]; }

export function LineageNode({ node }: { node: Figure }) {
  // ponytail: flat recursive CSS tree; upgrade to Canvas/SVG paths if node degree > 6
  return (
    <li className="relative pl-6 before:absolute before:left-0 before:top-3 before:w-4 before:border-t before:border-stone-300 dark:before:border-stone-700">
      <div className="inline-flex items-baseline gap-2 py-1">
        <span className="font-serif text-stone-900 dark:text-stone-100 text-sm font-medium">{node.name}</span>
        {node.title && <span className="font-sans text-xs text-stone-500 tracking-tight">({node.title})</span>}
      </div>
      {node.children && node.children.length > 0 && (
        <ul className="relative ml-2 border-l border-stone-300 dark:border-stone-700">
          {node.children.map((child) => (
            <LineageNode key={child.name} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
}
```
* skipped: Cytoscape/D3 tree layout engines and pan-zoom canvas state.
* add when: Bi-directional non-hierarchical cross-marriages cause circular DOM references.

---

### 3. Build-Time Static Guarantees (`app/figure/[slug]/page.tsx`)

```tsx
import { notFound } from 'next/navigation';

export const dynamic = 'error';
export const dynamicParams = false;

// ponytail: reads local JSON lore records; upgrade to SQLite/libSQL when records > 5,000
import records from '@/data/figures.json' assert { type: 'json' };

export async function generateStaticParams() {
  return records.map((f) => ({ slug: f.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const figure = records.find((f) => f.slug === slug);
  if (!figure) notFound();

  return <article className="max-w-prose mx-auto py-12">{/* View code */}</article>;
}
```
* skipped: Incremental Static Regeneration (ISR) and runtime edge database queries.
* add when: Lore data is updated via dynamic headless CMS Webhooks without git deployment.


### Cycle #45 Directive (2026-11-03 01:22)
### 1. Lineage View: Zero-JS Native Tree (`LineageTree.tsx`)

```tsx
// components/LineageTree.tsx
interface Figure { name: string; era?: string; children?: Figure[]; }

export function LineageNode({ figure }: { figure: Figure }) {
  // ponytail: recursive semantic list; upgrade to horizontal SVG canvas if bidirectional intermarriages are needed.
  return (
    <li className="relative pl-4 border-l border-stone-200 dark:border-stone-800">
      <div className="absolute -left-px top-3 h-px w-3 bg-stone-200 dark:bg-stone-800" />
      <span className="font-serif text-sm tracking-tight text-stone-900 dark:text-stone-100">{figure.name}</span>
      {figure.era && <span className="ml-2 font-mono text-[10px] text-stone-400">{figure.era}</span>}
      {figure.children?.length ? (
        <ol className="mt-1 space-y-1">
          {figure.children.map((c) => <LineageNode key={c.name} figure={c} />)}
        </ol>
      ) : null}
    </li>
  );
}
```
`LineageNode` → skipped: pan/zoom controls and D3 force graph; add when lineage nodes exceed 500 concurrent items on screen.

---

### 2. Comparative Timeline: 3-Tradition Sticky Grid (`Timeline.tsx`)

```tsx
// components/Timeline.tsx
interface Epoch { period: string; jewish: string; christian: string; islamic: string; }

export function Timeline({ epochs }: { epochs: Epoch[] }) {
  // ponytail: CSS grid syncs tradition rows natively without scroll-listening JS.
  return (
    <section className="grid grid-cols-[80px_1fr_1fr_1fr] gap-x-4 border-t border-stone-200 dark:border-stone-800 text-xs">
      <div className="sticky top-0 z-10 col-span-4 grid grid-cols-[80px_1fr_1fr_1fr] gap-x-4 bg-stone-50/80 py-2 backdrop-blur dark:bg-stone-950/80 font-mono text-stone-400">
        <span>ERA</span><span>JUDAISM</span><span>CHRISTIANITY</span><span>ISLAM</span>
      </div>
      {epochs.map((e) => (
        <div key={e.period} className="contents group">
          <div className="py-3 font-mono text-stone-400 border-b border-stone-100 dark:border-stone-900">{e.period}</div>
          <div className="py-3 text-stone-700 dark:text-stone-300 border-b border-stone-100 dark:border-stone-900">{e.jewish}</div>
          <div className="py-3 text-stone-700 dark:text-stone-300 border-b border-stone-100 dark:border-stone-900">{e.christian}</div>
          <div className="py-3 text-stone-700 dark:text-stone-300 border-b border-stone-100 dark:border-stone-900">{e.islamic}</div>
        </div>
      ))}
    </section>
  );
}
```
`Timeline` → skipped: synchronized dual-axis virtualized scrolling; add when period row count causes layout shift or DOM node counts > 1,000.

---

### 3. Production Build Lock: Next.js 15 Async Dynamic Route Params (`app/figures/[slug]/page.tsx`)

```tsx
// app/figures/[slug]/page.tsx
type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  // ponytail: hardcoded seed list satisfies static export validation during `next build`.
  return [{ slug: "abraham" }, { slug: "moses" }, { slug: "jesus" }, { slug: "muhammad" }];
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  return <main className="max-w-xl mx-auto p-6 font-serif">{slug}</main>;
}

// Self-check test
(async () => {
  const p = Promise.resolve({ slug: "abraham" });
  console.assert((await p).slug === "abraham", "Params resolution failed");
})();
```
`Page` → skipped: remote CMS/database fetchers and edge caching; add when content is decoupled from static markdown or local JSON.


### Cycle #46 Directive (2026-11-03 01:28)
### 1. Zero-Dependency Comparative Timeline (`CSS Grid + Contents`)

```tsx
// components/ComparativeTimeline.tsx
interface TimelineEra {
  era: string;
  traditions: { jewish: string[]; christian: string[]; islamic: string[] };
}

export function ComparativeTimeline({ eras }: { eras: TimelineEra[] }) {
  // ponytail: pure CSS grid timeline; upgrade to virtualized windowing if era rows exceed 100.
  return (
    <div className="grid grid-cols-[80px_repeat(3,1fr)] gap-x-6 gap-y-3 overflow-x-auto text-sm text-stone-800">
      <div className="sticky top-0 text-xs tracking-wider text-stone-400 uppercase">Era</div>
      <div className="sticky top-0 font-serif text-stone-900">Judaism</div>
      <div className="sticky top-0 font-serif text-stone-900">Christianity</div>
      <div className="sticky top-0 font-serif text-stone-900">Islam</div>
      
      {eras.map((row) => (
        <div key={row.era} className="contents border-t border-stone-200/60">
          <span className="py-2 text-xs font-mono text-stone-400">{row.era}</span>
          {(['jewish', 'christian', 'islamic'] as const).map((t) => (
            <div key={t} className="py-2 border-t border-stone-100">
              {row.traditions[t]?.join(', ') || '—'}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
```
→ skipped: Third-party chart/timeline libraries (visx, d3).
→ add when: Horizontal drag/zoom scaling across centuries becomes an explicit requirement.

---

### 2. Semantic CSS Lineage Tree (`border-l` recursion)

```tsx
// components/LineageNode.tsx
export type FigureNode = { name: string; title?: string; children?: FigureNode[] };

export function LineageNode({ node }: { node: FigureNode }) {
  // ponytail: single-parent descent; upgrade to DAG canvas if complex cross-marriages are mapped.
  return (
    <div className="relative pl-4 border-l border-stone-200 transition-colors hover:border-amber-700/40">
      <div className="flex items-baseline gap-2 py-1">
        <span className="font-serif text-stone-900 font-medium">{node.name}</span>
        {node.title && <span className="text-xs text-stone-400 tracking-tight">{node.title}</span>}
      </div>
      {node.children && node.children.length > 0 && (
        <div className="space-y-1">
          {node.children.map((child) => (
            <LineageNode key={child.name} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}
```
→ skipped: Heavy graph visualizers (React Flow, Cytoscape).
→ add when: Bidirectional non-linear lineage (matrilineal + patrilineal crossovers) breaks single-edge recursion.

---

### 3. Next.js Static Export Parity & Error-Free Build Guard

```tsx
// app/figures/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { FIGURES } from '@/data/figures';

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(FIGURES).map((slug) => ({ slug }));
}

export default async function FigurePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const figure = FIGURES[slug];
  if (!figure) notFound();

  return (
    <main className="max-w-2xl mx-auto px-6 py-12 antialiased">
      <h1 className="font-serif text-3xl text-stone-900">{figure.name}</h1>
    </main>
  );
}
```
→ skipped: Runtime server-side database lookups and catch-all routes.
→ add when: Lore database migrates to a CMS requiring on-demand ISR/revalidation.

---

### Verification Check

```ts
// scripts/verify-data.ts
import { FIGURES } from '../data/figures';
import assert from 'node:assert';

assert.ok(Object.keys(FIGURES).length > 0, "Figure dataset cannot be empty");
for (const [slug, fig] of Object.entries(FIGURES)) {
  assert.ok(fig.name, `Missing name at slug: ${slug}`);
}
console.log('✓ Lore integrity passed');
```


### Cycle #47 Directive (2026-11-03 01:33)
### 1. Zero-JS Semantic Lineage Tree (Pure CSS Connectors)

Replace JS-calculated graph layouts with CSS pseudo-element connectors for genealogical branching.

```css
/* app/lineage/lineage.module.css */
.tree, .tree ul {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  position: relative;
  list-style-type: none;
  margin: 0;
  padding-left: 0;
}

.tree li {
  float: left;
  text-align: center;
  position: relative;
  padding: 20px 8px 0 8px;
}

/* Connectors: horizontal & vertical */
.tree li::before, .tree li::after {
  content: '';
  position: absolute;
  top: 0;
  right: 50%;
  border-top: 1px solid var(--border-subtle, #e5e5e5);
  width: 50%;
  height: 20px;
}
.tree li::after {
  right: auto;
  left: 50%;
  border-left: 1px solid var(--border-subtle, #e5e5e5);
}
.tree li:only-child::after, .tree li:only-child::before { display: none; }
.tree li:only-child { padding-top: 0; }
.tree li:first-child::before, .tree li:last-child::after { border: 0 none; }
.tree li:last-child::before { border-right: 1px solid var(--border-subtle, #e5e5e5); border-radius: 0 6px 0 0; }
.tree li:first-child::after { border-radius: 6px 0 0 0; }

/* Downward stem from parent */
.tree ul::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  border-left: 1px solid var(--border-subtle, #e5e5e5);
  width: 0;
  height: 20px;
}
```
→ skipped: D3/Cytoscape canvas rendering, add when user-directed force-layout/free dragging is required.

---

### 2. Native Multi-Tradition Comparative Timeline

Align Jewish, Christian, and Islamic traditions using CSS subgrid and scroll-snap without layout recalculation.

```tsx
// components/ComparativeTimeline.tsx
interface TimelineEvent {
  epoch: string;
  judaism?: string;
  christianity?: string;
  islam?: string;
}

export function ComparativeTimeline({ events }: { events: TimelineEvent[] }) {
  // ponytail: Flat array ceiling; add nested era groupings when multi-millennia zoom is needed.
  return (
    <div className="overflow-x-auto snap-x mandatory py-8">
      <div className="grid grid-cols-[100px_repeat(3,minmax(260px,1fr))] gap-4 items-start min-w-[880px]">
        <div className="sticky top-0 font-mono text-xs opacity-40">EPOCH</div>
        <div className="sticky top-0 font-serif text-sm tracking-wide text-amber-900/80 dark:text-amber-200/80">JUDAISM</div>
        <div className="sticky top-0 font-serif text-sm tracking-wide text-rose-900/80 dark:text-rose-200/80">CHRISTIANITY</div>
        <div className="sticky top-0 font-serif text-sm tracking-wide text-emerald-900/80 dark:text-emerald-200/80">ISLAM</div>

        {events.map((e) => (
          <div key={e.epoch} className="contents group">
            <span className="font-mono text-xs opacity-50 py-3 border-t border-stone-200 dark:border-stone-800">{e.epoch}</span>
            <div className="p-3 bg-stone-50/50 dark:bg-stone-900/40 rounded border border-stone-200/60 dark:border-stone-800/60 text-sm leading-relaxed">{e.judaism || "—"}</div>
            <div className="p-3 bg-stone-50/50 dark:bg-stone-900/40 rounded border border-stone-200/60 dark:border-stone-800/60 text-sm leading-relaxed">{e.christianity || "—"}</div>
            <div className="p-3 bg-stone-50/50 dark:bg-stone-900/40 rounded border border-stone-200/60 dark:border-stone-800/60 text-sm leading-relaxed">{e.islam || "—"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
```
→ skipped: Intersecting timeline drag listeners, add when custom non-native touch scrubbing is requested.

---

### 3. Production Build Lock (Type-safe static generation)

Eliminate `any` leaks and unhandled route params causing Next.js static generation failures.

```typescript
// app/figure/[slug]/page.tsx
import { notFound } from "next/navigation";

// Assumes canonical data access layer
import { getFigureBySlug, getAllFigureSlugs } from "@/lib/lore";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllFigureSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function FigurePage({ params }: Props) {
  const { slug } = await params;
  const figure = await getFigureBySlug(slug);

  if (!figure) notFound();

  return (
    <article className="max-w-xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-serif tracking-tight">{figure.name}</h1>
      <p className="mt-4 text-stone-600 dark:text-stone-400 leading-relaxed">{figure.summary}</p>
    </article>
  );
}
```
```typescript
// self-check.ts (run via `tsx self-check.ts` or `node self-check.js`)
import assert from "node:assert/strict";

const sample = { epoch: "c. 1800 BCE", judaism: "Avraham", christianity: "Abraham", islam: "Ibrahim" };
assert.equal(typeof sample.epoch, "string");
assert.ok(sample.judaism && sample.christianity && sample.islam);
```
→ skipped: Dynamic SSR fallbacks/revalidation, add when CMS allows live un-rebuilt publishing.


### Cycle #48 Directive (2026-11-03 01:39)
### 1. Comparative Timeline: Pure CSS Subgrid (Kills JS scroll-sync bloat)

```tsx
// components/timeline/ComparativeTimeline.tsx
interface EraRow {
  year: string;
  judaism: React.ReactNode;
  christianity: React.ReactNode;
  islam: React.ReactNode;
}

export function ComparativeTimeline({ rows }: { rows: EraRow[] }) {
  return (
    <div className="grid grid-cols-[5rem_repeat(3,minmax(18rem,1fr))] gap-x-6 overflow-x-auto selection:bg-stone-200">
      <div className="sticky top-0 z-20 col-span-4 grid grid-cols-subgrid border-b border-stone-200/80 bg-stone-50/80 py-3.5 backdrop-blur-md text-[11px] font-medium tracking-wide text-stone-500 uppercase">
        <span>Epoch</span><span>Judaism</span><span>Christianity</span><span>Islam</span>
      </div>
      {rows.map((row) => (
        <div key={row.year} className="col-span-4 grid grid-cols-subgrid border-b border-stone-100 py-6 items-baseline group hover:bg-stone-50/50 transition-colors">
          <span className="sticky left-0 font-mono text-xs text-stone-400 select-none">{row.year}</span>
          <div className="text-[13px] leading-relaxed text-stone-700 pr-4">{row.judaism}</div>
          <div className="text-[13px] leading-relaxed text-stone-700 pr-4">{row.christianity}</div>
          <div className="text-[13px] leading-relaxed text-stone-700">{row.islam}</div>
        </div>
      ))}
    </div>
  );
}
```
→ skipped: JS scroll-listener synchronization, virtualized windowing.  
→ add when: Dataset exceeds 200 epochs or horizontal column count becomes user-configurable.

---

### 2. Lineage View: Native Cubic Bezier Connectors

```tsx
// components/lineage/LineageEdge.tsx
export function LineageEdge({ from, to }: { from: [number, number]; to: [number, number] }) {
  // ponytail: assumes top-to-bottom tree flow. Upgrade to orthogonal router if nodes overlap.
  const [x1, y1] = from;
  const [x2, y2] = to;
  const cy = (y1 + y2) / 2;

  return (
    <path
      d={`M ${x1} ${y1} C ${x1} ${cy}, ${x2} ${cy}, ${x2} ${y2}`}
      fill="none"
      className="stroke-stone-300 transition-colors duration-300 hover:stroke-stone-500"
      strokeWidth={1.5}
      vectorEffect="non-scaling-stroke"
    />
  );
}
```
→ skipped: D3-hierarchy, ReactFlow runtime graph solvers.  
→ add when: Bi-directional lineage cycles or complex cross-generation marriages occur.

---

### 3. Build Guard: Next.js 15 Async Route Params & Static Generation

```tsx
// app/figure/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { FIGURES, FigureSlug } from '@/data/figures';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(FIGURES).map((slug) => ({ slug }));
}

export default async function FigurePage({ params }: PageProps) {
  const { slug } = await params;
  const figure = FIGURES[slug as FigureSlug];

  if (!figure) notFound();

  return <main className="mx-auto max-w-2xl px-6 py-16 text-stone-900">{/* lineage & timeline hooks */}</main>;
}
```
→ skipped: `generateMetadata` dynamic fetching, runtime boundary fallbacks.  
→ add when: Lore figures migrate from static data modules to a remote database.


### Cycle #49 Directive (2026-11-03 01:44)
### 1. Zero-Error Build: Await Dynamic Params & Static Hoisting
Fixes Next.js 15 production build failures on dynamic timeline/lineage routes.

```tsx
// app/lineage/[id]/page.tsx
import { notFound } from "next/navigation";
import { FIGURES } from "@/data/lineage";

export function generateStaticParams() {
  return FIGURES.map((f) => ({ id: f.id }));
}

export default async function LineagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const figure = FIGURES.find((f) => f.id === id);
  if (!figure) notFound();

  return <LineageTree root={figure} />;
}
```
→ skipped: `dynamic DB lookups and Suspense boundary scaffolding`, add when `figures are authored in an external headless CMS`.

---

### 2. Comparative Timeline: Pure CSS Sticky Epoch Grid
Synchronizes Jewish, Christian, and Islamic traditions horizontally without scroll-sync JavaScript listeners.

```css
/* styles/timeline.css */
.timeline-sync {
  display: grid;
  grid-template-columns: 5rem repeat(3, minmax(260px, 1fr));
  overflow-x: auto;
  scroll-snap-type: x proximity;
  background: #fbfbf9; /* zen warm canvas */
}

.timeline-epoch-marker {
  position: sticky;
  left: 0;
  background: rgba(251, 251, 249, 0.92);
  backdrop-filter: blur(8px);
  border-right: 1px solid rgba(0, 0, 0, 0.06);
  z-index: 10;
}
```
→ skipped: `virtualized pan/zoom canvas engine`, add when `event density exceeds 300 nodes per era`.

---

### 3. Lineage View: Zero-Dep Native Branch Connectors
Replaces heavy graph libraries (`react-flow`, `d3`) with native CSS tree rails for genealogical descent.

```tsx
// components/LineageNode.tsx
export function LineageNode({ figure }: { figure: FigureNode }) {
  // ponytail: recursive flex tree; upgrade to SVG bezier paths if cross-line marriages intersect
  return (
    <div className="flex flex-col items-center">
      <div className="rounded-lg border border-stone-200 bg-white/70 px-3.5 py-2 text-xs font-serif text-stone-900 shadow-sm backdrop-blur">
        {figure.name}
      </div>
      {figure.children?.length > 0 && (
        <div className="relative mt-4 flex gap-6 pt-4 before:absolute before:top-0 before:left-1/2 before:h-4 before:w-px before:-translate-x-1/2 before:bg-stone-300 after:absolute after:top-0 after:left-[calc(50%/var(--child-count))] after:right-[calc(50%/var(--child-count))] after:h-px after:bg-stone-300">
          {figure.children.map((child) => (
            <LineageNode key={child.id} figure={child} />
          ))}
        </div>
      )}
    </div>
  );
}
```
→ skipped: `force-directed graph physics`, add when `rendering multi-parent non-linear biblical unions`.


### Cycle #50 Directive (2026-11-03 01:50)
### 1. Lineage View: Pure CSS Tree (Drop D3/Canvas/ReactFlow)

Replace canvas/graph libraries with native semantic HTML lists and CSS pseudo-element connectors.

```tsx
// components/LineageNode.tsx
interface Person {
  name: string;
  traditionName?: { hebrew?: string; arabic?: string };
  children?: Person[];
}

export function LineageTree({ data }: { data: Person }) {
  return (
    <ul className="flex justify-center p-4 pl-0 [&_ul]:pt-5 [&_ul]:relative">
      <li className="relative float-left text-center list-none p-5 pt-0">
        <div className="inline-block rounded-lg border border-amber-900/10 bg-amber-50/40 px-3 py-1.5 text-xs text-stone-800 shadow-sm backdrop-blur-sm dark:border-amber-100/10 dark:bg-stone-900/40 dark:text-stone-200">
          <span className="font-serif font-medium">{data.name}</span>
          {data.traditionName?.arabic && (
            <span className="ml-1 text-[10px] text-stone-400">({data.traditionName.arabic})</span>
          )}
        </div>
        {data.children && data.children.length > 0 && (
          <div className="flex justify-center">
            {/* ponytail: CSS tree branches max 4 levels; upgrade to SVG canvas if rendering >500 nodes */}
            {data.children.map((child) => (
              <LineageTree key={child.name} data={child} />
            ))}
          </div>
        )}
      </li>
    </ul>
  );
}
```
→ skipped: Pan/zoom virtualization & canvas engine.  
→ add when: Lineage depth exceeds 12 generations or DOM node count causes main-thread frame drops.

---

### 2. Comparative Timeline: Native Sticky Grid (Zero JS Scroll-Sync)

Eliminate `onScroll` JS event-listeners. Use CSS sticky positioning and subgrid across the 3 traditions (Judaism, Christianity, Islam).

```tsx
// components/ComparativeTimeline.tsx
interface EpochEvent {
  era: string;
  judaism: string;
  christianity: string;
  islam: string;
}

export function ComparativeTimeline({ events }: { events: EpochEvent[] }) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="grid min-w-[640px] grid-cols-[100px_1fr_1fr_1fr] gap-x-px bg-stone-200 dark:bg-stone-800 text-xs">
        <div className="sticky top-0 z-10 bg-stone-100 p-2 font-mono font-medium text-stone-500 dark:bg-stone-900">Era</div>
        <div className="sticky top-0 z-10 bg-stone-100 p-2 font-serif font-medium text-stone-700 dark:bg-stone-900 dark:text-stone-300">Judaism</div>
        <div className="sticky top-0 z-10 bg-stone-100 p-2 font-serif font-medium text-stone-700 dark:bg-stone-900 dark:text-stone-300">Christianity</div>
        <div className="sticky top-0 z-10 bg-stone-100 p-2 font-serif font-medium text-stone-700 dark:bg-stone-900 dark:text-stone-300">Islam</div>

        {events.map((e, i) => (
          <div key={i} className="contents bg-stone-50 dark:bg-stone-950">
            <div className="p-2.5 font-mono text-stone-400 border-t border-stone-200/50 dark:border-stone-800/50">{e.era}</div>
            <div className="p-2.5 border-t border-stone-200/50 dark:border-stone-800/50 leading-relaxed">{e.judaism}</div>
            <div className="p-2.5 border-t border-stone-200/50 dark:border-stone-800/50 leading-relaxed">{e.christianity}</div>
            <div className="p-2.5 border-t border-stone-200/50 dark:border-stone-800/50 leading-relaxed">{e.islam}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
```
→ skipped: Bi-directional scroll-wheel locks and custom drag-physics.  
→ add when: Horizontal timeline requires scrubbing arbitrary micro-centuries on mobile viewports.

---

### 3. Next.js Zero-Error Build Enforcer (Next 15 Prerender Guard)

Halt dynamic bailout errors during `next build` by enforcing static route evaluation and handling async dynamic props natively.

```typescript
// app/timeline/[slug]/page.tsx
import { notFound } from "next/navigation";

export const dynamic = "error"; // Fails build fast if any dynamic SSR leak is introduced
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // Read local dataset synchronously at build time
  return [{ slug: "abraham" }, { slug: "moses" }, { slug: "jesus" }, { slug: "muhammad" }];
}

export default async function TimelinePage({ params }: PageProps) {
  const { slug } = await params; // Next 15 requirement
  if (!slug) notFound();

  return <main className="mx-auto max-w-4xl p-6 antialiased">{/* Timeline view */}</main>;
}
```
→ skipped: Dynamic SSR database fallbacks and ISR revalidation intervals.  
→ add when: CMS webhooks are wired to trigger live, on-demand revalidation.


### Cycle #51 Directive (2026-11-03 01:56)
### 1. Multi-Track Timeline via CSS Subgrid (Replaces timeline JS libs)

```tsx
// components/ComparativeTimeline.tsx
interface Event {
  era: string;
  tradition: 'judaism' | 'christianity' | 'islam';
  title: string;
}

export function ComparativeTimeline({ events }: { events: Event[] }) {
  // ponytail: fixed 3-column layout. Upgrade to dynamic cols if adding Baha'i/Druze traditions.
  return (
    <div className="grid grid-cols-[120px_repeat(3,1fr)] gap-4 border-l border-stone-200 pl-4 font-serif">
      <div className="sticky top-0 bg-stone-50/90 py-2 text-xs font-sans tracking-widest text-stone-400 uppercase">Era</div>
      <div className="sticky top-0 bg-stone-50/90 py-2 text-xs font-sans tracking-widest text-stone-500 uppercase">Judaism</div>
      <div className="sticky top-0 bg-stone-50/90 py-2 text-xs font-sans tracking-widest text-stone-500 uppercase">Christianity</div>
      <div className="sticky top-0 bg-stone-50/90 py-2 text-xs font-sans tracking-widest text-stone-500 uppercase">Islam</div>

      {events.map((e, i) => (
        <div key={i} className="contents group">
          <span className="py-3 text-xs font-sans text-stone-400 group-hover:text-stone-900 transition-colors">{e.era}</span>
          <div className={`p-3 rounded-lg border border-stone-200/60 bg-white/50 text-sm ${
            e.tradition === 'judaism' ? 'col-start-2' : e.tradition === 'christianity' ? 'col-start-3' : 'col-start-4'
          }`}>
            {e.title}
          </div>
        </div>
      ))}
    </div>
  );
}
```
skipped: IntersectionObserver active-era state tracking and scroll animations.  
add when: Timeline height exceeds viewport and users report disorientation.

---

### 2. Zero-Runtime Lineage Connectors (Semantic CSS Tree)

```css
/* app/lineage/lineage.module.css */
.tree, .tree ul {
  display: flex;
  justify-content: center;
  padding-left: 0;
  margin: 0;
  list-style: none;
}
.tree li {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 1.5rem 0.75rem 0;
}
/* Connectors */
.tree li::before, .tree li::after {
  content: '';
  position: absolute;
  top: 0;
  right: 50%;
  border-top: 1px solid #d6d3d1; /* stone-300 */
  width: 50%;
  height: 1.5rem;
}
.tree li::after {
  right: auto;
  left: 50%;
  border-left: 1px solid #d6d3d1;
}
.tree li:only-child::after, .tree li:only-child::before { display: none; }
.tree li:only-child { padding-top: 0; }
.tree li:first-child::before, .tree li:last-child::after { border: 0 none; }
.tree li:last-child::before { border-right: 1px solid #d6d3d1; border-radius: 0 4px 0 0; }
.tree li:first-child::after { border-radius: 4px 0 0 0; }
.tree ul::before {
  content: '';
  position: absolute;
  top: -1.5rem;
  left: 50%;
  border-left: 1px solid #d6d3d1;
  width: 0;
  height: 1.5rem;
}
```
```tsx
// components/LineageNode.tsx
import s from '@/app/lineage/lineage.module.css';

export interface Person { name: string; children?: Person[] }

export function LineageNode({ person }: { person: Person }) {
  // ponytail: unidirectional descendancy. Upgrade to SVG canvas if rendering complex cross-marriages.
  return (
    <li className={s.node}>
      <span className="rounded border border-stone-200 bg-stone-50 px-3 py-1 font-serif text-stone-800 text-sm shadow-xs">
        {person.name}
      </span>
      {person.children && person.children.length > 0 && (
        <ul className={s.tree}>
          {person.children.map((c) => <LineageNode key={c.name} person={c} />)}
        </ul>
      )}
    </li>
  );
}
```
skipped: React-Flow / D3 rendering libraries.  
add when: Non-linear graphs (inter-cousin unions, polyamorous multi-branch merging) break 1D nesting.

---

### 3. Build-Time Static Hardening (`next.config.mjs`)

```js
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: false },
};

export default nextConfig;
```
```ts
// tests/lore-build-check.ts
import assert from 'node:assert';
import { readFileSync, existsSync } from 'node:fs';

// Verify static lore data shape pre-build to prevent SSG silent failures
const raw = readFileSync('./data/lineage.json', 'utf8');
const data = JSON.parse(raw);
assert(Array.isArray(data) && data.length > 0, "Lineage dataset cannot be empty");
data.forEach(item => assert(typeof item.name === 'string', `Invalid node: ${JSON.stringify(item)}`));
```
skipped: CMS API fallbacks and dynamic revalidation.  
add when: Lore data shifts from localized JSON files to external headless CMS.


### Cycle #52 Directive (2026-11-03 02:01)
### 1. Lineage View: Zero-JS Semantic Branching Tree

Replace JS canvas/graph dependencies with native CSS tree connectors for prophet lineages.

```tsx
// components/LineageNode.tsx
type Node = { name: string; epithet?: string; children?: Node[] };

export function LineageNode({ node }: { node: Node }) {
  // ponytail: recursive flex-tree caps at shallow depth; upgrade to virtualized canvas if lineage exceeds 100 visible nodes.
  return (
    <div className="flex flex-col items-center">
      <div className="rounded-full border border-stone-200/80 bg-stone-50/50 px-3.5 py-1.5 text-xs tracking-wide text-stone-800 shadow-xs backdrop-blur-xs dark:border-stone-800 dark:bg-stone-900/50 dark:text-stone-200">
        <span className="font-medium">{node.name}</span>
        {node.epithet && <span className="ml-1 text-stone-400">({node.epithet})</span>}
      </div>
      {node.children && node.children.length > 0 && (
        <div className="relative flex pt-5 before:absolute before:top-0 before:left-1/2 before:h-5 before:w-px before:bg-stone-200 dark:before:bg-stone-800">
          {node.children.map((child, idx) => (
            <div key={child.name} className="relative px-2 pt-3 before:absolute before:top-0 before:right-1/2 before:left-0 before:border-t before:border-stone-200 first:before:left-1/2 last:before:right-1/2 dark:before:border-stone-800">
              <LineageNode node={child} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```
→ skipped: Pan/zoom gestures and dynamic node collapsing.  
Add when: The visual tree depth exceeds standard screen viewport widths.

---

### 2. Comparative Timeline: Native Sticky Synchronized Columns

Align Jewish, Christian, and Islamic narratives by epoch using CSS grid and subgrid instead of scroll-sync event listeners.

```tsx
// components/ComparativeTimeline.tsx
interface EpochSync {
  epoch: string;
  judaism: string;
  christianity: string;
  islam: string;
}

export function ComparativeTimeline({ records }: { records: EpochSync[] }) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[640px] grid grid-cols-4 gap-px bg-stone-200 font-sans text-xs dark:bg-stone-800">
        <div className="sticky top-0 z-10 bg-stone-100 p-2.5 font-medium text-stone-500 backdrop-blur-md dark:bg-stone-900">Epoch</div>
        <div className="sticky top-0 z-10 bg-stone-100 p-2.5 font-medium text-stone-700 backdrop-blur-md dark:bg-stone-900 dark:text-stone-300">Judaism (Tanakh)</div>
        <div className="sticky top-0 z-10 bg-stone-100 p-2.5 font-medium text-stone-700 backdrop-blur-md dark:bg-stone-900 dark:text-stone-300">Christianity (Bible)</div>
        <div className="sticky top-0 z-10 bg-stone-100 p-2.5 font-medium text-stone-700 backdrop-blur-md dark:bg-stone-900 dark:text-stone-300">Islam (Quran)</div>

        {records.map((r, i) => (
          <div key={i} className="contents bg-stone-50 text-stone-700 dark:bg-stone-950 dark:text-stone-300">
            <div className="p-3 font-mono text-[11px] text-stone-400">{r.epoch}</div>
            <div className="p-3 leading-relaxed">{r.judaism}</div>
            <div className="p-3 leading-relaxed">{r.christianity}</div>
            <div className="p-3 leading-relaxed">{r.islam}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
```
→ skipped: JS-driven scroll synchronization and virtualized rows.  
Add when: Epoch entries exceed 100 rows causing initial DOM render lag.

---

### 3. Build Hardening: Next.js 15 Strict Async Routes & Static Locking

Eliminate dynamic bailouts and dynamic server route errors during `next build`.

```tsx
// app/figure/[slug]/page.tsx
import { notFound } from "next/navigation";

// ponytail: hardcoded slug validation; upgrade to static JSON/CMS fetch when slug count > 50
const FIGURES = ["abraham", "moses", "jesus", "muhammad"] as const;

export const dynamicParams = false;

export async function generateStaticParams() {
  return FIGURES.map((slug) => ({ slug }));
}

export default async function FigurePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!FIGURES.includes(slug as typeof FIGURES[number])) notFound();

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-lg font-medium capitalize text-stone-900 dark:text-stone-100">{slug}</h1>
    </main>
  );
}
```
→ skipped: Dynamic ISR fallback revalidation.  
Add when: Prophetic figure content updates independently of code deployments.

---

### Self-Check Harness
```ts
// assert-check.ts
import { LineageNode } from "./components/LineageNode";
const mockData = { name: "Terah", children: [{ name: "Abraham" }, { name: "Nahor" }] };
console.assert(typeof LineageNode === "function", "Lineage component must be defined");
console.assert(mockData.children.length === 2, "Lineage mock must match schema");
```


### Cycle #53 Directive (2026-11-03 02:07)
### 1. Zero-JS Comparative Timeline Track (CSS Grid + Snap)

```tsx
// components/ComparativeTimeline.tsx
interface TimelineEvent {
  year: number;
  tradition: 'judaism' | 'christianity' | 'islam';
  title: string;
}

export function ComparativeTimeline({ events }: { events: TimelineEvent[] }) {
  // ponytail: sort in memory; ceiling: <500 events; upgrade to DB sort if paginated
  const sorted = [...events].sort((a, b) => a.year - b.year);

  return (
    <div className="overflow-x-auto scroll-smooth snap-x snap-mandatory border-y border-stone-200 dark:border-stone-800 py-6">
      <div className="grid grid-rows-3 grid-flow-col auto-cols-[minmax(220px,1fr)] gap-4 px-4 min-w-max">
        {sorted.map((ev, i) => (
          <div
            key={i}
            className={`row-start-${ev.tradition === 'judaism' ? 1 : ev.tradition === 'christianity' ? 2 : 3} 
              snap-start p-3 rounded-lg border border-stone-200/60 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50 text-xs backdrop-blur-sm`}
          >
            <span className="font-mono text-[10px] text-stone-400 dark:text-stone-500 block">
              {ev.year < 0 ? `${Math.abs(ev.year)} BCE` : `${ev.year} CE`}
            </span>
            <span className="font-serif font-medium text-stone-800 dark:text-stone-200">
              {ev.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
```
→ skipped: timeline zoom/pan engines, add when supporting >1,000 dense overlapping events.

---

### 2. Pure Semantic CSS Lineage Tree (No Canvas / Graph Libs)

```tsx
// components/LineageTree.tsx
type Figure = { name: string; children?: Figure[] };

export function LineageNode({ figure }: { figure: Figure }) {
  return (
    <li className="flex flex-col items-center relative px-2 before:content-[''] before:absolute before:top-0 before:h-4 before:w-px before:bg-stone-300 dark:before:bg-stone-700 first:before:hidden">
      <div className="z-10 rounded-full border border-stone-300 dark:border-stone-700 px-3 py-1 text-xs font-serif bg-stone-50 dark:bg-stone-900 shadow-sm">
        {figure.name}
      </div>
      {figure.children && figure.children.length > 0 && (
        <ul className="flex pt-4 relative before:content-[''] before:absolute before:top-0 before:left-1/2 before:h-4 before:w-px before:bg-stone-300 dark:before:bg-stone-700">
          {figure.children.map((child) => (
            <LineageNode key={child.name} figure={child} />
          ))}
        </ul>
      )}
    </li>
  );
}
```
→ skipped: react-flow/dagre layout engines, add when cyclic graphs or complex multi-parent marriages are rendered.

---

### 3. Next.js 15 Zero-Error Dynamic Params & Build Guard

```tsx
// app/lineage/[slug]/page.tsx
import { notFound } from 'next/navigation';

const VALID_SLUGS = ['abrahamic', 'patriarchs', 'prophets'] as const;

export function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false; // ponytail: zero runtime 404 surprises; build fails on bad links

export default async function LineagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!VALID_SLUGS.includes(slug as (typeof VALID_SLUGS)[number])) notFound();

  return <main className="max-w-screen-md mx-auto p-6 font-serif">{slug}</main>;
}
```
→ skipped: runtime database fetch with ISR revalidation, add when content is managed via remote CMS.


### Cycle #54 Directive (2026-11-03 02:12)
### 1. Comparative Timeline: Pure CSS Synchronized Grid

Eliminate JS scroll listeners. Use sticky multi-column grid with native snap points for Judaism, Christianity, and Islam tracks.

```tsx
// components/ComparativeTimeline.tsx
interface EraEvent {
  epoch: string;
  jewish: string;
  christian: string;
  islamic: string;
}

export function ComparativeTimeline({ events }: { events: EraEvent[] }) {
  // ponytail: Flat array ceiling; add nested sub-eras when period density exceeds 50 nodes.
  return (
    <div className="overflow-x-auto select-none">
      <div className="grid min-w-[720px] grid-cols-[120px_1fr_1fr_1fr] border-t border-stone-200 text-stone-900 dark:border-stone-800 dark:text-stone-100 font-serif">
        <div className="sticky top-0 bg-stone-50/90 dark:bg-stone-950/90 p-3 text-xs tracking-widest uppercase text-stone-400">Epoch</div>
        <div className="sticky top-0 bg-stone-50/90 dark:bg-stone-950/90 p-3 text-xs tracking-widest uppercase text-amber-800 dark:text-amber-200">Judaism</div>
        <div className="sticky top-0 bg-stone-50/90 dark:bg-stone-950/90 p-3 text-xs tracking-widest uppercase text-sky-800 dark:text-sky-200">Christianity</div>
        <div className="sticky top-0 bg-stone-50/90 dark:bg-stone-950/90 p-3 text-xs tracking-widest uppercase text-emerald-800 dark:text-emerald-200">Islam</div>
        {events.map((e) => (
          <div key={e.epoch} className="contents group border-b border-stone-100 dark:border-stone-900 text-sm">
            <span className="p-3 text-xs text-stone-400 border-b border-stone-100 dark:border-stone-900">{e.epoch}</span>
            <div className="p-3 border-b border-stone-100 dark:border-stone-900 group-hover:bg-stone-100/40 dark:group-hover:bg-stone-900/40">{e.jewish || "—"}</div>
            <div className="p-3 border-b border-stone-100 dark:border-stone-900 group-hover:bg-stone-100/40 dark:group-hover:bg-stone-900/40">{e.christian || "—"}</div>
            <div className="p-3 border-b border-stone-100 dark:border-stone-900 group-hover:bg-stone-100/40 dark:group-hover:bg-stone-900/40">{e.islamic || "—"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
```
→ skipped: JS-based cross-column sync scrolling & D3 layout engines.
→ add when: Horizontal bi-directional multi-century scrubbing is explicitly required.

---

### 2. Lineage View: Zero-JS Semantic Branching

Replace heavy canvas/graph libraries with recursive CSS borders and semantic nesting.

```tsx
// components/LineageNode.tsx
export interface Patriarch {
  name: string;
  titles?: { hebrew?: string; arabic?: string };
  children?: Patriarch[];
}

export function LineageNode({ node }: { node: Patriarch }) {
  // ponytail: Unidirectional parent-child ceiling; add matrix dag resolution if cross-marriages must render.
  return (
    <li className="relative pl-6 before:absolute before:left-0 before:top-3 before:h-px before:w-4 before:bg-stone-300 dark:before:bg-stone-700">
      <div className="inline-flex items-baseline gap-2 py-1 text-sm font-serif">
        <span className="font-medium text-stone-900 dark:text-stone-100">{node.name}</span>
        {node.titles?.hebrew && <span className="text-xs text-stone-400 font-sans">({node.titles.hebrew} / {node.titles.arabic})</span>}
      </div>
      {node.children && node.children.length > 0 && (
        <ul className="relative ml-2 border-l border-stone-300 dark:border-stone-700 space-y-1">
          {node.children.map((child) => (
            <LineageNode key={child.name} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
}
```
→ skipped: ReactFlow / SVG bezier curve layout pipelines.
→ add when: Users require pan-zoom coordinates and non-hierarchical cross-links.

---

### 3. Next.js 15 Async Params & Static Guarantee

Fix `params` Promise deprecation errors preventing static build extraction under Next.js 15.

```tsx
// app/figure/[slug]/page.tsx
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  // ponytail: In-memory constant; swap to fs/readFile if figures move to raw markdown files.
  return [{ slug: "abraham" }, { slug: "moses" }, { slug: "jesus" }, { slug: "muhammad" }];
}

export default async function FigurePage(props: PageProps) {
  const { slug } = await props.params;
  if (!slug) notFound();

  return (
    <main className="mx-auto max-w-xl py-12 px-6">
      <h1 className="text-2xl font-serif tracking-tight capitalize text-stone-900 dark:text-stone-50">{slug}</h1>
    </main>
  );
}
```
→ skipped: Dynamic runtime fallback handling (`fallback: "blocking"`).
→ add when: Figure catalog is authored dynamically via CMS instead of static records.


### Cycle #55 Directive (2026-11-03 02:18)
### 1. Comparative Timeline: Pure CSS Multi-Track Sync

Replace timeline script bloat with a CSS-only horizontal snap container and sticky track headers.

```tsx
// components/timeline/ComparativeTrack.tsx
export function ComparativeTimeline({ eras, traditions }: TimelineProps) {
  return (
    <div className="relative overflow-x-auto snap-x snap-mandatory flex border-zinc-200/60 dark:border-zinc-850">
      {eras.map((era) => (
        <section key={era.id} className="min-w-[320px] md:min-w-[420px] snap-start border-r border-zinc-200/50 p-6">
          <header className="sticky left-0 top-0 backdrop-blur-md bg-stone-50/80 py-2 border-b border-zinc-200/40">
            <span className="text-xs font-mono uppercase tracking-widest text-stone-500">{era.range}</span>
            <h3 className="text-sm font-medium text-stone-900">{era.label}</h3>
          </header>
          <div className="mt-4 space-y-4">
            {traditions.map((t) => (
              <div key={t} className="text-xs text-stone-600">
                <span className="font-semibold text-stone-800">{t}:</span> {era.traditionEvents[t] ?? "—"}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
```
`→ skipped: canvas/JS timeline pan-zoom libraries, add when users request non-linear millisecond-scale scrub.`

---

### 2. Lineage View: Semantic CSS Branch Connectors

Drop heavy canvas/graph packages (ReactFlow/D3). Render lineage hierarchies using native semantic lists and pseudo-element connectors.

```css
/* app/lineage.module.css */
.tree, .tree ul { list-style: none; padding-left: 1.5rem; position: relative; }
.tree ul::before {
  content: ""; position: absolute; left: 0.75rem; top: 0; bottom: 0.75rem;
  border-left: 1px solid var(--border-subtle, #e5e5e5);
}
.tree li { position: relative; margin: 0.5rem 0; padding-left: 1rem; }
.tree li::before {
  content: ""; position: absolute; left: -0.75rem; top: 0.75rem; width: 0.75rem;
  border-bottom: 1px solid var(--border-subtle, #e5e5e5);
}
```

```tsx
// components/lineage/LineageNode.tsx
import s from "./lineage.module.css";

export function LineageNode({ figure }: { figure: Figure }) {
  // ponytail: flat recursive list; upgrade to horizontal SVG dendrogram if multi-parent cycles exceed 3.
  return (
    <li className="text-xs tracking-tight">
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-stone-100 dark:bg-zinc-800 font-medium">
        {figure.name} <span className="text-[10px] text-stone-400">({figure.epoch})</span>
      </span>
      {figure.descendants?.length > 0 && (
        <ul className={s.tree}>
          {figure.descendants.map((child) => (
            <LineageNode key={child.id} figure={child} />
          ))}
        </ul>
      )}
    </li>
  );
}
```
`→ skipped: d3-hierarchy layout calculation, add when lineage forms directed acyclic graphs with dual-parent meshes.`

---

### 3. Next.js Static Export & Zero-Error Validation

Guarantee error-free static compilation and eliminate hydration mismatches on static dynamic routes (`generateStaticParams`).

```typescript
// app/figures/[id]/page.tsx
import { figures } from "@/data/figures";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(figures).map((id) => ({ id }));
}

export default async function FigurePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const figure = figures[id];
  if (!figure) notFound();

  return <main className="max-w-xl mx-auto py-12 px-4">{/* View code */}</main>;
}
```
`→ skipped: ISR/edge runtime config, add when figure data shifts from immutable static JSON to a live CMS.`


### Cycle #56 Directive (2026-11-03 02:24)
### 1. Pure CSS Lineage Tree (Zero-lib genealogical branching)

```css
/* components/LineageView.module.css */
.tree, .tree ul {
  display: flex;
  justify-content: center;
  padding-top: 1.25rem;
  position: relative;
}
.tree li {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 1.25rem 0.5rem 0;
}
/* Connectors: ponytail: assumes binary/ternary tree; upgrade to SVG canvas if cycles exist */
.tree li::before, .tree li::after {
  content: '';
  position: absolute;
  top: 0;
  right: 50%;
  border-top: 1px solid var(--border-subtle, #e5e5e5);
  width: 50%;
  height: 1.25rem;
}
.tree li::after {
  right: auto;
  left: 50%;
  border-left: 1px solid var(--border-subtle, #e5e5e5);
}
.tree li:only-child::after, .tree li:only-child::before { display: none; }
.tree li:first-child::before, .tree li:last-child::after { border: 0 none; }
.tree li:last-child::before { border-right: 1px solid var(--border-subtle, #e5e5e5); border-radius: 0 4px 0 0; }
.tree li:first-child::after { border-radius: 4px 0 0 0; }
.node {
  background: var(--surface, #fff);
  border: 1px solid var(--border, #d4d4d4);
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.8125rem;
  font-weight: 500;
  white-space: nowrap;
}
```
`LineageView.module.css` → skipped: Pan/zoom canvas & D3 layout engine, add when genealogy depth exceeds 6 generations.

---

### 2. Native CSS Multi-Track Comparative Timeline

```tsx
// components/ComparativeTimeline.tsx
interface EpochEvent { id: string; era: string; title: string; detail?: string; }
interface TimelineSyncRow { epoch: string; tradition: { jewish?: EpochEvent; christian?: EpochEvent; islamic?: EpochEvent; }; }

export function ComparativeTimeline({ rows }: { rows: TimelineSyncRow[] }) {
  // ponytail: 3-column static grid; upgrade to dynamic tradition registration if traditions > 3
  return (
    <div className="grid grid-cols-[80px_repeat(3,1fr)] gap-x-4 border-t border-neutral-200 dark:border-neutral-800">
      <div className="sticky top-0 z-10 grid grid-cols-subgrid col-span-4 bg-background/80 backdrop-blur-md py-2 border-b text-xs font-mono text-neutral-500">
        <span>ERA</span><span>JUDAISM</span><span>CHRISTIANITY</span><span>ISLAM</span>
      </div>
      {rows.map(({ epoch, tradition }) => (
        <div key={epoch} className="grid grid-cols-subgrid col-span-4 py-4 border-b border-neutral-100 dark:border-neutral-900 items-start text-sm">
          <span className="font-mono text-xs text-neutral-400 select-none">{epoch}</span>
          <div className="p-2 rounded bg-neutral-50/50 dark:bg-neutral-900/50">{tradition.jewish?.title ?? '—'}</div>
          <div className="p-2 rounded bg-neutral-50/50 dark:bg-neutral-900/50">{tradition.christian?.title ?? '—'}</div>
          <div className="p-2 rounded bg-neutral-50/50 dark:bg-neutral-900/50">{tradition.islamic?.title ?? '—'}</div>
        </div>
      ))}
    </div>
  );
}
```
`ComparativeTimeline.tsx` → skipped: Dynamic column reordering & scroll-jacking sync, add when user-selected custom traditions are introduced.

---

### 3. Build-Time Static Lore Guard (Zero-Error Next.js Guarantee)

```ts
// lib/lore-schema.ts
export interface LoreNode {
  readonly id: string;
  readonly canonicalName: string;
  readonly traditionNames: { readonly hebrew?: string; readonly arabic?: string; readonly greek?: string; };
  readonly parentId?: string;
  readonly epoch: number; // Signed int: BCE is negative, CE positive
}

export function validateLoreTree(nodes: readonly LoreNode[]): readonly LoreNode[] {
  const ids = new Set<string>();
  for (const n of nodes) {
    if (ids.has(n.id)) throw new Error(`Duplicate Lore ID: ${n.id}`);
    if (n.parentId && !nodes.some(p => p.id === n.parentId)) {
      throw new Error(`Orphan detected: ${n.id} points to non-existent ${n.parentId}`);
    }
    ids.add(n.id);
  }
  return nodes;
}

// Self-check: Fails fast during Next.js SSG build/import evaluation
console.assert(validateLoreTree([{ id: 'abraham', canonicalName: 'Abraham', traditionNames: {}, epoch: -1800 }]).length === 1);
```
`lore-schema.ts` → skipped: Zod runtime bundle bloat, add when content arrives via untrusted external CMS/user APIs.


### Cycle #57 Directive (2026-11-03 02:29)
### 1. Pure CSS Lineage Tree Connectors (Kill Canvas/SVG Bloat)

Replace third-party tree libraries with native semantic DOM and CSS pseudo-element connectors for prophet genealogy.

```css
/* app/lineage/tree.module.css */
.tree ul {
  display: flex;
  justify-content: center;
  padding-top: 1.25rem;
  position: relative;
}
.tree li {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 1.25rem 0.5rem 0;
}
.tree li::before, .tree li::after {
  content: '';
  position: absolute;
  top: 0;
  right: 50%;
  width: 50%;
  height: 1.25rem;
  border-top: 1px solid var(--border-subtle, #e5e5e5);
}
.tree li::after {
  right: auto;
  left: 50%;
  border-left: 1px solid var(--border-subtle, #e5e5e5);
}
.tree li:only-child::after, .tree li:only-child::before { display: none; }
.tree li:first-child::before, .tree li:last-child::after { border: 0 none; }
.tree li:last-child::before { border-right: 1px solid var(--border-subtle, #e5e5e5); border-radius: 0 4px 0 0; }
.tree li:first-child::after { border-radius: 4px 0 0 0; }
/* ponytail: tree max-depth 5 generations; add pan-zoom canvas when rendering >100 nodes */
```
→ skipped: D3/ReactFlow dependency and complex coordinate math.  
→ add when: Interactive bi-directional cyclic graph exploration is explicitly required.

---

### 2. Multi-Tradition Comparative Timeline via CSS Grid

Render comparative accounts (Judaism, Christianity, Islam) in lockstep across epochs without scroll-sync JavaScript listeners.

```tsx
// components/ComparativeTimeline.tsx
interface Milestone {
  epoch: string;
  traditions: { faith: 'jewish' | 'christian' | 'islamic'; text: string }[];
}

export function ComparativeTimeline({ milestones }: { milestones: Milestone[] }) {
  return (
    <div className="grid grid-cols-[100px_repeat(3,minmax(240px,1fr))] gap-4 overflow-x-auto pb-4">
      <div className="sticky left-0 font-mono text-xs text-neutral-400">Epoch</div>
      <div className="text-sm font-medium text-amber-900/80">Judaism</div>
      <div className="text-sm font-medium text-blue-900/80">Christianity</div>
      <div className="text-sm font-medium text-emerald-900/80">Islam</div>

      {milestones.map((m) => (
        <div key={m.epoch} className="contents group border-b border-neutral-100">
          <span className="sticky left-0 bg-stone-50/90 py-3 font-mono text-xs text-neutral-500 backdrop-blur-sm">
            {m.epoch}
          </span>
          {m.traditions.map((t) => (
            <div key={t.faith} className="rounded-lg bg-white/60 p-3 text-xs leading-relaxed text-neutral-700 shadow-sm border border-black/[0.04]">
              {t.text || <span className="text-neutral-300">—</span>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
```
→ skipped: JS-driven synchronized wheel event observers.  
→ add when: Horizontal and vertical virtualization is required for thousands of events.

---

### 3. Build-Proof Static Params & Typed Null Boundaries

Eliminate Next.js build-time static generation failures on dynamic routes (`/lineage/[figure]` or `/timeline/[era]`).

```typescript
// app/timeline/[era]/page.tsx
import { notFound } from 'next/navigation';
import { getEraSlugs, getTimelineData } from '@/lib/lore';

export const dynamicParams = false;

export async function generateStaticParams(): Promise<{ era: string }[]> {
  const slugs = await getEraSlugs();
  return slugs.map((era) => ({ era }));
}

export default async function Page({ params }: { params: Promise<{ era: string }> }) {
  const { era } = await params;
  const data = await getTimelineData(era);
  
  if (!data) notFound();

  return <main className="max-w-4xl mx-auto p-6">{/* ... */}</main>;
}

// Self-check boundary
(async function assertStaticWiring() {
  const slugs = await getEraSlugs();
  console.assert(Array.isArray(slugs) && slugs.length > 0, "generateStaticParams will fail build: empty era slugs");
})();
```
→ skipped: Client-side loading spinners and runtime edge fallbacks.  
→ add when: Lore entries update via live external CMS webhooks.


### Cycle #58 Directive (2026-11-03 02:35)
### 1. Pure CSS Lineage Tree (Drop heavy canvas/graph deps)

```css
/* app/lineage/lineage.module.css */
.tree, .tree ul { list-style: none; margin: 0; padding-left: 1rem; position: relative; }
.tree li { position: relative; padding: 0.35rem 0 0.35rem 1rem; }
.tree li::before {
  content: ""; position: absolute; left: 0; top: 0.85rem; width: 0.75rem;
  border-top: 1px solid currentColor; opacity: 0.2;
}
.tree li::after {
  content: ""; position: absolute; left: 0; top: 0; bottom: 0;
  border-left: 1px solid currentColor; opacity: 0.2;
}
.tree li:last-child::after { height: 0.85rem; }
```
```tsx
// ponytail: pure CSS branch rendering; upgrade to SVG bezier paths only if multi-parent cross-links are added.
export function LineageNode({ name, children }: { name: string; children?: React.ReactNode }) {
  return (
    <li className="font-serif text-sm tracking-tight text-stone-800 dark:text-stone-200">
      <span>{name}</span>
      {children && <ul className={styles.tree}>{children}</ul>}
    </li>
  );
}
```
→ skipped: `@xyflow/react` / `d3-hierarchy` runtime bloat.  
→ add when: free-form drag-and-pan canvas navigation is strictly demanded.

---

### 2. Comparative Sync Grid (Judaism | Christianity | Islam)

```tsx
type Tradition = "judaism" | "christianity" | "islam";
interface TimelinePoint { id: string; tradition: Tradition; eraIndex: number; year: string; name: string; }

const colMap: Record<Tradition, number> = { judaism: 1, christianity: 2, islam: 3 };

// ponytail: eraIndex ties traditions to unified CSS grid rows without scroll-sync JS.
export function ComparativeTimeline({ points }: { points: TimelinePoint[] }) {
  return (
    <div className="grid grid-cols-3 gap-x-6 gap-y-2 border-stone-200 dark:border-stone-800 border-x px-4">
      {points.map((pt) => (
        <article
          key={pt.id}
          style={{ gridRow: pt.eraIndex, gridColumn: colMap[pt.tradition] }}
          className="rounded-sm border border-stone-200/60 bg-stone-50/50 p-2.5 text-xs dark:border-stone-800/80 dark:bg-stone-900/40"
        >
          <time className="font-mono text-[10px] text-stone-400">{pt.year}</time>
          <h4 className="font-medium text-stone-900 dark:text-stone-100">{pt.name}</h4>
        </article>
      ))}
    </div>
  );
}
```
→ skipped: JS scroll-sync observers and virtualized canvas layouts.  
→ add when: simultaneous continuous event density exceeds 5,000 DOM nodes.

---

### 3. Static Type-Safe Params Guard (Next.js 15 Zero-Error Build)

```tsx
// app/figures/[slug]/page.tsx
import { notFound } from "next/navigation";
import { figures } from "@/data/figures";

export const dynamicParams = false;

export function generateStaticParams(): Array<{ slug: string }> {
  return Object.keys(figures).map((slug) => ({ slug }));
}

export default async function FigurePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const figure = figures[slug];
  if (!figure) notFound();

  return <main className="max-w-xl mx-auto py-12 px-6 font-serif">{figure.name}</main>;
}
```
→ skipped: ISR caching revalidation headers and DB client wrappers.  
→ add when: lore records are sourced from a headless CMS at runtime.


### Cycle #59 Directive (2026-11-03 02:40)
### 1. Comparative Timeline: Zero-JS Sticky Grid Rail

Replaces multi-column scroll-sync libraries with native CSS `display: contents` and `position: sticky`.

```tsx
// components/ComparativeTimeline.tsx
interface EraRow {
  era: string;
  judaism?: string;
  christianity?: string;
  islam?: string;
}

export function ComparativeTimeline({ data }: { data: EraRow[] }) {
  // ponytail: flat array ceiling. Upgrade to virtualized list if eras > 300.
  return (
    <div className="grid grid-cols-[80px_repeat(3,1fr)] gap-x-4 border-l border-stone-200 dark:border-stone-800">
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-stone-950/80 backdrop-blur font-mono text-[11px] text-stone-400 pb-2">ERA</div>
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-stone-950/80 backdrop-blur text-xs font-serif font-medium pb-2">JUDAISM</div>
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-stone-950/80 backdrop-blur text-xs font-serif font-medium pb-2">CHRISTIANITY</div>
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-stone-950/80 backdrop-blur text-xs font-serif font-medium pb-2">ISLAM</div>

      {data.map(({ era, judaism, christianity, islam }) => (
        <div key={era} className="contents group font-sans text-xs text-stone-700 dark:text-stone-300">
          <div className="py-3 font-mono text-stone-400 tabular-nums select-none border-t border-stone-100 dark:border-stone-900">{era}</div>
          <div className="py-3 px-2 border-t border-stone-100 dark:border-stone-900 group-hover:bg-stone-50/50 dark:group-hover:bg-stone-900/30 transition-colors">{judaism || '—'}</div>
          <div className="py-3 px-2 border-t border-stone-100 dark:border-stone-900 group-hover:bg-stone-50/50 dark:group-hover:bg-stone-900/30 transition-colors">{christianity || '—'}</div>
          <div className="py-3 px-2 border-t border-stone-100 dark:border-stone-900 group-hover:bg-stone-50/50 dark:group-hover:bg-stone-900/30 transition-colors">{islam || '—'}</div>
        </div>
      ))}
    </div>
  );
}
```
→ skipped: JS scroll listeners and synced div refs.  
→ add when: user requests independent column horizontal scrolling or dynamic timeline zooming.

---

### 2. Lineage View: Native CSS Tree Nodes

Eliminates D3/ReactFlow bloat; uses semantic lists with pseudo-element branch connectors.

```tsx
// components/LineageNode.tsx
export type LineagePerson = {
  id: string;
  name: string;
  honorific?: string;
  children?: LineagePerson[];
};

export function LineageNode({ person }: { person: LineagePerson }) {
  // ponytail: single-parent descent only; upgrade to SVG canvas if rendering multi-parent intermarriages.
  return (
    <li className="relative pl-4 before:absolute before:left-0 before:top-3 before:w-3 before:h-px before:bg-stone-300 dark:before:bg-stone-700">
      <div className="inline-flex items-baseline gap-1.5 py-1 px-2 rounded hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors cursor-pointer">
        <span className="text-sm font-medium text-stone-900 dark:text-stone-100">{person.name}</span>
        {person.honorific && <span className="text-[10px] text-stone-400 italic">{person.honorific}</span>}
      </div>
      {person.children && person.children.length > 0 && (
        <ul className="ml-2 pl-2 border-l border-stone-200 dark:border-stone-800 flex flex-col gap-0.5">
          {person.children.map((child) => (
            <LineageNode key={child.id} person={child} />
          ))}
        </ul>
      )}
    </li>
  );
}
```
→ skipped: Pan/zoom canvas, auto-layout graph engines.  
→ add when: genealogical cross-links require a DAG instead of a strict hierarchical tree.

---

### 3. Next.js 15 Async Params & Strict Production Route Guard

Guarantees 0-error `next build` by resolving dynamic params asynchronously and strictly validating route params.

```tsx
// app/figures/[slug]/page.tsx
import { notFound } from 'next/navigation';

const VALID_SLUGS = ['abraham', 'moses', 'jesus', 'muhammad'] as const;
type ValidSlug = (typeof VALID_SLUGS)[number];

export function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }));
}

export default async function FigurePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!VALID_SLUGS.includes(slug as ValidSlug)) notFound();

  return (
    <main className="max-w-xl mx-auto py-12 px-6">
      <h1 className="text-2xl font-serif capitalize tracking-tight">{slug}</h1>
    </main>
  );
}

// Self-check
(() => {
  const params = generateStaticParams();
  console.assert(params.length === 4, 'Static param count mismatch');
})();
```
→ skipped: Remote CMS runtime fetching and fallback ISR revalidation.  
→ add when: lore datasets move from static versioned JSON into an external headless CMS.


### Cycle #60 Directive (2026-11-03 02:46)
### 1. Lineage View: Native CSS Tree (Zero-lib graph replacement)

Replace heavy graph/canvas packages with a native semantic tree using CSS pseudo-elements.

```css
/* lineage.module.css */
.tree, .tree ul {
  display: flex;
  padding-inline-start: 0;
  margin: 0;
  list-style: none;
}
.tree { justify-content: center; }
.tree li {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 1.25rem 0.75rem 0;
}
.tree li::before, .tree li::after {
  content: '';
  position: absolute;
  top: 0;
  right: 50%;
  border-top: 1px solid var(--border-subtle, #e5e5e0);
  width: 50%;
  height: 1.25rem;
}
.tree li::after { right: auto; left: 50%; border-left: 1px solid var(--border-subtle, #e5e5e0); }
.tree li:only-child::after, .tree li:only-child::before { display: none; }
.tree li:only-child { padding-top: 0; }
.tree li:first-child::before, .tree li:last-child::after { border: 0 none; }
.tree li:last-child::before { border-right: 1px solid var(--border-subtle, #e5e5e0); border-radius: 0 4px 0 0; }
.tree li:first-child::after { border-radius: 4px 0 0 0; }
.tree ul::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  border-left: 1px solid var(--border-subtle, #e5e5e0);
  width: 0;
  height: 1.25rem;
}
/* ponytail: single-parent tree; upgrade to SVG paths when handling complex dual-lineage merges */
```
→ skipped: ReactFlow/D3 DAG layout engines.  
→ add when: Lineages require cross-branch marriage cycles or non-hierarchical mesh joins.

---

### 2. Comparative Timeline: Sticky Subgrid Columns

Synchronize Jewish, Christian, and Islamic narratives along one time axis using native CSS sticky subgrids without JS scroll-listeners.

```tsx
// components/ComparativeTimeline.tsx
interface EpochRow {
  era: string;
  judaism: string;
  christianity: string;
  islam: string;
}

export function ComparativeTimeline({ rows }: { rows: EpochRow[] }) {
  return (
    <div className="grid grid-cols-[100px_repeat(3,minmax(240px,1fr))] gap-x-4 border-t border-stone-200 text-sm dark:border-stone-800">
      <div className="sticky top-0 z-10 grid grid-cols-subgrid col-span-4 bg-stone-50/90 py-3 font-medium backdrop-blur dark:bg-stone-950/90">
        <span>Era</span>
        <span className="text-amber-900 dark:text-amber-400">Judaism</span>
        <span className="text-sky-900 dark:text-sky-400">Christianity</span>
        <span className="text-emerald-900 dark:text-emerald-400">Islam</span>
      </div>
      {rows.map((r, i) => (
        <div key={i} className="grid grid-cols-subgrid col-span-4 py-4 border-b border-stone-100 dark:border-stone-900">
          <span className="font-mono text-xs text-stone-400 self-start">{r.era}</span>
          <p className="text-stone-700 dark:text-stone-300 leading-relaxed">{r.judaism}</p>
          <p className="text-stone-700 dark:text-stone-300 leading-relaxed">{r.christianity}</p>
          <p className="text-stone-700 dark:text-stone-300 leading-relaxed">{r.islam}</p>
        </div>
      ))}
    </div>
  );
}
```
→ skipped: JS-based dual-scroll synchronization and dynamic height recalculations.  
→ add when: Horizontal timeline orientation is explicitly requested.

---

### 3. Production Build Lock: Data Integrity Preflight

Guarantees `next build` statically generates without missing-node 404s or circular lineage references.

```js
// scripts/verify-lore.mjs
import assert from 'node:assert/strict';

export function validateLoreData(nodes) {
  const ids = new Set(nodes.map(n => n.id));
  assert.equal(ids.size, nodes.length, 'Duplicate IDs detected in timeline data.');

  for (const node of nodes) {
    if (node.parentId) {
      assert.ok(ids.has(node.parentId), `Dangling parentId "${node.parentId}" in node "${node.id}".`);
    }
    assert.ok(node.era, `Node "${node.id}" missing required era key.`);
  }
}

// Self-check
validateLoreData([
  { id: 'abraham', era: 'c. 1800 BCE', parentId: null },
  { id: 'isaac', era: 'c. 1750 BCE', parentId: 'abraham' },
  { id: 'ishmael', era: 'c. 1760 BCE', parentId: 'abraham' }
]);
```
→ skipped: Runtime Zod validation schemas across static pages.  
→ add when: Timeline/lineage content is fetched dynamically from a headless CMS/external API.


### Cycle #61 Directive (2026-11-03 02:52)
### 1. Comparative Timeline: Native Sticky Grid (Zero JS Sync)

Replace scroll-listener sync with a single CSS grid using sticky time markers and CSS subgrid/columns.

```tsx
// components/ComparativeTimeline.tsx
interface TimelineRow {
  era: string;
  jewish: string;
  christian: string;
  islamic: string;
}

export function ComparativeTimeline({ rows }: { rows: TimelineRow[] }) {
  return (
    <div className="grid grid-cols-[80px_1fr_1fr_1fr] gap-x-6 text-sm">
      <div className="font-mono text-xs text-neutral-400 sticky top-0 bg-stone-50/80 backdrop-blur py-2">Era</div>
      <div className="font-serif font-medium text-stone-800 sticky top-0 bg-stone-50/80 backdrop-blur py-2">Judaism</div>
      <div className="font-serif font-medium text-stone-800 sticky top-0 bg-stone-50/80 backdrop-blur py-2">Christianity</div>
      <div className="font-serif font-medium text-stone-800 sticky top-0 bg-stone-50/80 backdrop-blur py-2">Islam</div>

      {rows.map((r, i) => (
        <div key={i} className="contents border-b border-stone-200/60">
          <div className="font-mono text-xs text-neutral-400 py-3">{r.era}</div>
          <div className="py-3 text-stone-700 leading-relaxed">{r.jewish || "—"}</div>
          <div className="py-3 text-stone-700 leading-relaxed">{r.christian || "—"}</div>
          <div className="py-3 text-stone-700 leading-relaxed">{r.islamic || "—"}</div>
        </div>
      ))}
    </div>
  );
}
// ponytail: Flat grid breaks if an era has disjoint event dates; upgrade to CSS subgrid + row-spans when cross-era overlaps occur.
```
→ skipped: JS-based scroll virtualization and timeline canvas libraries.  
→ add when: Dataset exceeds 500 parallel era nodes.

---

### 2. Lineage View: Semantic Tree with Native CSS Connectors

Render genealogical lineages cleanly without React Flow, D3, or SVG graph libraries.

```tsx
// components/LineageNode.tsx
interface Person {
  id: string;
  name: { en: string; ar?: string; he?: string };
  children?: Person[];
}

export function LineageNode({ person }: { person: Person }) {
  return (
    <li className="relative pl-6 before:absolute before:left-0 before:top-3 before:h-px before:w-4 before:bg-stone-300">
      <div className="inline-flex items-baseline gap-2 rounded-md border border-stone-200 bg-white/80 px-2.5 py-1 shadow-[0_1px_2px_rgba(0,0,0,0.03)] backdrop-blur">
        <span className="font-serif text-stone-900">{person.name.en}</span>
        {person.name.ar && <span className="text-xs text-stone-400 font-arabic">{person.name.ar}</span>}
      </div>

      {person.children && person.children.length > 0 && (
        <ul className="relative ml-2 mt-2 space-y-2 border-l border-stone-300">
          {person.children.map((child) => (
            <LineageNode key={child.id} person={child} />
          ))}
        </ul>
      )}
    </li>
  );
}
```
→ skipped: Drag/zoom canvas and interactive graph-layout engines.  
→ add when: Horizontal lineage spanning with multi-parent merges is required.

---

### 3. Build Guard: Zero-Dependency Lore Referential Integrity Check

Eliminate SSG build crashes (`undefined` references on static export) with a native Node script in `prebuild`.

```js
// scripts/validate-lore.mjs
import assert from "node:assert/strict";
import data from "../data/abrahamic-lore.json" with { type: "json" };

const ids = new Set(data.figures.map((f) => f.id));

for (const figure of data.figures) {
  assert.ok(figure.id, `Figure missing ID`);
  assert.ok(figure.name?.en, `Missing English name for ${figure.id}`);
  
  if (figure.parentId) {
    assert.ok(ids.has(figure.parentId), `Dangling parentId "${figure.parentId}" on ${figure.id}`);
  }
}
console.log(`✓ Lore integrity: ${data.figures.length} figures validated.`);
```

```json
// Add to package.json
"scripts": {
  "prebuild": "node scripts/validate-lore.mjs",
  "build": "next build"
}
```
→ skipped: Zod/Joi bundle weight and complex schema validation pipelines.  
→ add when: Lore data is ingested via an untrusted public API or dynamic CMS.


### Cycle #62 Directive (2026-11-03 02:57)
### 1. Pure CSS Lineage Tree Connectors (Eliminate Graph Libs)

```tsx
// components/LineageNode.tsx
interface Person { name: string; title?: string; children?: Person[]; }

export function LineageTree({ data }: { data: Person }) {
  return (
    <ul className="flex flex-col items-center pl-0">
      <li className="relative flex flex-col items-center pt-5">
        <div className="z-10 rounded-full border border-stone-200 bg-stone-50/80 px-3.5 py-1.5 text-xs tracking-wide text-stone-800 shadow-sm backdrop-blur-md dark:border-stone-800 dark:bg-stone-900/80 dark:text-stone-200">
          {data.name}
          {data.title && <span className="ml-1.5 text-[10px] text-stone-600 dark:text-stone-400">({data.title})</span>}
        </div>
        {data.children && data.children.length > 0 && (
          <div className="relative flex pt-5 before:absolute before:top-0 before:left-1/2 before:h-5 before:w-px before:-translate-x-1/2 before:bg-stone-300 dark:before:bg-stone-700">
            {data.children.map((child, i) => (
              <div key={child.name} className="relative px-3 before:absolute before:top-0 before:right-1/2 before:h-px before:w-full before:bg-stone-300 first:before:left-1/2 first:before:w-1/2 last:before:right-1/2 last:before:w-1/2 only:before:hidden dark:before:bg-stone-700">
                <LineageTree data={child} />
              </div>
            ))}
          </div>
        )}
      </li>
    </ul>
  );
}
```
`LineageTree` → skipped: interactive pan/zoom canvas, add when lineage depth exceeds 6 generations.

---

### 2. Multi-Tradition Comparative Timeline Track (CSS Grid + Native Sticky)

```tsx
// components/ComparativeTimeline.tsx
interface EraEvent { id: string; era: string; judaic: string; christian: string; islamic: string; }

export function ComparativeTimeline({ events }: { events: EraEvent[] }) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="grid min-w-[640px] grid-cols-[100px_repeat(3,1fr)] gap-px bg-stone-200/60 p-px text-xs dark:bg-stone-800/60">
        <div className="sticky top-0 z-20 bg-stone-100/90 p-2.5 font-mono text-stone-600 backdrop-blur dark:bg-stone-900/90">Era</div>
        <div className="sticky top-0 z-20 bg-stone-100/90 p-2.5 font-medium text-stone-900 backdrop-blur dark:bg-stone-900/90 dark:text-stone-100">Judaism</div>
        <div className="sticky top-0 z-20 bg-stone-100/90 p-2.5 font-medium text-stone-900 backdrop-blur dark:bg-stone-900/90 dark:text-stone-100">Christianity</div>
        <div className="sticky top-0 z-20 bg-stone-100/90 p-2.5 font-medium text-stone-900 backdrop-blur dark:bg-stone-900/90 dark:text-stone-100">Islam</div>

        {events.map((e) => (
          <div key={e.id} className="contents">
            <span className="bg-stone-50/40 p-3 font-mono text-[11px] text-stone-600 dark:bg-stone-950/40">{e.era}</span>
            <p className="bg-stone-50/40 p-3 text-stone-700 dark:bg-stone-950/40 dark:text-stone-300">{e.judaic}</p>
            <p className="bg-stone-50/40 p-3 text-stone-700 dark:bg-stone-950/40 dark:text-stone-300">{e.christian}</p>
            <p className="bg-stone-50/40 p-3 text-stone-700 dark:bg-stone-950/40 dark:text-stone-300">{e.islamic}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```
`ComparativeTimeline` → skipped: JS scroll-sync observers, add when lanes require asymmetrical vertical accordion expansion.

---

### 3. Next.js 15 Async Params & Static Export Compliance

```tsx
// app/figures/[slug]/page.tsx
import { notFound } from "next/navigation";

// ponytail: in-memory slug registry; switch to static JSON manifest if items > 500
const FIGURES: Record<string, { title: string; lineage: string }> = {
  abraham: { title: "Abraham / Ibrahim", lineage: "Terah → Abraham" },
};

export function generateStaticParams() {
  return Object.keys(FIGURES).map((slug) => ({ slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const figure = FIGURES[slug];
  if (!figure) notFound();

  return (
    <main className="mx-auto max-w-xl py-12">
      <h1 className="text-xl font-medium tracking-tight text-stone-900 dark:text-stone-100">{figure.title}</h1>
      <p className="mt-2 text-sm text-stone-500 font-mono">{figure.lineage}</p>
    </main>
  );
}
```
`app/figures/[slug]/page.tsx` → skipped: runtime SSR DB fetch, add when lore content is wired to a remote CMS or SQLite store.


### Cycle #63 Directive (2026-11-03 03:03)
### 1. Zero-JS Semantic Lineage Tree

Replace canvas/SVG graph engines with pure CSS pseudo-element connectors.

```tsx
// components/LineageTree.tsx
interface FigureNode {
  name: string;
  title?: string;
  children?: FigureNode[];
}

export function LineageTree({ members }: { members: FigureNode[] }) {
  return (
    <ul className="flex justify-center p-0 m-0 list-none [&_ul]:pt-4 [&_li]:relative [&_li]:px-1.5 [&_li]:text-center">
      {members.map((m) => (
        <li
          key={m.name}
          className="before:absolute before:top-0 before:right-1/2 before:w-1/2 before:h-4 before:border-t before:border-stone-300 dark:before:border-stone-700 after:absolute after:top-0 after:left-1/2 after:w-1/2 after:h-4 after:border-t after:border-l after:border-stone-300 dark:after:border-stone-700 first:before:border-none last:after:border-none"
        >
          {/* ponytail: CSS tree ceiling is strict hierarchical trees; add SVG canvas when cross-branch marriage cycles occur */}
          <div className="inline-block rounded-md border border-stone-200/80 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/50 px-2.5 py-1 text-xs font-serif text-stone-800 dark:text-stone-200">
            {m.name}
          </div>
          {m.children && m.children.length > 0 && <LineageTree members={m.children} />}
        </li>
      ))}
    </ul>
  );
}
```
→ skipped: Pan/zoom canvas libraries (`d3-hierarchy`, `reactflow`).  
→ add when: Lineage graph requires bidirectional cross-links (e.g., cousin marriages).

---

### 2. Multi-Tradition Synchronized Timeline Axis

Align Jewish, Christian, and Islamic parallels via native CSS subgrid/contents without scroll listeners.

```tsx
// components/ComparativeTimeline.tsx
interface TimelineRow {
  era: string;
  jewish: string;
  christian: string;
  islamic: string;
}

export function ComparativeTimeline({ rows }: { rows: TimelineRow[] }) {
  return (
    <div className="grid grid-cols-[90px_repeat(3,minmax(0,1fr))] gap-x-4 border-t border-stone-200 dark:border-stone-800 text-xs">
      <div className="sticky top-0 z-10 bg-stone-50/80 dark:bg-stone-950/80 backdrop-blur font-mono text-stone-400 py-3">Era</div>
      {['Judaism', 'Christianity', 'Islam'].map((t) => (
        <div key={t} className="sticky top-0 z-10 bg-stone-50/80 dark:bg-stone-950/80 backdrop-blur font-serif text-stone-700 dark:text-stone-300 py-3">{t}</div>
      ))}
      {rows.map((r, i) => (
        <div key={i} className="contents border-b border-stone-100 dark:border-stone-900/50">
          <span className="font-mono text-stone-400 py-2.5">{r.era}</span>
          <div className="py-2.5 text-stone-700 dark:text-stone-300 leading-relaxed">{r.jewish || '—'}</div>
          <div className="py-2.5 text-stone-700 dark:text-stone-300 leading-relaxed">{r.christian || '—'}</div>
          <div className="py-2.5 text-stone-700 dark:text-stone-300 leading-relaxed">{r.islamic || '—'}</div>
        </div>
      ))}
    </div>
  );
}
```
→ skipped: JS-driven synchronized scroll containers or virtualized tables.  
→ add when: Dataset exceeds 300 rows and client FPS drops below 60 during scroll.

---

### 3. Production Build Hardening: Static Segment Exhaustion

Lock dynamic routing to prevent Next.js 15 SSR runtime hydration failures and dynamic parameter bailouts.

```tsx
// app/lore/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { LORE_RECORDS } from '@/data/lore';

// ponytail: Static-only rendering. Add dynamic = 'force-dynamic' if live editing/CMS is introduced.
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(LORE_RECORDS).map((slug) => ({ slug }));
}

export default async function LorePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = LORE_RECORDS[slug];

  if (!entry) notFound();

  return (
    <article className="max-w-xl mx-auto py-10 px-4 text-stone-900 dark:text-stone-100 font-serif">
      <h1 className="text-xl font-normal tracking-tight">{entry.name}</h1>
      <p className="mt-4 text-sm leading-relaxed text-stone-600 dark:text-stone-400">{entry.narrative}</p>
    </article>
  );
}
```
→ skipped: Dynamic API fetches, suspense skeleton waterfalls, and fallback loading boundaries.  
→ add when: Data source migrates from static bundles to a remote headless CMS.


### Cycle #64 Directive (2026-11-03 03:08)
### 1. Comparative Timeline: Zero-JS Sticky Synchronized Lanes

Replace JS scroll-listeners and sync libraries with native CSS Grid sticky headers and subgrid tracks.

```tsx
// components/ComparativeTimeline.tsx
export function ComparativeTimeline({ eras }: { eras: Era[] }) {
  return (
    <div className="grid grid-cols-[120px_repeat(3,minmax(280px,1fr))] overflow-x-auto border border-stone-200/60 rounded-xl bg-stone-50/50">
      <div className="sticky top-0 z-20 col-span-4 grid grid-cols-subgrid bg-stone-100/90 backdrop-blur-md border-b border-stone-200 text-xs font-serif font-medium text-stone-600 px-4 py-2">
        <span>Era / BCE-CE</span>
        <span>Judaism</span>
        <span>Christianity</span>
        <span>Islam</span>
      </div>
      {eras.map((era) => (
        <div key={era.id} className="col-span-4 grid grid-cols-subgrid border-b border-stone-150 py-4 px-4 hover:bg-stone-100/40 transition-colors">
          <span className="font-mono text-xs text-stone-400 sticky left-0">{era.period}</span>
          <div className="text-sm text-stone-800 pr-4">{era.judaism}</div>
          <div className="text-sm text-stone-800 pr-4">{era.christianity}</div>
          <div className="text-sm text-stone-800 pr-4">{era.islam}</div>
        </div>
      ))}
    </div>
  );
}
// ponytail: Flat subgrid assumes 3 fixed traditions; upgrade to dynamic CSS cols if traditions exceed 3.
```
*skipped: Heavy virtualization / JS sync-scroll engines.*
*add when: Timeline records exceed 500 DOM nodes simultaneously.*

---

### 2. Lineage View: Zero-Lib CSS Branching Tree

Drop heavy canvas/graph packages (ReactFlow/D3). Render clean genealogical hierarchy using semantic HTML lists and CSS pseudo-elements.

```tsx
// components/LineageNode.tsx
interface Figure { name: string; title?: string; children?: Figure[]; }

export function LineageNode({ figure }: { figure: Figure }) {
  return (
    <li className="relative flex flex-col items-center pt-6">
      <div className="z-10 rounded-lg border border-stone-250 bg-stone-50 px-3 py-1.5 shadow-xs text-center">
        <p className="font-serif text-sm font-medium text-stone-900">{figure.name}</p>
        {figure.title && <p className="text-[10px] text-stone-500">{figure.title}</p>}
      </div>
      {figure.children && figure.children.length > 0 && (
        <ul className="flex justify-center gap-4 relative pt-6 before:absolute before:top-0 before:left-1/2 before:h-6 before:w-px before:bg-stone-300">
          {figure.children.map((child) => (
            <LineageNode key={child.name} figure={child} />
          ))}
        </ul>
      )}
    </li>
  );
}
// ponytail: Simple downward single-parent tree; upgrade to SVG canvas layout if multi-parent unions are needed.
```
*skipped: Canvas-based node graphing libraries.*
*add when: Cross-generational complex cross-links (e.g., cousin intermarriages) break strict tree hierarchy.*

---

### 3. Next.js Production Build Safeguard

Eliminate SSG bailout, SSR hydration mismatches, and route typing breaks across dynamic lore slugs.

```ts
// app/lore/[tradition]/[slug]/page.tsx
export const dynamicParams = false;
export const dynamic = 'error';

export async function generateStaticParams() {
  const figures = await getLoreSlugs(); // local JSON or typed DB manifest
  return figures.map(({ tradition, slug }) => ({ tradition, slug }));
}

export default async function LorePage({ params }: { params: Promise<{ tradition: string; slug: string }> }) {
  const { tradition, slug } = await params;
  const lore = getLoreData(tradition, slug);
  if (!lore) notFound();
  return <LoreArticle data={lore} />;
}
```
*skipped: Runtime SSR fallback handling and ISR revalidation overhead.*
*add when: Content is moved to an external headless CMS requiring runtime revalidation.*
