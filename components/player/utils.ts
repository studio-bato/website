import { PlayerTrack } from "./context";
import { getReleaseArtists, type Release } from "@/data";

export function mapReleaseToPlayer(release: Release): Array<PlayerTrack> {
  if (!release.tracks) return [];
  const artists = getReleaseArtists(release);

  return release.tracks
    .filter((t) => !!t.url)
    .map((t) => ({
      url: "",
      ...t,
      cover: release.cover,
      artist: artists.map((a) => a.name).join(", "),
      album: release.title,
    }));
}

export function shuffle<T>(array: Array<T>) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
