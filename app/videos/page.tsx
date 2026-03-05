import { getReleasesMapped } from "@/data";
import { VideoClipEmbed } from "@/components/video-clip-embed";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("videosPage");
  const title = t("metaTitle");
  const description = t("metaDescription");

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function VideosPage() {
  const t = await getTranslations("videosPage");

  const releasesWithVideos = (await getReleasesMapped()).filter(
    (r) => r.videoClips && r.videoClips.length > 0,
  );

  return (
    <main>
      <section className="py-4 lg:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-4xl sm:text-5xl tracking-tight text-foreground mb-16">
            {t("title")}
          </h2>

          <div className="space-y-8">
            {releasesWithVideos.map((release) => {
              return (
                <div key={release.id}>
                  <div className="mb-6">
                    <Link
                      href={`/releases/${release.id}`}
                      className="font-display text-2xl sm:text-3xl tracking-tight text-foreground hover:text-foreground/80 transition-colors"
                    >
                      {release.title}
                    </Link>
                    {release.artists && release.artists.length > 0 && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {release.artists.map((artist) => (
                          <Link
                            href={`/artists/${artist.id}`}
                            key={artist.id}
                            className="not-first:before:content-[',_']"
                          >
                            {artist.name}
                          </Link>
                        ))}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {release.videoClips!.map((clip, index) => (
                      <VideoClipEmbed key={index} clip={clip} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
