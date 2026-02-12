"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Artist } from "@/data";

export function Artist({ artist }: { artist: Artist }) {
  return (
    <Link
      key={artist.name}
      href={`/artists/${artist.id}`}
      className="group grid grid-cols-1 md:grid-cols-12 gap-6 items-center even:border-y last:border-b-0 py-4 border-border hover:bg-card/50 transition-colors -mx-6 px-6"
    >
      <div className="md:col-span-3">
        <div className="relative aspect-[1/1] overflow-hidden w-full max-w-[200px]">
          <Image
            src={artist.image || "/placeholder.svg"}
            alt={`${artist.name} artist`}
            fill
            className="object-cover group-hover:grayscale-0 transition-all duration-500"
          />
        </div>
      </div>
      <div className="md:col-span-3">
        <h3 className="font-display text-2xl text-foreground">{artist.name}</h3>
      </div>
      <div className="md:col-span-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {artist.bio}
        </p>
      </div>
      <div className="md:col-span-1 flex justify-end">
        <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
      </div>
    </Link>
  );
}
