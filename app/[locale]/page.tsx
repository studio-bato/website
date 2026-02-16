import { Hero } from "@/components/hero";
import { MarqueeBanner } from "@/components/marquee-banner";
import { FeaturedArtists } from "@/components/featured-artists";
import { LatestReleases } from "@/components/latest-releases";
import { AboutSection } from "@/components/about-section";
import { setRequestLocale } from "next-intl/server";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <Hero />
      <MarqueeBanner />
      <LatestReleases />
      <FeaturedArtists />
      <AboutSection />
    </main>
  );
}
