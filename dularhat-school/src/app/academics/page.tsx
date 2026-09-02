"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { schoolData } from "@/data/school-data";

export default function AcademicsPage() {
  const { t, language } = useLanguage();

  return (
    <div className="bg-white">
      <PageHeader
        title={{ bengali: "একাডেমিক তথ্য", english: "Academic Information" }}
        subtitle={{ bengali: "শ্রেণি, বিষয়, রুটিন ও পরীক্ষা সম্পর্কিত তথ্য", english: "Information about classes, subjects, routines and examinations" }}
        breadcrumbs={[{ label: { bengali: "একাডেমিক", english: "Academics" } }]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Classes */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {language === "bn" ? "শ্রেণিসমূহ" : "Classes"}
          </h2>
          <div className="w-16 h-1 bg-[#016B00] rounded mb-6" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {schoolData.academics.classes.map((cls, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-green-50 transition-colors border border-gray-100">
                <div className="w-10 h-10 bg-[#016B00] text-white rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {cls.grade}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{t(cls)}</p>
                  <p className="text-gray-400 text-xs">Grade {cls.grade}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Disciplines */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {language === "bn" ? "বিভাগসমূহ (৯ম-১০ম শ্রেণি)" : "Disciplines (Class 9–10)"}
          </h2>
          <div className="w-16 h-1 bg-[#016B00] rounded mb-6" />
          <div className="grid sm:grid-cols-3 gap-4">
            {schoolData.academics.disciplines.map((d, i) => {
              const colors = [
                { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700" },
                { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-700" },
                { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700" },
              ];
              const c = colors[i];
              return (
                <div key={i} className={`p-5 ${c.bg} border ${c.border} rounded-2xl text-center`}>
                  <span className="text-4xl mb-3 block">{d.icon}</span>
                  <p className={`font-bold ${c.text} text-base`}>{d.bengali}</p>
                  <p className="text-gray-500 text-sm mt-0.5">{d.english}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Exam Centre */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {language === "bn" ? "পরীক্ষা কেন্দ্র" : "Examination Centre"}
          </h2>
          <div className="w-16 h-1 bg-[#016B00] rounded mb-6" />
          <div className="bg-[#016B00]/5 border border-[#016B00]/20 rounded-2xl p-6">
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {language === "bn"
                ? "দুলারহাট মাধ্যমিক বিদ্যালয় বরিশাল শিক্ষা বোর্ডের অধীনে চরফ্যাশন উপজেলার একটি অনুমোদিত JSC ও SSC পরীক্ষা কেন্দ্র।"
                : "Dularhat Secondary School is an authorized JSC and SSC examination centre for Charfashion Upazila under the Barisal Education Board."}
            </p>
            <div className="flex flex-wrap gap-3">
              {schoolData.academics.exams.map((e, i) => (
                <span key={i} className="px-4 py-2 bg-[#016B00] text-white rounded-xl text-sm font-bold">
                  {e.english}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Sub-page links */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {language === "bn" ? "আরও তথ্য" : "More Information"}
          </h2>
          <div className="w-16 h-1 bg-[#016B00] rounded mb-6" />
          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { href: "/academics/routine", icon: "📅", bn: "ক্লাস রুটিন", en: "Class Routine", desc_bn: "বিদ্যালয়ের সাপ্তাহিক রুটিন দেখুন।", desc_en: "View the weekly class routine." },
              { href: "/academics/examination", icon: "📝", bn: "পরীক্ষার তথ্য", en: "Examination Info", desc_bn: "পরীক্ষার সময়সূচি ও নিয়মাবলী।", desc_en: "Exam schedule and regulations." },
            ].map((item, i) => (
              <Link key={i} href={item.href} className="group flex gap-4 p-5 bg-gray-50 border border-gray-100 rounded-2xl hover:border-[#016B00] hover:shadow-md transition-all">
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-[#016B00] transition-colors">
                    {language === "bn" ? item.bn : item.en}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">{language === "bn" ? item.desc_bn : item.desc_en}</p>
                  <div className="flex items-center gap-1 text-[#016B00] text-sm font-medium mt-2">
                    {language === "bn" ? "দেখুন" : "View"} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
