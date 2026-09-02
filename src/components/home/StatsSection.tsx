"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { schoolData } from "@/data/school-data";

export function StatsSection() {
  const { t } = useLanguage();

  return (
    <section className="py-12 bg-[#12352F]" aria-label="School statistics">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
          {schoolData.stats.map((stat, index) => (
            <div
              key={index}
              className="bg-[#12352F] px-6 py-8 text-center hover:bg-[#0F2A24] transition-colors"
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-xl sm:text-2xl font-bold text-white mb-1">
                {t(stat.value)}
              </div>
              <div className="text-green-300 text-sm font-medium">
                {t(stat.label)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
