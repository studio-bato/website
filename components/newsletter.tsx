"use client";

import React from "react";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export function Newsletter() {
  const t = useTranslations("newsletter");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 border-t border-border">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-xl">
          <h2 className="font-display text-4xl sm:text-5xl tracking-tight text-foreground text-balance">
            {t("title")}
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {t("description")}
          </p>

          {submitted ? (
            <div className="mt-8 py-4 border-t border-foreground">
              <p className="text-foreground">{t("success")}</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex items-center border-b border-foreground"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                {t("emailLabel")}
              </label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 bg-transparent py-4 text-foreground placeholder:text-muted-foreground focus:outline-hidden text-lg"
              />
              <button
                type="submit"
                className="text-foreground hover:text-muted-foreground transition-colors p-4"
                aria-label={t("subscribe")}
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
