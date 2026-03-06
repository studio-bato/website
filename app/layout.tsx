import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(process.env.SITE_URL || ""),
    title: "StudioBato",
    description: "We ship songs",
    openGraph: {
      siteName: "StudioBato",
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
