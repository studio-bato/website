import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
import { getTranslations } from "next-intl/server";
import {JSX} from "react";

interface FeatListProps<T> {
    title: string;
    allUrl: string;
    items: T[];
    childComponent: (item: T) => JSX.Element;
}

export async function FeaturedList<T>({
    title,
    allUrl,
    items,
    childComponent,
                               }: FeatListProps<T>) {
  const t = await getTranslations("latestReleases");

  return (
    <section id="releases" className="border-border">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between mb-16">
          <h2 className="font-display text-4xl sm:text-5xl tracking-tight text-foreground">
            {title}
          </h2>
          <Link
            href={allUrl}
            className="ml-4 inline-flex items-center gap-1.5 text-md text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
          >
            <Button variant="outline">
              {t("viewAll")}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        <div className="flex w-full gap-4 lg:gap-8 overflow-x-scroll snap-x hide-scrollbar pb-2">
          {items.map((item, index) => (
              <div className="snap-start w-32 lg:w-64 shrink-0" key={index}>
                  {childComponent(item)}
              </div>
          ))}
        </div>
      </div>
    </section>
  );
}
