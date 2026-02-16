import { Artist, ArtistsSchema } from "./schemas";
import artistsData from "./artists.json";

export const artists: Array<Artist> = ArtistsSchema.parse(artistsData);

const featuredArtistsIds = ["radiobato", "walass"];

export const featuredArtists = artists.filter((a) =>
  featuredArtistsIds.includes(a.id),
);
