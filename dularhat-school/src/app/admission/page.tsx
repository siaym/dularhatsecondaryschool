"use client";

import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";
import { schoolData } from "@/data/school-data";

export default function AdmissionPage() {
  const { t, language } = useLanguage();
  return (
    <div>
      <PageHeader
        title={{ bengali: "ভর্তি তথ্য", english: "Admission Information" }}
        subtitle={{ bengali: "বিদ্যালয়ে ভর্তির নিয়মাবলী ও প্রক্রিয়া", english: "Admission rules and process" }}
        breadcrumbs={[{ label: { bengali: "ভর্তি", english: "Admission" } }]}
      />

      {/* Overview */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title={language === "bn" ? "কীভাবে ভর্তি হবেন" : "How to Apply"}
          />
          <div className="bg-[#F0FAF3] border border-[#DDE8DD] rounded-xl p-6 mb-10 text-[#003D1A] text-sm leading-relaxed">
            {language === "bn"
              ? "দুলারহাট মাধ্যমিক বিদ্যালয়ে ষষ্ঠ শ্রেণি থেকে দশম শ্রেণি পর্যন্ত ভর্তির সুযোগ রয়েছে। প্রতি বছর বিজ্ঞপ্তি প্রকাশের পর ভর্তি কার্যক্রম শুরু হয়।"
              : "Dularhat Secondary School accepts admissions from Class 6 to Class 10. Admission process begins after the annual notice is published."}
          </div>

          {/* Classes */}
          <h3 className="font-bold text-[#003D1A] mb-4 text-lg">{language === "bn" ? "ভর্তির শ্রেণি" : "Available Classes"}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
            {schoolData.academics.classes.map((cls, i) => (
              <div key={i} className="text-center p-4 bg-[#F5FAF6] border border-[#DDE8DD] rounded-xl">
                <div className="text-2xl font-black text-[#006B2D]">{String(cls.grade).padStart(2, "0")}</div>
                <div className="text-xs text-gray-500 mt-1">{t(cls)}</div>
              </div>
            ))}
          </div>

          {/* Documents */}
          <h3 className="font-bold text-[#003D1A] mb-4 text-lg">{language === "bn" ? "প্রয়োজনীয় কাগজপত্র" : "Required Documents"}</h3>
          <div className="space-y-2.5 mb-10">
            {[
              { bn: "পূর্ববর্তী শ্রেণির সার্টিফিকেট / মূল নম্বরপত্র", en: "Previous class certificate / mark sheet" },
              { bn: "জন্ম সনদ (ইংরেজি)", en: "Birth certificate (English)" },
              { bn: "পাসপোর্ট সাইজের ছবি (৩ কপি)", en: "Passport size photos (3 copies)" },
              { bn: "অভিভাবকের জাতীয় পরিচয়পত্রের ফটোকপি", en: "Guardian's NID photocopy" },
              { bn: "ট্রান্সফার সার্টিফিকেট (প্রযোজ্য ক্ষেত্রে)", en: "Transfer certificate (if applicable)" },
            ].map((doc, i) => (
              <div key={i} className="flex gap-3 p-3 bg-[#F5FAF6] border border-[#DDE8DD] rounded-xl">
                <span className="text-[#006B2D] font-bold text-sm flex-shrink-0">✓</span>
                <span className="text-gray-700 text-sm">{language === "bn" ? doc.bn : doc.en}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — dark green */}
      <section className="bg-[#004D24] py-12 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-bold text-lg">{language === "bn" ? "ভর্তি সংক্রান্ত তথ্যের জন্য" : "For admission information"}</p>
            <p className="text-green-200 text-sm mt-1">{language === "bn" ? "সরাসরি বিদ্যালয়ে যোগাযোগ করুন।" : "Contact the school directly."}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`tel:${schoolData.contact.mobile_1}`} className="inline-flex items-center gap-2 bg-white text-[#006B2D] px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-green-50 transition-colors">
              <Phone size={15} /> {schoolData.contact.mobile_1}
            </a>
            <a href={`mailto:${schoolData.contact.email}`} className="inline-flex items-center gap-2 bg-white/15 border border-white/25 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-white/25 transition-colors">
              <Mail size={15} /> {language === "bn" ? "ইমেইল করুন" : "Email Us"}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
