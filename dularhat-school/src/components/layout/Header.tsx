"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { navLinks } from "@/data/school-data";
import { schoolData } from "@/data/school-data";

export function Header() {
  const { language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const toggleAccordion = (href: string) => {
    setMobileAccordion(mobileAccordion === href ? null : href);
  };

  return (
    <>
      <header
        className={`fixed w-full top-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled ? "pt-0 lg:pt-2 pb-2" : "pt-0 lg:pt-4 pb-0"
        } pointer-events-none`}
      >
        <div className="w-full max-w-[1536px] mx-auto px-0 lg:px-10 pointer-events-auto">
          <div
            className={`relative flex items-center justify-between bg-white transition-all duration-300 ease-in-out mx-auto h-[60px] lg:h-auto ${
              isScrolled
                ? "rounded-none lg:rounded-[16px] shadow-md px-4 sm:px-6 py-2 lg:py-1.5"
                : "rounded-none lg:rounded-[20px] shadow-lg px-4 sm:px-6 lg:px-8 py-2.5 lg:py-2.5"
            }`}
          >
            {/* ─── Logo and Identity (Left) ─── */}
            <Link href="/" className="flex items-center gap-2 lg:gap-3 shrink-0 group z-10 w-fit max-w-[80%] h-full">
              <div className={`relative flex items-center transition-all duration-300 ease-in-out shrink-0 ${isScrolled ? "w-9 h-9 lg:w-10 lg:h-10" : "w-[38px] h-[38px] lg:w-[48px] lg:h-[48px]"}`}>
                <Image
                  src={schoolData.logo_url}
                  alt="School Logo"
                  fill
                  className="object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <h1
                  className={`font-bold text-[#063F20] transition-all duration-300 ${
                    isScrolled ? "text-[14px] lg:text-[17px]" : "text-[15px] sm:text-[17px] lg:text-[19px]"
                  } leading-tight truncate`}
                >
                  {language === "bn" ? schoolData.name.bengali : schoolData.name.english}
                </h1>
                <p
                  className={`text-[#151A17]/70 font-medium transition-all duration-300 ${
                    isScrolled ? "text-[9px] lg:text-[11px]" : "text-[10px] sm:text-[11px] lg:text-xs"
                  } leading-tight mt-[1px] truncate`}
                >
                  {language === "bn"
                    ? "চরফ্যাশন, ভোলা • প্রতিষ্ঠাকাল: ১৯৬৬"
                    : "Charfashion, Bhola • Est: 1966"}
                </p>
              </div>
            </Link>

            {/* ─── Desktop Navigation (Centered) ─── */}
            <nav className="hidden xl:flex flex-1 justify-center items-center gap-1 2xl:gap-3 px-4">
              {navLinks.map((link) => {
                const hasChildren = link.children && link.children.length > 0;
                const isActive = link.href === "/"; // Simple active check for "Home"

                // Adjust font size smaller for English to prevent overflow
                const textClass = language === "en" 
                  ? "text-[13px] 2xl:text-[14px]" 
                  : "text-[15px] 2xl:text-[16px]";

                return (
                  <div
                    key={link.href}
                    className="relative group"
                    onMouseEnter={() => hasChildren && setActiveDropdown(link.href)}
                    onMouseLeave={() => hasChildren && setActiveDropdown(null)}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center gap-1.5 px-2.5 py-2 ${textClass} font-medium transition-colors ${
                        isActive ? "text-[#063F20]" : "text-[#151A17] hover:text-[#063F20]"
                      }`}
                    >
                      {isActive && <span className="w-1.5 h-1.5 bg-[#063F20] rounded-full" />}
                      <span>{language === "bn" ? link.label.bengali : link.label.english}</span>
                      {hasChildren && <ChevronDown className="w-3.5 h-3.5 opacity-50" />}
                    </Link>

                    {/* Dropdown Menu */}
                    {hasChildren && (
                      <div
                        className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 transition-all duration-200 ${
                          activeDropdown === link.href
                            ? "opacity-100 translate-y-0 visible"
                            : "opacity-0 translate-y-2 invisible"
                        }`}
                      >
                        {link.children?.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:text-[#063F20] hover:bg-emerald-50/50 transition-colors"
                          >
                            {language === "bn" ? child.label.bengali : child.label.english}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* ─── Right Side Actions ─── */}
            <div className="flex items-center justify-end gap-2 lg:gap-4 shrink-0 z-10 h-full">
              {/* Language Toggle */}
              <div className="hidden lg:flex items-center bg-gray-100 rounded-full p-0.5">
                <button
                  onClick={() => setLanguage("bn")}
                  className={`px-4 py-1.5 rounded-full text-xs lg:text-sm font-semibold transition-all ${
                    language === "bn"
                      ? "bg-[#063F20] text-white shadow-sm"
                      : "text-gray-600 hover:text-[#063F20]"
                  }`}
                >
                  বাংলা
                </button>
                <button
                  onClick={() => setLanguage("en")}
                  className={`px-4 py-1.5 rounded-full text-xs lg:text-sm font-bold transition-all ${
                    language === "en"
                      ? "bg-[#063F20] text-white shadow-sm"
                      : "text-gray-600 hover:text-[#063F20]"
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 -mr-2 flex items-center justify-center text-gray-700 hover:text-[#063F20] transition-colors z-50 h-full"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-[22px] h-[22px]" /> : <Menu className="w-[22px] h-[22px]" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Mobile Navigation Overlay & Drawer ─── */}
      <div
        className={`xl:hidden fixed inset-0 z-[100] transition-all duration-300 ${
          mobileMenuOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Drawer panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Mobile Drawer Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <h2 className="font-bold text-[#063F20] text-lg">
              {language === "bn" ? "মেনু" : "Menu"}
            </h2>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 -mr-2 text-gray-500 hover:text-[#063F20] bg-gray-50 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6">
            
            {/* Language Switch inside Mobile Drawer */}
            <div className="flex justify-center lg:hidden">
              <div className="inline-flex items-center bg-gray-100 rounded-full p-1 w-full">
                <button
                  onClick={() => setLanguage("bn")}
                  className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    language === "bn"
                      ? "bg-[#063F20] text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  বাংলা
                </button>
                <button
                  onClick={() => setLanguage("en")}
                  className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-all ${
                    language === "en"
                      ? "bg-[#063F20] text-white shadow-md"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  EN
                </button>
              </div>
            </div>

            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const hasChildren = link.children && link.children.length > 0;
                const isAccordionOpen = mobileAccordion === link.href;

                return (
                  <div key={link.href} className="flex flex-col border-b border-gray-50 last:border-0">
                    <div className="flex items-center justify-between">
                      <Link
                        href={link.href}
                        className="flex-1 py-3.5 text-[17px] font-medium text-gray-800"
                        onClick={() => !hasChildren && setMobileMenuOpen(false)}
                      >
                        {language === "bn" ? link.label.bengali : link.label.english}
                      </Link>
                      
                      {hasChildren && (
                        <button 
                          onClick={() => toggleAccordion(link.href)}
                          className="p-3 -mr-3 text-gray-500"
                        >
                          {isAccordionOpen ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </button>
                      )}
                    </div>
                    
                    {/* Accordion Content */}
                    {hasChildren && (
                      <div 
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isAccordionOpen ? "max-h-96 opacity-100 mb-3" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="flex flex-col pl-4 border-l-2 border-emerald-100 space-y-1 py-1">
                          {link.children?.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="px-4 py-2.5 text-[15px] text-gray-600 hover:text-[#063F20] rounded-lg hover:bg-emerald-50/50 transition-colors"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {language === "bn" ? child.label.bengali : child.label.english}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
