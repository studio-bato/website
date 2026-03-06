"use client";

import { ReleaseSchema } from "@/data/schemas";
import type { Release } from "@/data/types";
import { saveReleases } from "@/app/[locale]/admin/actions";
import { AdminEntityContent } from "@/components/admin/admin-entity-content";

export function AdminReleasesContent({
  initialReleases,
}: {
  initialReleases: Release[];
}) {
  return (
    <AdminEntityContent
      initialItems={initialReleases}
      config={{
        title: "Releases",
        entityName: "Release",
        schema: ReleaseSchema,
        saveAction: saveReleases,
        getLabel: (r) => r.title,
        getSublabel: (r) => `${r.type} — ${r.date}`,
        getOpenLink: (id) => `/releases/${id}`,
      }}
    />
  );
}
