import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("termsPage");
  const title = t("metaTitle");
  const description = t("metaDescription");

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function Terms({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("termsPage");

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
            <div className="space-y-12">
              <div>
                <h2 className="font-display text-2xl tracking-tight text-foreground mb-4">
                  {t("publisherTitle")}
                </h2>
                <div className="text-muted-foreground leading-relaxed space-y-1">
                  <p className="font-medium text-foreground">
                    {t("publisherName")}
                  </p>
                  <p>{t("publisherType")}</p>
                  <p>{t("publisherSiren")}</p>
                  <a
                    href="https://annuaire-entreprises.data.gouv.fr/entreprise/culture-a-flot-848780029"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors mt-2"
                  >
                    {t("publisherRegistry")}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl tracking-tight text-foreground mb-4">
                  {t("hostingTitle")}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("hostingText")}
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
