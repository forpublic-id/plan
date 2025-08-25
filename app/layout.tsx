import { GeistSans, GeistMono } from "geist/font";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://plan.forpublic.id"),
};

// Minimal root layout to avoid metadata conflicts
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#343434" />
        <meta name="msapplication-TileColor" content="#343434" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
