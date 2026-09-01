"use client";

import { Trophy } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageSidebar } from "@/components/ui/PageSidebar";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ResultsPage() {
  const { language } = useLanguage();

  return (
    <div className="bg-white">
      <PageHeader
        title={{ bengali: "পরীক্ষার ফলাফল", english: "Examination Results" }}
        subtitle={{ bengali: "JSC ও SSC পরীক্ষার ফলাফল", english: "JSC and SSC examination results" }}
        breadcrumbs={[{ label: { bengali: "ফলাফল", english: "Results" } }]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {language === "bn" ? "পরীক্ষার ফলাফল" : "Examination Results"}
            </h2>
            <div className="w-16 h-1 bg-[#016B00] rounded mb-6" />

            {/* Exam type cards */}
            <div className="grid sm:grid-cols-2 gap-5 mb-8">
              {[
                { icon: "📝", title_bn: "JSC ফলাফল", title_en: "JSC Results", board_bn: "বরিশাল বোর্ড", board_en: "Barisal Board", color: "bg-blue-50 border-blue-200 text-blue-700" },
                { icon: "🎓", title_bn: "SSC ফলাফল", title_en: "SSC Results", board_bn: "বরিশাল বোর্ড", board_en: "Barisal Board", color: "bg-green-50 border-green-200 text-green-700" },
              ].map((item, i) => (
                <div key={i} className={`p-6 border rounded-2xl ${item.color}`}>
                  <span className="text-3xl mb-3 block">{item.icon}</span>
                  <h3 className="font-bold text-lg mb-1">{language === "bn" ? item.title_bn : item.title_en}</h3>
                  <p className="text-sm opacity-75">{language === "bn" ? item.board_bn : item.board_en}</p>
                </div>
              ))}
            </div>

            {/* Official result links */}
            <div className="bg-[#016B00]/5 border border-[#016B00]/20 rounded-2xl p-6 mb-6">
              <h3 className="font-bold text-[#016B00] mb-3 flex items-center gap-2">
                <Trophy size={18} />
                {language === "bn" ? "সরকারি ফলাফল দেখুন" : "Check Official Results"}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {language === "bn"
                  ? "JSC ও SSC ফলাফল বাংলাদেশ পরীক্ষা উন্নয়ন ইউনিটের ওয়েবসাইটে পাওয়া যায়।"
                  : "JSC and SSC results are available on the Bangladesh Examination Development Unit website."}
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="https://www.educationboardresults.gov.bd" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#016B00] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#024D00] transition-colors">
                  🔗 {language === "bn" ? "ফলাফল দেখুন" : "View Results"}
                </a>
                <a href="https://eboardresults.com" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white border border-[#016B00] text-[#016B00] px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors">
                  🔗 eboardresults.com
                </a>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <p className="text-amber-700 text-sm">
                <span className="font-bold">{language === "bn" ? "নোট: " : "Note: "}</span>
                {language === "bn"
                  ? "বিদ্যালয়ের ফলাফল সংক্রান্ত বিস্তারিত তথ্য প্রশাসনিক প্যানেল থেকে আপডেট করা হবে।"
                  : "Detailed result information from the school will be updated via admin panel."}
              </p>
            </div>
          </div>
          <div>
            <PageSidebar
              quickLinks={[
                { label: language === "bn" ? "নোটিশ" : "Notices", href: "/notices" },
                { label: language === "bn" ? "একাডেমিক" : "Academics", href: "/academics" },
                { label: language === "bn" ? "পরীক্ষা" : "Examination", href: "/academics/examination" },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
