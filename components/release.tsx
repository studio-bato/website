import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";
import { ExternalLink } from "lucide-react";

import type { Release } from "@/data";

interface ReleaseProps {
  release: Release;
}
export function Release({ release }: ReleaseProps) {
  return (
    <Link
      href={`/releases/${release.id}`}
      className="group grid grid-cols-1 md:grid-cols-12 gap-6 cursor-pointer"
    >
      <div className="relative aspect-square overflow-hidden md:col-span-4">
        <Image
          src={release.cover || "/placeholder.svg"}
          alt={`${release.title} by ${release.artists.join(", ")} album cover`}
          fill
          className="object-cover transition-transform duration-700 md:group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center transition-opacity duration-300 opacity-0 md:group-hover:opacity-100 ">
          <div className="bg-background text-foreground p-3">
            <ExternalLink className="h-4 w-4" />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:col-span-8">
        <div className="flex-1 flex flex-col">
          <p className="text-xs text-muted-foreground mb-1">
            {release.type} &middot; {release.date}
          </p>
          <h3 className="font-display text-lg text-foreground leading-snug">
            {release.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            {release.artists.join(", ")}
          </p>
          <p className="text-sm text-muted-foreground mt-0.5">
            {release.genres.join(", ")}
          </p>
          <p className="text-sm text-foreground mt-2">{release.description}</p>
        </div>

        <div className="flex-col my-4 flex md:hidden">
          <div className="flex">
            <div className="inline-flex w-full justify-center items-center gap-1.5 text-md text-muted-foreground hover:text-foreground transition-colors border px-4 py-2 rounded-xl">
              Open
              <ExternalLink className="w-5 h-5 mr-2" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

/*


            {Object.entries(release.links).map(([platform, link]) => (
                
            ))}*/
