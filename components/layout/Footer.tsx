"use client";

import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Github, Twitter, Mail, ExternalLink } from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");
  const pathname = usePathname();
  
  // Extract current locale from pathname
  const currentLocale = pathname.startsWith("/en") ? "en" : "id";

  const socialLinks = [
    {
      name: t("social.github"),
      href: "https://github.com/forpublic-id",
      icon: Github,
    },
    {
      name: t("social.twitter"),
      href: "https://twitter.com/forpublic_id",
      icon: Twitter,
    },
    {
      name: t("social.email"),
      href: "mailto:hello@forpublic.id",
      icon: Mail,
    },
  ];

  const footerLinks = [
    {
      name: t("links.about"),
      href: `/${currentLocale}/about`,
    },
    {
      name: t("links.contact"),
      href: `/${currentLocale}/contact`,
    },
    {
      name: t("links.privacy"),
      href: `/${currentLocale}/privacy`,
    },
    {
      name: t("links.terms"),
      href: `/${currentLocale}/terms`,
    },
    {
      name: t("links.api"),
      href: `/${currentLocale}/api`,
    },
    {
      name: t("links.developers"),
      href: `/${currentLocale}/developers`,
    },
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Brand & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">
                P
              </div>
              <span className="font-bold text-lg">Plan ForPublic.id</span>
            </div>
            <p className="text-muted-foreground text-sm leading-6 max-w-md">
              {t("description")}
            </p>
            
            {/* ForPublic.id Ecosystem */}
            <div className="mt-6">
              <p className="text-sm font-medium mb-3">
                {currentLocale === "id" ? "Ecosystem ForPublic.id" : "ForPublic.id Ecosystem"}
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="https://forpublic.id"
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-muted rounded-md hover:bg-muted/80 transition-colors"
                >
                  ForPublic.id
                  <ExternalLink className="w-3 h-3" />
                </Link>
                <Link
                  href="https://salary.forpublic.id"
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-muted rounded-md hover:bg-muted/80 transition-colors"
                >
                  Salary
                  <ExternalLink className="w-3 h-3" />
                </Link>
                <Link
                  href="https://budget.forpublic.id"
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-muted rounded-md hover:bg-muted/80 transition-colors"
                >
                  Budget
                  <ExternalLink className="w-3 h-3" />
                </Link>
                <Link
                  href="https://holiday.forpublic.id"
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-muted rounded-md hover:bg-muted/80 transition-colors"
                >
                  Holiday
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">
              {currentLocale === "id" ? "Tautan Cepat" : "Quick Links"}
            </h3>
            <ul className="space-y-3">
              {footerLinks.slice(0, 3).map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold mb-4">
              {currentLocale === "id" ? "Sumber Daya" : "Resources"}
            </h3>
            <ul className="space-y-3">
              {footerLinks.slice(3).map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-sm text-muted-foreground">
              {t("copyright")}
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span className="sr-only">{item.name}</span>
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Attribution */}
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              {currentLocale === "id" 
                ? "Dibuat dengan ❤️ untuk transparansi publik Indonesia" 
                : "Built with ❤️ for Indonesian public transparency"}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}