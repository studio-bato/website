import { releases } from "@/data";
import { getReleaseArtists } from "@/data/utils";
import { VideoClipEmbed } from "@/components/video-clip-embed";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Videos | Studio Bato",
  description:
    "Watch music videos and visual content from Studio Bato artists.",
  openGraph: {
    title: "Videos | Studio Bato",
    description:
      "Watch music videos and visual content from Studio Bato artists.",
  },
};

export default function VideosPage() {
  const releasesWithVideos = releases.filter(
    (r) => r.videoClips && r.videoClips.length > 0,
  );

  return (
    <main>
      <section className="py-12 lg:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-4xl sm:text-5xl tracking-tight text-foreground mb-16">
            Videos
          </h2>

          <div className="space-y-8">
            {releasesWithVideos.map((release) => {
              const artists = getReleaseArtists(release);
              return (
                <div key={release.id}>
                  <div className="mb-6">
                    <Link
                      href={`/releases/${release.id}`}
                      className="font-display text-2xl sm:text-3xl tracking-tight text-foreground hover:text-foreground/80 transition-colors"
                    >
                      {release.title}
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">
                      {artists.map((a) => a.name).join(", ")}
                    </p>
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
