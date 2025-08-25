"use client";

import React, { useEffect, useRef, useState } from "react";

export interface LeafletMapProps {
  data?: any;
  center?: [number, number];
  zoom?: number;
  height?: string;
  onFeatureClick?: (feature: any) => void;
  onFeatureHover?: (feature: any | null) => void;
  showPopups?: boolean;
  className?: string;
}

export default function LeafletMap({
  center = [-2.5, 118.0], // Default to center of Indonesia
  zoom = 5, // Zoom level to show all of Indonesia
  height = "500px",
  className,
}: LeafletMapProps) {
  const [mapId] = useState(() => `map-${Math.random().toString(36).substr(2, 9)}`);
  const mapInstance = useRef<any>(null);
  const initialized = useRef(false);

  useEffect(() => {
    // Skip if already initialized
    if (initialized.current) return;
    
    const initMap = async () => {
      const container = document.getElementById(mapId);
      if (!container || mapInstance.current) return;

      try {
        // Mark as initialized early to prevent double initialization
        initialized.current = true;
        
        // Dynamic import Leaflet
        const L = await import("leaflet");
        
        // Fix for Leaflet default marker icons in Next.js
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
          iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
          shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        });

        // Check if container has _leaflet_id (already initialized)
        if ((container as any)._leaflet_id) {
          console.log('Container already has Leaflet instance, skipping...');
          return;
        }

        // Create map instance
        const map = L.map(container, {
          center: center,
          zoom: zoom,
          zoomControl: true,
          scrollWheelZoom: true,
        });

        // Store map instance
        mapInstance.current = map;

        // Add base tile layer
        const tileLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        });

        tileLayer.on('loading', () => {
          console.log('Tiles loading...');
        });

        tileLayer.on('load', () => {
          console.log('Tiles loaded successfully');
        });

        tileLayer.on('tileerror', (e: any) => {
          console.error('Tile loading error:', e);
        });

        tileLayer.addTo(map);

        // Force map to invalidate size after a short delay
        setTimeout(() => {
          map.invalidateSize();
          console.log('Map size invalidated');
        }, 200);

        console.log('Map initialized successfully with ID:', mapId);
        console.log('Map center:', map.getCenter());
        console.log('Map zoom:', map.getZoom());
        console.log('Container size:', container.offsetWidth, 'x', container.offsetHeight);
      } catch (error) {
        console.error('Error initializing map:', error);
        initialized.current = false; // Reset on error
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initMap, 100);

    return () => {
      clearTimeout(timer);
      if (mapInstance.current) {
        try {
          mapInstance.current.remove();
          mapInstance.current = null;
          initialized.current = false;
          console.log('Map cleaned up:', mapId);
        } catch (error) {
          console.error('Error cleaning up map:', error);
        }
      }
    };
  }, [mapId, center, zoom]);

  return (
    <div className={`relative ${className || ''}`} style={{ height, width: '100%' }}>
      <div
        id={mapId}
        className="absolute inset-0 rounded-lg bg-gray-200"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}