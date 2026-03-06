import { Suspense } from "react";
import { getReleasesStorage } from "@/data/storage";
import { AdminReleasesContent } from "./content";
import { connection } from "next/server";

export default async function AdminReleasesPage() {
  return (
    <Suspense>
      <AdminReleases />
    </Suspense>
  );
}

async function AdminReleases() {
  await connection();
  const releases = await getReleasesStorage();
  return <AdminReleasesContent initialReleases={releases} />;
}
