export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-gray-600 mb-4">Halaman tidak ditemukan</p>
        <a href="/" className="text-blue-600 hover:underline">
          Kembali ke beranda
        </a>
      </div>
    </div>
  );
}