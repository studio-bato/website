import { getTranslations } from "next-intl/server";
import { getArtists, getReleases } from "@/data";

export async function AboutSection() {
  const t = await getTranslations("aboutSection");

  const releases = await getReleases();
  const artists = await getArtists();

  return (
    <section id="about" className="py-24 lg:py-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl tracking-tight text-foreground leading-tight text-balance">
              {t("title")}
            </h2>
          </div>

          <div className="flex flex-col gap-8">
            <p className="text-muted-foreground leading-relaxed text-lg">
              {t("description1")}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t("description2")}
            </p>

            <div className="grid grid-cols-2 gap-px bg-border mt-4">
              <div className="bg-background p-6">
                <p className="font-display text-3xl text-foreground">
                  {artists.length}+
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {t("artistsOnRoster")}
                </p>
              </div>
              <div className="bg-background p-6">
                <p className="font-display text-3xl text-foreground">
                  {releases.length}+
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {t("totalReleases")}
                </p>
              </div>
              <div className="bg-background p-6">
                <p className="font-display text-3xl text-foreground">5</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {t("artistResidencies")}
                </p>
              </div>
              <div className="bg-background p-6">
                <p className="font-display text-3xl text-foreground">4</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {t("countriesRepresented")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
