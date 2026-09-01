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
      className="relative bg-white overflow-hidden min-h-[580px] lg:min-h-[660px] flex items-stretch"
      aria-label="Hero section"
    >
      {/* ─── Background Layer: Full Right Image & Overlays ─── */}
      <div className="absolute inset-0 z-0">
        {/* Real School Campus Aerial/Wide Photograph */}
        <div className="absolute inset-0 lg:left-1/3">
          <Image
            src={schoolData.hero_image}
            alt="Dularhat Secondary School Campus & Grounds"
            fill
            className="object-cover object-center scale-105"
            priority
            sizes="100vw"
          />
          {/* Subtle natural lighting overlay */}
          <div className="absolute inset-0 bg-black/15 lg:bg-transparent" />
        </div>
      </div>

      {/* ─── Organic Green Curved Shape + Gold Diagonal Slash ─── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center">
        
        {/* SVG/CSS Mask for Desktop Organic Wave & Diagonal Slash */}
        <div className="absolute inset-0 pointer-events-none hidden lg:block overflow-hidden">
          {/* Main Vibrant Green Fluid Shape */}
          <svg
            className="absolute top-0 bottom-0 left-0 h-full w-[64%] drop-shadow-2xl"
            viewBox="0 0 800 660"
            fill="none"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="heroGreenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6DBB30" />
                <stop offset="45%" stopColor="#3EA635" />
                <stop offset="100%" stopColor="#016B00" />
              </linearGradient>
            </defs>
            {/* Smooth organic wave matching Assumption design */}
            <path
              d="M0,0 L700,0 C600,140 460,200 480,320 C500,440 680,520 620,660 L0,660 Z"
              fill="url(#heroGreenGradient)"
            />
          </svg>

          {/* Diagonal Gold/Yellow Accent Band */}
          <svg
            className="absolute top-0 bottom-0 left-[35%] h-full w-[35%] pointer-events-none"
            viewBox="0 0 400 660"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M180,0 L240,0 L120,660 L60,660 Z"
              fill="#F9B828"
              opacity="0.95"
            />
          </svg>
        </div>

        {/* Mobile / Tablet Green Backdrop */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#016B00]/95 via-[#016B00]/85 to-[#014D00]/95 lg:hidden" />

        {/* ─── Hero Content Area ─── */}
        <div className="relative z-20 w-full lg:max-w-2xl px-6 sm:px-10 lg:px-12 py-16 sm:py-20 lg:py-24 text-white">
          
          {/* Eyebrow */}
          <div className="text-sm sm:text-base font-extrabold uppercase tracking-widest text-white/95 mb-2 font-sans">
            {language === "bn" ? "স্বাগত" : "WELCOME TO"}
          </div>

          {/* Main Huge Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.08] mb-4 text-white font-sans drop-shadow-md">
            {language === "bn" ? (
              <>
                <span className="block text-2xl sm:text-4xl lg:text-5xl">দুলারহাট</span>
                <span className="block text-3xl sm:text-5xl lg:text-6xl text-white">মাধ্যমিক বিদ্যালয়</span>
              </>
            ) : (
              <>
                <span className="block">DULARHAT</span>
                <span className="block text-2xl sm:text-4xl lg:text-5xl">SECONDARY SCHOOL</span>
              </>
            )}
          </h1>

          {/* Tagline / Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl text-yellow-100/95 font-medium leading-snug mb-8 max-w-xl font-serif">
            {t(schoolData.tagline)}!
          </p>

          {/* CTA Buttons (Pill shaped with Play ▶ Icon) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 max-w-md">
            
            {/* Button 1: Solid Green Pill */}
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 bg-[#014D00] hover:bg-[#023800] text-white text-sm sm:text-base font-black uppercase tracking-wider px-8 py-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white/20 group"
            >
              <span>{language === "bn" ? "বিস্তারিত জানুন" : "DISCOVER MORE"}</span>
              <span className="text-[#F9B828] text-xs transition-transform group-hover:translate-x-1">▶</span>
            </Link>

            {/* Button 2: Semi-Transparent Bordered Green Pill */}
            <Link
              href="/admission"
              className="inline-flex items-center justify-center gap-2 bg-[#76C043]/30 hover:bg-[#76C043]/50 text-white text-sm sm:text-base font-black uppercase tracking-wider px-8 py-3.5 rounded-full border-2 border-white/40 backdrop-blur-sm shadow-md transition-all duration-300 group"
            >
              <span>{language === "bn" ? "ভর্তি নির্দেশিকা" : "BOOK A TOUR"}</span>
              <span className="text-[#F9B828] text-xs transition-transform group-hover:translate-x-1">▶</span>
            </Link>

          </div>

          {/* Quick Info Bar */}
          <div className="mt-8 pt-6 border-t border-white/20 flex flex-wrap items-center gap-4 text-xs font-semibold text-emerald-100">
            <span>📍 {language === "bn" ? "চরফ্যাশন, ভোলা" : "Charfashion, Bhola"}</span>
            <span>•</span>
            <span>🏛️ {language === "bn" ? "স্থাপিত: ১৯৬৩" : "Est. 1963"}</span>
            <span>•</span>
            <span>🎓 EIIN: {schoolData.eiin}</span>
          </div>

        </div>

      </div>

      {/* ─── Floating WhatsApp / Enquire Pill on Bottom Right ─── */}
      <div className="absolute bottom-6 right-6 z-30 hidden sm:flex flex-col items-end gap-1.5">
        <a
          href={`tel:${schoolData.contact.mobile_1}`}
          className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider px-5 py-2.5 rounded-full shadow-2xl transition-transform hover:scale-105"
          aria-label="Enquire with school"
        >
          <MessageSquareText size={16} className="fill-white" />
          <span>{language === "bn" ? "যোগাযোগ / অনুসন্ধান" : "ENQUIRE NOW"}</span>
        </a>
        <span className="text-[10px] text-white/80 drop-shadow-md pr-1 font-mono">
          EIIN: 101297 • Barisal Board
        </span>
      </div>

    </section>
  );
}
