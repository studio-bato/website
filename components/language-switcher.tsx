"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const localeLabels: Record<string, string> = {
  fr: "FR",
  en: "EN",
  de: "DE",
};

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function onChange(nextLocale: string) {
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <div className="flex items-center gap-1 text-sm">
      {routing.locales.map((loc) => (
        <button
          key={loc}
          onClick={() => onChange(loc)}
          className={`px-1.5 py-1 transition-colors ${
            loc === locale
              ? "text-foreground font-medium"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {localeLabels[loc]}
        </button>
      ))}
    </div>
  );
}
