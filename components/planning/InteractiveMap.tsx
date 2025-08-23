"use client";

import React, { useEffect, useRef, useState } from "react";
import L, { Map as LeafletMap, TileLayer, GeoJSON } from "leaflet";
import "leaflet/dist/leaflet.css";
import { PlanningGeoJSON, PlanningFeatureProperties } from "@/lib/types/planning";
import { getZoneColor, formatArea, formatHeight, formatFAR } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

// Fix for Leaflet default marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

export interface InteractiveMapProps {
  data?: PlanningGeoJSON;
  center?: [number, number]; // [latitude, longitude]
  zoom?: number;
  height?: string;
  onFeatureClick?: (feature: any) => void;
  onFeatureHover?: (feature: any | null) => void;
  showPopups?: boolean;
  className?: string;
}

export function InteractiveMap({
  data,
  center = [-6.2088, 106.8456], // Default to Jakarta
  zoom = 12,
  height = "500px",
  onFeatureClick,
  onFeatureHover,
  showPopups = true,
  className,
}: InteractiveMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<LeafletMap | null>(null);
  const geoJsonLayer = useRef<GeoJSON | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const [hoveredFeature, setHoveredFeature] = useState<any>(null);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Create map instance
    map.current = L.map(mapContainer.current, {
      center: center,
      zoom: zoom,
      zoomControl: true,
      scrollWheelZoom: true,
    });

    // Add base tile layer
    const tileLayer = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | <a href="https://plan.forpublic.id">Plan ForPublic.id</a>',
        maxZoom: 19,
      }
    );
    tileLayer.addTo(map.current);

    // Add zoom control
    L.control.zoom({
      position: "topright",
    }).addTo(map.current);

    // Add scale control
    L.control.scale({
      position: "bottomright",
      metric: true,
      imperial: false,
    }).addTo(map.current);

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [center, zoom]);

  // Update GeoJSON data
  useEffect(() => {
    if (!map.current || !data) return;

    // Remove existing GeoJSON layer
    if (geoJsonLayer.current) {
      map.current.removeLayer(geoJsonLayer.current);
    }

    // Create new GeoJSON layer
    geoJsonLayer.current = L.geoJSON(data, {
      style: (feature) => {
        if (!feature?.properties) return {};
        
        const props = feature.properties as PlanningFeatureProperties;
        const color = getZoneColor(props.zone);
        
        return {
          fillColor: color,
          weight: 2,
          opacity: 1,
          color: color.replace(/[^,]*/, (match) => {
            const num = parseInt(match.slice(1), 16);
            return `#${Math.max(0, num - 0x333333).toString(16).padStart(6, "0")}`;
          }),
          dashArray: "3",
          fillOpacity: 0.7,
        };
      },
      onEachFeature: (feature, layer) => {
        const props = feature.properties as PlanningFeatureProperties;
        
        // Create popup content
        if (showPopups) {
          const popupContent = `
            <div class="p-2 min-w-48">
              <h3 class="font-bold text-sm mb-2">${props.landUse}</h3>
              <div class="space-y-1 text-xs">
                <p><strong>Zone:</strong> ${props.zone}</p>
                <p><strong>Area:</strong> ${formatArea(props.area)}</p>
                <p><strong>FAR:</strong> ${formatFAR(props.regulations.far)}</p>
                <p><strong>Max Height:</strong> ${formatHeight(props.regulations.height.max)}</p>
                <p><strong>Status:</strong> ${props.developmentStatus}</p>
                ${props.planningNotes?.id ? `<p class="mt-2 text-muted-foreground">${props.planningNotes.id}</p>` : ""}
              </div>
            </div>
          `;
          
          layer.bindPopup(popupContent, {
            maxWidth: 300,
            className: "planning-popup",
          });
        }
        
        // Add event listeners
        layer.on({
          click: (e) => {
            setSelectedFeature(feature);
            onFeatureClick?.(feature);
          },
          mouseover: (e) => {
            // Highlight feature
            const layer = e.target;
            layer.setStyle({
              weight: 4,
              fillOpacity: 0.9,
            });
            
            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
              layer.bringToFront();
            }
            
            setHoveredFeature(feature);
            onFeatureHover?.(feature);
          },
          mouseout: (e) => {
            geoJsonLayer.current?.resetStyle(e.target);
            setHoveredFeature(null);
            onFeatureHover?.(null);
          },
        });
      },
    });

    // Add layer to map
    geoJsonLayer.current.addTo(map.current);

    // Fit map bounds to data
    const bounds = geoJsonLayer.current.getBounds();
    if (bounds.isValid()) {
      map.current.fitBounds(bounds, { padding: [20, 20] });
    }

    return () => {
      if (geoJsonLayer.current && map.current) {
        map.current.removeLayer(geoJsonLayer.current);
      }
    };
  }, [data, showPopups, onFeatureClick, onFeatureHover]);

  return (
    <div className={`relative ${className}`}>
      <div
        ref={mapContainer}
        className="w-full rounded-lg border border-border overflow-hidden"
        style={{ height }}
      />
      
      {/* Map Legend */}
      {data && (
        <Card className="absolute top-4 left-4 z-[1000] max-w-xs">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Zone Legend</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {Array.from(
              new Set(
                data.features.map((f) => `${f.properties.zone}:${f.properties.landUse}`)
              )
            )
              .slice(0, 8) // Limit to 8 items
              .map((zoneInfo) => {
                const [zone, landUse] = zoneInfo.split(":");
                const color = getZoneColor(zone);
                
                return (
                  <div key={zone} className="flex items-center gap-2 text-xs">
                    <div
                      className="w-3 h-3 rounded border"
                      style={{ backgroundColor: color }}
                    />
                    <span className="font-mono text-[10px] w-6">{zone}</span>
                    <span className="truncate">{landUse}</span>
                  </div>
                );
              })}
          </CardContent>
        </Card>
      )}
      
      {/* Feature Info Panel */}
      {hoveredFeature && (
        <Card className="absolute bottom-4 right-4 z-[1000] max-w-sm">
          <CardContent className="p-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">
                {hoveredFeature.properties.landUse}
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div>
                  <span className="font-medium">Zone:</span> {hoveredFeature.properties.zone}
                </div>
                <div>
                  <span className="font-medium">Area:</span> {formatArea(hoveredFeature.properties.area)}
                </div>
                <div>
                  <span className="font-medium">FAR:</span> {formatFAR(hoveredFeature.properties.regulations.far)}
                </div>
                <div>
                  <span className="font-medium">Height:</span> {formatHeight(hoveredFeature.properties.regulations.height.max)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}