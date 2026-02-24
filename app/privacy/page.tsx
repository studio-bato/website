import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("privacyPage");
  const title = t("metaTitle");
  const description = t("metaDescription");

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function Privacy() {
  const t = await getTranslations("privacyPage");

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[40dvh] flex flex-col items-center justify-center px-6 py-24 lg:py-32">
        <p className="text-sm text-muted-foreground tracking-widest uppercase mb-8">
          {t("subtitle")}
        </p>
        <h1 className="font-display text-5xl sm:text-7xl lg:text-[6rem] leading-[0.9] text-foreground text-center tracking-tight text-balance">
          {t("title")}
        </h1>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24 border-t border-border">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-2xl">
            <p className="text-muted-foreground leading-relaxed mb-12">
              {t("intro")}
            </p>

            <div className="space-y-12">
              <div>
                <h2 className="font-display text-2xl tracking-tight text-foreground mb-4">
                  {t("cookieTitle")}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("cookieText")}
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl tracking-tight text-foreground mb-4">
                  {t("dataTitle")}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("dataText")}
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl tracking-tight text-foreground mb-4">
                  {t("contactTitle")}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t.rich("contactText", {
                    link: (chunks) => (
                      <Link
                        href="/contact"
                        className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
                      >
                        {chunks}
                      </Link>
                    ),
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
