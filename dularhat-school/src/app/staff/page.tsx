"use client";

import { Briefcase } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { useLanguage } from "@/contexts/LanguageContext";

// Sample staff cards - in production, fetched from Supabase
const sampleStaff = [
  { id: 1, initial: "ক", role_bn: "অফিস সহকারী", role_en: "Office Assistant", dept_bn: "প্রশাসন", dept_en: "Administration" },
  { id: 2, initial: "খ", role_bn: "অ্যাকাউন্ট্যান্ট", role_en: "Accountant", dept_bn: "প্রশাসন", dept_en: "Administration" },
  { id: 3, initial: "গ", role_bn: "লাইব্রেরিয়ান", role_en: "Librarian", dept_bn: "গ্রন্থাগার", dept_en: "Library" },
  { id: 4, initial: "ঘ", role_bn: "ল্যাব সহকারী", role_en: "Lab Assistant", dept_bn: "বিজ্ঞান বিভাগ", dept_en: "Science Dept." },
  { id: 5, initial: "ঙ", role_bn: "পিয়ন / অফিস সহায়ক", role_en: "Office Helper", dept_bn: "প্রশাসন", dept_en: "Administration" },
  { id: 6, initial: "চ", role_bn: "পরিচ্ছন্নতাকর্মী", role_en: "Cleaning Staff", dept_bn: "রক্ষণাবেক্ষণ", dept_en: "Maintenance" },
  { id: 7, initial: "ছ", role_bn: "মালী", role_en: "Gardener", dept_bn: "রক্ষণাবেক্ষণ", dept_en: "Maintenance" },
  { id: 8, initial: "জ", role_bn: "নিরাপত্তাকর্মী", role_en: "Security Guard", dept_bn: "নিরাপত্তা", dept_en: "Security" },
];

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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {language === "bn" ? "কর্মচারীবৃন্দ" : "Staff Members"}
            </h2>
            <div className="w-16 h-1 bg-[#016B00] rounded mt-2" />
          </div>
        </div>

        {/* Info Notice */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8">
          <p className="text-amber-700 text-sm leading-relaxed">
            <span className="font-bold">
              {language === "bn" ? "নোট: " : "Note: "}
            </span>
            {language === "bn"
              ? "কর্মচারীদের বিস্তারিত তথ্য বিদ্যালয়ের প্রশাসনিক প্যানেল থেকে আপডেট করা হবে। নিচে কার্ডগুলো উদাহরণ হিসেবে দেখানো হয়েছে।"
              : "Detailed staff information will be updated from the school admin panel. The cards below are shown as examples."}
          </p>
        </div>

        {/* Staff Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Office Head Banner Card */}
          <div className="bg-gradient-to-br from-[#016B00] to-[#024D00] rounded-2xl p-6 text-white col-span-full flex items-center gap-6">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-white/30">
              <Briefcase size={36} className="text-white" />
            </div>
            <div>
              <div className="text-green-200 text-sm mb-1">
                {language === "bn" ? "বিদ্যালয়ের কার্যালয়" : "School Office"}
              </div>
              <h3 className="font-bold text-xl">
                {language === "bn" ? "প্রধান অফিস সহকারী" : "Head Office Assistant"}
              </h3>
              <p className="text-green-200 text-sm mt-1">
                {language === "bn"
                  ? "দুলারহাট মাধ্যমিক বিদ্যালয়"
                  : "Dularhat Secondary School"}
              </p>
            </div>
          </div>

          {/* Individual Staff Cards */}
          {sampleStaff.map((member) => (
            <div
              key={member.id}
              className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-[#016B00]/30 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 font-bold text-xl flex-shrink-0">
                  {member.initial}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    {language === "bn" ? member.role_bn : member.role_en}
                  </p>
                  <p className="text-gray-400 text-xs mt-0.5">
                    {language === "bn" ? member.dept_bn : member.dept_en}
                  </p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-50">
                <span className="text-xs bg-gray-50 text-gray-500 px-2 py-1 rounded-full border border-gray-100">
                  {language === "bn" ? member.dept_bn : member.dept_en}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
