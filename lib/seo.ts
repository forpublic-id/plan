import { Metadata } from "next";

// Base configuration
export const siteConfig = {
  name: "Plan ForPublic.id",
  description: {
    id: "Platform transparansi perencanaan pembangunan Indonesia. Akses data tata ruang, dokumen perencanaan, dan peta zonasi untuk partisipasi publik yang lebih baik.",
    en: "Indonesian development planning transparency platform. Access spatial planning data, planning documents, and zoning maps for better public participation.",
  },
  url: "https://plan.forpublic.id",
  metadataBase: new URL("https://plan.forpublic.id"),
  ogImage: "/og-image.png",
  keywords: {
    id: [
      "perencanaan pembangunan",
      "tata ruang indonesia",
      "transparansi pemerintah",
      "partisipasi publik",
      "RTRW",
      "RDTR",
      "zonasi",
      "peta tata ruang",
      "pembangunan daerah",
      "perencanaan kota",
      "spatial planning",
      "master plan",
    ],
    en: [
      "development planning",
      "spatial planning indonesia",
      "government transparency",
      "public participation",
      "zoning maps",
      "urban planning",
      "regional development",
      "planning documents",
      "spatial data",
      "indonesia planning",
    ],
  },
  creator: "ForPublic.id",
  publisher: "ForPublic.id",
};

// Generate page-specific keywords
export function generatePageKeywords(
  page: string,
  locale: "id" | "en",
  additionalKeywords: string[] = [],
): string[] {
  const baseKeywords = siteConfig.keywords[locale];

  const pageSpecificKeywords: Record<string, Record<string, string[]>> = {
    home: {
      id: [
        "platform perencanaan",
        "beranda plan forpublic",
        "transparansi perencanaan",
      ],
      en: ["planning platform", "plan forpublic home", "planning transparency"],
    },
    maps: {
      id: [
        "peta interaktif",
        "peta zonasi",
        "peta tata ruang",
        "GIS Indonesia",
      ],
      en: ["interactive maps", "zoning maps", "spatial maps", "GIS Indonesia"],
    },
    documents: {
      id: ["dokumen perencanaan", "perpres", "perda", "regulasi tata ruang"],
      en: [
        "planning documents",
        "regulations",
        "spatial planning documents",
        "zoning regulations",
      ],
    },
    regions: {
      id: ["perencanaan daerah", "wilayah Indonesia", "provinsi", "kabupaten"],
      en: ["regional planning", "Indonesia regions", "provinces", "regencies"],
    },
    projects: {
      id: ["proyek pembangunan", "infrastruktur", "pembangunan daerah"],
      en: ["development projects", "infrastructure", "regional development"],
    },
    participate: {
      id: ["partisipasi publik", "konsultasi publik", "masukan masyarakat"],
      en: ["public participation", "public consultation", "community input"],
    },
    about: {
      id: ["tentang plan forpublic", "transparansi perencanaan", "visi misi"],
      en: ["about plan forpublic", "planning transparency", "vision mission"],
    },
    glossary: {
      id: ["glosarium perencanaan", "istilah tata ruang", "definisi zonasi"],
      en: ["planning glossary", "spatial terms", "zoning definitions"],
    },
  };

  const pageKeywords = pageSpecificKeywords[page]?.[locale] || [];
  return [...baseKeywords, ...pageKeywords, ...additionalKeywords];
}

// Generate dynamic titles
export function generatePageTitle(
  page: string,
  locale: "id" | "en",
  context?: { region?: string; document?: string; year?: string },
): string {
  const siteName = siteConfig.name;

  const pageTitles: Record<string, Record<string, string>> = {
    home: {
      id: `${siteName} - Platform Transparansi Perencanaan Pembangunan Indonesia`,
      en: `${siteName} - Indonesian Development Planning Transparency Platform`,
    },
    maps: {
      id: `Peta Interaktif Tata Ruang Indonesia | ${siteName}`,
      en: `Interactive Spatial Planning Maps Indonesia | ${siteName}`,
    },
    documents: {
      id: `Perpustakaan Dokumen Perencanaan | ${siteName}`,
      en: `Planning Document Library | ${siteName}`,
    },
    regions: {
      id: `Eksplorasi Perencanaan Daerah | ${siteName}`,
      en: `Regional Planning Explorer | ${siteName}`,
    },
    projects: {
      id: `Proyek Pembangunan Indonesia | ${siteName}`,
      en: `Indonesian Development Projects | ${siteName}`,
    },
    participate: {
      id: `Partisipasi Publik Perencanaan | ${siteName}`,
      en: `Public Participation in Planning | ${siteName}`,
    },
    about: {
      id: `Tentang Platform Transparansi Perencanaan | ${siteName}`,
      en: `About Planning Transparency Platform | ${siteName}`,
    },
    glossary: {
      id: `Glosarium Perencanaan Pembangunan | ${siteName}`,
      en: `Development Planning Glossary | ${siteName}`,
    },
  };

  let title = pageTitles[page]?.[locale] || siteName;

  // Add context if provided
  if (context?.region) {
    const regionText =
      locale === "id"
        ? `Wilayah ${context.region}`
        : `${context.region} Region`;
    title = title.replace("|", `- ${regionText} |`);
  }

  if (context?.document) {
    title = `${context.document} | ${title}`;
  }

  return title;
}

// Generate dynamic descriptions
export function generatePageDescription(
  page: string,
  locale: "id" | "en",
  context?: { region?: string; count?: number },
): string {
  const descriptions: Record<string, Record<string, string>> = {
    home: {
      id: "Platform transparansi perencanaan pembangunan Indonesia. Akses peta interaktif, dokumen perencanaan, dan berpartisipasi dalam proses perencanaan pembangunan daerah.",
      en: "Indonesian development planning transparency platform. Access interactive maps, planning documents, and participate in regional development planning processes.",
    },
    maps: {
      id: "Jelajahi peta interaktif tata ruang Indonesia. Lihat zonasi, rencana pembangunan, dan data spasial untuk berbagai wilayah di Indonesia.",
      en: "Explore interactive spatial planning maps of Indonesia. View zoning, development plans, and spatial data for various regions across Indonesia.",
    },
    documents: {
      id: "Perpustakaan lengkap dokumen perencanaan Indonesia. Cari dan akses RTRW, RDTR, masterplan, dan regulasi perencanaan terbaru.",
      en: "Complete library of Indonesian planning documents. Search and access RTRW, RDTR, master plans, and latest planning regulations.",
    },
    regions: {
      id: "Eksplorasi perencanaan pembangunan daerah di Indonesia. Data perencanaan provinsi, kabupaten, dan kota untuk transparansi publik.",
      en: "Explore regional development planning across Indonesia. Provincial, regency, and city planning data for public transparency.",
    },
    projects: {
      id: "Pantau proyek pembangunan Indonesia. Lihat status, lokasi, dan detail proyek infrastruktur dan pembangunan daerah terkini.",
      en: "Monitor Indonesian development projects. View status, locations, and details of current infrastructure and regional development projects.",
    },
    participate: {
      id: "Berpartisipasi dalam perencanaan pembangunan. Platform konsultasi publik untuk memberikan masukan terhadap rencana pembangunan daerah.",
      en: "Participate in development planning. Public consultation platform to provide input on regional development plans.",
    },
    about: {
      id: "Tentang Plan ForPublic.id - platform transparansi perencanaan pembangunan Indonesia. Visi, misi, dan komitmen kami untuk keterbukaan informasi publik.",
      en: "About Plan ForPublic.id - Indonesian development planning transparency platform. Our vision, mission, and commitment to public information openness.",
    },
    glossary: {
      id: "Glosarium lengkap istilah perencanaan pembangunan Indonesia. Definisi RTRW, zonasi, tata ruang, dan terminologi perencanaan lainnya.",
      en: "Complete glossary of Indonesian development planning terms. Definitions of RTRW, zoning, spatial planning, and other planning terminology.",
    },
  };

  let description =
    descriptions[page]?.[locale] || siteConfig.description[locale];

  // Add context if provided
  if (context?.region && context.count) {
    const contextText =
      locale === "id"
        ? `Wilayah ${context.region} memiliki ${context.count} dokumen perencanaan yang dapat diakses publik.`
        : `${context.region} region has ${context.count} planning documents available for public access.`;
    description = `${description} ${contextText}`;
  }

  return description;
}

// Generate base metadata for pages
export function generateMetadata(
  page: string,
  locale: "id" | "en",
  context?: {
    region?: string;
    document?: string;
    count?: number;
    year?: string;
    additionalKeywords?: string[];
  },
): Metadata {
  const title = generatePageTitle(page, locale, context);
  const description = generatePageDescription(page, locale, context);
  const keywords = generatePageKeywords(
    page,
    locale,
    context?.additionalKeywords,
  );

  const alternateLocale = locale === "id" ? "en" : "id";
  const currentPath = page === "home" ? "" : `/${page}`;

  return {
    metadataBase: siteConfig.metadataBase,
    title,
    description,
    keywords: keywords.join(", "),
    authors: [{ name: siteConfig.creator }],
    creator: siteConfig.creator,
    publisher: siteConfig.publisher,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title,
      description,
      url: `${siteConfig.url}/${locale}${currentPath}`,
      images: [
        {
          url: `${siteConfig.url}/og-${page}.png`,
          width: 1200,
          height: 630,
          alt: title,
          type: "image/png",
        },
      ],
      locale: locale === "id" ? "id_ID" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      site: "@forpublicid",
      creator: "@forpublicid",
      title,
      description,
      images: [`${siteConfig.url}/og-${page}.png`],
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}${currentPath}`,
      languages: {
        "id-ID": `${siteConfig.url}/id${currentPath}`,
        "en-US": `${siteConfig.url}/en${currentPath}`,
      },
    },
    other: {
      "facebook-domain-verification": "placeholder", // Add if needed
      "google-site-verification": "placeholder", // Add if needed
    },
  };
}

// Generate structured data
export function generateStructuredData(
  page: string,
  locale: "id" | "en",
  context?: any,
) {
  const baseUrl = siteConfig.url;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: baseUrl,
    logo: `${baseUrl}/logo.svg`,
    description: siteConfig.description[locale],
    sameAs: ["https://github.com/forpublic-id", "https://x.com/forpublicid"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Partnership Inquiries",
      email: "plan@forpublic.id",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: baseUrl,
    description: siteConfig.description[locale],
    inLanguage: locale === "id" ? "id-ID" : "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/${locale}/documents?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "id" ? "Beranda" : "Home",
        item: `${baseUrl}/${locale}`,
      },
    ],
  };

  // Add current page to breadcrumb
  if (page !== "home") {
    const pageName = generatePageTitle(page, locale).split(" | ")[0];
    breadcrumbSchema.itemListElement.push({
      "@type": "ListItem",
      position: 2,
      name: pageName,
      item: `${baseUrl}/${locale}/${page}`,
    });
  }

  return {
    organization: organizationSchema,
    website: websiteSchema,
    breadcrumb: breadcrumbSchema,
  };
}
