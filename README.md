# Abrahamic Lore

One environment to explore Judaism, Christianity, Islam, and the traditions they carry.

## Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 16 + TypeScript |
| Styling | Tailwind CSS v4 |
| Auth (Phase 2) | Supabase Auth |
| Database (Phase 2) | PostgreSQL via Supabase + Drizzle ORM |
| Search (Phase 2) | Meilisearch |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
src/
  app/                  # Next.js App Router pages
    page.tsx            # Homepage
    search/             # Search page
    login/              # Auth placeholder
    topics/[slug]/      # Topic detail placeholder
    compare/[slug]/     # Compare view placeholder
  components/
    home/               # Hero, FeaturedTopics, RecommendedForYou, etc.
    layout/             # Navbar, Footer
    onboarding/         # OnboardingModal
  hooks/
    usePreferences.ts   # localStorage preference state
  lib/
    content.ts          # Editorial content + hero copy
    preferences.ts      # localStorage read/write
  types/
    index.ts            # Shared types
```

## Phase plan

| Phase | Scope |
|---|---|
| 1 ✅ | Homepage, onboarding, personalization, guest preferences |
| 2 | Supabase Auth, user profiles, preference persistence |
| 3 | Entity pages, compare, timeline, full reader |
| 4 | Meilisearch integration, knowledge graph, learning journeys |
