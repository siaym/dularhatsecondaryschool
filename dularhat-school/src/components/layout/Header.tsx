"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
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
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 bg-[#016B00] text-white transition-shadow duration-300 ${
        scrolled ? "shadow-lg shadow-green-900/30" : ""
      }`}
    >
      {/* Mobile language bar */}
      <div className="md:hidden bg-[#024D00] px-4 py-1.5 flex items-center justify-between text-xs">
        <span className="text-green-300">EIIN: {schoolData.eiin}</span>
        <div className="flex border border-green-600 rounded overflow-hidden">
          <button
            onClick={() => setLanguage("bn")}
            className={`px-2.5 py-0.5 ${language === "bn" ? "bg-white text-[#016B00] font-bold" : "text-white"}`}
          >
            বাংলা
          </button>
          <button
            onClick={() => setLanguage("en")}
            className={`px-2.5 py-0.5 ${language === "en" ? "bg-white text-[#016B00] font-bold" : "text-white"}`}
          >
            EN
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo + School Name */}
          <Link href="/" className="flex items-center gap-3 min-w-0" aria-label="Dularhat Secondary School - Home">
            <div className="w-12 h-12 lg:w-14 lg:h-14 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow">
              <Image
                src={schoolData.logo_url}
                alt="Dularhat Secondary School Logo"
                width={40}
                height={40}
                className="rounded-full object-contain"
                priority
              />
            </div>
            <div className="min-w-0">
              <h1 className="text-base lg:text-lg xl:text-xl font-bold leading-tight truncate">
                {t(schoolData.name)}
              </h1>
              <p className="text-green-200 text-xs leading-tight hidden sm:block">
                {language === "bn"
                  ? `চরফ্যাশন, ভোলা | EIIN: ${schoolData.eiin}`
                  : `Charfashion, Bhola | EIIN: ${schoolData.eiin}`}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return link.children ? (
                <div
                  key={link.href}
                  className="relative group"
                  onMouseEnter={() => setOpenDropdown(link.href)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1 px-3 py-2 text-sm rounded transition-colors ${
                      isActive ? "bg-white/20 font-semibold" : "hover:bg-white/10"
                    }`}
                    aria-expanded={openDropdown === link.href}
                    aria-haspopup="true"
                  >
                    {t(link.label)}
                    <ChevronDown size={14} />
                  </button>
                  {openDropdown === link.href && (
                    <div className="absolute top-full left-0 mt-1 bg-white text-gray-800 rounded-lg shadow-xl min-w-48 py-1 z-50 border border-gray-100">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm hover:bg-green-50 hover:text-[#016B00] transition-colors"
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
                  className={`px-3 py-2 text-sm rounded transition-colors ${
                    isActive ? "bg-white/20 font-semibold" : "hover:bg-white/10"
                  }`}
                >
                  {t(link.label)}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden p-2 rounded hover:bg-white/10 transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="xl:hidden bg-[#024D00] border-t border-green-700">
          <nav className="max-w-7xl mx-auto px-4 py-3 space-y-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  className={`block px-3 py-2.5 rounded text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-white/20"
                      : "hover:bg-white/10"
                  }`}
                >
                  {t(link.label)}
                </Link>
                {link.children && (
                  <div className="pl-4 mt-1 space-y-1 border-l border-green-600 ml-3">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-3 py-2 rounded text-sm text-green-200 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        {t(child.label)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
