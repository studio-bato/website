import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <div className="flex flex-col items-center align-center text-muted-foreground">
      <h2>{t("title")}</h2>
      <Link
        href="/"
        className="my-8 inline-flex items-center gap-1.5 text-md text-muted-foreground hover:text-foreground transition-colors border px-4 py-2 rounded-xl "
      >
        {t("goHome")}
        <ArrowUpRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}
