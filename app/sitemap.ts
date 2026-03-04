import { getArtists, getReleases } from "@/data";
import type { MetadataRoute } from "next";

const BASE_URL = process.env.SITE_URL;

const staticRoutes = [
  { url: "/", priority: 1.0 },
  { url: "/artists", priority: 0.9 },
  { url: "/releases", priority: 0.9 },
  { url: "/videos", priority: 0.2 },
  { url: "/about", priority: 0.6 },
  { url: "/contact", priority: 0.4 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [artists, releases] = await Promise.all([getArtists(), getReleases()]);

  const artistEntries: MetadataRoute.Sitemap = artists.map((artist) => ({
    url: `${BASE_URL}/artists/${artist.id}`,
    priority: 0.8,
  }));

  const releaseEntries: MetadataRoute.Sitemap = releases.map((release) => ({
    url: `${BASE_URL}/releases/${release.id}`,
    // lastModified: new Date(release.date), // TODO
    priority: 0.8,
  }));

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(
    ({ url, priority }) => ({
      url: `${BASE_URL}${url}`,
      priority,
    }),
  );

  return [...staticEntries, ...artistEntries, ...releaseEntries];
}
