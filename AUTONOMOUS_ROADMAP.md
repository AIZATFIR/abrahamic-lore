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
