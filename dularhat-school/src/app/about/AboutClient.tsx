"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";
import { schoolData } from "@/data/school-data";

export function AboutClient() {
  const { t, language } = useLanguage();

  return (
    <>
      {/* ── SECTION 1 — WHITE: School overview prose ── */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Main prose */}
            <div className="lg:col-span-3">
              <SectionHeading
                eyebrow={language === "bn" ? "পরিচিতি" : "Overview"}
                title={language === "bn" ? "বিদ্যালয় পরিচিতি" : "School Overview"}
              />
              <div className="space-y-5 text-gray-700 leading-relaxed text-base">
                <p>{t(schoolData.description)}</p>
                <p>{t(schoolData.history)}</p>
              </div>
              <Link
                href="/about/history"
                className="inline-flex items-center gap-2 mt-8 text-[#006B2D] font-semibold text-sm hover:gap-3 transition-all group"
              >
                {language === "bn" ? "পূর্ণ ইতিহাস পড়ুন" : "Read Full History"}
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Sidebar facts */}
            <div className="lg:col-span-2">
              <div className="bg-[#F5FAF6] border border-[#DDE8DD] rounded-2xl p-6 space-y-4">
                <h3 className="font-bold text-[#003D1A] text-sm uppercase tracking-wide">
                  {language === "bn" ? "সংক্ষিপ্ত তথ্য" : "At a Glance"}
                </h3>
                {[
                  { icon: "📅", label: language === "bn" ? "প্রতিষ্ঠাকাল" : "Established", value: language === "bn" ? "১লা এপ্রিল, ১৯৬৩" : "1 April 1963" },
                  { icon: "🔢", label: "EIIN", value: schoolData.eiin },
                  { icon: "🏛️", label: language === "bn" ? "শিক্ষা বোর্ড" : "Board", value: language === "bn" ? "বরিশাল" : "Barisal" },
                  { icon: "👤", label: language === "bn" ? "প্রতিষ্ঠাতা" : "Founder", value: "Mr. Mahabubur Rahaman" },
                  { icon: "🎓", label: language === "bn" ? "প্রথম প্রধান শিক্ষক" : "First Headmaster", value: "Mr. Arab Ali Mia (M.A)" },
                  { icon: "📖", label: language === "bn" ? "শ্রেণি" : "Classes", value: language === "bn" ? "৬ষ্ঠ – ১০ম" : "6 – 10" },
                  { icon: "📝", label: language === "bn" ? "পরীক্ষা কেন্দ্র" : "Exam Centre", value: "JSC & SSC" },
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-3 py-2 border-b border-[#DDE8DD] last:border-0">
                    <span className="text-lg flex-shrink-0 mt-0.5">{f.icon}</span>
                    <div className="min-w-0">
                      <p className="text-xs text-[#6B8C6B] font-medium uppercase tracking-wide leading-none mb-0.5">{f.label}</p>
                      <p className="text-sm font-semibold text-[#003D1A] leading-snug">{f.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2 — LIGHT GREEN: Four highlights ── */}
      <section className="bg-[#F0FAF3] py-16 border-y border-[#DDE8DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={language === "bn" ? "আমাদের বিশেষত্ব" : "Why Us"}
            title={language === "bn" ? "বিদ্যালয়ের বৈশিষ্ট্যসমূহ" : "School Features"}
            align="center"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: "🏫",
                title: { bengali: "শিক্ষার মান", english: "Academic Quality" },
                desc: { bengali: "শিক্ষার মান ও ফলাফলে জেলার অন্যতম শ্রেষ্ঠ বিদ্যাপীঠ।", english: "One of the best schools in the district for academic quality." },
              },
              {
                icon: "📚",
                title: { bengali: "তিনটি বিভাগ", english: "Three Disciplines" },
                desc: { bengali: "বিজ্ঞান, ব্যবসায় শিক্ষা ও মানবিক বিভাগ।", english: "Science, Business Studies, and Humanities." },
              },
              {
                icon: "📝",
                title: { bengali: "পরীক্ষা কেন্দ্র", english: "Exam Centre" },
                desc: { bengali: "JSC ও SSC পরীক্ষার অনুমোদিত কেন্দ্র।", english: "Authorized JSC and SSC examination centre." },
              },
              {
                icon: "🏛️",
                title: { bengali: "সমৃদ্ধ অবকাঠামো", english: "Rich Infrastructure" },
                desc: { bengali: "চারটি ভবন, গ্যালারি ও বিশাল খেলার মাঠ।", english: "Four buildings, gallery, and large playground." },
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-[#DDE8DD] hover:border-[#006B2D]/30 hover:shadow-sm transition-all">
                <div className="w-12 h-12 bg-[#006B2D]/8 rounded-xl flex items-center justify-center text-2xl mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-[#003D1A] mb-2">
                  {t(item.title)}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{t(item.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3 — DARK GREEN: Mission & Vision ── */}
      <section className="bg-[#004D24] py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#F5C400] mb-3">
                {language === "bn" ? "আমাদের লক্ষ্য" : "Mission"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                {t(schoolData.mission)}
              </h2>
              <div className="h-0.5 w-10 bg-[#F5C400] rounded-full mb-6" />
              <p className="text-green-200 leading-relaxed text-sm">
                {language === "bn"
                  ? "দুলারহাট মাধ্যমিক বিদ্যালয় প্রতিটি শিক্ষার্থীকে সামগ্রিকভাবে বিকশিত করতে প্রতিশ্রুতিবদ্ধ — জ্ঞান, দক্ষতা ও মূল্যবোধের সমন্বয়ে।"
                  : "Dularhat Secondary School is committed to the holistic development of every student — combining knowledge, skills, and values."}
              </p>
              <Link
                href="/about/mission"
                className="inline-flex items-center gap-2 mt-6 text-[#F5C400] hover:text-white font-semibold text-sm transition-colors group"
              >
                {language === "bn" ? "লক্ষ্য ও উদ্দেশ্য পড়ুন" : "Read Mission & Vision"}
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#F5C400] mb-3">
                {language === "bn" ? "আমাদের দর্শন" : "Vision"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                {t(schoolData.vision)}
              </h2>
              <div className="h-0.5 w-10 bg-[#F5C400] rounded-full mb-6" />
              <p className="text-green-200 leading-relaxed text-sm">
                {language === "bn"
                  ? "আমরা স্বপ্ন দেখি এমন একটি বিদ্যালয়ের যেখানে প্রতিটি শিক্ষার্থী তাদের পূর্ণ সম্ভাবনায় পৌঁছাতে পারে এবং দেশ ও জাতির কল্যাণে কাজ করতে পারে।"
                  : "We envision a school where every student reaches their full potential and contributes to the wellbeing of the nation."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4 — WHITE: Infrastructure ── */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={language === "bn" ? "অবকাঠামো" : "Infrastructure"}
            title={language === "bn" ? "বিদ্যালয়ের পরিবেশ" : "School Facilities"}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { emoji: "🏢", bn: "৪টি ভবন", en: "4 Buildings" },
              { emoji: "🏛️", bn: "বড় গ্যালারি", en: "Large Gallery" },
              { emoji: "⚽", bn: "বিশাল খেলার মাঠ", en: "Spacious Playground" },
              { emoji: "📍", bn: "বাস স্টেশনের পাশে", en: "Near Bus Station" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-[#F5FAF6] border border-[#DDE8DD] rounded-xl">
                <span className="text-3xl">{item.emoji}</span>
                <span className="font-semibold text-[#003D1A] text-sm">
                  {language === "bn" ? item.bn : item.en}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5 — LIGHT GREEN: CTA ── */}
      <section className="bg-[#F0FAF3] py-12 border-t border-[#DDE8DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[#003D1A] font-bold text-lg">
              {language === "bn" ? "আরও তথ্য জানতে চান?" : "Want to learn more?"}
            </p>
            <p className="text-[#4A6B4A] text-sm mt-1">
              {language === "bn"
                ? "ভর্তি, শিক্ষক ও নোটিশের জন্য সংশ্লিষ্ট পাতা দেখুন।"
                : "Visit the relevant pages for admission, teachers, and notices."}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/teachers" className="px-5 py-2.5 bg-[#006B2D] text-white rounded-xl text-sm font-semibold hover:bg-[#004D24] transition-colors">
              {language === "bn" ? "শিক্ষকবৃন্দ" : "Teachers"}
            </Link>
            <Link href="/admission" className="px-5 py-2.5 bg-white border border-[#006B2D] text-[#006B2D] rounded-xl text-sm font-semibold hover:bg-[#F0FAF3] transition-colors">
              {language === "bn" ? "ভর্তি তথ্য" : "Admission"}
            </Link>
            <Link href="/contact" className="px-5 py-2.5 bg-white border border-[#DDE8DD] text-[#003D1A] rounded-xl text-sm font-semibold hover:border-[#006B2D] transition-colors">
              {language === "bn" ? "যোগাযোগ" : "Contact"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
