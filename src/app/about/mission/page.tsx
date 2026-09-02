"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";
import { schoolData } from "@/data/school-data";

export default function MissionPage() {
  const { t, language } = useLanguage();
  return (
    <div>
      <PageHeader
        title={{ bengali: "লক্ষ্য ও উদ্দেশ্য", english: "Mission & Vision" }}
        subtitle={{ bengali: "আমাদের শিক্ষাগত দর্শন ও মূল্যবোধ", english: "Our educational philosophy and values" }}
        breadcrumbs={[
          { label: { bengali: "আমাদের সম্পর্কে", english: "About" }, href: "/about" },
          { label: { bengali: "লক্ষ্য ও উদ্দেশ্য", english: "Mission & Vision" } },
        ]}
      />

      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Mission */}
          <div className="border-l-4 border-[#006B2D] pl-6 py-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#006B2D] mb-2 block">Mission</span>
            <h2 className="text-2xl font-bold text-[#003D1A] mb-3">&ldquo;{t(schoolData.mission)}&rdquo;</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {language === "bn"
                ? "দুলারহাট মাধ্যমিক বিদ্যালয় প্রতিটি শিক্ষার্থীকে সামগ্রিকভাবে বিকশিত করতে প্রতিশ্রুতিবদ্ধ।"
                : "Dularhat Secondary School is committed to the holistic development of every student."}
            </p>
          </div>

          {/* Vision */}
          <div className="border-l-4 border-[#F5C400] pl-6 py-2">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 mb-2 block">Vision</span>
            <h2 className="text-2xl font-bold text-[#003D1A] mb-3">&ldquo;{t(schoolData.vision)}&rdquo;</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              {language === "bn"
                ? "আমরা স্বপ্ন দেখি এমন একটি বিদ্যালয়ের যেখানে প্রতিটি শিক্ষার্থী তাদের পূর্ণ সম্ভাবনায় পৌঁছাতে পারে।"
                : "We envision a school where every student can reach their full potential."}
            </p>
          </div>
        </div>
      </section>

      {/* Values — dark green */}
      <section className="bg-[#004D24] py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={language === "bn" ? "মূল্যবোধ" : "Core Values"}
            title={language === "bn" ? "আমাদের মূল্যবোধ" : "What We Stand For"}
            align="center"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { emoji: "🎯", bn: "মানসম্মত শিক্ষা", en: "Quality Education" },
              { emoji: "🤝", bn: "নৈতিক মূল্যবোধ", en: "Ethical Values" },
              { emoji: "💡", bn: "উদ্ভাবন", en: "Innovation" },
              { emoji: "🌍", bn: "সামাজিক দায়বদ্ধতা", en: "Social Responsibility" },
            ].map((v, i) => (
              <div key={i} className="bg-white/10 border border-white/15 rounded-2xl p-5 text-center hover:bg-white/15 transition-colors">
                <span className="text-4xl block mb-3">{v.emoji}</span>
                <p className="font-bold text-white text-sm">{language === "bn" ? v.bn : v.en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
