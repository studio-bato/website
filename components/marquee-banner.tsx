import { getArtists, getReleases } from "@/data";
import { getTranslations } from "next-intl/server";

export async function MarqueeBanner() {
  const t = await getTranslations("marquee");

  const artists = await getArtists();
  const releases = await getReleases();

  return (
    <div className="border-y border-border py-5">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-center justify-between gap-6 text-sm text-muted-foreground">
          <span>
            {artists.length}+ {t("artists")}
          </span>
          <span className="hidden sm:inline text-border">{"/"}</span>
          <span>
            {releases.length}+ {t("releases")}
          </span>
          <span className="hidden sm:inline text-border">{"/"}</span>
          <span>{t("established")}</span>
        </div>
      </div>
    </div>
  );
}
