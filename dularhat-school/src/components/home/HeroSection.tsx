"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageSquareText, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { schoolData } from "@/data/school-data";

export function HeroSection() {
  const { t, language } = useLanguage();

  return (
    <section
      className="relative bg-white overflow-hidden min-h-[620px] lg:min-h-[720px] flex items-stretch"
      aria-label="Hero section"
    >
      {/* ─── Background Layer: Real School Aerial Photograph on Right ─── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 lg:left-[38%]">
          <Image
            src={schoolData.hero_image}
            alt="Dularhat Secondary School Campus & Grounds"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
          {/* Subtle natural lighting overlay on image */}
          <div className="absolute inset-0 bg-black/15 lg:bg-transparent" />
        </div>
      </div>

      {/* ─── Organic Green Fluid Wave & Diagonal Gold Slash (SVG Vector) ─── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center">
        
        {/* Desktop Dynamic Vector Shapes */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block overflow-hidden">
          {/* Multi-shade Vibrant Green Fluid Shape */}
          <svg
            className="absolute top-0 bottom-0 left-0 h-full w-[68%] drop-shadow-2xl"
            viewBox="0 0 850 720"
            fill="none"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="heroGreenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#76C043" />
                <stop offset="35%" stopColor="#3EA635" />
                <stop offset="100%" stopColor="#016B00" />
              </linearGradient>
            </defs>
            {/* Smooth organic wave matching Assumption design */}
            <path
              d="M0,0 L750,0 C640,160 500,220 520,360 C540,500 740,580 670,720 L0,720 Z"
              fill="url(#heroGreenGradient)"
            />
          </svg>

          {/* Diagonal Gold/Yellow Accent Slash Band */}
          <svg
            className="absolute top-0 bottom-0 left-[38%] h-full w-[38%] pointer-events-none"
            viewBox="0 0 450 720"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M210,0 L275,0 L135,720 L70,720 Z"
              fill="#F9B828"
              opacity="0.95"
            />
          </svg>
        </div>

        {/* Mobile / Tablet Gradient Backdrop */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#016B00]/95 via-[#016B00]/90 to-[#014D00]/95 lg:hidden" />

        {/* ─── Hero Content Area (All Previous Verified Info) ─── */}
        <div className="relative z-20 w-full lg:max-w-2xl px-6 sm:px-10 lg:px-12 py-14 sm:py-18 lg:py-20 text-white">
          
          {/* Eyebrow: Welcome + Establishment + EIIN */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
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
            
            <div className="text-xs font-bold uppercase tracking-wider text-yellow-200 hidden sm:inline-block">
              {language === "bn" ? "• বরিশাল শিক্ষা বোর্ড" : "• Barisal Board"}
            </div>
          </div>

          {/* School Name Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-[1.12] mb-2 text-white font-sans drop-shadow-md">
            {t(schoolData.name)}
          </h1>

          {/* Location */}
          <p className="text-emerald-100 text-sm sm:text-base font-semibold mb-4">
            {language === "bn"
              ? "চরফ্যাশন, ভোলা, বাংলাদেশ"
              : "Charfashion, Bhola, Bangladesh"}
          </p>

          {/* Tagline */}
          <blockquote className="border-l-4 border-[#F9B828] pl-3.5 py-1 mb-5 bg-black/10 backdrop-blur-xs rounded-r-lg">
            <p className="text-base sm:text-lg lg:text-xl text-yellow-100 italic font-medium leading-relaxed font-serif">
              &ldquo;{t(schoolData.tagline)}&rdquo;
            </p>
          </blockquote>

          {/* Full Description */}
          <p className="text-white/90 text-xs sm:text-sm leading-relaxed mb-7 max-w-xl font-light">
            {t(schoolData.description)}
          </p>

          {/* Pill CTA Buttons with ▶ Play Arrow */}
          <div className="flex flex-wrap items-center gap-3.5 mb-8">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-[#014D00] hover:bg-[#023800] text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all border border-white/25 group"
            >
              <span>{language === "bn" ? "বিদ্যালয় সম্পর্কে" : "ABOUT SCHOOL"}</span>
              <span className="text-[#F9B828] text-xs transition-transform group-hover:translate-x-1">▶</span>
            </Link>

            <Link
              href="/notices"
              className="inline-flex items-center gap-2 bg-[#76C043]/30 hover:bg-[#76C043]/50 text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-6 py-3 rounded-full border border-white/40 backdrop-blur-sm shadow-md transition-all group"
            >
              <span>{language === "bn" ? "সর্বশেষ নোটিশ" : "LATEST NOTICES"}</span>
              <span className="text-[#F9B828] text-xs transition-transform group-hover:translate-x-1">▶</span>
            </Link>
          </div>

          {/* Quick Stats Ribbon (All Previous Stats) */}
          <div className="pt-5 border-t border-white/20 flex flex-wrap items-center gap-6 sm:gap-8">
            <div>
              <div className="text-xl sm:text-2xl font-black text-[#F9B828] leading-tight font-serif">
                ১৯৬৩
              </div>
              <div className="text-[11px] text-emerald-100 uppercase tracking-wider font-medium">
                {language === "bn" ? "প্রতিষ্ঠাকাল" : "Established"}
              </div>
            </div>

            <div className="w-px h-8 bg-white/20 hidden sm:block" />

            <div>
              <div className="text-xl sm:text-2xl font-black text-[#F9B828] leading-tight font-serif">
                ৫টি
              </div>
              <div className="text-[11px] text-emerald-100 uppercase tracking-wider font-medium">
                {language === "bn" ? "শ্রেণি (৬ষ্ঠ-১০ম)" : "Classes (6-10)"}
              </div>
            </div>

            <div className="w-px h-8 bg-white/20 hidden sm:block" />

            <div>
              <div className="text-xl sm:text-2xl font-black text-[#F9B828] leading-tight font-serif">
                ৩টি
              </div>
              <div className="text-[11px] text-emerald-100 uppercase tracking-wider font-medium">
                {language === "bn" ? "বিভাগ" : "Disciplines"}
              </div>
            </div>

            <div className="w-px h-8 bg-white/20 hidden sm:block" />

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
