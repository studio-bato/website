import { releases } from "@/data";
import { Release } from "@/components/release";

export default function Releases() {
  const sortedReleases = [...releases].sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <section id="releases" className="py-12 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-4xl sm:text-5xl tracking-tight text-foreground mb-16">
          Releases
        </h2>

        <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 xl:grid-cols-3 lg:gap-8">
          {sortedReleases.map((release, index) => (
            <Release release={release} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
