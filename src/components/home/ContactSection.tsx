"use client";

import Link from "next/link";
import { MapPin, Phone, Mail, ExternalLink, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { schoolData } from "@/data/school-data";

export function ContactSection() {
  const { t, language } = useLanguage();

  return (
    <section className="py-16 bg-white" aria-labelledby="contact-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block bg-teal-50 text-teal-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
            {language === "bn" ? "যোগাযোগ" : "Get in Touch"}
          </span>
          <h2 id="contact-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            {language === "bn" ? "আমাদের সাথে যোগাযোগ করুন" : "Contact Us"}
          </h2>
          <div className="w-16 h-1 bg-[#016B00] mx-auto rounded" />
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Details */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">
              {language === "bn" ? "যোগাযোগের তথ্য" : "Contact Information"}
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-5 bg-green-50 rounded-2xl">
                <div className="w-10 h-10 bg-[#016B00] rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">
                    {language === "bn" ? "ঠিকানা" : "Address"}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-1">
                    {t(schoolData.address)}
                  </p>
                  <p className="text-[#016B00] font-semibold text-sm mb-2">
                    {language === "bn" ? `পোস্ট কোড: ${schoolData.address.postal_code.bengali}` : `Postal Code: ${schoolData.address.postal_code.english}`}
                  </p>
                  <a
                    href={schoolData.address.map_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-[#016B00] hover:bg-[#014D00] px-3 py-1.5 rounded-lg transition-colors"
                  >
                    {language === "bn" ? "ম্যাপে দেখুন" : "View on Map"} <ExternalLink size={12} />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 bg-blue-50 rounded-2xl">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">
                    {language === "bn" ? "মোবাইল" : "Mobile"}
                  </p>
                  <a
                    href={`tel:${schoolData.contact.mobile_1}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    {schoolData.contact.mobile_1}
                  </a>
                  <br />
                  <a
                    href={`tel:${schoolData.contact.mobile_2}`}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    {schoolData.contact.mobile_2}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 bg-purple-50 rounded-2xl">
                <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">
                    {language === "bn" ? "ইমেইল" : "Email"}
                  </p>
                  <a
                    href={`mailto:${schoolData.contact.email}`}
                    className="text-purple-600 hover:underline text-sm break-all"
                  >
                    {schoolData.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl">
                <div className="w-10 h-10 bg-gray-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <ExternalLink size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">
                    {language === "bn" ? "ওয়েবসাইট" : "Website"}
                  </p>
                  <a
                    href={schoolData.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#016B00] hover:underline text-sm"
                  >
                    dularhatsecondaryschool.edu.bd
                  </a>
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#016B00] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#024D00] transition-colors"
            >
              {language === "bn" ? "যোগাযোগ পাতা" : "Contact Page"}
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Map Embed Placeholder */}
          <div className="bg-gray-100 rounded-2xl overflow-hidden min-h-64 lg:min-h-auto flex items-center justify-center">
            <div className="text-center p-8">
              <MapPin size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium mb-2">
                {language === "bn"
                  ? "দুলারহাট মাধ্যমিক বিদ্যালয়"
                  : "Dularhat Secondary School"}
              </p>
              <p className="text-gray-400 text-sm mb-1">
                {language === "bn"
                  ? "দুলারহাট বাজার, চরফ্যাশন, ভোলা"
                  : "Dularhat Bazar, Charfashion, Bhola"}
              </p>
              <p className="text-gray-400 text-sm font-semibold mb-4">
                {language === "bn" ? `পোস্ট কোড: ${schoolData.address.postal_code.bengali}` : `Postal Code: ${schoolData.address.postal_code.english}`}
              </p>
              <a
                href={schoolData.address.map_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#016B00] hover:underline text-sm font-medium"
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
