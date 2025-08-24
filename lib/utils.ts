import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Planning-specific utility functions
export function formatArea(area: number): string {
  if (area < 1) {
    return `${(area * 10000).toFixed(0)} m²`;
  }
  return `${area.toFixed(1)} ha`;
}

export function formatHeight(height: number): string {
  return `${height} m`;
}

export function formatFAR(far: number): string {
  return far.toFixed(1);
}

export function formatCoverage(coverage: number): string {
  return `${coverage}%`;
}

export function getZoneColor(zoneCode: string): string {
  const zoneColors: Record<string, string> = {
    // Residential zones
    R1: "#90EE90", // Light green
    R2: "#7FDD7F", // Medium green
    R3: "#6FCC6F", // Dark green

    // Commercial zones
    K1: "#87CEEB", // Sky blue
    K2: "#4682B4", // Steel blue

    // Industrial zones
    I1: "#FFD700", // Gold
    I2: "#FFA500", // Orange

    // Mixed-use zones
    KT: "#DDA0DD", // Plum

    // Infrastructure zones
    SPU: "#FFB6C1", // Light pink

    // Open space zones
    RTH: "#32CD32", // Lime green

    // Special zones
    KS: "#F0E68C", // Khaki
  };

  return zoneColors[zoneCode] || "#CCCCCC"; // Default gray
}

export function getZoneCategoryColor(category: string): string {
  const categoryColors: Record<string, string> = {
    residential: "#90EE90",
    commercial: "#87CEEB",
    industrial: "#FFD700",
    "mixed-use": "#DDA0DD",
    infrastructure: "#FFB6C1",
    "open-space": "#32CD32",
    special: "#F0E68C",
  };

  return categoryColors[category] || "#CCCCCC";
}

export function calculateZoneStatistics(features: any[]) {
  const stats = {
    totalArea: 0,
    zoneCount: features.length,
    categoryStats: {} as Record<
      string,
      { area: number; count: number; percentage: number }
    >,
  };

  features.forEach((feature) => {
    const area = feature?.properties?.area || 0;
    const category = feature?.properties?.zoneCategory;

    if (!category) return;

    stats.totalArea += area;

    if (!stats.categoryStats[category]) {
      stats.categoryStats[category] = { area: 0, count: 0, percentage: 0 };
    }

    stats.categoryStats[category].area += area;
    stats.categoryStats[category].count += 1;
  });

  // Calculate percentages
  if (stats.totalArea > 0) {
    Object.keys(stats.categoryStats).forEach((category) => {
      stats.categoryStats[category].percentage =
        (stats.categoryStats[category].area / stats.totalArea) * 100;
    });
  }

  return stats;
}

export function formatCurrency(amount: number, currency = "IDR"): string {
  if (currency === "IDR") {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

export function formatDate(date: string, locale = "id"): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function formatNumber(number: number, locale = "id"): string {
  return new Intl.NumberFormat(locale).format(number);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
