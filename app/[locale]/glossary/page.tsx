import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Search, BookOpen, Hash } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const localeTyped = locale as "id" | "en";

  return generateSEOMetadata("glossary", localeTyped, {
    additionalKeywords: ["glosarium", "glossary", "istilah", "definisi", "perencanaan"],
  });
}

export default async function GlossaryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "glossary" });

  const glossaryTerms = [
    {
      term: "RTRW",
      fullName: locale === "id" ? "Rencana Tata Ruang Wilayah" : "Regional Spatial Plan",
      definition: locale === "id" 
        ? "Dokumen perencanaan tata ruang yang mengatur distribusi penduduk dan kegiatan masyarakat, serta rencana investasi dalam suatu wilayah administratif."
        : "Spatial planning document that regulates population distribution and community activities, as well as investment plans within an administrative area.",
      category: "Planning Documents",
    },
    {
      term: "RDTR", 
      fullName: locale === "id" ? "Rencana Detail Tata Ruang" : "Detailed Spatial Plan",
      definition: locale === "id"
        ? "Penjabaran dari RTRW yang lebih detail untuk kawasan tertentu, biasanya dalam skala 1:5.000, dilengkapi dengan peraturan zonasi."
        : "Detailed elaboration of RTRW for specific areas, usually at 1:5,000 scale, complete with zoning regulations.",
      category: "Planning Documents",
    },
    {
      term: "KLB",
      fullName: locale === "id" ? "Koefisien Lantai Bangunan" : "Floor Area Ratio",
      definition: locale === "id"
        ? "Rasio antara luas seluruh lantai bangunan terhadap luas lahan yang dapat dibangun. Mengatur kepadatan bangunan di suatu kawasan."
        : "Ratio between total floor area of buildings to buildable land area. Regulates building density in an area.",
      category: "Building Regulations",
    },
    {
      term: "KDB",
      fullName: locale === "id" ? "Koefisien Dasar Bangunan" : "Building Coverage Ratio", 
      definition: locale === "id"
        ? "Rasio antara luas lantai dasar bangunan terhadap luas lahan. Mengatur berapa persen lahan yang boleh ditutup bangunan."
        : "Ratio between ground floor area and land area. Regulates what percentage of land can be covered by buildings.",
      category: "Building Regulations",
    },
    {
      term: "GSB",
      fullName: locale === "id" ? "Garis Sempadan Bangunan" : "Building Setback Line",
      definition: locale === "id"
        ? "Batas minimum jarak antara bangunan dengan tepi jalan, sungai, atau batas kavling untuk kepentingan keamanan dan estetika."
        : "Minimum distance boundary between buildings and road edges, rivers, or plot boundaries for safety and aesthetic purposes.",
      category: "Building Regulations",
    },
    {
      term: "Zonasi",
      fullName: locale === "id" ? "Zonasi" : "Zoning",
      definition: locale === "id"
        ? "Pembagian wilayah berdasarkan fungsi dan karakteristik tertentu, seperti zona perumahan, komersial, industri, dan ruang terbuka."
        : "Division of areas based on specific functions and characteristics, such as residential, commercial, industrial, and open space zones.",
      category: "Spatial Planning",
    },
    {
      term: "RTH",
      fullName: locale === "id" ? "Ruang Terbuka Hijau" : "Green Open Space",
      definition: locale === "id"
        ? "Area memanjang/jalur dan/atau mengelompok yang penggunaannya lebih bersifat terbuka, tempat tumbuh tanaman, baik yang tumbuh secara alamiah maupun yang sengaja ditanam."
        : "Linear/pathway and/or clustered areas that are more open in use, where plants grow, either naturally or intentionally planted.",
      category: "Environmental",
    },
    {
      term: "AMDAL",
      fullName: locale === "id" ? "Analisis Mengenai Dampak Lingkungan" : "Environmental Impact Assessment",
      definition: locale === "id"
        ? "Kajian mengenai dampak penting suatu usaha dan/atau kegiatan yang direncanakan pada lingkungan hidup yang diperlukan bagi proses pengambilan keputusan."
        : "Study of important impacts of planned business and/or activities on the environment required for decision-making processes.",
      category: "Environmental",
    },
    {
      term: "TOD",
      fullName: locale === "id" ? "Transit Oriented Development" : "Transit Oriented Development",
      definition: locale === "id"
        ? "Konsep pengembangan kawasan yang berpusat pada sistem transportasi publik untuk menciptakan lingkungan yang ramah lingkungan dan efisien."
        : "Area development concept centered on public transportation systems to create environmentally friendly and efficient environments.",
      category: "Urban Development",
    },
    {
      term: "Mixed Use",
      fullName: locale === "id" ? "Penggunaan Campuran" : "Mixed Use",
      definition: locale === "id"
        ? "Konsep pengembangan kawasan yang mengintegrasikan berbagai fungsi seperti hunian, komersial, dan perkantoran dalam satu area."
        : "Area development concept that integrates various functions such as residential, commercial, and office in one area.",
      category: "Urban Development",
    },
  ];

  const categories = [...new Set(glossaryTerms.map(term => term.category))];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {locale === "id" ? "Glosarium Perencanaan" : "Planning Glossary"}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {locale === "id"
              ? "Kamus istilah dan definisi penting dalam perencanaan tata ruang dan pembangunan Indonesia."
              : "Dictionary of important terms and definitions in Indonesian spatial planning and development."}
          </p>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg p-6 shadow-sm border mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder={locale === "id" ? "Cari istilah atau definisi..." : "Search terms or definitions..."}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {locale === "id" ? "Kategori" : "Categories"}
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <span
                key={category}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium cursor-pointer hover:bg-blue-200 transition-colors"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        {/* Terms List */}
        <div className="space-y-4">
          {glossaryTerms.map((item, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {item.term}
                    </h3>
                    <p className="text-sm font-medium text-blue-600">
                      {item.fullName}
                    </p>
                  </div>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                    {item.category}
                  </span>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {item.definition}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Term CTA */}
        <div className="mt-16 text-center bg-white rounded-xl p-8 shadow-sm border">
          <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {locale === "id" ? "Bantu Lengkapi Glosarium" : "Help Complete the Glossary"}
          </h2>
          <p className="text-gray-600 mb-6">
            {locale === "id"
              ? "Tidak menemukan istilah yang Anda cari? Bantu kami melengkapi glosarium dengan menambahkan definisi baru."
              : "Can't find the term you're looking for? Help us complete the glossary by adding new definitions."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
              {locale === "id" ? "Usulkan Istilah Baru" : "Suggest New Term"}
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
              {locale === "id" ? "Perbaiki Definisi" : "Improve Definition"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}