import { Hero } from "@/components/hero";
import { MarqueeBanner } from "@/components/marquee-banner";
import { FeaturedArtists } from "@/components/featured-artists";
import { FeaturedReleases } from "@/components/featured-releases";
import { AboutSection } from "@/components/about-section";

export default function Page() {
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
