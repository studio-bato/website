import {
  type Artist,
  ArtistMapped,
  type Release,
  ReleaseMapped,
} from "./types";
import { releases } from "./releases";
import { artists } from "./artists";
import { genres } from "./genres";

export async function getGenreById(genreId: string) {
  return genres.find((g) => g.id === genreId);
}

export async function getArtistById(artistId: string) {
  return artists.find((g) => g.id === artistId);
}

export async function getArtists(): Promise<Array<Artist>> {
  return artists;
}

export async function getReleaseById(releaseId: string) {
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

  const mappedRelease = {
    ...release,
    artists:
      release.artistIds &&
      (
        await Promise.all(release.artistIds.map((id) => getArtistById(id)))
      ).filter((a) => !!a),
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
              track.artistIds?.map((artistId) => getArtistById(artistId)) || [],
            )
          ).filter((a) => !!a),
        })),
      )),
  };

  return mappedRelease;
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

  const mappedArtist: ArtistMapped = {
    ...artist,
    releases: artistReleases,
  };

  return mappedArtist;
}
