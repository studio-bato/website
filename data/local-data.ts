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

export const artists: Artists = ArtistsSchema.parse(artistsData);
export const genres: Genres = GenresSchema.parse(genresData);
export const releases: Releases = ReleasesSchema.parse(releasesData).sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);
