import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { DocumentsPage } from "@/components/pages/DocumentsPage";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "documents" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function DocumentsRoute({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return <DocumentsPage locale={locale} />;
}