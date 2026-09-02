"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface SidebarLink {
  label: string;
  href: string;
  active?: boolean;
}

interface PageSidebarProps {
  sectionLinks?: SidebarLink[];

  contactCard?: boolean;
}

export function PageSidebar({ sectionLinks = [], contactCard = true }: PageSidebarProps) {
  const { language } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Section Links */}
      {sectionLinks.length > 0 && (
        <div className="bg-[#016B00] text-white rounded-2xl p-6">
          <h3 className="font-bold mb-4">
            {language === "bn" ? "এই বিভাগে" : "In This Section"}
          </h3>
          <nav className="space-y-1">
            {sectionLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className={`flex items-center gap-2 text-sm py-2.5 px-3 rounded-lg transition-colors ${
                  link.active
                    ? "bg-white/20 font-semibold text-white"
                    : "text-green-100 hover:text-white hover:bg-white/10"
                }`}
              >
                <ArrowRight size={14} />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}



      {/* Contact Card */}
      {contactCard && (
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">
            {language === "bn" ? "যোগাযোগ" : "Contact"}
          </h3>
          <div className="space-y-3 text-sm text-gray-600">
            <p className="flex items-start gap-2">
              <span>📍</span>
              <span>
                {language === "bn"
                  ? "দুলারহাট বাজার, চরফ্যাশন, ভোলা"
                  : "Dularhat Bazar, Charfashion, Bhola"}
              </span>
            </p>
            <p className="flex items-center gap-2">
              <span>📞</span>
              <a href="tel:01727379120" className="text-[#016B00] hover:underline">
                01727379120
              </a>
            </p>
            <p className="flex items-center gap-2">
              <span>✉️</span>
              <a
                href="mailto:dularhathighschool@gmail.com"
                className="text-[#016B00] hover:underline break-all"
              >
                dularhathighschool@gmail.com
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
