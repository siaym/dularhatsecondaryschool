"use client";

import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AdministrationPage() {
  const { language } = useLanguage();

  const adminLinks = [
    {
      title: { bengali: "প্রধান শিক্ষকের বাণী", english: "Headmaster's Message" },
      desc: { bengali: "প্রধান শিক্ষকের পক্ষ থেকে বিশেষ বার্তা পড়ুন।", english: "Read the special message from the Headmaster." },
      href: "/administration/headmaster",
      icon: "🎓",
    },
    {
      title: { bengali: "ম্যানেজিং কমিটি", english: "Managing Committee" },
      desc: { bengali: "বিদ্যালয়ের ম্যানেজিং কমিটির সদস্যদের তালিকা।", english: "List of school managing committee members." },
      href: "/administration/committee",
      icon: "👥",
    },
  ];

  return (
    <div className="bg-white">
      <PageHeader
        title={{ bengali: "প্রশাসন", english: "Administration" }}
        subtitle={{ bengali: "বিদ্যালয়ের প্রশাসনিক কার্যক্রম ও কর্মকর্তাগণ", english: "School administrative activities and officials" }}
        breadcrumbs={[
          { label: { bengali: "প্রশাসন", english: "Administration" } },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {language === "bn" ? "প্রশাসনিক কার্যক্রম" : "Administrative Structure"}
        </h2>
        <div className="w-16 h-1 bg-[#016B00] rounded mb-8" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {adminLinks.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className="group bg-white border border-gray-100 rounded-2xl p-6 hover:border-[#016B00] hover:shadow-md transition-all"
            >
              <span className="text-4xl mb-4 block">{link.icon}</span>
              <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#016B00] transition-colors">
                {language === "bn" ? link.title.bengali : link.title.english}
              </h3>
              <p className="text-gray-500 text-sm mb-4">
                {language === "bn" ? link.desc.bengali : link.desc.english}
              </p>
              <div className="flex items-center gap-1 text-[#016B00] text-sm font-medium">
                {language === "bn" ? "বিস্তারিত দেখুন" : "View Details"}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Overview */}
        <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
          <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Users size={20} className="text-[#016B00]" />
            {language === "bn" ? "প্রশাসন সম্পর্কে" : "About Administration"}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {language === "bn"
              ? "দুলারহাট মাধ্যমিক বিদ্যালয় একটি ম্যানেজিং কমিটির তত্ত্বাবধানে পরিচালিত হয়। প্রধান শিক্ষক বিদ্যালয়ের সার্বিক একাডেমিক ও প্রশাসনিক কার্যক্রম পরিচালনা করেন।"
              : "Dularhat Secondary School is managed under a Managing Committee. The Headmaster oversees all academic and administrative activities of the school."}
          </p>
        </div>
      </div>
    </div>
  );
}
