"use client";

import { GraduationCap } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageSidebar } from "@/components/ui/PageSidebar";
import { useLanguage } from "@/contexts/LanguageContext";

// Sample teacher cards - in production, fetched from Supabase
const sampleTeachers = [
  { id: 1, initial: "ক", subject_bn: "বাংলা", subject_en: "Bengali", designation_bn: "সহকারী শিক্ষক", designation_en: "Assistant Teacher" },
  { id: 2, initial: "খ", subject_bn: "ইংরেজি", subject_en: "English", designation_bn: "সহকারী শিক্ষক", designation_en: "Assistant Teacher" },
  { id: 3, initial: "গ", subject_bn: "গণিত", subject_en: "Mathematics", designation_bn: "সহকারী শিক্ষক", designation_en: "Assistant Teacher" },
  { id: 4, initial: "ঘ", subject_bn: "বিজ্ঞান", subject_en: "Science", designation_bn: "সহকারী শিক্ষক", designation_en: "Assistant Teacher" },
  { id: 5, initial: "ঙ", subject_bn: "সমাজ বিজ্ঞান", subject_en: "Social Science", designation_bn: "সহকারী শিক্ষক", designation_en: "Assistant Teacher" },
  { id: 6, initial: "চ", subject_bn: "ধর্ম শিক্ষা", subject_en: "Religious Studies", designation_bn: "সহকারী শিক্ষক", designation_en: "Assistant Teacher" },
];

export default function TeachersPage() {
  const { language } = useLanguage();

  return (
    <div className="bg-white">
      <PageHeader
        title={{ bengali: "শিক্ষকবৃন্দ", english: "Teaching Staff" }}
        subtitle={{ bengali: "আমাদের দক্ষ ও অভিজ্ঞ শিক্ষকমণ্ডলী", english: "Our qualified and experienced teaching faculty" }}
        breadcrumbs={[
          { label: { bengali: "শিক্ষকবৃন্দ", english: "Teachers" } },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {language === "bn" ? "শিক্ষকমণ্ডলী" : "Teaching Faculty"}
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
                  ? "শিক্ষকদের বিস্তারিত তথ্য বিদ্যালয়ের প্রশাসনিক প্যানেল থেকে আপডেট করা হবে। নিচে কার্ডগুলো উদাহরণ হিসেবে দেখানো হয়েছে।"
                  : "Detailed teacher information will be updated from the school admin panel. The cards below are shown as examples."}
              </p>
            </div>

            {/* Teacher Cards Grid */}
            <div className="grid sm:grid-cols-2 gap-5">
              {/* Headmaster Card */}
              <div className="bg-gradient-to-br from-[#016B00] to-[#024D00] rounded-2xl p-6 text-white col-span-full sm:col-span-2 flex items-center gap-6">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-white/30">
                  <GraduationCap size={36} className="text-white" />
                </div>
                <div>
                  <div className="text-green-200 text-sm mb-1">
                    {language === "bn" ? "বিদ্যালয়ের প্রধান" : "Head of School"}
                  </div>
                  <h3 className="font-bold text-xl">
                    {language === "bn" ? "প্রধান শিক্ষক" : "Headmaster"}
                  </h3>
                  <p className="text-green-200 text-sm mt-1">
                    {language === "bn"
                      ? "দুলারহাট মাধ্যমিক বিদ্যালয়"
                      : "Dularhat Secondary School"}
                  </p>
                </div>
              </div>

              {/* Sample Teacher Cards */}
              {sampleTeachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-[#016B00]/30 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-[#016B00] font-bold text-xl flex-shrink-0">
                      {teacher.initial}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-500 text-sm">
                        {language === "bn" ? teacher.designation_bn : teacher.designation_en}
                      </p>
                      <p className="text-gray-400 text-xs mt-0.5">
                        {language === "bn" ? teacher.subject_bn : teacher.subject_en}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-50">
                    <span className="text-xs bg-green-50 text-[#016B00] px-2 py-1 rounded-full">
                      {language === "bn" ? teacher.subject_bn : teacher.subject_en}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <PageSidebar
              quickLinks={[
                { label: language === "bn" ? "কর্মচারীবৃন্দ" : "Staff", href: "/staff" },
                { label: language === "bn" ? "প্রধান শিক্ষক" : "Headmaster", href: "/administration/headmaster" },
                { label: language === "bn" ? "নোটিশ" : "Notices", href: "/notices" },
                { label: language === "bn" ? "ভর্তি" : "Admission", href: "/admission" },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
