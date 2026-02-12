import Link from "next/link";
import { releases } from "@/data";
import { Release } from "./release";
import { ArrowUpRight } from "lucide-react";

export function LatestReleases() {
  return (
    <section id="releases" className="py-24 lg:py-32 border-border">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-end mb-16">
          <h2 className="font-display text-4xl sm:text-5xl tracking-tight text-foreground">
            Latest Releases
          </h2>
          <Link
            href="/releases"
            className="ml-8 inline-flex items-center gap-1.5 text-md text-muted-foreground hover:text-foreground transition-colors border px-4 py-2 rounded-xl"
          >
            View all
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {releases.slice(0, 2).map((release, index) => (
            <Release release={release} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
