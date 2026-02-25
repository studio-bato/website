"use server";

import { writeFileSync } from "fs";
import { join } from "path";
import { ArtistsSchema, GenresSchema, ReleasesSchema } from "@/data/schemas";
import type { Artist, Genre, Release } from "@/data/types";
import { createSession, deleteSession } from "./session";

export async function saveArtists(artists: Artist[]) {
  const parsed = ArtistsSchema.safeParse(artists);
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten() };
  }

  const filePath = join(process.cwd(), "data", "json", "artists.json");
  writeFileSync(filePath, JSON.stringify(parsed.data, null, 2), "utf-8");

  return { success: true };
}

export async function saveReleases(releases: Release[]) {
  const parsed = ReleasesSchema.safeParse(releases);
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten() };
  }

  const filePath = join(process.cwd(), "data", "json", "releases.json");
  writeFileSync(filePath, JSON.stringify(parsed.data, null, 2), "utf-8");

  return { success: true };
}

export async function saveGenres(genres: Genre[]) {
  const parsed = GenresSchema.safeParse(genres);
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten() };
  }

  const filePath = join(process.cwd(), "data", "json", "genres.json");
  writeFileSync(filePath, JSON.stringify(parsed.data, null, 2), "utf-8");

  return { success: true };
}

export async function login(formData: FormData) {
  const password = formData.get("password");
  if (password === process.env.ADMIN_PASSWORD) {
    await createSession("admin");
  }
}

export async function logout() {
  await deleteSession();
}
