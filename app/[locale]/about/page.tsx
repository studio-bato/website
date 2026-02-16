import {
  Anchor,
  Music,
  Mic,
  SlidersHorizontal,
  Radio,
  Share2,
  Video,
  Ship,
} from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function About({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("aboutPage");

  const services = [
    { icon: Music, title: t("productionTitle"), description: t("productionDesc") },
    { icon: Mic, title: t("recordingTitle"), description: t("recordingDesc") },
    { icon: SlidersHorizontal, title: t("mixingTitle"), description: t("mixingDesc") },
    { icon: Radio, title: t("distributionTitle"), description: t("distributionDesc") },
    { icon: Share2, title: t("communicationTitle"), description: t("communicationDesc") },
    { icon: Video, title: t("videoClipsTitle"), description: t("videoClipsDesc") },
  ];

  const residencyDetails = [
    { value: "2–4", label: t("weeksOnBoard") },
    { value: "24/7", label: t("studioAccess") },
    { value: "1", label: t("liveShowIncluded") },
    { value: "100%", label: t("yourProject") },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[60dvh] flex flex-col items-center justify-center px-6 py-24 lg:py-32">
        <p className="text-sm text-muted-foreground tracking-widest uppercase mb-8">
          {t("subtitle")}
        </p>
        <h1 className="font-display text-5xl sm:text-7xl lg:text-[6rem] leading-[0.9] text-foreground text-center tracking-tight text-balance">
          {t("title1")}
          <br />
          {t("title2")}
        </h1>
        <p className="mt-8 text-muted-foreground text-center max-w-lg leading-relaxed">
          {t("heroDescription")}
        </p>
      </section>

      {/* Story */}
      <section className="py-24 lg:py-32 border-t border-border">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <Anchor className="h-8 w-8 text-muted-foreground mb-6" />
              <h2 className="font-display text-4xl sm:text-5xl tracking-tight text-foreground leading-tight text-balance">
                {t("storyTitle")}
              </h2>
            </div>

            <div className="flex flex-col gap-8">
              <p className="text-muted-foreground leading-relaxed text-lg">
                {t("storyP1")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t("storyP2")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t("storyP3")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 lg:py-32 border-t border-border">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16">
            <h2 className="font-display text-4xl sm:text-5xl tracking-tight text-foreground">
              {t("servicesTitle")}
            </h2>
            <p className="mt-6 text-muted-foreground max-w-2xl leading-relaxed text-lg">
              {t("servicesDescription")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-background p-10 sm:p-12 flex flex-col gap-4"
              >
                <service.icon className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-display text-xl text-foreground">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Artist Residency */}
      <section className="py-24 lg:py-32 border-t border-border">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <Ship className="h-8 w-8 text-muted-foreground mb-6" />
              <h2 className="font-display text-4xl sm:text-5xl tracking-tight text-foreground leading-tight text-balance">
                {t("residencyTitle")}
              </h2>
              <p className="mt-6 text-muted-foreground leading-relaxed text-lg">
                {t("residencyDescription")}
              </p>
            </div>

            <div className="flex flex-col gap-8">
              <p className="text-muted-foreground leading-relaxed">
                {t("residencyP1")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t("residencyP2")}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t("residencyP3")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border mt-16">
            {residencyDetails.map((detail) => (
              <div key={detail.label} className="bg-background p-6">
                <p className="font-display text-3xl text-foreground">
                  {detail.value}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {detail.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
