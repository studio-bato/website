import { type PlayerTrack, shuffle } from "@/components/player";
import { ReleaseMapped } from "@/data/schemas";
import { getReleasesMapped } from "./data";

const MEDIA_CDN_URL =
  process.env.MEDIA_CDN_URL || "https://media.studiobato.org";

export function getMediaUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("http")) return url;
  let cdn_url = MEDIA_CDN_URL;
  if (cdn_url[cdn_url.length - 1] === "/") cdn_url = cdn_url.slice(0, -1);
  if (url[url.length - 1] === "/") url = url.slice(0, -1);
  return `${cdn_url}/${url}`;
}

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
