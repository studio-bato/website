import { releases } from "@/data";
import { Release } from "@/components/release";

export default function Releases() {
  return (
    <section id="releases" className="py-12 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-4xl sm:text-5xl tracking-tight text-foreground mb-16">
          Releases
        </h2>

        <div className="flex flex-col">
          {releases.map((release, index) => (
            <Release release={release} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
