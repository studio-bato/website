"use server";

import { writeFileSync } from "fs";
import { join } from "path";
import { ArtistsSchema, ReleasesSchema } from "@/data/schemas";
import type { Artist, Release } from "@/data/types";
import { createSession } from "./session";

export async function saveArtists(artists: Artist[]) {
  const parsed = ArtistsSchema.safeParse(artists);
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten() };
  }

  const filePath = join(process.cwd(), "data", "artists.json");
  writeFileSync(filePath, JSON.stringify(parsed.data, null, 2), "utf-8");

  return { success: true };
}

export async function saveReleases(releases: Release[]) {
  const parsed = ReleasesSchema.safeParse(releases);
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten() };
  }

  const filePath = join(process.cwd(), "data", "releases.json");
  writeFileSync(filePath, JSON.stringify(parsed.data, null, 2), "utf-8");

  return { success: true };
}

export async function login(formData: FormData) {
  const password = formData.get("password");
  if (password === process.env.ADMIN_PASSWORD) {
    await createSession("admin");
  }
}
