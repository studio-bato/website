import { Suspense } from "react";
import { AdminGenresContent } from "./content";
import { getGenresStorage } from "@/data/storage";
import { connection } from "next/server";

export default async function AdminGenresPage() {
  return (
    <Suspense>
      <AdminGenres />
    </Suspense>
  );
}

async function AdminGenres() {
  await connection();
  const genres = await getGenresStorage();
  return <AdminGenresContent initialGenres={genres} />;
}
