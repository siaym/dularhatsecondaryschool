"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { schoolData } from "@/data/school-data";

export function HeroSection() {
  const { t, language } = useLanguage();

  return (
    <section
      className="relative bg-gradient-to-br from-[#016B00] via-[#024D00] to-[#013500] text-white overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 border-2 border-white rounded-full" />
        <div className="absolute top-20 left-20 w-40 h-40 border border-white rounded-full" />
        <div className="absolute bottom-10 right-10 w-80 h-80 border-2 border-white rounded-full" />
        <div className="absolute bottom-20 right-20 w-48 h-48 border border-white rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm mb-6">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              <span>
                {language === "bn"
                  ? `প্রতিষ্ঠাকাল: ${schoolData.established}`
                  : `Est. ${schoolData.established_en}`}
              </span>
            </div>

            {/* School Name */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              {t(schoolData.name)}
            </h1>

            {/* Location */}
            <p className="text-green-200 text-lg mb-4">
              {language === "bn"
                ? "চরফ্যাশন, ভোলা, বাংলাদেশ"
                : "Charfashion, Bhola, Bangladesh"}
            </p>

            {/* Tagline */}
            <blockquote className="border-l-4 border-yellow-400 pl-4 mb-8">
              <p className="text-xl text-yellow-100 italic font-medium leading-relaxed">
                &ldquo;{t(schoolData.tagline)}&rdquo;
              </p>
            </blockquote>

            {/* Description */}
            <p className="text-green-100 text-base leading-relaxed mb-8 max-w-lg">
              {t(schoolData.description)}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-white text-[#016B00] px-6 py-3 rounded-lg font-semibold hover:bg-yellow-50 transition-colors shadow-md"
              >
                <BookOpen size={18} />
                {language === "bn" ? "বিদ্যালয় সম্পর্কে" : "About School"}
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/notices"
                className="inline-flex items-center gap-2 bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                {language === "bn" ? "সর্বশেষ নোটিশ" : "Latest Notices"}
              </Link>
            </div>

            {/* Quick Stats Row */}
            <div className="mt-10 flex flex-wrap gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300">১৯৬৩</div>
                <div className="text-xs text-green-300">
                  {language === "bn" ? "প্রতিষ্ঠাকাল" : "Established"}
                </div>
              </div>
              <div className="w-px bg-green-600 hidden sm:block" />
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300">৫</div>
                <div className="text-xs text-green-300">
                  {language === "bn" ? "শ্রেণি" : "Classes"}
                </div>
              </div>
              <div className="w-px bg-green-600 hidden sm:block" />
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300">৩</div>
                <div className="text-xs text-green-300">
                  {language === "bn" ? "বিভাগ" : "Disciplines"}
                </div>
              </div>
              <div className="w-px bg-green-600 hidden sm:block" />
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300">JSC & SSC</div>
                <div className="text-xs text-green-300">
                  {language === "bn" ? "পরীক্ষা কেন্দ্র" : "Exam Centre"}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Visual Card */}
          <div className="hidden lg:flex justify-center">
            <div className="relative">
              {/* Main card */}
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 w-80">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <GraduationCap size={48} className="text-[#016B00]" />
                </div>
                <h2 className="text-center font-bold text-xl mb-2">
                  {t(schoolData.name)}
                </h2>
                <p className="text-center text-green-200 text-sm mb-6">
                  {language === "bn" ? "চরফ্যাশন, ভোলা" : "Charfashion, Bhola"}
                </p>
                <div className="space-y-3">
                  {schoolData.academics.disciplines.map((d, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 bg-white/10 rounded-lg px-4 py-2.5"
                    >
                      <span className="text-xl">{d.icon}</span>
                      <div>
                        <div className="font-medium text-sm">{d.bengali}</div>
                        <div className="text-green-300 text-xs">{d.english}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-yellow-500 text-white rounded-full w-16 h-16 flex flex-col items-center justify-center text-center shadow-lg">
                <span className="text-xs font-bold leading-none">EIIN</span>
                <span className="text-xs leading-none mt-0.5">101297</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" />
        </svg>
      </div>
    </section>
  );
}
