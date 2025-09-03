import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { MapPin, Search, Filter, Download, Eye } from "lucide-react";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const localeTyped = locale as "id" | "en";

  return generateSEOMetadata("regions", localeTyped, {
    additionalKeywords: ["wilayah", "regions", "provinsi", "kabupaten", "spatial"],
  });
}

export default async function RegionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "regions" });

  const provinces = [
    {
      id: "dki-jakarta",
      name: "DKI Jakarta",
      type: "Provinsi",
      population: "10.7 juta",
      area: "664 km²",
      planningDocs: 45,
      lastUpdate: "2024-11-15",
      status: "complete",
      coverage: 98.5,
    },
    {
      id: "jawa-barat", 
      name: "Jawa Barat",
      type: "Provinsi",
      population: "48.3 juta",
      area: "35,377 km²", 
      planningDocs: 127,
      lastUpdate: "2024-10-28",
      status: "partial",
      coverage: 76.2,
    },
    {
      id: "jawa-tengah",
      name: "Jawa Tengah", 
      type: "Provinsi",
      population: "36.5 juta",
      area: "32,801 km²",
      planningDocs: 89,
      lastUpdate: "2024-09-12",
      status: "partial", 
      coverage: 68.4,
    },
    {
      id: "jawa-timur",
      name: "Jawa Timur",
      type: "Provinsi", 
      population: "40.7 juta",
      area: "47,800 km²",
      planningDocs: 156,
      lastUpdate: "2024-11-02",
      status: "partial",
      coverage: 82.1,
    },
    {
      id: "sumatra-utara",
      name: "Sumatra Utara",
      type: "Provinsi",
      population: "15.1 juta", 
      area: "72,981 km²",
      planningDocs: 34,
      lastUpdate: "2024-08-15",
      status: "minimal",
      coverage: 34.7,
    },
    {
      id: "sulawesi-selatan",
      name: "Sulawesi Selatan",
      type: "Provinsi",
      population: "9.1 juta",
      area: "46,717 km²", 
      planningDocs: 28,
      lastUpdate: "2024-07-20",
      status: "minimal",
      coverage: 28.9,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete": return "bg-green-100 text-green-800";
      case "partial": return "bg-yellow-100 text-yellow-800"; 
      case "minimal": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    if (locale === "id") {
      switch (status) {
        case "complete": return "Lengkap";
        case "partial": return "Parsial";
        case "minimal": return "Minimal";
        default: return "Unknown";
      }
    } else {
      switch (status) {
        case "complete": return "Complete";
        case "partial": return "Partial";
        case "minimal": return "Minimal"; 
        default: return "Unknown";
      }
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {locale === "id" ? "Eksplorasi Wilayah" : "Regional Explorer"}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {locale === "id"
              ? "Jelajahi informasi perencanaan pembangunan per wilayah di Indonesia. Temukan data spasial, dokumen perencanaan, dan proyek pembangunan untuk setiap provinsi dan kabupaten/kota."
              : "Explore development planning information by region in Indonesia. Find spatial data, planning documents, and development projects for each province and regency/city."}
          </p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-lg p-6 shadow-sm border mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={locale === "id" ? "Cari wilayah, provinsi, atau kabupaten..." : "Search region, province, or regency..."}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              {locale === "id" ? "Filter" : "Filter"}
            </Button>
            <Button variant="outline" className="flex items-center">
              <Download className="h-4 w-4 mr-2" />
              {locale === "id" ? "Export" : "Export"}
            </Button>
          </div>
        </div>

        {/* Regions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {provinces.map((province) => (
            <Card key={province.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{province.name}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{province.type}</p>
                  </div>
                  <Badge className={getStatusColor(province.status)}>
                    {getStatusText(province.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{locale === "id" ? "Populasi:" : "Population:"}</span>
                    <span className="font-medium">{province.population}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{locale === "id" ? "Luas:" : "Area:"}</span>
                    <span className="font-medium">{province.area}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{locale === "id" ? "Dokumen:" : "Documents:"}</span>
                    <span className="font-medium">{province.planningDocs}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{locale === "id" ? "Cakupan:" : "Coverage:"}</span>
                    <span className="font-medium">{province.coverage}%</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Link href={`/${locale}/maps?region=${province.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      {locale === "id" ? "Lihat Peta" : "View Maps"}
                    </Button>
                  </Link>
                  <Link href={`/${locale}/documents?region=${province.id}`} className="flex-1">
                    <Button size="sm" className="w-full">
                      {locale === "id" ? "Dokumen" : "Documents"}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Coverage Map Info */}
        <div className="mt-16 bg-gray-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {locale === "id" ? "Cakupan Data Nasional" : "National Data Coverage"}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                {locale === "id" ? "Prioritas Pengembangan" : "Development Priorities"}
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• {locale === "id" ? "Pulau Jawa: Cakupan lengkap semua provinsi" : "Java Island: Complete coverage for all provinces"}</li>
                <li>• {locale === "id" ? "Sumatra: Fokus pada 5 provinsi utama" : "Sumatra: Focus on 5 major provinces"}</li>
                <li>• {locale === "id" ? "Sulawesi: Pengembangan bertahap" : "Sulawesi: Gradual development"}</li>
                <li>• {locale === "id" ? "Kalimantan: Kota-kota besar prioritas" : "Kalimantan: Major cities priority"}</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                {locale === "id" ? "Cara Berkontribusi" : "How to Contribute"}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {locale === "id"
                  ? "Bantu kami melengkapi data perencanaan untuk wilayah Anda dengan menjadi kontributor komunitas."
                  : "Help us complete planning data for your region by becoming a community contributor."}
              </p>
              <Button className="w-full">
                {locale === "id" ? "Bergabung Sebagai Kontributor" : "Join as Contributor"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}