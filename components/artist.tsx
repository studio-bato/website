import { ArrowUpRight } from "lucide-react";
import { type Artist, getMediaUrl } from "@/data";
import { CardRow } from "./card-row";

export async function Artist({ artist }: { artist: Artist }) {
  // const artistMapped = await getArtistByIdMapped(artist.id);
  // if (!artistMapped) return null;

  return (
    <CardRow
      src={getMediaUrl(artist.image) || "/placeholder-artist.svg"}
      alt={`${artist.name} artist`}
      href={`/artists/${artist.id}`}
    >
      <div className="flex flex-col flex-1">
        <div className="flex justify-between">
          <h3 className="font-display text-md lg:text-2xl text-foreground">
            {artist.name}
          </h3>
          <ArrowUpRight className="h-3.5 w-3.5 mr-2" />
        </div>
        {/* <p className="text-sm text-muted-foreground leading-relaxed">
          {artistMapped.releases.length} releases
        </p> */}

        <p className="text-sm text-muted-foreground leading-relaxed mt-4">
          {artist.bio}
        </p>
      </div>
    </CardRow>
  );
}
