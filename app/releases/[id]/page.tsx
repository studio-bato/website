import { releases } from "@/data";
import { mapReleaseToPlayer } from "@/components/player/utils";
import { redirect } from "next/navigation";
import { Release } from "@/components/release";
import { PlayReleaseButton } from "@/components/player/play-release-button";

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

  return (
    <main>
      <section id="artist" className="py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <Release release={release} />
          <div className="mt-6">
            <PlayReleaseButton tracks={mapReleaseToPlayer(release)} />
          </div>
        </div>
      </section>
    </main>
  );
}
