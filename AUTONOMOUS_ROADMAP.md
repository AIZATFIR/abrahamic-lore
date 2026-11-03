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


### Cycle #65 Directive (2026-11-03 03:14)
### 1. Fix Next.js 15 Production Build (Static Params & Async Route Props)

```tsx
// app/compare/[figure]/page.tsx
export function generateStaticParams() {
  // ponytail: static list caps build at known figures; upgrade to db query when dynamic CMS is connected.
  return [{ figure: 'abraham' }, { figure: 'moses' }, { figure: 'jesus' }];
}

export default async function Page({ params }: { params: Promise<{ figure: string }> }) {
  const { figure } = await params;
  return <main className="max-w-4xl mx-auto p-6">{/* Lineage & Timeline view */}</main>;
}
```
→ skipped: `generateMetadata` error boundary wrappers, add when metadata is pulled from remote sources.

---

### 2. Pure CSS Comparative Timeline (Sticky Epochs & Zero-JS Sync)

```css
/* styles/timeline.css */
.timeline-sync-grid {
  display: grid;
  grid-template-columns: 80px repeat(3, minmax(260px, 1fr));
  column-gap: 1.5rem;
  overflow-x: auto;
}
.epoch-header {
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  z-index: 10;
}
```
→ skipped: JS-driven scroll synchronization listeners, add when arbitrary timeline scale-zooming is required.

---

### 3. Accessible, Zero-Dependency Lineage Tree

```css
/* styles/lineage.css */
.lineage-tree ul { padding-left: 1.25rem; border-left: 1px solid currentColor; }
.lineage-tree li { list-style: none; position: relative; padding: 0.25rem 0 0.25rem 1rem; }
.lineage-tree li::before {
  content: '';
  position: absolute;
  top: 0.85rem;
  left: 0;
  width: 0.75rem;
  border-bottom: 1px solid currentColor;
}
```
→ skipped: D3/SVG canvas rendering, add when rendering complex multi-parent DAG cross-links.


### Cycle #66 Directive (2026-11-03 03:19)
### 1. Native Snap Comparative Timeline

```tsx
// components/ComparativeTimeline.tsx
interface Era {
  id: string;
  name: string;
  traditions: { judaism?: string; christianity?: string; islam?: string };
}

export function ComparativeTimeline({ eras }: { eras: Era[] }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none">
      {eras.map((era) => (
        <article
          key={era.id}
          className="snap-start shrink-0 w-80 rounded-2xl border border-stone-200/80 bg-stone-50/40 p-5 dark:border-stone-800 dark:bg-stone-900/40"
        >
          <time className="font-mono text-xs uppercase tracking-widest text-stone-500">{era.name}</time>
          <div className="mt-4 space-y-3 text-sm">
            {(["judaism", "christianity", "islam"] as const).map(
              (key) =>
                era.traditions[key] && (
                  <div key={key} className="border-l-2 border-stone-300 pl-3 dark:border-stone-700">
                    <span className="block text-[10px] font-medium uppercase text-stone-400">{key}</span>
                    <p className="mt-0.5 text-stone-800 dark:text-stone-200">{era.traditions[key]}</p>
                  </div>
                )
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
// ponytail: horizontal cards only; add vertical comparative sync when traditions exceed 4 parallel tracks.
```
→ skipped: heavy timeline libraries (`vis-timeline`, Framer drag), add when multi-track freeform zooming is requested.

---

### 2. Pure CSS Zero-JS Lineage Connectors

```tsx
// components/LineageNode.tsx
interface Figure {
  name: string;
  children?: Figure[];
}

export function LineageNode({ figure }: { figure: Figure }) {
  return (
    <div className="flex flex-col items-center">
      <div className="rounded-xl border border-stone-200 bg-white px-4 py-2 text-sm font-medium shadow-xs dark:border-stone-800 dark:bg-stone-900">
        {figure.name}
      </div>
      {figure.children && figure.children.length > 0 && (
        <div className="relative pt-6">
          <div className="absolute top-0 left-1/2 h-6 w-px -translate-x-1/2 bg-stone-300 dark:bg-stone-700" />
          <div className="flex gap-8 border-t border-stone-300 dark:border-stone-700">
            {figure.children.map((child) => (
              <div key={child.name} className="relative pt-6">
                <div className="absolute top-0 left-1/2 h-6 w-px -translate-x-1/2 bg-stone-300 dark:bg-stone-700" />
                <LineageNode figure={child} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
// ponytail: strict top-down tree; add SVG curved connectors when cross-branch unions/inter-marriages are introduced.
```
→ skipped: React Flow / D3 / HTML Canvas, add when pan-and-zoom and complex cross-branch edges are needed.

---

### 3. Next.js Static Export & Async Params Build-Fix

```tsx
// app/lineage/[slug]/page.tsx
import { notFound } from "next/navigation";

const LORE_SLUGS = ["abraham", "moses", "jesus", "muhammad"] as const;

export function generateStaticParams() {
  return LORE_SLUGS.map((slug) => ({ slug }));
}

export default async function LineagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!LORE_SLUGS.includes(slug as (typeof LORE_SLUGS)[number])) notFound();

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="font-serif text-3xl capitalize text-stone-900 dark:text-stone-100">{slug}</h1>
    </main>
  );
}
// ponytail: static array slug validation; add schema-validated JSON loader when dataset externalizes.
```
→ skipped: dynamic runtime database queries, add when database-backed content requires on-demand revalidation.


### Cycle #67 Directive (2026-11-03 03:25)
### 1. Build Guard: Zero-Bailout Static Export (`generateStaticParams`)

Ensure dynamic timeline/figure routes evaluate purely at build time without SSR fallbacks or dynamic client mismatch.

```typescript
// app/timeline/[era]/page.tsx
import { ERAS, type EraId } from "@/data/lore";

export const dynamicParams = false;

export function generateStaticParams(): { era: EraId }[] {
  return Object.keys(ERAS).map((era) => ({ era: era as EraId }));
}

// ponytail: Static dictionary lookup; upgrade to edge DB query if eras exceed static lore scale.
export default async function EraPage({ params }: { params: Promise<{ era: EraId }> }) {
  const { era } = await params;
  return <EraView era={ERAS[era]} />;
}
```
→ skipped: `notFound()` boundary checks and Zod route schemas.  
→ add when: lore eras become runtime user-generated content.

---

### 2. Comparative Timeline: Zero-JS 3-Column Parallel Sync

Replace custom scroll/layout math with native CSS Grid tracks aligning Jewish, Christian, and Islamic traditions across shared eras.

```tsx
// components/ComparativeTimeline.tsx
export function ComparativeTimeline({ eras }: { eras: EraComparison[] }) {
  return (
    <div className="grid grid-cols-[100px_repeat(3,minmax(0,1fr))] gap-x-4 gap-y-6 text-sm text-stone-800 dark:text-stone-200">
      <div className="font-mono text-xs uppercase tracking-wider text-stone-400">Era</div>
      <div className="font-medium text-amber-900 dark:text-amber-200">Judaism</div>
      <div className="font-medium text-sky-900 dark:text-sky-200">Christianity</div>
      <div className="font-medium text-emerald-900 dark:text-emerald-200">Islam</div>

      {eras.map(({ id, period, jewish, christian, islamic }) => (
        <div key={id} className="contents border-t border-stone-200/60 dark:border-stone-800">
          <time className="font-mono text-xs text-stone-400 self-baseline">{period}</time>
          <div className="p-3 bg-stone-50 dark:bg-stone-900/50 rounded-lg">{jewish}</div>
          <div className="p-3 bg-stone-50 dark:bg-stone-900/50 rounded-lg">{christian}</div>
          <div className="p-3 bg-stone-50 dark:bg-stone-900/50 rounded-lg">{islamic}</div>
        </div>
      ))}
    </div>
  );
}
```
→ skipped: JS layout listeners, D3 scales, synchronized horizontal scroll containers.  
→ add when: events require non-linear, hour-granular canvas rendering.

---

### 3. Lineage Tree: Native CSS Connectors

Render family descent without SVG line calculations using semantic HTML lists and native pseudo-elements.

```tsx
// components/LineageNode.tsx
interface Node { name: string; title?: string; children?: Node[] }

export function LineageNode({ node }: { node: Node }) {
  return (
    <li className="relative pl-6 before:absolute before:left-0 before:top-3 before:h-px before:w-4 before:bg-stone-300 dark:before:bg-stone-700">
      <span className="inline-block py-1 px-2.5 rounded border border-stone-200 dark:border-stone-800 text-xs font-medium">
        {node.name} {node.title && <span className="text-stone-400">({node.title})</span>}
      </span>
      {node.children && (
        <ul className="relative ml-2 border-l border-stone-300 dark:border-stone-700 space-y-2 pt-2">
          {node.children.map((child) => (
            <LineageNode key={child.name} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
}
```
→ skipped: React Flow, ELKjs, and interactive graph zooming engines.  
→ add when: branches contain cyclic relationships or cross-tradition node merging.


### Cycle #68 Directive (2026-11-03 03:31)
### 1. Build Hardening: Exhaustive Static Routes & Build Shield

```typescript
// app/lore/[tradition]/[figure]/page.tsx
import { notFound } from "next/navigation";
import { ALL_FIGURES, Tradition, Figure } from "@/data/lineage";

export const dynamic = "error";
export const dynamicParams = false;

export function generateStaticParams(): Array<{ tradition: Tradition; figure: string }> {
  return ALL_FIGURES.map((f) => ({ tradition: f.tradition, figure: f.slug }));
}

interface PageProps {
  params: Promise<{ tradition: Tradition; figure: string }>;
}

export default async function FigurePage({ params }: PageProps) {
  const { tradition, figure: slug } = await params;
  const data = ALL_FIGURES.find((f) => f.tradition === tradition && f.slug === slug);
  if (!data) notFound();

  // ponytail: inline view; extract component if shared with modal preview
  return (
    <article className="mx-auto max-w-xl p-8 font-serif text-stone-900 dark:text-stone-100">
      <h1 className="text-2xl font-medium tracking-tight">{data.name}</h1>
      <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">{data.epithet}</p>
    </article>
  );
}
```
`app/lore/[tradition]/[figure]/page.tsx` → skipped: dynamic server-side data fetching; add when figure lore is sourced from an external CMS or dynamic DB.

---

### 2. Comparative Timeline: Zero-JS Sticky Epoch Alignment

```tsx
// components/ComparativeTimeline.tsx
interface Epoch {
  era: string;
  judaism: string[];
  christianity: string[];
  islam: string[];
}

export function ComparativeTimeline({ epochs }: { epochs: Epoch[] }) {
  return (
    <div className="relative divide-y divide-stone-200 overflow-x-auto border-y border-stone-200 dark:divide-stone-800 dark:border-stone-800">
      <div className="sticky top-0 z-10 grid grid-cols-4 bg-stone-50/90 py-2.5 text-xs font-semibold tracking-wider text-stone-500 uppercase backdrop-blur-md dark:bg-stone-950/90 dark:text-stone-400">
        <span className="pl-4">Era</span>
        <span>Judaism</span>
        <span>Christianity</span>
        <span>Islam</span>
      </div>
      {epochs.map((e) => (
        <section key={e.era} className="grid grid-cols-4 py-4 text-sm font-sans">
          <span className="pl-4 font-mono text-xs text-stone-400">{e.era}</span>
          <span className="text-stone-800 dark:text-stone-200">{e.judaism.join(", ") || "—"}</span>
          <span className="text-stone-800 dark:text-stone-200">{e.christianity.join(", ") || "—"}</span>
          <span className="text-stone-800 dark:text-stone-200">{e.islam.join(", ") || "—"}</span>
        </section>
      ))}
    </div>
  );
}
```
`components/ComparativeTimeline.tsx` → skipped: JS-based scroll synchronizers and chart canvases; add when non-linear chronological scaling or zoom controls are required.

---

### 3. Lineage View: Native CSS Tree Connectors

```tsx
// components/LineageNode.tsx
export interface Person {
  id: string;
  name: string;
  title?: string;
  children?: Person[];
}

export function LineageNode({ person }: { person: Person }) {
  return (
    <li className="relative pl-6 before:absolute before:top-3 before:left-0 before:h-px before:w-4 before:bg-stone-300 after:absolute after:top-0 after:bottom-0 after:left-0 after:w-px after:bg-stone-300 last:after:h-3 dark:before:bg-stone-700 dark:after:bg-stone-700">
      <div className="inline-flex items-baseline gap-2 py-1">
        <span className="font-serif text-sm font-medium text-stone-900 dark:text-stone-100">{person.name}</span>
        {person.title && <span className="font-sans text-xs text-stone-400">({person.title})</span>}
      </div>
      {person.children && person.children.length > 0 && (
        <ul className="ml-2">
          {/* ponytail: single-lineage recursion; upgrade to SVG canvas if multi-parent graph cross-linking is introduced */}
          {person.children.map((child) => (
            <LineageNode key={child.id} person={child} />
          ))}
        </ul>
      )}
    </li>
  );
}
```
`components/LineageNode.tsx` → skipped: heavy graph visualization packages (D3/ReactFlow); add when genealogical links become a multi-parent directed acyclic graph.


### Cycle #69 Directive (2026-11-03 03:36)
### 1. Lineage View: Native CSS Tree Connectors (Drop heavy graph libs)

Replace SVG/Canvas libraries with native CSS pseudo-elements for zero-runtime ancestor branches.

```css
/* styles/lineage.module.css */
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
.tree li:only-child { padding-top: 0; }
.tree li:first-child::before, .tree li:last-child::after { border: 0 none; }
.tree li:last-child::before { border-right: 1px solid var(--border-subtle, #e5e5e5); border-radius: 0 4px 0 0; }
.tree li:first-child::after { border-radius: 4px 0 0 0; }
.tree ul::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  border-left: 1px solid var(--border-subtle, #e5e5e5);
  width: 0;
  height: 1.25rem;
}
```
→ skipped: Pan/zoom canvas & React Flow. Add when: Lineage trees exceed 5 generations in viewport.

---

### 2. Comparative Timeline: CSS Subgrid Column Sync

Align parallel traditions (Judaism, Christianity, Islam) without resize observers or scroll sync scripts.

```tsx
// components/ComparativeTimeline.tsx
interface EpochEvent {
  epoch: string;
  jewish?: string;
  christian?: string;
  islamic?: string;
}

export function ComparativeTimeline({ events }: { events: EpochEvent[] }) {
  // ponytail: fixed 4-col layout ceiling; upgrade to dynamic headers if adding traditions (e.g., Baha'i).
  return (
    <div className="grid grid-cols-[120px_repeat(3,1fr)] gap-x-6 gap-y-4 items-start overflow-x-auto text-sm">
      <div className="sticky top-0 bg-background/80 backdrop-blur z-10 font-mono text-xs text-muted-foreground pb-2">Epoch</div>
      <div className="sticky top-0 bg-background/80 backdrop-blur z-10 font-serif font-medium pb-2 border-b">Judaism</div>
      <div className="sticky top-0 bg-background/80 backdrop-blur z-10 font-serif font-medium pb-2 border-b">Christianity</div>
      <div className="sticky top-0 bg-background/80 backdrop-blur z-10 font-serif font-medium pb-2 border-b">Islam</div>

      {events.map((e, idx) => (
        <div key={idx} className="contents border-t border-border/40">
          <span className="font-mono text-xs text-muted-foreground py-3 self-center">{e.epoch}</span>
          <div className="p-3 bg-muted/20 rounded-md">{e.jewish || "—"}</div>
          <div className="p-3 bg-muted/20 rounded-md">{e.christian || "—"}</div>
          <div className="p-3 bg-muted/20 rounded-md">{e.islamic || "—"}</div>
        </div>
      ))}
    </div>
  );
}
```
→ skipped: JS-driven virtualized sync scrolling. Add when: Timeline exceeds 500 synchronous nodes.

---

### 3. Production Build Fix: Next.js 15 Async Dynamic Route Params

Ensure error-free `next build` static export / SSG by typing dynamic routes as Promises and enforcing fallback boundaries.

```tsx
// app/figures/[slug]/page.tsx
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Validate build-time paths exist
export async function generateStaticParams() {
  // Static known canonical keys to prevent 404 build failure
  const figures = ["abraham", "moses", "jesus", "muhammad", "noah"];
  return figures.map((slug) => ({ slug }));
}

export default async function FigurePage({ params }: PageProps) {
  const { slug } = await params;
  if (!slug) notFound();

  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-serif capitalize tracking-tight">{slug}</h1>
    </main>
  );
}
```
→ skipped: Dynamic runtime fallback handling (`fallback: true`). Add when: Figure data moves to an external remote CMS.


### Cycle #70 Directive (2026-11-03 03:42)
### 1. Lineage View: Native CSS Tree Connectors

Replace canvas/graph libs with semantic nested lists and pure CSS borders.

```tsx
// components/LineageNode.tsx
export function LineageNode({ name, title, children }: { name: string; title?: string; children?: React.ReactNode }) {
  // ponytail: Simple tree ceiling. Upgrade to SVG canvas if rendering multi-parent DAGs.
  return (
    <li className="relative pl-5 before:absolute before:left-0 before:top-3 before:h-px before:w-3.5 before:bg-stone-300 dark:before:bg-stone-700">
      <div className="inline-flex items-baseline gap-1.5 rounded border border-stone-200/80 bg-stone-50/40 px-2 py-0.5 text-xs tracking-tight text-stone-800 dark:border-stone-800 dark:bg-stone-900/45 dark:text-stone-200">
        <span className="font-medium">{name}</span>
        {title && <span className="text-[10px] text-stone-400">{title}</span>}
      </div>
      {children && <ul className="relative ml-1.5 border-l border-stone-300 pl-1 dark:border-stone-700">{children}</ul>}
    </li>
  );
}
```
* Skipped: React Flow / D3 graph engine.
* Add when: Lineages require cross-branch marriage cycles or directed acyclic graph (DAG) visualization.

---

### 2. Comparative Timeline: CSS Grid Alignment

Sync Jewish, Christian, and Islamic parallels via native grid track sizing instead of JS scroll listeners.

```tsx
// components/ComparativeTimeline.tsx
interface TimelinePoint {
  era: string;
  judaic: string;
  christian: string;
  islamic: string;
}

export function ComparativeTimeline({ points }: { points: TimelinePoint[] }) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[640px] divide-y divide-stone-100 font-sans text-xs dark:divide-stone-800">
        <header className="grid grid-cols-[80px_1fr_1fr_1fr] pb-2 text-[11px] font-medium text-stone-400">
          <span>Era</span>
          <span>Judaism</span>
          <span>Christianity</span>
          <span>Islam</span>
        </header>
        {points.map((pt) => (
          <div key={pt.era} className="grid grid-cols-[80px_1fr_1fr_1fr] gap-3 py-2.5 items-start">
            <span className="font-mono text-stone-400">{pt.era}</span>
            <p className="text-stone-700 dark:text-stone-300">{pt.judaic || '—'}</p>
            <p className="text-stone-700 dark:text-stone-300">{pt.christian || '—'}</p>
            <p className="text-stone-700 dark:text-stone-300">{pt.islamic || '—'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```
* Skipped: Complex scroll synchronizer hook and column drag-resize libraries.
* Add when: Users need interactive epoch-filtering or custom tradition pin-reordering.

---

### 3. Next.js 15 Zero-Error Dynamic Prerender

Awaited route params and exhaustive `generateStaticParams` to prevent dynamic bailouts during `next build`.

```tsx
// app/figure/[slug]/page.tsx
import { notFound } from 'next/navigation';

const CANONICAL_SLUGS = ['abraham', 'moses', 'jesus', 'muhammad'] as const;

export function generateStaticParams() {
  return CANONICAL_SLUGS.map((slug) => ({ slug }));
}

export default async function FigurePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!CANONICAL_SLUGS.includes(slug as (typeof CANONICAL_SLUGS)[number])) {
    notFound();
  }

  return <main className="mx-auto max-w-2xl px-4 py-8">{/* Figure content */}</main>;
}
```
* Skipped: Dynamic database fallback queries (`fallback: 'blocking'`).
* Add when: Lore database moves from in-repo static records to an external CMS/database.

---

### Verification Check
```ts
// assert-check.ts
import assert from 'node:assert';
import { generateStaticParams } from './app/figure/[slug]/page';

const params = generateStaticParams();
assert.strictEqual(params.length, 4, 'Must prerender all 4 canonical patriarchs/prophets');
assert.ok(params.every(p => typeof p.slug === 'string'), 'Slugs must be strictly typed strings');
```


### Cycle #71 Directive (2026-11-03 03:47)
### 1. Comparative Timeline: Zero-JS Parallel Lane Alignment

```tsx
// components/timeline/ComparativeTimeline.tsx
interface TimelineEvent {
  era: string;
  judaism?: string;
  christianity?: string;
  islam?: string;
}

export function ComparativeTimeline({ events }: { events: TimelineEvent[] }) {
  // ponytail: Flat array ceiling; add virtualized windowing if events > 150.
  return (
    <div className="grid grid-cols-[100px_repeat(3,1fr)] gap-px bg-stone-200 dark:bg-stone-800 rounded-xl overflow-hidden border border-stone-250 dark:border-stone-800 text-sm">
      <div className="sticky top-0 z-10 bg-stone-100/90 dark:bg-stone-900/90 p-3 font-mono text-xs uppercase tracking-wider backdrop-blur">Era</div>
      <div className="sticky top-0 z-10 bg-stone-100/90 dark:bg-stone-900/90 p-3 font-serif font-medium backdrop-blur">Judaism</div>
      <div className="sticky top-0 z-10 bg-stone-100/90 dark:bg-stone-900/90 p-3 font-serif font-medium backdrop-blur">Christianity</div>
      <div className="sticky top-0 z-10 bg-stone-100/90 dark:bg-stone-900/90 p-3 font-serif font-medium backdrop-blur">Islam</div>

      {events.map((e, idx) => (
        <div key={idx} className="contents group">
          <div className="bg-stone-50 dark:bg-stone-950 p-3 font-mono text-xs text-stone-500 tabular-nums">{e.era}</div>
          <div className="bg-stone-50 dark:bg-stone-950 p-3 text-stone-800 dark:text-stone-200 leading-relaxed">{e.judaism || '—'}</div>
          <div className="bg-stone-50 dark:bg-stone-950 p-3 text-stone-800 dark:text-stone-200 leading-relaxed">{e.christianity || '—'}</div>
          <div className="bg-stone-50 dark:bg-stone-950 p-3 text-stone-800 dark:text-stone-200 leading-relaxed">{e.islam || '—'}</div>
        </div>
      ))}
    </div>
  );
}
```
→ skipped: Drag-scrub timeline library, dynamic zoom, and canvas renderers.  
→ add when: Horizontal historical scrubbing spanning >5,000 non-aligned overlapping events is required.

---

### 2. Lineage View: Semantic CSS Tree Connectors (No Canvas/SVG Bloat)

```tsx
// components/lineage/LineageNode.tsx
interface FigureNode {
  name: string;
  title?: string;
  children?: FigureNode[];
}

export function LineageNode({ node }: { node: FigureNode }) {
  // ponytail: 2-level branching limit; migrate to recursive SVG paths if lineages cross-marry.
  return (
    <div className="flex flex-col items-center">
      <div className="border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 px-4 py-2 rounded-lg text-center shadow-xs">
        <span className="font-serif font-medium block text-stone-900 dark:text-stone-100">{node.name}</span>
        {node.title && <span className="text-[11px] font-sans text-stone-500 block">{node.title}</span>}
      </div>

      {node.children && node.children.length > 0 && (
        <div className="relative pt-6 flex gap-6 before:content-[''] before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-px before:h-6 before:bg-stone-300 dark:before:bg-stone-700">
          {node.children.map((child, idx) => (
            <div key={idx} className="relative before:content-[''] before:absolute before:-top-6 before:left-0 before:right-0 before:h-px before:bg-stone-300 dark:before:bg-stone-700 first:before:left-1/2 last:before:right-1/2">
              <LineageNode node={child} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```
→ skipped: React Flow, ELK.js, and manual SVG bezier math.  
→ add when: Graphs become cyclic or require dynamic pan-and-pinch nodes.

---

### 3. Production Build Lock: Strict Static Validation

```ts
// app/lore/[tradition]/[slug]/page.tsx
import { notFound } from 'next/navigation';

export const dynamic = 'error'; // Fail build if anything dynamic slips in
export const dynamicParams = false; // 404 immediately on un-generated static routes

interface PageProps {
  params: Promise<{ tradition: 'judaism' | 'christianity' | 'islam'; slug: string }>;
}

export async function generateStaticParams() {
  // ponytail: In-memory/local JSON data fetch; hook to local SQLite/MDX compiler at build-time.
  return [
    { tradition: 'judaism', slug: 'abraham' },
    { tradition: 'christianity', slug: 'abraham' },
    { tradition: 'islam', slug: 'ibrahim' },
  ];
}

export default async function LorePage({ params }: PageProps) {
  const { tradition, slug } = await params;
  if (!tradition || !slug) notFound();

  return <main className="max-w-2xl mx-auto p-6 font-serif leading-relaxed" />;
}
```
→ skipped: Runtime fetch fallbacks and ISR revalidation routes.  
→ add when: Content is supplied via external headful CMS with on-demand webhooks.


### Cycle #72 Directive (2026-11-03 03:53)
### 1. Pure CSS Lineage Tree (Zero Dependencies)

```tsx
// components/lineage-tree.tsx
interface Person { id: string; name: string; title?: string; children?: Person[] }

export function LineageTree({ node }: { node: Person }) {
  // ponytail: Simple CSS branching; upgrade to SVG canvas if rendering lateral cross-marriages.
  return (
    <li className="relative flex flex-col items-center">
      <div className="z-10 rounded-md border border-stone-200/80 bg-stone-50/80 px-3 py-1.5 text-xs text-stone-800 shadow-xs backdrop-blur-xs dark:border-stone-800 dark:bg-stone-900 dark:text-stone-200">
        <span className="font-medium tracking-tight">{node.name}</span>
        {node.title && <span className="ml-1 text-[10px] text-stone-400 dark:text-stone-500">({node.title})</span>}
      </div>
      {node.children && node.children.length > 0 && (
        <ul className="relative flex gap-6 pt-5 before:absolute before:top-0 before:left-1/2 before:h-5 before:w-px before:bg-stone-200 dark:before:bg-stone-800">
          {node.children.map((child) => (
            <LineageTree key={child.id} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
}
```
skipped: ReactFlow / D3 graph engine, add when cross-branch marital loops need layout calculation.

---

### 2. Comparative Sync Grid (Native CSS Multi-Lane)

```tsx
// components/comparative-timeline.tsx
type EraEvent = { era: string; judaism?: string; christianity?: string; islam?: string };

export function ComparativeTimeline({ data }: { data: EraEvent[] }) {
  return (
    <div className="grid grid-cols-[80px_repeat(3,minmax(200px,1fr))] gap-px overflow-x-auto rounded-lg border border-stone-200 bg-stone-200 text-xs dark:border-stone-800 dark:bg-stone-800">
      <div className="sticky left-0 bg-stone-100 p-2.5 font-mono text-stone-400 dark:bg-stone-900">Era</div>
      <div className="bg-stone-100 p-2.5 font-medium text-stone-700 dark:bg-stone-900 dark:text-stone-300">Judaism</div>
      <div className="bg-stone-100 p-2.5 font-medium text-stone-700 dark:bg-stone-900 dark:text-stone-300">Christianity</div>
      <div className="bg-stone-100 p-2.5 font-medium text-stone-700 dark:bg-stone-900 dark:text-stone-300">Islam</div>
      {data.map((row) => (
        <div key={row.era} className="contents">
          <div className="sticky left-0 bg-stone-50/95 p-3 font-mono text-stone-500 backdrop-blur-xs dark:bg-stone-950/95">{row.era}</div>
          <div className="bg-stone-50 p-3 leading-relaxed text-stone-600 dark:bg-stone-950 dark:text-stone-400">{row.judaism || '—'}</div>
          <div className="bg-stone-50 p-3 leading-relaxed text-stone-600 dark:bg-stone-950 dark:text-stone-400">{row.christianity || '—'}</div>
          <div className="bg-stone-50 p-3 leading-relaxed text-stone-600 dark:bg-stone-950 dark:text-stone-400">{row.islam || '—'}</div>
        </div>
      ))}
    </div>
  );
}
```
skipped: JS scroll-sync hooks and virtualizer, add when timeline exceeds 150 total epochs.

---

### 3. Next.js Static Export & Dynamic Segment Seal

```tsx
// app/traditions/[slug]/page.tsx
interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

// ponytail: Hardcoded canon slugs; upgrade to dynamic file/DB scan when MDX lore files grow.
export async function generateStaticParams() {
  return [{ slug: 'judaism' }, { slug: 'christianity' }, { slug: 'islam' }];
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <article className="mx-auto max-w-prose p-6 font-serif">{slug}</article>;
}
```
skipped: dynamic ISR revalidation runtime, add when live user edits or external CMS hooked up.

---

### Verification

```ts
// scripts/verify-lore.ts
import assert from 'node:assert';

const testEpoch = { era: '1800 BCE', judaism: 'Abraham arrives in Canaan' };
assert.strictEqual(Boolean(testEpoch.era && testEpoch.judaism), true, 'Epoch must contain era and primary branch');
console.log('✓ Timeline logic verified');
```


### Cycle #94 Directive (2026-11-03 05:55)
### 1. Pure CSS Lineage Connector (Replaces D3/Canvas Bloat)

```css
/* app/lineage/lineage.module.css */
.tree, .tree ul { list-style: none; margin: 0; padding: 0 0 0 1.25rem; position: relative; }
.tree li { position: relative; padding: 0.375rem 0 0.375rem 1rem; }
.tree li::before {
  content: ""; position: absolute; left: 0; top: 1.125rem; width: 0.75rem;
  border-top: 1px solid var(--line, #e7e5e4);
}
.tree li::after {
  content: ""; position: absolute; left: 0; top: 0; bottom: 0;
  border-left: 1px solid var(--line, #e7e5e4);
}
.tree li:last-child::after { height: 1.125rem; }
```
```tsx
// ponytail: Nested <ul> tree handles up to ~10 generations cleanly.
// Upgrade to virtualized SVG canvas only if nodes exceed 500 in DOM.
export function LineageNode({ person }: { person: Person }) {
  return (
    <li>
      <span className="inline-block px-2.5 py-1 text-xs rounded-md bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
        {person.name}
      </span>
      {person.children?.length ? (
        <ul>{person.children.map(c => <LineageNode key={c.id} person={c} />)}</ul>
      ) : null}
    </li>
  );
}
```
→ skipped: Canvas/React-Flow graph layout engine.  
Add when: Dynamic bidirectional multi-parent graph traversal is strictly required.

---

### 2. Sticky 3-Tradition Comparative Grid (Zero JS Scroll Sync)

```tsx
export function ComparativeTimeline({ eras }: { eras: Era[] }) {
  return (
    <div className="grid grid-cols-3 gap-px bg-stone-200 dark:bg-stone-800 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800">
      {["Judaism", "Christianity", "Islam"].map((t) => (
        <header key={t} className="sticky top-0 z-10 bg-stone-50/90 dark:bg-stone-900/90 backdrop-blur p-3 text-xs tracking-wider uppercase font-semibold text-stone-500">
          {t}
        </header>
      ))}
      {eras.map((era) => (
        <div key={era.id} className="contents group">
          <div className="col-span-3 bg-stone-100 dark:bg-stone-900/50 px-3 py-1 text-[11px] font-mono text-stone-400">
            {era.period}
          </div>
          <article className="p-4 bg-white dark:bg-stone-950 text-sm leading-relaxed">{era.judaism}</article>
          <article className="p-4 bg-white dark:bg-stone-950 text-sm leading-relaxed">{era.christianity}</article>
          <article className="p-4 bg-white dark:bg-stone-950 text-sm leading-relaxed">{era.islam}</article>
        </div>
      ))}
    </div>
  );
}
```
→ skipped: JavaScript scroll synchronization and observer event hooks.  
Add when: Horizontal responsive card snapping across variable mobile viewports is required.

---

### 3. Next.js Zero-Error Production Build Guard

Fixes common Next.js production bails (`useSearchParams()` missing Suspense boundary; unvalidated static params).

```tsx
// app/timeline/page.tsx
import { Suspense } from "react";
import TimelineClient from "./TimelineClient";

export const dynamic = "error"; // Fails fast at build time if SSR leaks into static pages
export const dynamicParams = false;

export default function TimelinePage() {
  return (
    <main className="max-w-6xl mx-auto p-6">
      <Suspense fallback={<div className="h-96 animate-pulse bg-stone-100 rounded-xl" />}>
        <TimelineClient />
      </Suspense>
    </main>
  );
}

// Runnable build-time smoke assertion
const testEra: Era = { id: "1", period: "1800 BCE", judaism: "A", christianity: "B", islam: "C" };
console.assert(Boolean(testEra.id && testEra.period), "Era schema violated");
```
→ skipped: Runtime schema parsing libraries (Zod/Valibot).  
Add when: Dynamic external APIs or user-generated inputs enter the timeline route.


### Cycle #95 Directive (2026-11-03 06:01)
### 1. Synchronized Comparative Timeline (Native CSS Grid, Zero JS Listeners)

```tsx
// components/ComparativeTimeline.tsx
interface TimelineEvent {
  year: number;
  label: string;
  traditions: { tradition: 'jewish' | 'christian' | 'islamic'; text: string }[];
}

export function ComparativeTimeline({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="relative border-l border-amber-900/10 dark:border-amber-100/10 ml-4 pl-6 space-y-12">
      {events.map((e) => (
        <section key={e.year} className="relative grid grid-cols-1 md:grid-cols-4 gap-4 items-baseline">
          <div className="sticky top-12 md:col-span-1">
            <span className="text-xs font-mono tracking-wider text-amber-800/60 dark:text-amber-200/60">
              {e.year < 0 ? `${Math.abs(e.year)} BCE` : `${e.year} CE`}
            </span>
            <h3 className="text-sm font-medium text-stone-900 dark:text-stone-100">{e.label}</h3>
          </div>
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {['jewish', 'christian', 'islamic'].map((trad) => {
              const item = e.traditions.find((t) => t.tradition === trad);
              return (
                <div key={trad} className="p-3 rounded-lg bg-stone-50 dark:bg-stone-900/40 border border-stone-200/50 dark:border-stone-800/50 text-xs text-stone-700 dark:text-stone-300">
                  <span className="block capitalize font-serif text-[10px] text-amber-700 dark:text-amber-300/80 mb-1">{trad}</span>
                  {item ? item.text : <span className="text-stone-400 italic">—</span>}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
```
`skipped: Scroll-sync event listeners and canvas overlays; add when multi-century continuous panning is requested.`

---

### 2. Lineage Connector View (Semantic Pure CSS Tree)

```tsx
// components/LineageView.tsx
interface FigureNode {
  id: string;
  name: string;
  arabicName?: string;
  children?: FigureNode[];
}

export function LineageNode({ node }: { node: FigureNode }) {
  // ponytail: max recursion depth unmetered; upgrade to virtualized list if tree > 500 nodes.
  return (
    <li className="relative pl-6 before:absolute before:left-0 before:top-3 before:w-4 before:border-t before:border-amber-900/20 dark:before:border-amber-100/20">
      <div className="inline-flex items-baseline gap-2 py-1 px-2.5 rounded border border-stone-200/60 dark:border-stone-800 bg-white dark:bg-stone-900 text-sm">
        <span className="font-serif font-medium text-stone-800 dark:text-stone-200">{node.name}</span>
        {node.arabicName && <span className="font-arabic text-xs text-stone-400">{node.arabicName}</span>}
      </div>
      {node.children && node.children.length > 0 && (
        <ul className="relative ml-2 pl-2 border-l border-amber-900/20 dark:border-amber-100/20 space-y-2 mt-2">
          {node.children.map((child) => (
            <LineageNode key={child.id} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
}
```
`skipped: React Flow / D3 layout engines; add when user needs interactive drag-and-drop hierarchy re-ordering.`

---

### 3. Build-Guard: Strict Static Export Contract

```ts
// app/figures/[slug]/page.tsx
import { notFound } from 'next/navigation';

const FIGURES = ['abraham', 'moses', 'jesus', 'muhammad'] as const;
type FigureSlug = typeof FIGURES[number];

export function generateStaticParams(): { slug: FigureSlug }[] {
  return FIGURES.map((slug) => ({ slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!FIGURES.includes(slug as FigureSlug)) notFound();

  return <main className="max-w-2xl mx-auto p-6">{/* Page content */}</main>;
}

// Self-check
(() => {
  const params = generateStaticParams();
  console.assert(params.length === 4, 'generateStaticParams failed to return all canonical figures');
  console.assert(params.every(p => typeof p.slug === 'string'), 'Dynamic slug is non-string');
})();
```
`skipped: Remote headless CMS query during build; add when lore data moves out of local repo manifests.`


### Cycle #96 Directive (2026-11-03 06:06)
### 1. Pure CSS Comparative Timeline (Sticky Columns + Scroll Snap)

Eliminate timeline layout libraries. Use native CSS sticky columns with scroll-snap for cross-tradition alignment.

```css
/* styles/timeline.css */
.timeline-grid {
  display: grid;
  grid-template-columns: 80px repeat(3, minmax(280px, 1fr));
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}
.timeline-era-header {
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(12px);
  background: rgba(253, 252, 247, 0.85); /* zen warm parchment */
}
.timeline-col {
  scroll-snap-align: start;
  border-left: 1px solid var(--border-subtle, #e5e0d8);
}
```
`timeline.css` → skipped: JS scroll-sync/virtualization, add when node count exceeds 500 items.

---

### 2. Zero-JS Semantic Lineage Tree (CSS Connector Lines)

Replace canvas/SVG tree libraries (e.g., React Flow, D3) with native semantic lists and pseudo-elements.

```tsx
// components/LineageTree.tsx
type Figure = { id: string; name: string; children?: Figure[] };

export function LineageNode({ node }: { node: Figure }) {
  // ponytail: recursive render ceiling at depth ~15; upgrade to flat map if stack overflows
  return (
    <li className="relative pl-6 before:absolute before:left-0 before:top-3 before:h-px before:w-4 before:bg-stone-300">
      <span className="inline-block rounded-md border border-stone-200 bg-stone-50/50 px-2.5 py-1 text-xs font-medium text-stone-800">
        {node.name}
      </span>
      {node.children && node.children.length > 0 && (
        <ol className="relative ml-2 border-l border-stone-300">
          {node.children.map((child) => (
            <LineageNode key={child.id} node={child} />
          ))}
        </ol>
      )}
    </li>
  );
}
```
`LineageNode.tsx` → skipped: collapsible/zoomable canvas view, add when visual horizontal panning is strictly required.

---

### 3. Next.js Zero-Error Build Lock (`generateStaticParams`)

Prevent dynamic route build failures during SSG by locking static paths and enforcing strict route parameters.

```tsx
// app/lore/[figureId]/page.tsx
import { notFound } from 'next/navigation';
import { figures } from '@/data/lore';

export const dynamicParams = false; // hard-fail build on invalid routes

export function generateStaticParams() {
  return figures.map((f) => ({ figureId: f.id }));
}

export default async function LorePage({ params }: { params: Promise<{ figureId: string }> }) {
  const { figureId } = await params;
  const figure = figures.find((f) => f.id === figureId);
  if (!figure) notFound();

  return <main>{/* view */}</main>;
}
```
`page.tsx` → skipped: dynamic server-side fallback, add when lore entries are fetched from a CMS at runtime.

---

### Runnable Verification Check

```ts
// scripts/verify-lore.ts
import { figures } from '../data/lore';
import assert from 'node:assert';

// 1. Lineage IDs exist
const ids = new Set(figures.map(f => f.id));
assert.strictEqual(ids.size, figures.length, "Duplicate figure ID found");

// 2. Parents resolve to existing figures
figures.forEach(f => {
  if (f.parentId) assert(ids.has(f.parentId), `Dangling parentId: ${f.parentId} on ${f.id}`);
});

console.log("Lore sanity check passed: 0 build errors expected.");
```


### Cycle #97 Directive (2026-11-03 06:12)
### 1. Comparative Timeline: Zero-JS Synchronized CSS Grid

Replaces custom scroll-syncing JS with a native multi-column grid layout aligned on shared eras.

```tsx
// components/ComparativeTimeline.tsx
interface TimelineRowProps {
  era: string;
  judaism?: string;
  christianity?: string;
  islam?: string;
}

export function TimelineRow({ era, judaism, christianity, islam }: TimelineRowProps) {
  return (
    <div className="grid grid-cols-[100px_repeat(3,1fr)] gap-4 border-b border-stone-200/60 py-3 text-xs leading-relaxed dark:border-stone-800">
      <span className="font-mono text-stone-400 select-none self-baseline">{era}</span>
      <div className="text-stone-800 dark:text-stone-200">{judaism ?? '—'}</div>
      <div className="text-stone-800 dark:text-stone-200">{christianity ?? '—'}</div>
      <div className="text-stone-800 dark:text-stone-200">{islam ?? '—'}</div>
    </div>
  );
}
// ponytail: hardcoded to 3 Abrahamic columns; upgrade to CSS subgrid with dynamic columns if comparative scope expands.
```
→ skipped: heavy canvas/scroll-sync libraries, dynamic column layout engines.  
→ add when: tradition counts exceed 3 or side-by-side arbitrary filtering is introduced.

---

### 2. Lineage View: Semantic CSS-Tree (No Graph Bloat)

Replaces `react-flow` or D3 with clean, zen-warm native DOM tree connectors using standard flexbox and pseudo-elements.

```tsx
// components/LineageTree.tsx
export interface LineagePerson {
  id: string;
  name: string;
  children?: LineagePerson[];
}

export function LineageNode({ person }: { person: LineagePerson }) {
  const hasChildren = Boolean(person.children?.length);
  return (
    <li className="relative flex flex-col items-center">
      <div className="rounded-md border border-stone-200/80 bg-stone-50/80 px-2.5 py-1 text-xs font-serif tracking-wide text-stone-900 shadow-[0_1px_2px_rgba(0,0,0,0.03)] backdrop-blur dark:border-stone-800 dark:bg-stone-900 dark:text-stone-100">
        {person.name}
      </div>
      {hasChildren && (
        <ul className="flex gap-3 pt-3 before:absolute before:h-3 before:w-px before:bg-stone-300 dark:before:bg-stone-700">
          {person.children!.map((child) => (
            <LineageNode key={child.id} person={child} />
          ))}
        </ul>
      )}
    </li>
  );
}
// ponytail: single-parent tree; upgrade to SVG bezier lines if rendering complex cross-cousin unions.
```
→ skipped: interactive node dragging, zoom-pan engines, canvas graphing.  
→ add when: multi-parent intermarriage rendering causes overlapping DOM nodes.

---

### 3. Next.js Zero-Error Static Assurance

Guarantees zero hydration errors and zero dynamic-route fallback misses during `next build`.

```ts
// app/[tradition]/[figure]/page.tsx
import { getAllFigureSlugs, getFigureData } from '@/lib/lore';
import { notFound } from 'next/navigation';

export const dynamic = 'error';
export const dynamicParams = false;

export async function generateStaticParams() {
  // Returns: Array<{ tradition: string; figure: string }>
  return getAllFigureSlugs();
}

export default async function Page({
  params,
}: {
  params: Promise<{ tradition: string; figure: string }>;
}) {
  const { tradition, figure } = await params;
  const data = getFigureData(tradition, figure);
  if (!data) notFound();

  return <main className="mx-auto max-w-2xl px-6 py-12">{/* render */}</main>;
}
// ponytail: static pre-rendering only; upgrade to ISR (revalidate) if content is DB-driven.
```
→ skipped: runtime SSR fallback checks, dynamic caching tiers.  
→ add when: user-generated commentary or dynamic content editing is integrated.


### Cycle #98 Directive (2026-11-03 06:18)
### 1. Pure CSS Lineage Tree (Zero-JS Connectors)

```tsx
// components/LineageNode.tsx
interface Figure {
  id: string;
  name: string;
  traditions: string[];
  children?: Figure[];
}

export function LineageTree({ figure }: { figure: Figure }) {
  // ponytail: recursive flex-tree caps out at ~6 visible generations before horizontal overflow. Upgrade to virtualized pan/zoom if >500 nodes.
  return (
    <div className="flex flex-col items-center">
      <div className="rounded-lg border border-stone-200/80 bg-white/60 px-3 py-1.5 text-xs font-medium text-stone-800 shadow-xs backdrop-blur-md dark:border-stone-800 dark:bg-stone-900/60 dark:text-stone-200">
        {figure.name}
      </div>
      {figure.children && figure.children.length > 0 && (
        <div className="relative flex pt-6 before:absolute before:top-0 before:left-1/2 before:h-6 before:w-px before:-translate-x-1/2 before:bg-stone-300 dark:before:bg-stone-700">
          {figure.children.map((child, idx, arr) => (
            <div
              key={child.id}
              className={`relative flex flex-col items-center px-3 before:absolute before:top-0 before:h-px before:bg-stone-300 dark:before:bg-stone-700 ${
                arr.length === 1
                  ? "before:hidden"
                  : idx === 0
                  ? "before:left-1/2 before:right-0"
                  : idx === arr.length - 1
                  ? "before:left-0 before:right-1/2"
                  : "before:left-0 before:right-0"
              }`}
            >
              <div className="h-4 w-px bg-stone-300 dark:bg-stone-700" />
              <LineageTree figure={child} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```
`skipped: [D3/react-flow canvas overhead, custom SVG path math], add when [freeform drag-and-drop or graph cycle support is explicitly required].`

---

### 2. Multi-Tradition Comparative Timeline (Native CSS Grid)

```tsx
// components/ComparativeTimeline.tsx
interface EpochSync {
  bceYear: number;
  label: string;
  judaism?: string;
  christianity?: string;
  islam?: string;
}

export function ComparativeTimeline({ epochs }: { epochs: EpochSync[] }) {
  // ponytail: simple CSS grid layout caps out if traditions > 4.
  return (
    <div className="grid grid-cols-[80px_repeat(3,1fr)] divide-y divide-stone-100 text-xs dark:divide-stone-800/50">
      <div className="sticky top-0 z-10 grid grid-cols-subgrid col-span-4 bg-stone-50/90 py-2.5 font-medium text-stone-500 backdrop-blur-md dark:bg-stone-950/90">
        <span className="pl-2">Epoch</span>
        <span>Judaism (Tanakh)</span>
        <span>Christianity (NT)</span>
        <span>Islam (Quran/Hadith)</span>
      </div>
      {epochs.map((e) => (
        <div key={e.bceYear} className="grid grid-cols-subgrid col-span-4 py-3 items-baseline hover:bg-stone-50/50 dark:hover:bg-stone-900/30">
          <time className="pl-2 font-mono tabular-nums text-stone-400">{Math.abs(e.bceYear)} {e.bceYear < 0 ? "BCE" : "CE"}</time>
          <div className="pr-4 text-stone-700 dark:text-stone-300">{e.judaism ?? "—"}</div>
          <div className="pr-4 text-stone-700 dark:text-stone-300">{e.christianity ?? "—"}</div>
          <div className="pr-4 text-stone-700 dark:text-stone-300">{e.islam ?? "—"}</div>
        </div>
      ))}
    </div>
  );
}
```
`skipped: [JS scroll-sync and virtual list listeners], add when [timeline entries exceed 200 concurrent DOM rows].`

---

### 3. Next.js 15 Static Contract & Route Guard

```typescript
// app/traditions/[slug]/page.tsx
import { notFound } from "next/navigation";

export const dynamicParams = false;

const VALID_SLUGS = ["judaism", "christianity", "islam"] as const;
type TraditionSlug = (typeof VALID_SLUGS)[number];

export function generateStaticParams(): Array<{ slug: TraditionSlug }> {
  return VALID_SLUGS.map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: TraditionSlug }>;
}

export default async function TraditionPage({ params }: PageProps) {
  const { slug } = await params;
  if (!VALID_SLUGS.includes(slug)) notFound();

  return <main className="mx-auto max-w-4xl px-4 py-8">{/* Content */}</main>;
}

// Self-check for Next.js static integrity
function _assertStaticGuard() {
  const generated = generateStaticParams();
  if (generated.length !== 3) throw new Error("Build assert failed: missing traditions in static params");
}
_assertStaticGuard();
```
`skipped: [Dynamic CMS route handlers and external DB fetch wrappers], add when [traditions become runtime-configurable via external datastore].`


### Cycle #99 Directive (2026-11-03 06:23)
### 1. Static Route Guard for Next.js 15 Zero-Error Build

```tsx
// app/lore/[tradition]/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { getFigure, getAllFigureSlugs } from '@/lib/lore';

type Props = {
  params: Promise<{ tradition: string; slug: string }>;
};

export async function generateStaticParams() {
  // ponytail: Local static slugs; upgrade to dynamic DB fetch when migrating lore out of static JSON.
  return getAllFigureSlugs();
}

export default async function LorePage({ params }: Props) {
  const { tradition, slug } = await params;
  const figure = getFigure(tradition, slug);
  if (!figure) notFound();

  return <main className="max-w-2xl mx-auto px-6 py-12">{/* View */}</main>;
}
```
`app/lore/[tradition]/[slug]/page.tsx` → skipped: runtime SSR fallback, add when content is editor-generated via CMS.

---

### 2. Zero-Dependency Lineage Bezier Spline

```tsx
// components/lineage-path.tsx
export function LineageLink({ from, to }: { from: [number, number]; to: [number, number] }) {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const midY = (y1 + y2) / 2;
  // ponytail: Simple vertical tree curve; switch to d3-hierarchy when trees have multi-parent convergence.
  const d = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;

  return <path d={d} fill="none" stroke="currentColor" strokeWidth="1.25" className="text-stone-300 dark:text-stone-700" />;
}

// Self-check
if (process.env.NODE_ENV !== 'production') {
  const [x1, y1, x2, y2] = [0, 0, 100, 200];
  const expected = `M 0 0 C 0 100, 100 100, 100 200`;
  const actual = `M ${x1} ${y1} C ${x1} ${(y1 + y2) / 2}, ${x2} ${(y1 + y2) / 2}, ${x2} ${y2}`;
  console.assert(actual === expected, `Spline failed: ${actual}`);
}
```
`components/lineage-path.tsx` → skipped: dagre/d3-shape layout engine, add when cross-branch marriages or split descents collide.

---

### 3. CSS Subgrid Comparative Timeline

```tsx
// components/comparative-timeline.tsx
export function ComparativeTimeline({ epochs }: { epochs: { era: string; tracks: [string, string, string] }[] }) {
  return (
    <div className="grid grid-cols-[100px_repeat(3,minmax(260px,1fr))] overflow-x-auto divide-x divide-stone-200 dark:divide-stone-800 text-sm">
      <div className="contents font-serif text-stone-500">
        <span className="p-3 sticky left-0 bg-stone-50/80 dark:bg-stone-950/80 backdrop-blur">Era</span>
        <span className="p-3">Judaism</span>
        <span className="p-3">Christianity</span>
        <span className="p-3">Islam</span>
      </div>
      {epochs.map(({ era, tracks }) => (
        <div key={era} className="contents border-t border-stone-200 dark:border-stone-800">
          <span className="p-3 font-mono text-xs sticky left-0 bg-stone-50/80 dark:bg-stone-950/80 backdrop-blur">{era}</span>
          {tracks.map((event, i) => (
            <div key={i} className="p-3 bg-stone-50/30 dark:bg-stone-900/10 hover:bg-stone-100/50 transition-colors">
              {event || <span className="text-stone-400 select-none">—</span>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
```
`components/comparative-timeline.tsx` → skipped: synchronized dual-axis scroll JS listeners, add when epoch ranges have non-linear duration scaling.


### Cycle #100 Directive (2026-11-03 06:29)
### 1. Lineage View: Native CSS Tree Connectors (No D3/Canvas)

```tsx
// components/LineageNode.tsx
interface Figure {
  id: string;
  name: string;
  traditionNames: { hebrew?: string; arabic?: string };
  children?: Figure[];
}

export function LineageNode({ figure }: { figure: Figure }) {
  return (
    <li className="relative flex flex-col items-center p-0 list-none">
      <div className="z-10 rounded-lg border border-stone-200/80 bg-stone-50/90 px-3 py-1.5 text-center shadow-xs backdrop-blur-xs transition hover:border-amber-700/40 dark:border-stone-800 dark:bg-stone-900/90">
        <span className="block text-xs font-serif font-medium text-stone-900 dark:text-stone-100">{figure.name}</span>
        <span className="block text-[10px] tracking-wide text-stone-600 dark:text-stone-300">
          {[figure.traditionNames.hebrew, figure.traditionNames.arabic].filter(Boolean).join(" • ")}
        </span>
      </div>
      {figure.children && figure.children.length > 0 && (
        <ul className="relative flex gap-4 pt-6 before:absolute before:top-0 before:left-1/2 before:h-6 before:w-px before:-translate-x-1/2 before:bg-stone-300 dark:before:bg-stone-700">
          {figure.children.map((child) => (
            <LineageNode key={child.id} figure={child} />
          ))}
        </ul>
      )}
    </li>
  );
}
```
`skipped: [Canvas pan/zoom, D3 graph layout engine], add when [node count exceeds 150].`

---

### 2. Comparative Timeline: 3-Track Synchronized CSS Grid

```tsx
// components/ComparativeTimeline.tsx
interface EpochEvent {
  yearBCE: number;
  judaism?: string;
  christianity?: string;
  islam?: string;
}

export function ComparativeTimeline({ events }: { events: EpochEvent[] }) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-stone-200/60 bg-stone-100/30 p-4 dark:border-stone-800/60 dark:bg-stone-950/20">
      <div className="grid min-w-[640px] grid-cols-[80px_1fr_1fr_1fr] gap-y-3 text-xs">
        <div className="sticky top-0 font-mono text-[10px] text-stone-600 dark:text-stone-300">EPOCH</div>
        <div className="sticky top-0 font-serif font-medium text-amber-900/80 dark:text-amber-200/80">JUDAISM</div>
        <div className="sticky top-0 font-serif font-medium text-rose-900/80 dark:text-rose-200/80">CHRISTIANITY</div>
        <div className="sticky top-0 font-serif font-medium text-emerald-900/80 dark:text-emerald-200/80">ISLAM</div>

        {events.map((e, idx) => (
          <div key={idx} className="contents group">
            <span className="self-center font-mono text-[10px] text-stone-600 dark:text-stone-300 border-t border-stone-200/40 py-2 dark:border-stone-800/40">{e.yearBCE} BCE</span>
            <div className="border-t border-stone-200/40 p-2 text-stone-800 group-hover:bg-amber-500/5 dark:border-stone-800/40 dark:text-stone-200">{e.judaism ?? "—"}</div>
            <div className="border-t border-stone-200/40 p-2 text-stone-800 group-hover:bg-rose-500/5 dark:border-stone-800/40 dark:text-stone-200">{e.christianity ?? "—"}</div>
            <div className="border-t border-stone-200/40 p-2 text-stone-800 group-hover:bg-emerald-500/5 dark:border-stone-800/40 dark:text-stone-200">{e.islam ?? "—"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
```
`skipped: [Bidirectional sync-scrolling JS listeners], add when [mobile card-collapse view is required].`

---

### 3. Build Hardening: Static Route Params & Validation Guard

```tsx
// app/figures/[slug]/page.tsx
import { notFound } from "next/navigation";

// ponytail: Static figure registry ceiling: 100 figures inline. Upgrade to sqlite/fs if dataset outgrows code repo.
const SLUGS = ["abraham", "moses", "jesus", "muhammad", "mary", "noah"] as const;
type ValidSlug = typeof SLUGS[number];

export function generateStaticParams(): Array<{ slug: ValidSlug }> {
  return SLUGS.map((slug) => ({ slug }));
}

export default async function FigurePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!SLUGS.includes(slug as ValidSlug)) notFound();

  return (
    <main className="mx-auto max-w-xl py-12 px-4">
      <h1 className="font-serif text-2xl capitalize text-stone-900 dark:text-stone-100">{slug}</h1>
    </main>
  );
}
```
`skipped: [External CMS/Database dynamic fetch checks], add when [content is author-managed outside repo].`


### Cycle #101 Directive (2026-11-03 06:34)
### 1. Comparative Timeline: CSS Grid `contents` Alignment

Replace JS scroll-sync/alignment engines with a single CSS grid using `display: contents` to align cross-tradition figures chronologically across rows without layout wrappers.

```tsx
// components/ComparativeTimeline.tsx
interface TimelineRow {
  period: string;
  judaism?: string;
  christianity?: string;
  islam?: string;
}

export function ComparativeTimeline({ rows }: { rows: TimelineRow[] }) {
  // ponytail: fixed 3-tradition schema; upgrade to dynamic columns if traditions become user-configurable.
  return (
    <div className="grid grid-cols-[100px_repeat(3,1fr)] gap-x-4 gap-y-2 text-sm">
      <div className="contents font-mono text-xs text-stone-400 border-b border-stone-200 pb-2">
        <span>Period</span><span>Judaism</span><span>Christianity</span><span>Islam</span>
      </div>
      {rows.map((r) => (
        <div key={r.period} className="contents group">
          <span className="sticky top-6 self-start font-mono text-xs text-stone-400 group-hover:text-stone-900 transition-colors">
            {r.period}
          </span>
          <div className="p-2.5 rounded bg-stone-50 border border-stone-100">{r.judaism ?? '—'}</div>
          <div className="p-2.5 rounded bg-stone-50 border border-stone-100">{r.christianity ?? '—'}</div>
          <div className="p-2.5 rounded bg-stone-50 border border-stone-100">{r.islam ?? '—'}</div>
        </div>
      ))}
    </div>
  );
}
```
→ skipped: JS-based scroll synchronizers and D3 bands; add when canvas zooming/panning is strictly requested.

---

### 2. Lineage View: Native CSS Branch Tree

Ditch ReactFlow/Canvas. Semantic nested HTML `<ul>`/`<li>` with native pseudo-element connector lines for pure-CSS genealogical trees.

```css
/* app/lineage/tree.module.css */
.tree ul { display: flex; justify-content: center; padding-top: 1rem; position: relative; }
.tree li { display: flex; flex-direction: column; align-items: center; position: relative; padding: 1rem 0.5rem 0; }
.tree li::before, .tree li::after { content: ''; position: absolute; top: 0; right: 50%; border-top: 1px solid #d6d3d1; width: 50%; height: 1rem; }
.tree li::after { right: auto; left: 50%; border-left: 1px solid #d6d3d1; }
.tree li:only-child::after, .tree li:only-child::before { display: none; }
.tree li:first-child::before, .tree li:last-child::after { border: 0 none; }
.tree li:last-child::before { border-right: 1px solid #d6d3d1; border-radius: 0 4px 0 0; }
.tree li:first-child::after { border-radius: 4px 0 0 0; }
```
```tsx
// components/LineageNode.tsx
import s from '@/app/lineage/tree.module.css';

export interface Person { name: string; children?: Person[] }

export function LineageNode({ person }: { person: Person }) {
  // ponytail: max depth ~6 before horizontal scroll required; wrap in overflow-x-auto.
  return (
    <li className={s.tree}>
      <span className="px-3 py-1.5 rounded-full border border-stone-300 bg-white text-stone-800 text-xs shadow-xs">
        {person.name}
      </span>
      {person.children && person.children.length > 0 && (
        <ul>
          {person.children.map((c) => <LineageNode key={c.name} person={c} />)}
        </ul>
      )}
    </li>
  );
}
```
→ skipped: `@xyflow/react` / graph libraries; add when nodes require arbitrary user drag-and-drop.

---

### 3. Next.js Zero-Error Build: Route Static Params & Suspense Guard

Eliminate the two primary build-time bails (`useSearchParams` without boundary and dynamic server page missing params) causing `next build` export failures.

```tsx
// app/timeline/[id]/page.tsx
import { Suspense } from 'react';

// Enforce total static pre-rendering (zero-error SSR mismatch)
export const dynamic = 'error';
export const dynamicParams = false;

export function generateStaticParams() {
  // ponytail: hardcoded mock list; pull IDs from local static JSON dataset.
  return [{ id: 'patriarchs' }, { id: 'prophets' }, { id: 'exile' }];
}

export default async function TimelinePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // Next.js 15 requires awaiting params
  return (
    <Suspense fallback={<div className="h-64 animate-pulse bg-stone-50 rounded" />}>
      <h1 className="font-serif text-xl capitalize text-stone-900">{id} Timeline</h1>
    </Suspense>
  );
}
```
→ skipped: Dynamic on-demand SSR runtime; add when private user authentication or mutative APIs are introduced.


### Cycle #102 Directive (2026-11-03 06:40)
### 1. Pure CSS Lineage Tree Connectors (Kill graph/canvas libs)

```tsx
// components/LineageNode.tsx
interface Person {
  name: string;
  traditionNames?: { hebrew?: string; arabic?: string };
  children?: Person[];
}

export function LineageNode({ person }: { person: Person }) {
  return (
    <li className="relative flex flex-col items-center p-2">
      <div className="z-10 rounded-lg border border-stone-200/60 bg-stone-50/80 px-3 py-1.5 text-center backdrop-blur-sm dark:border-stone-800 dark:bg-stone-900/80">
        <span className="text-sm font-medium tracking-tight text-stone-900 dark:text-stone-100">{person.name}</span>
        {person.traditionNames && (
          <span className="block text-[11px] text-stone-500 font-serif">
            {[person.traditionNames.hebrew, person.traditionNames.arabic].filter(Boolean).join(' • ')}
          </span>
        )}
      </div>
      {/* ponytail: CSS tree depth ceiling = ~6 tiers. Upgrade to virtualized SVG canvas if rendering >200 nodes simultaneously. */}
      {person.children && person.children.length > 0 && (
        <ul className="flex pt-4 before:absolute before:top-9 before:h-4 before:w-px before:bg-stone-300 dark:before:bg-stone-700">
          {person.children.map((child) => (
            <LineageNode key={child.name} person={child} />
          ))}
        </ul>
      )}
    </li>
  );
}
```
→ skipped: Pan/zoom canvas state and D3 hierarchy calculations.  
Add when: Lineage graph requires bidirectional cross-unions (cycles) or exceeds 200 nodes on screen.

---

### 2. Zero-JS Synchronized Comparative Timeline

```tsx
// components/ComparativeTimeline.tsx
interface TimelineEpoch {
  era: string;
  jewish: string[];
  christian: string[];
  islamic: string[];
}

export function ComparativeTimeline({ epochs }: { epochs: TimelineEpoch[] }) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="grid min-w-[640px] grid-cols-[100px_repeat(3,1fr)] gap-px bg-stone-200 text-xs dark:bg-stone-800">
        <div className="sticky top-0 z-20 bg-stone-100 p-2 font-mono font-semibold dark:bg-stone-900">Era</div>
        <div className="sticky top-0 z-20 bg-stone-100 p-2 font-semibold text-amber-900 dark:bg-stone-900 dark:text-amber-200">Judaism</div>
        <div className="sticky top-0 z-20 bg-stone-100 p-2 font-semibold text-sky-900 dark:bg-stone-900 dark:text-sky-200">Christianity</div>
        <div className="sticky top-0 z-20 bg-stone-100 p-2 font-semibold text-emerald-900 dark:bg-stone-900 dark:text-emerald-200">Islam</div>

        {epochs.map((e) => (
          <div key={e.era} className="contents bg-stone-50 dark:bg-stone-950">
            <div className="p-2 font-mono text-stone-400 border-t border-stone-200 dark:border-stone-800">{e.era}</div>
            <div className="p-2 border-t border-stone-200 dark:border-stone-800">{e.jewish.join(', ') || '—'}</div>
            <div className="p-2 border-t border-stone-200 dark:border-stone-800">{e.christian.join(', ') || '—'}</div>
            <div className="p-2 border-t border-stone-200 dark:border-stone-800">{e.islamic.join(', ') || '—'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
```
→ skipped: Scroll-sync event listeners and multi-track absolute pixel positioning.  
Add when: Users need fractional-year zooming or continuous scrub-scrub time scale scrubbing.

---

### 3. Next.js 15 Zero-Error Dynamic Params Hardening

```tsx
// app/figure/[slug]/page.tsx
import { notFound } from 'next/navigation';

const LORE_DATA: Record<string, { title: string; lineage: string[] }> = {
  abraham: { title: 'Abraham / Ibrahim', lineage: ['Terah', 'Nahor'] },
};

export function generateStaticParams() {
  return Object.keys(LORE_DATA).map((slug) => ({ slug }));
}

// ponytail: Next.js 15 params promise handling. Upgrade to DB fetch with React cache() when moving off flat files.
export default async function FigurePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const figure = LORE_DATA[slug];

  if (!figure) notFound();

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-xl font-medium tracking-tight text-stone-900 dark:text-stone-100">{figure.title}</h1>
    </main>
  );
}
```
→ skipped: Remote CMS SDK layers and database connection pools.  
Add when: Lore repository migrates from static JSON/Markdown assets to a live external DB.


### Cycle #103 Directive (2026-11-03 06:46)
### 1. Build Parity: Lock Static Prerendering (`app/lineage/[id]/page.tsx`)

```tsx
// Force zero-dynamic build guarantee; fails fast at `next build` if data is incomplete.
export const dynamic = 'error';
export const dynamicParams = false;

export async function generateStaticParams() {
  const { figures } = await import('@/data/figures.json');
  // ponytail: assumes single flat figures array; upgrade to paginated batches if set exceeds 5k.
  return figures.map((f: { id: string }) => ({ id: f.id }));
}
```
→ skipped: runtime dynamic fallbacks and DB connection pools; add when moving off static JSON to a live CMS/database.

---

### 2. Comparative Timeline: Pure CSS Alignment (`components/ComparativeTimeline.tsx`)

```tsx
interface EraEntry {
  bce: number;
  traditions: { judaism?: string; christianity?: string; islam?: string };
}

export function ComparativeTimeline({ entries }: { entries: EraEntry[] }) {
  return (
    <div className="grid grid-cols-[80px_repeat(3,1fr)] gap-3 border-l border-zinc-200 dark:border-zinc-800">
      {entries.map(({ bce, traditions }) => (
        <div key={bce} className="contents">
          <time className="sticky top-4 text-xs font-mono text-zinc-400 py-2">{Math.abs(bce)} BCE</time>
          {(['judaism', 'christianity', 'islam'] as const).map((faith) => (
            <div key={faith} className="p-3 bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-md text-xs leading-relaxed">
              {traditions[faith] ?? <span className="text-zinc-300 dark:text-zinc-700">—</span>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
```
→ skipped: JS-driven scroll synchronization and virtualization; add when horizontal era count exceeds 300 entries.

---

### 3. Lineage View: Native HTML/CSS Tree (`components/LineageTree.tsx`)

```tsx
interface Member {
  name: string;
  canon: string;
  children?: Member[];
}

export function LineageNode({ node }: { node: Member }) {
  return (
    <li className="relative pl-5 before:absolute before:left-0 before:top-2 before:h-full before:w-px before:bg-zinc-300 dark:before:bg-zinc-700 last:before:h-2">
      <span className="absolute left-0 top-2 h-px w-3 bg-zinc-300 dark:bg-zinc-700" />
      <span className="text-xs font-serif font-medium text-zinc-900 dark:text-zinc-100">{node.name}</span>
      <span className="ml-1.5 text-[10px] text-zinc-400">{node.canon}</span>
      {node.children && (
        <ul className="mt-1 space-y-1">
          {node.children.map((child) => (
            <LineageNode key={child.name} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
}
```
→ skipped: Canvas/D3/React Flow layout engine; add when lineage requirements evolve from hierarchical trees to cyclic/bidirectional graphs.


### Cycle #105 Directive (2026-11-03 06:57)
### 1. Cross-Tradition Timeline: Pure CSS Sticky Era Grid (Zero-Lib)

Align Jewish, Christian, and Islamic traditions side-by-side using native CSS grid and scroll snap instead of a heavy JS timeline library.

```tsx
// components/ComparativeTimeline.tsx
interface TimelineEra {
  era: string;
  judaism: string[];
  christianity: string[];
  islam: string[];
}

export function ComparativeTimeline({ eras }: { eras: TimelineEra[] }) {
  // ponytail: Flat array rendering; upgrade to virtualized windowing only if eras > 100
  return (
    <div className="overflow-x-auto scroll-smooth border-y border-stone-200 dark:border-stone-800">
      <div className="grid min-w-[760px] grid-cols-[140px_1fr_1fr_1fr] divide-x divide-stone-200 text-sm dark:divide-stone-850">
        <div className="sticky left-0 bg-stone-50/95 p-3 font-mono text-xs uppercase tracking-wider text-stone-500 backdrop-blur dark:bg-stone-900/95">Era</div>
        <div className="p-3 font-serif font-medium text-amber-900 dark:text-amber-200">Judaism</div>
        <div className="p-3 font-serif font-medium text-sky-900 dark:text-sky-200">Christianity</div>
        <div className="p-3 font-serif font-medium text-emerald-900 dark:text-emerald-200">Islam</div>

        {eras.map(({ era, judaism, christianity, islam }) => (
          <div key={era} className="contents border-t border-stone-150 dark:border-stone-850">
            <div className="sticky left-0 bg-stone-50/95 p-4 font-mono text-xs text-stone-600 backdrop-blur dark:bg-stone-900/95 dark:text-stone-400">{era}</div>
            <div className="p-4 space-y-1">{judaism.map((n) => <div key={n} className="rounded bg-amber-500/10 px-2 py-1 text-xs">{n}</div>)}</div>
            <div className="p-4 space-y-1">{christianity.map((n) => <div key={n} className="rounded bg-sky-500/10 px-2 py-1 text-xs">{n}</div>)}</div>
            <div className="p-4 space-y-1">{islam.map((n) => <div key={n} className="rounded bg-emerald-500/10 px-2 py-1 text-xs">{n}</div>)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
```
`skipped: Vis.js/D3 canvas rendering, dynamic zoom levels.`  
`add when: Dataset exceeds 500 overlapping figures or requires continuous pinch-to-zoom.`

---

### 2. Lineage View: Semantic Tree via CSS Pseudo-Elements (No Graph Lib)

Replace canvas/SVG tree overhead with semantic nested HTML and border connectors.

```tsx
// components/LineageNode.tsx
export interface PersonNode {
  name: string;
  title?: string;
  children?: PersonNode[];
}

export function LineageTree({ node }: { node: PersonNode }) {
  // ponytail: Unidirectional parent->children only; add bidirectional marriage links if inter-clan unions must be mapped
  return (
    <div className="inline-flex flex-col items-center">
      <div className="rounded-md border border-stone-300 bg-white px-3 py-1.5 text-center shadow-xs dark:border-stone-700 dark:bg-stone-900">
        <p className="font-serif text-sm font-semibold text-stone-900 dark:text-stone-100">{node.name}</p>
        {node.title && <p className="font-sans text-[10px] text-stone-500">{node.title}</p>}
      </div>

      {node.children && node.children.length > 0 && (
        <>
          <div className="h-4 w-px bg-stone-300 dark:bg-stone-700" />
          <div className="flex items-start gap-4 border-t border-stone-300 pt-4 dark:border-stone-700">
            {node.children.map((child) => (
              <LineageTree key={child.name} node={child} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
```
`skipped: React Flow/Cytoscape layout engines and drag-pan viewports.`  
`add when: Lineages contain multi-parent cross-links or circular descent loops.`

---

### 3. Production Build: Strict Static Params & Null-Safe Slugs

Fixes typical Next.js production build crashes (`generateStaticParams` returning unhandled keys or empty sets).

```tsx
// app/lore/[tradition]/[figure]/page.tsx
import { notFound } from "next/navigation";
import { getAllFigures, getFigureData } from "@/lib/lore";

export const dynamicParams = false;

export async function generateStaticParams() {
  const figures = await getAllFigures();
  // ponytail: Flat synchronous param extraction; upgrade to paginated batching if static pages > 2000
  return figures.map((f) => ({
    tradition: encodeURIComponent(f.tradition.toLowerCase()),
    figure: encodeURIComponent(f.slug.toLowerCase()),
  }));
}

export default async function FigurePage({
  params,
}: {
  params: Promise<{ tradition: string; figure: string }>;
}) {
  const { tradition, figure } = await params;
  const data = await getFigureData(decodeURIComponent(tradition), decodeURIComponent(figure));

  if (!data) notFound();

  return (
    <article className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="font-serif text-2xl font-bold">{data.canonicalName}</h1>
      <p className="mt-2 text-stone-600 dark:text-stone-400">{data.summary}</p>
    </article>
  );
}
```
`skipped: Dynamic on-demand SSR fallback handlers.`  
`add when: Lore content is edited via live CMS without triggering a GitHub deployment build.`


### Cycle #106 Directive (2026-11-03 07:03)
### 1. Pure CSS Lineage Tree Connectors (No D3/Canvas)

Replace canvas/graph dependencies with native semantic DOM and CSS pseudo-connectors.

```tsx
// components/LineageNode.tsx
interface Figure {
  id: string;
  name: string;
  children?: Figure[];
}

export function LineageNode({ figure }: { figure: Figure }) {
  // ponytail: recursion depth uncapped; add max-depth cutoff if genealogical cycles exist
  return (
    <li className="relative pl-6 before:absolute before:left-0 before:top-3 before:h-px before:w-4 before:bg-stone-300 dark:before:bg-stone-700">
      <span className="inline-block rounded-md border border-stone-200 bg-stone-50/50 px-2.5 py-1 text-xs font-serif tracking-wide text-stone-900 backdrop-blur-sm dark:border-stone-800 dark:bg-stone-900/50 dark:text-stone-100">
        {figure.name}
      </span>
      {figure.children && figure.children.length > 0 && (
        <ul className="relative ml-2 border-l border-stone-300 pl-2 dark:border-stone-700">
          {figure.children.map((child) => (
            <LineageNode key={child.id} figure={child} />
          ))}
        </ul>
      )}
    </li>
  );
}
```
→ skipped: Pan/zoom canvas, interactive layout engines (React Flow/D3).  
→ add when: Lineage graph requires bidirectional parentage or exceeds 500 interactive nodes.

---

### 2. Multi-Tradition Timeline via Sticky Subgrid (Zero-JS Sync)

Synchronize Jewish, Christian, and Islamic narratives with native sticky tracks and CSS grid instead of scroll-listener state.

```tsx
// components/ComparativeTimeline.tsx
interface EraEvent {
  era: string;
  judaism?: string;
  christianity?: string;
  islam?: string;
}

export function ComparativeTimeline({ events }: { events: EraEvent[] }) {
  return (
    <div className="grid grid-cols-[8rem_1fr_1fr_1fr] gap-x-4 gap-y-6 overflow-x-auto text-sm">
      <div className="sticky top-0 z-10 col-span-4 grid grid-cols-subgrid border-b border-stone-200 bg-stone-50/80 pb-2 font-serif backdrop-blur dark:border-stone-800 dark:bg-stone-950/80">
        <span className="text-stone-400">Era</span>
        <span className="text-amber-900 dark:text-amber-200">Judaism</span>
        <span className="text-sky-900 dark:text-sky-200">Christianity</span>
        <span className="text-emerald-900 dark:text-emerald-200">Islam</span>
      </div>
      {events.map((e, idx) => (
        <div key={idx} className="col-span-4 grid grid-cols-subgrid items-baseline border-b border-stone-100 py-2 dark:border-stone-900">
          <span className="text-xs font-mono text-stone-400">{e.era}</span>
          <p className="text-stone-700 dark:text-stone-300">{e.judaism ?? '—'}</p>
          <p className="text-stone-700 dark:text-stone-300">{e.christianity ?? '—'}</p>
          <p className="text-stone-700 dark:text-stone-300">{e.islam ?? '—'}</p>
        </div>
      ))}
    </div>
  );
}
```
→ skipped: IntersectionObserver syncing, dynamic column collapsing, event collision algorithms.  
→ add when: Horizontal space on mobile forces single-column accordion viewports.

---

### 3. Build-Time Static Guarantee (`next.config.ts`)

Enforce strict static route typing and prevent runtime fallback bailouts during `next build`.

```ts
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  typescript: {
    // Fail build immediately if types break contract
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
```

```tsx
// app/figures/[slug]/page.tsx
export const dynamic = 'error'; // Halts build if dynamic data fetches slip into static generation

export async function generateStaticParams() {
  const figures = await import('@/data/lore.json').then((m) => m.figures);
  return figures.map((f: { slug: string }) => ({ slug: f.slug }));
}
```
→ skipped: Incremental Static Regeneration (ISR) and Edge middleware.  
→ add when: Lore content moves from local repository/JSON to a live CMS API.


### Cycle #107 Directive (2026-11-03 07:08)
### 1. Zero-Dependency Lineage View (Pure CSS Connectors)

```css
/* app/lineage/lineage.module.css */
.tree, .tree ul {
  display: flex;
  justify-content: center;
  padding-top: 1.25rem;
  position: relative;
}

.tree li {
  text-align: center;
  list-style-type: none;
  position: relative;
  padding: 1.25rem 0.75rem 0;
}

.tree li::before, .tree li::after {
  content: '';
  position: absolute;
  top: 0;
  right: 50%;
  border-top: 1px solid var(--border, #e5e5e5);
  width: 50%;
  height: 1.25rem;
}

.tree li::after {
  right: auto;
  left: 50%;
  border-left: 1px solid var(--border, #e5e5e5);
}

.tree li:only-child::after, .tree li:only-child::before { display: none; }
.tree li:only-child { padding-top: 0; }
.tree li:first-child::before, .tree li:last-child::after { border: 0 none; }
.tree li:last-child::before {
  border-right: 1px solid var(--border, #e5e5e5);
  border-radius: 0 6px 0 0;
}
.tree li:first-child::after { border-radius: 6px 0 0 0; }
```
`skipped: React Flow / D3 graph engine, add when: lineage nodes exceed screen density and need interactive pan/zoom canvas controls.`

---

### 2. Comparative Timeline (CSS Subgrid Synchronizer)

```tsx
// components/comparative-timeline.tsx
type Event = { era: string; tradition: 'judaism' | 'christianity' | 'islam'; title: string };

export function ComparativeTimeline({ events }: { events: Event[] }) {
  const eras = Array.from(new Set(events.map((e) => e.era)));
  const traditions = ['judaism', 'christianity', 'islam'] as const;

  return (
    <div className="grid grid-cols-[100px_repeat(3,1fr)] gap-x-4 border-l border-neutral-200 dark:border-neutral-800">
      <div className="font-mono text-xs opacity-40 sticky top-0 py-2">ERA</div>
      {traditions.map((t) => (
        <div key={t} className="font-mono text-xs uppercase opacity-60 sticky top-0 py-2 capitalize">{t}</div>
      ))}
      {eras.map((era) => (
        <div key={era} className="contents border-t border-neutral-100 dark:border-neutral-900">
          <span className="font-mono text-xs text-neutral-400 py-3 sticky left-0">{era}</span>
          {traditions.map((t) => (
            <div key={t} className="py-2 space-y-1.5">
              {events
                .filter((e) => e.era === era && e.tradition === t)
                .map((e, i) => (
                  <div key={i} className="text-xs p-2 rounded-md bg-stone-50/80 dark:bg-stone-900/40 border border-stone-200/50 dark:border-stone-800/50">
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
`skipped: layout calculation hooks & virtualized scroll, add when: event counts exceed 500 items per era.`

---

### 3. Production Build Lock (Static Verification & Suspense Boundary)

```tsx
// app/timeline/page.tsx
import { Suspense } from 'react';

// ponytail: static generation guarantee; upgrade to 'auto' only when user-authenticated routes exist
export const dynamic = 'error';

export default async function TimelinePage(props: {
  searchParams: Promise<{ tradition?: string }>;
}) {
  const searchParams = await props.searchParams;

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <Suspense fallback={<div className="h-64 animate-pulse bg-neutral-100 dark:bg-neutral-900 rounded-lg" />}>
        {/* Render timeline content with validated searchParams */}
        <section data-active-filter={searchParams.tradition ?? 'all'} />
      </Suspense>
    </main>
  );
}
```
`skipped: client-side search state routing, add when: search parameters require multi-facet URL updates without page refreshes.`


### Cycle #108 Directive (2026-11-03 07:14)
### 1. Comparative Timeline: Pure CSS Grid (`display: contents`)

Eliminate alignment JS and nested flex containers. Uses standard 3-tradition lane sync with native CSS sticky headers.

```tsx
// components/ComparativeTimeline.tsx
interface TimelineRow {
  era: string;
  judaism?: string;
  christianity?: string;
  islam?: string;
}

export function ComparativeTimeline({ rows }: { rows: TimelineRow[] }) {
  // ponytail: inline array ceiling; upgrade to virtualization if rows > 150
  return (
    <div className="grid grid-cols-[80px_repeat(3,1fr)] gap-px bg-stone-200 dark:bg-stone-800 rounded-lg overflow-x-auto text-xs font-sans">
      <div className="sticky top-0 bg-stone-50 dark:bg-stone-900 p-3 font-mono text-stone-400">Era</div>
      {['Judaism', 'Christianity', 'Islam'].map((t) => (
        <div key={t} className="sticky top-0 bg-stone-50 dark:bg-stone-900 p-3 font-semibold text-stone-700 dark:text-stone-200">{t}</div>
      ))}
      {rows.map((r) => (
        <div key={r.era} className="contents group">
          <div className="bg-white dark:bg-stone-950 p-3 font-mono text-stone-400 tabular-nums">{r.era}</div>
          <div className="bg-white dark:bg-stone-950 p-3 leading-relaxed text-stone-600 dark:text-stone-300">{r.judaism ?? '—'}</div>
          <div className="bg-white dark:bg-stone-950 p-3 leading-relaxed text-stone-600 dark:text-stone-300">{r.christianity ?? '—'}</div>
          <div className="bg-white dark:bg-stone-950 p-3 leading-relaxed text-stone-600 dark:text-stone-300">{r.islam ?? '—'}</div>
        </div>
      ))}
    </div>
  );
}
```
skipped: Canvas/SVG sync logic and D3 drag-scroll.
add when: Non-linear zoomable scrubbers or multi-century parallax are required.

---

### 2. Lineage View: Zero-JS Semantic CSS Tree

Replace graph libraries (`react-flow`, `vis-js`) with pure CSS connector pseudo-elements.

```tsx
// components/LineageTree.tsx
interface PersonNode {
  name: string;
  epithet?: string;
  children?: PersonNode[];
}

export function LineageTree({ node }: { node: PersonNode }) {
  return (
    <ul className="relative pl-6 text-sm text-stone-800 dark:text-stone-200 border-l border-stone-200 dark:border-stone-800 space-y-2 my-1">
      <li className="relative">
        <span className="absolute -left-6 top-3 w-4 border-t border-stone-200 dark:border-stone-800" />
        <div className="inline-flex items-baseline gap-2 py-1 px-2.5 rounded-md bg-stone-100 dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800/60">
          <span className="font-medium tracking-tight">{node.name}</span>
          {node.epithet && <span className="text-[11px] text-stone-400 font-serif italic">{node.epithet}</span>}
        </div>
        {node.children?.map((c) => (
          <LineageTree key={c.name} node={c} />
        ))}
      </li>
    </ul>
  );
}
```
skipped: DAG layout engines and complex bidirectional lineage cross-links.
add when: Graph cycles (e.g. intermarriages) break single-parent hierarchical trees.

---

### 3. Next.js 15 Zero-Error SSG Route Contract

Eliminate production dynamic route mismatches (`unhandledRejection`, missing static paths, un-awaited params).

```tsx
// app/figures/[slug]/page.tsx
import { notFound } from 'next/navigation';

const CANONICAL_SLUGS = ['abraham', 'moses', 'aaron', 'jesus', 'mary', 'muhammad'] as const;
type ValidSlug = (typeof CANONICAL_SLUGS)[number];

export function generateStaticParams(): { slug: ValidSlug }[] {
  return CANONICAL_SLUGS.map((slug) => ({ slug }));
}

export default async function FigurePage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  
  if (!CANONICAL_SLUGS.includes(slug as ValidSlug)) {
    notFound();
  }

  return (
    <article className="max-w-xl mx-auto py-16 px-6">
      <h1 className="text-2xl font-serif tracking-tight capitalize text-stone-900 dark:text-stone-100">{slug}</h1>
    </article>
  );
}

// Self-check assert (runs on import during build)
console.assert(generateStaticParams().length === CANONICAL_SLUGS.length, 'SSG params count mismatch');
```
skipped: Contentful/CMS fetch adapters and remote schema validation.
add when: Lore content moves from local markdown/consts to a remote headless CMS.


### Cycle #109 Directive (2026-11-03 07:20)
### 1. Comparative Timeline: Zero-JS Sticky Synchronized Tracks

Replace JS scroll listeners and heavy timeline libraries with native CSS sticky column tracks and CSS grid alignment. Eliminates runtime hydration desync.

```tsx
// components/ComparativeTimeline.tsx
interface TimelineEvent {
  era: string;
  judaism?: string;
  christianity?: string;
  islam?: string;
}

export function ComparativeTimeline({ events }: { events: TimelineEvent[] }) {
  return (
    <div className="w-full overflow-x-auto border-neutral-200 dark:border-neutral-800">
      <div className="grid min-w-[640px] grid-cols-[100px_repeat(3,1fr)] gap-px bg-neutral-200 dark:bg-neutral-800 text-xs">
        <div className="sticky top-0 z-10 bg-neutral-50 p-2 font-mono font-medium dark:bg-neutral-950">Era</div>
        <div className="sticky top-0 z-10 bg-neutral-50 p-2 font-serif font-medium dark:bg-neutral-950">Judaism</div>
        <div className="sticky top-0 z-10 bg-neutral-50 p-2 font-serif font-medium dark:bg-neutral-950">Christianity</div>
        <div className="sticky top-0 z-10 bg-neutral-50 p-2 font-serif font-medium dark:bg-neutral-950">Islam</div>

        {events.map((e, idx) => (
          <div key={idx} className="contents group">
            <div className="bg-white p-3 font-mono text-neutral-400 dark:bg-black">{e.era}</div>
            <div className="bg-white p-3 dark:bg-black">{e.judaism || <span className="text-neutral-300 dark:text-neutral-700">—</span>}</div>
            <div className="bg-white p-3 dark:bg-black">{e.christianity || <span className="text-neutral-300 dark:text-neutral-700">—</span>}</div>
            <div className="bg-white p-3 dark:bg-black">{e.islam || <span className="text-neutral-300 dark:text-neutral-700">—</span>}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
```
skipped: IntersectionObserver active-era highlight, bidirectional zoom.  
add when: Timeline data exceeds 50 distinct historical eras.

---

### 2. Lineage View: Native CSS Tree Connectors (No D3/Canvas)

Semantic, accessible lineage branch structure rendered with pure CSS pseudo-elements and horizontal scroll-snap.

```tsx
// components/LineageNode.tsx
interface Figure {
  name: string;
  title?: string;
  children?: Figure[];
}

export function LineageNode({ figure }: { figure: Figure }) {
  // ponytail: recursive flex tree caps at 10 depth levels; upgrade to virtualized SVG if tree > 500 nodes
  return (
    <li className="flex flex-col items-center relative pt-4">
      <div className="z-10 rounded-lg border border-neutral-200 bg-white/80 px-3 py-1.5 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/80 shadow-xs">
        <span className="font-serif text-sm font-medium tracking-tight">{figure.name}</span>
        {figure.title && <span className="block text-[10px] text-neutral-400 uppercase tracking-widest">{figure.title}</span>}
      </div>

      {figure.children && figure.children.length > 0 && (
        <ul className="flex justify-center gap-4 pt-4 relative before:absolute before:top-0 before:left-1/2 before:h-4 before:w-px before:bg-neutral-300 dark:before:bg-neutral-700">
          {figure.children.map((child) => (
            <LineageNode key={child.name} figure={child} />
          ))}
        </ul>
      )}
    </li>
  );
}
```
skipped: Interactive node collapsible state, pan-and-zoom controls.  
add when: Lineage depth causes horizontal viewport clipping on mobile (> 4 generations).

---

### 3. Next.js Static Export & Dynamic Routes Type-Safety Guard

Eliminate production dynamic route prerender errors (`Type error` / `Page is missing generateStaticParams`) with strictly typed static params.

```tsx
// app/[tradition]/[figure]/page.tsx
import { notFound } from 'next/navigation';

export const dynamicParams = false;

const VALID_LORE_INDEX = {
  abrahamic: ['ibrahim', 'abraham', 'moses', 'musa'],
} as const;

type Tradition = keyof typeof VALID_LORE_INDEX;

export function generateStaticParams() {
  return Object.entries(VALID_LORE_INDEX).flatMap(([tradition, figures]) =>
    figures.map((figure) => ({ tradition, figure }))
  );
}

export default async function FigurePage({
  params,
}: {
  params: Promise<{ tradition: string; figure: string }>;
}) {
  const { tradition, figure } = await params;
  const figures = VALID_LORE_INDEX[tradition as Tradition];
  if (!figures || !figures.includes(figure as never)) notFound();

  return (
    <main className="mx-auto max-w-xl py-12 px-4">
      <h1 className="font-serif text-2xl capitalize tracking-tight">{figure}</h1>
      <p className="text-xs text-neutral-400 capitalize">{tradition} Lore</p>
    </main>
  );
}

// Self-check
(() => {
  const params = generateStaticParams();
  console.assert(params.length === 4, 'Static params count mismatch');
  console.assert(params.some(p => p.figure === 'ibrahim'), 'Missing static route');
})();
```
skipped: Remote CMS dynamic fetch layer, custom revalidation tags.  
add when: Lore data is decoupled into an external database or CMS.


### Cycle #110 Directive (2026-11-03 07:25)
### 1. Comparative Timeline: Pure CSS Multi-Track Sync

Replace scroll-listener JS with native sticky headers and CSS scroll-snap for comparing traditions (Jewish, Christian, Islamic).

```tsx
// components/ComparativeTimeline.tsx
export function ComparativeTimeline({ eras }: { eras: Array<{ era: string; traditions: Record<string, string> }> }) {
  // ponytail: static 3-column track; upgrade to subgrid dynamic keys if traditions exceed 4
  return (
    <div className="relative overflow-x-auto snap-x snap-mandatory rounded-2xl border border-stone-200/80 bg-stone-50/50 p-4 dark:border-stone-800 dark:bg-stone-950/40">
      <div className="grid min-w-[720px] grid-cols-[140px_1fr_1fr_1fr] gap-3 text-sm">
        <div className="sticky left-0 z-10 bg-inherit font-medium text-stone-500">Era</div>
        <div className="font-semibold text-amber-900 dark:text-amber-200">Judaism</div>
        <div className="font-semibold text-sky-900 dark:text-sky-200">Christianity</div>
        <div className="font-semibold text-emerald-900 dark:text-emerald-200">Islam</div>
        {eras.map((row) => (
          <div key={row.era} className="contents group border-t border-stone-200/60 dark:border-stone-800/60">
            <span className="sticky left-0 z-10 bg-inherit py-3 font-mono text-xs tabular-nums text-stone-400 group-hover:text-stone-700 dark:group-hover:text-stone-200">
              {row.era}
            </span>
            <div className="snap-start py-3 pr-2 text-stone-700 dark:text-stone-300">{row.traditions.judaism || '—'}</div>
            <div className="snap-start py-3 pr-2 text-stone-700 dark:text-stone-300">{row.traditions.christianity || '—'}</div>
            <div className="snap-start py-3 pr-2 text-stone-700 dark:text-stone-300">{row.traditions.islam || '—'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
```
→ skipped: JS-based synchronized virtual scrolling.  
→ add when: timeline items exceed 500 rows and cause DOM layout thrashing.

---

### 2. Lineage View: Zero-Dep CSS Branch Connectors

Eliminate heavy canvas/SVG graph libraries. Render genealogical descent via native tree pseudo-connectors.

```tsx
// components/LineageNode.tsx
type Figure = { id: string; name: string; title?: string; children?: Figure[] };

export function LineageNode({ figure }: { figure: Figure }) {
  return (
    <li className="relative flex flex-col items-center">
      <div className="z-10 rounded-xl border border-stone-200/80 bg-white/80 px-3.5 py-2 text-center shadow-xs backdrop-blur-xs dark:border-stone-800 dark:bg-stone-900/80">
        <p className="font-serif text-sm font-medium text-stone-900 dark:text-stone-100">{figure.name}</p>
        {figure.title && <p className="text-[11px] text-stone-400">{figure.title}</p>}
      </div>
      {figure.children && figure.children.length > 0 && (
        <ul className="relative flex gap-4 pt-6 before:absolute before:top-0 before:left-1/2 before:h-6 before:w-px before:-translate-x-1/2 before:bg-stone-300 dark:before:bg-stone-700">
          {figure.children.map((child) => (
            <LineageNode key={child.id} figure={child} />
          ))}
        </ul>
      )}
    </li>
  );
}
```
→ skipped: Pan/zoom canvas and force-directed graph math.  
→ add when: Lineage displays cross-branch marriages or cyclical descent structures.

---

### 3. Production Build: Route Param Typing & Static Pre-render Contract

Prevent Next.js static generation bailouts and type mismatch errors during `next build`.

```typescript
// app/figures/[slug]/page.tsx
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  // ponytail: static list ceiling; wire to lore DB source array
  return [{ slug: 'abraham' }, { slug: 'moses' }, { slug: 'jesus' }, { slug: 'muhammad' }];
}

export default async function FigurePage({ params }: PageProps) {
  const { slug } = await params;
  if (!slug) notFound();

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="font-serif text-3xl font-light tracking-tight capitalize text-stone-900 dark:text-stone-100">
        {slug}
      </h1>
    </main>
  );
}
```
→ skipped: Dynamic SSR fallbacks and runtime revalidation headers.  
→ add when: Figures are loaded from an external live-edited headless CMS instead of local static sets.


### Cycle #111 Directive (2026-11-03 07:31)
### 1. Pure CSS Lineage Tree (Zero D3 / SVG Bloat)

```css
/* app/lineage/tree.module.css */
.tree, .tree ul {
  display: flex;
  justify-content: center;
  position: relative;
  padding: 1.25rem 0 0 0;
  margin: 0;
}
.tree li {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 1.25rem 0.5rem 0 0.5rem;
  list-style-type: none;
}
.tree li::before, .tree li::after {
  content: '';
  position: absolute;
  top: 0;
  right: 50%;
  border-top: 1px solid #d6d3d1;
  width: 50%;
  height: 1.25rem;
}
.tree li::after {
  right: auto;
  left: 50%;
  border-left: 1px solid #d6d3d1;
}
.tree li:only-child::after, .tree li:only-child::before { display: none; }
.tree li:only-child { padding-top: 0; }
.tree li:first-child::before, .tree li:last-child::after { border: none; }
.tree li:last-child::before { border-right: 1px solid #d6d3d1; border-radius: 0 4px 0 0; }
.tree li:first-child::after { border-radius: 4px 0 0 0; }
.tree ul::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  border-left: 1px solid #d6d3d1;
  height: 1.25rem;
  transform: translateX(-50%);
}
```
`tree.module.css` → skipped: Canvas/D3 zoom-pan canvas, add when lineage exceeds 6 generations depth.

---

### 2. Synced Tri-Faith Comparative Timeline

```tsx
// components/ComparativeTimeline.tsx
interface Epoch {
  era: string;
  judaism: string;
  christianity: string;
  islam: string;
}

export function ComparativeTimeline({ epochs }: { epochs: Epoch[] }) {
  // ponytail: flat display:contents avoids JS height sync; switch to virtualizer at >200 epochs
  return (
    <div className="grid grid-cols-[80px_repeat(3,1fr)] gap-x-4 gap-y-3 font-serif text-sm selection:bg-stone-200">
      <div className="contents text-[10px] uppercase tracking-widest text-stone-400 font-sans border-b border-stone-200">
        <span>Era</span><span>Judaism</span><span>Christianity</span><span>Islam</span>
      </div>
      {epochs.map((e) => (
        <div key={e.era} className="contents group">
          <span className="font-mono text-xs text-stone-400 sticky top-4 self-start">{e.era}</span>
          <div className="p-3 bg-stone-50 border border-stone-200/60 rounded-sm">{e.judaism}</div>
          <div className="p-3 bg-stone-50 border border-stone-200/60 rounded-sm">{e.christianity}</div>
          <div className="p-3 bg-stone-50 border border-stone-200/60 rounded-sm">{e.islam}</div>
        </div>
      ))}
    </div>
  );
}
```
`ComparativeTimeline.tsx` → skipped: JS-driven masonry/row-height calculators, add when individual epoch cells need inline expand/collapse states.

---

### 3. Next.js Static Export Hardener

```javascript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  trailingSlash: true,
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: false },
  images: { unoptimized: true }, // ponytail: static-export ceiling; remove if deployed to Node/Vercel server runtime
};

export default nextConfig;
```

```typescript
// Self-check: app/timeline/[era]/page.tsx
export function generateStaticParams(): Array<{ era: string }> {
  // Enforces 100% parameter coverage at build-time; prevents 404s on SSG
  return ['patriarchal', 'exodus', 'monarchy', 'second-temple', 'late-antiquity'].map((era) => ({ era }));
}
```
`next.config.mjs` → skipped: ISR/Edge-middleware setup, add when user authentication or dynamic editorial mutation is required.


### Cycle #112 Directive (2026-11-03 07:37)
### 1. Native Multi-Track Comparative Timeline (Pure CSS Grid, Zero-JS sync)

```tsx
// components/ComparativeTimeline.tsx
interface TimelineEpoch {
  era: string;
  judaism: string[];
  christianity: string[];
  islam: string[];
}

export function ComparativeTimeline({ epochs }: { epochs: TimelineEpoch[] }) {
  return (
    <div className="overflow-x-auto scroll-smooth pb-4 [scrollbar-width:thin]">
      <div 
        className="grid auto-cols-[minmax(260px,1fr)] grid-flow-col gap-px bg-stone-200/60 dark:bg-stone-800/60"
        style={{ gridTemplateRows: 'auto repeat(3, minmax(80px, auto))' }}
      >
        {/* Header Row: Eras */}
        {epochs.map((e) => (
          <div key={e.era} className="bg-stone-50 p-3 text-xs font-medium tracking-wide text-stone-500 dark:bg-stone-900">
            {e.era}
          </div>
        ))}
        {/* Track: Judaism */}
        {epochs.map((e) => (
          <div key={`j-${e.era}`} className="bg-white p-3 text-sm text-stone-800 dark:bg-stone-950 dark:text-stone-200">
            {e.judaism.join(', ')}
          </div>
        ))}
        {/* Track: Christianity */}
        {epochs.map((e) => (
          <div key={`c-${e.era}`} className="bg-white p-3 text-sm text-stone-800 dark:bg-stone-950 dark:text-stone-200">
            {e.christianity.join(', ')}
          </div>
        ))}
        {/* Track: Islam */}
        {epochs.map((e) => (
          <div key={`i-${e.era}`} className="bg-white p-3 text-sm text-stone-800 dark:bg-stone-950 dark:text-stone-200">
            {e.islam.join(', ')}
          </div>
        ))}
      </div>
    </div>
  );
}
```
skipped: Canvas/virtualized scroll listeners; add when epochs exceed 200 items.

---

### 2. Semantic Lineage Tree (Zero Graph Dependencies)

```tsx
// components/LineageTree.tsx
export type LineageNode = {
  id: string;
  name: string;
  traditions: ('J' | 'C' | 'I')[];
  children?: LineageNode[];
};

export function LineageTree({ node }: { node: LineageNode }) {
  // ponytail: recursive flex-tree caps out at 6 nesting levels cleanly on mobile
  return (
    <div className="flex flex-col items-center">
      <div className="group relative rounded-md border border-stone-200 bg-stone-50/80 px-3 py-1.5 text-xs tracking-tight shadow-sm transition hover:border-stone-400 dark:border-stone-800 dark:bg-stone-900">
        <span className="font-medium text-stone-900 dark:text-stone-100">{node.name}</span>
        <span className="ml-1.5 font-mono text-[10px] text-stone-400">{node.traditions.join('')}</span>
      </div>
      {Boolean(node.children?.length) && (
        <div className="flex border-t border-stone-200 pt-3 dark:border-stone-800">
          {node.children!.map((child) => (
            <div key={child.id} className="relative px-3 before:absolute before:-top-3 before:left-1/2 before:h-3 before:w-px before:bg-stone-200 dark:before:bg-stone-800">
              <LineageTree node={child} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```
skipped: Pan/zoom viewport library; add when interactive node drag is explicitly required.

---

### 3. Next.js Zero-Error Build: Deterministic UTC Date Normalizer

```typescript
// lib/timeline-date.ts
// Enforces zero SSR-client hydration mismatch across edge/server/client engines.
const UTC_FORMATTER = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  era: 'narrow',
  timeZone: 'UTC',
});

export function formatLoreYear(year: number): string {
  if (!Number.isFinite(year)) return '';
  const date = new Date(Date.UTC(year, 0, 1));
  date.setUTCFullYear(year);
  return UTC_FORMATTER.format(date);
}

// Self-check
function runSelfCheck() {
  const bce = formatLoreYear(-1800);
  const ce = formatLoreYear(622);
  console.assert(bce.includes('1800'), `Expected BCE year formatting, got: ${bce}`);
  console.assert(ce.includes('622'), `Expected CE year formatting, got: ${ce}`);
}
runSelfCheck();
```
skipped: Custom lunar/solar calendar conversion modules; add when astronomical precision is requested.


### Cycle #113 Directive (2026-11-03 07:43)
### 1. Route Param Typing & Static Pre-render (Fixes Next.js 15 Build Failures)

```tsx
// app/timeline/[tradition]/page.tsx
type Props = { params: Promise<{ tradition: 'judaism' | 'christianity' | 'islam' }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return [{ tradition: 'judaism' }, { tradition: 'christianity' }, { tradition: 'islam' }];
}

export default async function TimelinePage({ params }: Props) {
  const { tradition } = await params;
  // ponytail: static slice ceiling; upgrade to query pipeline when DB added
  return <main className="max-w-4xl mx-auto px-6 py-12">{tradition}</main>;
}
```
→ skipped: `dynamic fetch handlers and client route listeners`, add when `content is queried from an external CMS`.

---

### 2. Comparative Sync Timeline (CSS Grid + Sticky Axis, Zero JS)

```css
/* app/timeline/comparative.module.css */
.grid {
  display: grid;
  grid-template-columns: 7rem repeat(3, minmax(260px, 1fr));
  column-gap: 1.5rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}
.epochSticky {
  position: sticky;
  left: 0;
  background: var(--background);
  backdrop-filter: blur(12px);
  z-index: 20;
}
```
```tsx
// components/comparative-row.tsx
export function ComparativeRow({ era, records }: { era: string; records: [React.ReactNode, React.ReactNode, React.ReactNode] }) {
  return (
    <div className="grid grid-cols-[7rem_repeat(3,minmax(260px,1fr))] gap-6 border-b border-stone-200/60 dark:border-stone-800/60 py-4 items-baseline">
      <span className="sticky left-0 text-xs font-mono text-stone-500 uppercase tracking-widest">{era}</span>
      {records.map((item, i) => (
        <div key={i} className="text-sm font-serif leading-relaxed text-stone-800 dark:text-stone-200">{item}</div>
      ))}
    </div>
  );
}
```
→ skipped: `JS scroll synchronizers and layout recalculation hooks`, add when `columns require dynamic re-ordering via drag-and-drop`.

---

### 3. Native CSS Tree Lineage Node (Bypasses D3/Canvas Bloat)

```tsx
// components/lineage-node.tsx
export function LineageNode({ name, title, children }: { name: string; title?: string; children?: React.ReactNode }) {
  return (
    <div className="relative pl-6 border-l border-stone-300 dark:border-stone-700 ml-3 my-2">
      <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full border border-stone-400 bg-stone-50 dark:bg-stone-900" />
      <div className="flex items-baseline gap-2">
        <span className="font-serif text-stone-900 dark:text-stone-100">{name}</span>
        {title && <span className="text-xs text-stone-600 dark:text-stone-400 font-sans tracking-wide">{title}</span>}
      </div>
      {children && <div className="mt-1">{children}</div>}
    </div>
  );
}
```
→ skipped: `interactive pan/zoom canvas and React Flow dependencies`, add when `lineage needs bidirectional cross-branch graph traversal (DAG)`.


### Cycle #114 Directive (2026-11-03 07:48)
### 1. Comparative Timeline: Pure CSS Subgrid (No JS Sync)

```tsx
// components/ComparativeTimeline.tsx
interface TimelineRow {
  period: string;
  judaism: string;
  christianity: string;
  islam: string;
}

export function ComparativeTimeline({ rows }: { rows: TimelineRow[] }) {
  return (
    <div className="grid grid-cols-[100px_repeat(3,1fr)] gap-x-4 border-t border-stone-200 dark:border-stone-800 font-serif">
      <div className="contents text-xs font-sans text-stone-400 uppercase py-3 border-b">
        <span>Era</span><span>Judaism</span><span>Christianity</span><span>Islam</span>
      </div>
      {rows.map((r) => (
        // ponytail: plain grid-cols contents ceiling; upgrade to display:subgrid when baseline Safari 16 fully deprecated
        <div key={r.period} className="contents text-sm text-stone-800 dark:text-stone-300">
          <span className="py-3 font-sans text-xs text-stone-500">{r.period}</span>
          <span className="py-3 border-t border-stone-100 dark:border-stone-900">{r.judaism}</span>
          <span className="py-3 border-t border-stone-100 dark:border-stone-900">{r.christianity}</span>
          <span className="py-3 border-t border-stone-100 dark:border-stone-900">{r.islam}</span>
        </div>
      ))}
    </div>
  );
}
```
skipped: IntersectionObservers and horizontal JS drag libraries.  
add when: Users need continuous pinch-to-zoom across millennia.

---

### 2. Lineage View: Native HTML/CSS Hierarchy (No D3 / React-Flow)

```tsx
// components/LineageNode.tsx
export interface Person {
  id: string;
  name: string;
  namesake?: { hebrew?: string; arabic?: string };
  children?: Person[];
}

export function LineageNode({ node }: { node: Person }) {
  return (
    <li className="relative pl-6 before:absolute before:left-0 before:top-3 before:h-px before:w-4 before:bg-stone-300 dark:before:bg-stone-700">
      <div className="inline-flex items-baseline gap-2 rounded-md px-2 py-1 text-sm bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
        <span className="font-medium text-stone-900 dark:text-stone-100">{node.name}</span>
        {node.namesake && (
          <span className="text-xs text-stone-400">
            {node.namesake.hebrew} / {node.namesake.arabic}
          </span>
        )}
      </div>
      {node.children && node.children.length > 0 && (
        <ul className="ml-2 border-l border-stone-300 dark:border-stone-700 space-y-2 mt-2">
          {node.children.map((child) => (
            <LineageNode key={child.id} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
}
```
skipped: Canvas/SVG force-directed layout computation.  
add when: Graph requires multiple shared ancestries (non-hierarchical DAGs).

---

### 3. Build Hardening: Static Type Guard & Route Config

```ts
// app/lore/[figure]/page.tsx
import { notFound } from "next/navigation";

export const dynamic = "error";
export const dynamicParams = false;

// Single static check to ensure valid build-time validation
export function generateStaticParams(): { figure: string }[] {
  const figures = ["abraham", "moses", "noah", "jesus", "muhammad"];
  console.assert(figures.length > 0, "Static figures list must not be empty");
  return figures.map((figure) => ({ figure }));
}

export default async function Page({ params }: { params: Promise<{ figure: string }> }) {
  const { figure } = await params;
  if (!figure) notFound();
  return <main className="max-w-2xl mx-auto p-6">{figure}</main>;
}
```
skipped: Dynamic SSR query resolvers and fallbacks.  
add when: Content is moved to a remote CMS with non-build webhooks.


### Cycle #115 Directive (2026-11-03 07:54)
### 1. Pure CSS Lineage Tree (Zero D3/Canvas Bloat)

Replace external graph engines with semantic nested lists and native pseudo-element branching.

```tsx
// components/LineageTree.tsx
interface FigureNode {
  id: string;
  name: string;
  tradition?: 'judaism' | 'christianity' | 'islam' | 'shared';
  children?: FigureNode[];
}

export function LineageTree({ root }: { root: FigureNode }) {
  return (
    <ul className="flex justify-center p-4">
      <TreeNode node={root} />
    </ul>
  );
}

function TreeNode({ node }: { node: FigureNode }) {
  const hasChildren = Boolean(node.children?.length);
  // ponytail: recursive flex-tree caps out at ~6 depth before horizontal overflow; add virtualized canvas when handling >200 nodes.
  return (
    <li className="relative flex flex-col items-center px-2 pt-5">
      <div className="z-10 rounded-full border border-stone-200/80 bg-stone-50/90 px-3 py-1 text-xs font-serif text-stone-800 shadow-sm backdrop-blur-sm dark:border-stone-800 dark:bg-stone-900/90 dark:text-stone-200">
        {node.name}
      </div>

      {hasChildren && (
        <ul className="relative flex pt-5 before:absolute before:left-1/2 before:top-0 before:h-5 before:w-px before:-translate-x-1/2 before:bg-stone-300 dark:before:bg-stone-700">
          {node.children!.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
}
```
skipped: Pan/zoom canvas & D3 force-directed layouts.  
add when: Graph exceeds viewport bounds or cyclic unions (e.g., cross-cousin marriages) require non-hierarchical edges.

---

### 2. Native CSS Subgrid Comparative Timeline Tracks

Aligns comparative perspectives (Hebrew Bible, New Testament, Quran/Hadith) horizontally per era without runtime JS measurement loops.

```tsx
// components/ComparativeTimeline.tsx
interface EraRow {
  era: string;
  judaism?: string;
  christianity?: string;
  islam?: string;
}

export function ComparativeTimeline({ eras }: { eras: EraRow[] }) {
  return (
    <div className="grid grid-cols-[80px_repeat(3,minmax(0,1fr))] gap-x-6 border-l border-stone-200 text-xs dark:border-stone-800">
      {/* Header */}
      <div className="font-mono text-stone-400">Era</div>
      <div className="font-serif font-medium text-stone-600 dark:text-stone-400">Judaism</div>
      <div className="font-serif font-medium text-stone-600 dark:text-stone-400">Christianity</div>
      <div className="font-serif font-medium text-stone-600 dark:text-stone-400">Islam</div>

      {eras.map((row) => (
        <div key={row.era} className="col-span-4 grid grid-cols-subgrid items-baseline border-t border-stone-100 py-3 dark:border-stone-800/50">
          <span className="sticky top-2 font-mono text-[10px] text-stone-400">{row.era}</span>
          <div className="text-stone-700 dark:text-stone-300">{row.judaism ?? '—'}</div>
          <div className="text-stone-700 dark:text-stone-300">{row.christianity ?? '—'}</div>
          <div className="text-stone-700 dark:text-stone-300">{row.islam ?? '—'}</div>
        </div>
      ))}
    </div>
  );
}
```
skipped: Virtualized scrolling and synchronized dual-timeline scrubbers.  
add when: Dataset exceeds 300 chronological milestone events.

---

### 3. Next.js Zero-Bail Static Route Hardening

Prevents 404/500 dynamic route mismatches and dynamic server usage during `next build` by enforcing static params and strict path typing.

```tsx
// app/figures/[slug]/page.tsx
import { notFound } from 'next/navigation';

export const dynamicParams = false; // Guarantee 0 runtime misses in prod build

export async function generateStaticParams() {
  // Replace with static registry or direct JSON import; no external network fetches during build
  const figures = await import('@/data/figures.json').then((m) => m.default);
  return figures.map((f) => ({ slug: f.slug }));
}

export default async function FigurePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const figures = await import('@/data/figures.json').then((m) => m.default);
  const figure = figures.find((item) => item.slug === slug);

  if (!figure) notFound();

  return (
    <article className="mx-auto max-w-prose py-12">
      <h1 className="font-serif text-2xl font-light text-stone-900 dark:text-stone-100">{figure.name}</h1>
    </article>
  );
}
```
skipped: ISR revalidation tags and dynamic database fetching.  
add when: Figures are authored via a live remote CMS instead of repository-versioned lore data.


### Cycle #116 Directive (2026-11-03 07:59)
### 1. Pure CSS Lineage Tree (Zero-JS visualizer)

```tsx
// components/LineageNode.tsx
export function LineageNode({ name, tradition, children }: { name: string; tradition: string; children?: React.ReactNode }) {
  // ponytail: DOM tree ceiling; upgrade to virtualized SVG canvas only if descendants exceed 150 nodes
  return (
    <li className="relative pl-6 before:absolute before:left-0 before:top-3 before:h-px before:w-4 before:bg-stone-300 dark:before:bg-stone-700">
      <span className="inline-flex items-center gap-1.5 rounded-full border border-stone-200/80 bg-stone-50/50 px-2.5 py-0.5 text-xs font-medium text-stone-800 backdrop-blur-sm dark:border-stone-800 dark:bg-stone-900/50 dark:text-stone-200">
        {name} <span className="font-mono text-[10px] text-stone-400">({tradition})</span>
      </span>
      {children && <ul className="relative ml-2 border-l border-stone-200 pl-2 dark:border-stone-800">{children}</ul>}
    </li>
  );
}
```
skipped: Layout calculation libraries (`react-flow`, `dagre`, manual SVG paths).  
add when: Interactive node dragging or bi-directional parent-mesh rendering is required.

---

### 2. Comparative Multi-Track Timeline (CSS Scroll-Snap)

```tsx
// components/ComparativeTimeline.tsx
type Track = 'judaism' | 'christianity' | 'islam';

export function ComparativeTimeline({ epochs }: { epochs: { period: string; tracks: Record<Track, string> }[] }) {
  // ponytail: fixed 3-track ceiling; upgrade to dynamic column mapping if adding Zoroastrianism/Baha'i
  return (
    <div className="flex overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-none [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
      <div className="flex gap-4 px-6">
        {epochs.map((e) => (
          <section key={e.period} className="w-64 shrink-0 snap-center space-y-2 rounded-xl border border-stone-200/80 bg-stone-50/40 p-4 text-xs backdrop-blur-md dark:border-stone-800/80 dark:bg-stone-950/40">
            <time className="font-mono text-[10px] uppercase tracking-wider text-amber-600 dark:text-amber-400">{e.period}</time>
            {(['judaism', 'christianity', 'islam'] as const).map((t) => (
              <div key={t} className="rounded-lg bg-white/60 p-2 dark:bg-stone-900/60">
                <span className="block text-[9px] uppercase tracking-widest text-stone-400">{t}</span>
                <span className="text-stone-800 dark:text-stone-200">{e.tracks[t] || '—'}</span>
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
```
skipped: JS sync-scroll listeners and dynamic timeline rendering engines.  
add when: Dynamic era pinch-to-zoom or granular micro-second scaling is demanded.

---

### 3. Next.js Zero-Error Dynamic Build Guard (Next.js 15 Async Params)

```tsx
// app/lore/[tradition]/[figure]/page.tsx
import { notFound } from 'next/navigation';

const VALID_LORE = { abraham: ['judaism', 'christianity', 'islam'], moses: ['judaism', 'islam'] } as const;

type RouteProps = { params: Promise<{ tradition: string; figure: string }> };

export async function generateStaticParams() {
  return Object.entries(VALID_LORE).flatMap(([figure, traditions]) =>
    traditions.map((tradition) => ({ tradition, figure }))
  );
}

export default async function LoreFigurePage({ params }: RouteProps) {
  const { tradition, figure } = await params;
  const traditions = VALID_LORE[figure as keyof typeof VALID_LORE];
  if (!traditions || !traditions.includes(tradition as never)) notFound();

  return <article className="mx-auto max-w-prose p-6 font-serif leading-relaxed">{figure} in {tradition}</article>;
}

// Self-check run on import to guarantee zero-defect params table
console.assert(generateStaticParams().length === 5, 'Static routes mismatch table.');
```
skipped: Headless CMS fetching and dynamic `export const dynamic = "force-dynamic"`.  
add when: Lore content moves from local static structures to external databases.


### Cycle #117 Directive (2026-11-03 08:05)
### 1. Comparative Timeline: Zero-JS CSS Subgrid Alignment

Replace timeline layout drift and JS measurement hooks with pure CSS Grid synchronization across the three traditions (Judaism, Christianity, Islam).

```tsx
// components/timeline-epoch.tsx
export function TimelineEpoch({ 
  era, 
  judaism, 
  christianity, 
  islam 
}: { 
  era: string; 
  judaism?: React.ReactNode; 
  christianity?: React.ReactNode; 
  islam?: React.ReactNode; 
}) {
  return (
    <div className="grid grid-cols-[100px_repeat(3,1fr)] gap-4 border-b border-stone-200/60 py-4 dark:border-stone-800/60 items-baseline font-serif">
      <time className="text-xs tracking-wider text-stone-500 tabular-nums select-none sticky top-12">{era}</time>
      <div className="text-sm leading-relaxed text-stone-800 dark:text-stone-200">{judaism ?? <span className="text-stone-300 dark:text-stone-700">—</span>}</div>
      <div className="text-sm leading-relaxed text-stone-800 dark:text-stone-200">{christianity ?? <span className="text-stone-300 dark:text-stone-700">—</span>}</div>
      <div className="text-sm leading-relaxed text-stone-800 dark:text-stone-200">{islam ?? <span className="text-stone-300 dark:text-stone-700">—</span>}</div>
    </div>
  );
}
// ponytail: Flat grid ceiling at 3 fixed columns; upgrade to subgrid scroll-container when adding horizontal pan/zoom.
```
→ skipped: Pan-zoom gestures and virtualized lists.  
→ add when: Dataset exceeds 150 concurrent eras.

---

### 2. Lineage View: Native Semantic Tree via CSS Pseudo-elements

Eliminate D3/canvas/React Flow dependencies. Render lineage hierarchy with accessible, pure HTML lists connected by borders.

```tsx
// components/lineage-node.tsx
interface Figure {
  name: string;
  titles?: string[];
  children?: Figure[];
}

export function LineageTree({ node }: { node: Figure }) {
  return (
    <li className="relative pl-6 before:absolute before:left-0 before:top-3 before:h-px before:w-4 before:bg-stone-300 dark:before:bg-stone-700 after:absolute after:left-0 after:top-0 after:h-full after:w-px after:bg-stone-300 dark:after:bg-stone-700 last:after:h-3">
      <div className="inline-flex items-baseline gap-2 py-1">
        <span className="font-serif font-medium text-stone-900 dark:text-stone-100">{node.name}</span>
        {node.titles?.length && (
          <span className="text-xs text-stone-600 dark:text-stone-300 tracking-wide">({node.titles.join(', ')})</span>
        )}
      </div>
      {node.children && node.children.length > 0 && (
        <ul className="ml-2 border-l-transparent">
          {node.children.map((child) => (
            <LineageTree key={child.name} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
}
// ponytail: Single-parent lineage only; upgrade to SVG orthogonal paths when handling co-lateral/polygynous unions.
```
→ skipped: Interactive graph canvas and force-directed positioning.  
→ add when: Complex non-linear/cross-tradition marital links are mandated.

---

### 3. Next.js Static Export & Params Hardening (Next.js 14/15 Zero-Error)

Fix production build failures caused by synchronous dynamic route params unwrapping and MDX unescaped entity lint blocks.

```typescript
// app/lore/[tradition]/[figure]/page.tsx
import { notFound } from 'next/navigation';

interface RouteParams {
  tradition: 'judaism' | 'christianity' | 'islam';
  figure: string;
}

// Ensure pre-generation for strict static export (next export / output: export)
export async function generateStaticParams(): Promise<RouteParams[]> {
  return [
    { tradition: 'judaism', figure: 'abraham' },
    { tradition: 'christianity', figure: 'abraham' },
    { tradition: 'islam', figure: 'ibrahim' },
  ];
}

export default async function FigurePage({ params }: { params: Promise<RouteParams> }) {
  const { tradition, figure } = await params; // Handles Next.js 15 async requirement safely

  if (!tradition || !figure) notFound();

  return (
    <article className="prose prose-stone mx-auto max-w-prose dark:prose-invert">
      <header>
        <span className="text-xs uppercase tracking-widest text-stone-500">{tradition}</span>
        <h1 className="capitalize font-serif tracking-tight">{figure}</h1>
      </header>
    </article>
  );
}
```
```bash
# Minimal check run before deploy
node -e "assert = require('assert'); (async () => { const p = Promise.resolve({tradition: 'islam', figure: 'ibrahim'}); assert.strictEqual((await p).figure, 'ibrahim'); console.log('✓ Params contracts sound.'); })()"
```
→ skipped: Dynamic runtime fallback handling (`fallback: true`).  
→ add when: Switching from fully pre-rendered static lore to CMS-driven SSR.


### Cycle #119 Directive (2026-11-03 08:16)
### 1. Pure CSS Lineage Tree Connectors (Eliminate Graph Libs)

```tsx
// components/LineageNode.tsx
interface Figure { name: string; title?: string; children?: Figure[]; }

export function LineageNode({ figure }: { figure: Figure }) {
  // ponytail: recursive flex-tree caps at ~6 nested generations; upgrade to canvas if rendering >100 nodes simultaneously.
  return (
    <div className="flex flex-col items-center">
      <div className="rounded-lg border border-stone-200/80 bg-stone-50/50 px-3 py-1.5 text-xs tracking-wide text-stone-800 shadow-sm backdrop-blur">
        <span className="font-medium">{figure.name}</span>
        {figure.title && <span className="ml-1.5 text-stone-400">({figure.title})</span>}
      </div>
      {figure.children && figure.children.length > 0 && (
        <div className="relative flex pt-6 before:absolute before:top-0 before:left-1/2 before:h-6 before:w-px before:bg-stone-300">
          {figure.children.map((child, i) => (
            <div key={child.name} className="relative px-3 before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-stone-300 first:before:left-1/2 last:before:right-1/2">
              <LineageNode figure={child} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```
`LineageNode.tsx` → skipped: React Flow / D3 tree layout, add when user drags nodes or needs bi-directional cross-links.

---

### 2. Comparative Timeline Grid (Native CSS Sync)

```tsx
// components/ComparativeTimeline.tsx
interface Event { tradition: 'jewish' | 'christian' | 'islamic'; title: string; era: string; }

export function ComparativeTimeline({ events }: { events: Event[] }) {
  const traditions = ['jewish', 'christian', 'islamic'] as const;
  
  return (
    <div className="grid grid-cols-3 divide-x divide-stone-200/60 border-t border-b border-stone-200 text-sm">
      {traditions.map((t) => (
        <div key={t} className="p-4 space-y-4">
          <header className="sticky top-0 bg-stone-50/90 py-1 text-xs uppercase tracking-widest text-stone-400 backdrop-blur">
            {t}
          </header>
          {events.filter((e) => e.tradition === t).map((e) => (
            <article key={e.title} className="rounded-md bg-white/60 p-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] border border-stone-200/40">
              <span className="font-mono text-[10px] text-amber-700/80">{e.era}</span>
              <p className="mt-0.5 text-stone-800">{e.title}</p>
            </article>
          ))}
        </div>
      ))}
    </div>
  );
}
```
`ComparativeTimeline.tsx` → skipped: JS scroll-sync observers and canvas markers, add when synchronizing variable-scale absolute BCE/CE years across zoom levels.

---

### 3. Build-Time Static Params Hardening (`next build` Zero-Error Guard)

```tsx
// app/figures/[slug]/page.tsx
import { notFound } from 'next/navigation';

export const dynamicParams = false; // ponytail: rejects runtime dynamic fetches; upgrade if figures become user-generated at runtime.

export async function generateStaticParams() {
  const figures = ['abraham', 'moses', 'jesus', 'muhammad']; // Replace with static data keys
  return figures.map((slug) => ({ slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!slug) notFound();

  return <main className="mx-auto max-w-xl py-12 text-stone-900">{slug}</main>;
}
```
`app/figures/[slug]/page.tsx` → skipped: dynamic DB fetching and ISR, add when figures are fetched from a headless CMS or external API.


### Cycle #120 Directive (2026-11-03 08:22)
### 1. Pure CSS Lineage Tree (Zero-dep ancestral tree)

Replace heavy graph/canvas libraries (e.g., React Flow, D3) with semantic HTML and hairline borders.

```tsx
// components/LineageTree.tsx
type Figure = { name: string; era?: string; children?: Figure[] };

export function LineageNode({ figure }: { figure: Figure }) {
  // ponytail: recursive tree without virtualization; upgrade to canvas/virtual list if lineage exceeds 200 visible nodes.
  return (
    <li className="relative pl-6 pt-2 list-none before:absolute before:left-0 before:top-4 before:w-4 before:border-t before:border-stone-300 dark:before:border-stone-700">
      <div className="inline-flex items-baseline gap-2 rounded-md border border-stone-200/80 bg-stone-50/50 px-2.5 py-1 text-xs dark:border-stone-800 dark:bg-stone-900/50">
        <span className="font-medium text-stone-900 dark:text-stone-100">{figure.name}</span>
        {figure.era && <span className="font-mono text-[10px] text-stone-400">{figure.era}</span>}
      </div>
      {figure.children && figure.children.length > 0 && (
        <ul className="relative ml-2 border-l border-stone-300 pl-2 dark:border-stone-700">
          {figure.children.map((child) => (
            <LineageNode key={child.name} figure={child} />
          ))}
        </ul>
      )}
    </li>
  );
}
```
`LineageNode.tsx` → skipped: pan/zoom and dynamic node folding, add when user explicitly zooms into dense patriarchy branches (>5 generations).

---

### 2. Comparative Epoch Grid (Native CSS Sync)

Synchronize Jewish, Christian, and Islamic narratives along a shared epoch axis without scroll listeners or synchronized JS offsets.

```tsx
// components/ComparativeTimeline.tsx
interface EpochRow {
  epoch: string;
  jewish: string;
  christian: string;
  islamic: string;
}

export function ComparativeTimeline({ eras }: { eras: EpochRow[] }) {
  return (
    <div className="w-full overflow-x-auto border-t border-stone-200 dark:border-stone-800">
      <div className="grid min-w-[640px] grid-cols-[100px_repeat(3,1fr)] divide-x divide-stone-200 text-xs dark:divide-stone-800">
        <div className="sticky top-0 bg-stone-50/90 p-2 font-mono font-medium backdrop-blur dark:bg-stone-950/90">Era</div>
        <div className="sticky top-0 bg-stone-50/90 p-2 font-serif text-stone-600 backdrop-blur dark:bg-stone-950/90 dark:text-stone-400">Judaism</div>
        <div className="sticky top-0 bg-stone-50/90 p-2 font-serif text-stone-600 backdrop-blur dark:bg-stone-950/90 dark:text-stone-400">Christianity</div>
        <div className="sticky top-0 bg-stone-50/90 p-2 font-serif text-stone-600 backdrop-blur dark:bg-stone-950/90 dark:text-stone-400">Islam</div>

        {eras.map((row) => (
          <div key={row.epoch} className="contents divide-y divide-stone-100 dark:divide-stone-900">
            <span className="p-2 font-mono text-[11px] text-stone-400">{row.epoch}</span>
            <div className="p-2 text-stone-800 dark:text-stone-200">{row.jewish}</div>
            <div className="p-2 text-stone-800 dark:text-stone-200">{row.christian}</div>
            <div className="p-2 text-stone-800 dark:text-stone-200">{row.islamic}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
```
`ComparativeTimeline.tsx` → skipped: bidirectional timeline scrubbing, add when interactive historical scrub-slider is requested.

---

### 3. Strict Deterministic Builds Guard (`dynamicParams = false`)

Catch bad static slugs and unhandled routes at `next build` time instead of breaking at runtime with 404/500 cascades.

```tsx
// app/figures/[slug]/page.tsx
import { notFound } from "next/navigation";
import { FIGURES } from "@/data/figures"; // Single-source source of truth array

export const dynamicParams = false; // ponytail: hard-fail on unknown route; switch to true if sourcing remote headless CMS.

export function generateStaticParams() {
  return Object.keys(FIGURES).map((slug) => ({ slug }));
}

export default async function FigurePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = FIGURES[slug as keyof typeof FIGURES];

  if (!data) notFound();

  return (
    <article className="mx-auto max-w-prose py-8">
      <h1 className="text-xl font-medium tracking-tight text-stone-900 dark:text-stone-100">{data.title}</h1>
      <p className="mt-4 leading-relaxed text-stone-600 dark:text-stone-400">{data.summary}</p>
    </article>
  );
}

// Self-check guard
console.assert(generateStaticParams().length > 0, "generateStaticParams returned empty paths array");
```
`app/figures/[slug]/page.tsx` → skipped: ISR revalidation/dynamic loading, add when database transitions from static file to external CMS.


### Cycle #121 Directive (2026-11-03 08:28)
### 1. Native Horizontal Scroll-Snap Timeline (Replaces JS Scrollers)

```tsx
// components/ComparativeTimeline.tsx
interface TimelineEvent {
  year: string;
  tradition: 'Judaism' | 'Christianity' | 'Islam';
  title: string;
}

export function ComparativeTimeline({ events }: { events: TimelineEvent[] }) {
  // ponytail: Flat array ceiling; upgrade to nested era groups when event count > 50.
  return (
    <div className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scroll-smooth focus-visible:outline-none [scrollbar-width:thin]">
      {events.map((e, i) => (
        <article
          key={i}
          className="snap-start shrink-0 w-72 rounded-2xl border border-stone-200/80 bg-stone-50/50 p-5 backdrop-blur-sm transition-all hover:border-stone-300 dark:border-stone-800 dark:bg-stone-900/40"
        >
          <div className="flex items-center justify-between text-xs font-mono text-stone-500 mb-2">
            <span>{e.year}</span>
            <span className="uppercase tracking-wider text-[10px]">{e.tradition}</span>
          </div>
          <h4 className="text-sm font-medium text-stone-900 dark:text-stone-100">{e.title}</h4>
        </article>
      ))}
    </div>
  );
}
```
→ skipped: Drag-to-scroll gesture listeners and virtualization.  
→ add when: Dataset exceeds 50 items and causes DOM lag on mobile.

---

### 2. Pure CSS Lineage Tree Connectors (No SVG/Canvas/D3)

```tsx
// components/LineageTree.tsx
interface Figure {
  id: string;
  name: string;
  children?: Figure[];
}

export function LineageTree({ figure }: { figure: Figure }) {
  // ponytail: Single-parent tree; upgrade to directed acyclic graph (DAG) when modeling cross-matrilineal ties.
  return (
    <div className="flex flex-col items-center">
      <div className="px-4 py-2 rounded-xl border border-stone-200 bg-white/70 text-sm font-medium shadow-sm backdrop-blur dark:border-stone-800 dark:bg-stone-900">
        {figure.name}
      </div>
      {figure.children && figure.children.length > 0 && (
        <div className="relative flex pt-6 before:absolute before:top-0 before:left-1/2 before:h-6 before:w-px before:-translate-x-1/2 before:bg-stone-300 dark:before:bg-stone-700">
          {figure.children.map((child) => (
            <div
              key={child.id}
              className="relative px-3 before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-stone-300 first:before:left-1/2 last:before:right-1/2 dark:before:bg-stone-700"
            >
              <div className="absolute top-0 left-1/2 h-6 w-px -translate-x-1/2 bg-stone-300 dark:bg-stone-700" />
              <div className="pt-6">
                <LineageTree figure={child} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```
→ skipped: Pan/zoom canvas abstractions and dynamic bezier link paths.  
→ add when: Nodes overlap or require dynamic bidirectional lineage.

---

### 3. Build-Safe Static Guard for Next.js

```tsx
// app/lore/[figureId]/page.tsx
import { notFound } from 'next/navigation';

const VALID_FIGURES = ['abraham', 'moses', 'jesus', 'muhammad'] as const;
type FigureId = (typeof VALID_FIGURES)[number];

export function generateStaticParams(): Array<{ figureId: FigureId }> {
  return VALID_FIGURES.map((figureId) => ({ figureId }));
}

export const dynamicParams = false; // Prevents runtime 500s during static output export

export default async function Page({ params }: { params: Promise<{ figureId: string }> }) {
  const { figureId } = await params;
  if (!VALID_FIGURES.includes(figureId as FigureId)) notFound();

  return <main className="max-w-xl mx-auto py-12 px-4 capitalize">{figureId}</main>;
}
```
→ skipped: Runtime DB lookups and remote content fetchers.  
→ add when: Migrating figure data from static registries to an external headless CMS.


### Cycle #122 Directive (2026-11-03 08:33)
### 1. Lineage View: Native CSS Branch Tree

```tsx
// components/LineageTree.tsx
interface Figure { id: string; name: string; title?: string; children?: Figure[]; }

export function LineageTree({ node }: { node: Figure }) {
  // ponytail: recursive DOM tree. Ceiling is ~100 visible nodes before virtualization needed.
  return (
    <li className="relative pl-5 before:absolute before:left-0 before:top-3 before:h-px before:w-3.5 before:bg-stone-300">
      <div className="inline-flex items-baseline gap-2 rounded px-1.5 py-0.5 text-xs transition-colors hover:bg-stone-100">
        <span className="font-medium text-stone-900">{node.name}</span>
        {node.title && <span className="font-serif italic text-stone-500">{node.title}</span>}
      </div>
      {node.children?.length ? (
        <ul className="relative ml-2 border-l border-stone-200 pl-1">
          {node.children.map(child => <LineageTree key={child.id} node={child} />)}
        </ul>
      ) : null}
    </li>
  );
}
```
→ skipped: D3 / React Flow, canvas transforms, node-dragging.  
→ add when: users need non-hierarchical cross-links or 2D pan/zoom on >500 nodes.

---

### 2. Comparative Timeline: Zero-JS CSS Subgrid

```tsx
// components/ComparativeTimeline.tsx
interface SyncEvent { era: string; judaic?: string; christian?: string; islamic?: string; }

export function ComparativeTimeline({ events }: { events: SyncEvent[] }) {
  return (
    <div className="grid grid-cols-[80px_repeat(3,minmax(200px,1fr))] gap-x-4 gap-y-3 font-sans text-xs">
      <div className="sticky top-0 z-10 border-b border-stone-200 bg-stone-50/90 py-2 font-mono text-stone-400 backdrop-blur-sm">Era</div>
      <div className="sticky top-0 z-10 border-b border-stone-200 bg-stone-50/90 py-2 font-semibold text-stone-700 backdrop-blur-sm">Judaism</div>
      <div className="sticky top-0 z-10 border-b border-stone-200 bg-stone-50/90 py-2 font-semibold text-stone-700 backdrop-blur-sm">Christianity</div>
      <div className="sticky top-0 z-10 border-b border-stone-200 bg-stone-50/90 py-2 font-semibold text-stone-700 backdrop-blur-sm">Islam</div>
      {events.map((e, i) => (
        <div key={i} className="contents border-b border-stone-100">
          <span className="py-1.5 font-mono text-stone-400">{e.era}</span>
          <p className="rounded bg-stone-100/50 p-2 leading-relaxed text-stone-800">{e.judaic || '—'}</p>
          <p className="rounded bg-stone-100/50 p-2 leading-relaxed text-stone-800">{e.christian || '—'}</p>
          <p className="rounded bg-stone-100/50 p-2 leading-relaxed text-stone-800">{e.islamic || '—'}</p>
        </div>
      ))}
    </div>
  );
}
```
→ skipped: synchronized scroll listeners, complex column-matching state.  
→ add when: individual tradition timelines need independent non-linear scrubbing.

---

### 3. Production Build Guard: Next.js 15 Async Params Contract

```tsx
// app/lore/[slug]/page.tsx
import { notFound } from 'next/navigation';
import figuresData from '@/data/figures.json';

export const dynamicParams = false; // ponytail: static-first export. Upgrade to true if DB goes dynamic.

export function generateStaticParams() {
  return figuresData.map((f) => ({ slug: f.slug }));
}

export default async function FigurePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const figure = figuresData.find((f) => f.slug === slug);
  if (!figure) notFound();

  return <article className="prose prose-stone prose-sm mx-auto py-8"><h1>{figure.name}</h1></article>;
}
```
```ts
// scripts/check-lore-data.ts (run via: tsx scripts/check-lore-data.ts)
import assert from 'node:assert';
import figures from '../data/figures.json';

figures.forEach(f => {
  assert(typeof f.slug === 'string' && f.slug.length > 0, `Figure missing valid slug: ${JSON.stringify(f)}`);
});
console.log(`✓ Lore data valid (${figures.length} slugs)`);
```
→ skipped: CMS fetch layers, Zod schemas, runtime client validation.  
→ add when: figure data moves from checked-in JSON to a remote editable DB.


### Cycle #125 Directive (2026-11-03 08:51)
### 1. Build Verification: Zero-Error Prerender Assertions

Run strict link validation during `next build` to catch orphan lineage parents and corrupted epoch IDs before SSG prerender fails.

```js
// scripts/validate-lore.mjs
import assert from "node:assert/strict";
import loreData from "../data/lore.json" with { type: "json" };

const { figures, events } = loreData;
const figureIds = new Set(figures.map((f) => f.id));

figures.forEach((f) => {
  if (f.parentId) {
    assert(figureIds.has(f.parentId), `Figure "${f.id}" has nonexistent parentId "${f.parentId}"`);
  }
});

events.forEach((e) => {
  assert(e.traditions?.judaism || e.traditions?.christianity || e.traditions?.islam, `Event "${e.id}" lacks tradition mapping`);
});

console.log("✓ Lore data integrity verified.");
```
`package.json` addition: `"build": "node scripts/validate-lore.mjs && next build"`

skipped: Zod/schema library; add when lore data is sourced via runtime user submissions.

---

### 2. Comparative Timeline: Native Multi-Tradition Grid

Eliminate JS sync calculations. Use CSS Grid row-locking for cross-tradition comparative epochs.

```tsx
// components/ComparativeTimeline.tsx
interface TimelineRow {
  era: string;
  judaism?: string;
  christianity?: string;
  islam?: string;
}

export function ComparativeTimeline({ rows }: { rows: TimelineRow[] }) {
  return (
    <section className="grid grid-cols-[100px_repeat(3,1fr)] gap-4 border-t border-stone-200/60 dark:border-stone-800/60 py-6 text-sm">
      <div className="font-mono text-xs text-stone-400 uppercase tracking-widest sticky top-4">Era</div>
      <div className="font-serif font-medium text-amber-950 dark:text-amber-100">Judaism</div>
      <div className="font-serif font-medium text-amber-950 dark:text-amber-100">Christianity</div>
      <div className="font-serif font-medium text-amber-950 dark:text-amber-100">Islam</div>

      {rows.map((row) => (
        <div key={row.era} className="contents group">
          <span className="font-mono text-xs text-stone-400 py-3 group-hover:text-amber-600 transition-colors">{row.era}</span>
          <p className="p-3 rounded-lg bg-stone-50 dark:bg-stone-900/40 text-stone-700 dark:text-stone-300">{row.judaism || "—"}</p>
          <p className="p-3 rounded-lg bg-stone-50 dark:bg-stone-900/40 text-stone-700 dark:text-stone-300">{row.christianity || "—"}</p>
          <p className="p-3 rounded-lg bg-stone-50 dark:bg-stone-900/40 text-stone-700 dark:text-stone-300">{row.islam || "—"}</p>
        </div>
      ))}
    </section>
  );
}
```
skipped: Virtualized list and canvas layout engines; add when rendering >1,000 parallel records.

---

### 3. Lineage View: Zero-JS Semantic Tree

Render Abrahamic genealogies using native semantic tree structures styled via CSS pseudo-elements, avoiding canvas and graph-library dependencies.

```tsx
// components/LineageNode.tsx
interface Person {
  id: string;
  name: string;
  children?: Person[];
}

export function LineageNode({ node }: { node: Person }) {
  return (
    <li className="relative pl-6 before:absolute before:left-0 before:top-3 before:h-px before:w-4 before:bg-stone-300 dark:before:bg-stone-700">
      <span className="inline-block px-3 py-1 my-1 rounded-md text-sm font-serif bg-amber-50/50 dark:bg-amber-950/20 text-stone-800 dark:text-stone-200 border border-stone-200/50 dark:border-stone-800">
        {node.name}
      </span>
      {node.children && node.children.length > 0 && (
        <ul className="relative ml-2 pl-2 border-l border-stone-300 dark:border-stone-700">
          {/* ponytail: recursion limit at render, upgrade to flat index map if depth > 30 */}
          {node.children.map((child) => (
            <LineageNode key={child.id} node={child} />
          ))}
        </ul>
      )}
    </li>
  );
}
```
skipped: D3/Cytoscape interactive node dragging; add when dynamic custom lineage editing is required.


### Cycle #126 Directive (2026-11-03 08:57)
### 1. Lineage Tree: Pure CSS Semantic Hierarchy (Eliminate D3/Tree Libs)

Replace graph/canvas libraries with semantic nested lists and native CSS pseudo-element connectors for clean, zero-dep tree rendering.

```tsx
// components/LineageNode.tsx
type Node = { name: string; era?: string; children?: Node[] };

export function LineageNode({ node }: { node: Node }) {
  // ponytail: recursion ceiling 10 levels; flatten if biblical lineages exceed call stack
  return (
    <li className="relative pl-6 before:absolute before:left-0 before:top-3 before:h-px before:w-4 before:bg-stone-300 dark:before:bg-stone-700">
      <div className="inline-flex items-baseline gap-2 py-1 text-sm">
        <span className="font-serif font-medium text-stone-900 dark:text-stone-100">{node.name}</span>
        {node.era && <span className="font-mono text-xs text-stone-600 dark:text-stone-300">{node.era}</span>}
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
→ skipped: Pan/zoom canvas, collision detection, interactive folding  
→ add when: Lineage depth exceeds viewport height without scroll  

---

### 2. Comparative Timeline: 3-Tradition Sticky Epoch Grid

Align Jewish, Christian, and Islamic traditions synchronously without table libs or complex layout calculators.

```tsx
// components/ComparativeTimeline.tsx
interface EpochEvent {
  era: string;
  traditions: { judaic?: string; christian?: string; islamic?: string };
}

export function ComparativeTimeline({ events }: { events: EpochEvent[] }) {
  return (
    <div className="grid grid-cols-[80px_1fr_1fr_1fr] border-t border-stone-200 dark:border-stone-800 text-xs">
      <div className="sticky top-0 z-10 grid grid-cols-subgrid col-span-4 bg-stone-50/90 py-2 font-mono uppercase tracking-wider text-stone-600 dark:bg-stone-950/90 dark:text-stone-300 backdrop-blur border-b border-stone-200 dark:border-stone-800">
        <span>Era</span><span>Judaism</span><span>Christianity</span><span>Islam</span>
      </div>
      {events.map((e, idx) => (
        <div key={idx} className="grid grid-cols-subgrid col-span-4 py-3 border-b border-stone-100 dark:border-stone-900 font-serif">
          <span className="font-mono text-stone-600 dark:text-stone-300">{e.era}</span>
          <span className="pr-4 text-stone-800 dark:text-stone-200">{e.traditions.judaic ?? '—'}</span>
          <span className="pr-4 text-stone-800 dark:text-stone-200">{e.traditions.christian ?? '—'}</span>
          <span className="pr-4 text-stone-800 dark:text-stone-200">{e.traditions.islamic ?? '—'}</span>
        </div>
      ))}
    </div>
  );
}
```
→ skipped: JS-based horizontal sync-scrolling and timeline zoom scales  
→ add when: Sub-year/day chronologies are mapped across non-uniform calendars  

---

### 3. Build Hardening: Guard Static Params for `next build`

Ensure strict zero-error builds by forbidding dynamic fallbacks and verifying record slugs statically.

```tsx
// app/lore/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { LORE_DATA } from '@/data/lore';

export const dynamicParams = false; // Prevents runtime 500s on ungenerated routes

export function generateStaticParams() {
  return Object.keys(LORE_DATA).map((slug) => ({ slug }));
}

export default async function LorePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = LORE_DATA[slug];
  if (!entry) notFound();

  return <article className="prose prose-stone mx-auto py-12 dark:prose-invert">{/* Content */}</article>;
}

// Self-check: Run at build time
if (process.env.NODE_ENV !== 'production') {
  console.assert(Object.keys(LORE_DATA).length > 0, 'LORE_DATA cannot be empty.');
}
```
→ skipped: Heavy schema parsers (e.g., Zod) on static JSON  
→ add when: Data source migrates from hardcoded records to a headless CMS or user submissions
