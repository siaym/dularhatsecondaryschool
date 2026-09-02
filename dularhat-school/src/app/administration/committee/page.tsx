"use client";

import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CommitteePage() {
  const { language } = useLanguage();
  return (
    <div>
      <PageHero
        variant="dark"
        eyebrow={{ bengali: "প্রশাসন", english: "Administration" }}
        title={{ bengali: "ম্যানেজিং কমিটি", english: "Managing Committee" }}
        description={{ bengali: "বিদ্যালয় পরিচালনা কমিটির সদস্যগণ", english: "Members of the school managing committee" }}
        breadcrumbs={[
          { label: { bengali: "প্রশাসন", english: "Administration" }, href: "/administration" },
          { label: { bengali: "ম্যানেজিং কমিটি", english: "Managing Committee" } },
        ]}
      />
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-10 text-amber-700 text-sm">
            <span className="font-bold">{language === "bn" ? "তথ্য পাওয়া যায়নি: " : "Not available: "}</span>
            {language === "bn"
              ? "কমিটির বিস্তারিত সদস্য তালিকা অনলাইনে প্রকাশিত হয়নি। সরাসরি বিদ্যালয়ে যোগাযোগ করুন।"
              : "Detailed committee member list is not published online. Contact the school directly."}
          </div>
          <SectionHeading
            eyebrow={language === "bn" ? "কমিটির ভূমিকা" : "Committee Roles"}
            title={language === "bn" ? "পদবিসমূহ" : "Positions"}
          />
          <div className="space-y-3">
            {[
              { no: "১", role_bn: "সভাপতি", role_en: "Chairman", desc_bn: "কমিটির প্রধান ও সর্বোচ্চ কর্তৃপক্ষ।", desc_en: "Head of the committee and highest authority." },
              { no: "২", role_bn: "প্রধান শিক্ষক (সদস্য-সচিব)", role_en: "Headmaster (Secretary)", desc_bn: "একাডেমিক ও প্রশাসনিক কার্যক্রমের সচিব।", desc_en: "Secretary of academic and administrative activities." },
              { no: "৩", role_bn: "অভিভাবক প্রতিনিধি", role_en: "Guardian Representatives", desc_bn: "শিক্ষার্থীদের অভিভাবকদের প্রতিনিধি।", desc_en: "Representatives of student guardians." },
              { no: "৪", role_bn: "শিক্ষক প্রতিনিধি", role_en: "Teacher Representative", desc_bn: "শিক্ষক পরিষদের নির্বাচিত প্রতিনিধি।", desc_en: "Elected representative from the teacher council." },
            ].map((item) => (
              <div key={item.no} className="flex gap-4 p-4 bg-[#F5FAF6] border border-[#DDE8DD] rounded-xl hover:border-[#006B2D]/30 transition-colors">
                <div className="w-8 h-8 bg-[#006B2D] text-white rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0">{item.no}</div>
                <div>
                  <h4 className="font-semibold text-[#003D1A] text-sm">{language === "bn" ? item.role_bn : item.role_en}</h4>
                  <p className="text-gray-500 text-xs mt-0.5">{language === "bn" ? item.desc_bn : item.desc_en}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
