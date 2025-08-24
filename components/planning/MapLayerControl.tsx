"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Layers, Eye, EyeOff, Settings, Filter } from "lucide-react";

export interface MapLayer {
  id: string;
  name: { id: string; en: string };
  type: "zoning" | "masterplan" | "infrastructure" | "projects" | "satellite";
  visible: boolean;
  opacity: number;
  color?: string;
  description?: { id: string; en: string };
}

export interface MapLayerControlProps {
  layers: MapLayer[];
  onLayerToggle: (layerId: string, visible: boolean) => void;
  onOpacityChange: (layerId: string, opacity: number) => void;
  onFilterChange?: (filters: Record<string, any>) => void;
  locale?: "id" | "en";
  className?: string;
}

export function MapLayerControl({
  layers,
  onLayerToggle,
  onOpacityChange,
  onFilterChange,
  locale = "id",
  className,
}: MapLayerControlProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...activeFilters, [key]: value };
    setActiveFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const clearFilters = () => {
    setActiveFilters({});
    onFilterChange?.({});
  };

  const visibleLayers = layers.filter((layer) => layer.visible);
  const activeFilterCount = Object.keys(activeFilters).filter(
    (key) => activeFilters[key] && activeFilters[key] !== "",
  ).length;

  return (
    <Card className={`w-80 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <Layers className="w-4 h-4" />
            {locale === "id" ? "Kontrol Layer" : "Layer Control"}
          </CardTitle>
          <div className="flex items-center gap-1">
            <Badge variant="secondary" className="text-xs">
              {visibleLayers.length}/{layers.length}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-6 w-6 p-0"
            >
              <Settings className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Layer List */}
        <div className="space-y-2">
          {layers.map((layer) => (
            <div
              key={layer.id}
              className="flex items-center justify-between p-2 rounded-md border bg-card/50 hover:bg-card/80 transition-colors"
            >
              <div className="flex items-center gap-2 flex-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onLayerToggle(layer.id, !layer.visible)}
                  className="h-6 w-6 p-0"
                >
                  {layer.visible ? (
                    <Eye className="w-3 h-3 text-primary" />
                  ) : (
                    <EyeOff className="w-3 h-3 text-muted-foreground" />
                  )}
                </Button>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    {layer.color && (
                      <div
                        className="w-3 h-3 rounded border"
                        style={{ backgroundColor: layer.color }}
                      />
                    )}
                    <span className="text-sm font-medium">
                      {layer.name[locale]}
                    </span>
                  </div>

                  {layer.description && isExpanded && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {layer.description[locale]}
                    </p>
                  )}
                </div>

                <Badge variant="outline" className="text-xs capitalize">
                  {layer.type}
                </Badge>
              </div>

              {/* Opacity Slider (shown when expanded) */}
              {isExpanded && layer.visible && (
                <div className="ml-2 w-20">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={layer.opacity * 100}
                    onChange={(e) =>
                      onOpacityChange(layer.id, parseInt(e.target.value) / 100)
                    }
                    className="w-full h-1 bg-muted rounded-lg appearance-none cursor-pointer opacity-slider"
                  />
                  <div className="text-xs text-center text-muted-foreground mt-1">
                    {Math.round(layer.opacity * 100)}%
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Filter Controls */}
        {onFilterChange && (
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {locale === "id" ? "Filter" : "Filters"}
                </span>
              </div>
              {activeFilterCount > 0 && (
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {activeFilterCount}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="h-6 text-xs"
                  >
                    {locale === "id" ? "Reset" : "Clear"}
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {/* Zone Type Filter */}
              <div>
                <label className="text-xs font-medium text-muted-foreground">
                  {locale === "id" ? "Jenis Zona" : "Zone Type"}
                </label>
                <select
                  value={activeFilters.zoneType || ""}
                  onChange={(e) =>
                    handleFilterChange("zoneType", e.target.value)
                  }
                  className="w-full mt-1 px-2 py-1 text-xs border border-input rounded-md bg-background"
                >
                  <option value="">
                    {locale === "id" ? "Semua Zona" : "All Zones"}
                  </option>
                  <option value="residential">
                    {locale === "id" ? "Perumahan" : "Residential"}
                  </option>
                  <option value="commercial">
                    {locale === "id" ? "Perdagangan" : "Commercial"}
                  </option>
                  <option value="industrial">
                    {locale === "id" ? "Industri" : "Industrial"}
                  </option>
                  <option value="open-space">
                    {locale === "id" ? "Ruang Terbuka" : "Open Space"}
                  </option>
                </select>
              </div>

              {/* Development Status Filter */}
              <div>
                <label className="text-xs font-medium text-muted-foreground">
                  {locale === "id"
                    ? "Status Pembangunan"
                    : "Development Status"}
                </label>
                <select
                  value={activeFilters.developmentStatus || ""}
                  onChange={(e) =>
                    handleFilterChange("developmentStatus", e.target.value)
                  }
                  className="w-full mt-1 px-2 py-1 text-xs border border-input rounded-md bg-background"
                >
                  <option value="">
                    {locale === "id" ? "Semua Status" : "All Status"}
                  </option>
                  <option value="vacant">
                    {locale === "id" ? "Kosong" : "Vacant"}
                  </option>
                  <option value="developed">
                    {locale === "id" ? "Terbangun" : "Developed"}
                  </option>
                  <option value="under-development">
                    {locale === "id"
                      ? "Dalam Pembangunan"
                      : "Under Development"}
                  </option>
                  <option value="planned">
                    {locale === "id" ? "Direncanakan" : "Planned"}
                  </option>
                </select>
              </div>

              {/* Area Range Filter */}
              <div>
                <label className="text-xs font-medium text-muted-foreground">
                  {locale === "id" ? "Luas Area (ha)" : "Area Size (ha)"}
                </label>
                <div className="flex gap-2 mt-1">
                  <input
                    type="number"
                    placeholder="Min"
                    value={activeFilters.minArea || ""}
                    onChange={(e) =>
                      handleFilterChange("minArea", e.target.value)
                    }
                    className="w-full px-2 py-1 text-xs border border-input rounded-md bg-background"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={activeFilters.maxArea || ""}
                    onChange={(e) =>
                      handleFilterChange("maxArea", e.target.value)
                    }
                    className="w-full px-2 py-1 text-xs border border-input rounded-md bg-background"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Layer Statistics */}
        {isExpanded && (
          <div className="border-t pt-4 text-xs text-muted-foreground">
            <div className="grid grid-cols-2 gap-2">
              <div>
                {locale === "id" ? "Layer Aktif" : "Active Layers"}:{" "}
                {visibleLayers.length}
              </div>
              <div>
                {locale === "id" ? "Filter Aktif" : "Active Filters"}:{" "}
                {activeFilterCount}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Custom styles for the opacity slider
const customStyles = `
.opacity-slider::-webkit-slider-thumb {
  appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: hsl(var(--primary));
  cursor: pointer;
}

.opacity-slider::-moz-range-thumb {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: hsl(var(--primary));
  cursor: pointer;
  border: none;
}
`;
