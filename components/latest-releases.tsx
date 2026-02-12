import Link from "next/link";
import { releases } from "@/data";
import { Release } from "./release";
import { ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";

export function LatestReleases() {
  return (
    <section id="releases" className="py-24 lg:py-32 border-border">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between mb-16">
          <h2 className="font-display text-4xl sm:text-5xl tracking-tight text-foreground">
            Latest Releases
          </h2>
          <Link
            href="/releases"
            className="ml-4 inline-flex items-center gap-1.5 text-md text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
          >
            <Button variant="outline">
              View all
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        <div className="flex flex-col">
          {releases.slice(0, 2).map((release, index) => (
            <Release release={release} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
