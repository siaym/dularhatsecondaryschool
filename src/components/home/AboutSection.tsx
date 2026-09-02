"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, School, Target } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { schoolData } from "@/data/school-data";

export function AboutSection() {
  const { t, language } = useLanguage();

  return (
    <section className="py-16 bg-[#F8F8F6]" aria-labelledby="about-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-[#016B00]/10 text-[#016B00] text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
            {language === "bn" ? "আমাদের সম্পর্কে" : "About Us"}
          </span>
          <h2 id="about-heading" className="text-2xl sm:text-3xl font-bold text-[#17201D] mb-3">
            {t(schoolData.name)}
          </h2>
          <div className="w-16 h-1 bg-[#016B00] mx-auto rounded" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-[#64716C] text-base leading-relaxed mb-6">
              {t(schoolData.description)}
            </p>
            <p className="text-[#64716C] text-base leading-relaxed mb-8">
              {t(schoolData.history)}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white border border-[#DDE5E1] rounded-xl p-4">
                <div className="text-[#016B00] font-bold text-lg">
                  {language === "bn" ? `১লা এপ্রিল, ${schoolData.established}` : `1st April, ${schoolData.established_en}`}
                </div>
                <div className="text-[#64716C] text-sm">
                  {language === "bn" ? "প্রতিষ্ঠার তারিখ" : "Date of Establishment"}
                </div>
              </div>
              <div className="bg-white border border-[#DDE5E1] rounded-xl p-4">
                <div className="text-[#12352F] font-bold text-lg">{schoolData.eiin}</div>
                <div className="text-[#64716C] text-sm">EIIN</div>
              </div>
              <div className="bg-white border border-[#DDE5E1] rounded-xl p-4">
                <div className="text-[#016B00] font-bold text-base">
                  {language === "bn" ? "বরিশাল বোর্ড" : "Barisal Board"}
                </div>
                <div className="text-[#64716C] text-sm">
                  {language === "bn" ? "শিক্ষা বোর্ড" : "Education Board"}
                </div>
              </div>
              <div className="bg-white border border-[#DDE5E1] rounded-xl p-4">
                <div className="text-[#016B00] font-bold text-base">
                  {language === "bn" ? "এমপিওভুক্ত" : "MPO Included"}
                </div>
                <div className="text-[#64716C] text-sm">
                  {language === "bn" ? "অনুমোদিত" : "Government Approved"}
                </div>
              </div>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-[#016B00] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#12352F] transition-colors"
            >
              {language === "bn" ? "আরও পড়ুন" : "Read More"}
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4 p-5 bg-white border border-[#DDE5E1] rounded-2xl hover:border-[#016B00]/40 hover:shadow-sm transition-all">
              <div className="w-12 h-12 bg-[#016B00] rounded-xl flex items-center justify-center flex-shrink-0">
                <School size={22} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-[#17201D] mb-1">
                  {language === "bn" ? "শিক্ষার মান" : "Quality Education"}
                </h3>
                <p className="text-[#64716C] text-sm leading-relaxed">
                  {language === "bn"
                    ? "শিক্ষার মান ও ফলাফলে জেলার অন্যতম শ্রেষ্ঠ বিদ্যাপীঠ হিসেবে স্বীকৃত।"
                    : "Recognized as one of the best schools in the district for academic quality and results."}
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 bg-white border border-[#DDE5E1] rounded-2xl hover:border-[#016B00]/40 hover:shadow-sm transition-all">
              <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <BookOpen size={22} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-[#17201D] mb-1">
                  {language === "bn" ? "তিনটি বিভাগ" : "Three Disciplines"}
                </h3>
                <p className="text-[#64716C] text-sm leading-relaxed">
                  {language === "bn"
                    ? "বিজ্ঞান, ব্যবসায় শিক্ষা ও মানবিক বিভাগে শিক্ষার সুযোগ।"
                    : "Science, Business Studies, and Humanities disciplines available."}
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 bg-white border border-[#DDE5E1] rounded-2xl hover:border-[#016B00]/40 hover:shadow-sm transition-all">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Target size={22} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-[#17201D] mb-1">
                  {language === "bn" ? "পরীক্ষা কেন্দ্র" : "Examination Centre"}
                </h3>
                <p className="text-[#64716C] text-sm leading-relaxed">
                  {language === "bn"
                    ? "চরফ্যাশন উপজেলার JSC ও SSC পরীক্ষার অনুমোদিত কেন্দ্র।"
                    : "An authorized JSC and SSC examination centre for Charfashion Upazila."}
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 bg-white border border-[#DDE5E1] rounded-2xl hover:border-[#016B00]/40 hover:shadow-sm transition-all">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🏛️</span>
              </div>
              <div>
                <h3 className="font-bold text-[#17201D] mb-1">
                  {language === "bn" ? "সমৃদ্ধ অবকাঠামো" : "Rich Infrastructure"}
                </h3>
                <p className="text-[#64716C] text-sm leading-relaxed">
                  {language === "bn"
                    ? "চারটি ভবন, একটি বড় গ্যালারি এবং বিশাল খেলার মাঠ।"
                    : "Four buildings, a large gallery hall, and a spacious playground."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
