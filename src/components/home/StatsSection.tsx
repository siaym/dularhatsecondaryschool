"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { schoolData } from "@/data/school-data";

export function StatsSection() {
  const { t } = useLanguage();

  return (
    <section className="py-12 bg-white border-y border-[#E6E9E7]" aria-label="School statistics">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#E6E9E7]">
          {schoolData.stats.map((stat, index) => (
            <div
              key={index}
              className="px-6 py-8 text-center"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl sm:text-3xl font-bold text-[#1C2522] mb-1">
                {t(stat.value)}
              </div>
              <div className="text-[#66706C] text-xs font-medium tracking-wide uppercase">
                {t(stat.label)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
