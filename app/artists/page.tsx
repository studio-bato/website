import { artists } from "@/data";
import { Artist } from "@/components/artist";

export default function Artists() {
  return (
    <section id="artists" className="py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-4xl sm:text-5xl tracking-tight text-foreground mb-16">
          Artists
        </h2>

        <div className="flex flex-col">
          {artists.map((artist, index) => (
            <Artist artist={artist} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
