import { getTranslations } from "next-intl/server";
import { FeaturedList } from "@/components/featured-list";
import { Artist } from "./artist";
import {artists} from "@/data";
import { connection } from "next/server";

export async function FeaturedArtists() {
  await connection();
  const t = await getTranslations("featuredArtists");
  const featuredArtists = artists.sort(() => Math.random() - 0.5).slice(0, 8);

  return (
      <div className="py-12">
      <FeaturedList<typeof featuredArtists[number]>
          items={featuredArtists}
          allUrl={"/artists"}
          childComponent={(artist) => <Artist artist={artist} />}
          title={t("title")}
      />
      </div>
  );
}


