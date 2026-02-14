import { type Artist, type Release } from "./types";
import { releases } from "./releases";
import { artists } from "./artists";

export function getArtistReleases(artist: Artist): Array<Release> {
  return releases.filter((r) => r.artistIds.includes(artist.id));
}

export function getReleaseArtists(releases: Release): Array<Artist> {
  return releases.artistIds
    .map((id) => {
      const artist = artists.find((a) => a.id === id);
      if (!artist)
        return {
          id,
          name: id,
        };
      return artist;
    })
    .filter((a) => !!a);
}
