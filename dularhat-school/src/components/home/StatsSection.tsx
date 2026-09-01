"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { schoolData } from "@/data/school-data";

export function StatsSection() {
  const { t, language } = useLanguage();

  return (
    <section className="py-12 bg-gray-50" aria-label="School statistics">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {schoolData.stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-xl sm:text-2xl font-bold text-[#016B00] mb-1">
                {t(stat.value)}
              </div>
              <div className="text-gray-500 text-sm font-medium">
                {t(stat.label)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
