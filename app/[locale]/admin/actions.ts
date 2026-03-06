"use server";

import { ArtistsSchema, GenresSchema, ReleasesSchema } from "@/data/schemas";
import type { Artist, Genre, Release } from "@/data/types";
import {
  saveArtistsStorage,
  saveGenresStorage,
  saveReleasesStorage,
} from "@/data/storage";
import { createSession, deleteSession, getSession } from "./session";
import { revalidateTag } from "next/cache";

export async function saveArtists(artists: Artist[]) {
  if (!(await getSession())) return { success: false, error: "Unauthorized" };

  const parsed = ArtistsSchema.safeParse(artists);
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten() };
  }

  await saveArtistsStorage(parsed.data);
  revalidateTag("all", "max");

  return { success: true };
}

export async function saveReleases(releases: Release[]) {
  if (!(await getSession())) return { success: false, error: "Unauthorized" };

  const parsed = ReleasesSchema.safeParse(releases);
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten() };
  }

  await saveReleasesStorage(parsed.data);
  revalidateTag("all", "max");

  return { success: true };
}

export async function saveGenres(genres: Genre[]) {
  if (!(await getSession())) return { success: false, error: "Unauthorized" };

  const parsed = GenresSchema.safeParse(genres);
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten() };
  }

  await saveGenresStorage(parsed.data);
  revalidateTag("all", "max");

  return { success: true };
}

export async function login(formData: FormData) {
  const password = formData.get("password");
  if (password === process.env.ADMIN_PASSWORD) {
    await createSession("admin");
    return { success: true };
  }
  return { success: false };
}

export async function logout() {
  await deleteSession();
}
