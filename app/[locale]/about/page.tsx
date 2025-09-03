import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const localeTyped = locale as "id" | "en";

  return generateSEOMetadata("about", localeTyped, {
    additionalKeywords: ["tentang", "about", "misi", "visi", "tim"],
  });
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {locale === "id" ? "Tentang " : "About "}
            <span className="text-black">Plan ForPublic</span>
            <span className="text-red-600">.id</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {locale === "id"
              ? "Inisiatif berbasis komunitas untuk meningkatkan transparansi perencanaan pembangunan Indonesia melalui teknologi terbuka dan partisipasi publik."
              : "A community-driven initiative to enhance Indonesian development planning transparency through open technology and public participation."}
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white rounded-xl p-8 shadow-sm border">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {locale === "id" ? "Visi Kami" : "Our Vision"}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {locale === "id"
                ? "Menjadi platform utama transparansi perencanaan pembangunan Indonesia yang memberdayakan masyarakat dengan akses informasi terbuka, partisipasi bermakna, dan teknologi yang mudah digunakan untuk menciptakan pembangunan yang berkelanjutan dan inklusif."
                : "To become Indonesia's primary development planning transparency platform that empowers communities with open information access, meaningful participation, and user-friendly technology to create sustainable and inclusive development."}
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {locale === "id" ? "Misi Kami" : "Our Mission"}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {locale === "id"
                ? "Menyediakan akses terbuka ke informasi perencanaan pembangunan, memfasilitasi partisipasi publik yang bermakna, dan membangun ekosistem transparansi yang mendorong akuntabilitas pemerintah dan pembangunan berkelanjutan."
                : "Providing open access to development planning information, facilitating meaningful public participation, and building a transparency ecosystem that promotes government accountability and sustainable development."}
            </p>
          </div>
        </div>

        {/* Key Principles */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {locale === "id" ? "Prinsip Utama" : "Core Principles"}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔓</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {locale === "id" ? "Transparansi" : "Transparency"}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === "id"
                  ? "Informasi perencanaan harus dapat diakses oleh semua masyarakat"
                  : "Planning information should be accessible to all citizens"}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {locale === "id" ? "Partisipasi" : "Participation"}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === "id"
                  ? "Masyarakat memiliki hak untuk berpartisipasi dalam perencanaan"
                  : "Citizens have the right to participate in planning processes"}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚖️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {locale === "id" ? "Akuntabilitas" : "Accountability"}
              </h3>
              <p className="text-gray-600 text-sm">
                {locale === "id"
                  ? "Pembangunan harus dapat dipertanggungjawabkan kepada publik"
                  : "Development must be accountable to the public"}
              </p>
            </div>
          </div>
        </div>

        {/* Team & Community */}
        <div className="bg-gray-50 rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === "id" ? "Tim & Komunitas" : "Team & Community"}
          </h2>
          <p className="text-gray-600 mb-6">
            {locale === "id"
              ? "Plan ForPublic.id dikembangkan oleh komunitas relawan yang terdiri dari urban planner, developer, akademisi, dan aktivis transparansi. Kami berkomitmen untuk membangun platform yang benar-benar melayani kepentingan publik."
              : "Plan ForPublic.id is developed by a volunteer community consisting of urban planners, developers, academics, and transparency activists. We are committed to building a platform that truly serves the public interest."}
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === "id" ? "Kontributor Inti" : "Core Contributors"}
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Urban Planners & Policy Experts</li>
                <li>• Software Engineers & Data Scientists</li>
                <li>• GIS Specialists & Cartographers</li>
                <li>• Community Organizers & Activists</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {locale === "id" ? "Bergabung dengan Kami" : "Join Us"}
              </h3>
              <p className="text-sm text-gray-600">
                {locale === "id"
                  ? "Tertarik berkontribusi? Hubungi kami melalui GitHub atau email untuk bergabung dengan gerakan transparansi perencanaan."
                  : "Interested in contributing? Contact us through GitHub or email to join the planning transparency movement."}
              </p>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {locale === "id" ? "Teknologi Terbuka" : "Open Technology"}
          </h2>
          <p className="text-gray-600 mb-8">
            {locale === "id"
              ? "Dibangun dengan teknologi modern dan open source untuk transparansi maksimal"
              : "Built with modern open source technology for maximum transparency"}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Next.js 15
            </span>
            <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              React 19
            </span>
            <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              TypeScript
            </span>
            <span className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
              Leaflet.js
            </span>
            <span className="px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-medium">
              Tailwind CSS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}