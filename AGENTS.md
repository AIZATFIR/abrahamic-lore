<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Icons / no emojis

Do not use emojis in the UI. Use the custom icons in `public/assets/icons/` via `src/components/ui/Icon.tsx`. If you add, change, or remove an icon you MUST document it in `ICONS.md` (appearance, the emoji it is based on or what it represents, where it is used) and add a change-log entry there.
