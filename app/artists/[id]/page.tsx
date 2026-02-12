import { artists } from "@/data";
import { redirect } from "next/navigation";
import { Artist } from "@/components/artist";

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

  return (
    <main>
      <section id="artist" className="py-12 lg:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <Artist artist={artist} />
        </div>
      </section>
    </main>
  );
}
