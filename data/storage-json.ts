import type { Artist, Genre, Release } from "@/data/schemas";
import { artists, genres, releases } from "@/data/json";
import { writeFileSync } from "fs";
import { join } from "path";

export const getGenresStorage = async (): Promise<Array<Genre>> => {
  return genres;
};

export const getArtistsStorage = async (): Promise<Array<Artist>> => {
  return artists;
};

export const getReleasesStorage = async (): Promise<Array<Release>> => {
  return releases;
};

export const saveGenresStorage = async (data: Array<Genre>): Promise<void> => {
  writeFileSync(join(process.cwd(), "data/json/genres.json"), JSON.stringify(data, null, 2), "utf-8");
};

export const saveArtistsStorage = async (data: Array<Artist>): Promise<void> => {
  writeFileSync(join(process.cwd(), "data/json/artists.json"), JSON.stringify(data, null, 2), "utf-8");
};

export const saveReleasesStorage = async (data: Array<Release>): Promise<void> => {
  writeFileSync(join(process.cwd(), "data/json/releases.json"), JSON.stringify(data, null, 2), "utf-8");
};
