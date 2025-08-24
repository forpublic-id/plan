# Plan ForPublic.id - Development Guide

## Project Overview

Plan ForPublic.id is a comprehensive Indonesian development planning transparency platform built with Next.js 15, focusing on spatial planning, zoning maps, and public participation in planning processes. This is part of the ForPublic.id ecosystem dedicated to government transparency and public accountability.

## Tech Stack & Architecture

### Core Technologies

- **Next.js 15** with App Router
- **React 19** for UI components
- **TypeScript** for type safety
- **Tailwind CSS v4** with design tokens
- **next-intl** for bilingual support (Indonesian/English)
- **Bun** as package manager and runtime

### Mapping & Visualization

- **Leaflet.js** for interactive maps
- **react-leaflet** for React integration
- **GeoJSON** for spatial data
- **React PDF** for document viewing

### Data Architecture

- **JSON-based** data storage (NO DATABASE)
- **GeoJSON** for geographic data
- **Static files** in `/public/data/plans/`
- **Client-side** data processing

## Project Structure

```
plan/
├── app/                           # Next.js App Router
│   ├── [locale]/                  # Internationalized routes (id/en)
│   │   ├── maps/                  # Interactive maps page
│   │   ├── documents/             # Document library page
│   │   ├── regions/               # Regional planning explorer
│   │   ├── projects/              # Development projects
│   │   ├── participate/           # Public participation
│   │   ├── about/                 # About page
│   │   ├── glossary/              # Planning glossary
│   │   ├── layout.tsx             # Locale layout
│   │   └── page.tsx               # Homepage
│   ├── globals.css                # Global styles with Leaflet CSS
│   └── layout.tsx                 # Root layout
├── components/                    # React components
│   ├── ui/                        # Base UI components (shadcn/ui)
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   └── index.ts
│   ├── planning/                  # Planning-specific components
│   │   ├── InteractiveMap.tsx     # Main map component
│   │   ├── MapLayerControl.tsx    # Layer management
│   │   ├── ZoningLegend.tsx       # Map legend
│   │   ├── DocumentLibrary.tsx    # Document browser
│   │   ├── PDFViewer.tsx          # PDF document viewer
│   │   └── index.ts
│   ├── layout/                    # Layout components
│   │   ├── Header.tsx             # Navigation header
│   │   ├── Footer.tsx             # Site footer
│   │   └── index.ts
│   └── sections/                  # Page sections
│       ├── Hero.tsx               # Homepage hero
│       ├── Features.tsx           # Feature showcase
│       ├── Statistics.tsx         # Platform statistics
│       └── index.ts
├── lib/                           # Utilities and types
│   ├── types/
│   │   └── planning.ts            # Planning data types
│   └── utils.ts                   # Utility functions
├── i18n/                          # Internationalization
│   ├── messages/
│   │   ├── id.json                # Indonesian translations
│   │   └── en.json                # English translations
│   └── request.ts                 # i18n configuration
├── public/data/plans/             # Planning data files
│   ├── spatial/                   # Spatial planning data
│   │   ├── rtrw/                  # Regional spatial plans
│   │   ├── rdtr/                  # Detailed spatial plans
│   │   └── rtbl/                  # Building & environment plans
│   ├── master-plans/              # Development master plans
│   ├── zoning/                    # Zoning data & maps
│   │   ├── maps/                  # GeoJSON zoning maps
│   │   └── regulations/           # Zoning regulations
│   ├── documents/                 # Planning documents
│   └── meta/                      # Metadata & sources
│       └── sources.json           # Data source information
└── middleware.ts                  # next-intl middleware
```

## Key Features Implemented

### 🗺️ Interactive Planning Maps

- **InteractiveMap**: Leaflet-based map component with GeoJSON support
- **MapLayerControl**: Advanced layer management with filters
- **ZoningLegend**: Color-coded zoning classification display
- **Real-time interaction**: Click-to-view zone information
- **Multi-layer support**: Zoning, infrastructure, projects overlays

### 📋 Document Library System

- **DocumentLibrary**: Searchable document repository
- **PDFViewer**: Full-featured PDF viewer with zoom, rotation, bookmarks
- **Advanced search**: Text search with filters by type, category, region
- **Multi-language support**: Document viewing in ID/EN

### 🌍 Bilingual Architecture

- **Complete i18n**: All UI elements translated
- **Dynamic routing**: `/id/` and `/en/` locale paths
- **RTL support ready**: Infrastructure for future RTL languages
- **Consistent branding**: ForPublic.id ecosystem integration

### 📊 Comprehensive Data Types

- **PlanningGeoJSON**: Spatial data with rich properties
- **ZoneClassification**: Detailed zoning categories
- **BuildingRegulations**: FAR, height, setback rules
- **DevelopmentProject**: Project tracking with permits
- **PlanningDocument**: Document metadata with multi-file support

## Development Commands

```bash
# Development
bun run dev          # Start development server (localhost:3000)
bun run dev:turbo    # Development with Turbopack

# Production
bun run build        # Production build
bun run start        # Start production server

# Code Quality
bun run lint         # ESLint checks
bun run typecheck    # TypeScript validation
bun run format       # Format with Prettier
bun run format:check # Check formatting
```

## Data Management

### Spatial Data Structure

```typescript
interface PlanningGeoJSON {
  type: "FeatureCollection";
  metadata: PlanningMetadata;
  features: Array<{
    type: "Feature";
    properties: PlanningFeatureProperties;
    geometry: Polygon | MultiPolygon | Point | LineString;
  }>;
}
```

### Sample Data Files

- `/public/data/plans/spatial/rtrw/dki-jakarta.json` - Jakarta spatial plan
- `/public/data/plans/zoning/maps/jakarta-zones.geojson` - Jakarta zoning map
- `/public/data/plans/documents/sample-documents.json` - Document library
- `/public/data/plans/meta/sources.json` - Data sources & attribution

### Adding New Data

1. Follow the TypeScript interfaces in `lib/types/planning.ts`
2. Place JSON files in appropriate `/public/data/plans/` subdirectories
3. Update metadata in `sources.json`
4. Test with InteractiveMap and DocumentLibrary components

## Component Usage Examples

### Interactive Map

```tsx
import { InteractiveMap } from "@/components/planning";
import { PlanningGeoJSON } from "@/lib/types/planning";

function MapPage() {
  const [mapData, setMapData] = useState<PlanningGeoJSON>();

  return (
    <InteractiveMap
      data={mapData}
      center={[-6.2088, 106.8456]}
      zoom={12}
      height="600px"
      onFeatureClick={(feature) => console.log(feature)}
      showPopups={true}
    />
  );
}
```

### Document Library

```tsx
import { DocumentLibrary } from "@/components/planning";
import { PlanningDocument } from "@/lib/types/planning";

function DocumentsPage() {
  const [documents, setDocuments] = useState<PlanningDocument[]>([]);

  return (
    <DocumentLibrary
      documents={documents}
      onDocumentView={(doc) => setSelectedDocument(doc)}
      locale="id"
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
    />
  );
}
```

## Styling & Design System

### Tailwind Configuration

- **Custom colors**: ForPublic.id red branding (`--primary`)
- **Dark mode ready**: Complete dark/light theme support
- **Responsive design**: Mobile-first approach
- **Planning-specific classes**: Zone colors, map styles

### Zone Color System

```css
.zone-residential-low {
  @apply fill-green-200 stroke-green-400;
}
.zone-commercial {
  @apply fill-blue-200 stroke-blue-400;
}
.zone-industrial {
  @apply fill-yellow-200 stroke-yellow-400;
}
/* ... more zone colors in globals.css */
```

## API Integration (Future)

### Planned API Endpoints

```typescript
GET /api/plans/spatial/:region     // Spatial planning data
GET /api/plans/zoning/:region      // Zoning maps & regulations
GET /api/documents                 // Document search & metadata
GET /api/projects                  // Development projects
GET /api/statistics               // Platform statistics
```

## Performance Optimization

### Map Performance

- **Lazy loading**: Large GeoJSON files loaded on demand
- **Clustering**: Marker clustering for dense data
- **Viewport culling**: Only render visible features
- **Progressive enhancement**: Map works without JavaScript

### Document Performance

- **PDF streaming**: Large documents streamed progressively
- **Thumbnail generation**: PDF page thumbnails cached
- **Search indexing**: Client-side search with indexedDB

## SEO & Accessibility

### SEO Features

- **Dynamic metadata**: Locale-specific titles & descriptions
- **Structured data**: Rich snippets for planning documents
- **Sitemap generation**: Automatic multilingual sitemaps
- **OpenGraph**: Social media sharing optimization

### Accessibility

- **WCAG 2.1 AA**: Full compliance target
- **Keyboard navigation**: All interactive elements accessible
- **Screen readers**: Proper ARIA labels on maps
- **High contrast**: Planning zone colors accessible

## Deployment

### Vercel Configuration

```json
{
  "framework": "nextjs",
  "regions": ["sin1"],
  "functions": {
    "app/[locale]/page.tsx": {
      "maxDuration": 10
    }
  }
}
```

### Environment Variables

- `NEXT_PUBLIC_GA_ID`: Google Analytics tracking
- `NEXT_PUBLIC_MAPBOX_TOKEN`: Mapbox tiles (optional)

### Domain Setup

- Primary: `plan.forpublic.id`
- Staging: `plan-staging.forpublic.id`

## Contributing Guidelines

### Code Quality

- **TypeScript strict**: All code must be type-safe
- **ESLint + Prettier**: Consistent formatting enforced
- **Component patterns**: Follow existing architectural patterns
- **Testing**: Component testing with React Testing Library

### Data Standards

- **GeoJSON compliance**: All spatial data must validate
- **Metadata completeness**: Required fields for all planning data
- **Source attribution**: Track data provenance and updates
- **Multilingual content**: ID/EN translations for all user-facing content

## Legal & Compliance

### Data Sources

- **Government official**: All data from verified government sources
- **Attribution required**: Proper crediting of data sources
- **Update frequency**: Regular synchronization with source systems
- **Access rights**: Respect for data usage restrictions

### Privacy

- **No personal data**: Platform doesn't collect personal information
- **Analytics minimal**: Basic usage tracking only
- **Cookie compliance**: GDPR-ready cookie management

## Future Enhancements

### Phase 2 Features

- **3D visualization**: Building height and massing visualization
- **Time-series analysis**: Historical planning data comparison
- **Public consultation**: Integrated feedback and comment system
- **Mobile app**: React Native companion application

### Phase 3 Features

- **AI planning assistant**: Natural language planning queries
- **Predictive modeling**: Development impact simulation
- **Real-time updates**: WebSocket-based live data feeds
- **Community features**: User-generated content and discussions

This platform represents a significant advancement in Indonesian planning transparency, providing comprehensive access to spatial planning information while maintaining the highest standards of data quality and user experience.
