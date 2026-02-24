import { getReleaseByIdMapped, getReleases, getRelatedReleases } from "@/data";
import { Release } from "@/components/release";
import { mapReleaseToPlayer } from "@/data/player";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DownloadTrackButton } from "@/components/player/download-track-button";
import { PlayTrackButton } from "@/components/player/play-track-button";
import { PlayReleaseButton } from "@/components/player/play-release-button";
import { ListenDropdown } from "@/components/listen-dropdown";
import { VideoClipEmbed } from "@/components/video-clip-embed";
import { notFound } from "next/navigation";
import { getTranslations, getFormatter } from "next-intl/server";
import type { Metadata } from "next";
import { BuyDropdown } from "@/components/buy-dropdown";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const releaseMapped = await getReleaseByIdMapped(id);
  if (!releaseMapped) return {};

  const artistNames = releaseMapped.artists?.map((a) => a.name).join(", ");
  const title = `${releaseMapped.title} by ${artistNames} | Studio Bato`;
  const description =
    releaseMapped.description ||
    `Listen to ${releaseMapped.title} by ${artistNames}. ${releaseMapped.type} · ${releaseMapped.genres?.join(", ")}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "music.album",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export async function generateStaticParams() {
  return (await getReleases()).map((release) => ({
    id: release.id,
  }));
}

export default async function ReleasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const t = await getTranslations("releaseDetail");
  const format = await getFormatter();

  const releaseMapped = await getReleaseByIdMapped(id);
  if (!releaseMapped) {
    notFound();
  }

  const [playerTracks, relatedReleases] = await Promise.all([
    mapReleaseToPlayer(releaseMapped),
    getRelatedReleases(id, 6),
  ]);

  return (
    <main>
      <section className="py-12 lg:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <Link
            href="/releases"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {t("allReleases")}
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            {/* Cover */}
            <div className="relative aspect-square overflow-hidden md:col-span-5">
              <Image
                src={releaseMapped.cover || "/placeholder.svg"}
                alt={`${releaseMapped.title} album cover`}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Info + tracklist */}
            <div className="flex flex-col md:col-span-7">
              <p className="text-xs text-muted-foreground mb-2">
                {releaseMapped.type} &middot;{" "}
                {format.dateTime(new Date(releaseMapped.date), {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}
              </p>
              <h1 className="font-display text-3xl sm:text-4xl tracking-tight text-foreground">
                {releaseMapped.title}
              </h1>
              <p className="text-lg text-muted-foreground mt-1 flex">
                {releaseMapped.artists ? (
                  releaseMapped.artists.map((artist) => (
                    <Link
                      href={`/artists/${artist.id}`}
                      key={artist.id}
                      className="not-first:before:content-[',_']"
                    >
                      {artist.name}
                    </Link>
                  ))
                ) : (
                  <span>{t("variousArtists")}</span>
                )}
              </p>
              {releaseMapped.genres && (
                <p className="text-sm text-muted-foreground mt-1">
                  {releaseMapped.genres.map((genre) => (
                    <Link
                      href={`/releases?genres=${genre.id}`}
                      className="not-first:before:content-[',_'] hover:text-foreground transition-colors"
                      key={genre.id}
                    >
                      {genre.label}
                    </Link>
                  ))}
                </p>
              )}
              {releaseMapped.description && (
                <p className="text-sm text-foreground mt-4">
                  {releaseMapped.description}
                </p>
              )}

              {/* Platform links */}
              <div className="mt-6 flex gap-4">
                <PlayReleaseButton tracks={playerTracks} />
                {releaseMapped.plaftormLinks &&
                  Object.values(releaseMapped.plaftormLinks).some(Boolean) && (
                    <ListenDropdown links={releaseMapped.plaftormLinks} />
                  )}
                {releaseMapped.buyLinks &&
                  Object.values(releaseMapped.buyLinks).some(Boolean) && (
                    <BuyDropdown links={releaseMapped.buyLinks} />
                  )}
              </div>

              {/* Track list */}
              {releaseMapped.tracks && releaseMapped.tracks.length > 0 && (
                <div className="mt-8">
                  <div className="flex justify-between items-end mb-4">
                    <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {t("tracklist")}
                    </h2>
                  </div>
                  <ol className="divide-y divide-border">
                    {releaseMapped.tracks.map((track, index) => (
                      <li key={index} className="flex flex-col py-2">
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-muted-foreground w-6 text-right tabular-nums">
                            {index + 1}
                          </span>
                          <span className="text-sm text-foreground flex-1">
                            {track.title}
                          </span>
                          {track.url && (
                            <div className="flex gap-2">
                              <DownloadTrackButton url={track.url} />
                              <PlayTrackButton
                                tracks={playerTracks}
                                index={index}
                              />
                            </div>
                          )}
                        </div>
                        {track.artists && track.artists.length > 0 && (
                          <span className="text-xs text-muted-foreground mt-1 ml-10">
                            {track.artists.map((artist) => (
                              <Link
                                key={artist.id}
                                href={`/artists/${artist.id}`}
                                className="not-first:before:content-[',_']"
                              >
                                {artist.name}
                              </Link>
                            ))}
                          </span>
                        )}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>

          {/* Video clips */}
          {releaseMapped.videoClips && releaseMapped.videoClips.length > 0 && (
            <div className="mt-16">
              <h2 className="font-display text-2xl sm:text-3xl tracking-tight text-foreground mb-8">
                {t("videoClips")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {releaseMapped.videoClips.map((clip, index) => (
                  <VideoClipEmbed key={index} clip={clip} />
                ))}
              </div>
            </div>
          )}

          {/* Related releases */}
          {relatedReleases.length > 0 && (
            <div className="mt-16">
              <h2 className="font-display text-2xl sm:text-3xl tracking-tight text-foreground mb-8">
                {t("relatedReleases")}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8">
                {relatedReleases.map((release) => (
                  <Release key={release.id} release={release} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
