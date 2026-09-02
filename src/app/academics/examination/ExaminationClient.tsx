"use client";

import { Download, FileText } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";
import { DocumentItem } from "@/types";

export default function ExaminationClient({ documents }: { documents: DocumentItem[] }) {
  const { language } = useLanguage();
  return (
    <div>
      <PageHeader
        title={{ bengali: "পরীক্ষার তথ্য", english: "Examination Information" }}
        subtitle={{ bengali: "পরীক্ষার সময়সূচি, নিয়মাবলী ও কেন্দ্র", english: "Exam schedule, regulations and centre" }}
        breadcrumbs={[
          { label: { bengali: "একাডেমিক", english: "Academics" }, href: "/academics" },
          { label: { bengali: "পরীক্ষা", english: "Examination" } },
        ]}
      />
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={language === "bn" ? "পরীক্ষাসমূহ" : "Examinations"}
          />
          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {[
              { emoji: "📝", title_bn: "JSC পরীক্ষা", title_en: "JSC Examination", desc_bn: "৮ম শ্রেণির বরিশাল বোর্ড পরীক্ষা।", desc_en: "Barisal Board exam for Grade 8." },
              { emoji: "🎓", title_bn: "SSC পরীক্ষা", title_en: "SSC Examination", desc_bn: "১০ম শ্রেণির বরিশাল বোর্ড পরীক্ষা।", desc_en: "Barisal Board exam for Grade 10." },
              { emoji: "📋", title_bn: "অর্ধবার্ষিক পরীক্ষা", title_en: "Half-Yearly Exam", desc_bn: "বিদ্যালয় কর্তৃক পরিচালিত আভ্যন্তরীণ পরীক্ষা।", desc_en: "Internal exam conducted by the school." },
              { emoji: "📊", title_bn: "বার্ষিক পরীক্ষা", title_en: "Annual Exam", desc_bn: "বার্ষিক মূল্যায়ন পরীক্ষা।", desc_en: "Annual assessment examination." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-5 bg-[#F5FAF6] border border-[#DDE8DD] rounded-xl hover:border-[#006B2D]/30 transition-colors">
                <span className="text-3xl flex-shrink-0">{item.emoji}</span>
                <div>
                  <h3 className="font-bold text-[#003D1A] text-sm mb-0.5">{language === "bn" ? item.title_bn : item.title_en}</h3>
                  <p className="text-gray-500 text-xs">{language === "bn" ? item.desc_bn : item.desc_en}</p>
                </div>
              </div>
            ))}
          </div>

          <SectionHeading
            title={language === "bn" ? "পরীক্ষার সময়সূচি ও সিলেবাস" : "Exam Schedule & Syllabus"}
          />
          
          {!documents || documents.length === 0 ? (
            <div className="bg-[#F0FAF3] border border-[#DDE8DD] rounded-xl p-6">
              <p className="text-gray-600 text-sm">{language === "bn" ? "পরীক্ষার সময়সূচি নোটিশ বোর্ডে প্রকাশিত হবে।" : "Exam schedules will be published on the notice board."}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {documents.map((doc) => (
                <div key={doc.id} className="bg-[#F5FAF6] border border-[#DDE8DD] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#006B2D]/40 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 border border-[#DDE8DD] text-purple-600">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#003D1A] text-lg">
                        {language === "bn" ? doc.title_bn : (doc.title_en || doc.title_bn)}
                      </h3>
                      {(doc.description_bn || doc.description_en) && (
                        <p className="text-gray-500 text-sm mt-1">
                          {language === "bn" ? doc.description_bn : (doc.description_en || doc.description_bn)}
                        </p>
                      )}
                    </div>
                  </div>
                  <a
                    href={doc.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 flex items-center justify-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-purple-700 transition-colors text-sm"
                  >
                    <Download size={18} />
                    {language === "bn" ? "ডাউনলোড" : "Download"}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
