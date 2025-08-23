import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import { MapPage } from "@/components/pages/MapPage";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "maps" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function MapsRoute({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return <MapPage locale={locale} />;
}