import React from "react";
import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";

import { Footer } from "@/components/footer";
import { getInitialPlaylist } from "@/components/player/initialPlaylist";

import "./globals.css";
import { Player, PlayerProvider, type Track } from "@/components/player";

const _dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const _playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Studio Bato | We ship songs",
  description:
    "An independent music label championing artists who define the future of sound. Discover our roster and latest releases.",
};

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${_dmSans.variable} ${_playfair.variable} font-sans antialiased mb-12`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <PlayerProvider initialPlaylist={getInitialPlaylist()}>
            <Navbar />
            <div className="mt-20 ">{children}</div>
            <Footer />
            <Player />
          </PlayerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
