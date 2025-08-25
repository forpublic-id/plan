import { MetadataRoute } from "next";

const baseUrl = "https://plan.forpublic.id";
const locales = ["id", "en"];

// Define all static pages
const staticPages = [
  { path: "", priority: 1.0, changeFrequency: "daily" as const },
  { path: "maps", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "documents", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "regions", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "projects", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "participate", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "about", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "glossary", priority: 0.5, changeFrequency: "monthly" as const },
];

// Define regional pages (major Indonesian cities)
const majorRegions = [
  "jakarta",
  "surabaya",
  "bandung",
  "medan",
  "bekasi",
  "palembang",
  "tangerang",
  "depok",
  "semarang",
  "makassar",
  "batam",
  "pekanbaru",
  "bandar-lampung",
  "padang",
  "malang",
  "denpasar",
  "samarinda",
  "tasikmalaya",
  "serang",
  "banjarmasin",
];

// Sample planning document categories
const documentCategories = [
  "rtrw", // Regional Spatial Plan
  "rdtr", // Detailed Spatial Plan
  "rtbl", // Building & Environment Plan
  "master-plan",
  "zoning-regulations",
  "development-permits",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add static pages for each locale
  for (const locale of locales) {
    for (const page of staticPages) {
      const url = page.path
        ? `${baseUrl}/${locale}/${page.path}`
        : `${baseUrl}/${locale}`;

      sitemapEntries.push({
        url,
        lastModified: currentDate,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: {
            "id-ID": page.path ? `${baseUrl}/id/${page.path}` : `${baseUrl}/id`,
            "en-US": page.path ? `${baseUrl}/en/${page.path}` : `${baseUrl}/en`,
          },
        },
      });
    }

    // Add regional pages
    for (const region of majorRegions) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/regions/${region}`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.7,
        alternates: {
          languages: {
            "id-ID": `${baseUrl}/id/regions/${region}`,
            "en-US": `${baseUrl}/en/regions/${region}`,
          },
        },
      });

      // Add maps for each region
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/maps/${region}`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: {
          languages: {
            "id-ID": `${baseUrl}/id/maps/${region}`,
            "en-US": `${baseUrl}/en/maps/${region}`,
          },
        },
      });
    }

    // Add document category pages
    for (const category of documentCategories) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/documents/${category}`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.6,
        alternates: {
          languages: {
            "id-ID": `${baseUrl}/id/documents/${category}`,
            "en-US": `${baseUrl}/en/documents/${category}`,
          },
        },
      });
    }

    // Add sample project pages (representing different project types)
    const projectTypes = [
      "infrastructure",
      "housing",
      "commercial",
      "industrial",
      "transportation",
    ];
    for (const projectType of projectTypes) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/projects/${projectType}`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.6,
        alternates: {
          languages: {
            "id-ID": `${baseUrl}/id/projects/${projectType}`,
            "en-US": `${baseUrl}/en/projects/${projectType}`,
          },
        },
      });
    }
  }

  return sitemapEntries;
}
