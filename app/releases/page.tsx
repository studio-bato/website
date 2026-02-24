import { Release } from "@/components/release";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { getReleases } from "@/data";

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

export default async function Releases() {
  const t = await getTranslations("releasesPage");
  const releases = await getReleases();

  return (
    <section id="releases" className="py-12 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-4xl sm:text-5xl tracking-tight text-foreground mb-16">
          {t("title")}
        </h2>

        <div className="flex flex-col gap-4 grid grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {releases.map((release, index) => (
            <Release release={release} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
