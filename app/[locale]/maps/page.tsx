import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { InteractiveMap } from "@/components/planning";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "maps" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function MapsRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("maps");

  return (
    <>
      <div className="relative w-full h-full">
        {/* Floating Header Section */}
        <div className="absolute top-4 right-4 z-[1001] bg-white/95 backdrop-blur-sm border border-border rounded-lg px-4 py-3 shadow-lg max-w-sm">
          <h1 className="text-lg font-bold mb-1">{t("title")}</h1>
          <p className="text-muted-foreground text-sm">{t("subtitle")}</p>
        </div>
        
        {/* Full Map */}
        <InteractiveMap height="100%" />
        
        {/* Floating Footer */}
        <div className="absolute bottom-4 left-4 z-[1001] bg-neutral-900/90 backdrop-blur-sm text-neutral-100 rounded-lg px-3 py-2 shadow-lg text-xs max-w-xs">
          <div className="flex items-center space-x-2">
            <Image
              src="/logo.svg"
              alt="ForPublic.id"
              width={16}
              height={16}
              className="w-4 h-4"
            />
            <span className="font-medium">
              Plan ForPublic<span className="text-red-500">.id</span>
            </span>
          </div>
          <div className="mt-1 text-neutral-300">
            {locale === "id" 
              ? "Inisiatif komunitas untuk transparansi perencanaan"
              : "Community initiative for planning transparency"}
          </div>
          <div className="mt-1 text-neutral-400 text-[10px]">
            © {new Date().getFullYear()} ForPublic.id
          </div>
        </div>
      </div>
    </>
  );
}
