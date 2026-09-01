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
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-2.5 border-b border-gray-100"
          : "bg-white py-3 sm:py-4 border-b border-gray-100/80"
      }`}
    >
      {/* Top Mobile Bar */}
      <div className="md:hidden px-4 pb-2 flex items-center justify-between text-xs border-b border-gray-100 mb-2">
        <span className="text-[#016B00] font-bold font-mono">EIIN: {schoolData.eiin}</span>
        <div className="flex bg-gray-100 border border-gray-200 rounded-md overflow-hidden text-[11px]">
          <button
            onClick={() => setLanguage("bn")}
            className={`px-2.5 py-0.5 font-bold transition-colors ${
              language === "bn" ? "bg-[#016B00] text-white" : "text-gray-700"
            }`}
          >
            বাংলা
          </button>
          <button
            onClick={() => setLanguage("en")}
            className={`px-2.5 py-0.5 font-bold transition-colors ${
              language === "en" ? "bg-[#016B00] text-white" : "text-gray-700"
            }`}
          >
            EN
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & School Identity (Crest + Text below) */}
          <Link
            href="/"
            className="flex items-center gap-3 group flex-shrink-0"
            aria-label="Dularhat Secondary School Homepage"
          >
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105">
              <Image
                src={schoolData.logo_url}
                alt="Dularhat Secondary School Crest"
                width={56}
                height={56}
                className="w-full h-full object-contain drop-shadow-xs"
                priority
              />
            </div>
            
            <div className="flex flex-col">
              <span className="text-sm sm:text-base lg:text-lg font-extrabold text-[#016B00] leading-tight font-serif tracking-tight group-hover:text-[#024D00] transition-colors">
                {t(schoolData.name)}
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold text-gray-500 tracking-wider uppercase">
                {language === "bn" ? "চরফ্যাশন, ভোলা • স্থাপিত ১৯৬৩" : "Charfashion, Bhola • Est. 1963"}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-3" aria-label="Main navigation">
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
                    className={`flex items-center gap-1 px-3 py-2 text-sm xl:text-[15px] font-bold rounded-lg transition-all ${
                      isActive
                        ? "text-[#016B00] bg-green-50/80"
                        : "text-gray-800 hover:text-[#016B00] hover:bg-gray-50"
                    }`}
                    aria-expanded={openDropdown === link.href}
                    aria-haspopup="true"
                  >
                    {isActive && <span className="text-[#016B00] text-xs">▶</span>}
                    <span>{t(link.label)}</span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 opacity-70 ${
                        openDropdown === link.href ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {openDropdown === link.href && (
                    <div className="absolute top-full left-0 mt-1 bg-white text-gray-900 rounded-xl shadow-xl min-w-52 py-2 z-50 border border-gray-100 animate-in fade-in slide-in-from-top-1 duration-150">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-green-50 hover:text-[#016B00] transition-colors"
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
                  className={`flex items-center gap-1 px-3 py-2 text-sm xl:text-[15px] font-bold rounded-lg transition-all ${
                    isActive
                      ? "text-[#016B00] bg-green-50/80"
                      : "text-gray-800 hover:text-[#016B00] hover:bg-gray-50"
                  }`}
                >
                  {isActive && <span className="text-[#016B00] text-xs">▶</span>}
                  <span>{t(link.label)}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Language Toggle & Contact for Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Switch */}
            <div className="flex bg-gray-100 p-0.5 border border-gray-200 rounded-lg text-xs font-bold">
              <button
                onClick={() => setLanguage("bn")}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  language === "bn"
                    ? "bg-[#016B00] text-white shadow-xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                বাংলা
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-2.5 py-1 rounded-md transition-all ${
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
              className="inline-flex items-center gap-1.5 bg-[#016B00] hover:bg-[#024D00] text-white font-bold px-4 py-2 rounded-xl text-xs xl:text-sm shadow-md hover:shadow-lg transition-all"
            >
              <Phone size={14} />
              <span>{language === "bn" ? "যোগাযোগ" : "Contact"}</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

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
                <div key={link.href} className="border-b border-gray-100 pb-1">
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
          </nav>
        </div>
      )}
    </header>
  );
}
