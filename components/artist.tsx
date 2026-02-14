"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getArtistReleases, type Artist } from "@/data";
import { CardRow } from "./CardRow";

export function Artist({ artist }: { artist: Artist }) {
  const releases = getArtistReleases(artist);

  return (
    <CardRow
      src={artist.image || "/placeholder.svg"}
      alt={`${artist.name} artist`}
      href={`/artists/${artist.id}`}
    >
      <div className="flex flex-col flex-1">
        <div className="flex justify-between">
          <h3 className="font-display text-2xl text-foreground">
            {artist.name}
          </h3>
          <ArrowUpRight className="h-3.5 w-3.5 mr-2" />
        </div>
        {/* <p className="text-sm text-muted-foreground leading-relaxed">
          {releases.length} releases
        </p> */}

        <p className="text-sm text-muted-foreground leading-relaxed mt-4">
          {artist.bio}
        </p>
      </div>
    </CardRow>
  );
}
