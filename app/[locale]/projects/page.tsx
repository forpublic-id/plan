import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MapPin, Calendar, DollarSign, Users, Building, Factory, Home, Store } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const localeTyped = locale as "id" | "en";

  return generateSEOMetadata("projects", localeTyped, {
    additionalKeywords: ["proyek", "projects", "pembangunan", "development"],
  });
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "projects" });

  const sampleProjects = [
    {
      id: "proj-001",
      name: locale === "id" ? "Pembangunan MRT Jakarta Fase 2" : "Jakarta MRT Phase 2 Development",
      type: "infrastructure",
      status: "under-construction",
      location: "Jakarta Selatan - Jakarta Barat",
      developer: "PT Jakarta Propertindo",
      budget: "Rp 25.2 T",
      timeline: "2023-2027",
      description: locale === "id" 
        ? "Pengembangan sistem transportasi massal MRT Jakarta koridor Bundaran HI - Kota dengan 13 stasiun baru."
        : "Mass rapid transit system development Jakarta corridor Bundaran HI - Kota with 13 new stations.",
    },
    {
      id: "proj-002", 
      name: locale === "id" ? "Revitalisasi Kawasan Kota Tua" : "Old Town Area Revitalization",
      type: "mixed-use",
      status: "approved",
      location: "Jakarta Barat",
      developer: "Pemprov DKI Jakarta",
      budget: "Rp 1.8 T",
      timeline: "2024-2026",
      description: locale === "id"
        ? "Program revitalisasi kawasan bersejarah Kota Tua dengan konsep heritage tourism dan creative economy."
        : "Historical Old Town area revitalization program with heritage tourism and creative economy concept.",
    },
    {
      id: "proj-003",
      name: locale === "id" ? "Perumahan Rakyat Kampung Susun" : "Kampung Susun Public Housing",
      type: "housing",
      status: "proposed", 
      location: "Jakarta Utara",
      developer: "Perumnas",
      budget: "Rp 850 M",
      timeline: "2025-2028",
      description: locale === "id"
        ? "Pembangunan hunian vertikal untuk relokasi penduduk bantaran kali dengan fasilitas lengkap."
        : "Vertical housing development for riverbank residents relocation with complete facilities.",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "under-construction": return "bg-yellow-100 text-yellow-800";
      case "approved": return "bg-green-100 text-green-800";
      case "proposed": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "infrastructure": return <Building className="h-5 w-5" />;
      case "housing": return <Home className="h-5 w-5" />;
      case "commercial": return <Store className="h-5 w-5" />;
      case "industrial": return <Factory className="h-5 w-5" />;
      case "mixed-use": return <Building className="h-5 w-5" />;
      default: return <Building className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {locale === "id" ? "Proyek Pembangunan" : "Development Projects"}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {locale === "id"
              ? "Pantau progres proyek pembangunan di Indonesia dengan informasi lengkap tentang status, anggaran, dan timeline pelaksanaan."
              : "Monitor development project progress in Indonesia with complete information on status, budget, and implementation timeline."}
          </p>
        </div>

        {/* Filter & Search */}
        <div className="bg-white rounded-lg p-6 shadow-sm border mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {locale === "id" ? "Jenis Proyek" : "Project Type"}
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">{locale === "id" ? "Semua Jenis" : "All Types"}</option>
                <option value="infrastructure">{locale === "id" ? "Infrastruktur" : "Infrastructure"}</option>
                <option value="housing">{locale === "id" ? "Perumahan" : "Housing"}</option>
                <option value="commercial">{locale === "id" ? "Komersial" : "Commercial"}</option>
                <option value="industrial">{locale === "id" ? "Industri" : "Industrial"}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {locale === "id" ? "Status" : "Status"}
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">{locale === "id" ? "Semua Status" : "All Status"}</option>
                <option value="proposed">{locale === "id" ? "Diusulkan" : "Proposed"}</option>
                <option value="approved">{locale === "id" ? "Disetujui" : "Approved"}</option>
                <option value="under-construction">{locale === "id" ? "Pembangunan" : "Under Construction"}</option>
                <option value="completed">{locale === "id" ? "Selesai" : "Completed"}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {locale === "id" ? "Wilayah" : "Region"}
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">{locale === "id" ? "Semua Wilayah" : "All Regions"}</option>
                <option value="jakarta">DKI Jakarta</option>
                <option value="jabar">Jawa Barat</option>
                <option value="jateng">Jawa Tengah</option>
                <option value="jatim">Jawa Timur</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button className="w-full">
                {locale === "id" ? "Cari Proyek" : "Search Projects"}
              </Button>
            </div>
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-6">
          {sampleProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      {getTypeIcon(project.type)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {project.name}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {project.location}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {project.developer}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(project.status)}>
                    {locale === "id" ? 
                      project.status === "under-construction" ? "Pembangunan" :
                      project.status === "approved" ? "Disetujui" :
                      project.status === "proposed" ? "Diusulkan" : "Selesai"
                      : 
                      project.status === "under-construction" ? "Under Construction" :
                      project.status === "approved" ? "Approved" :
                      project.status === "proposed" ? "Proposed" : "Completed"
                    }
                  </Badge>
                </div>

                <p className="text-gray-600 mb-4">
                  {project.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {project.budget}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {project.timeline}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    {locale === "id" ? "Lihat Detail" : "View Details"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-16 grid md:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600 mb-2">342</div>
              <div className="text-sm text-gray-600">{locale === "id" ? "Total Proyek" : "Total Projects"}</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600 mb-2">128</div>
              <div className="text-sm text-gray-600">{locale === "id" ? "Sedang Berjalan" : "In Progress"}</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-yellow-600 mb-2">89</div>
              <div className="text-sm text-gray-600">{locale === "id" ? "Menunggu Persetujuan" : "Pending Approval"}</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-gray-600 mb-2">Rp 445T</div>
              <div className="text-sm text-gray-600">{locale === "id" ? "Total Investasi" : "Total Investment"}</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}