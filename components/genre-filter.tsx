"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import type { Genre } from "@/data";
import { Button } from "@/components/ui/button";

interface GenreFilterProps {
  genres: Genre[];
}

export function GenreFilter({ genres }: GenreFilterProps) {
  const t = useTranslations("releasesPage");
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedGenres =
    searchParams.get("genres")?.split(",").filter(Boolean) ?? [];

  function buildUrl(genreId: string) {
    const isSelected = selectedGenres.includes(genreId);
    const next = isSelected
      ? selectedGenres.filter((id) => id !== genreId)
      : [...selectedGenres, genreId];
    return next.length > 0 ? `/releases?genres=${next.join(",")}` : "/releases";
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mb-8">
      <Button
        onClick={() => router.push("/releases")}
        variant={selectedGenres.length === 0 ? "default" : "outline"}
        size="xs"
      >
        {t("allGenres")}
      </Button>
      {genres.map((genre) => (
        <Button
          key={genre.id}
          onClick={() => router.push(buildUrl(genre.id))}
          variant={selectedGenres.includes(genre.id) ? "default" : "outline"}
          size="xs"
        >
          {genre.label}
        </Button>
      ))}
    </div>
  );
}
