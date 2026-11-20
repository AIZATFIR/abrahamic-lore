# Icon Assets — Agent & Contributor Guide

This project does **not use emojis** anywhere in the UI. Every pictogram is a
custom SVG icon stored as a file and rendered through one shared component.

> [!IMPORTANT]
> **Rule for every agent / contributor who touches the icons:**
> If you add, remove, rename, or redraw an icon, you **must** update this file in
> the same change. For each icon, document: file name, what it looks like, the
> emoji it replaces (or, if it is not based on an emoji, what it represents), and
> where it is used. Add a line to the [Change log](#change-log) with the date,
> your agent/author name, and what you changed. Do not reintroduce emojis.

---

## Where things live

| What | Path |
|---|---|
| SVG files | [`public/assets/icons/`](public/assets/icons) — served at `/assets/icons/<name>.svg` |
| React component | [`src/components/ui/Icon.tsx`](src/components/ui/Icon.tsx) |
| List of valid names (`IconName` type) | `ICON_NAMES` in `Icon.tsx` |

## How to use

```tsx
import Icon from '@/components/ui/Icon'

<Icon name="book" className="h-6 w-6 text-stone-700" />
<Icon name="scales" label="Comparison" />   // label = accessible name; omit for decorative icons
```

- The SVG is applied as a CSS **mask** with `background-color: currentColor`,
  so the icon always takes the **text colour** of its context (`text-*` classes).
- Size with Tailwind `h-* w-*` classes (default `h-6 w-6`).
- Data objects store the icon **name** (e.g. `icon: 'dove'`), typed as `IconName`
  so a typo fails the TypeScript build.

## Style rules (keep the set consistent)

- **Simple line icons**, single colour, no fills (except tiny dots such as an eye).
- `viewBox="0 0 24 24"`, `fill="none"`, `stroke="#000"`, `stroke-width="1.5"`,
  `stroke-linecap="round"`, `stroke-linejoin="round"`.
- Keep ~1.5–2 px of padding inside the 24×24 box.
- Stroke colour in the file does not matter visually (the mask only uses shape),
  but keep it `#000` for consistency.

## Adding a new icon

1. Draw the SVG following the style rules and save it as `public/assets/icons/<kebab-name>.svg`.
2. Add `<kebab-name>` to `ICON_NAMES` in `src/components/ui/Icon.tsx`.
3. Use it via `<Icon name="<kebab-name>" />`.
4. **Document it in the catalogue below and add a change-log entry.**

---

## Icon catalogue

| Icon | File | What it looks like | Based on emoji | Used for / where |
|---|---|---|---|---|
| <img src="public/assets/icons/book.svg" width="24"> | `book.svg` | An open book seen from the front: two page outlines that dip to a centre spine line. | 📖 Open Book | Sacred Texts topic card, "Three Sacred Books", sacred-texts topic data, "Topic Not Found" page. |
| <img src="public/assets/icons/dove.svg" width="24"> | `dove.svg` | A side-view bird in flight facing right: teardrop body with pointed beak, a single wing raised upward, a small fanned tail, and a dot eye. | 🕊️ Dove | "Prophets & Figures" topic card/data, "Who Is Abraham?" intro card. |
| <img src="public/assets/icons/sunrise.svg" width="24"> | `sunrise.svg` | A half sun sitting on a horizon line, with five short rays (one up, two diagonal, two horizontal) and a shorter line beneath the horizon. | 🌅 Sunrise | Creation & Origins card and topic data. |
| <img src="public/assets/icons/columns.svg" width="24"> | `columns.svg` | A classical temple front: triangular pediment roof, a beam, four vertical columns, and a two-step base. | 🏛️ Classical Building | "Religious History" topic card/data, "An Abrahamic Timeline" intro card. |
| <img src="public/assets/icons/star-of-david.svg" width="24"> | `star-of-david.svg` | Two overlapping outlined equilateral triangles (one pointing up, one down) forming a six-pointed star. | ✡️ Star of David | Judaism: tradition cards, perspective headers, filter pills, compare view toggles. Also the "Theology & Beliefs" topic card/data. |
| <img src="public/assets/icons/cross.svg" width="24"> | `cross.svg` | An outlined Latin cross — a tall vertical bar with a shorter crossbar placed above the middle. | ✝️ Latin Cross | Christianity: tradition cards, perspective headers, filter pills, compare view toggles. |
| <img src="public/assets/icons/crescent.svg" width="24"> | `crescent.svg` | An outlined crescent moon opening to the right with a small outlined five-pointed star inside the opening. | ☪️ Star and Crescent | Islam: tradition cards, perspective headers, filter pills, compare view toggles. |
| <img src="public/assets/icons/mosque.svg" width="24"> | `mosque.svg` | A central onion dome with a short finial on a rectangular hall with an arched door, flanked by two thin minarets with pointed caps, on a ground line. | 🕌 Mosque | "Traditions & Practices" topic card and topic data. |
| <img src="public/assets/icons/synagogue.svg" width="24"> | `synagogue.svg` | A gabled central building with an arched door and a round window, flanked by two towers with rounded tops, on a ground line. | 🕍 Synagogue | "Sacred Places" topic card and topic data. |
| <img src="public/assets/icons/scroll.svg" width="24"> | `scroll.svg` | A vertical parchment scroll with a rolled curl at the top-left and bottom, and two short text lines on the sheet. | 📜 Scroll | Stories & Narratives card, "Stories Told in All Three", list bullet for canonical texts on topic pages. |
| <img src="public/assets/icons/link.svg" width="24"> | `link.svg` | Two rounded chain links joined diagonally (bottom-left to top-right). | 🔗 Link | "Differences & Shared Themes" topic card/data, comparison results in Search. |
| <img src="public/assets/icons/scales.svg" width="24"> | `scales.svg` | A balance scale: central upright post on a base, horizontal beam, and two triangular hangers each ending in a shallow pan. | ⚖️ Balance Scale | "Comparative Takeaway" box on topic pages, "Comparison Not Found" page. |
| <img src="public/assets/icons/handshake.svg" width="24"> | `handshake.svg` | Two hands meeting from the left and right sleeves and clasping in the middle, fingers drawn as short rounded loops. | 🤝 Handshake | "Points of Convergence (Shared Ground)" heading on compare pages. |
| <img src="public/assets/icons/lightning.svg" width="24"> | `lightning.svg` | An outlined zig-zag lightning bolt pointing down-left. | ⚡ High Voltage | "Points of Divergence (Distinct Emphases)" heading on compare pages. |
| <img src="public/assets/icons/check.svg" width="24"> | `check.svg` | A single tick mark: a short down-stroke into a long up-stroke. | Not an emoji — replaces the text check-mark glyph `✓` (U+2713) | Bullet badges in the convergence list on compare pages. |

---

## Change log

| Date | Agent / author | Change |
|---|---|---|
| 2026-11-20 | Antigravity (Claude Opus 5.5) | Created the icon system: 15 SVGs in `public/assets/icons/`, `Icon` component, replaced every emoji in `src/` (and the `✓` glyph) with icons, typed icon fields as `IconName`. |
