import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Plan ForPublic.id",
    default: "Plan ForPublic.id - Indonesian Planning Transparency",
  },
  description: "Comprehensive platform for Indonesian development planning transparency, zoning maps, and public participation in spatial planning.",
  keywords: [
    "Indonesian planning",
    "spatial planning",
    "zoning maps",
    "development planning",
    "transparency",
    "public participation",
    "RTRW",
    "RDTR",
    "planning documents"
  ],
  authors: [{ name: "ForPublic.id" }],
  creator: "ForPublic.id",
  publisher: "ForPublic.id",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    alternateLocale: "en_US",
    url: "https://plan.forpublic.id",
    siteName: "Plan ForPublic.id",
    title: "Plan ForPublic.id - Indonesian Planning Transparency",
    description: "Access Indonesian development plans, zoning maps, and participate in spatial planning transparency.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plan ForPublic.id - Indonesian Planning Transparency",
    description: "Access Indonesian development plans, zoning maps, and participate in spatial planning transparency.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head />
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}