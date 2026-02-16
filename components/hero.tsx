import RandomVideoClip from "./random-videoclip";
import { getTranslations } from "next-intl/server";

export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section className="relative min-h-[calc(100dvh-16rem)] overflow-hidden flex flex-col justify-between">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 lg:py-32">
        <p className="text-sm text-muted-foreground tracking-widest uppercase mb-8">
          {t("subtitle")}
        </p>
        <h1 className="font-display text-5xl sm:text-7xl lg:text-[8rem] leading-[0.9] text-foreground text-center tracking-tight text-balance">
          {t("title1")}
          <br />
          {t("title2")}
        </h1>
        <p className="mt-8 text-muted-foreground text-center max-w-md leading-relaxed">
          {t("description")}
        </p>
      </div>

      <RandomVideoClip />
    </section>
  );
}
