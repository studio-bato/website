import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { getGenres, getReleases } from "@/data";
import { Release } from "@/components/release";
import { GenreFilter } from "@/components/genre-filter";

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

export default async function Releases({
  searchParams,
}: {
  searchParams: Promise<{ genres?: string }>;
}) {
  const t = await getTranslations("releasesPage");
  const { genres: genresParam } = await searchParams;

  const selectedGenres = genresParam
    ? genresParam.split(",").filter(Boolean)
    : [];

  const [allReleases, genres] = await Promise.all([getReleases(), getGenres()]);

  const releases =
    selectedGenres.length === 0
      ? allReleases
      : allReleases.filter(
          (release) =>
            release.genreIds &&
            release.genreIds.some((id) => selectedGenres.includes(id)),
        );

  return (
    <section id="releases" className="py-4 lg:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-4xl sm:text-5xl tracking-tight text-foreground mb-8">
          {t("title")}
        </h2>

        <GenreFilter genres={genres} />

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
          {releases.map((release) => (
            <Release key={release.id} release={release} />
          ))}
        </div>
      </div>
    </section>
  );
}
