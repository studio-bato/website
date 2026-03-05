import { getArtists } from "@/data";
import { Artist } from "@/components/artist";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("artistsPage");
  const title = t("metaTitle");
  const description = t("metaDescription");

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

async function ArtistsGrid() {
  const artists = await getArtists();
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
      {artists.map((artist, index) => (
        <Artist artist={artist} key={index} />
      ))}
    </div>
  );
}

function ArtistsGridSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i}>
          <Skeleton className="aspect-square w-full rounded-none" />
          <div className="pt-4 space-y-2">
            <Skeleton className="h-5 w-3/4 rounded-none" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function Artists() {
  const t = await getTranslations("artistsPage");

  return (
    <section id="artists" className="py-4 lg:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-4xl sm:text-5xl tracking-tight text-foreground mb-16">
          {t("title")}
        </h2>

        <Suspense fallback={<ArtistsGridSkeleton />}>
          <ArtistsGrid />
        </Suspense>
      </div>
    </section>
  );
}
