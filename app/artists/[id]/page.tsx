import { getMediaUrl } from "@/data/media";
import { getArtistByIdMapped, getArtists } from "@/data";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Pencil } from "lucide-react";
import { icons } from "@/lib/icons";
import type { Metadata } from "next";
import type { Socials } from "@/data";
import { getTranslations } from "next-intl/server";
import { Release } from "@/components/release";
import { Suspense } from "react";
import { EditButton } from "@/components/edit-button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const artistMapped = await getArtistByIdMapped(id);
  if (!artistMapped) return {};

  const title = `${artistMapped.name} | StudioBato`;
  const description =
    artistMapped.bio || `Discover ${artistMapped.name} on StudioBato.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export async function generateStaticParams() {
  return (await getArtists()).map((artist) => ({
    id: artist.id,
  }));
}

async function ArtistDetail({ id }: { id: string }) {
  const t = await getTranslations("artistDetail");

  let artistMapped = await getArtistByIdMapped(id);
  if (!artistMapped) {
    artistMapped = {
      id,
      name: id,
      bio: t("unknownArtist"),
    };
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/artists"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {t("allArtists")}
        </Link>
        <EditButton url={`/admin/artists?id=${id}`} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        {/* Artist image */}
        <div className="relative aspect-square overflow-hidden md:col-span-5">
          <Image
            src={getMediaUrl(artistMapped.image) || "/placeholder-artist.svg"}
            alt={artistMapped.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Artist info */}
        <div className="flex flex-col md:col-span-7">
          <h1 className="font-display text-3xl sm:text-4xl tracking-tight text-foreground">
            {artistMapped.name}
          </h1>

          {/* Socials */}
          {artistMapped.socials &&
            Object.keys(artistMapped.socials).length > 0 && (
              <div className="flex flex-wrap gap-4 mt-6">
                {(
                  Object.entries(artistMapped.socials) as [
                    keyof Socials,
                    string,
                  ][]
                ).map(([key, url]) => {
                  const social = icons[key];
                  if (!url || !social) return null;
                  const Icon = social.icon;
                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={social.label}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            )}
          {artistMapped.bio && (
            <div className="text-sm text-muted-foreground mt-4 leading-relaxed">
              {artistMapped.bio.split("\n").map((line, index) => (
                <p key={index} className="">
                  {line}
                  <br />
                </p>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Releases */}
      {artistMapped.releases && artistMapped.releases.length > 0 && (
        <div className="mt-8">
          <h2 className="font-display text-2xl sm:text-3xl tracking-tight text-foreground mb-8">
            {t("releases")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
            {artistMapped.releases.map((release) => (
              <Release key={release.id} release={release} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default async function ArtistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main>
      <section className="py-4 lg:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <Suspense>
            <ArtistDetail id={id} />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
