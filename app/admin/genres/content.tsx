"use client";

import { GenreSchema } from "@/data/schemas";
import type { Genre } from "@/data/types";
import { saveGenres } from "@/app/admin/actions";
import { AdminEntityContent } from "@/components/admin/admin-entity-content";

export function AdminGenresContent({
  initialGenres,
}: {
  initialGenres: Genre[];
}) {
  return (
    <AdminEntityContent
      initialItems={initialGenres}
      config={{
        title: "Genres",
        entityName: "Genre",
        schema: GenreSchema,
        saveAction: saveGenres,
        getLabel: (g) => g.label,
        getSublabel: (g) => `${g.id}`,
      }}
    />
  );
}
