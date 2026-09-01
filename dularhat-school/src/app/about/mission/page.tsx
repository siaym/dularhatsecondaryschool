"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { PageSidebar } from "@/components/ui/PageSidebar";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MissionPage() {
  const { language } = useLanguage();

  const sectionLinks = [
    { label: language === "bn" ? "বিদ্যালয় পরিচিতি" : "School Overview", href: "/about" },
    { label: language === "bn" ? "ইতিহাস" : "History", href: "/about/history" },
    { label: language === "bn" ? "লক্ষ্য ও উদ্দেশ্য" : "Mission & Vision", href: "/about/mission", active: true },
  ];

  const values = [
    { icon: "🎯", bn: "মানসম্মত শিক্ষা", en: "Quality Education", desc_bn: "প্রতিটি শিক্ষার্থীকে উচ্চমানের শিক্ষা প্রদান।", desc_en: "Providing quality education to every student." },
    { icon: "🤝", bn: "নৈতিক মূল্যবোধ", en: "Ethical Values", desc_bn: "নৈতিক ও মানবিক মূল্যবোধ সম্পন্ন মানুষ গড়া।", desc_en: "Building individuals with ethical and human values." },
    { icon: "💡", bn: "উদ্ভাবন", en: "Innovation", desc_bn: "আধুনিক শিক্ষা পদ্ধতি ও প্রযুক্তির সমন্বয়।", desc_en: "Integration of modern teaching methods and technology." },
    { icon: "🌍", bn: "সামাজিক দায়বদ্ধতা", en: "Social Responsibility", desc_bn: "সমাজ ও দেশের উন্নয়নে অবদানশীল নাগরিক তৈরি।", desc_en: "Creating citizens who contribute to society and national development." },
  ];

  return (
    <div className="bg-white">
      <PageHeader
        title={{ bengali: "লক্ষ্য ও উদ্দেশ্য", english: "Mission & Vision" }}
        subtitle={{ bengali: "আমাদের শিক্ষাগত দর্শন ও মূল্যবোধ", english: "Our educational philosophy and values" }}
        breadcrumbs={[
          { label: { bengali: "আমাদের সম্পর্কে", english: "About" }, href: "/about" },
          { label: { bengali: "লক্ষ্য ও উদ্দেশ্য", english: "Mission & Vision" } },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            {/* Mission */}
            <div className="bg-[#016B00]/5 border-l-4 border-[#016B00] rounded-r-2xl p-8">
              <h2 className="text-2xl font-bold text-[#016B00] mb-4 flex items-center gap-2">
                🎯 {language === "bn" ? "আমাদের লক্ষ্য (Mission)" : "Our Mission"}
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed font-medium italic">
                &ldquo;{language === "bn"
                  ? "দক্ষ মানবসম্পদ গড়ে তুলতে আমরা অঙ্গীকারাবদ্ধ"
                  : "We are committed to developing skilled human resources"}&rdquo;
              </p>
              <div className="mt-4 text-gray-600 text-sm leading-relaxed">
                {language === "bn"
                  ? "দুলারহাট মাধ্যমিক বিদ্যালয় প্রতিটি শিক্ষার্থীকে সামগ্রিকভাবে বিকশিত করতে প্রতিশ্রুতিবদ্ধ — জ্ঞান, দক্ষতা ও মূল্যবোধের সমন্বয়ে।"
                  : "Dularhat Secondary School is committed to the holistic development of every student — combining knowledge, skills, and values."}
              </div>
            </div>

            {/* Vision */}
            <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-2xl p-8">
              <h2 className="text-2xl font-bold text-yellow-700 mb-4 flex items-center gap-2">
                🔭 {language === "bn" ? "আমাদের দর্শন (Vision)" : "Our Vision"}
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed font-medium italic">
                &ldquo;{language === "bn"
                  ? "একটি আধুনিক, মানসম্মত এবং অগ্রগামী শিক্ষা প্রতিষ্ঠান হিসেবে গড়ে উঠে জাতীয় উন্নয়নে অবদান রাখা"
                  : "To grow as a modern, quality, and progressive educational institution contributing to national development"}&rdquo;
              </p>
              <div className="mt-4 text-gray-600 text-sm leading-relaxed">
                {language === "bn"
                  ? "আমরা স্বপ্ন দেখি এমন একটি বিদ্যালয়ের যেখানে প্রতিটি শিক্ষার্থী তাদের পূর্ণ সম্ভাবনায় পৌঁছাতে পারে।"
                  : "We envision a school where every student can reach their full potential."}
              </div>
            </div>

            {/* Values */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {language === "bn" ? "আমাদের মূল্যবোধ" : "Our Core Values"}
              </h2>
              <div className="w-16 h-1 bg-[#016B00] rounded mb-6" />
              <div className="grid sm:grid-cols-2 gap-5">
                {values.map((v, i) => (
                  <div key={i} className="flex gap-4 p-5 bg-gray-50 rounded-2xl hover:bg-green-50 transition-colors">
                    <span className="text-3xl">{v.icon}</span>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">
                        {language === "bn" ? v.bn : v.en}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {language === "bn" ? v.desc_bn : v.desc_en}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div>
            <PageSidebar
              sectionLinks={sectionLinks}
              quickLinks={[
                { label: language === "bn" ? "প্রধান শিক্ষক" : "Headmaster", href: "/administration/headmaster" },
                { label: language === "bn" ? "শিক্ষকবৃন্দ" : "Teachers", href: "/teachers" },
                { label: language === "bn" ? "ভর্তি" : "Admission", href: "/admission" },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
