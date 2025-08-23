// Core Planning Data Types for plan.forpublic.id

export interface PlanningMetadata {
  id: string;
  region: string;
  planType: "RTRW" | "RDTR" | "RTBL" | "Master Plan" | "Sectoral Plan";
  validPeriod: {
    start: string; // ISO date
    end: string;   // ISO date
  };
  lastUpdated: string; // ISO date
  source: string;
  status: "Draft" | "Approved" | "Under Review" | "Expired";
  legalBasis: string;
  version: string;
  area: {
    province: string;
    city?: string;
    district?: string;
  };
  description: {
    id: string;
    en: string;
  };
}

export interface ZoneClassification {
  code: string;
  name: {
    id: string;
    en: string;
  };
  color: string; // Hex color for map display
  category: "residential" | "commercial" | "industrial" | "mixed-use" | "open-space" | "infrastructure" | "special";
  density?: "low" | "medium" | "high";
  description: {
    id: string;
    en: string;
  };
}

export interface BuildingRegulations {
  far: number;        // Floor Area Ratio
  coverage: number;   // Building Coverage Ratio (%)
  height: {
    min?: number;     // Minimum height in meters
    max: number;      // Maximum height in meters
    floors?: number;  // Maximum floors
  };
  setback: {
    front: number;
    side: number;
    back: number;
  };
  parkingRatio: number; // per 100m²
}

export interface ZoningData {
  metadata: PlanningMetadata;
  zones: ZoneClassification[];
  regulations: Record<string, BuildingRegulations>; // keyed by zone code
  infrastructure: {
    roads: InfrastructureLayer[];
    utilities: InfrastructureLayer[];
    publicFacilities: InfrastructureLayer[];
  };
}

export interface InfrastructureLayer {
  id: string;
  type: string;
  name: {
    id: string;
    en: string;
  };
  status: "existing" | "planned" | "under-construction";
  priority: "high" | "medium" | "low";
  timeline?: {
    start: string;
    completion: string;
  };
  budget?: {
    amount: number;
    currency: "IDR";
    source: string;
  };
}

// GeoJSON Feature Properties for Planning Data
export interface PlanningFeatureProperties {
  id: string;
  zone: string;           // Zone code
  landUse: string;       // Current or planned land use
  zoneCategory: ZoneClassification["category"];
  regulations: BuildingRegulations;
  area: number;          // Area in hectares
  ownership: "public" | "private" | "mixed";
  developmentStatus: "vacant" | "developed" | "under-development" | "planned";
  restrictions?: string[]; // Special restrictions or conditions
  permitRequired: boolean;
  planningNotes?: {
    id: string;
    en: string;
  };
}

export interface PlanningGeoJSON {
  type: "FeatureCollection";
  metadata: PlanningMetadata;
  features: Array<{
    type: "Feature";
    properties: PlanningFeatureProperties;
    geometry: {
      type: "Polygon" | "MultiPolygon" | "Point" | "LineString";
      coordinates: number[][] | number[][][] | number[] | number[][];
    };
  }>;
}

// Master Plan Types
export interface MasterPlan {
  metadata: PlanningMetadata;
  vision: {
    id: string;
    en: string;
  };
  mission: {
    id: string;
    en: string;
  };
  objectives: Array<{
    id: string;
    title: { id: string; en: string };
    description: { id: string; en: string };
    targetYear: number;
    indicators: string[];
  }>;
  strategies: Array<{
    id: string;
    title: { id: string; en: string };
    description: { id: string; en: string };
    sector: string;
    timeline: {
      phase1: string; // years
      phase2: string;
      phase3: string;
    };
    budget: {
      total: number;
      breakdown: Record<string, number>;
    };
  }>;
  spatialConcept?: {
    developmentCenters: string[];
    transportationNetwork: string[];
    greenCorridors: string[];
  };
}

// Development Project Types
export interface DevelopmentProject {
  id: string;
  name: {
    id: string;
    en: string;
  };
  type: "housing" | "commercial" | "office" | "industrial" | "infrastructure" | "mixed-use";
  location: {
    address: string;
    coordinates: [number, number]; // [longitude, latitude]
    zone: string;
  };
  developer: {
    name: string;
    type: "private" | "government" | "ppp"; // public-private partnership
  };
  status: "proposed" | "approved" | "under-construction" | "completed" | "cancelled";
  timeline: {
    proposed: string;
    approved?: string;
    construction?: {
      start: string;
      completion: string;
    };
  };
  scale: {
    area: number;      // hectares
    units?: number;    // for housing/commercial
    floors: number;
    far: number;
  };
  permits: Array<{
    type: string;
    number: string;
    issued: string;
    expires: string;
    authority: string;
  }>;
  publicConsultation?: {
    held: boolean;
    date?: string;
    summary?: { id: string; en: string };
    objections?: number;
  };
  environmentalImpact?: {
    assessment: "required" | "not-required" | "completed";
    category: "A" | "B" | "C";
    status?: "approved" | "pending" | "rejected";
  };
}

// Document Types
export interface PlanningDocument {
  id: string;
  title: {
    id: string;
    en: string;
  };
  type: "regulation" | "map" | "report" | "study" | "guideline" | "presentation";
  category: "spatial-plan" | "master-plan" | "environmental" | "transportation" | "housing" | "economic";
  language: "id" | "en" | "both";
  format: "pdf" | "dwg" | "shp" | "kml" | "image";
  fileSize: number; // bytes
  pages?: number;
  metadata: {
    planType?: PlanningMetadata["planType"];
    region: string;
    author: string;
    publishDate: string;
    legalBasis?: string;
    keywords: string[];
  };
  files: Array<{
    type: "primary" | "attachment" | "translation";
    url: string;
    filename: string;
    description?: { id: string; en: string };
  }>;
  summary?: {
    id: string;
    en: string;
  };
  access: "public" | "restricted" | "members-only";
}

// Search and Filter Types
export interface PlanningSearchFilters {
  planType?: PlanningMetadata["planType"][];
  region?: string[];
  zoneCategory?: ZoneClassification["category"][];
  status?: PlanningMetadata["status"][];
  dateRange?: {
    start: string;
    end: string;
  };
  textSearch?: string;
  bbox?: [number, number, number, number]; // [minLng, minLat, maxLng, maxLat]
}

// API Response Types
export interface PlanningSearchResult {
  total: number;
  page: number;
  pageSize: number;
  filters: PlanningSearchFilters;
  results: Array<{
    type: "zone" | "plan" | "project" | "document";
    data: PlanningGeoJSON | MasterPlan | DevelopmentProject | PlanningDocument;
    relevanceScore: number;
    matchedFields: string[];
  }>;
}

// Statistics and Analytics
export interface PlanningStatistics {
  region: string;
  lastUpdated: string;
  landUse: Record<ZoneClassification["category"], {
    area: number;      // hectares
    percentage: number; // of total area
    zones: number;     // number of zones
  }>;
  development: {
    totalProjects: number;
    activeProjects: number;
    completedProjects: number;
    totalInvestment: number; // IDR
  };
  planning: {
    totalPlans: number;
    activePlans: number;
    expiringSoon: number; // within 1 year
  };
  publicParticipation: {
    consultationsHeld: number;
    publicComments: number;
    objections: number;
  };
}