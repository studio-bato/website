import { releases } from "@/data";
import { Release } from "./release";
import { getTranslations } from "next-intl/server";
import { FeaturedList } from "@/components/featured-list";

export async function FeaturedReleases() {
  const t = await getTranslations("latestReleases");

  const featuredReleases = releases.slice(0, 8);

  return (
    <div className="pt-12">
      <FeaturedList<(typeof releases)[number]>
        items={featuredReleases}
        allUrl={"/releases"}
        childComponent={(release) => <Release release={release} />}
        title={t("title")}
      />
    </div>
  );
}
