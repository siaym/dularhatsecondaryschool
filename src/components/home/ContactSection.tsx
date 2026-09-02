"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, ExternalLink, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { schoolData } from "@/data/school-data";

export function ContactSection() {
  const { t, language } = useLanguage();

  return (
    <section className="py-16 bg-[#12352F]" aria-labelledby="contact-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-white/10 text-green-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-3 border border-white/20">
            {language === "bn" ? "যোগাযোগ" : "Get in Touch"}
          </span>
          <h2 id="contact-heading" className="text-2xl sm:text-3xl font-bold text-white mb-3">
            {language === "bn" ? "আমাদের সাথে যোগাযোগ করুন" : "Contact Us"}
          </h2>
          <div className="w-16 h-1 bg-green-400 mx-auto rounded" />
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-white">
              {language === "bn" ? "যোগাযোগের তথ্য" : "Contact Information"}
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-5 bg-white/10 border border-white/10 rounded-2xl">
                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">
                    {language === "bn" ? "ঠিকানা" : "Address"}
                  </p>
                  <p className="text-green-200 text-sm leading-relaxed mb-1">{t(schoolData.address)}</p>
                  <p className="text-green-300 font-semibold text-sm mb-2">
                    {language === "bn" ? `পোস্ট কোড: ${schoolData.address.postal_code.bengali}` : `Postal Code: ${schoolData.address.postal_code.english}`}
                  </p>
                  <a href={schoolData.address.map_url} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#12352F] bg-green-400 hover:bg-green-300 px-3 py-1.5 rounded-lg transition-colors">
                    {language === "bn" ? "ম্যাপে দেখুন" : "View on Map"} <ExternalLink size={12} />
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4 p-5 bg-white/10 border border-white/10 rounded-2xl">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">{language === "bn" ? "মোবাইল" : "Mobile"}</p>
                  <a href={`tel:${schoolData.contact.mobile_1}`} className="text-green-300 hover:text-white text-sm transition-colors">{schoolData.contact.mobile_1}</a>
                  <br />
                  <a href={`tel:${schoolData.contact.mobile_2}`} className="text-green-300 hover:text-white text-sm transition-colors">{schoolData.contact.mobile_2}</a>
                </div>
              </div>
              <div className="flex items-center gap-4 p-5 bg-white/10 border border-white/10 rounded-2xl">
                <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">{language === "bn" ? "ইমেইল" : "Email"}</p>
                  <a href={`mailto:${schoolData.contact.email}`} className="text-green-300 hover:text-white text-sm break-all transition-colors">{schoolData.contact.email}</a>
                </div>
              </div>
              <div className="flex items-center gap-4 p-5 bg-white/10 border border-white/10 rounded-2xl">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <ExternalLink size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white mb-1">{language === "bn" ? "ওয়েবসাইট" : "Website"}</p>
                  <a href={schoolData.contact.website} target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-white text-sm transition-colors">dularhatsecondaryschool.edu.bd</a>
                </div>
              </div>
            </div>
            <Link href="/contact"
              className="inline-flex items-center gap-2 bg-green-400 text-[#12352F] px-6 py-3 rounded-lg font-semibold hover:bg-green-300 transition-colors">
              {language === "bn" ? "যোগাযোগ পাতা" : "Contact Page"}
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden min-h-64 lg:min-h-auto flex items-center justify-center">
            <div className="text-center p-8">
              <MapPin size={48} className="text-green-400 mx-auto mb-4" />
              <p className="text-white font-semibold mb-2">
                {language === "bn" ? "দুলারহাট মাধ্যমিক বিদ্যালয়" : "Dularhat Secondary School"}
              </p>
              <p className="text-green-300 text-sm mb-1">
                {language === "bn" ? "দুলারহাট বাজার, চরফ্যাশন, ভোলা" : "Dularhat Bazar, Charfashion, Bhola"}
              </p>
              <p className="text-green-300 text-sm font-semibold mb-4">
                {language === "bn" ? `পোস্ট কোড: ${schoolData.address.postal_code.bengali}` : `Postal Code: ${schoolData.address.postal_code.english}`}
              </p>
              <a href={schoolData.address.map_url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 text-sm font-medium transition-colors">
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
