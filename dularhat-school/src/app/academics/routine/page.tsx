"use client";

import { Download } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { useLanguage } from "@/contexts/LanguageContext";

export default function RoutinePage() {
  const { language } = useLanguage();

  return (
    <div className="bg-white">
      <PageHeader
        title={{ bengali: "ক্লাস রুটিন", english: "Class Routine" }}
        subtitle={{ bengali: "বিদ্যালয়ের সাপ্তাহিক ক্লাস রুটিন", english: "Weekly class routine of the school" }}
        breadcrumbs={[
          { label: { bengali: "একাডেমিক", english: "Academics" }, href: "/academics" },
          { label: { bengali: "ক্লাস রুটিন", english: "Class Routine" } },
        ]}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {language === "bn" ? "ক্লাস রুটিন" : "Class Routine"}
        </h2>
        <div className="w-16 h-1 bg-[#016B00] rounded mb-6" />
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8">
          <p className="text-amber-700 text-sm leading-relaxed">
            <span className="font-bold">{language === "bn" ? "নোট: " : "Note: "}</span>
            {language === "bn"
              ? "ক্লাস রুটিন বিদ্যালয়ের প্রশাসনিক প্যানেল থেকে আপলোড করা হবে। সর্বশেষ রুটিনের জন্য বিদ্যালয়ে যোগাযোগ করুন।"
              : "Class routine will be uploaded from the school admin panel. Contact the school for the latest routine."}
          </p>
        </div>

        {/* Routine Table */}
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-[#016B00] text-white px-6 py-4 flex items-center justify-between">
            <h3 className="font-bold">
              {language === "bn" ? "সাপ্তাহিক ক্লাস রুটিন" : "Weekly Class Schedule"}
            </h3>
            <button className="flex items-center gap-2 text-sm bg-white/20 hover:bg-white/30 transition-colors px-3 py-1.5 rounded-lg">
              <Download size={14} />
              {language === "bn" ? "ডাউনলোড" : "Download"}
            </button>
          </div>
          <div className="p-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-3 text-gray-500 font-medium">
                    {language === "bn" ? "সময়" : "Time"}
                  </th>
                  {["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহ", "শুক্র"].map((day, i) => (
                    <th key={i} className="text-center py-3 px-2 text-gray-500 font-medium">
                      {language === "bn" ? day : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"][i]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {["৮:০০–৮:৪৫", "৮:৪৫–৯:৩০", "৯:৩০–১০:১৫", "বিরতি", "১০:৩০–১১:১৫", "১১:১৫–১২:০০"].map((time, i) => (
                  <tr key={i} className={`border-b border-gray-50 ${i % 2 === 0 ? "bg-gray-50/50" : ""}`}>
                    <td className="py-3 px-3 font-medium text-gray-700 whitespace-nowrap">{time}</td>
                    {[1, 2, 3, 4, 5, 6].map((j) => (
                      <td key={j} className="py-3 px-2 text-center text-gray-400">—</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-gray-400 mt-4 text-center">
              {language === "bn"
                ? "রুটিন বিদ্যালয় কর্তৃপক্ষ কর্তৃক আপডেট করা হবে।"
                : "Routine will be updated by school authority."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
