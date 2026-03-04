import { type PlayerTrack, shuffle } from "@/components/player";
import { ReleaseMapped } from "@/data/schemas";
import { getMediaUrl, getReleasesMapped } from "./data";

export function mapReleaseToPlayer(release: ReleaseMapped): Array<PlayerTrack> {
  if (!release.tracks) return [];

  return release.tracks
    .filter((t) => !!t.url)
    .map((t) => ({
      ...t,
      url: getMediaUrl(t.url) || "",
      cover: release.cover,
      artist: release.artists?.map((a) => a.name).join(", ") || "",
      album: release.title,
      releaseId: release.id,
    }));
}

export async function getAllTracksPlaylist(): Promise<Array<PlayerTrack>> {
  const releases = await getReleasesMapped();
  const tracks = shuffle(releases.flatMap(mapReleaseToPlayer));
  return tracks;
}
