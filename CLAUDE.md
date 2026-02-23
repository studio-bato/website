# Studio Bato Website

Independent music label website — "We ship songs."

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **pnpm** always use pnpm for package management and scripts
- **Tailwind CSS 3** with HSL CSS variables for theming, dark mode via class strategy
- **Radix UI / shadcn-style** components in `components/ui/`
- **Fonts:** DM Sans (body), Playfair Display (display)
- **Border radius:** 0rem (sharp corners throughout)

## Project Structure

```
app/                → Pages (App Router). Dynamic routes use [id] folders
components/         → App components + ui/ (shadcn primitives)
components/player/  → Audio player context & controls
data/               → Static data layer (TS files as database)
  schemas.ts          → Data schemas: Artist, Release, Track, etc.
lib/                → Utilities (cn(), icons, OG helpers)
public/             → Static assets
```

## Key Conventions

- **IDs:** kebab-case slugs (e.g. `"walass"`, `"la-fete-est-finie"`)
- **Imports:** Use `@/` path alias (maps to project root)
- **Class merging:** Use `cn()` from `lib/utils.ts` for conditional Tailwind classes
- **Server-first:** Components are server components by default; add `"use client"` only when needed (interactivity, hooks, browser APIs)
- **Static generation:** Dynamic routes use `generateStaticParams()` + `generateMetadata()`
- **External links:** Decorated with `ArrowUpRight` icon from Lucide
- **Images:** `next/image` with `unoptimized: true`

## Translation (i18n)

The site supports 3 languages: **French** (default), **English**, and **German**.

### How it works

- **Library**: `next-intl` with the Next.js plugin configured in `next.config.mjs`
- **Locale detection**: Cookie-based (`NEXT_LOCALE`), defaults to `fr`. Configured in `i18n/request.ts`.
- **Translation files**: `messages/fr.json`, `messages/en.json`, `messages/de.json` — all must have identical keys.
- **Provider**: `NextIntlClientProvider` wraps the app in `app/layout.tsx`.
- **Language switcher**: `components/language-switcher.tsx` sets the cookie via the `setLocale` server action in `app/actions.ts`.

### Using translations in components

- **Server components** (default): `import { getTranslations } from "next-intl/server"` then `const t = await getTranslations("namespace")`.
- **Client components** (`"use client"`): `import { useTranslations } from "next-intl"` then `const t = useTranslations("namespace")`.

### Rules for writing content

- **Only React components are translated.** Never hardcode user-facing text in components — all visible strings must go through translation keys.
- **Data files are NOT translated.** Content in `data/` (artist names, bios, release titles, track names, descriptions, genres) stays in its original language and is not part of the i18n system.
- When adding or editing text in components, add the key to all 3 files (`messages/fr.json`, `messages/en.json`, `messages/de.json`).
- Keep the same key structure across all language files.
- Page-specific metadata (`title`, `description`, `openGraph`) should use `generateMetadata` with translated keys, not static `metadata` exports.

## Build

```
pnpm run dev     # Dev server
pnpm run build   # Production build
```
