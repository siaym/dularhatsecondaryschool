"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Facebook } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { schoolData } from "@/data/school-data";

export function TopBar() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="bg-[#016B00] text-white text-sm py-2 hidden md:block">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Contact Info */}
        <div className="flex items-center gap-4">
          <a
            href={`tel:${schoolData.contact.mobile_1}`}
            className="flex items-center gap-1.5 hover:text-yellow-300 transition-colors"
          >
            <Phone size={13} />
            <span>{schoolData.contact.mobile_1}</span>
          </a>
          <a
            href={`mailto:${schoolData.contact.email}`}
            className="flex items-center gap-1.5 hover:text-yellow-300 transition-colors"
          >
            <Mail size={13} />
            <span>{schoolData.contact.email}</span>
          </a>
          <div className="flex items-center gap-1.5 text-green-200">
            <MapPin size={13} />
            <span>
              {language === "bn"
                ? "দুলারহাট, চরফ্যাশন, ভোলা"
                : "Dularhat, Charfashion, Bhola"}
            </span>
          </div>
        </div>

        {/* Right: Language + EIIN */}
        <div className="flex items-center gap-4">
          <span className="text-green-300 text-xs">
            EIIN: {schoolData.eiin}
          </span>
          <div className="flex items-center gap-1 border border-green-400 rounded overflow-hidden text-xs">
            <button
              onClick={() => setLanguage("bn")}
              className={`px-2.5 py-0.5 transition-colors ${
                language === "bn"
                  ? "bg-white text-[#016B00] font-bold"
                  : "hover:bg-green-700"
              }`}
            >
              বাংলা
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`px-2.5 py-0.5 transition-colors ${
                language === "en"
                  ? "bg-white text-[#016B00] font-bold"
                  : "hover:bg-green-700"
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
