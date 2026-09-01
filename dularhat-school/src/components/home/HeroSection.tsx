"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Calendar, Building2, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { schoolData } from "@/data/school-data";

export function HeroSection() {
  const { language } = useLanguage();

  return (
    <>
      {/* =========================================
          MOBILE HERO (Stacked Layout, < lg)
          ========================================= */}
      <section className="flex flex-col lg:hidden w-full h-[100dvh] min-h-[700px] bg-[#063F20] pt-[84px]" aria-label="Mobile Hero section">
        
        {/* ─── Top Solid Green Content Block ─── */}
        <div className="relative z-20 w-full px-[14px] sm:px-4 pt-1 pb-2 bg-[#063F20] flex-shrink-0">
          
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 mb-2 text-[10px] sm:text-[11px] font-medium text-[#F2F5F2]">
            <div className="flex items-center gap-1">
              <Calendar className="w-[11px] h-[11px] text-[#F4C430]" />
              <span>{language === "bn" ? "প্রতিষ্ঠাকাল: ১৯৬৬" : "Established: 1966"}</span>
            </div>
            <div className="text-[#F4C430]">|</div>
            <div className="flex items-center gap-1">
              <Building2 className="w-[11px] h-[11px] text-[#F4C430]" />
              <span className="font-mono">EIIN: 101297</span>
            </div>
            <div className="text-[#F2F5F2] text-[8px]">●</div>
            <div className="flex items-center gap-1">
              <MapPin className="w-[11px] h-[11px] text-[#F4C430]" />
              <span>{language === "bn" ? "বরিশাল শিক্ষা বোর্ড" : "Barisal Education Board"}</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-[36px] sm:text-[38px] font-extrabold tracking-tight leading-[1.05] mb-1 text-white">
            {language === "bn" ? (
              <>
                <span className="block mb-0.5 drop-shadow-sm">দুলারহাট</span>
                <span className="block drop-shadow-sm">মাধ্যমিক বিদ্যালয়</span>
              </>
            ) : (
              <>
                <span className="block mb-0.5 drop-shadow-sm">Dularhat</span>
                <span className="block drop-shadow-sm text-[26px] sm:text-[30px] leading-[1.1]">Secondary School</span>
              </>
            )}
          </h1>

          {/* Location */}
          <div className="flex items-center gap-1 text-[#F2F5F2] text-[13px] sm:text-[14px] font-semibold mb-1.5">
            <span className="text-[#F4C430] text-[14px]">📍</span>
            <p>{language === "bn" ? "চরফ্যাশন, ভোলা, বাংলাদেশ" : "Charfashion, Bhola, Bangladesh"}</p>
          </div>

          {/* Gold Divider */}
          <div className="w-[40px] h-[2px] bg-[#F4C430] rounded-full mb-1.5 shadow-sm" />

          {/* Quote */}
          <p className="text-[13px] sm:text-[14px] text-[#F4C430] font-bold mb-1 leading-snug">
            “দক্ষ মানবসম্পদ গড়ে তুলতে আমরা অঙ্গীকারবদ্ধ”
          </p>

          {/* Description */}
          <p className="text-[#F2F5F2] text-[12px] sm:text-[13px] leading-[1.4] mb-2 w-full font-medium">
            {language === "bn" 
              ? "চরফ্যাশন উপজেলার পশ্চিমাঞ্চলের প্রথম শিক্ষা প্রতিষ্ঠান। ১৯৬৬ সালে প্রতিষ্ঠার পর থেকে ছাত্র-ছাত্রী, শিক্ষক-শিক্ষিকা, অভিভাবক, এলাকার সর্বস্তরের মানুষের সহযোগিতায় বিদ্যালয়টি শিক্ষার মান ও ফলাফলে জেলার অন্যতম শ্রেষ্ঠ প্রতিষ্ঠানে পরিণত হয়েছে।"
              : "The first educational institution in the western region of Charfashion Upazila. Since its establishment in 1966, with the cooperation of students, teachers, parents, and people of all levels, the school has become one of the best institutions in the district in terms of quality of education and results."
            }
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-row items-center gap-2 mb-0 w-full relative z-30">
            <Link
              href="/about"
              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#F4C430] hover:bg-[#e0b228] text-[#063F20] text-[12px] sm:text-[13px] font-bold rounded-lg px-2 sm:px-3 py-2 transition-transform hover:-translate-y-0.5 shadow-md whitespace-nowrap"
            >
              <span>{language === "bn" ? "বিদ্যালয় সম্পর্কে জানুন" : "About School"}</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </Link>

            <Link
              href="/notices"
              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-transparent hover:bg-white/5 text-white border border-[#F4C430]/60 text-[12px] sm:text-[13px] font-bold rounded-lg px-2 sm:px-3 py-2 transition-transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              <span>{language === "bn" ? "সর্বশেষ নোটিশ দেখুন" : "Latest Notices"}</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </Link>
          </div>
        </div>

        {/* ─── Bottom Curve & Image Area ─── */}
        <div className="relative w-full flex-grow min-h-[300px] overflow-hidden">
          
          {/* Mobile SVG Organic Curve */}
          <svg 
            className="absolute top-[-1px] left-0 w-full h-[80px] sm:h-[90px] z-20" 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="heroShadowMobile" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.4" />
              </filter>
            </defs>
            <path 
              d="M 0 0 L 0 55 C 40 5, 60 95, 100 85 L 100 0 Z" 
              fill="#063F20" 
              filter="url(#heroShadowMobile)"
            />
          </svg>

          {/* Decorative Dot Pattern (Right Side, near curve) */}
          <div className="absolute top-[10px] right-[5%] z-20 opacity-30 pointer-events-none">
            <svg width="40" height="60" viewBox="0 0 40 60" fill="currentColor" className="text-[#F4C430]">
              <pattern id="dot-pattern-mobile" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="1.5" />
              </pattern>
              <rect x="0" y="0" width="40" height="60" fill="url(#dot-pattern-mobile)" />
            </svg>
          </div>

          {/* Background Photograph */}
          <Image
            src={schoolData.hero_image}
            alt="Dularhat Secondary School Campus"
            fill
            className="object-cover object-[center_30%] z-0"
            priority
            sizes="100vw"
          />

          {/* Floating Contact Pill */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-max max-w-[90%] z-30 flex">
            <a
              href={`tel:${schoolData.contact.mobile_1}`}
              className="flex items-center gap-2 bg-[#063F20] text-white rounded-full pl-1.5 pr-4 py-1.5 shadow-lg border border-white/20"
              aria-label="Call school directly"
            >
              <div className="bg-[#F4C430] p-1.5 rounded-full flex items-center justify-center">
                <Phone className="w-3.5 h-3.5 text-[#063F20]" fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <div className="font-bold text-[12px] tracking-wide leading-tight">
                  যোগাযোগ: ০১৭২৭৯৯১২২০
                </div>
                <div className="text-[9px] text-[#F2F5F2]/80 font-medium tracking-wider leading-tight mt-0.5">
                  EIIN: 101297 • Barisal Education Board
                </div>
              </div>
            </a>
          </div>
        </div>

      </section>

      {/* =========================================
          DESKTOP & TABLET HERO (Side-by-side, >= lg)
          ========================================= */}
      <section
        className="hidden lg:flex relative bg-[#063F20] overflow-hidden min-h-[650px] max-h-[750px] xl:min-h-[100vh] xl:max-h-[1080px] items-stretch pt-[96px]"
        aria-label="Hero section desktop"
      >
        {/* ─── Background Photo Layer (Right Side) ─── */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 left-[45%] xl:left-[42%] w-full h-full">
            <Image
              src={schoolData.hero_image}
              alt="Dularhat Secondary School Campus"
              fill
              className="object-cover object-center"
              priority
              sizes="58vw"
            />
          </div>
        </div>

        {/* ─── Organic Green Mask ─── */}
        <div className="absolute inset-0 pointer-events-none z-10 w-[60%] xl:w-[58%]">
          <svg
            className="absolute top-0 bottom-0 left-0 h-full w-full"
            viewBox="0 0 100 100"
            fill="none"
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="heroShadowDesktop" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="2" dy="0" stdDeviation="2" floodOpacity="0.25" />
              </filter>
            </defs>
            <path
              d="M 0 0 L 85 0 C 110 29.3, 50 58.6, 93.75 100 L 0 100 Z"
              fill="#063F20"
              filter="url(#heroShadowDesktop)"
            />
          </svg>

          {/* Subtle decorative dot pattern */}
          <div className="absolute top-[15%] right-[10%] xl:right-[15%] opacity-30">
            <svg width="100" height="150" viewBox="0 0 100 150" fill="currentColor" className="text-[#F4C430]">
              <pattern id="dot-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="3" cy="3" r="3" />
              </pattern>
              <rect x="0" y="0" width="100" height="150" fill="url(#dot-pattern)" />
            </svg>
          </div>
        </div>

        {/* ─── Hero Content Area ─── */}
        <div className="relative z-20 w-full max-w-[1536px] mx-auto flex items-stretch pl-[60px] xl:pl-[90px] pr-10 h-full">
          
          <div className="w-full max-w-[480px] xl:max-w-[620px] text-white flex flex-col justify-center h-full pb-12 pt-4">
            
            {/* Metadata Row */}
            <div className="flex flex-wrap items-center gap-4 mb-4 text-xs xl:text-sm font-medium text-[#F2F5F2]">
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-[#F4C430]" />
                <span>{language === "bn" ? "প্রতিষ্ঠাকাল: ১৯৬৬" : "Established: 1966"}</span>
              </div>
              <div className="text-[#F4C430]">|</div>
              <div className="flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-[#F4C430]" />
                <span className="font-mono">EIIN: 101297</span>
              </div>
              <div className="text-[#F2F5F2] text-[10px] xl:text-xs">●</div>
              <div className="flex items-center">
                <span>{language === "bn" ? "বরিশাল শিক্ষা বোর্ড" : "Barisal Education Board"}</span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-[52px] xl:text-[76px] font-extrabold tracking-tight leading-[1.05] mb-4 text-white">
              {language === "bn" ? (
                <>
                  <span className="block mb-1 drop-shadow-sm">দুলারহাট</span>
                  <span className="block drop-shadow-sm">মাধ্যমিক বিদ্যালয়</span>
                </>
              ) : (
                <>
                  <span className="block mb-1 drop-shadow-sm">Dularhat</span>
                  <span className="block drop-shadow-sm text-[52px] leading-[1.1]">Secondary School</span>
                </>
              )}
            </h1>

            {/* Location */}
            <div className="flex items-center gap-2 text-[#F2F5F2] text-base xl:text-[19px] font-semibold mb-5">
              <MapPin className="w-4 h-4 xl:w-5 xl:h-5 text-[#F4C430]" />
              <p>{language === "bn" ? "চরফ্যাশন, ভোলা, বাংলাদেশ" : "Charfashion, Bhola, Bangladesh"}</p>
            </div>

            {/* Gold Divider */}
            <div className="w-[40px] xl:w-[60px] h-[3px] bg-[#F4C430] rounded-full mb-5 shadow-sm" />

            {/* Quote */}
            <p className="text-[17px] xl:text-[22px] text-[#F4C430] font-bold mb-4 leading-snug">
              “দক্ষ মানবসম্পদ গড়ে তুলতে আমরা অঙ্গীকারবদ্ধ”
            </p>

            {/* Description */}
            <p className="text-[#F2F5F2] text-[14px] xl:text-[16px] leading-[1.65] mb-8 max-w-[95%] font-medium">
              {language === "bn" 
                ? "চরফ্যাশন উপজেলার পশ্চিমাঞ্চলের প্রথম শিক্ষা প্রতিষ্ঠান। ১৯৬৬ সালে প্রতিষ্ঠার পর থেকে ছাত্র-ছাত্রী, শিক্ষক-শিক্ষিকা, অভিভাবক, এলাকার সর্বস্তরের মানুষের সহযোগিতায় বিদ্যালয়টি শিক্ষার মান ও ফলাফলে জেলার অন্যতম শ্রেষ্ঠ প্রতিষ্ঠানে পরিণত হয়েছে।"
                : "The first educational institution in the western region of Charfashion Upazila. Since its establishment in 1966, with the cooperation of students, teachers, parents, and people of all levels, the school has become one of the best institutions in the district in terms of quality of education and results."
              }
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 bg-[#F4C430] hover:bg-[#e0b228] text-[#063F20] text-[14px] xl:text-[15px] font-bold rounded-lg px-5 xl:px-6 py-2.5 xl:py-3 transition-transform hover:-translate-y-0.5 shadow-md"
              >
                <span>{language === "bn" ? "বিদ্যালয় সম্পর্কে জানুন" : "About School"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/notices"
                className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/5 text-white border border-[#F4C430]/60 text-[14px] xl:text-[15px] font-bold rounded-lg px-5 xl:px-6 py-2.5 xl:py-3 transition-transform hover:-translate-y-0.5"
              >
                <span>{language === "bn" ? "সর্বশেষ নোটিশ দেখুন" : "Latest Notices"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Statistics Row */}
            <div className="flex items-center gap-3 xl:gap-8 pt-5 border-t border-white/15 w-max mt-auto">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 mb-1">
                  <Calendar className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-[#F4C430]" />
                  <div className="text-[18px] xl:text-[24px] font-bold text-white leading-none">১৯৬৬</div>
                </div>
                <div className="text-[10px] xl:text-[11px] text-[#F2F5F2]/80 font-medium tracking-wide">প্রতিষ্ঠাকাল</div>
              </div>

              <div className="w-px h-10 bg-white/10 block" />

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 mb-1">
                  <svg className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-[#F4C430]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <div className="text-[18px] xl:text-[24px] font-bold text-white leading-none">৫টি</div>
                </div>
                <div className="text-[10px] xl:text-[11px] text-[#F2F5F2]/80 font-medium tracking-wide">শ্রেণি (৬ষ্ঠ-১০ম)</div>
              </div>

              <div className="w-px h-10 bg-white/10 block" />

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 mb-1">
                  <svg className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-[#F4C430]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <div className="text-[18px] xl:text-[24px] font-bold text-white leading-none">৩টি</div>
                </div>
                <div className="text-[10px] xl:text-[11px] text-[#F2F5F2]/80 font-medium tracking-wide">বিভাগ</div>
              </div>

              <div className="w-px h-10 bg-white/10 block" />

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 mb-1">
                  <svg className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-[#F4C430]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                  <div className="text-[16px] xl:text-[21px] font-bold text-white leading-none mt-0.5">JSC & SSC</div>
                </div>
                <div className="text-[11px] text-[#F2F5F2]/80 font-medium tracking-wide">পরীক্ষা কেন্দ্র</div>
              </div>
            </div>

          </div>
        </div>

        {/* ─── Floating Contact Pill ─── */}
        <div className="absolute bottom-[6%] right-[5%] z-30 flex">
          <a
            href={`tel:${schoolData.contact.mobile_1}`}
            className="flex items-center gap-3 bg-[#0A542A]/90 backdrop-blur-sm text-white rounded-full pl-2 pr-5 py-2 shadow-2xl transition-transform hover:-translate-y-1"
            aria-label="Call school directly"
          >
            <div className="bg-white/15 p-1.5 rounded-full flex items-center justify-center">
              <Phone className="w-3.5 h-3.5 text-white" fill="white" />
            </div>
            <div className="flex flex-col">
              <div className="font-bold text-[14px] tracking-wide mb-0.5">
                যোগাযোগ: ০১৭২৭৩৭৯১২০
              </div>
              <div className="text-[9px] text-white/70 font-mono tracking-wider">
                EIIN: 101297 • Barisal Education Board
              </div>
            </div>
          </a>
        </div>

      </section>
    </>
  );
}
