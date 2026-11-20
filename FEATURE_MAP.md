# Autonomous Agent Feature Map: abrahamic-lore

## Overview
Sacred comparative timeline, interactive multi-tradition matrix, and lineage visualizer across Abrahamic history (Judaism, Christianity, Islam).

## Feature Architecture & Status

| Module | Route / Component | Status | Key Capabilities |
|---|---|---|---|
| **Styling & Theme** | `postcss.config.mjs`, `globals.css` | Done | Tailwind CSS v4 via `@tailwindcss/postcss`, custom Stone design system with tradition color accents. |
| **Icon System** | `public/assets/icons/`, `Icon.tsx`, `ICONS.md` | Done | 16 custom SVG icons rendered via CSS masks (`currentColor`). 100% emoji-free UI. |
| **Homepage** | `/` (`src/app/page.tsx`) | Done | Dynamic hero copy, featured topics, preference-based recommendations, study cards, and onboarding modal. |
| **Traditions** | `/traditions` (`src/app/traditions/page.tsx`) | Done | In-depth comparative overview of Judaism, Christianity, and Islam core tenets, scripture, and shared heritage. |
| **Topics Catalog** | `/topics` (`src/app/topics/page.tsx`) | Done | Category-filtered catalog (Theology, History, Figures, Narratives, Practices, Places). |
| **Topic Deep Dive** | `/topics/[slug]` (`src/app/topics/[slug]/page.tsx`) | Done | Historical context, canonical scripture passages, and comparative takeaways. |
| **Interactive Compare** | `/compare/[slug]` (`src/app/compare/[slug]/page.tsx`) | Done | Three-way comparative matrix with tradition toggles, real-time keyword highlight, Points of Convergence, and Points of Divergence. |
| **Timeline & Lineage** | `/timeline` (`src/app/timeline/page.tsx`) | Done | Interactive chronological timeline (Ancient to Modern) and recursive Abrahamic prophetic genealogical tree. |
| **Instant Search** | `/search` (`src/app/search/page.tsx`) | Done | Client-side search across all topics, traditions, and comparative entities. |
| **Auth & Preferences**| `/login`, `/register`, `usePreferences.ts` | Done | Supabase auth integration ready with local guest preference migration. |

## Verification Checklist (Self-Checking)
1. **Next.js Production Build**:
   ```powershell
   $env:Path = "C:\Users\mimin\AppData\Local\node-v22.14.0-win-x64;$env:Path"; npm run build
   ```
   Must exit with code 0.
2. **Zero Emojis Validation**:
   All UI glyphs must be custom SVGs rendered through `src/components/ui/Icon.tsx` and documented in `ICONS.md`.
3. **Dual Branch Sync**:
   All changes must be pushed to both `origin/master` and `origin/main`.
