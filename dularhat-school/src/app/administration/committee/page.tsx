"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CommitteePage() {
  const { language } = useLanguage();

  return (
    <div className="bg-white">
      <PageHeader
        title={{ bengali: "ম্যানেজিং কমিটি", english: "Managing Committee" }}
        subtitle={{ bengali: "বিদ্যালয় পরিচালনা কমিটির সদস্যগণ", english: "Members of the school managing committee" }}
        breadcrumbs={[
          { label: { bengali: "প্রশাসন", english: "Administration" }, href: "/administration" },
          { label: { bengali: "ম্যানেজিং কমিটি", english: "Managing Committee" } },
        ]}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {language === "bn" ? "ম্যানেজিং কমিটি" : "Managing Committee"}
        </h2>
        <div className="w-16 h-1 bg-[#016B00] rounded mb-6" />

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
          <p className="text-amber-700 text-sm leading-relaxed">
            <span className="font-bold">
              {language === "bn" ? "তথ্য পাওয়া যায়নি: " : "Information unavailable: "}
            </span>
            {language === "bn"
              ? "ম্যানেজিং কমিটির সদস্যদের বিস্তারিত তথ্য বর্তমানে অনলাইনে উপলব্ধ নেই। তথ্যের জন্য সরাসরি বিদ্যালয়ে যোগাযোগ করুন।"
              : "Detailed information about the managing committee members is not currently available online. Please contact the school directly for this information."}
          </p>
        </div>

        {/* Roles info */}
        <div className="space-y-4">
          <h3 className="font-bold text-gray-900 text-lg">
            {language === "bn" ? "কমিটির ভূমিকা" : "Committee Roles"}
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                role_bn: "সভাপতি",
                role_en: "Chairman",
                desc_bn: "কমিটির প্রধান এবং বিদ্যালয়ের সর্বোচ্চ কর্তৃপক্ষ।",
                desc_en: "Head of the committee and highest authority of the school.",
              },
              {
                role_bn: "প্রধান শিক্ষক (সদস্য-সচিব)",
                role_en: "Headmaster (Member Secretary)",
                desc_bn: "বিদ্যালয়ের একাডেমিক ও প্রশাসনিক কার্যক্রমের সচিব।",
                desc_en: "Secretary of the school's academic and administrative activities.",
              },
              {
                role_bn: "অভিভাবক প্রতিনিধি",
                role_en: "Guardian Representatives",
                desc_bn: "শিক্ষার্থীদের অভিভাবকদের প্রতিনিধিত্বকারী সদস্য।",
                desc_en: "Members representing the guardians of students.",
              },
              {
                role_bn: "শিক্ষক প্রতিনিধি",
                role_en: "Teacher Representative",
                desc_bn: "শিক্ষক পরিষদের পক্ষ থেকে নির্বাচিত প্রতিনিধি।",
                desc_en: "Elected representative from the teachers' council.",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-green-50 transition-colors">
                <div className="w-8 h-8 bg-[#016B00] text-white rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-sm">
                  {i + 1}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {language === "bn" ? item.role_bn : item.role_en}
                  </h4>
                  <p className="text-gray-500 text-sm mt-0.5">
                    {language === "bn" ? item.desc_bn : item.desc_en}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
