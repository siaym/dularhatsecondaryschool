"use client";

import { Download, FileText } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { DocumentItem } from "@/types";

export default function RoutineClient({ routines }: { routines: DocumentItem[] }) {
  const { language } = useLanguage();

  return (
    <div>
      <PageHeader
        title={{ bengali: "ক্লাস রুটিন", english: "Class Routine" }}
        subtitle={{ bengali: "বিদ্যালয়ের সাপ্তাহিক ক্লাস রুটিন", english: "Weekly class routine of the school" }}
        breadcrumbs={[
          { label: { bengali: "একাডেমিক", english: "Academics" }, href: "/academics" },
          { label: { bengali: "ক্লাস রুটিন", english: "Class Routine" } },
        ]}
      />
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <h2 className="text-xl font-bold text-[#003D1A] mb-6">
            {language === "bn" ? "ডাউনলোডযোগ্য রুটিনসমূহ" : "Downloadable Routines"}
          </h2>

          {!routines || routines.length === 0 ? (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8 text-amber-700 text-sm">
              <span className="font-bold">{language === "bn" ? "নোট: " : "Note: "}</span>
              {language === "bn"
                ? "এখনো কোনো ক্লাস রুটিন আপলোড করা হয়নি।"
                : "No class routine has been uploaded yet."}
            </div>
          ) : (
            <div className="space-y-4">
              {routines.map((routine) => (
                <div key={routine.id} className="bg-[#F5FAF6] border border-[#DDE8DD] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#006B2D]/40 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 border border-[#DDE8DD] text-[#006B2D]">
                      <FileText size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#003D1A] text-lg">
                        {language === "bn" ? routine.title_bn : (routine.title_en || routine.title_bn)}
                      </h3>
                      {(routine.description_bn || routine.description_en) && (
                        <p className="text-gray-500 text-sm mt-1">
                          {language === "bn" ? routine.description_bn : (routine.description_en || routine.description_bn)}
                        </p>
                      )}
                      <p className="text-gray-400 text-xs mt-2">
                        {language === "bn" ? "আপলোডের তারিখ: " : "Uploaded on: "}
                        {new Date(routine.created_at).toLocaleDateString(language === "bn" ? "bn-BD" : "en-GB")}
                      </p>
                    </div>
                  </div>
                  <a
                    href={routine.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 flex items-center justify-center gap-2 bg-[#006B2D] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[#004D24] transition-colors text-sm"
                  >
                    <Download size={18} />
                    {language === "bn" ? "ডাউনলোড" : "Download"}
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
