# Studio Bato Website

Independent music label website — "We ship songs."

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
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
  types.ts          → Interfaces: Artist, Release, Track, etc.
  artists.ts        → Artist entries
  releases.ts       → Release catalog
  utils.ts          → Helpers (getArtistReleases, getReleaseArtists, getAllVideoClips)
lib/                → Utilities (cn(), icons, OG helpers)
public/             → Static assets
```

## Key Conventions

- **Data is static:** All content lives in `data/*.ts` as typed arrays. No CMS, no DB queries.
- **IDs:** kebab-case slugs (e.g. `"walass"`, `"la-fete-est-finie"`)
- **Dates:** ISO format `YYYY-MM-DD`
- **Imports:** Use `@/` path alias (maps to project root)
- **Class merging:** Use `cn()` from `lib/utils.ts` for conditional Tailwind classes
- **Server-first:** Components are server components by default; add `"use client"` only when needed (interactivity, hooks, browser APIs)
- **Static generation:** Dynamic routes use `generateStaticParams()` + `generateMetadata()`
- **External links:** Decorated with `ArrowUpRight` icon from Lucide
- **Media assets:** Hosted on CDN (`sb-cdn.opac.me`, Backblaze B2)
- **Images:** `next/image` with `unoptimized: true`

## Adding Content

**New release:** Add entry to `data/releases.ts` matching the `Release` interface.
**New artist:** Add entry to `data/artists.ts` matching the `Artist` interface. Reference their release IDs.

## Build

```
npm run dev     # Dev server
npm run build   # Production build
npm run lint    # ESLint
```

Note: `typescript.ignoreBuildErrors: true` is set in next.config — types are not enforced at build time but should still be respected in code.
