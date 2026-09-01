"use client";

import { Phone, Mail, MapPin, ExternalLink, Clock } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { schoolData } from "@/data/school-data";

export default function ContactPage() {
  const { t, language } = useLanguage();

  return (
    <div className="bg-white">
      <PageHeader
        title={{ bengali: "যোগাযোগ", english: "Contact Us" }}
        subtitle={{ bengali: "আমাদের সাথে যোগাযোগ করুন", english: "Get in touch with us" }}
        breadcrumbs={[{ label: { bengali: "যোগাযোগ", english: "Contact" } }]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {language === "bn" ? "যোগাযোগের তথ্য" : "Contact Information"}
            </h2>
            <div className="w-16 h-1 bg-[#016B00] rounded mb-8" />

            <div className="space-y-5">
              <div className="flex items-start gap-4 p-5 bg-green-50 rounded-2xl border border-green-100">
                <div className="w-11 h-11 bg-[#016B00] rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">
                    {language === "bn" ? "ঠিকানা" : "Address"}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t(schoolData.address)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 bg-blue-50 rounded-2xl border border-blue-100">
                <div className="w-11 h-11 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">
                    {language === "bn" ? "মোবাইল নম্বর" : "Mobile Numbers"}
                  </p>
                  <a href={`tel:${schoolData.contact.mobile_1}`} className="block text-blue-600 hover:underline text-sm">
                    {schoolData.contact.mobile_1}
                  </a>
                  <a href={`tel:${schoolData.contact.mobile_2}`} className="block text-blue-600 hover:underline text-sm mt-0.5">
                    {schoolData.contact.mobile_2}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 bg-purple-50 rounded-2xl border border-purple-100">
                <div className="w-11 h-11 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">
                    {language === "bn" ? "ইমেইল" : "Email"}
                  </p>
                  <a href={`mailto:${schoolData.contact.email}`} className="text-purple-600 hover:underline text-sm break-all">
                    {schoolData.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="w-11 h-11 bg-gray-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <ExternalLink size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">
                    {language === "bn" ? "ওয়েবসাইট" : "Website"}
                  </p>
                  <a href={schoolData.contact.website} target="_blank" rel="noopener noreferrer" className="text-[#016B00] hover:underline text-sm">
                    dularhatsecondaryschool.edu.bd
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 bg-yellow-50 rounded-2xl border border-yellow-100">
                <div className="w-11 h-11 bg-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">
                    {language === "bn" ? "অফিস সময়" : "Office Hours"}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {language === "bn"
                      ? "রবিবার – বৃহস্পতিবার: সকাল ৮:০০ – দুপুর ২:০০"
                      : "Sunday – Thursday: 8:00 AM – 2:00 PM"}
                  </p>
                  <p className="text-gray-400 text-xs mt-0.5">
                    {language === "bn" ? "(শুক্রবার ও শনিবার বন্ধ)" : "(Friday & Saturday closed)"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Map + Message Form */}
          <div className="space-y-6">
            {/* Map Placeholder */}
            <div className="bg-gray-100 rounded-2xl min-h-64 flex flex-col items-center justify-center p-8 border border-gray-200">
              <MapPin size={48} className="text-gray-300 mb-4" />
              <p className="font-semibold text-gray-600 mb-1">
                {language === "bn" ? "দুলারহাট মাধ্যমিক বিদ্যালয়" : "Dularhat Secondary School"}
              </p>
              <p className="text-gray-400 text-sm text-center mb-4">
                {language === "bn"
                  ? "দুলারহাট বাজার, বাস স্টেশনের পাশে, চরফ্যাশন, ভোলা"
                  : "Dularhat Bazar, Near Bus Station, Charfashion, Bhola"}
              </p>
              <a
                href="https://www.google.com/maps/search/Dularhat+Secondary+School+Charfashion+Bhola+Bangladesh"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#016B00] hover:underline text-sm font-medium"
              >
                <ExternalLink size={14} />
                {language === "bn" ? "Google Maps-এ দেখুন" : "View on Google Maps"}
              </a>
            </div>

            {/* Message form */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">
                {language === "bn" ? "বার্তা পাঠান" : "Send a Message"}
              </h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder={language === "bn" ? "আপনার নাম *" : "Your name *"}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#016B00]/30 focus:border-[#016B00]"
                />
                <input
                  type="email"
                  placeholder={language === "bn" ? "ইমেইল ঠিকানা *" : "Email address *"}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#016B00]/30 focus:border-[#016B00]"
                />
                <textarea
                  rows={4}
                  placeholder={language === "bn" ? "আপনার বার্তা লিখুন *" : "Write your message *"}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#016B00]/30 focus:border-[#016B00] resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-[#016B00] text-white py-3 rounded-xl font-semibold hover:bg-[#024D00] transition-colors"
                >
                  {language === "bn" ? "পাঠান" : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
