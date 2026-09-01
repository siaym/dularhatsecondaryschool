"use client";

import Link from "next/link";
import { Bell, Calendar, Tag, Download, Search, Filter } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { useLanguage } from "@/contexts/LanguageContext";

const notices = [
  { id: "1", title_bn: "বার্ষিক পরীক্ষার সময়সূচি ২০২৪", title_en: "Annual Examination Schedule 2024", date: "2024-11-15", category_bn: "পরীক্ষা", category_en: "Examination", color: "#DC2626", is_important: true },
  { id: "2", title_bn: "ষষ্ঠ থেকে দশম শ্রেণির ভর্তি বিজ্ঞপ্তি", title_en: "Admission Notice for Class 6-10", date: "2024-11-10", category_bn: "ভর্তি", category_en: "Admission", color: "#059669", is_important: false },
  { id: "3", title_bn: "জাতীয় দিবস উপলক্ষে বিশেষ অনুষ্ঠান", title_en: "Special Program for National Day", date: "2024-11-05", category_bn: "অনুষ্ঠান", category_en: "Event", color: "#DB2777", is_important: false },
  { id: "4", title_bn: "প্রাক-নির্বাচনী পরীক্ষার ফলাফল প্রকাশ", title_en: "Pre-selection Examination Results Published", date: "2024-10-28", category_bn: "ফলাফল", category_en: "Result", color: "#D97706", is_important: false },
  { id: "5", title_bn: "শীতকালীন ছুটির সময়সূচি", title_en: "Winter Holiday Schedule", date: "2024-10-20", category_bn: "ছুটি", category_en: "Holiday", color: "#7C3AED", is_important: false },
  { id: "6", title_bn: "বার্ষিক ক্রীড়া প্রতিযোগিতা ২০২৪", title_en: "Annual Sports Competition 2024", date: "2024-10-15", category_bn: "অনুষ্ঠান", category_en: "Event", color: "#DB2777", is_important: false },
];

function formatDate(dateStr: string, language: string) {
  const date = new Date(dateStr);
  return language === "bn"
    ? date.toLocaleDateString("bn-BD", { day: "numeric", month: "long", year: "numeric" })
    : date.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}

export default function NoticesPage() {
  const { language } = useLanguage();

  return (
    <div className="bg-white">
      <PageHeader
        title={{ bengali: "নোটিশ বোর্ড", english: "Notice Board" }}
        subtitle={{ bengali: "বিদ্যালয়ের সর্বশেষ নোটিশ ও বিজ্ঞপ্তি", english: "Latest notices and announcements from the school" }}
        breadcrumbs={[{ label: { bengali: "নোটিশ", english: "Notices" } }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={language === "bn" ? "নোটিশ খুঁজুন..." : "Search notices..."}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#016B00]/30 focus:border-[#016B00]"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:border-[#016B00] transition-colors">
            <Filter size={15} />
            {language === "bn" ? "ফিল্টার" : "Filter"}
          </button>
        </div>

        {/* Notice List */}
        <div className="space-y-4">
          {notices.map((notice) => (
            <article
              key={notice.id}
              className={`bg-white border rounded-2xl p-5 hover:shadow-md transition-all ${
                notice.is_important ? "border-red-200 bg-red-50/20" : "border-gray-100"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span
                      className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: notice.color }}
                    >
                      <Tag size={10} />
                      {language === "bn" ? notice.category_bn : notice.category_en}
                    </span>
                    {notice.is_important && (
                      <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                        ⚡ {language === "bn" ? "জরুরি" : "Important"}
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-xs text-gray-400 ml-auto sm:ml-0">
                      <Calendar size={12} />
                      {formatDate(notice.date, language)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-base leading-relaxed">
                    {language === "bn" ? notice.title_bn : notice.title_en}
                  </h3>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <Link
                    href={`/notices/${notice.id}`}
                    className="text-sm text-[#016B00] hover:underline font-medium whitespace-nowrap"
                  >
                    {language === "bn" ? "বিস্তারিত" : "Details"}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-gray-400">
          {language === "bn"
            ? "নোটিশগুলো বিদ্যালয়ের প্রশাসনিক প্যানেল থেকে পরিচালিত হবে।"
            : "Notices will be managed through the school admin panel."}
        </div>
      </div>
    </div>
  );
}
