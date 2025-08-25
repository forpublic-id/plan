import Link from "next/link";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const localeTyped = locale as "id" | "en";

  return generateSEOMetadata("home", localeTyped, {
    additionalKeywords: ["beranda", "home", "dashboard", "platform utama"],
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-neutral-50 via-white to-neutral-50 py-20 px-4">
        <div className="absolute inset-0 bg-grid-neutral-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-neutral-100 text-neutral-800 rounded-full text-sm font-medium mb-8">
            {locale === "id"
              ? "Platform Transparansi Perencanaan Berbasis Komunitas"
              : "Community-Driven Planning Transparency Platform"}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {t("hero.title")}{" "}
            <span className="text-black">ForPublic</span>
            <span className="text-red-600">.id</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/maps`}
              className="inline-flex items-center justify-center px-8 py-4 bg-neutral-600 text-white font-semibold rounded-lg hover:bg-neutral-700 transition-colors shadow-lg"
            >
              {t("hero.cta.primary")}
            </Link>
            <Link
              href={`/${locale}/documents`}
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-neutral-600 font-semibold rounded-lg border-2 border-neutral-200 hover:bg-neutral-50 transition-colors shadow-sm"
            >
              {t("hero.cta.secondary")}
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-neutral-600 mb-2">
                34
              </div>
              <div className="text-gray-600 text-sm font-medium">Provinsi</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-neutral-500 mb-2">
                514
              </div>
              <div className="text-gray-600 text-sm font-medium">
                Kabupaten/Kota
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-neutral-500 mb-2">
                12,450+
              </div>
              <div className="text-gray-600 text-sm font-medium">
                Dokumen Perencanaan
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-neutral-600 mb-2">
                98.7%
              </div>
              <div className="text-gray-600 text-sm font-medium">
                Cakupan Transparansi
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Fitur Unggulan Platform
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Akses lengkap informasi perencanaan pembangunan Indonesia dalam
              satu platform terintegrasi
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border">
              <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">🗺️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Peta Perencanaan Interaktif
              </h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Visualisasi zonasi dengan kode warna, overlay master plan dengan
                fase pembangunan, dan peta interaktif untuk eksplorasi detail
                wilayah.
              </p>
              <Link
                href={`/${locale}/maps`}
                className="text-neutral-600 font-medium text-sm hover:text-neutral-700 transition-colors"
              >
                Jelajahi Peta →
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border">
              <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">📚</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Perpustakaan Dokumen
              </h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Akses ke ribuan dokumen perencanaan RTRW, RDTR, master plan
                pembangunan dengan pencarian canggih dan filter berdasarkan
                wilayah.
              </p>
              <Link
                href={`/${locale}/documents`}
                className="text-neutral-600 font-medium text-sm hover:text-neutral-700 transition-colors"
              >
                Buka Perpustakaan →
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border">
              <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">👥</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Partisipasi Publik
              </h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Platform konsultasi publik online, pengajuan masukan masyarakat,
                dan jadwal dengar pendapat untuk perencanaan pembangunan.
              </p>
              <Link
                href={`/${locale}/participate`}
                className="text-neutral-600 font-medium text-sm hover:text-neutral-700 transition-colors"
              >
                Ikut Berpartisipasi →
              </Link>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border">
              <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">🔍</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Pencarian Informasi
              </h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Cari informasi perencanaan berdasarkan lokasi, jenis penggunaan
                lahan, atau kata kunci dengan sistem pencarian geografis yang
                canggih.
              </p>
              <Link
                href={`/${locale}/regions`}
                className="text-neutral-600 font-medium text-sm hover:text-neutral-700 transition-colors"
              >
                Mulai Pencarian →
              </Link>
            </div>

            {/* Feature 5 */}
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border">
              <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">📊</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Analitik Pembangunan
              </h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Dashboard analisis distribusi penggunaan lahan, pemetaan
                kepadatan pembangunan, dan visualisasi dampak lingkungan
                berbasis data.
              </p>
              <Link
                href={`/${locale}/analytics`}
                className="text-neutral-600 font-medium text-sm hover:text-neutral-700 transition-colors"
              >
                Lihat Analitik →
              </Link>
            </div>

            {/* Feature 6 */}
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border">
              <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">🌐</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Multi-bahasa
              </h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                Dukungan penuh bahasa Indonesia dan Inggris untuk aksesibilitas
                internasional dengan konten yang konsisten dan terjemahan
                profesional.
              </p>
              <Link
                href={`/${locale === "id" ? "en" : "id"}`}
                className="text-neutral-600 font-medium text-sm hover:text-neutral-700 transition-colors"
              >
                Switch to {locale === "id" ? "English" : "Bahasa Indonesia"} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white text-gray-900 border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t("cta.title")}
          </h2>
          <p className="text-lg mb-8 text-gray-600 max-w-3xl mx-auto">
            {t("cta.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/about`}
              className="inline-flex items-center justify-center px-8 py-3 bg-neutral-600 text-white font-semibold rounded-lg hover:bg-neutral-700 transition-colors shadow-sm"
            >
              {t("cta.buttons.learn")}
            </Link>
            <Link
              href={`/${locale}/participate`}
              className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-neutral-600 text-neutral-600 font-semibold rounded-lg hover:bg-neutral-600 hover:text-white transition-colors"
            >
              {t("cta.buttons.participate")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
