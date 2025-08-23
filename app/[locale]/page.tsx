import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { Statistics } from "@/components/sections/Statistics";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("home");

  return (
    <div className="space-y-0">
      <Hero />
      <Features />
      <Statistics />
    </div>
  );
}