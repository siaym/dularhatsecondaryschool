"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { schoolData, navLinks } from "@/data/school-data";
import { usePathname } from "next/navigation";

export function Header() {
  const { t, language, setLanguage } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initialize on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-2 border-b border-gray-100"
          : "bg-white py-3.5 sm:py-4.5 border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Compact Title (Shrinks smoothly on scroll) */}
          <Link
            href="/"
            className="flex items-center gap-2.5 sm:gap-3 group flex-shrink-0"
            aria-label="Dularhat Secondary School Homepage"
          >
            <div
              className={`relative flex items-center justify-center flex-shrink-0 transition-all duration-300 ease-in-out ${
                scrolled ? "w-9 h-9 sm:w-10 sm:h-10" : "w-12 h-12 sm:w-14 sm:h-14"
              }`}
            >
              <Image
                src={schoolData.logo_url}
                alt="Dularhat Secondary School Emblem"
                width={56}
                height={56}
                className="w-full h-full object-contain transition-transform group-hover:scale-105"
                priority
              />
            </div>
            
            <div className="flex flex-col justify-center">
              <span
                className={`font-extrabold text-[#016B00] leading-tight font-serif tracking-tight group-hover:text-[#024D00] transition-all duration-300 ${
                  scrolled ? "text-sm sm:text-base" : "text-base sm:text-lg"
                }`}
              >
                {t(schoolData.name)}
              </span>
              <span
                className={`font-medium text-gray-500 uppercase tracking-wider transition-all duration-300 ${
                  scrolled ? "text-[9px] sm:text-[10px]" : "text-[10px] sm:text-[11px]"
                }`}
              >
                {language === "bn" ? "স্থাপিত ১৯৬৩ • চরফ্যাশন" : "Est. 1963 • Charfashion"}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2.5" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

              return link.children ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(link.href)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1 font-bold rounded-lg transition-all duration-200 ${
                      scrolled
                        ? "px-2.5 py-1.5 text-xs xl:text-sm"
                        : "px-3 py-2 text-sm xl:text-[15px]"
                    } ${
                      isActive
                        ? "text-[#016B00] bg-green-50"
                        : "text-gray-800 hover:text-[#016B00] hover:bg-gray-50"
                    }`}
                    aria-expanded={openDropdown === link.href}
                    aria-haspopup="true"
                  >
                    {isActive && <span className="text-[#016B00] text-[11px]">▶</span>}
                    <span>{t(link.label)}</span>
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 opacity-60 ${
                        openDropdown === link.href ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {openDropdown === link.href && (
                    <div className="absolute top-full left-0 mt-1 bg-white text-gray-900 rounded-xl shadow-xl min-w-48 py-2 z-50 border border-gray-100 animate-in fade-in slide-in-from-top-1 duration-150">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-xs xl:text-sm font-semibold text-gray-700 hover:bg-green-50 hover:text-[#016B00] transition-colors"
                        >
                          {t(child.label)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1 font-bold rounded-lg transition-all duration-200 ${
                    scrolled
                      ? "px-2.5 py-1.5 text-xs xl:text-sm"
                      : "px-3 py-2 text-sm xl:text-[15px]"
                  } ${
                    isActive
                      ? "text-[#016B00] bg-green-50"
                      : "text-gray-800 hover:text-[#016B00] hover:bg-gray-50"
                  }`}
                >
                  {isActive && <span className="text-[#016B00] text-[11px]">▶</span>}
                  <span>{t(link.label)}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Language Toggle & Contact for Desktop */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Language Switch */}
            <div className="flex bg-gray-100 p-0.5 border border-gray-200 rounded-lg text-xs font-bold">
              <button
                onClick={() => setLanguage("bn")}
                className={`px-2 py-0.5 rounded-md transition-all ${
                  language === "bn"
                    ? "bg-[#016B00] text-white shadow-xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                বাং
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-2 py-0.5 rounded-md transition-all ${
                  language === "en"
                    ? "bg-[#016B00] text-white shadow-xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                EN
              </button>
            </div>

            {/* Quick Contact Button */}
            <Link
              href="/contact"
              className={`inline-flex items-center gap-1.5 bg-[#016B00] hover:bg-[#024D00] text-white font-bold rounded-xl shadow-xs hover:shadow-md transition-all duration-200 ${
                scrolled ? "px-3 py-1.5 text-xs" : "px-3.5 py-2 text-xs xl:text-sm"
              }`}
            >
              <Phone size={13} />
              <span>{language === "bn" ? "যোগাযোগ" : "Contact"}</span>
            </Link>
          </div>

          {/* Mobile Right Bar: Language Switch + Menu Toggle Button */}
          <div className="lg:hidden flex items-center gap-2">
            <div className="flex bg-gray-100 p-0.5 border border-gray-200 rounded-md text-[11px] font-bold">
              <button
                onClick={() => setLanguage("bn")}
                className={`px-2 py-0.5 rounded ${
                  language === "bn" ? "bg-[#016B00] text-white" : "text-gray-600"
                }`}
              >
                বাং
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-2 py-0.5 rounded ${
                  language === "en" ? "bg-[#016B00] text-white" : "text-gray-600"
                }`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-2xl mt-2">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1" aria-label="Mobile navigation">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

              return (
                <div key={link.href} className="border-b border-gray-50 pb-1">
                  <Link
                    href={link.href}
                    className={`block px-3 py-2 rounded-lg text-sm font-bold transition-colors ${
                      isActive
                        ? "bg-[#016B00] text-white"
                        : "text-gray-800 hover:bg-gray-50 hover:text-[#016B00]"
                    }`}
                  >
                    {isActive && <span className="mr-1.5 text-xs">▶</span>}
                    {t(link.label)}
                  </Link>

                  {link.children && (
                    <div className="pl-4 mt-1 space-y-1 border-l-2 border-green-600/30 ml-3">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-3 py-1.5 rounded text-xs font-semibold text-gray-600 hover:text-[#016B00] hover:bg-green-50 transition-colors"
                        >
                          {t(child.label)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="pt-2">
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 bg-[#016B00] text-white font-bold py-2.5 rounded-xl text-xs w-full shadow-xs"
              >
                <Phone size={14} />
                <span>{language === "bn" ? "সরাসরি যোগাযোগ করুন" : "Contact School Office"}</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
