"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { icons } from "@/lib/icons";
import { useTranslations } from "next-intl";

import type { BuyLinks } from "@/data";

interface ListenDropdownProps {
  links: BuyLinks;
}

export function BuyDropdown({ links }: ListenDropdownProps) {
  const t = useTranslations("releaseDetail");
  const entries = Object.entries(links).filter(
    (entry): entry is [string, string] => typeof entry[1] === "string",
  );
  if (entries.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <ShoppingCart className="h-4 w-4" />
          {t("buy")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {entries.map(([platform, url]) => {
          const entry = icons[platform];
          const Icon = entry?.icon;
          return (
            <DropdownMenuItem key={platform} asChild>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 cursor-pointer"
              >
                {Icon && <Icon className="h-4 w-4" />}
                {entry?.label ?? platform}
              </a>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
