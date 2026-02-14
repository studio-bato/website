import { artists, getArtistReleases } from "@/data";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { icons } from "@/lib/icons";
import type { Socials } from "@/data";

export default async function ArtistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const artist = artists.find((a) => a.id === id);
  if (!artist) {
    redirect(`/404`);
  }

  const releases = getArtistReleases(artist);

  return (
    <main>
      <section className="py-12 lg:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <Link
            href="/artists"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All artists
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            {/* Artist image */}
            <div className="relative aspect-square overflow-hidden md:col-span-5">
              <Image
                src={artist.image || "/placeholder.svg"}
                alt={artist.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Artist info */}
            <div className="flex flex-col md:col-span-7">
              <h1 className="font-display text-3xl sm:text-4xl tracking-tight text-foreground">
                {artist.name}
              </h1>
              <p className="text-lg text-muted-foreground mt-4 leading-relaxed">
                {artist.bio}
              </p>

              {/* Socials */}
              {artist.socials && Object.keys(artist.socials).length > 0 && (
                <div className="flex flex-wrap gap-4 mt-6">
                  {(
                    Object.entries(artist.socials) as [keyof Socials, string][]
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
            </div>
          </div>

          {/* Releases */}
          {releases.length > 0 && (
            <div className="mt-8">
              <h2 className="font-display text-2xl sm:text-3xl tracking-tight text-foreground mb-8">
                Releases
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {releases.map((release) => (
                  <Link
                    key={release.id}
                    href={`/releases/${release.id}`}
                    className="group"
                  >
                    <div className="relative aspect-square overflow-hidden mb-3">
                      <Image
                        src={release.cover || "/placeholder.svg"}
                        alt={release.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-sm font-medium text-foreground group-hover:text-foreground/80 transition-colors">
                      {release.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {release.type} &middot; {release.date.slice(0, 4)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
