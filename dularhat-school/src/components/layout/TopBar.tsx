"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { schoolData } from "@/data/school-data";

export function TopBar() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="bg-[#012600] text-emerald-100 text-xs py-1.5 border-b border-emerald-900/60 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Contact Links */}
        <div className="flex items-center gap-6 font-medium">
          <a
            href={`tel:${schoolData.contact.mobile_1}`}
            className="flex items-center gap-1.5 hover:text-[#F5B738] transition-colors"
            aria-label="Call school"
          >
            <Phone size={12} className="text-[#F5B738]" aria-hidden="true" />
            <span className="font-mono">{schoolData.contact.mobile_1}</span>
          </a>
          <a
            href={`mailto:${schoolData.contact.email}`}
            className="flex items-center gap-1.5 hover:text-[#F5B738] transition-colors"
            aria-label="Email school"
          >
            <Mail size={12} className="text-[#F5B738]" aria-hidden="true" />
            <span>{schoolData.contact.email}</span>
          </a>
          <span className="flex items-center gap-1.5 text-emerald-300/80">
            <MapPin size={12} className="text-[#F5B738]" aria-hidden="true" />
            <span>
              {language === "bn"
                ? "দুলারহাট, চরফ্যাশন, ভোলা"
                : "Dularhat, Charfashion, Bhola"}
            </span>
          </span>
        </div>

        {/* EIIN Badge & Language Switcher */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-emerald-300 font-mono text-[11px] bg-white/5 px-2 py-0.5 rounded border border-white/10">
            <span>EIIN:</span>
            <span className="text-white font-bold">{schoolData.eiin}</span>
          </div>

          <div
            className="flex items-center bg-black/40 border border-white/15 rounded-md overflow-hidden text-[11px]"
            role="group"
            aria-label="Language switcher"
          >
            <button
              onClick={() => setLanguage("bn")}
              aria-pressed={language === "bn"}
              className={`px-2.5 py-0.5 transition-colors font-medium ${
                language === "bn"
                  ? "bg-[#F5B738] text-gray-950 font-bold"
                  : "text-emerald-100 hover:bg-white/10"
              }`}
            >
              বাংলা
            </button>
            <button
              onClick={() => setLanguage("en")}
              aria-pressed={language === "en"}
              className={`px-2.5 py-0.5 transition-colors font-medium ${
                language === "en"
                  ? "bg-[#F5B738] text-gray-950 font-bold"
                  : "text-emerald-100 hover:bg-white/10"
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
