"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, FlaskConical, BarChart3, BookMarked } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { schoolData } from "@/data/school-data";

const disciplineIcons = {
  "🔬": FlaskConical,
  "📊": BarChart3,
  "📚": BookMarked,
};

export function AcademicsSection() {
  const { t, language } = useLanguage();

  return (
    <section className="py-16 bg-white" aria-labelledby="academics-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-[#016B00] text-xs font-semibold tracking-widest uppercase mb-3">
            <BookOpen size={14} className="inline mr-1.5" aria-hidden="true" />
            {language === "bn" ? "একাডেমিক" : "Academic"}
          </span>
          <h2 id="academics-heading" className="text-2xl sm:text-3xl font-bold text-[#1C2522] mb-3">
            {language === "bn" ? "একাডেমিক তথ্য" : "Academic Information"}
          </h2>
          <div className="w-16 h-1 bg-[#016B00] mx-auto rounded" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Classes */}
          <div>
            <h3 className="text-xl font-bold text-[#1C2522] mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-[#016B00] text-white rounded-lg flex items-center justify-center text-sm">✓</span>
              {language === "bn" ? "শ্রেণিসমূহ" : "Classes"}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {schoolData.academics.classes.map((cls, i) => (
                <div
                  key={i}
                  className="relative flex flex-col items-center justify-center p-4 bg-white border border-[#DDE8DD] rounded-xl hover:border-[#006B2D] hover:shadow-sm transition-all"
                >
                  <span className="text-3xl font-black text-[#006B2D] mb-1" style={{ fontVariantNumeric: "tabular-nums" }}>
                    {String(cls.grade).padStart(2, "0")}
                  </span>
                  <span className="text-xs font-bold text-[#003D1A] text-center leading-tight">
                    {t(cls)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Disciplines & Exam Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-[#1C2522] mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-yellow-500 text-white rounded-lg flex items-center justify-center text-sm">🎓</span>
                {language === "bn" ? "বিভাগসমূহ" : "Academic Disciplines"}
              </h3>
              <div className="grid gap-4">
                {schoolData.academics.disciplines.map((d, i) => {
                  return (
                    <div key={i} className="flex items-center gap-4 p-4 bg-white border border-[#E6E9E7] rounded-xl hover:border-[#016B00]/40 hover:shadow-sm transition-all">
                      <div className="w-10 h-10 bg-[#016B00]/10 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                        {d.icon}
                      </div>
                      <div>
                        <div className="font-bold text-[#1C2522]">{d.bengali}</div>
                        <div className="text-[#66706C] text-sm">{d.english}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Exam Centre Info */}
            <div className="bg-[#F8F8F6] border border-[#E6E9E7] rounded-2xl p-6">
              <h3 className="font-bold text-[#1C2522] mb-4 flex items-center gap-2">
                <span className="text-[#016B00]">📝</span>
                {language === "bn" ? "পরীক্ষা কেন্দ্র" : "Examination Centre"}
              </h3>
              <p className="text-[#66706C] text-sm mb-3">
                {language === "bn"
                  ? "দুলারহাট মাধ্যমিক বিদ্যালয় চরফ্যাশন উপজেলার অনুমোদিত JSC ও SSC পরীক্ষা কেন্দ্র।"
                  : "Dularhat Secondary School is an authorized JSC and SSC examination centre for Charfashion Upazila."}
              </p>
              <div className="flex gap-3">
                {schoolData.academics.exams.map((exam, i) => (
                  <span key={i} className="px-3 py-1.5 bg-[#016B00] text-white rounded-lg text-sm font-medium">
                    {exam.english}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/academics"
            className="inline-flex items-center gap-2 bg-[#016B00] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#024D00] transition-colors"
          >
            {language === "bn" ? "বিস্তারিত একাডেমিক তথ্য" : "Full Academic Information"}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
