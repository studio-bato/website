import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { getGenres, getReleases } from "@/data";
import { Release } from "@/components/release";
import { GenreFilter } from "@/components/genre-filter";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("releasesPage");
  const title = t("metaTitle");
  const description = t("metaDescription");

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

async function GenreFilterLoader() {
  const genres = await getGenres();
  return <GenreFilter genres={genres} />;
}

async function ReleasesParams({
  searchParams,
}: {
  searchParams: Promise<{ genres?: string }>;
}) {
  const { genres: genresParam } = await searchParams;

  return <ReleasesGrid genresParam={genresParam} />;
}

async function ReleasesGrid({ genresParam }: { genresParam?: string }) {
  const selectedGenres = genresParam
    ? genresParam.split(",").filter(Boolean)
    : [];

  const allReleases = await getReleases();
  const releases =
    selectedGenres.length === 0
      ? allReleases
      : allReleases.filter(
          (release) =>
            release.genreIds &&
            release.genreIds.some((id) => selectedGenres.includes(id)),
        );

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
      {releases.map((release) => (
        <Release key={release.id} release={release} />
      ))}
    </div>
  );
}

function ReleasesGridSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i}>
          <Skeleton className="aspect-square w-full rounded-none" />
          <div className="pt-4 space-y-2">
            <Skeleton className="h-3 w-1/2 rounded-none" />
            <Skeleton className="h-5 w-3/4 rounded-none" />
            <Skeleton className="h-3 w-2/3 rounded-none" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function Releases({
  searchParams,
}: {
  searchParams: Promise<{ genres?: string }>;
}) {
  const t = await getTranslations("releasesPage");

  return (
    <section id="releases" className="py-4 lg:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-4xl sm:text-5xl tracking-tight text-foreground mb-8">
          {t("title")}
        </h2>

        <Suspense>
          <GenreFilterLoader />
        </Suspense>

        <Suspense
          fallback={
            <Suspense fallback={<ReleasesGridSkeleton />}>
              <ReleasesGrid />
            </Suspense>
          }
        >
          <ReleasesParams searchParams={searchParams} />
        </Suspense>
      </div>
    </section>
  );
}
