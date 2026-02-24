import {
  type Artist,
  ArtistMapped,
  type Release,
  ReleaseMapped,
  type Genre,
} from "./types";

import { artists, releases, genres } from "./local-data";

export async function getGenres(): Promise<Array<Genre>> {
  return genres;
}

export async function getGenreById(
  genreId: string,
): Promise<Genre | undefined> {
  return genres.find((g) => g.id === genreId);
}

export async function getRelatedReleases(
  releaseId: string,
  limit = 1000,
): Promise<Array<Release>> {
  const release = await getReleaseById(releaseId);
  if (!release) return [];
  return releases
    .filter(
      (r) =>
        r.id !== releaseId &&
        r.genreIds &&
        r.genreIds.some((genreId) => release.genreIds!.includes(genreId)),
    )
    .slice(0, limit);
}

export function getDefaultArtist(artistId: string): Artist {
  return {
    id: artistId,
    name: artistId,
  };
}
export async function getArtistById(
  artistId: string,
): Promise<Artist | undefined> {
  return artists.find((g) => g.id === artistId);
}

export async function getArtists(): Promise<Array<Artist>> {
  return artists;
}

export async function getReleaseById(
  releaseId: string,
): Promise<Release | undefined> {
  return releases.find((g) => g.id === releaseId);
}

export async function getReleases(): Promise<Array<Release>> {
  return releases;
}

export async function getReleaseByIdMapped(
  releaseId: string,
): Promise<ReleaseMapped | null> {
  const release = await getReleaseById(releaseId);

  if (!release) {
    return null;
  }

  return {
    ...release,
    artists:
      release.artistIds &&
      (await Promise.all(
        release.artistIds.map(
          async (id) => (await getArtistById(id)) || getDefaultArtist(id),
        ),
      )),
    genres:
      release.genreIds &&
      (
        await Promise.all(release.genreIds.map((id) => getGenreById(id)))
      ).filter((g) => !!g),
    tracks:
      release.tracks &&
      (await Promise.all(
        release.tracks.map(async (track) => ({
          ...track,
          artists: (
            await Promise.all(
              track.artistIds?.map(
                async (artistId) =>
                  (await getArtistById(artistId)) || getDefaultArtist(artistId),
              ) || [],
            )
          ).filter((a) => !!a),
        })),
      )),
  };
}

export async function getReleasesMapped(): Promise<Array<ReleaseMapped>> {
  const releases = await getReleases();
  const mappedReleases = await Promise.all(
    releases.map(async (release) => getReleaseByIdMapped(release.id)),
  );
  return mappedReleases.filter((r) => !!r);
}

export async function getArtistByIdMapped(
  artistId: string,
): Promise<ArtistMapped | null> {
  const artist = await getArtistById(artistId);

  if (!artist) {
    return null;
  }

  const releases = await getReleases();
  const artistReleases = releases.filter(
    (r) =>
      r.artistIds?.includes(artist.id) ||
      r.tracks?.some((t) => t.artistIds?.includes(artist.id)),
  );

  return {
    ...artist,
    releases: artistReleases,
  };
}
