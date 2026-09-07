"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

interface BreadcrumbItem {
  label: { bengali: string; english: string } | string;
  href?: string;
}

interface PageHeaderProps {
  title: { bengali: string; english: string } | string;
  subtitle?: { bengali: string; english: string } | string;
  breadcrumbs?: BreadcrumbItem[];
}

export function PageHeader({ title, subtitle, breadcrumbs = [] }: PageHeaderProps) {
  const { t, language } = useLanguage();

  const getLabel = (label: { bengali: string; english: string } | string) =>
    typeof label === "string" ? label : t(label);

  return (
    <div className="bg-gradient-to-r from-[#016B00] to-[#024D00] text-white py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav className="text-sm text-green-300 mb-4 flex items-center gap-1 flex-wrap" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">
              {language === "bn" ? "হোম" : "Home"}
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1">
                <span className="mx-1">›</span>
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-white transition-colors">
                    {getLabel(crumb.label)}
                  </Link>
                ) : (
                  <span className="text-white">{getLabel(crumb.label)}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <h1 className="text-2xl sm:text-3xl font-bold">{getLabel(title)}</h1>
        {subtitle && (
          <p className="text-green-200 mt-2 text-sm">{getLabel(subtitle)}</p>
        )}
      </div>
    </div>
  );
}
