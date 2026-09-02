"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AdministrationPage() {
  const { language } = useLanguage();
  return (
    <div>
      <PageHero
        variant="dark"
        eyebrow={{ bengali: "প্রশাসন", english: "Administration" }}
        title={{ bengali: "বিদ্যালয় প্রশাসন", english: "School Administration" }}
        description={{ bengali: "প্রধান শিক্ষক ও ম্যানেজিং কমিটি", english: "Headmaster and Managing Committee" }}
        breadcrumbs={[{ label: { bengali: "প্রশাসন", english: "Administration" } }]}
      />
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={language === "bn" ? "প্রশাসনিক কাঠামো" : "Structure"}
            title={language === "bn" ? "প্রশাসনিক বিভাগ" : "Administrative Divisions"}
          />
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { href: "/administration/headmaster", emoji: "🎓", title_bn: "প্রধান শিক্ষকের বাণী", title_en: "Headmaster's Message", desc_bn: "প্রধান শিক্ষকের বিশেষ বার্তা পড়ুন।", desc_en: "Read the special message from the Headmaster." },
              { href: "/administration/committee", emoji: "👥", title_bn: "ম্যানেজিং কমিটি", title_en: "Managing Committee", desc_bn: "বিদ্যালয় পরিচালনা কমিটির বিস্তারিত।", desc_en: "Details of the school managing committee." },
            ].map((item, i) => (
              <Link key={i} href={item.href} className="group flex items-start gap-5 p-6 bg-[#F5FAF6] border-2 border-[#DDE8DD] rounded-2xl hover:border-[#006B2D] hover:shadow-md transition-all">
                <span className="text-4xl flex-shrink-0">{item.emoji}</span>
                <div>
                  <h3 className="font-bold text-[#003D1A] text-lg group-hover:text-[#006B2D] transition-colors mb-1">
                    {language === "bn" ? item.title_bn : item.title_en}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">{language === "bn" ? item.desc_bn : item.desc_en}</p>
                  <span className="inline-flex items-center gap-1.5 text-[#006B2D] text-sm font-semibold group-hover:gap-2.5 transition-all">
                    {language === "bn" ? "দেখুন" : "View"} <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
