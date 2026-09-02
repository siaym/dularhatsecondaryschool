"use client";

import { Download } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { useLanguage } from "@/contexts/LanguageContext";

export default function RoutinePage() {
  const { language } = useLanguage();
  return (
    <div>
      <PageHero
        variant="green"
        eyebrow={{ bengali: "একাডেমিক", english: "Academic" }}
        title={{ bengali: "ক্লাস রুটিন", english: "Class Routine" }}
        description={{ bengali: "বিদ্যালয়ের সাপ্তাহিক ক্লাস রুটিন", english: "Weekly class routine of the school" }}
        breadcrumbs={[
          { label: { bengali: "একাডেমিক", english: "Academics" }, href: "/academics" },
          { label: { bengali: "ক্লাস রুটিন", english: "Class Routine" } },
        ]}
      />
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8 text-amber-700 text-sm">
            <span className="font-bold">{language === "bn" ? "নোট: " : "Note: "}</span>
            {language === "bn"
              ? "ক্লাস রুটিন প্রশাসনিক প্যানেল থেকে আপলোড করা হবে।"
              : "Class routine will be uploaded from the admin panel."}
          </div>
          <div className="bg-[#F5FAF6] border border-[#DDE8DD] rounded-2xl overflow-hidden">
            <div className="bg-[#006B2D] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold">{language === "bn" ? "সাপ্তাহিক রুটিন" : "Weekly Schedule"}</h3>
              <button className="flex items-center gap-2 text-xs bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-lg transition-colors">
                <Download size={13} /> {language === "bn" ? "ডাউনলোড" : "Download"}
              </button>
            </div>
            <div className="p-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#DDE8DD]">
                    <th className="text-left py-3 px-3 text-gray-500 font-semibold text-xs uppercase">{language === "bn" ? "সময়" : "Time"}</th>
                    {(language === "bn" ? ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহ", "শুক্র"] : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]).map((d, i) => (
                      <th key={i} className="text-center py-3 px-2 text-gray-500 font-semibold text-xs uppercase">{d}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(language === "bn"
                    ? ["৮:০০–৮:৪৫", "৮:৪৫–৯:৩০", "৯:৩০–১০:১৫", "— বিরতি —", "১০:৩০–১১:১৫", "১১:১৫–১২:০০"]
                    : ["8:00–8:45", "8:45–9:30", "9:30–10:15", "— Break —", "10:30–11:15", "11:15–12:00"]
                  ).map((time, i) => (
                    <tr key={i} className={`border-b border-[#DDE8DD]/60 ${i % 2 === 0 ? "bg-white" : "bg-[#F5FAF6]/50"} ${time.includes("বিরতি") || time.includes("Break") ? "bg-amber-50/50" : ""}`}>
                      <td className="py-3 px-3 font-medium text-[#003D1A] text-xs whitespace-nowrap">{time}</td>
                      {[1,2,3,4,5,6].map(j => (
                        <td key={j} className="py-3 px-2 text-center text-gray-300 text-xs">—</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-gray-400 mt-4 text-center">{language === "bn" ? "রুটিন কর্তৃপক্ষ কর্তৃক আপডেট করা হবে।" : "Routine will be updated by authority."}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
