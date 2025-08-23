"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ZoneClassification } from "@/lib/types/planning";
import { formatArea, formatFAR, formatHeight, formatCoverage, cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Info } from "lucide-react";

export interface ZoningLegendProps {
  zones: ZoneClassification[];
  statistics?: Record<string, { area: number; percentage: number; count: number }>;
  onZoneClick?: (zoneCode: string) => void;
  selectedZones?: string[];
  locale?: "id" | "en";
  compact?: boolean;
  className?: string;
}

export function ZoningLegend({
  zones,
  statistics,
  onZoneClick,
  selectedZones = [],
  locale = "id",
  compact = false,
  className,
}: ZoningLegendProps) {
  const [expandedZones, setExpandedZones] = useState<Set<string>>(new Set());
  const [showStatistics, setShowStatistics] = useState(false);

  const toggleZoneExpansion = (zoneCode: string) => {
    const newExpanded = new Set(expandedZones);
    if (newExpanded.has(zoneCode)) {
      newExpanded.delete(zoneCode);
    } else {
      newExpanded.add(zoneCode);
    }
    setExpandedZones(newExpanded);
  };

  const groupedZones = zones.reduce((acc, zone) => {
    const category = zone.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(zone);
    return acc;
  }, {} as Record<string, ZoneClassification[]>);

  const categoryLabels = {
    residential: { id: "Perumahan", en: "Residential" },
    commercial: { id: "Perdagangan", en: "Commercial" },
    industrial: { id: "Industri", en: "Industrial" },
    "mixed-use": { id: "Campuran", en: "Mixed Use" },
    infrastructure: { id: "Infrastruktur", en: "Infrastructure" },
    "open-space": { id: "Ruang Terbuka", en: "Open Space" },
    special: { id: "Khusus", en: "Special" },
  };

  return (
    <Card className={cn("w-80", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">
            {locale === "id" ? "Legenda Zonasi" : "Zoning Legend"}
          </CardTitle>
          {statistics && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowStatistics(!showStatistics)}
              className="h-6 w-6 p-0"
            >
              <Info className="w-3 h-3" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Statistics Panel */}
        {statistics && showStatistics && (
          <div className="border rounded-md p-3 bg-muted/30">
            <div className="text-xs font-medium mb-2">
              {locale === "id" ? "Statistik Penggunaan Lahan" : "Land Use Statistics"}
            </div>
            <div className="space-y-2">
              {Object.entries(statistics).map(([category, stats]) => (
                <div key={category} className="flex justify-between items-center text-xs">
                  <span className="capitalize">
                    {categoryLabels[category as keyof typeof categoryLabels]?.[locale] || category}
                  </span>
                  <div className="flex gap-2 text-muted-foreground">
                    <span>{formatArea(stats.area)}</span>
                    <span>({stats.percentage.toFixed(1)}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Zone Categories */}
        {Object.entries(groupedZones).map(([category, categoryZones]) => (
          <div key={category} className="space-y-2">
            <div className="text-sm font-medium text-muted-foreground border-b pb-1">
              {categoryLabels[category as keyof typeof categoryLabels]?.[locale] || category}
            </div>

            {categoryZones.map((zone) => {
              const isSelected = selectedZones.includes(zone.code);
              const isExpanded = expandedZones.has(zone.code);
              const zoneStats = statistics?.[zone.category];

              return (
                <div
                  key={zone.code}
                  className={cn(
                    "border rounded-md transition-all",
                    isSelected
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border bg-card/50 hover:bg-card/80",
                    onZoneClick && "cursor-pointer"
                  )}
                  onClick={() => onZoneClick?.(zone.code)}
                >
                  <div className="p-3">
                    <div className="flex items-center gap-2">
                      {/* Zone Color */}
                      <div
                        className="w-4 h-4 rounded border border-border flex-shrink-0"
                        style={{ backgroundColor: zone.color }}
                      />

                      {/* Zone Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-medium">
                            {zone.code}
                          </span>
                          <span className="text-sm truncate">
                            {zone.name[locale]}
                          </span>
                          {zone.density && (
                            <Badge variant="outline" className="text-xs">
                              {zone.density}
                            </Badge>
                          )}
                        </div>

                        {/* Zone Statistics */}
                        {zoneStats && !compact && (
                          <div className="mt-1 text-xs text-muted-foreground">
                            {formatArea(zoneStats.area)} • {zoneStats.count} {locale === "id" ? "zona" : "zones"}
                          </div>
                        )}
                      </div>

                      {/* Expand Button */}
                      {!compact && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleZoneExpansion(zone.code);
                          }}
                          className="h-6 w-6 p-0 flex-shrink-0"
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-3 h-3" />
                          ) : (
                            <ChevronDown className="w-3 h-3" />
                          )}
                        </Button>
                      )}
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && !compact && (
                      <div className="mt-3 pt-3 border-t space-y-2">
                        {/* Description */}
                        <p className="text-xs text-muted-foreground">
                          {zone.description[locale]}
                        </p>

                        {/* Regulations (if available) */}
                        {/* This would need to be passed as additional prop or fetched */}
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="font-medium">FAR:</span>
                            <span className="ml-1 text-muted-foreground">-</span>
                          </div>
                          <div>
                            <span className="font-medium">
                              {locale === "id" ? "Tinggi Maks:" : "Max Height:"}
                            </span>
                            <span className="ml-1 text-muted-foreground">-</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        {/* Legend Footer */}
        <div className="border-t pt-3 text-xs text-muted-foreground">
          <div className="flex justify-between">
            <span>
              {locale === "id" ? "Total zona:" : "Total zones:"} {zones.length}
            </span>
            {selectedZones.length > 0 && (
              <span>
                {locale === "id" ? "Dipilih:" : "Selected:"} {selectedZones.length}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}