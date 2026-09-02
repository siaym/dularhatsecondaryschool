"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, ExternalLink, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { schoolData } from "@/data/school-data";

export function ContactSection() {
  const { t, language } = useLanguage();

  return (
    <section className="py-16 bg-[#F8F8F6]" aria-labelledby="contact-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-[#016B00] text-xs font-semibold tracking-widest uppercase mb-3">
            {language === "bn" ? "যোগাযোগ" : "Get in Touch"}
          </span>
          <h2 id="contact-heading" className="text-2xl sm:text-3xl font-bold text-[#1C2522] mb-3">
            {language === "bn" ? "আমাদের সাথে যোগাযোগ করুন" : "Contact Us"}
          </h2>
          <div className="w-12 h-0.5 bg-[#016B00] mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Details */}
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-5 bg-white border border-[#E6E9E7] rounded-xl">
              <div className="w-9 h-9 bg-[#016B00]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin size={18} className="text-[#016B00]" />
              </div>
              <div>
                <p className="font-semibold text-[#1C2522] text-sm mb-1">
                  {language === "bn" ? "ঠিকানা" : "Address"}
                </p>
                <p className="text-[#66706C] text-sm leading-relaxed mb-1">{t(schoolData.address)}</p>
                <p className="text-[#016B00] font-medium text-xs mb-2">
                  {language === "bn" ? `পোস্ট কোড: ${schoolData.address.postal_code.bengali}` : `Postal Code: ${schoolData.address.postal_code.english}`}
                </p>
                <a
                  href={schoolData.address.map_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#016B00] hover:text-[#17352F] transition-colors"
                >
                  {language === "bn" ? "ম্যাপে দেখুন" : "View on Map"} <ExternalLink size={11} />
                </a>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-white border border-[#E6E9E7] rounded-xl">
                <div className="w-9 h-9 bg-[#016B00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone size={16} className="text-[#016B00]" />
                </div>
                <div>
                  <p className="text-[#66706C] text-xs mb-0.5">{language === "bn" ? "মোবাইল" : "Mobile"}</p>
                  <a href={`tel:${schoolData.contact.mobile_1}`} className="text-[#1C2522] hover:text-[#016B00] text-sm font-medium transition-colors">{schoolData.contact.mobile_1}</a>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white border border-[#E6E9E7] rounded-xl">
                <div className="w-9 h-9 bg-[#016B00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail size={16} className="text-[#016B00]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[#66706C] text-xs mb-0.5">{language === "bn" ? "ইমেইল" : "Email"}</p>
                  <a href={`mailto:${schoolData.contact.email}`} className="text-[#1C2522] hover:text-[#016B00] text-sm font-medium transition-colors truncate block">{schoolData.contact.email}</a>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white border border-[#E6E9E7] rounded-xl">
                <div className="w-9 h-9 bg-[#016B00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ExternalLink size={16} className="text-[#016B00]" />
                </div>
                <div>
                  <p className="text-[#66706C] text-xs mb-0.5">{language === "bn" ? "ওয়েবসাইট" : "Website"}</p>
                  <a href={schoolData.contact.website} target="_blank" rel="noopener noreferrer" className="text-[#1C2522] hover:text-[#016B00] text-sm font-medium transition-colors">dularhatsecondaryschool.edu.bd</a>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white border border-[#E6E9E7] rounded-xl">
                <div className="w-9 h-9 bg-[#016B00]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone size={16} className="text-[#016B00]" />
                </div>
                <div>
                  <p className="text-[#66706C] text-xs mb-0.5">{language === "bn" ? "মোবাইল ২" : "Mobile 2"}</p>
                  <a href={`tel:${schoolData.contact.mobile_2}`} className="text-[#1C2522] hover:text-[#016B00] text-sm font-medium transition-colors">{schoolData.contact.mobile_2}</a>
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#016B00] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#17352F] transition-colors text-sm"
            >
              {language === "bn" ? "যোগাযোগ পাতা" : "Contact Page"}
              <ArrowRight size={15} />
            </Link>
          </div>

          {/* Map placeholder */}
          <div className="bg-white border border-[#E6E9E7] rounded-xl overflow-hidden min-h-64 lg:min-h-auto flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-14 h-14 bg-[#016B00]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin size={28} className="text-[#016B00]" />
              </div>
              <p className="text-[#1C2522] font-semibold mb-1 text-sm">
                {language === "bn" ? "দুলারহাট মাধ্যমিক বিদ্যালয়" : "Dularhat Secondary School"}
              </p>
              <p className="text-[#66706C] text-xs mb-1">
                {language === "bn" ? "দুলারহাট বাজার, চরফ্যাশন, ভোলা" : "Dularhat Bazar, Charfashion, Bhola"}
              </p>
              <p className="text-[#66706C] text-xs mb-5">
                {language === "bn" ? `পোস্ট কোড: ${schoolData.address.postal_code.bengali}` : `Postal Code: ${schoolData.address.postal_code.english}`}
              </p>
              <a
                href={schoolData.address.map_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#016B00] hover:text-[#17352F] text-sm font-medium transition-colors"
              >
                <ExternalLink size={14} />
                {language === "bn" ? "Google Maps-এ দেখুন" : "View on Google Maps"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
