"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { PageSidebar } from "@/components/ui/PageSidebar";
import { useLanguage } from "@/contexts/LanguageContext";
import { schoolData } from "@/data/school-data";
import { Phone, Mail } from "lucide-react";

export default function AdmissionPage() {
  const { t, language } = useLanguage();

  return (
    <div className="bg-white">
      <PageHeader
        title={{ bengali: "ভর্তি তথ্য", english: "Admission Information" }}
        subtitle={{ bengali: "বিদ্যালয়ে ভর্তির নিয়মাবলী ও প্রক্রিয়া", english: "Rules and process for admission to the school" }}
        breadcrumbs={[{ label: { bengali: "ভর্তি", english: "Admission" } }]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {language === "bn" ? "ভর্তি প্রক্রিয়া" : "Admission Process"}
              </h2>
              <div className="w-16 h-1 bg-[#016B00] rounded mb-6" />

              <div className="bg-[#016B00]/5 border border-[#016B00]/20 rounded-2xl p-6 mb-6">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {language === "bn"
                    ? "দুলারহাট মাধ্যমিক বিদ্যালয়ে ষষ্ঠ শ্রেণি থেকে দশম শ্রেণি পর্যন্ত ভর্তির সুযোগ রয়েছে। ভর্তির জন্য প্রতি বছর বিজ্ঞপ্তি প্রকাশিত হয়।"
                    : "Dularhat Secondary School accepts admissions from Class 6 to Class 10. Admission notices are published every year."}
                </p>
              </div>

              {/* Classes */}
              <h3 className="font-bold text-gray-900 text-lg mb-4">
                {language === "bn" ? "ভর্তির শ্রেণি" : "Available Classes"}
              </h3>
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {schoolData.academics.classes.map((cls, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="w-8 h-8 bg-[#016B00] text-white rounded-lg flex items-center justify-center font-bold text-sm">
                      {cls.grade}
                    </div>
                    <span className="font-medium text-gray-800">{t(cls)}</span>
                  </div>
                ))}
              </div>

              {/* Documents Required */}
              <h3 className="font-bold text-gray-900 text-lg mb-4">
                {language === "bn" ? "প্রয়োজনীয় কাগজপত্র" : "Required Documents"}
              </h3>
              <div className="space-y-3 mb-8">
                {[
                  { bn: "পূর্ববর্তী শ্রেণির সার্টিফিকেট / মূল নম্বরপত্র", en: "Previous class certificate / original mark sheet" },
                  { bn: "জন্ম সনদ (ইংরেজি)", en: "Birth certificate (English)" },
                  { bn: "পাসপোর্ট সাইজের ছবি (৩ কপি)", en: "Passport size photos (3 copies)" },
                  { bn: "অভিভাবকের জাতীয় পরিচয়পত্রের ফটোকপি", en: "Guardian's National ID card photocopy" },
                  { bn: "ট্রান্সফার সার্টিফিকেট (প্রযোজ্য ক্ষেত্রে)", en: "Transfer certificate (if applicable)" },
                ].map((doc, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="text-[#016B00] font-bold text-sm mt-0.5">✓</span>
                    <span className="text-gray-700 text-sm">{language === "bn" ? doc.bn : doc.en}</span>
                  </div>
                ))}
              </div>

              {/* Current Notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                <h3 className="font-bold text-amber-800 mb-2">
                  {language === "bn" ? "ভর্তি বিজ্ঞপ্তি" : "Admission Notice"}
                </h3>
                <p className="text-amber-700 text-sm leading-relaxed mb-4">
                  {language === "bn"
                    ? "বর্তমান ভর্তি বিজ্ঞপ্তি ও তারিখের জন্য বিদ্যালয়ের নোটিশ বোর্ড অথবা সরাসরি বিদ্যালয়ে যোগাযোগ করুন।"
                    : "For current admission notices and dates, check the school notice board or contact the school directly."}
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href={`tel:${schoolData.contact.mobile_1}`} className="flex items-center gap-2 bg-[#016B00] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#024D00] transition-colors">
                    <Phone size={15} /> {schoolData.contact.mobile_1}
                  </a>
                  <a href={`mailto:${schoolData.contact.email}`} className="flex items-center gap-2 bg-white border border-[#016B00] text-[#016B00] px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors">
                    <Mail size={15} /> {language === "bn" ? "ইমেইল করুন" : "Send Email"}
                  </a>
                </div>
              </div>
            </section>
          </div>
          <div>
            <PageSidebar
              quickLinks={[
                { label: language === "bn" ? "নোটিশ" : "Notices", href: "/notices" },
                { label: language === "bn" ? "একাডেমিক" : "Academics", href: "/academics" },
                { label: language === "bn" ? "যোগাযোগ" : "Contact", href: "/contact" },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
