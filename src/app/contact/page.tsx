"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, ExternalLink, Clock } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";
import { schoolData } from "@/data/school-data";

export default function ContactPage() {
  const { t, language } = useLanguage();

  return (
    <div>
      {/* ── HERO ── */}
      <PageHeader
        title={{ bengali: "যোগাযোগ", english: "Contact Us" }}
        subtitle={{
          bengali: "দুলারহাট মাধ্যমিক বিদ্যালয়, চরফ্যাশন, ভোলা",
          english: "Dularhat Secondary School, Charfashion, Bhola",
        }}
        breadcrumbs={[{ label: { bengali: "যোগাযোগ", english: "Contact" } }]}
      />

      {/* ── SECTION 1 — WHITE: Contact info + styled location panel ── */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10">

            {/* Left: contact info */}
            <div>
              <SectionHeading
                eyebrow={language === "bn" ? "যোগাযোগের তথ্য" : "Contact Info"}
                title={language === "bn" ? "কীভাবে যোগাযোগ করবেন" : "How to Reach Us"}
              />
              <div className="space-y-4">
                {[
                  {
                    icon: <MapPin size={20} className="text-white" />,
                    bg: "bg-[#006B2D]",
                    label: language === "bn" ? "ঠিকানা" : "Address",
                    content: t(schoolData.address),
                    href: undefined,
                  },
                  {
                    icon: <Phone size={20} className="text-white" />,
                    bg: "bg-blue-500",
                    label: language === "bn" ? "মোবাইল" : "Mobile",
                    content: `${schoolData.contact.mobile_1} · ${schoolData.contact.mobile_2}`,
                    href: `tel:${schoolData.contact.mobile_1}`,
                  },
                  {
                    icon: <Mail size={20} className="text-white" />,
                    bg: "bg-purple-500",
                    label: language === "bn" ? "ইমেইল" : "Email",
                    content: schoolData.contact.email,
                    href: `mailto:${schoolData.contact.email}`,
                  },
                  {
                    icon: <Clock size={20} className="text-white" />,
                    bg: "bg-amber-500",
                    label: language === "bn" ? "অফিস সময়" : "Office Hours",
                    content: language === "bn" ? "রবি–বৃহস্পতি · সকাল ৮:০০ – দুপুর ২:০০" : "Sun–Thu · 8:00 AM – 2:00 PM",
                    href: undefined,
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-[#F5FAF6] border border-[#DDE8DD] rounded-xl">
                    <div className={`w-10 h-10 ${item.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm font-medium text-[#003D1A] hover:text-[#006B2D] transition-colors">
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-[#003D1A]">{item.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Styled school location card (NOT empty gray box) */}
            <div className="flex flex-col gap-6">
              <div className="bg-gradient-to-br from-[#006B2D] to-[#003D1A] rounded-2xl p-8 text-white flex-1 flex flex-col items-center justify-center text-center min-h-52">
                {/* Abstract map grid */}
                <div className="relative w-24 h-24 mb-5">
                  {/* Grid lines */}
                  <svg viewBox="0 0 96 96" className="absolute inset-0 w-full h-full opacity-20" aria-hidden="true">
                    {[16,32,48,64,80].map(x => (
                      <line key={x} x1={x} y1="0" x2={x} y2="96" stroke="white" strokeWidth="1"/>
                    ))}
                    {[16,32,48,64,80].map(y => (
                      <line key={y} x1="0" y1={y} x2="96" y2={y} stroke="white" strokeWidth="1"/>
                    ))}
                  </svg>
                  {/* Pin */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 bg-[#F5C400] rounded-full flex items-center justify-center shadow-lg">
                      <MapPin size={20} className="text-[#003D1A]" />
                    </div>
                  </div>
                </div>
                <h3 className="font-bold text-xl text-white mb-1">
                  {language === "bn" ? "দুলারহাট মাধ্যমিক বিদ্যালয়" : "Dularhat Secondary School"}
                </h3>
                <p className="text-green-200 text-sm mb-1">
                  {language === "bn" ? "দুলারহাট বাজার, বাস স্টেশনের পাশে" : "Dularhat Bazar, Near Bus Station"}
                </p>
                <p className="text-green-300 text-sm mb-1">
                  {language === "bn" ? "চরফ্যাশন, ভোলা, বাংলাদেশ" : "Charfashion, Bhola, Bangladesh"}
                </p>
                <p className="text-[#F5C400] text-sm font-semibold">
                  {language === "bn" ? `পোস্ট কোড: ${schoolData.address.postal_code.bengali}` : `Postal Code: ${schoolData.address.postal_code.english}`}
                </p>
                <a
                  href={schoolData.address.map_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 transition-colors text-white px-5 py-2.5 rounded-lg text-sm font-semibold border border-white/20"
                >
                  <ExternalLink size={14} />
                  {language === "bn" ? "Google Maps-এ দেখুন" : "Open in Google Maps"}
                </a>
              </div>

              {/* Quick contact buttons */}
              <div className="grid grid-cols-2 gap-3">
                <a href={`tel:${schoolData.contact.mobile_1}`}
                  className="flex items-center justify-center gap-2 py-3 bg-[#006B2D] text-white rounded-xl text-sm font-semibold hover:bg-[#004D24] transition-colors">
                  <Phone size={15} /> {language === "bn" ? "কল করুন" : "Call Now"}
                </a>
                <a href={`mailto:${schoolData.contact.email}`}
                  className="flex items-center justify-center gap-2 py-3 bg-white border-2 border-[#006B2D] text-[#006B2D] rounded-xl text-sm font-semibold hover:bg-[#F0FAF3] transition-colors">
                  <Mail size={15} /> {language === "bn" ? "ইমেইল" : "Email Us"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2 — LIGHT GREEN: Contact form ── */}
      <section className="bg-[#F0FAF3] py-16 border-t border-[#DDE8DD]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={language === "bn" ? "বার্তা" : "Message"}
            title={language === "bn" ? "আমাদের বার্তা পাঠান" : "Send Us a Message"}
            align="center"
          />
          <form className="bg-white border border-[#DDE8DD] rounded-2xl p-8 space-y-4 shadow-sm">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#003D1A] mb-1.5 uppercase tracking-wide">
                  {language === "bn" ? "আপনার নাম *" : "Your Name *"}
                </label>
                <input type="text" className="w-full px-4 py-2.5 border border-[#DDE8DD] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#006B2D]/20 focus:border-[#006B2D] transition bg-[#F5FAF6]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#003D1A] mb-1.5 uppercase tracking-wide">
                  {language === "bn" ? "ফোন নম্বর" : "Phone Number"}
                </label>
                <input type="tel" className="w-full px-4 py-2.5 border border-[#DDE8DD] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#006B2D]/20 focus:border-[#006B2D] transition bg-[#F5FAF6]" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#003D1A] mb-1.5 uppercase tracking-wide">
                {language === "bn" ? "ইমেইল ঠিকানা *" : "Email Address *"}
              </label>
              <input type="email" className="w-full px-4 py-2.5 border border-[#DDE8DD] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#006B2D]/20 focus:border-[#006B2D] transition bg-[#F5FAF6]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#003D1A] mb-1.5 uppercase tracking-wide">
                {language === "bn" ? "বিষয়" : "Subject"}
              </label>
              <select className="w-full px-4 py-2.5 border border-[#DDE8DD] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#006B2D]/20 focus:border-[#006B2D] transition bg-[#F5FAF6]">
                <option>{language === "bn" ? "বিষয় নির্বাচন করুন" : "Select subject"}</option>
                <option>{language === "bn" ? "ভর্তি সংক্রান্ত" : "About Admission"}</option>
                <option>{language === "bn" ? "ফলাফল সংক্রান্ত" : "About Results"}</option>
                <option>{language === "bn" ? "সাধারণ প্রশ্ন" : "General Inquiry"}</option>
                <option>{language === "bn" ? "অন্যান্য" : "Other"}</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#003D1A] mb-1.5 uppercase tracking-wide">
                {language === "bn" ? "আপনার বার্তা *" : "Your Message *"}
              </label>
              <textarea rows={4} className="w-full px-4 py-2.5 border border-[#DDE8DD] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#006B2D]/20 focus:border-[#006B2D] transition bg-[#F5FAF6] resize-none" />
            </div>
            <button type="submit" className="w-full bg-[#006B2D] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#004D24] transition-colors">
              {language === "bn" ? "বার্তা পাঠান" : "Send Message"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
