"use client";

import { PageHero } from "@/components/ui/PageHero";
import { useLanguage } from "@/contexts/LanguageContext";

export default function StaffPage() {
  const { language } = useLanguage();
  return (
    <div>
      <PageHero
        variant="green"
        eyebrow={{ bengali: "কর্মচারীবৃন্দ", english: "Staff" }}
        title={{ bengali: "কর্মকর্তা ও কর্মচারীবৃন্দ", english: "Officers & Staff" }}
        description={{ bengali: "বিদ্যালয়ের শিক্ষেতর কর্মীবৃন্দ", english: "Non-teaching staff of the school" }}
        breadcrumbs={[{ label: { bengali: "কর্মচারীবৃন্দ", english: "Staff" } }]}
      />
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8 text-amber-700 text-sm">
            <span className="font-bold">{language === "bn" ? "নোট: " : "Note: "}</span>
            {language === "bn"
              ? "কর্মচারীদের বিস্তারিত তথ্য প্রশাসনিক প্যানেল থেকে আপডেট করা হবে।"
              : "Staff details will be updated from the admin panel."}
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { emoji: "📋", bn: "অফিস সহকারী", en: "Office Assistant" },
              { emoji: "📚", bn: "লাইব্রেরিয়ান", en: "Librarian" },
              { emoji: "🔧", bn: "পরিচ্ছন্নতাকর্মী", en: "Cleaning Staff" },
              { emoji: "🔒", bn: "নিরাপত্তাকর্মী", en: "Security Guard" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-[#F5FAF6] border border-[#DDE8DD] rounded-xl hover:border-[#006B2D]/30 transition-colors">
                <span className="text-3xl">{item.emoji}</span>
                <div>
                  <p className="font-semibold text-[#003D1A] text-sm">{language === "bn" ? item.bn : item.en}</p>
                  <p className="text-gray-400 text-xs">{language === "bn" ? "দুলারহাট মাধ্যমিক বিদ্যালয়" : "Dularhat Secondary School"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
