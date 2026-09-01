"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { schoolData } from "@/data/school-data";

export function TopBar() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="bg-[#016B00] text-white text-sm py-2 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Contact Info */}
        <div className="flex items-center gap-5 text-green-100">
          <a
            href={`tel:${schoolData.contact.mobile_1}`}
            className="flex items-center gap-1.5 hover:text-yellow-300 transition-colors"
            aria-label="Call school"
          >
            <Phone size={13} aria-hidden="true" />
            <span>{schoolData.contact.mobile_1}</span>
          </a>
          <a
            href={`mailto:${schoolData.contact.email}`}
            className="flex items-center gap-1.5 hover:text-yellow-300 transition-colors"
            aria-label="Email school"
          >
            <Mail size={13} aria-hidden="true" />
            <span>{schoolData.contact.email}</span>
          </a>
          <span className="flex items-center gap-1.5 text-green-200">
            <MapPin size={13} aria-hidden="true" />
            <span>
              {language === "bn"
                ? "দুলারহাট, চরফ্যাশন, ভোলা"
                : "Dularhat, Charfashion, Bhola"}
            </span>
          </span>
        </div>

        {/* Right: EIIN + Language Switch */}
        <div className="flex items-center gap-4">
          <span className="text-green-300 text-xs hidden lg:block">
            EIIN: {schoolData.eiin}
          </span>
          <div
            className="flex items-center border border-green-500 rounded overflow-hidden text-xs"
            role="group"
            aria-label="Language switcher"
          >
            <button
              onClick={() => setLanguage("bn")}
              aria-pressed={language === "bn"}
              className={`px-3 py-1 transition-colors ${
                language === "bn"
                  ? "bg-white text-[#016B00] font-bold"
                  : "text-white hover:bg-green-700"
              }`}
            >
              বাংলা
            </button>
            <button
              onClick={() => setLanguage("en")}
              aria-pressed={language === "en"}
              className={`px-3 py-1 transition-colors ${
                language === "en"
                  ? "bg-white text-[#016B00] font-bold"
                  : "text-white hover:bg-green-700"
              }`}
            >
              English
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
