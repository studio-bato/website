"use client";

import { Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { icons } from "@/lib/icons";

import type { AudioPlatformLinks } from "@/data";

interface ListenDropdownProps {
  links: AudioPlatformLinks;
}

export function ListenDropdown({ links }: ListenDropdownProps) {
  const entries = Object.entries(links).filter(
    (entry): entry is [string, string] => typeof entry[1] === "string",
  );
  if (entries.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Headphones className="h-4 w-4" />
          Listen on platforms
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
