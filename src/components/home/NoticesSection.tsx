"use client";

import Link from "next/link";
import { ArrowRight, Bell, Calendar, Download, Tag } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Notice } from "@/types";

const categoryMap: Record<string, { bn: string, en: string, color: string }> = {
  exam: { bn: "পরীক্ষা", en: "Exam", color: "#DC2626" },
  holiday: { bn: "ছুটি", en: "Holiday", color: "#F97316" },
  academic: { bn: "একাডেমিক", en: "Academic", color: "#2563EB" },
  admission: { bn: "ভর্তি", en: "Admission", color: "#10B981" },
  event: { bn: "অনুষ্ঠান", en: "Event", color: "#8B5CF6" },
  general: { bn: "সাধারণ", en: "General", color: "#6B7280" }
};


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

export function NoticesSection({ notices }: { notices: Notice[] }) {
  const { language } = useLanguage();

  return (
    <section className="py-16 bg-[#F5F7F5]" aria-labelledby="notices-heading">
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
        {notices?.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {notices.slice(0, 6).map((notice) => (
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
                    style={{ backgroundColor: categoryMap[notice.category]?.color || "#6B7280" }}
                  >
                    <Tag size={10} />
                    {language === "bn" ? (categoryMap[notice.category]?.bn || notice.category) : (categoryMap[notice.category]?.en || notice.category)}
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
                    {formatDate(notice.created_at, language)}
                  </span>
                  <div className="flex items-center gap-2">
                    {notice.attachment_url && (
                      <a
                        href={notice.attachment_url}
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
        ) : (
          <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center flex flex-col items-center justify-center">
            <Bell size={48} className="text-gray-200 mb-4" />
            <h3 className="text-gray-900 font-semibold mb-2 text-lg">
              {language === "bn" ? "কোনো নোটিশ নেই" : "No Notices"}
            </h3>
            <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
              {language === "bn"
                ? "বর্তমানে কোনো নতুন নোটিশ নেই। বিদ্যালয়ের নতুন বিজ্ঞপ্তি প্রকাশিত হলে এখানে দেখা যাবে।"
                : "There are currently no new notices. New school announcements will appear here when published."}
            </p>
          </div>
        )}

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
