import { Hero } from "@/components/hero";
import { MarqueeBanner } from "@/components/marquee-banner";
import { FeaturedArtists } from "@/components/featured-artists";
import { LatestReleases } from "@/components/latest-releases";
import { AboutSection } from "@/components/about-section";
// import { Newsletter } from "@/components/newsletter";

export default function Page() {
  return (
    <main>
      <Hero />
      <MarqueeBanner />
      <LatestReleases />
      <FeaturedArtists />
      <AboutSection />
      {/* <Newsletter /> */}
    </main>
  );
}
