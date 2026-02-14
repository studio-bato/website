import { releases } from "@/data";
import { getReleaseArtists } from "@/data/utils";
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
                    {release.videoClips!.map((clip, index) => {
                      const ytMatch = clip.url.match(/[?&]v=([a-zA-Z0-9_-]+)/);
                      if (ytMatch) {
                        return (
                          <div key={index}>
                            <div className="relative w-full aspect-video overflow-hidden">
                              <iframe
                                className="absolute inset-0 w-full h-full"
                                src={`https://www.youtube.com/embed/${ytMatch[1]}`}
                                title={clip.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                              ></iframe>
                            </div>
                            <p className="text-sm font-medium text-foreground mt-3">
                              {clip.title}
                            </p>
                          </div>
                        );
                      }
                      return (
                        <a
                          key={index}
                          href={clip.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-foreground hover:text-foreground/80 transition-colors"
                        >
                          {clip.title}
                        </a>
                      );
                    })}
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
