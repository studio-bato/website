import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/hero";
import { MarqueeBanner } from "@/components/marquee-banner";
import { FeaturedArtists } from "@/components/featured-artists";
import { FeaturedReleases } from "@/components/featured-releases";
import { AboutSection } from "@/components/about-section";

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
      <FeaturedReleases />
      <FeaturedArtists />
      {/*<AboutSection />*/}
    </main>
  );
}
