"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import {
  Menu,
  X,
  Globe,
  Map,
  FileText,
  Building2,
  Users,
  Info,
  BookOpen,
} from "lucide-react";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Extract current locale from pathname
  const currentLocale = pathname.startsWith("/en") ? "en" : "id";
  const pathWithoutLocale = pathname.replace(/^\/(id|en)/, "");

  const navigation = [
    {
      name: t("home"),
      href: `/${currentLocale}`,
      icon: Building2,
      current: pathWithoutLocale === "",
    },
    {
      name: t("maps"),
      href: `/${currentLocale}/maps`,
      icon: Map,
      current: pathWithoutLocale.startsWith("/maps"),
    },
    {
      name: t("documents"),
      href: `/${currentLocale}/documents`,
      icon: FileText,
      current: pathWithoutLocale.startsWith("/documents"),
    },
    {
      name: t("regions"),
      href: `/${currentLocale}/regions`,
      icon: Globe,
      current: pathWithoutLocale.startsWith("/regions"),
    },
    {
      name: t("projects"),
      href: `/${currentLocale}/projects`,
      icon: Building2,
      current: pathWithoutLocale.startsWith("/projects"),
    },
    {
      name: t("participate"),
      href: `/${currentLocale}/participate`,
      icon: Users,
      current: pathWithoutLocale.startsWith("/participate"),
    },
    {
      name: t("about"),
      href: `/${currentLocale}/about`,
      icon: Info,
      current: pathWithoutLocale.startsWith("/about"),
    },
    {
      name: t("glossary"),
      href: `/${currentLocale}/glossary`,
      icon: BookOpen,
      current: pathWithoutLocale.startsWith("/glossary"),
    },
  ];

  const switchLocale = () => {
    const newLocale = currentLocale === "id" ? "en" : "id";
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href={`/${currentLocale}`}
              className="flex items-center space-x-2"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">
                P
              </div>
              <div className="hidden font-bold sm:block">Plan ForPublic.id</div>
              <Badge
                variant="secondary"
                className="hidden text-xs sm:inline-flex"
              >
                Beta
              </Badge>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    item.current
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Language Switcher & Mobile Menu */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={switchLocale}
              className="hidden sm:flex items-center space-x-1"
            >
              <Globe className="h-4 w-4" />
              <span className="uppercase">{currentLocale}</span>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center space-x-2 rounded-md px-3 py-2 text-base font-medium transition-colors",
                      item.current
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}

              {/* Mobile Language Switcher */}
              <button
                onClick={() => {
                  switchLocale();
                  setIsMobileMenuOpen(false);
                }}
                className="flex w-full items-center space-x-2 rounded-md px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Globe className="h-5 w-5" />
                <span>
                  {t("languageSwitcher")} ({currentLocale.toUpperCase()})
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
