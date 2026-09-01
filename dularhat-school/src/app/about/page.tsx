"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { schoolData } from "@/data/school-data";
import type { Metadata } from "next";

export default function AboutPage() {
  const { t, language } = useLanguage();

  return (
    <div className="bg-white">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-[#016B00] to-[#024D00] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-green-300 mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">
              {language === "bn" ? "হোম" : "Home"}
            </Link>
            <span className="mx-2">›</span>
            <span className="text-white">
              {language === "bn" ? "বিদ্যালয় পরিচিতি" : "About"}
            </span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold">
            {language === "bn" ? "বিদ্যালয় পরিচিতি" : "About the School"}
          </h1>
          <p className="text-green-200 mt-2 text-sm">
            {language === "bn"
              ? "দুলারহাট মাধ্যমিক বিদ্যালয় সম্পর্কে বিস্তারিত তথ্য"
              : "Detailed information about Dularhat Secondary School"}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {language === "bn" ? "বিদ্যালয় পরিচিতি" : "School Overview"}
                </h2>
                <div className="w-16 h-1 bg-[#016B00] rounded" />
              </div>
              <div className="space-y-4 text-gray-600 leading-relaxed text-base">
                <p>{t(schoolData.description)}</p>
                <p>{t(schoolData.history)}</p>
              </div>
            </section>

            {/* Mission & Vision */}
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {language === "bn" ? "লক্ষ্য ও উদ্দেশ্য" : "Mission & Vision"}
                </h2>
                <div className="w-16 h-1 bg-[#016B00] rounded" />
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-[#016B00]/5 border border-[#016B00]/20 rounded-2xl p-6">
                  <h3 className="font-bold text-[#016B00] mb-3 flex items-center gap-2 text-lg">
                    <span>🎯</span>
                    {language === "bn" ? "আমাদের লক্ষ্য" : "Our Mission"}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t(schoolData.mission)}
                  </p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                  <h3 className="font-bold text-yellow-700 mb-3 flex items-center gap-2 text-lg">
                    <span>🔭</span>
                    {language === "bn" ? "আমাদের দর্শন" : "Our Vision"}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t(schoolData.vision)}
                  </p>
                </div>
              </div>
            </section>

            {/* Key Facts */}
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {language === "bn" ? "মূল তথ্যসমূহ" : "Key Facts"}
                </h2>
                <div className="w-16 h-1 bg-[#016B00] rounded" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    label: language === "bn" ? "প্রতিষ্ঠার তারিখ" : "Established",
                    value: language === "bn" ? "১লা এপ্রিল, ১৯৬৩" : "1st April 1963",
                    icon: "📅",
                  },
                  { label: "EIIN", value: schoolData.eiin, icon: "🔢" },
                  {
                    label: language === "bn" ? "শিক্ষা বোর্ড" : "Education Board",
                    value: language === "bn" ? "বরিশাল" : "Barisal",
                    icon: "🏛️",
                  },
                  {
                    label: language === "bn" ? "প্রতিষ্ঠাতা" : "Founder",
                    value: schoolData.founder,
                    icon: "👤",
                  },
                  {
                    label: language === "bn" ? "প্রথম প্রধান শিক্ষক" : "First Headmaster",
                    value: schoolData.first_headmaster,
                    icon: "🎓",
                  },
                  {
                    label: language === "bn" ? "ধরন" : "Type",
                    value:
                      language === "bn"
                        ? "এমপিওভুক্ত মাধ্যমিক বিদ্যালয়"
                        : "MPO Secondary School",
                    icon: "🏫",
                  },
                  {
                    label: language === "bn" ? "শ্রেণি" : "Classes",
                    value:
                      language === "bn" ? "৬ষ্ঠ – ১০ম শ্রেণি" : "Class 6 – 10",
                    icon: "📖",
                  },
                  {
                    label: language === "bn" ? "শিফট" : "Shift",
                    value: language === "bn" ? "দিবা শিফট" : "Day Shift",
                    icon: "⏰",
                  },
                  {
                    label: language === "bn" ? "পরীক্ষা কেন্দ্র" : "Exam Centre",
                    value: "JSC & SSC",
                    icon: "📝",
                  },
                  {
                    label: language === "bn" ? "ব্যবস্থাপনা" : "Management",
                    value:
                      language === "bn"
                        ? "ম্যানেজিং কমিটি"
                        : "Managing Committee",
                    icon: "👥",
                  },
                ].map((fact, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-green-50 transition-colors"
                  >
                    <span className="text-2xl">{fact.icon}</span>
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                        {fact.label}
                      </p>
                      <p className="text-gray-800 font-semibold text-sm mt-0.5">
                        {fact.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Infrastructure */}
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {language === "bn" ? "অবকাঠামো" : "Infrastructure"}
                </h2>
                <div className="w-16 h-1 bg-[#016B00] rounded" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: "🏢", bn: "৪টি ভবন", en: "4 Buildings" },
                  { icon: "🏛️", bn: "একটি বড় গ্যালারি", en: "Large Gallery Hall" },
                  { icon: "⚽", bn: "বিশাল খেলার মাঠ", en: "Spacious Playground" },
                  { icon: "📍", bn: "বাস স্টেশনের পাশে", en: "Near Bus Station" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 bg-green-50 border border-green-100 rounded-xl"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="font-medium text-gray-800">
                      {language === "bn" ? item.bn : item.en}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Sub-pages */}
            <div className="bg-[#016B00] text-white rounded-2xl p-6">
              <h3 className="font-bold mb-4 text-lg">
                {language === "bn" ? "এই বিভাগে" : "In This Section"}
              </h3>
              <nav className="space-y-1">
                {[
                  {
                    label: language === "bn" ? "বিদ্যালয় পরিচিতি" : "School Overview",
                    href: "/about",
                    active: true,
                  },
                  {
                    label: language === "bn" ? "ইতিহাস" : "History",
                    href: "/about/history",
                    active: false,
                  },
                  {
                    label: language === "bn" ? "লক্ষ্য ও উদ্দেশ্য" : "Mission & Vision",
                    href: "/about/mission",
                    active: false,
                  },
                ].map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className={`flex items-center gap-2 text-sm py-2.5 px-3 rounded-lg transition-colors ${
                      link.active
                        ? "bg-white/20 font-semibold"
                        : "text-green-100 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <ArrowRight size={14} />
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Quick Links */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">
                {language === "bn" ? "দ্রুত লিঙ্ক" : "Quick Links"}
              </h3>
              <nav className="space-y-2">
                {[
                  {
                    label: language === "bn" ? "প্রধান শিক্ষক" : "Headmaster",
                    href: "/administration/headmaster",
                  },
                  {
                    label: language === "bn" ? "শিক্ষকবৃন্দ" : "Teachers",
                    href: "/teachers",
                  },
                  {
                    label: language === "bn" ? "ভর্তি তথ্য" : "Admission",
                    href: "/admission",
                  },
                  {
                    label: language === "bn" ? "নোটিশ" : "Notices",
                    href: "/notices",
                  },
                  {
                    label: language === "bn" ? "যোগাযোগ" : "Contact",
                    href: "/contact",
                  },
                ].map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    className="flex items-center gap-2 text-gray-600 hover:text-[#016B00] text-sm py-1.5 transition-colors"
                  >
                    <span className="text-[#016B00]">›</span>
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">
                {language === "bn" ? "যোগাযোগ" : "Contact"}
              </h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p className="flex items-start gap-2">
                  <span>📍</span>
                  <span>{t(schoolData.address)}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span>📞</span>
                  <a
                    href={`tel:${schoolData.contact.mobile_1}`}
                    className="text-[#016B00] hover:underline"
                  >
                    {schoolData.contact.mobile_1}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span>✉️</span>
                  <a
                    href={`mailto:${schoolData.contact.email}`}
                    className="text-[#016B00] hover:underline break-all"
                  >
                    {schoolData.contact.email}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
