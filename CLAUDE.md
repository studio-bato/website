# Studio Bato Website

Next.js 16 website using Turbopack, Tailwind CSS, and next-intl for internationalization.

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
