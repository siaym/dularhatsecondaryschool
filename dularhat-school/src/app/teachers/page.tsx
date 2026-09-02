"use client";

import { GraduationCap } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";

const sampleTeachers = [
  { id: 1, initial: "ক", subject_bn: "বাংলা", subject_en: "Bengali" },
  { id: 2, initial: "খ", subject_bn: "ইংরেজি", subject_en: "English" },
  { id: 3, initial: "গ", subject_bn: "গণিত", subject_en: "Mathematics" },
  { id: 4, initial: "ঘ", subject_bn: "বিজ্ঞান", subject_en: "Science" },
  { id: 5, initial: "ঙ", subject_bn: "সমাজ বিজ্ঞান", subject_en: "Social Science" },
  { id: 6, initial: "চ", subject_bn: "ধর্ম শিক্ষা", subject_en: "Religious Studies" },
  { id: 7, initial: "ছ", subject_bn: "শারীরিক শিক্ষা", subject_en: "Physical Education" },
  { id: 8, initial: "জ", subject_bn: "কৃষি শিক্ষা", subject_en: "Agricultural Studies" },
];

export default function TeachersPage() {
  const { language } = useLanguage();
  return (
    <div>
      <PageHero
        variant="green"
        eyebrow={{ bengali: "শিক্ষকবৃন্দ", english: "Faculty" }}
        title={{ bengali: "আমাদের শিক্ষকমণ্ডলী", english: "Our Teaching Faculty" }}
        description={{ bengali: "দুলারহাট মাধ্যমিক বিদ্যালয়ের দক্ষ ও অভিজ্ঞ শিক্ষকবৃন্দ", english: "Qualified and experienced teachers of Dularhat Secondary School" }}
        breadcrumbs={[{ label: { bengali: "শিক্ষকবৃন্দ", english: "Teachers" } }]}
      />

      {/* Headmaster featured */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={language === "bn" ? "বিদ্যালয়ের প্রধান" : "Head of School"}
            title={language === "bn" ? "প্রধান শিক্ষক" : "Headmaster"}
          />
          <div className="bg-gradient-to-br from-[#006B2D] to-[#003D1A] rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6 text-white mb-12">
            <div className="w-24 h-24 bg-white/15 rounded-full flex items-center justify-center border-2 border-white/25 flex-shrink-0">
              <GraduationCap size={44} className="text-white/70" />
            </div>
            <div>
              <span className="text-[#F5C400] text-xs font-bold uppercase tracking-widest">
                {language === "bn" ? "প্রধান শিক্ষক" : "Headmaster"}
              </span>
              <h2 className="text-xl font-bold text-white mt-1">
                {language === "bn" ? "দুলারহাট মাধ্যমিক বিদ্যালয়" : "Dularhat Secondary School"}
              </h2>
              <p className="text-green-200 text-sm mt-1">{language === "bn" ? "চরফ্যাশন, ভোলা" : "Charfashion, Bhola"}</p>
              <p className="text-green-300 text-xs mt-3">
                {language === "bn" ? "* নাম প্রশাসন কর্তৃক আপডেট করা হবে।" : "* Name will be updated by administration."}
              </p>
            </div>
          </div>

          {/* Teacher grid */}
          <SectionHeading
            eyebrow={language === "bn" ? "শিক্ষকবৃন্দ" : "Teaching Staff"}
            title={language === "bn" ? "সহকারী শিক্ষকগণ" : "Assistant Teachers"}
          />
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-amber-700 text-sm">
            <span className="font-bold">{language === "bn" ? "নোট: " : "Note: "}</span>
            {language === "bn"
              ? "শিক্ষকদের বিস্তারিত তথ্য প্রশাসনিক প্যানেল থেকে আপডেট করা হবে। নিচের কার্ডগুলো উদাহরণস্বরূপ।"
              : "Teacher details will be updated from the admin panel. Cards below are illustrative."}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sampleTeachers.map((t) => (
              <div key={t.id} className="bg-[#F5FAF6] border border-[#DDE8DD] rounded-xl p-5 hover:border-[#006B2D]/40 hover:bg-white transition-all">
                <div className="w-14 h-14 bg-[#006B2D]/10 rounded-full flex items-center justify-center text-[#006B2D] font-black text-xl mb-3">
                  {t.initial}
                </div>
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                  {language === "bn" ? "সহকারী শিক্ষক" : "Assistant Teacher"}
                </p>
                <p className="font-semibold text-[#003D1A] text-sm mt-0.5">
                  {language === "bn" ? t.subject_bn : t.subject_en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
