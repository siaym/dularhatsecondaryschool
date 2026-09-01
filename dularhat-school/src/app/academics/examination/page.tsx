"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { PageSidebar } from "@/components/ui/PageSidebar";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ExaminationPage() {
  const { language } = useLanguage();

  return (
    <div className="bg-white">
      <PageHeader
        title={{ bengali: "পরীক্ষা তথ্য", english: "Examination Information" }}
        subtitle={{ bengali: "পরীক্ষার সময়সূচি, নিয়মাবলী ও কেন্দ্র সম্পর্কিত তথ্য", english: "Exam schedule, regulations, and centre information" }}
        breadcrumbs={[
          { label: { bengali: "একাডেমিক", english: "Academics" }, href: "/academics" },
          { label: { bengali: "পরীক্ষা", english: "Examination" } },
        ]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {language === "bn" ? "পরীক্ষার তথ্য" : "Examination Information"}
              </h2>
              <div className="w-16 h-1 bg-[#016B00] rounded mb-6" />

              <div className="grid sm:grid-cols-2 gap-5 mb-6">
                {[
                  { icon: "📝", title_bn: "জেএসসি পরীক্ষা", title_en: "JSC Examination", desc_bn: "৮ম শ্রেণির শিক্ষার্থীদের জন্য বরিশাল বোর্ড পরীক্ষা।", desc_en: "Barisal Board examination for Class 8 students." },
                  { icon: "🎓", title_bn: "এসএসসি পরীক্ষা", title_en: "SSC Examination", desc_bn: "১০ম শ্রেণির শিক্ষার্থীদের জন্য বরিশাল বোর্ড পরীক্ষা।", desc_en: "Barisal Board examination for Class 10 students." },
                  { icon: "📋", title_bn: "অর্ধবার্ষিক পরীক্ষা", title_en: "Half-Yearly Exam", desc_bn: "বিদ্যালয় কর্তৃক পরিচালিত আভ্যন্তরীণ পরীক্ষা।", desc_en: "Internal examination conducted by the school." },
                  { icon: "📊", title_bn: "বার্ষিক পরীক্ষা", title_en: "Annual Examination", desc_bn: "বিদ্যালয় কর্তৃক পরিচালিত বার্ষিক মূল্যায়ন।", desc_en: "Annual assessment conducted by the school." },
                ].map((item, i) => (
                  <div key={i} className="p-5 bg-gray-50 rounded-2xl hover:bg-green-50 transition-colors border border-gray-100">
                    <span className="text-3xl mb-3 block">{item.icon}</span>
                    <h3 className="font-bold text-gray-900 mb-1">{language === "bn" ? item.title_bn : item.title_en}</h3>
                    <p className="text-gray-500 text-sm">{language === "bn" ? item.desc_bn : item.desc_en}</p>
                  </div>
                ))}
              </div>

              <div className="bg-[#016B00]/5 border border-[#016B00]/20 rounded-2xl p-6">
                <h3 className="font-bold text-[#016B00] mb-2">
                  {language === "bn" ? "পরীক্ষার সময়সূচি" : "Exam Schedule"}
                </h3>
                <p className="text-gray-500 text-sm">
                  {language === "bn"
                    ? "পরীক্ষার সময়সূচি নোটিশ বোর্ডে প্রকাশিত হবে এবং অ্যাডমিন প্যানেল থেকে আপলোড করা হবে।"
                    : "Exam schedules will be published on the notice board and uploaded via admin panel."}
                </p>
              </div>
            </section>
          </div>
          <div>
            <PageSidebar
              sectionLinks={[
                { label: language === "bn" ? "একাডেমিক" : "Academics", href: "/academics" },
                { label: language === "bn" ? "ক্লাস রুটিন" : "Class Routine", href: "/academics/routine" },
                { label: language === "bn" ? "পরীক্ষা" : "Examination", href: "/academics/examination", active: true },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
