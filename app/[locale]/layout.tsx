import React, { Suspense } from "react";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { getAllTracksPlaylist } from "@/data";
import { Player, PlayerProvider } from "@/components/player";
import { AllTracksInitializer } from "@/components/player/all-tracks-loader";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import { getSession } from "@/app/[locale]/admin/session";
import { connection } from "next/server";
import { routing } from "@/i18n/routing";

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

async function NavAuthed() {
  const authenticated = await getSession();
  return <Navbar isAdmin={authenticated} />;
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  setRequestLocale(locale);
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
            enableSystem={true}
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
              <Suspense>
                <Player />
              </Suspense>
            </PlayerProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
