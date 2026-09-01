"use client";

import Link from "next/link";
import { BookOpen, FileText, UserCheck, Image, Phone, GraduationCap, Trophy, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const quickLinks = [
  {
    label: { bengali: "ক্লাস রুটিন", english: "Class Routine" },
    href: "/academics/routine",
    icon: Calendar,
    color: "bg-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    label: { bengali: "পরীক্ষার ফলাফল", english: "Exam Results" },
    href: "/results",
    icon: Trophy,
    color: "bg-yellow-500",
    bgColor: "bg-yellow-50",
  },
  {
    label: { bengali: "ভর্তি তথ্য", english: "Admission" },
    href: "/admission",
    icon: UserCheck,
    color: "bg-green-600",
    bgColor: "bg-green-50",
  },
  {
    label: { bengali: "নোটিশ", english: "Notices" },
    href: "/notices",
    icon: FileText,
    color: "bg-red-500",
    bgColor: "bg-red-50",
  },
  {
    label: { bengali: "শিক্ষকবৃন্দ", english: "Teachers" },
    href: "/teachers",
    icon: GraduationCap,
    color: "bg-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    label: { bengali: "গ্যালারি", english: "Gallery" },
    href: "/gallery",
    icon: Image,
    color: "bg-pink-500",
    bgColor: "bg-pink-50",
  },
  {
    label: { bengali: "একাডেমিক", english: "Academics" },
    href: "/academics",
    icon: BookOpen,
    color: "bg-indigo-500",
    bgColor: "bg-indigo-50",
  },
  {
    label: { bengali: "যোগাযোগ", english: "Contact" },
    href: "/contact",
    icon: Phone,
    color: "bg-teal-500",
    bgColor: "bg-teal-50",
  },
];

export function QuickLinksSection() {
  const { t, language } = useLanguage();

  return (
    <section className="py-16 bg-gray-50" aria-labelledby="quicklinks-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 id="quicklinks-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            {language === "bn" ? "দ্রুত অ্যাক্সেস" : "Quick Access"}
          </h2>
          <p className="text-gray-500 text-sm">
            {language === "bn"
              ? "গুরুত্বপূর্ণ তথ্য ও পরিষেবাসমূহ"
              : "Important information and services"}
          </p>
          <div className="w-16 h-1 bg-[#016B00] mx-auto rounded mt-3" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${link.bgColor} rounded-2xl p-5 flex flex-col items-center text-center hover:scale-105 hover:shadow-md transition-all group`}
              >
                <div className={`w-12 h-12 ${link.color} rounded-xl flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform`}>
                  <Icon size={22} className="text-white" aria-hidden="true" />
                </div>
                <span className="font-semibold text-gray-800 text-sm leading-tight">
                  {t(link.label)}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
