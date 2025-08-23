import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { DocumentLibrary } from "@/components/planning";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "documents" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function DocumentsRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("documents");
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>
      <DocumentLibrary documents={[]} locale={locale as "id" | "en"} />
    </div>
  );
}