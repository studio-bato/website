import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { icons } from "@/lib/icons";
import { Anchor } from "lucide-react";

export async function Footer() {
  const t = await getTranslations("footer");

  const socials = [
    { label: "instagram", href: "https://instagram.com/studio.bato" },
    { label: "youtube", href: "https://www.youtube.com/@studiobato" },
    {
      label: "spotify",
      href: "https://open.spotify.com/playlist/7yFysgG2WnkdMiigB6pJLo?si=f68df9108ec54827&nd=1",
    },
    { label: "soundcloud", href: "https://soundcloud.com/studiobato" },
    { label: "github", href: "https://github.com/studio-bato" },
  ];

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex justify-between flex-col md:flex-row">
          <div>
            <Link
              href="/"
              className="font-display text-xl tracking-tight text-foreground"
            >
              StudioBato
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {t("description")}
            </p>
            <div className="mt-3 text-sm flex items-center  gap-2 text-muted-foreground italic leading-relaxed">
              <Anchor className="h-4 w-4" />
              <p className="text-sm">{t("location")}</p>
            </div>
          </div>

          <div className="flex gap-4 pt-8">
            {socials.map((social) => {
              const Icon = icons[social.label].icon;
              return (
                <Link
                  key={social.label}
                  href={social.href}
                  className="text-sm text-foreground/60 hover:text-foreground transition-colors"
                  aria-label={social.label}
                >
                  <Icon className="h-8 w-8" />
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-8 py-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">{t("copyright")}</p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("privacy")}
            </Link>
            <Link
              href="/terms"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
