import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { icons } from "@/lib/icons";
export async function Footer() {
  const t = await getTranslations("footer");

  const footerLinks = {
    [t("labelSection")]: [
      { label: t("about"), href: "/about" },
      { label: t("artists"), href: "/artists" },
      { label: t("releases"), href: "/releases" },
    ],
    [t("connectSection")]: [
      { label: "Instagram", href: "https://instagram.com/studio.bato" },
      { label: "Youtube", href: "https://www.youtube.com/@studiobato" },
      {
        label: "Spotify",
        href: "https://open.spotify.com/playlist/7yFysgG2WnkdMiigB6pJLo?si=f68df9108ec54827&nd=1",
      },
      { label: "SoundCloud", href: "https://soundcloud.com/studiobato" },
    ],
    [t("infoSection")]: [{ label: t("contact"), href: "/contact" }],
  };

  const socials = [
    { label: "instagram", href: "https://instagram.com/studio.bato" },
    { label: "youtube", href: "https://www.youtube.com/@studiobato" },
    {
      label: "spotify",
      href: "https://open.spotify.com/playlist/7yFysgG2WnkdMiigB6pJLo?si=f68df9108ec54827&nd=1",
    },
    { label: "soundcloud", href: "https://soundcloud.com/studiobato" },
  ];

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <Link
              href="/"
              className="font-display text-xl tracking-tight text-foreground"
            >
              Studio Bato
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {t("description")}
              <br />
              <span className="italic">{t("location")}</span>
            </p>
          </div>

          <div className="flex gap-4 py-4 ">
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

        <div className="mt-16 pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">{t("copyright")}</p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              {t("privacy")}
            </Link>
            <Link
              href="#"
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
