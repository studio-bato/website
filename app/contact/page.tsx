import { Mail, Anchor } from "lucide-react";
import { SiInstagram } from "@icons-pack/react-simple-icons";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { richLineBreaker } from "@/i18n/rich-text";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contactPage");
  const title = t("metaTitle");
  const description = t("metaDescription");

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function Contact() {
  const t = await getTranslations("contactPage");

  return (
    <main>
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-6 py-12 lg:py-24">
        <p className="text-sm text-muted-foreground tracking-widest uppercase mb-8">
          {t("subtitle")}
        </p>
        <h1 className="font-display text-5xl sm:text-7xl lg:text-[6rem] leading-[0.9] text-foreground text-center tracking-tight text-balance">
          {t("title1")}
          <br />
          {t("title2")}
        </h1>
        <p className="mt-8 text-muted-foreground text-center max-w-lg leading-relaxed">
          {t.rich("heroDescription", richLineBreaker)}
        </p>
      </section>

      {/* Contact methods */}
      <section className="py-12 border-t border-border">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
            <a
              href="https://instagram.com/studio.bato"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-background p-10 sm:p-16 flex flex-col gap-6 group hover:bg-muted/30 transition-colors"
            >
              <SiInstagram className="h-6 w-6 text-muted-foreground group-hover:text-foreground transition-colors" />
              <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-foreground">
                {t("instagramTitle")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("instagramDesc")}
              </p>
              <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                @studio.bato
              </p>
            </a>

            <a
              href="mailto:cultureaflot@gmail.com"
              className="bg-background p-10 sm:p-16 flex flex-col gap-6 group hover:bg-muted/30 transition-colors"
            >
              <Mail className="h-6 w-6 text-muted-foreground group-hover:text-foreground transition-colors" />
              <h2 className="font-display text-3xl sm:text-4xl tracking-tight text-foreground">
                {t("emailTitle")}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t("emailDesc")}
              </p>
              <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                cultureaflot@gmail.com
              </p>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
