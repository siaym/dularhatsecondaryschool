"use client";

import { Trophy } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ResultsPage() {
  const { language } = useLanguage();
  return (
    <div>
      <PageHeader
        title={{ bengali: "পরীক্ষার ফলাফল", english: "Examination Results" }}
        subtitle={{ bengali: "JSC ও SSC পরীক্ষার ফলাফল", english: "JSC and SSC examination results" }}
        breadcrumbs={[{ label: { bengali: "ফলাফল", english: "Results" } }]}
      />
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={language === "bn" ? "পরীক্ষার ফলাফল" : "Exam Results"}
          />
          <div className="grid sm:grid-cols-2 gap-5 mb-10">
            {[
              { emoji: "📝", title_bn: "JSC ফলাফল", title_en: "JSC Results", color: "bg-blue-50 border-blue-200 text-blue-900" },
              { emoji: "🎓", title_bn: "SSC ফলাফল", title_en: "SSC Results", color: "bg-[#F0FAF3] border-[#DDE8DD] text-[#003D1A]" },
            ].map((item, i) => (
              <div key={i} className={`border-2 rounded-2xl p-6 text-center ${item.color}`}>
                <span className="text-5xl block mb-3">{item.emoji}</span>
                <h3 className="font-bold text-lg">{language === "bn" ? item.title_bn : item.title_en}</h3>
                <p className="text-xs opacity-60 mt-1">{language === "bn" ? "বরিশাল বোর্ড" : "Barisal Board"}</p>
              </div>
            ))}
          </div>
          <div className="bg-[#F0FAF3] border border-[#DDE8DD] rounded-xl p-6">
            <h3 className="font-bold text-[#006B2D] mb-2 flex items-center gap-2">
              <Trophy size={18} /> {language === "bn" ? "সরকারি ফলাফল" : "Official Results"}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {language === "bn" ? "JSC ও SSC ফলাফল সরকারি ওয়েবসাইটে পাওয়া যায়।" : "JSC and SSC results are available on the government website."}
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://www.educationboardresults.gov.bd" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#006B2D] text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#004D24] transition-colors">
                🔗 educationboardresults.gov.bd
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
