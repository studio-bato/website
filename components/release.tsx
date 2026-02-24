import { ArrowUpRight } from "lucide-react";
import { getReleaseByIdMapped, type Release } from "@/data";
import { CardRow } from "./card-row";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

interface ReleaseProps {
  release: Release;
}

export async function Release({ release }: ReleaseProps) {
  const t = await getTranslations("releaseDetail");
  const releaseMapped = await getReleaseByIdMapped(release.id);
  if (!releaseMapped) return null;

  return (
    <CardRow
      src={releaseMapped.cover || "/placeholder-release.svg"}
      alt={`${releaseMapped.title} album cover`}
      href={`/releases/${releaseMapped.id}`}
    >
      <div className="flex flex-col flex-1">
        <div className="flex justify-between">
          <div className="text-xs lg:text-md text-muted-foreground mb-1">
            {releaseMapped.type} &middot; {releaseMapped.date}
          </div>
          <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
            <ArrowUpRight className="h-3.5 w-3.5 mr-2" />
          </div>
        </div>
        <h3 className="font-display text-md lg:text-lg text-foreground leading-snug">
          {releaseMapped.title}
        </h3>
        <p className="text-sm lg:text-md text-muted-foreground mt-0.5">
          {releaseMapped.artists && releaseMapped.artists.length
            ? releaseMapped.artists.map((a) => (
                <span className="not-first:before:content-[',_']" key={a.id}>
                  {a.name}
                </span>
              ))
            : t("variousArtists")}
        </p>
        {releaseMapped.genres && (
          <p className="text-xs lg:text-md text-muted-foreground mt-0.5">
            {releaseMapped.genres.map((g) => (
              <span className="not-first:before:content-[',_']" key={g.id}>
                {g.label}
              </span>
            ))}
          </p>
        )}
      </div>
    </CardRow>
  );
}
