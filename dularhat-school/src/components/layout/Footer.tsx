"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { schoolData, navLinks } from "@/data/school-data";

export function Footer() {
  const { t, language } = useLanguage();
  const year = new Date().getFullYear();

  const quickLinks = navLinks.slice(0, 6);
  const moreLinks = navLinks.slice(6);

  return (
    <footer className="bg-[#016B00] text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <Image
                  src={schoolData.logo_url}
                  alt="School Logo"
                  width={36}
                  height={36}
                  className="rounded-full"
                />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight">
                  {t(schoolData.name)}
                </h3>
                <p className="text-green-300 text-xs">
                  {language === "bn" ? "EIIN: " : "EIIN: "}
                  {schoolData.eiin}
                </p>
              </div>
            </div>
            <p className="text-green-200 text-sm leading-relaxed">
              {language === "bn"
                ? "চরফ্যাশন উপজেলার পশ্চিমাঞ্চলের প্রথম শিক্ষা প্রতিষ্ঠান। ১৯৬৩ সালে প্রতিষ্ঠিত।"
                : "The first educational institution in the western part of Charfashion Upazila. Established in 1963."}
            </p>
            <p className="mt-3 text-xs text-green-300 italic">
              &ldquo;{t(schoolData.tagline)}&rdquo;
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide border-b border-green-600 pb-2">
              {language === "bn" ? "দ্রুত লিঙ্ক" : "Quick Links"}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-green-200 hover:text-white text-sm transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-green-500">›</span>
                    {t(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide border-b border-green-600 pb-2">
              {language === "bn" ? "আরও" : "More"}
            </h4>
            <ul className="space-y-2">
              {moreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-green-200 hover:text-white text-sm transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-green-500">›</span>
                    {t(link.label)}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/admin"
                  className="text-green-300 hover:text-white text-sm transition-colors flex items-center gap-1.5"
                >
                  <span className="text-green-500">›</span>
                  {language === "bn" ? "অ্যাডমিন প্যানেল" : "Admin Panel"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide border-b border-green-600 pb-2">
              {language === "bn" ? "যোগাযোগ" : "Contact"}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-green-200 text-sm">
                <MapPin size={15} className="mt-0.5 flex-shrink-0 text-green-400" />
                <span>{t(schoolData.address)}</span>
              </li>
              <li>
                <a
                  href={`tel:${schoolData.contact.mobile_1}`}
                  className="flex items-center gap-2 text-green-200 hover:text-white text-sm transition-colors"
                >
                  <Phone size={15} className="text-green-400" />
                  <span>{schoolData.contact.mobile_1}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${schoolData.contact.email}`}
                  className="flex items-center gap-2 text-green-200 hover:text-white text-sm transition-colors break-all"
                >
                  <Mail size={15} className="flex-shrink-0 text-green-400" />
                  <span>{schoolData.contact.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={schoolData.contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-green-200 hover:text-white text-sm transition-colors"
                >
                  <ExternalLink size={15} className="text-green-400" />
                  <span>dularhatsecondaryschool.edu.bd</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#024D00] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-green-300">
          <p>
            &copy; {year} {t(schoolData.name)}.{" "}
            {language === "bn" ? "সর্বস্বত্ব সংরক্ষিত।" : "All rights reserved."}
          </p>
          <p>
            {language === "bn"
              ? `চরফ্যাশন, ভোলা, বাংলাদেশ | EIIN: ${schoolData.eiin}`
              : `Charfashion, Bhola, Bangladesh | EIIN: ${schoolData.eiin}`}
          </p>
        </div>
      </div>
    </footer>
  );
}
