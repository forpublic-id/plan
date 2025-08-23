"use client";

import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Map, FileText, ArrowRight, Building2, Users, Globe } from "lucide-react";

export function Hero() {
  const t = useTranslations("home.hero");
  const pathname = usePathname();
  const currentLocale = pathname.startsWith("/en") ? "en" : "id";

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:20px_20px]" />
      
      <div className="container relative mx-auto px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8">
            <Badge variant="secondary" className="px-3 py-1">
              {currentLocale === "id" ? "Platform Transparansi Perencanaan" : "Planning Transparency Platform"}
            </Badge>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            {t("title")}
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl lg:text-2xl">
            {t("subtitle")}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="text-lg px-8 py-3">
              <Link href={`/${currentLocale}/maps`}>
                <Map className="mr-2 h-5 w-5" />
                {t("cta.primary")}
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3">
              <Link href={`/${currentLocale}/documents`}>
                <FileText className="mr-2 h-5 w-5" />
                {t("cta.secondary")}
              </Link>
            </Button>
          </div>

          {/* Feature Highlights */}
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:gap-8">
            <div className="flex flex-col items-center p-6 rounded-lg border border-border bg-card/50">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <Map className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {currentLocale === "id" ? "Peta Interaktif" : "Interactive Maps"}
              </h3>
              <p className="text-sm text-muted-foreground text-center">
                {currentLocale === "id" 
                  ? "Jelajahi peta zonasi dan tata ruang dengan visualisasi interaktif"
                  : "Explore zoning and spatial maps with interactive visualization"}
              </p>
            </div>

            <div className="flex flex-col items-center p-6 rounded-lg border border-border bg-card/50">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {currentLocale === "id" ? "Dokumen Lengkap" : "Complete Documents"}
              </h3>
              <p className="text-sm text-muted-foreground text-center">
                {currentLocale === "id" 
                  ? "Akses ribuan dokumen perencanaan dan peraturan resmi"
                  : "Access thousands of planning documents and official regulations"}
              </p>
            </div>

            <div className="flex flex-col items-center p-6 rounded-lg border border-border bg-card/50">
              <div className="rounded-full bg-primary/10 p-3 mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {currentLocale === "id" ? "Partisipasi Publik" : "Public Participation"}
              </h3>
              <p className="text-sm text-muted-foreground text-center">
                {currentLocale === "id" 
                  ? "Berpartisipasi dalam proses perencanaan pembangunan"
                  : "Participate in development planning processes"}
              </p>
            </div>
          </div>

          {/* Coverage Stats */}
          <div className="mt-16 p-8 rounded-2xl border border-border bg-card/30">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-primary">34</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {currentLocale === "id" ? "Provinsi" : "Provinces"}
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {currentLocale === "id" ? "Kota/Kabupaten" : "Cities/Regencies"}
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {currentLocale === "id" ? "Dokumen" : "Documents"}
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-primary">1M+</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {currentLocale === "id" ? "Data Zona" : "Zone Data"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}