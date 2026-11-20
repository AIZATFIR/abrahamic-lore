<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AI Agent Onboarding & Architecture Guide: Abrahamic Lore

> [!IMPORTANT]
> **Read this before scanning or modifying the repository.**
> This file contains the complete system architecture, routing map, data models, environment quirks, and style rules so you do **not** need to scan every file in the codebase.

---

## 1. Project Mission & Tone

**Abrahamic Lore** is an interactive, comparative study and lineage visualizer exploring Judaism, Christianity, and Islam side-by-side.
- **Editorial Tone**: Respectful, scholarly, objective, and analytical. Focus on convergence (shared roots) and divergence (distinct theological frameworks) without bias or sectarian proselytizing.
- **No Emojis Policy**: **Zero emojis** in the UI or codebase text. All visual glyphs use custom SVG icons via `src/components/ui/Icon.tsx` (documented in `ICONS.md`).

---

## 2. Environment & CLI Setup (Windows Quirks)

- **Node.js Environment**:
  Node v22 is installed locally on Windows at:
  ```powershell
  $env:Path = "C:\Users\mimin\AppData\Local\node-v22.14.0-win-x64;$env:Path"
  ```
  Always ensure this path is active when running `npm` commands in shell sessions.
- **Build Verification**:
  ```powershell
  $env:Path = "C:\Users\mimin\AppData\Local\node-v22.14.0-win-x64;$env:Path"; npm run build
  ```
- **Git Push Rules**:
  The repository maintains dual tracking branches (`master` and `main`). When pushing to GitHub:
  ```powershell
  git push origin master; git push origin master:main
  ```

---

## 3. Tech Stack & Styling Architecture

| Layer | Technology | Key Details |
|---|---|---|
| **Framework** | Next.js 16.4 (Turbopack, App Router) | Uses async route parameters (`const { slug } = await params`) |
| **Styling** | Tailwind CSS v4 | Configured via `@tailwindcss/postcss` in `postcss.config.mjs` and `@import "tailwindcss";` in `src/app/globals.css`. Do NOT add legacy `tailwind.config.js`. |
| **Icons** | Custom CSS Mask SVGs | `public/assets/icons/*.svg` via `Icon.tsx`. Monochromatic, inherits `currentColor`. |
| **Database / Auth** | Supabase (Phase 2 ready) | Client & server auth helpers in `src/lib/supabase/`. Local fallback preferences stored in `localStorage`. |

### Tradition Accent Colors
- **Judaism**: Blue (`bg-blue-50 text-blue-700 border-blue-200`)
- **Christianity**: Rose / Burgundy (`bg-rose-50 text-rose-700 border-rose-200`)
- **Islam**: Emerald / Green (`bg-emerald-50 text-emerald-700 border-emerald-200`)
- **Neutral UI**: Warm Stone (`stone-900` text, `stone-50` backgrounds, `stone-200` borders)

---

## 4. Route Map & Pages

| Route | File Path | Description & Features |
|---|---|---|
| `/` | `src/app/page.tsx` | **Homepage**: Hero, Featured Topics, Recommended For You (personalized by active tradition), Continue Learning, and Onboarding modal. |
| `/explore` | `src/app/explore/page.tsx` | **Exploration Hub**: Quick launchpads to Timeline, Traditions, Lineage Tree, and Topic catalog. |
| `/traditions` | `src/app/traditions/page.tsx` | **Traditions Deep Dive**: Comprehensive comparative overview of Judaism, Christianity, and Islam (scripture, core pillars, historical origins). |
| `/topics` | `src/app/topics/page.tsx` | **Topic Catalog**: Category filters (`Theology`, `History`, `Figures`, `Narratives`, `Practices`, `Places`). |
| `/topics/[slug]` | `src/app/topics/[slug]/page.tsx` | **Topic Detail View**: Overview, historical context, canonical text references, comparative takeaways, and link to interactive compare view. |
| `/compare/[slug]` | `src/app/compare/[slug]/page.tsx` | **Interactive Matrix**: Side-by-side comparison with tradition filter toggles, live text search/keyword highlighting, Points of Convergence, and Points of Divergence. |
| `/timeline` | `src/app/timeline/page.tsx` | **Comparative Timeline & Lineage Tree**: Historical sequence from Abraham to modern era, plus tree visualization of Abrahamic prophetic lineage. |
| `/search` | `src/app/search/page.tsx` | **Global Search**: Client-side instant filter across all traditions, topics, figures, and comparative concepts. |
| `/login` | `src/app/login/page.tsx` | **Sign In**: Supabase auth sign-in with email/password. |
| `/register` | `src/app/register/page.tsx` | **Sign Up**: Account creation with guest preference transfer support. |

---

## 5. Directory & File Reference

```
Abrahamic-Lore/
├── public/
│   └── assets/icons/          # 16 custom SVG icons (viewBox 0 0 24 24, stroke 1.5, fill none)
├── src/
│   ├── app/                   # Next.js App Router pages (see Route Map above)
│   ├── components/
│   │   ├── compare/
│   │   │   └── CompareInteractiveView.tsx # Client-side comparison tool (toggles, live search, badges)
│   │   ├── home/
│   │   │   ├── Hero.tsx                   # Hero section with copy tailored by tradition
│   │   │   ├── FeaturedTopics.tsx         # Curated entry topics
│   │   │   ├── RecommendedForYou.tsx      # Filtered recommendations from localStorage preference
│   │   │   └── ContinueLearning.tsx       # Bite-sized study paths
│   │   ├── layout/
│   │   │   ├── Navbar.tsx                 # Sticky navigation, tradition switcher, auth status
│   │   │   └── Footer.tsx                 # Platform links, sources, copyright
│   │   ├── onboarding/
│   │   │   └── OnboardingModal.tsx        # Guest preference questionnaire (tradition, goal)
│   │   ├── timeline/
│   │   │   ├── ComparativeTimeline.tsx    # Chronological interactive timeline with era badges
│   │   │   └── LineageTree.tsx            # Recursive prophetic genealogical tree
│   │   ├── topics/
│   │   │   └── TopicDetailView.tsx        # Structured breakdown of single topic
│   │   └── ui/
│   │       └── Icon.tsx                   # Central SVG mask icon component
│   ├── data/
│   │   ├── abrahamic_entities.ts          # Core datasets: COMPARISON_ENTITIES, TOPIC_DETAILS, TRADITIONS
│   │   └── timeline_events.ts             # Datasets: TIMELINE_EVENTS, LINEAGE_DATA
│   ├── hooks/
│   │   ├── usePreferences.ts              # Reads/updates guest preference in localStorage
│   │   └── useUser.ts                     # Supabase client auth listener
│   ├── lib/
│   │   ├── actions.ts                     # Next.js Server Actions for Supabase login/register/logout
│   │   ├── content.ts                     # Static editorial content, hero texts, topic categories
│   │   ├── preferences.ts                 # LocalStorage persistence utilities
│   │   └── supabase/                      # SSR-ready Supabase client & server instances
│   └── types/
│       └── index.ts                       # Core TypeScript interfaces
├── AGENTS.md                              # This AI agent onboarding & guidelines file
├── ICONS.md                               # Complete icon catalog, style rules, and change log
└── README.md                              # User-facing project documentation
```

---

## 6. Data Models & Schemas

### Comparison Entity (`src/data/abrahamic_entities.ts`)
```typescript
interface ComparisonEntity {
  id: string
  slug: string
  title: string
  category: TopicCategory
  summary: string
  perspectives: Record<'judaism' | 'christianity' | 'islam', {
    coreBelief: string
    scriptureText: string
    keyDifferences: string
  }>
  convergence: string[]  // Shared common ground across traditions
  divergence: string[]   // Distinct theological nuances
}
```

### Topic Detail (`src/data/abrahamic_entities.ts`)
```typescript
interface TopicDetail {
  slug: string
  title: string
  category: TopicCategory
  icon: IconName
  summary: string
  historicalContext: string
  canonicalTexts: { tradition: string; reference: string; excerpt: string }[]
  comparativeTakeaway: string
}
```

### Timeline & Lineage (`src/data/timeline_events.ts`)
```typescript
interface TimelineEvent {
  id: string
  year: string
  title: string
  description: string
  traditions: ('judaism' | 'christianity' | 'islam')[]
  era: 'ancient' | 'classical' | 'medieval' | 'modern'
}

interface FigureNode {
  name: string
  desc?: string
  tradition?: 'shared' | 'judaism' | 'christianity' | 'islam'
  children?: FigureNode[]
}
```

---

## 7. Icons & Assets Rules (Mandatory)

1. **NO EMOJIS**: Under no circumstances should an emoji (e.g. 🕊️, 📖, ✝️, ☪️, ✡️) be placed into UI JSX or data text.
2. **Use `<Icon name="..." />`**:
   ```tsx
   import Icon from '@/components/ui/Icon'
   <Icon name="book" className="h-5 w-5 text-stone-600" />
   ```
3. **Adding a New Icon**:
   - Create SVG in `public/assets/icons/<name>.svg` (`viewBox="0 0 24 24"`, `fill="none"`, `stroke="#000"`, `stroke-width="1.5"`).
   - Register `<name>` in `ICON_NAMES` in `src/components/ui/Icon.tsx`.
   - Update `ICONS.md` with: icon preview, file name, visual description, emoji/symbol it replaces, and where it is used.
   - Add a change-log entry in `ICONS.md`.

---

## 8. Agent Pre-Submission Checklist

Before finalizing any task, ensure:
- [ ] `$env:Path = "C:\Users\mimin\AppData\Local\node-v22.14.0-win-x64;$env:Path"; npm run build` completes with **0 errors**.
- [ ] No emojis have been introduced (`regex /[\u{1F000}-\u{1FFFF}\u{2600}-\u{27EF}]/u` check passes).
- [ ] Any added/modified icons are documented in `ICONS.md`.
- [ ] Changes are committed and pushed to both branches:
  ```powershell
  git push origin master; git push origin master:main
  ```
