import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { BarChart3, PieChart, TrendingUp, Map, Download, Filter, Calendar } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const localeTyped = locale as "id" | "en";

  return generateSEOMetadata("analytics", localeTyped, {
    additionalKeywords: ["analitik", "analytics", "data", "statistik", "visualisasi"],
  });
}

export default async function AnalyticsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "analytics" });

  const kpis = [
    {
      title: locale === "id" ? "Total Dokumen" : "Total Documents",
      value: "12,450",
      change: "+8.2%",
      trend: "up",
      period: locale === "id" ? "30 hari terakhir" : "Last 30 days",
    },
    {
      title: locale === "id" ? "Wilayah Tercakup" : "Covered Regions", 
      value: "487",
      change: "+12",
      trend: "up",
      period: locale === "id" ? "Bulan ini" : "This month",
    },
    {
      title: locale === "id" ? "Partisipasi Publik" : "Public Participation",
      value: "2,847",
      change: "+15.4%", 
      trend: "up",
      period: locale === "id" ? "90 hari terakhir" : "Last 90 days",
    },
    {
      title: locale === "id" ? "Proyek Aktif" : "Active Projects",
      value: "342",
      change: "-2.1%",
      trend: "down",
      period: locale === "id" ? "Kuartal ini" : "This quarter",
    },
  ];

  const landUseData = [
    { category: locale === "id" ? "Perumahan" : "Residential", percentage: 35.4, area: "18,672 ha", color: "bg-green-500" },
    { category: locale === "id" ? "Komersial" : "Commercial", percentage: 22.1, area: "11,658 ha", color: "bg-blue-500" },
    { category: locale === "id" ? "Industri" : "Industrial", percentage: 18.7, area: "9,854 ha", color: "bg-yellow-500" },
    { category: locale === "id" ? "RTH" : "Green Space", percentage: 15.2, area: "8,012 ha", color: "bg-emerald-500" },
    { category: locale === "id" ? "Infrastruktur" : "Infrastructure", percentage: 8.6, area: "4,534 ha", color: "bg-gray-500" },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {locale === "id" ? "Analitik Pembangunan" : "Development Analytics"}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {locale === "id"
              ? "Dashboard komprehensif untuk menganalisis tren pembangunan, distribusi penggunaan lahan, dan efektivitas perencanaan di Indonesia."
              : "Comprehensive dashboard to analyze development trends, land use distribution, and planning effectiveness in Indonesia."}
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg p-6 shadow-sm border mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-gray-400" />
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>{locale === "id" ? "2024" : "2024"}</option>
                  <option>{locale === "id" ? "2023" : "2023"}</option>
                  <option>{locale === "id" ? "2022" : "2022"}</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <Map className="h-5 w-5 text-gray-400" />
                <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option>{locale === "id" ? "Semua Wilayah" : "All Regions"}</option>
                  <option>DKI Jakarta</option>
                  <option>Jawa Barat</option>
                  <option>Jawa Tengah</option>
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                {locale === "id" ? "Filter" : "Filter"}
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                {locale === "id" ? "Export" : "Export"}
              </Button>
            </div>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {kpis.map((kpi, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-600">{kpi.title}</h3>
                  <TrendingUp className={`h-4 w-4 ${kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {kpi.value}
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-medium ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {kpi.change}
                  </span>
                  <span className="text-xs text-gray-500">{kpi.period}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Land Use Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="h-5 w-5 mr-2" />
                {locale === "id" ? "Distribusi Penggunaan Lahan" : "Land Use Distribution"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {landUseData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded ${item.color}`}></div>
                      <span className="text-sm font-medium text-gray-900">
                        {item.category}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600">{item.area}</span>
                      <span className="text-sm font-medium text-gray-900">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Development Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                {locale === "id" ? "Tren Pembangunan" : "Development Trends"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center text-gray-500 text-sm py-16">
                  {locale === "id" 
                    ? "Grafik tren pembangunan akan ditampilkan di sini" 
                    : "Development trend charts will be displayed here"}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Regional Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>
              {locale === "id" ? "Perbandingan Antar Wilayah" : "Regional Comparison"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 font-medium text-gray-900">
                      {locale === "id" ? "Provinsi" : "Province"}
                    </th>
                    <th className="text-center py-3 font-medium text-gray-900">
                      {locale === "id" ? "Dokumen" : "Documents"}
                    </th>
                    <th className="text-center py-3 font-medium text-gray-900">
                      {locale === "id" ? "Proyek" : "Projects"}
                    </th>
                    <th className="text-center py-3 font-medium text-gray-900">
                      {locale === "id" ? "Cakupan" : "Coverage"}
                    </th>
                    <th className="text-center py-3 font-medium text-gray-900">
                      {locale === "id" ? "Update Terakhir" : "Last Update"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 font-medium">DKI Jakarta</td>
                    <td className="text-center py-3">1,247</td>
                    <td className="text-center py-3">89</td>
                    <td className="text-center py-3">
                      <Badge className="bg-green-100 text-green-800">98.5%</Badge>
                    </td>
                    <td className="text-center py-3 text-gray-600">15 Nov 2024</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 font-medium">Jawa Barat</td>
                    <td className="text-center py-3">2,893</td>
                    <td className="text-center py-3">156</td>
                    <td className="text-center py-3">
                      <Badge className="bg-yellow-100 text-yellow-800">76.2%</Badge>
                    </td>
                    <td className="text-center py-3 text-gray-600">28 Okt 2024</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50">
                    <td className="py-3 font-medium">Jawa Tengah</td>
                    <td className="text-center py-3">1,965</td>
                    <td className="text-center py-3">97</td>
                    <td className="text-center py-3">
                      <Badge className="bg-yellow-100 text-yellow-800">68.4%</Badge>
                    </td>
                    <td className="text-center py-3 text-gray-600">12 Sep 2024</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 font-medium">Jawa Timur</td>
                    <td className="text-center py-3">2,156</td>
                    <td className="text-center py-3">124</td>
                    <td className="text-center py-3">
                      <Badge className="bg-yellow-100 text-yellow-800">82.1%</Badge>
                    </td>
                    <td className="text-center py-3 text-gray-600">02 Nov 2024</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}