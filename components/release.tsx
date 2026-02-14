import { ArrowUpRight } from "lucide-react";
import { getReleaseArtists, type Release } from "@/data";
import { CardRow } from "./CardRow";

interface ReleaseProps {
  release: Release;
}
export function Release({ release }: ReleaseProps) {
  const artists = getReleaseArtists(release);

  return (
    <CardRow
      src={release.cover || "/placeholder.svg"}
      alt={`${release.title} album cover`}
      href={`/releases/${release.id}`}
    >
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
        <p className="text-md text-muted-foreground mt-0.5">
          {artists.map((a) => a.name).join(", ")}
        </p>
        <p className="text-sm text-muted-foreground mt-0.5">
          {release.genres.join(", ")}
        </p>
        <p className="text-sm text-foreground mt-2">{release.description}</p>
      </div>
    </CardRow>
  );
}
