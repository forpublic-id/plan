import Link from "next/link";

const locales = ["id", "en"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return {
    title: "Plan ForPublic.id - Platform Transparansi Perencanaan Indonesia",
    description: "Platform komprehensif untuk transparansi perencanaan pembangunan Indonesia, peta zonasi interaktif, dan partisipasi publik dalam perencanaan tata ruang",
    keywords: "perencanaan indonesia, tata ruang, peta zonasi, perencanaan pembangunan, transparansi, partisipasi publik, RTRW, RDTR",
  };
}

// Header Component
function Header({ locale }: { locale: string }) {
  const navigation = [
    { key: "home", href: "/", label: "Beranda", icon: "🏠" },
    { key: "maps", href: "/maps", label: "Peta Interaktif", icon: "🗺️" },
    { key: "documents", href: "/documents", label: "Dokumen", icon: "📋" },
    { key: "regions", href: "/regions", label: "Wilayah", icon: "🏞️" },
    { key: "participate", href: "/participate", label: "Partisipasi", icon: "👥" },
    { key: "about", href: "/about", label: "Tentang", icon: "ℹ️" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-orange-600 text-white rounded-md font-bold text-sm">
              📍
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">
                Plan <span className="text-orange-600">ForPublic</span><span className="text-red-600">.id</span>
              </span>
              <span className="text-xs text-gray-500 font-medium">
                Transparansi Perencanaan Indonesia
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                className="flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Language Switcher */}
          <div className="flex items-center space-x-2">
            <Link
              href={`/${locale === 'id' ? 'en' : 'id'}`}
              className="flex items-center px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-colors"
            >
              <span className="mr-1">🌐</span>
              {locale === 'id' ? 'EN' : 'ID'}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

// Footer Component
function Footer({ locale }: { locale: string }) {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-orange-600 rounded text-white text-xs flex items-center justify-center font-bold">
                📍
              </div>
              <span className="font-bold">Plan ForPublic.id</span>
            </div>
            <p className="text-gray-400 text-sm">
              Platform transparansi perencanaan pembangunan Indonesia yang komprehensif dan mudah diakses.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <div className="space-y-2 text-sm">
              <Link href={`/${locale}/maps`} className="block text-gray-400 hover:text-white transition-colors">
                Peta Interaktif
              </Link>
              <Link href={`/${locale}/documents`} className="block text-gray-400 hover:text-white transition-colors">
                Perpustakaan Dokumen
              </Link>
              <Link href={`/${locale}/participate`} className="block text-gray-400 hover:text-white transition-colors">
                Partisipasi Publik
              </Link>
            </div>
          </div>

          {/* Wilayah */}
          <div>
            <h3 className="font-semibold mb-4">Wilayah</h3>
            <div className="space-y-2 text-sm">
              <Link href={`/${locale}/regions`} className="block text-gray-400 hover:text-white transition-colors">
                Pencarian Regional
              </Link>
              <div className="text-gray-400">Jakarta</div>
              <div className="text-gray-400">Bandung</div>
              <div className="text-gray-400">Surabaya</div>
            </div>
          </div>

          {/* Tentang */}
          <div>
            <h3 className="font-semibold mb-4">Tentang</h3>
            <div className="space-y-2 text-sm">
              <Link href={`/${locale}/about`} className="block text-gray-400 hover:text-white transition-colors">
                Tentang Platform
              </Link>
              <Link href={`/${locale}/glossary`} className="block text-gray-400 hover:text-white transition-colors">
                Glosarium
              </Link>
              <div className="text-gray-400">Kontak</div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-400">
            © 2024 ForPublic.id. Platform transparansi untuk Indonesia yang lebih baik.
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-xs text-gray-500">Powered by</span>
            <span className="text-orange-500 font-semibold">ForPublic.id</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <div className="min-h-screen flex flex-col bg-white">
          <Header locale={locale} />
          <main className="flex-1">{children}</main>
          <Footer locale={locale} />
        </div>
      </body>
    </html>
  );
}
