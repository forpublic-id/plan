import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MessageSquare, Calendar, FileText, Users, Bell, Vote } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const localeTyped = locale as "id" | "en";

  return generateSEOMetadata("participate", localeTyped, {
    additionalKeywords: ["partisipasi", "participation", "konsultasi", "public hearing"],
  });
}

export default async function ParticipatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "participate" });

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {locale === "id" ? "Partisipasi Publik" : "Public Participation"}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {locale === "id"
              ? "Berpartisipasilah dalam proses perencanaan pembangunan Indonesia. Suara Anda penting untuk menciptakan lingkungan yang lebih baik."
              : "Participate in Indonesia's development planning processes. Your voice matters in creating a better environment."}
          </p>
        </div>

        {/* Participation Methods */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>
                {locale === "id" ? "Konsultasi Online" : "Online Consultation"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                {locale === "id"
                  ? "Berikan masukan dan komentar terhadap rencana pembangunan melalui platform digital yang mudah diakses."
                  : "Provide input and comments on development plans through an easily accessible digital platform."}
              </p>
              <Button className="w-full">
                {locale === "id" ? "Mulai Konsultasi" : "Start Consultation"}
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>
                {locale === "id" ? "Dengar Pendapat" : "Public Hearings"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                {locale === "id"
                  ? "Ikuti jadwal dengar pendapat publik dan acara konsultasi yang diselenggarakan pemerintah daerah."
                  : "Follow public hearing schedules and consultation events organized by local governments."}
              </p>
              <Button variant="outline" className="w-full">
                {locale === "id" ? "Lihat Jadwal" : "View Schedule"}
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>
                {locale === "id" ? "Pengajuan Masukan" : "Submit Feedback"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                {locale === "id"
                  ? "Ajukan masukan tertulis, keberatan, atau usulan perbaikan terhadap dokumen perencanaan."
                  : "Submit written feedback, objections, or improvement suggestions on planning documents."}
              </p>
              <Button variant="outline" className="w-full">
                {locale === "id" ? "Kirim Masukan" : "Send Feedback"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Active Consultations */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {locale === "id" ? "Konsultasi Aktif" : "Active Consultations"}
          </h2>
          <div className="space-y-6">
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {locale === "id"
                        ? "Revisi RTRW Provinsi Jawa Barat 2024-2044"
                        : "West Java Provincial Spatial Plan Revision 2024-2044"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {locale === "id" ? "Pemerintah Provinsi Jawa Barat" : "West Java Provincial Government"}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    {locale === "id" ? "Aktif" : "Active"}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {locale === "id"
                    ? "Konsultasi publik untuk revisi Rencana Tata Ruang Wilayah Provinsi Jawa Barat periode 2024-2044. Masukan masyarakat diperlukan untuk penyesuaian zonasi dan arahan pembangunan."
                    : "Public consultation for the revision of West Java Provincial Spatial Plan 2024-2044. Public input is needed for zoning adjustments and development directions."}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    {locale === "id" ? "Berakhir: 15 Oktober 2024" : "Ends: October 15, 2024"}
                  </div>
                  <Button size="sm">
                    {locale === "id" ? "Berpartisipasi" : "Participate"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {locale === "id"
                        ? "Rencana Detail Tata Ruang Kota Bandung Tengah"
                        : "Central Bandung Detailed Spatial Plan"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {locale === "id" ? "Pemerintah Kota Bandung" : "Bandung City Government"}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                    {locale === "id" ? "Segera Berakhir" : "Ending Soon"}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {locale === "id"
                    ? "Penyusunan RDTR untuk kawasan Bandung Tengah dengan fokus pada revitalisasi area bersejarah dan pengembangan ekonomi kreatif."
                    : "RDTR development for Central Bandung area focusing on historical area revitalization and creative economy development."}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    {locale === "id" ? "Berakhir: 25 September 2024" : "Ends: September 25, 2024"}
                  </div>
                  <Button size="sm" variant="outline">
                    {locale === "id" ? "Berpartisipasi" : "Participate"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How to Participate */}
        <div className="bg-white rounded-xl p-8 shadow-sm border">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === "id" ? "Cara Berpartisipasi" : "How to Participate"}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                {locale === "id" ? "Langkah-langkah" : "Steps"}
              </h3>
              <ol className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">
                    1
                  </span>
                  {locale === "id"
                    ? "Pilih konsultasi atau proyek yang ingin Anda ikuti"
                    : "Choose the consultation or project you want to follow"}
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">
                    2
                  </span>
                  {locale === "id"
                    ? "Pelajari dokumen perencanaan yang tersedia"
                    : "Study the available planning documents"}
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">
                    3
                  </span>
                  {locale === "id"
                    ? "Berikan masukan konstruktif melalui formulir online"
                    : "Provide constructive input through online forms"}
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">
                    4
                  </span>
                  {locale === "id"
                    ? "Ikuti perkembangan respon dan implementasi"
                    : "Follow response developments and implementation"}
                </li>
              </ol>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">
                {locale === "id" ? "Tips Partisipasi Efektif" : "Effective Participation Tips"}
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• {locale === "id" ? "Berikan masukan yang spesifik dan konstruktif" : "Provide specific and constructive feedback"}</li>
                <li>• {locale === "id" ? "Sertakan alasan atau data pendukung" : "Include reasoning or supporting data"}</li>
                <li>• {locale === "id" ? "Fokus pada dampak terhadap komunitas" : "Focus on community impact"}</li>
                <li>• {locale === "id" ? "Gunakan bahasa yang sopan dan profesional" : "Use polite and professional language"}</li>
                <li>• {locale === "id" ? "Ikuti perkembangan hingga selesai" : "Follow up until completion"}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}