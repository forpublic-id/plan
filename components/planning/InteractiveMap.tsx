"use client";

import dynamic from "next/dynamic";
import { PlanningGeoJSON } from "@/lib/types/planning";

// Dynamic import for Leaflet to avoid SSR issues
const DynamicMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-muted flex items-center justify-center">
      <div className="text-center">
        <div className="animate-pulse text-muted-foreground">
          Loading map...
        </div>
      </div>
    </div>
  ),
});

export interface InteractiveMapProps {
  data?: PlanningGeoJSON;
  center?: [number, number];
  zoom?: number;
  height?: string;
  onFeatureClick?: (feature: any) => void;
  onFeatureHover?: (feature: any | null) => void;
  showPopups?: boolean;
  className?: string;
}

export function InteractiveMap(props: InteractiveMapProps) {
  return <DynamicMap {...props} />;
}
