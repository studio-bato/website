"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import NextLink from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export function Navbar({ isAdmin = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("nav");

  const navLinks = [
    { label: t("releases"), href: "/releases" },
    { label: t("artists"), href: "/artists" },
    { label: t("videos"), href: "/videos" },
    { label: t("about"), href: "/about" },
    { label: t("contact"), href: "/contact" },
  ];

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
            {isAdmin && (
              <NextLink
                href="/admin"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Admin
              </NextLink>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            <Button
              variant="ghost"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex items-center gap-2"
              aria-label={t("browse")}
            >
              <span className="text-[10px] font-medium uppercase tracking-widest">
                {isOpen ? t("closeMenu") : t("browse")}
              </span>
              {isOpen ? (
                <X className="h-7 w-7" />
              ) : (
                <Menu className="h-7 w-7" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background border-t border-b border-border">
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
            {isAdmin && (
              <NextLink
                href="/admin"
                onClick={() => setIsOpen(false)}
                className="text-lg text-muted-foreground hover:text-foreground transition-colors"
              >
                Admin
              </NextLink>
            )}
            <div className="flex items-center gap-2 pt-2 border-t border-border">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
