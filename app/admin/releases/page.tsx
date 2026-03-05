import { Suspense } from "react";
import { getReleasesStorage } from "@/data/storage";
import { AdminReleasesContent } from "./content";

export default async function AdminReleasesPage() {
  const releases = await getReleasesStorage();
  return (
    <Suspense>
      <AdminReleasesContent initialReleases={releases} />
    </Suspense>
  );
}
