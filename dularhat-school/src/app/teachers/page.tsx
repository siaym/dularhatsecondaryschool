"use client";

import { GraduationCap } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";



export default function TeachersPage() {
  const { language } = useLanguage();
  return (
    <div>
      <PageHeader
        title={{ bengali: "আমাদের শিক্ষকমণ্ডলী", english: "Our Teaching Faculty" }}
        subtitle={{ bengali: "দুলারহাট মাধ্যমিক বিদ্যালয়ের দক্ষ ও অভিজ্ঞ শিক্ষকবৃন্দ", english: "Qualified and experienced teachers of Dularhat Secondary School" }}
        breadcrumbs={[{ label: { bengali: "শিক্ষকবৃন্দ", english: "Teachers" } }]}
      />

      {/* Headmaster featured */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
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
            title={language === "bn" ? "সহকারী শিক্ষকগণ" : "Assistant Teachers"}
          />
          <div className="bg-[#F5FAF6] border border-[#DDE8DD] rounded-xl p-8 text-center mt-6">
            <p className="text-gray-500 font-medium">
              {language === "bn"
                ? "শিক্ষকবৃন্দের তথ্য শীঘ্রই প্রকাশ করা হবে। যেকোনো তথ্যের জন্য অনুগ্রহ করে যোগাযোগ করুন।"
                : "Teacher information will be published soon. Please contact us for any inquiries."}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
