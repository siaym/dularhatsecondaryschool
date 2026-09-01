"use client";

import Link from "next/link";
import { ArrowLeft, Calendar, Tag, Bell } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { notFound } from "next/navigation";

const notices: Record<string, {
  id: string; title_bn: string; title_en: string; date: string;
  category_bn: string; category_en: string; color: string; is_important: boolean;
  body_bn: string; body_en: string;
}> = {
  "1": {
    id: "1",
    title_bn: "বার্ষিক পরীক্ষার সময়সূচি ২০২৪",
    title_en: "Annual Examination Schedule 2024",
    date: "2024-11-15",
    category_bn: "পরীক্ষা",
    category_en: "Examination",
    color: "#DC2626",
    is_important: true,
    body_bn: "দুলারহাট মাধ্যমিক বিদ্যালয়ের বার্ষিক পরীক্ষার সময়সূচি প্রকাশিত হয়েছে। সকল শিক্ষার্থীদের জানানো যাচ্ছে যে আগামী ডিসেম্বর মাসে বার্ষিক পরীক্ষা অনুষ্ঠিত হবে। বিস্তারিত সময়সূচির জন্য বিদ্যালয়ের নোটিশ বোর্ড দেখুন।",
    body_en: "The annual examination schedule for Dularhat Secondary School has been published. All students are informed that the annual examination will be held in December. See the school notice board for detailed schedule.",
  },
};

function formatDate(dateStr: string, language: string) {
  const date = new Date(dateStr);
  return language === "bn"
    ? date.toLocaleDateString("bn-BD", { day: "numeric", month: "long", year: "numeric" })
    : date.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
}

export default function NoticeDetailPage({ params }: { params: { id: string } }) {
  const { language } = useLanguage();
  const notice = notices[params.id];

  if (!notice) {
    // Graceful fallback — don't call notFound() in client component
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
                className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1 rounded-full bg-white/20"
              >
                <Tag size={10} />
                {language === "bn" ? notice.category_bn : notice.category_en}
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
              {formatDate(notice.date, language)}
            </div>
          </div>

          <div className="p-8">
            <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed">
              <p>{language === "bn" ? notice.body_bn : notice.body_en}</p>
            </div>

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
