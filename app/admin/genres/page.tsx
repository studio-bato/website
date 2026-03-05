import { AdminGenresContent } from "./content";
import { getGenresStorage } from "@/data/storage";

export default async function AdminGenresPage() {
  const genres = await getGenresStorage();
  return <AdminGenresContent initialGenres={genres} />;
}
