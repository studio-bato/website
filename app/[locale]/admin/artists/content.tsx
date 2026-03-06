"use client";

import { ArtistSchema } from "@/data/schemas";
import type { Artist } from "@/data/types";
import { saveArtists } from "@/app/[locale]/admin/actions";
import { AdminEntityContent } from "@/components/admin/admin-entity-content";

export function AdminArtistsContent({
  initialArtists,
}: {
  initialArtists: Artist[];
}) {
  return (
    <AdminEntityContent
      initialItems={initialArtists}
      config={{
        title: "Artists",
        entityName: "Artist",
        schema: ArtistSchema,
        saveAction: saveArtists,
        getLabel: (a) => a.name,
        getSublabel: (a) => `${a.id}`,
        getOpenLink: (id) => `/artists/${id}`,
      }}
    />
  );
}
