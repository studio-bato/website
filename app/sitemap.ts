import { getArtists, getReleases } from "@/data";
import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const BASE_URL = process.env.SITE_URL;

const staticRoutes = [
  { url: "/", priority: 1.0 },
  { url: "/artists", priority: 0.9 },
  { url: "/releases", priority: 0.9 },
  { url: "/videos", priority: 0.2 },
  { url: "/about", priority: 0.6 },
  { url: "/contact", priority: 0.4 },
];

function localePath(locale: string, path: string) {
  if (locale === routing.defaultLocale) return path;
  return `/${locale}${path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [artists, releases] = await Promise.all([getArtists(), getReleases()]);

  const staticEntries: MetadataRoute.Sitemap = routing.locales.flatMap(
    (locale) =>
      staticRoutes.map(({ url, priority }) => ({
        url: `${BASE_URL}${localePath(locale, url)}`,
        priority,
      })),
  );

  const artistEntries: MetadataRoute.Sitemap = routing.locales.flatMap(
    (locale) =>
      artists.map((artist) => ({
        url: `${BASE_URL}${localePath(locale, `/artists/${artist.id}`)}`,
        priority: 0.8,
      })),
  );

  const releaseEntries: MetadataRoute.Sitemap = routing.locales.flatMap(
    (locale) =>
      releases.map((release) => ({
        url: `${BASE_URL}${localePath(locale, `/releases/${release.id}`)}`,
        priority: 0.8,
      })),
  );

  return [...staticEntries, ...artistEntries, ...releaseEntries];
}
