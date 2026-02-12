import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, Play } from "lucide-react";
import { ExternalLink } from "lucide-react";

import type { Release } from "@/data";

interface ReleaseProps {
  release: Release;
}
export function Release({ release }: ReleaseProps) {
  return (
    <Link
      href={`/releases/${release.id}`}
      className="group cursor-pointer py-2 hover:bg-card/50 "
    >
      <div className="flex items-start space-x-4 lg:space-x-8">
        <div className="relative aspect-[1/1] overflow-hidden w-36 lg:w-96 shrink-0">
          <Image
            src={release.cover || "/placeholder.svg"}
            alt={`${release.title} by ${release.artists.join(", ")} album cover`}
            fill
            className="object-cover group-hover:grayscale-0 transition-all duration-500"
          />
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex justify-between">
            <div className="text-xs text-muted-foreground mb-1">
              {release.type} &middot; {release.date}
            </div>
            <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              <ArrowUpRight className="h-3.5 w-3.5 mr-2" />
            </div>
          </div>
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
      </div>
    </Link>
  );
}

/*


            {Object.entries(release.links).map(([platform, link]) => (
                
            ))}*/
