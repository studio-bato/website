"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { artists } from "@/data";
import { Artist } from "./artist";
import { Button } from "./ui/button";

export function FeaturedArtists() {
  return (
    <section id="artists" className="py-24 lg:py-32 border-t">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between mb-16">
          <h2 className="font-display text-4xl sm:text-5xl tracking-tight text-foreground">
            Featured Artists
          </h2>
          <Link
            href="/artists"
            className="ml-4 inline-flex items-center gap-1.5 text-md text-muted-foreground hover:text-foreground transition-colors"
          >
            <Button variant="outline">
              View all
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
        <div className="flex flex-col">
          {artists.slice(0, 2).map((artist, index) => (
            <Artist artist={artist} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
