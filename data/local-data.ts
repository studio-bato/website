import {
  ArtistsSchema,
  GenresSchema,
  ReleasesSchema,
  Artists,
  Genres,
  Releases,
} from "./schemas";

import artistsData from "./json/artists.json";
import releasesData from "./json/releases.json";
import genresData from "@/data/json/genres.json";

const MEDIA_CDN_URL =
  process.env.MEDIA_CDN_URL || "https://f003.backblazeb2.com/";

export const artists: Artists = ArtistsSchema.parse(artistsData).map((a) => ({
  ...a,
  image: `${MEDIA_CDN_URL}${a.image}`,
}));
export const genres: Genres = GenresSchema.parse(genresData);
export const releases: Releases = ReleasesSchema.parse(releasesData)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .map((r) => ({
    ...r,
    cover: `${MEDIA_CDN_URL}${r.cover}`,
  }));
