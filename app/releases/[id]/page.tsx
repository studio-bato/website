import { getReleaseArtists, releases } from "@/data";
import { mapReleaseToPlayer } from "@/components/player/utils";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PlayTrackButton } from "@/components/player/play-track-button";
import { PlayReleaseButton } from "@/components/player/play-release-button";
import { ListenDropdown } from "@/components/listen-dropdown";
import { VideoClipEmbed } from "@/components/video-clip-embed";
import { artists } from "@/data";

export default async function ReleasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const release = releases.find((a) => a.id === id);
  if (!release) {
    redirect(`/404`);
  }

  const playerTracks = mapReleaseToPlayer(release);
  const releaseArtists = getReleaseArtists(release);

  return (
    <main>
      <section className="py-12 lg:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <Link
            href="/releases"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All releases
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            {/* Cover */}
            <div className="relative aspect-square overflow-hidden md:col-span-5">
              <Image
                src={release.cover || "/placeholder.svg"}
                alt={`${release.title} album cover`}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Info + tracklist */}
            <div className="flex flex-col md:col-span-7">
              <p className="text-xs text-muted-foreground mb-2">
                {release.type} &middot; {release.date}
              </p>
              <h1 className="font-display text-3xl sm:text-4xl tracking-tight text-foreground">
                {release.title}
              </h1>
              <p className="text-lg text-muted-foreground mt-1 flex gap-1">
                {releaseArtists.map((artist, index) => (
                  <span key={artist.id}>
                    <Link href={`/artists/${artist.id}`}>{artist.name}</Link>
                    {index < releaseArtists.length - 1 && ","}
                  </span>
                ))}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {release.genres.join(", ")}
              </p>
              {release.description && (
                <p className="text-sm text-foreground mt-4">
                  {release.description}
                </p>
              )}

              {/* Platform links */}
              <div className="mt-6 flex gap-4">
                <PlayReleaseButton tracks={mapReleaseToPlayer(release)} />
                {release.links && <ListenDropdown links={release.links} />}
              </div>

              {/* Track list */}
              {release.tracks && release.tracks.length > 0 && (
                <div className="mt-8">
                  <div className="flex justify-between items-end mb-4">
                    <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Tracklist
                    </h2>
                  </div>
                  <ol className="divide-y divide-border">
                    {release.tracks.map((track, index) => (
                      <li key={index} className="flex flex-col py-2">
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-muted-foreground w-6 text-right tabular-nums">
                            {index + 1}
                          </span>
                          <span className="text-sm text-foreground flex-1">
                            {track.title}
                          </span>
                          {track.url && (
                            <PlayTrackButton
                              tracks={playerTracks}
                              index={index}
                            />
                          )}
                        </div>
                        {track.artistIds && track.artistIds.length > 0 && (
                          <span className="text-xs text-muted-foreground mt-1 ml-10 space-x-1">
                            {track.artistIds.map((id, idx) => (
                              <Link key={id} href={`/artists/${id}`}>
                                {artists.find((a) => a.id === id)?.name || id}
                                {idx < track.artistIds.length - 1 && ","}
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
          {release.videoClips && release.videoClips.length > 0 && (
            <div className="mt-16">
              <h2 className="font-display text-2xl sm:text-3xl tracking-tight text-foreground mb-8">
                Video Clips
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {release.videoClips.map((clip, index) => (
                  <VideoClipEmbed key={index} clip={clip} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
