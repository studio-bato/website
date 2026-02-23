import { Artist, ArtistsSchema } from "./schemas";
import artistsData from "./artists.json";

export const artists: Array<Artist> = ArtistsSchema.parse(artistsData);
