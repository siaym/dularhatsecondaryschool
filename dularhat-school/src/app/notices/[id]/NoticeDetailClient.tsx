'use client';

import Link from "next/link";
import { ArrowLeft, Calendar, Tag, Bell, Download } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

function formatDate(dateStr: string, language: string) {
  const date = new Date(dateStr);
  return language === "bn"
    ? date.toLocaleDateString("bn-BD", { day: "numeric", month: "long", year: "numeric" })
    : date.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
}

export function NoticeDetailClient({ notice }: { notice: any }) {
  const { language } = useLanguage();

  if (!notice) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <Bell size={48} className="text-gray-200 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-700 mb-2">
          {language === "bn" ? "নোটিশটি পাওয়া যায়নি" : "Notice not found"}
        </h2>
        <Link href="/notices" className="text-[#016B00] hover:underline text-sm">
          {language === "bn" ? "সব নোটিশ দেখুন" : "View all notices"}
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/notices"
          className="inline-flex items-center gap-2 text-[#016B00] hover:text-[#024D00] text-sm font-medium mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          {language === "bn" ? "সব নোটিশ" : "All Notices"}
        </Link>

        <article className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-[#016B00] to-[#024D00] px-8 py-6 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full bg-white/20 capitalize"
              >
                <Tag size={10} />
                {notice.category}
              </span>
              {notice.is_important && (
                <span className="text-xs font-bold bg-red-500 text-white px-2.5 py-1 rounded-full">
                  ⚡ {language === "bn" ? "জরুরি" : "Important"}
                </span>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl font-bold leading-tight">
              {language === "bn" ? notice.title_bn : notice.title_en}
            </h1>
            <div className="flex items-center gap-2 mt-3 text-green-200 text-sm">
              <Calendar size={14} />
              {formatDate(notice.created_at, language)}
            </div>
          </div>

          <div className="p-8">
            <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
              <p>{language === "bn" ? notice.description_bn : notice.description_en}</p>
            </div>

            {notice.attachment_url && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <a
                  href={notice.attachment_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-[#016B00] hover:bg-green-100 rounded-lg text-sm font-medium transition-colors"
                >
                  <Download size={16} />
                  {language === "bn" ? "অ্যাটাচমেন্ট ডাউনলোড করুন" : "Download Attachment"}
                </a>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                {language === "bn"
                  ? "— দুলারহাট মাধ্যমিক বিদ্যালয় কর্তৃপক্ষ"
                  : "— Dularhat Secondary School Authority"}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
