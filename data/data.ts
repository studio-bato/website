import {
  type Artist,
  ArtistMapped,
  type Release,
  ReleaseMapped,
  type Genre,
} from "./types";
import { cache } from "react";
import { artists, releases, genres } from "./json";

export const getGenres = cache(async (): Promise<Array<Genre>> => {
  return genres;
});

export const getArtists = cache(async (): Promise<Array<Artist>> => {
  return artists;
});

export const getReleases = cache(async (): Promise<Array<Release>> => {
  return releases
    .filter((release) => new Date(release.date).getTime() < Date.now())
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

export const getGenreById = cache(async (genreId: string): Promise<Genre> => {
  return (
    (await getGenres()).find((g) => g.id === genreId) || {
      id: genreId,
      label: genreId,
    }
  );
});

export const getArtistById = cache(
  async (artistId: string): Promise<Artist | undefined> => {
    return (await getArtists()).find((g) => g.id === artistId);
  },
);

export const getArtistByIdMapped = cache(
  async (artistId: string): Promise<ArtistMapped | null> => {
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
  },
);

export const getReleaseById = cache(
  async (releaseId: string): Promise<Release | undefined> => {
    return (await getReleases()).find((g) => g.id === releaseId);
  },
);

export const getReleaseByIdMapped = cache(
  async (releaseId: string): Promise<ReleaseMapped | null> => {
    const release = await getReleaseById(releaseId);

    if (!release) {
      return null;
    }

    const getDefaultArtist = (artistId: string): Artist => ({
      id: artistId,
      name: artistId,
    });

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
                    (await getArtistById(artistId)) ||
                    getDefaultArtist(artistId),
                ) || [],
              )
            ).filter((a) => !!a),
          })),
        )),
    };
  },
);

export const getReleasesMapped = cache(
  async (): Promise<Array<ReleaseMapped>> => {
    const releases = await getReleases();
    const mappedReleases = await Promise.all(
      releases.map(async (release) => getReleaseByIdMapped(release.id)),
    );
    return mappedReleases.filter((r) => !!r);
  },
);

export const getRelatedReleases = cache(
  async (releaseId: string, limit = 1000): Promise<Array<Release>> => {
    const release = await getReleaseById(releaseId);
    if (!release) return [];
    return (await getReleases())
      .filter(
        (r) =>
          r.id !== releaseId &&
          r.genreIds &&
          r.genreIds.some(
            (genreId) => release.genreIds && release.genreIds.includes(genreId),
          ),
      )
      .slice(0, limit);
  },
);
