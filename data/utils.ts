import { type Artist, type Release, type ReleaseVideoClip } from "./types";
import { releases } from "./releases";
import { artists } from "./artists";

export function getArtistReleases(artist: Artist): Array<Release> {
  return releases.filter(
    (r) =>
      r.artistIds?.includes(artist.id) ||
      r.tracks?.some((t) => t.artistIds?.includes(artist.id)),
  );
}

export function getReleaseArtists(releases: Release): Array<Artist> {
  return releases.artistIds
    ? releases.artistIds
        .map((id) => {
          const artist = artists.find((a) => a.id === id);
          if (!artist)
            return {
              id,
              name: id,
            };
          return artist;
        })
        .filter((a) => !!a)
    : [];
}

export function getAllVideoClips(): Array<{
  clip: ReleaseVideoClip;
  release: Release;
}> {
  return releases.flatMap((release) =>
    (release.videoClips ?? []).map((clip) => ({ clip, release })),
  );
}

export function getRandomVideoClip(): ReleaseVideoClip | null {
  const all = getAllVideoClips();
  if (all.length === 0) return null;
  return all[Math.floor(Math.random() * all.length)].clip;
}
