"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  Map,
  FileText,
  Search,
  BarChart3,
  Users,
  Code,
  Layers,
  Download,
  MessageSquare,
  Calendar,
  Globe,
  Zap,
} from "lucide-react";

export function Features() {
  const t = useTranslations("home.features");

  const features = [
    {
      icon: Map,
      title: t("items.interactiveMaps.title"),
      description: t("items.interactiveMaps.description"),
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: FileText,
      title: t("items.documentLibrary.title"),
      description: t("items.documentLibrary.description"),
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Search,
      title: t("items.planningSearch.title"),
      description: t("items.planningSearch.description"),
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: BarChart3,
      title: t("items.developmentAnalytics.title"),
      description: t("items.developmentAnalytics.description"),
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: Users,
      title: t("items.publicParticipation.title"),
      description: t("items.publicParticipation.description"),
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      icon: Code,
      title: t("items.developerTools.title"),
      description: t("items.developerTools.description"),
      color: "text-gray-600",
      bgColor: "bg-gray-50",
    },
  ];

  const additionalFeatures = [
    {
      icon: Layers,
      title: "Layer Control",
      description:
        "Advanced map layer management with opacity controls and filtering options",
    },
    {
      icon: Download,
      title: "Data Export",
      description:
        "Export planning data in multiple formats including GeoJSON, Shapefile, and PDF",
    },
    {
      icon: MessageSquare,
      title: "Public Comments",
      description:
        "Submit and view public comments on development proposals and planning documents",
    },
    {
      icon: Calendar,
      title: "Event Tracking",
      description:
        "Track public hearings, consultation periods, and planning milestones",
    },
    {
      icon: Globe,
      title: "Bilingual Support",
      description:
        "Full Indonesian and English support for documents and interface",
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description:
        "Get notifications about planning changes and new document publications",
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="transition-all hover:shadow-lg border-0 bg-card"
              >
                <CardHeader>
                  <div
                    className={`inline-flex p-3 rounded-lg ${feature.bgColor} w-fit mb-4`}
                  >
                    <Icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Features */}
        <div className="border-t border-border pt-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              More Features
            </h3>
            <p className="text-muted-foreground">
              Comprehensive tools for planning transparency and public
              engagement
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-6 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors"
                >
                  <div className="flex-shrink-0">
                    <Icon className="h-5 w-5 text-primary mt-0.5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Integration Showcase */}
        <div className="mt-16 p-8 rounded-2xl border border-border bg-card/50">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Integrated Planning Ecosystem
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Seamlessly connect spatial planning with budget allocation,
              development projects, and community engagement for comprehensive
              planning transparency.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Spatial Planning
              </div>
              <div className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Budget Integration
              </div>
              <div className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Project Tracking
              </div>
              <div className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Public Engagement
              </div>
              <div className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Environmental Impact
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
