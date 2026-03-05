import { Suspense } from "react";
import { getArtistsStorage } from "@/data/storage";
import { AdminArtistsContent } from "./content";

export default async function AdminArtistsPage() {
  const artists = await getArtistsStorage();
  return (
    <Suspense>
      <AdminArtistsContent initialArtists={artists} />
    </Suspense>
  );
}
