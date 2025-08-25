"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  const currentLocale = pathname.startsWith("/en") ? "en" : "id";
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-100 py-12">
      <div className="container mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
        <div className="text-center">
          {/* Logo and Brand */}
          <Link
            href={`/${currentLocale}`}
            className="inline-flex items-center space-x-2 mb-4 hover:opacity-80 transition-opacity"
          >
            <div className="w-6 h-6">
              <Image
                src="/logo.svg"
                alt="ForPublic.id Logo"
                width={24}
                height={24}
                className="w-full h-full"
              />
            </div>
            <span className="text-lg font-bold">
              Plan ForPublic<span className="text-red-600">.id</span>
            </span>
          </Link>

          {/* Project Description */}
          <p className="text-neutral-300 mb-6 max-w-2xl mx-auto">
            {currentLocale === "id"
              ? "Inisiatif komunitas terbuka untuk transparansi perencanaan pembangunan Indonesia. Platform ini dikelola oleh relawan dan bukan merupakan platform resmi pemerintah."
              : "Open community initiative for Indonesian development planning transparency. This platform is managed by volunteers and is not an official government platform."}
          </p>

          {/* Quick Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 text-sm">
            <Link
              href={`/${currentLocale}/maps`}
              className="text-neutral-300 hover:text-neutral-100 transition-colors"
            >
              {currentLocale === "id" ? "Peta Interaktif" : "Interactive Maps"}
            </Link>
            <span className="hidden sm:inline text-neutral-600">•</span>
            <Link
              href={`/${currentLocale}/documents`}
              className="text-neutral-300 hover:text-neutral-100 transition-colors"
            >
              {currentLocale === "id"
                ? "Dokumen Perencanaan"
                : "Planning Documents"}
            </Link>
            <span className="hidden sm:inline text-neutral-600">•</span>
            <Link
              href="https://forpublic.id"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-300 hover:text-neutral-100 transition-colors"
            >
              {currentLocale === "id" ? "Website Utama" : "Main Website"}
            </Link>
            <span className="hidden sm:inline text-neutral-600">•</span>
            <Link
              href="https://forpublic.id/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-300 hover:text-neutral-100 transition-colors"
            >
              {currentLocale === "id" ? "Kontak" : "Contact"}
            </Link>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-neutral-800">
            <p className="text-neutral-400 text-sm">
              © {currentYear} ForPublic
              <span className="text-red-600">.id</span>.{" "}
              {currentLocale === "id"
                ? "Dibuat dengan ❤️ untuk kebaikan publik. Inisiatif komunitas terbuka, bukan platform resmi pemerintah."
                : "Made with ❤️ for public good. Open community initiative, not an official government platform."}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
