"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";
import { schoolData } from "@/data/school-data";

export default function AcademicsPage() {
  const { t, language } = useLanguage();

  const classes = schoolData.academics.classes;

  return (
    <div>
      {/* ── HERO ── */}
      <PageHero
        variant="green"
        eyebrow={language === "bn" ? "একাডেমিক" : "Academic"}
        title={{ bengali: "একাডেমিক তথ্য", english: "Academic Information" }}
        description={{
          bengali: "শ্রেণি, বিভাগ, রুটিন ও পরীক্ষা সম্পর্কিত সমস্ত তথ্য",
          english: "All information about classes, disciplines, routine and examinations",
        }}
        breadcrumbs={[{ label: { bengali: "একাডেমিক", english: "Academics" } }]}
      />

      {/* ── SECTION 1 — WHITE: Classes as large numbered cards ── */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={language === "bn" ? "শ্রেণিসমূহ" : "Classes"}
            title={language === "bn" ? "পাঁচটি শ্রেণি" : "Five Grade Levels"}
            description={
              language === "bn"
                ? "দুলারহাট মাধ্যমিক বিদ্যালয়ে ষষ্ঠ থেকে দশম শ্রেণি পর্যন্ত পাঠদান করা হয়।"
                : "Dularhat Secondary School offers instruction from Grade 6 through Grade 10."
            }
          />

          {/* Large numbered grade cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {classes.map((cls, i) => {
              const isHigher = cls.grade >= 9;
              return (
                <div
                  key={i}
                  className={`relative rounded-2xl p-6 flex flex-col items-center text-center border-2 transition-all hover:-translate-y-1 hover:shadow-lg ${
                    isHigher
                      ? "bg-[#006B2D] border-[#006B2D] text-white"
                      : "bg-white border-[#DDE8DD] text-[#003D1A] hover:border-[#006B2D]"
                  }`}
                >
                  {/* Grade number — the hero element */}
                  <span
                    className={`text-5xl font-black leading-none mb-3 ${
                      isHigher ? "text-white" : "text-[#006B2D]"
                    }`}
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {String(cls.grade).padStart(2, "0")}
                  </span>
                  <span className={`text-sm font-bold leading-tight ${isHigher ? "text-white" : "text-[#003D1A]"}`}>
                    {cls.bengali}
                  </span>
                  <span className={`text-xs mt-1 ${isHigher ? "text-green-200" : "text-gray-400"}`}>
                    {cls.english}
                  </span>
                  {isHigher && (
                    <span className="absolute top-3 right-3 text-xs bg-[#F5C400] text-[#003D1A] font-bold px-2 py-0.5 rounded-full">
                      SSC
                    </span>
                  )}
                  {cls.grade === 8 && (
                    <span className="absolute top-3 right-3 text-xs bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full">
                      JSC
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Connecting line visual — desktop only */}
          <div className="hidden lg:flex items-center justify-between mt-6 px-10 text-xs text-gray-400 gap-2">
            <span className="flex-1 text-center">{language === "bn" ? "জুনিয়র" : "Junior"}</span>
            <div className="flex-1 border-t border-dashed border-gray-200" />
            <span className="flex-1 text-center">{language === "bn" ? "মাধ্যমিক" : "Secondary"}</span>
            <div className="flex-1 border-t border-dashed border-gray-200" />
            <span className="flex-1 text-center">{language === "bn" ? "SSC প্রস্তুতি" : "SSC Track"}</span>
          </div>
        </div>
      </section>

      {/* ── SECTION 2 — LIGHT GREEN: Disciplines ── */}
      <section className="bg-[#F0FAF3] py-16 border-y border-[#DDE8DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={language === "bn" ? "৯ম–১০ম শ্রেণি" : "Grade 9–10"}
            title={language === "bn" ? "তিনটি একাডেমিক বিভাগ" : "Three Academic Disciplines"}
            description={
              language === "bn"
                ? "নবম শ্রেণিতে শিক্ষার্থীরা নিজের পছন্দমতো বিভাগ বেছে নিতে পারে।"
                : "In Grade 9, students choose their preferred academic discipline."
            }
            align="center"
          />
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { emoji: "🔬", bn: "বিজ্ঞান", en: "Science", color: "bg-blue-50 border-blue-200 text-blue-800", tag_color: "bg-blue-100 text-blue-700", desc_bn: "পদার্থ, রসায়ন, জীববিজ্ঞান ও উচ্চতর গণিত।", desc_en: "Physics, Chemistry, Biology & Higher Mathematics." },
              { emoji: "📊", bn: "ব্যবসায় শিক্ষা", en: "Business Studies", color: "bg-amber-50 border-amber-200 text-amber-800", tag_color: "bg-amber-100 text-amber-700", desc_bn: "ব্যবসায় নীতি, হিসাববিজ্ঞান ও অর্থনীতি।", desc_en: "Business Principles, Accounting & Economics." },
              { emoji: "📖", bn: "মানবিক", en: "Humanities", color: "bg-purple-50 border-purple-200 text-purple-800", tag_color: "bg-purple-100 text-purple-700", desc_bn: "ইতিহাস, ভূগোল ও পৌরনীতি।", desc_en: "History, Geography & Civics." },
            ].map((d, i) => (
              <div key={i} className={`rounded-2xl p-6 border-2 text-center ${d.color}`}>
                <span className="text-5xl block mb-4">{d.emoji}</span>
                <h3 className="font-black text-lg mb-1">{d.bn}</h3>
                <p className="text-xs font-medium opacity-60 mb-3">{d.en}</p>
                <p className="text-xs leading-relaxed opacity-75">
                  {language === "bn" ? d.desc_bn : d.desc_en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3 — DARK GREEN: Exam centre callout ── */}
      <section className="bg-[#004D24] py-14 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
            <div>
              <span className="text-[#F5C400] text-xs font-bold uppercase tracking-widest">
                {language === "bn" ? "বরিশাল বোর্ড" : "Barisal Board"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2 mb-3">
                {language === "bn" ? "অনুমোদিত পরীক্ষা কেন্দ্র" : "Authorized Examination Centre"}
              </h2>
              <p className="text-green-200 text-sm max-w-lg">
                {language === "bn"
                  ? "দুলারহাট মাধ্যমিক বিদ্যালয় চরফ্যাশন উপজেলার একটি অনুমোদিত JSC ও SSC পরীক্ষা কেন্দ্র।"
                  : "Dularhat Secondary School is an authorized JSC and SSC examination centre for Charfashion Upazila."}
              </p>
            </div>
            <div className="flex gap-4 flex-shrink-0">
              {["JSC", "SSC"].map((exam) => (
                <div key={exam} className="text-center bg-white/10 rounded-2xl px-8 py-5 border border-white/15">
                  <div className="text-3xl font-black text-[#F5C400]">{exam}</div>
                  <div className="text-green-300 text-xs mt-1">
                    {language === "bn" ? "পরীক্ষা কেন্দ্র" : "Exam Centre"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4 — WHITE: Routine + Examination links ── */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={language === "bn" ? "আরও তথ্য" : "More Info"}
            title={language === "bn" ? "রুটিন ও পরীক্ষা" : "Routine & Examination"}
          />
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                href: "/academics/routine",
                emoji: "📅",
                title: { bengali: "ক্লাস রুটিন", english: "Class Routine" },
                desc: { bengali: "বিদ্যালয়ের সাপ্তাহিক ক্লাস রুটিন দেখুন ও ডাউনলোড করুন।", english: "View and download the weekly class routine." },
                bg: "bg-[#F0FAF3] border-[#DDE8DD] hover:border-[#006B2D]",
              },
              {
                href: "/academics/examination",
                emoji: "📝",
                title: { bengali: "পরীক্ষার তথ্য", english: "Examination Info" },
                desc: { bengali: "পরীক্ষার সময়সূচি, নিয়মাবলী ও কেন্দ্র সম্পর্কিত তথ্য।", english: "Exam schedule, regulations, and centre information." },
                bg: "bg-white border-[#DDE8DD] hover:border-[#006B2D]",
              },
            ].map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className={`group flex items-start gap-5 p-6 border-2 rounded-2xl transition-all hover:shadow-md ${item.bg}`}
              >
                <span className="text-4xl flex-shrink-0">{item.emoji}</span>
                <div>
                  <h3 className="font-bold text-[#003D1A] text-lg mb-1 group-hover:text-[#006B2D] transition-colors">
                    {t(item.title)}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3">{t(item.desc)}</p>
                  <span className="inline-flex items-center gap-1.5 text-[#006B2D] text-sm font-semibold group-hover:gap-2.5 transition-all">
                    {language === "bn" ? "দেখুন" : "View"}
                    <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
