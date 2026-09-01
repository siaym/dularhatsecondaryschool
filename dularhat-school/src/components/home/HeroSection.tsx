"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { schoolData } from "@/data/school-data";

export function HeroSection() {
  const { t, language } = useLanguage();

  return (
    <section
      className="relative bg-white overflow-hidden min-h-[580px] sm:min-h-[620px] lg:min-h-[680px] flex items-stretch"
      aria-label="Hero section"
    >
      {/* ─── Background Layer: Real School Campus Photo (Clean & Unobstructed) ─── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 lg:left-[35%] w-full h-full">
          <Image
            src={schoolData.hero_image}
            alt="Dularhat Secondary School Campus, Academic Building & Playground"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          {/* Subtle natural lighting overlay for mobile readability */}
          <div className="absolute inset-0 bg-black/10 lg:bg-transparent" />
        </div>
      </div>

      {/* ─── Smooth Organic Green Fluid Wave (NO Yellow Diagonal Stripe) ─── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center">
        
        {/* Desktop Organic Wave Mask — Clean green curve without any diagonal line */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block overflow-hidden">
          <svg
            className="absolute top-0 bottom-0 left-0 h-full w-[64%] drop-shadow-xl"
            viewBox="0 0 800 680"
            fill="none"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="heroCleanGreenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#76C043" />
                <stop offset="40%" stopColor="#3EA635" />
                <stop offset="100%" stopColor="#016B00" />
              </linearGradient>
            </defs>
            {/* Smooth fluid curve separating left green from right photo */}
            <path
              d="M0,0 L720,0 C620,150 480,210 500,340 C520,480 710,560 640,680 L0,680 Z"
              fill="url(#heroCleanGreenGradient)"
            />
          </svg>
        </div>

        {/* Mobile / Tablet Gradient Backdrop */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#016B00]/95 via-[#016B00]/90 to-[#014D00]/95 lg:hidden" />

        {/* ─── Hero Content Area ─── */}
        <div className="relative z-20 w-full lg:max-w-2xl px-6 sm:px-10 lg:px-12 py-14 sm:py-18 lg:py-22 text-white">
          
          {/* Top Eyebrow Badge */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-md border border-white/20 rounded-full px-3.5 py-1 text-xs text-white">
              <span className="w-2 h-2 bg-[#F9B828] rounded-full animate-pulse" />
              <span className="font-bold">
                {language === "bn"
                  ? `প্রতিষ্ঠাকাল: ${schoolData.established}`
                  : `Est. ${schoolData.established_en}`}
              </span>
              <span className="text-white/50">|</span>
              <span className="font-mono text-emerald-100">EIIN: {schoolData.eiin}</span>
            </div>
            
            <span className="text-xs font-semibold text-emerald-100/90 hidden sm:inline-block">
              {language === "bn" ? "• বরিশাল শিক্ষা বোর্ড" : "• Barisal Board"}
            </span>
          </div>

          {/* School Name Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.1] mb-2 text-white font-sans drop-shadow-md">
            {language === "bn" ? (
              <>
                <span className="block text-2xl sm:text-4xl lg:text-5xl">দুলারহাট</span>
                <span className="block text-3xl sm:text-5xl lg:text-6xl">মাধ্যমিক বিদ্যালয়</span>
              </>
            ) : (
              <>
                <span className="block">DULARHAT</span>
                <span className="block text-2xl sm:text-4xl lg:text-5xl">SECONDARY SCHOOL</span>
              </>
            )}
          </h1>

          {/* Location */}
          <p className="text-emerald-100 text-sm sm:text-base font-semibold mb-4">
            {language === "bn"
              ? "চরফ্যাশন, ভোলা, বাংলাদেশ"
              : "Charfashion, Bhola, Bangladesh"}
          </p>

          {/* Tagline Box */}
          <blockquote className="border-l-4 border-[#F9B828] pl-3.5 py-1 mb-5 bg-black/10 backdrop-blur-xs rounded-r-lg">
            <p className="text-base sm:text-lg lg:text-xl text-yellow-100 italic font-medium leading-snug font-serif">
              &ldquo;{t(schoolData.tagline)}&rdquo;
            </p>
          </blockquote>

          {/* Concise Description */}
          <p className="text-white/90 text-xs sm:text-sm leading-relaxed mb-8 max-w-xl font-light">
            {t(schoolData.description)}
          </p>

          {/* Pill CTA Buttons with ▶ Play Arrow */}
          <div className="flex flex-wrap items-center gap-3.5 mb-8">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-[#014D00] hover:bg-[#023800] text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-7 py-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all border border-white/20 group"
            >
              <span>{language === "bn" ? "বিদ্যালয় সম্পর্কে" : "ABOUT SCHOOL"}</span>
              <span className="text-[#F9B828] text-xs transition-transform group-hover:translate-x-1">▶</span>
            </Link>

            <Link
              href="/notices"
              className="inline-flex items-center gap-2 bg-[#76C043]/30 hover:bg-[#76C043]/50 text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-7 py-3.5 rounded-full border border-white/40 backdrop-blur-sm shadow-md transition-all group"
            >
              <span>{language === "bn" ? "সর্বশেষ নোটিশ" : "LATEST NOTICES"}</span>
              <span className="text-[#F9B828] text-xs transition-transform group-hover:translate-x-1">▶</span>
            </Link>
          </div>

          {/* Quick Stats Ribbon */}
          <div className="pt-4 border-t border-white/20 flex flex-wrap items-center gap-6 sm:gap-8">
            <div>
              <div className="text-xl sm:text-2xl font-black text-[#F9B828] leading-tight font-serif">
                ১৯৬৩
              </div>
              <div className="text-[11px] text-emerald-100 uppercase tracking-wider font-medium">
                {language === "bn" ? "প্রতিষ্ঠাকাল" : "Established"}
              </div>
            </div>

            <div className="w-px h-7 bg-white/20 hidden sm:block" />

            <div>
              <div className="text-xl sm:text-2xl font-black text-[#F9B828] leading-tight font-serif">
                ৫টি
              </div>
              <div className="text-[11px] text-emerald-100 uppercase tracking-wider font-medium">
                {language === "bn" ? "শ্রেণি (৬ষ্ঠ-১০ম)" : "Classes (6-10)"}
              </div>
            </div>

            <div className="w-px h-7 bg-white/20 hidden sm:block" />

            <div>
              <div className="text-xl sm:text-2xl font-black text-[#F9B828] leading-tight font-serif">
                ৩টি
              </div>
              <div className="text-[11px] text-emerald-100 uppercase tracking-wider font-medium">
                {language === "bn" ? "বিভাগ" : "Disciplines"}
              </div>
            </div>

            <div className="w-px h-7 bg-white/20 hidden sm:block" />

            <div>
              <div className="text-base sm:text-lg font-black text-[#F9B828] leading-tight">
                JSC & SSC
              </div>
              <div className="text-[11px] text-emerald-100 uppercase tracking-wider font-medium">
                {language === "bn" ? "পরীক্ষা কেন্দ্র" : "Exam Centre"}
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ─── Floating WhatsApp / Phone Enquiry Widget on Bottom Right ─── */}
      <div className="absolute bottom-6 right-6 z-30 hidden sm:flex flex-col items-end gap-1">
        <a
          href={`tel:${schoolData.contact.mobile_1}`}
          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider px-5 py-2.5 rounded-full shadow-2xl transition-transform hover:scale-105"
          aria-label="Call school directly"
        >
          <Phone size={15} className="fill-white" />
          <span>{language === "bn" ? "যোগাযোগ: ০১৭২৭৩৭৯১২০" : "CALL: 01727379120"}</span>
        </a>
        <span className="text-[10px] text-white/90 drop-shadow-md pr-1 font-mono">
          EIIN: 101297 • Barisal Education Board
        </span>
      </div>

    </section>
  );
}
