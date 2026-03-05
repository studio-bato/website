import type { Artist, Genre, Release } from "@/data/schemas";
import { artists, genres, releases } from "@/data/json";

export const getGenresStorage = async (): Promise<Array<Genre>> => {
  return genres;
};

export const getArtistsStorage = async (): Promise<Array<Artist>> => {
  return artists;
};

export const getReleasesStorage = async (): Promise<Array<Release>> => {
  return releases;
};
