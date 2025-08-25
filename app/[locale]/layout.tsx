import type React from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";
import {
  generateMetadata as generateSEOMetadata,
  generateStructuredData,
  siteConfig,
} from "@/lib/seo";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";

const locales = ["id", "en"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const localeTyped = locale as "id" | "en";

  // Generate comprehensive SEO metadata
  const metadata = generateSEOMetadata("home", localeTyped);

  // Add specific template and default titles
  return {
    ...metadata,
    metadataBase: siteConfig.metadataBase,
    title: {
      template: `%s | ${siteConfig.name}`,
      default: metadata.title as string,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || "id";
  const localeTyped = locale as "id" | "en";

  if (!locales.includes(locale)) notFound();

  // Generate structured data
  const structuredData = generateStructuredData("home", localeTyped);
  const messages = await getMessages({ locale });

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            structuredData.organization,
            structuredData.website,
            structuredData.breadcrumb,
          ]),
        }}
      />
      <NextIntlClientProvider messages={messages}>
        <ConditionalLayout>{children}</ConditionalLayout>
      </NextIntlClientProvider>
    </>
  );
}
