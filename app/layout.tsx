import React, { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getAllTracksPlaylist } from "@/data";
import { Player, PlayerProvider } from "@/components/player";
import { AllTracksInitializer } from "@/components/player/all-tracks-loader";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { getSession } from "@/app/admin/session";
import { connection } from "next/server";

const _dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const _playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

async function AllTracksLoader() {
  await connection();
  const allTracks = await getAllTracksPlaylist();
  return <AllTracksInitializer tracks={allTracks} />;
}

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    metadataBase: new URL(process.env.SITE_URL || ""),
    title: t("title"),
    description: t("description"),
    openGraph: {
      siteName: "StudioBato",
    },
  };
}

async function NavAuthed() {
  const authenticated = await getSession();
  return <Navbar isAdmin={authenticated} />;
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
        <Analytics />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <PlayerProvider>
              <Suspense>
                <AllTracksLoader />
              </Suspense>
              <Suspense fallback={<Navbar isAdmin={false} />}>
                <NavAuthed />
              </Suspense>
              <div className="mt-20">{children}</div>
              <Footer />
              <Suspense>{/*<Player />*/}</Suspense>
            </PlayerProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
