"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { FileText, Map, Building2, Users, TrendingUp, Clock } from "lucide-react";

export function Statistics() {
  const t = useTranslations("home.statistics");

  const mainStats = [
    {
      icon: FileText,
      value: t("items.plans.value"),
      label: t("items.plans.label"),
      trend: "+15%",
      description: "Planning documents and regulations",
    },
    {
      icon: Map,
      value: t("items.regions.value"),
      label: t("items.regions.label"),
      trend: "Complete",
      description: "All provinces covered",
    },
    {
      icon: Building2,
      value: t("items.maps.value"),
      label: t("items.maps.label"),
      trend: "+23%",
      description: "Interactive zoning maps",
    },
    {
      icon: Users,
      value: t("items.projects.value"),
      label: t("items.projects.label"),
      trend: "+40%",
      description: "Tracked development projects",
    },
  ];

  const detailStats = [
    {
      category: "Document Types",
      items: [
        { label: "RTRW Plans", value: "184", percentage: 35 },
        { label: "RDTR Plans", value: "156", percentage: 30 },
        { label: "Master Plans", value: "89", percentage: 17 },
        { label: "Regulations", value: "95", percentage: 18 },
      ]
    },
    {
      category: "Data Coverage",
      items: [
        { label: "Urban Areas", value: "95%", percentage: 95 },
        { label: "Rural Areas", value: "78%", percentage: 78 },
        { label: "Industrial Zones", value: "89%", percentage: 89 },
        { label: "Conservation Areas", value: "67%", percentage: 67 },
      ]
    },
    {
      category: "Public Engagement",
      items: [
        { label: "Active Consultations", value: "24", percentage: 60 },
        { label: "Public Comments", value: "2,847", percentage: 85 },
        { label: "Participating Cities", value: "156", percentage: 45 },
        { label: "Citizen Feedback", value: "4.2/5", percentage: 84 },
      ]
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Platform Statistics
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive data coverage across Indonesia's planning landscape, 
            enabling transparent and informed development decisions.
          </p>
        </div>

        {/* Main Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {mainStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="text-center transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  
                  <div className="text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  
                  <div className="text-sm font-medium text-muted-foreground mb-2">
                    {stat.label}
                  </div>
                  
                  <div className="flex items-center justify-center gap-2">
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        stat.trend.includes('+') 
                          ? 'text-green-600 bg-green-50' 
                          : 'text-blue-600 bg-blue-50'
                      }`}
                    >
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {stat.trend}
                    </Badge>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-2">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Detailed Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {detailStats.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  {category.category}
                </h3>
                
                <div className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{item.label}</span>
                        <span className="font-medium">{item.value}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Real-time Updates */}
        <div className="mt-16 p-8 rounded-2xl border border-border bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
              <Clock className="w-4 h-4" />
              Live Data
            </div>
            
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Real-time Planning Updates
            </h3>
            
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our platform continuously updates with the latest planning documents, 
              zoning changes, and development approvals from government sources.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">Daily</div>
                <div className="text-sm text-muted-foreground">Document Updates</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">Weekly</div>
                <div className="text-sm text-muted-foreground">Map Refreshes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">Monthly</div>
                <div className="text-sm text-muted-foreground">Coverage Expansion</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}