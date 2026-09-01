"use client";

import Link from "next/link";
import { ArrowRight, Bell, Calendar, Download, Tag } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Sample notices - in production these come from Supabase
const sampleNotices = [
  {
    id: "1",
    title_bn: "বার্ষিক পরীক্ষার সময়সূচি ২০২৪",
    title_en: "Annual Examination Schedule 2024",
    date: "2024-11-15",
    category_bn: "পরীক্ষা",
    category_en: "Examination",
    category_color: "#DC2626",
    is_important: true,
    document_url: null,
  },
  {
    id: "2",
    title_bn: "ষষ্ঠ থেকে দশম শ্রেণির ভর্তি বিজ্ঞপ্তি",
    title_en: "Admission Notice for Class 6-10",
    date: "2024-11-10",
    category_bn: "ভর্তি",
    category_en: "Admission",
    category_color: "#059669",
    is_important: false,
    document_url: null,
  },
  {
    id: "3",
    title_bn: "জাতীয় দিবস উপলক্ষে বিশেষ অনুষ্ঠান",
    title_en: "Special Program for National Day",
    date: "2024-11-05",
    category_bn: "অনুষ্ঠান",
    category_en: "Event",
    category_color: "#DB2777",
    is_important: false,
    document_url: null,
  },
  {
    id: "4",
    title_bn: "প্রাক-নির্বাচনী পরীক্ষার ফলাফল প্রকাশ",
    title_en: "Pre-selection Examination Results Published",
    date: "2024-10-28",
    category_bn: "ফলাফল",
    category_en: "Result",
    category_color: "#D97706",
    is_important: false,
    document_url: null,
  },
  {
    id: "5",
    title_bn: "শীতকালীন ছুটির সময়সূচি",
    title_en: "Winter Holiday Schedule",
    date: "2024-10-20",
    category_bn: "ছুটি",
    category_en: "Holiday",
    category_color: "#7C3AED",
    is_important: false,
    document_url: null,
  },
  {
    id: "6",
    title_bn: "বার্ষিক ক্রীড়া প্রতিযোগিতা",
    title_en: "Annual Sports Competition",
    date: "2024-10-15",
    category_bn: "অনুষ্ঠান",
    category_en: "Event",
    category_color: "#DB2777",
    is_important: false,
    document_url: null,
  },
];

function formatDate(dateStr: string, language: string) {
  const date = new Date(dateStr);
  if (language === "bn") {
    return date.toLocaleDateString("bn-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function NoticesSection() {
  const { language } = useLanguage();

  return (
    <section className="py-16 bg-white" aria-labelledby="notices-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-block bg-red-50 text-red-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              <Bell size={14} className="inline mr-1.5" aria-hidden="true" />
              {language === "bn" ? "নোটিশ বোর্ড" : "Notice Board"}
            </span>
            <h2 id="notices-heading" className="text-2xl sm:text-3xl font-bold text-gray-900">
              {language === "bn" ? "সর্বশেষ নোটিশ" : "Latest Notices"}
            </h2>
          </div>
          <Link
            href="/notices"
            className="inline-flex items-center gap-2 text-[#016B00] hover:text-[#024D00] font-medium text-sm transition-colors group"
          >
            {language === "bn" ? "সব নোটিশ দেখুন" : "View All Notices"}
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Notices Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sampleNotices.map((notice) => (
            <article
              key={notice.id}
              className={`bg-white border rounded-xl p-5 hover:shadow-md transition-all ${
                notice.is_important
                  ? "border-red-200 bg-red-50/30"
                  : "border-gray-100"
              }`}
            >
              {/* Category Badge + Important */}
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: notice.category_color }}
                >
                  <Tag size={10} />
                  {language === "bn" ? notice.category_bn : notice.category_en}
                </span>
                {notice.is_important && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                    ⚡ {language === "bn" ? "জরুরি" : "Important"}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="font-semibold text-gray-900 text-sm leading-relaxed mb-3 line-clamp-2">
                {language === "bn" ? notice.title_bn : notice.title_en}
              </h3>

              {/* Date + Actions */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Calendar size={12} />
                  {formatDate(notice.date, language)}
                </span>
                <div className="flex items-center gap-2">
                  {notice.document_url && (
                    <a
                      href={notice.document_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#016B00] hover:text-[#024D00] transition-colors"
                      aria-label="Download document"
                    >
                      <Download size={15} />
                    </a>
                  )}
                  <Link
                    href={`/notices/${notice.id}`}
                    className="text-xs text-[#016B00] hover:underline font-medium"
                  >
                    {language === "bn" ? "বিস্তারিত" : "Details"}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Notice Alert Banner */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <Bell size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-700">
            {language === "bn"
              ? "এই নোটিশগুলো প্রাথমিকভাবে বিদ্যালয়ের প্রশাসনিক প্যানেল থেকে পরিচালিত হবে। বর্তমান নোটিশের জন্য সরাসরি বিদ্যালয়ে যোগাযোগ করুন।"
              : "These notices will be managed through the school admin panel. For current notices, please contact the school directly."}
          </p>
        </div>
      </div>
    </section>
  );
}
