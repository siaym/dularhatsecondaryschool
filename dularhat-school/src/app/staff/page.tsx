"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { PageSidebar } from "@/components/ui/PageSidebar";
import { useLanguage } from "@/contexts/LanguageContext";

export default function StaffPage() {
  const { language } = useLanguage();

  return (
    <div className="bg-white">
      <PageHeader
        title={{ bengali: "কর্মচারীবৃন্দ", english: "Non-Teaching Staff" }}
        subtitle={{ bengali: "বিদ্যালয়ের কর্মকর্তা ও কর্মচারীবৃন্দ", english: "School officers and non-teaching staff" }}
        breadcrumbs={[
          { label: { bengali: "কর্মচারীবৃন্দ", english: "Staff" } },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {language === "bn" ? "কর্মচারীবৃন্দ" : "Staff Members"}
            </h2>
            <div className="w-16 h-1 bg-[#016B00] rounded mb-6" />
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8">
              <p className="text-amber-700 text-sm leading-relaxed">
                <span className="font-bold">{language === "bn" ? "নোট: " : "Note: "}</span>
                {language === "bn"
                  ? "কর্মচারীদের বিস্তারিত তথ্য বিদ্যালয়ের প্রশাসনিক প্যানেল থেকে আপডেট করা হবে।"
                  : "Staff details will be updated from the school admin panel."}
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: "📋", role_bn: "অফিস সহকারী", role_en: "Office Assistant" },
                { icon: "📚", role_bn: "লাইব্রেরিয়ান", role_en: "Librarian" },
                { icon: "🔧", role_bn: "পরিচ্ছন্নতাকর্মী", role_en: "Cleaning Staff" },
                { icon: "🔒", role_bn: "নিরাপত্তাকর্মী", role_en: "Security Guard" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-green-50 transition-colors">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <p className="font-semibold text-gray-800">
                      {language === "bn" ? item.role_bn : item.role_en}
                    </p>
                    <p className="text-gray-400 text-xs mt-0.5">
                      {language === "bn" ? "দুলারহাট মাধ্যমিক বিদ্যালয়" : "Dularhat Secondary School"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <PageSidebar
              quickLinks={[
                { label: language === "bn" ? "শিক্ষকবৃন্দ" : "Teachers", href: "/teachers" },
                { label: language === "bn" ? "প্রধান শিক্ষক" : "Headmaster", href: "/administration/headmaster" },
                { label: language === "bn" ? "যোগাযোগ" : "Contact", href: "/contact" },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
