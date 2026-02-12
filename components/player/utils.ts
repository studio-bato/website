import { PlayerTrack } from "./context";
import type { Release } from "@/data";

export function mapReleaseToPlayer(release: Release): Array<PlayerTrack> {
  if (!release.tracks) return [];

  return release.tracks.map((t) => ({
    ...t,
    cover: release.cover,
    artist: release.artists.join(", "),
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
