import { Suspense } from "react";
import { getArtistsStorage } from "@/data/storage";
import { AdminArtistsContent } from "./content";
import { connection } from "next/server";

export default async function AdminArtistsPage() {
  return (
    <Suspense>
      <AdminArtists />
    </Suspense>
  );
}

async function AdminArtists() {
  await connection();
  const artists = await getArtistsStorage();
  return <AdminArtistsContent initialArtists={artists} />;
}
