"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useTranslations } from "next-intl";

export function Navbar({ isAdmin = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("nav");

  let navLinks = [
    { label: t("releases"), href: "/releases" },
    { label: t("artists"), href: "/artists" },
    { label: t("videos"), href: "/videos" },
    { label: t("about"), href: "/about" },
    { label: t("contact"), href: "/contact" },
  ];

  if (isAdmin) navLinks = [...navLinks, { label: "Admin", href: "/admin" }];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xs h-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="font-display text-2xl tracking-tight text-foreground"
          >
            STUDIO BATO
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-foreground"
              aria-label={isOpen ? t("closeMenu") : t("openMenu")}
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="px-6 py-8 flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
