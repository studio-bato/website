"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin/artists", label: "Artists" },
  { href: "/admin/releases", label: "Releases" },
  { href: "/admin/genres", label: "Genres" },
];

export function AdminNav({ logoutAction }: { logoutAction: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="border-b mb-4">
      <div className="container mx-auto px-4 flex items-center gap-6 h-14">
        <span className="font-display text-lg tracking-tight font-semibold">
          Admin
        </span>
        <div className="w-px h-5 bg-border" />
        <div className="flex-1 flex gap-6">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "text-sm transition-colors border-b-2 h-14 flex items-center",
                pathname === href
                  ? "border-foreground text-foreground font-medium"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {label}
            </Link>
          ))}
        </div>
        <div className="w-px h-5 bg-border" />
        <div className="">
          <button
            className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            onClick={logoutAction}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
