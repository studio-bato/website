import { releases } from "@/data";
import { getReleaseArtists } from "@/data/utils";
import { VideoClipEmbed } from "@/components/video-clip-embed";
import Link from "next/link";

export default function VideosPage() {
  const releasesWithVideos = releases.filter(
    (r) => r.videoClips && r.videoClips.length > 0,
  );

  return (
    <main>
      <section className="py-12 lg:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="font-display text-3xl sm:text-4xl tracking-tight text-foreground mb-12">
            Videos
          </h1>

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
