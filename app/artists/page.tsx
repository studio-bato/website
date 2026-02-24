import { getArtists } from "@/data";
import { Artist } from "@/components/artist";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

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

export default async function Artists() {
  const t = await getTranslations("artistsPage");

  const artists = await getArtists();

  return (
    <section id="artists" className="py-12 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-4xl sm:text-5xl tracking-tight text-foreground mb-16">
          {t("title")}
        </h2>

        <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 xl:grid-cols-3 lg:gap-8">
          {artists.map((artist, index) => (
            <Artist artist={artist} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
