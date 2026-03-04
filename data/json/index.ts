import {
  ArtistsSchema,
  GenresSchema,
  ReleasesSchema,
  Artists,
  Genres,
  Releases,
} from "../schemas";

import artistsData from "./artists.json";
import releasesData from "./releases.json";
import genresData from "./genres.json";

export const artists: Artists = ArtistsSchema.parse(artistsData);
export const genres: Genres = GenresSchema.parse(genresData);
export const releases: Releases = ReleasesSchema.parse(releasesData);
