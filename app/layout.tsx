import React from "react";
import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getInitialPlaylist } from "@/components/player/initialPlaylist";
import { Player, PlayerProvider } from "@/components/player";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";

import "./globals.css";

const _dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const _playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    metadataBase: new URL("https://studiobato.com"),
    title: t("title"),
    description: t("description"),
    openGraph: {
      siteName: "Studio Bato",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${_dmSans.variable} ${_playfair.variable} font-sans antialiased mb-12`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <PlayerProvider initialPlaylist={getInitialPlaylist()}>
              <Navbar />
              <div className="mt-20">{children}</div>
              <Footer />
              <Player />
            </PlayerProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
