# Plan ForPublic.id

Indonesian Development Planning Transparency Platform

![Plan ForPublic.id](https://img.shields.io/badge/Plan-ForPublic.id-dc2626?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K)
![Next.js](https://img.shields.io/badge/Next.js-15.5-000000?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.1-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?style=flat-square&logo=tailwind-css)

## Overview

Plan ForPublic.id is a comprehensive transparency platform providing access to Indonesian development planning and spatial planning information. Built as part of the ForPublic.id ecosystem, it focuses on making planning data accessible through interactive maps, document libraries, and public participation tools.

## 🌟 Features

### 🗺️ Interactive Planning Maps

- **Zoning maps** with color-coded land use classifications
- **Master plan overlays** with development phases
- **3D building height restrictions** visualization
- **Infrastructure plan integration** (roads, utilities)
- **Real-time map interaction** with detailed zone information

### 📋 Planning Document Library

- **Searchable repository** of planning documents
- **Advanced PDF viewer** with zoom, rotation, bookmarks
- **Multi-language document support** (Indonesian/English)
- **Document download & sharing** functionality

### 🔍 Planning Information Search

- **Search by location**, land use type, or keyword
- **Advanced filtering** by plan type, date, status
- **Geographic search** (click map → get plan info)
- **Development project tracking**

### 📊 Development Analytics

- **Land use distribution** analysis
- **Development density mapping**
- **Infrastructure capacity** analysis
- **Environmental impact** visualization

### 👥 Public Participation Tools

- **Online public consultation** platform
- **Comment & feedback submission** on plans
- **Community input visualization**
- **Public hearing schedules** & materials

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript + React 19
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Maps**: Leaflet.js + react-leaflet
- **Internationalization**: next-intl (Indonesian/English)
- **Package Manager**: Bun
- **Data**: JSON + GeoJSON (no database)

## 📁 Project Structure

```
plan/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes (id/en)
│   │   ├── maps/          # Interactive maps
│   │   ├── documents/     # Document library
│   │   ├── regions/       # Regional planning
│   │   └── ...
├── components/
│   ├── planning/          # Planning-specific components
│   │   ├── InteractiveMap.tsx
│   │   ├── DocumentLibrary.tsx
│   │   └── PDFViewer.tsx
│   ├── ui/               # Base UI components
│   └── layout/           # Layout components
├── lib/
│   ├── types/            # TypeScript definitions
│   └── utils.ts          # Utility functions
├── i18n/                 # Internationalization
│   └── messages/         # Translation files
└── public/data/plans/    # Planning data files
    ├── spatial/          # Spatial planning data
    ├── zoning/           # Zoning maps (GeoJSON)
    ├── documents/        # Planning documents
    └── meta/             # Metadata & sources
```

## 🛠️ Development

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+

### Installation

```bash
# Clone the repository
git clone https://github.com/forpublic-id/plan.git
cd plan

# Install dependencies
bun install

# Start development server
bun run dev
```

### Available Scripts

```bash
bun run dev          # Start development server
bun run build        # Production build
bun run start        # Start production server
bun run lint         # Run ESLint
bun run typecheck    # TypeScript validation
bun run format       # Format code with Prettier
```

## 🗃️ Data Structure

### Spatial Data (GeoJSON)

```typescript
interface PlanningGeoJSON {
  type: "FeatureCollection";
  metadata: PlanningMetadata;
  features: Array<{
    properties: {
      zone: string; // Zone code (R1, K2, etc.)
      landUse: string; // Current/planned land use
      area: number; // Area in hectares
      regulations: {
        // Building regulations
        far: number; // Floor Area Ratio
        height: { max: number }; // Max height in meters
        coverage: number; // Building coverage %
      };
    };
    geometry: Polygon | MultiPolygon;
  }>;
}
```

### Planning Documents

```typescript
interface PlanningDocument {
  id: string;
  title: { id: string; en: string };
  type: "regulation" | "map" | "report" | "study";
  category: "spatial-plan" | "master-plan" | "environmental";
  files: Array<{
    url: string;
    filename: string;
    description?: { id: string; en: string };
  }>;
  metadata: {
    region: string;
    publishDate: string;
    author: string;
    keywords: string[];
  };
}
```

## 🌍 Internationalization

Full bilingual support (Indonesian/English):

- Dynamic routing: `/id/maps` and `/en/maps`
- Complete UI translations
- Localized document content
- Cultural adaptation for Indonesian planning terms

## 🎨 Design System

Following ForPublic.id ecosystem standards:

- **Primary color**: Red (`#dc2626`)
- **Typography**: Geist Sans font family
- **Components**: shadcn/ui with custom adaptations
- **Responsive**: Mobile-first design approach

## 📊 Data Sources

All planning data sourced from official Indonesian government agencies:

- **Kementerian ATR/BPN** - Ministry of Agrarian Affairs and Spatial Planning
- **Bappenas** - National Development Planning Agency
- **Regional Bappeda** - Regional Development Planning Agencies
- **Local Government** planning departments

## 🔧 API Integration

Future API endpoints for external integration:

```
GET /api/plans/spatial/:region     # Spatial planning data
GET /api/plans/zoning/:region      # Zoning maps & regulations
GET /api/documents                 # Document search & metadata
GET /api/projects                  # Development projects
```

## 📱 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Environment Variables

```env
NEXT_PUBLIC_GA_ID=your_analytics_id
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token (optional)
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Standards

- TypeScript strict mode
- ESLint + Prettier formatting
- Component-level testing
- Accessibility compliance (WCAG 2.1 AA)

## 📄 License

This project is part of the ForPublic.id ecosystem, dedicated to Indonesian government transparency and public accountability.

## 🌐 ForPublic.id Ecosystem

- [**ForPublic.id**](https://forpublic.id) - Main platform
- [**Salary ForPublic.id**](https://salary.forpublic.id) - Public salary transparency
- [**Budget ForPublic.id**](https://budget.forpublic.id) - Budget transparency
- [**Holiday ForPublic.id**](https://holiday.forpublic.id) - Public holiday information
- **Plan ForPublic.id** - Planning transparency (this project)

## 📞 Contact

- **Website**: [plan.forpublic.id](https://plan.forpublic.id)
- **Email**: hello@forpublic.id
- **Issues**: [GitHub Issues](https://github.com/forpublic-id/plan/issues)

---

Built with ❤️ for Indonesian public transparency
