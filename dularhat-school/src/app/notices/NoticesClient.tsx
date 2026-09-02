'use client';

import Link from "next/link";
import { Bell, Calendar, Search, ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { useLanguage } from "@/contexts/LanguageContext";

const typeStyles: Record<string, { bg: string; text: string; dot: string }> = {
  exam:      { bg: "bg-red-50",    text: "text-red-700",    dot: "bg-red-500" },
  admission: { bg: "bg-green-50",  text: "text-green-700",  dot: "bg-green-500" },
  event:     { bg: "bg-pink-50",   text: "text-pink-700",   dot: "bg-pink-500" },
  result:    { bg: "bg-amber-50",  text: "text-amber-700",  dot: "bg-amber-500" },
  holiday:   { bg: "bg-blue-50",   text: "text-blue-700",   dot: "bg-blue-500" },
  other:     { bg: "bg-gray-50",   text: "text-gray-700",   dot: "bg-gray-500" },
};

function formatDate(dateStr: string, language: string) {
  const date = new Date(dateStr);
  return language === "bn"
    ? date.toLocaleDateString("bn-BD", { day: "numeric", month: "short", year: "numeric" })
    : date.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}

export function NoticesClient({ notices }: { notices: any[] }) {
  const { language } = useLanguage();

  const urgent = notices.find((n) => n.is_important);
  const regular = notices.filter((n) => !n.is_important);

  return (
    <div>
      <PageHeader
        title={{ bengali: "নোটিশ বোর্ড", english: "Notice Board" }}
        subtitle={{
          bengali: "বিদ্যালয়ের গুরুত্বপূর্ণ ঘোষণা ও আপডেট",
          english: "Important school announcements and updates",
        }}
        breadcrumbs={[{ label: { bengali: "নোটিশ", english: "Notices" } }]}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* URGENT NOTICE */}
        {urgent && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-red-600">
                {language === "bn" ? "জরুরি বিজ্ঞপ্তি" : "Urgent Notice"}
              </span>
            </div>
            <Link
              href={`/notices/${urgent.id}`}
              className="block bg-white border-l-4 border-red-500 rounded-r-2xl p-6 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-red-100 text-red-700 px-3 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      {language === "bn" ? urgent.category : urgent.category}
                    </span>
                    <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-1 rounded-full">
                      ⚡ {language === "bn" ? "জরুরি" : "Important"}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-[#003D1A] group-hover:text-[#006B2D] transition-colors">
                    {language === "bn" ? urgent.title_bn : urgent.title_en}
                  </h3>
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs mt-2">
                    <Calendar size={12} />
                    {formatDate(urgent.created_at, language)}
                  </div>
                </div>
                <span className="text-[#006B2D] text-sm font-semibold group-hover:underline flex-shrink-0 mt-1">
                  {language === "bn" ? "বিস্তারিত →" : "Details →"}
                </span>
              </div>
            </Link>
          </div>
        )}

        <div className="flex gap-3 mb-6 mt-6">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder={language === "bn" ? "নোটিশ খুঁজুন…" : "Search notices…"}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#DDE8DD] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#006B2D]/20 focus:border-[#006B2D] transition"
            />
          </div>
        </div>

        {/* REGULAR NOTICES */}
        <div className="space-y-3">
          {regular.length > 0 ? regular.map((notice) => {
            const style = typeStyles[notice.category] ?? typeStyles.other;
            return (
              <Link
                key={notice.id}
                href={`/notices/${notice.id}`}
                className="group flex items-start gap-4 bg-white border border-[#DDE8DD] rounded-xl p-4 hover:border-[#006B2D]/40 hover:shadow-sm transition-all"
              >
                <div className={`w-1.5 self-stretch rounded-full flex-shrink-0 mt-1 ${style.dot}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${style.bg} ${style.text} capitalize`}>
                      {notice.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar size={11} />
                      {formatDate(notice.created_at, language)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-[#003D1A] text-sm leading-snug group-hover:text-[#006B2D] transition-colors">
                    {language === "bn" ? notice.title_bn : notice.title_en}
                  </h3>
                </div>
                <span className="text-gray-300 group-hover:text-[#006B2D] text-lg flex-shrink-0 transition-colors">›</span>
              </Link>
            );
          }) : (
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
        </div>
      </div>
    </div>
  );
}
