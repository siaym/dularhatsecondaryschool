"use client";

import Link from "next/link";
import { ArrowRight, GraduationCap, Quote } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HeadmasterPage() {
  const { language } = useLanguage();

  return (
    <div>
      <PageHero
        variant="dark"
        eyebrow={{ bengali: "প্রশাসন", english: "Administration" }}
        title={{ bengali: "প্রধান শিক্ষকের বাণী", english: "Headmaster's Message" }}
        description={{ bengali: "বিদ্যালয়ের প্রধান শিক্ষকের পক্ষ থেকে বিশেষ বার্তা", english: "A special message from the Headmaster" }}
        breadcrumbs={[
          { label: { bengali: "প্রশাসন", english: "Administration" }, href: "/administration" },
          { label: { bengali: "প্রধান শিক্ষক", english: "Headmaster" } },
        ]}
        visual={
          <div className="flex items-center justify-center">
            <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center border-4 border-white/20">
              <GraduationCap size={60} className="text-white/60" />
            </div>
          </div>
        }
      />

      {/* Message */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Portrait + name */}
            <div className="flex flex-col items-center text-center">
              <div className="w-40 h-40 bg-[#F0FAF3] border-4 border-[#DDE8DD] rounded-full flex items-center justify-center mb-4">
                <GraduationCap size={72} className="text-[#006B2D]/30" />
              </div>
              <div className="bg-[#006B2D] text-white px-6 py-3 rounded-xl w-full">
                <p className="font-bold text-base">{language === "bn" ? "প্রধান শিক্ষক" : "Headmaster"}</p>
                <p className="text-green-200 text-xs mt-0.5">
                  {language === "bn" ? "দুলারহাট মাধ্যমিক বিদ্যালয়" : "Dularhat Secondary School"}
                </p>
              </div>
              <p className="text-xs text-gray-400 mt-3 text-center">
                {language === "bn"
                  ? "* নাম ও ছবি কর্তৃপক্ষ কর্তৃক আপডেট করা হবে।"
                  : "* Name & photo will be updated by authority."}
              </p>
            </div>

            {/* Message body */}
            <div className="lg:col-span-2">
              <Quote size={36} className="text-[#006B2D]/15 mb-4" />
              <div className="space-y-5 text-gray-700 leading-relaxed text-base">
                {language === "bn" ? (
                  <>
                    <p className="font-semibold text-[#003D1A]">প্রিয় শিক্ষার্থী, অভিভাবক ও শিক্ষানুরাগী সুধিমণ্ডলী,</p>
                    <p>আপনাদের সকলকে দুলারহাট মাধ্যমিক বিদ্যালয়ের পক্ষ থেকে আন্তরিক স্বাগত ও শুভেচ্ছা জানাই। ১৯৬৩ সাল থেকে এই বিদ্যালয় চরফ্যাশন অঞ্চলের শিক্ষার আলো ছড়িয়ে আসছে।</p>
                    <p>আমাদের বিদ্যালয়ের লক্ষ্য হলো প্রতিটি শিক্ষার্থীকে শুধু পাঠ্যবইয়ের জ্ঞানে নয়, বরং নৈতিক মূল্যবোধ, সৃজনশীলতা ও দেশপ্রেমে সমৃদ্ধ করা।</p>
                    <p>আমাদের শিক্ষকমণ্ডলী অত্যন্ত যোগ্য ও নিবেদিতপ্রাণ। তারা প্রতিটি শিক্ষার্থীর সার্বিক উন্নয়নে নিরলসভাবে কাজ করে যাচ্ছেন।</p>
                    <p>&ldquo;দক্ষ মানবসম্পদ গড়ে তুলতে আমরা অঙ্গীকারাবদ্ধ&rdquo; — এই প্রতিশ্রুতি নিয়েই আমরা প্রতিদিন কাজ করি।</p>
                  </>
                ) : (
                  <>
                    <p className="font-semibold text-[#003D1A]">Dear students, guardians, and education enthusiasts,</p>
                    <p>On behalf of Dularhat Secondary School, I extend a warm welcome and greetings to all of you. Since 1963, this school has been spreading the light of education throughout the Charfashion region.</p>
                    <p>Our goal is to enrich every student not only with textbook knowledge, but also with ethical values, creativity, and patriotism.</p>
                    <p>Our faculty members are highly qualified and dedicated. They work tirelessly for the overall development of every student.</p>
                    <p>&ldquo;We are committed to developing skilled human resources&rdquo; — with this promise, we work every day.</p>
                  </>
                )}
              </div>
              <div className="mt-8 pt-6 border-t border-[#DDE8DD]">
                <p className="text-xs text-gray-400">— {language === "bn" ? "প্রধান শিক্ষক, দুলারহাট মাধ্যমিক বিদ্যালয়" : "Headmaster, Dularhat Secondary School"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership values */}
      <section className="bg-[#F0FAF3] py-14 border-t border-[#DDE8DD]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={language === "bn" ? "নেতৃত্বের মূল্যবোধ" : "Leadership Values"}
            title={language === "bn" ? "আমাদের শিক্ষা দর্শন" : "Our Educational Philosophy"}
            align="center"
          />
          <div className="grid sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {[
              { icon: "🎯", bn: "লক্ষ্যভিত্তিক শিক্ষা", en: "Goal-Oriented Learning" },
              { icon: "🤝", bn: "নৈতিক মূল্যবোধ", en: "Ethical Values" },
              { icon: "💡", bn: "সৃজনশীল চিন্তা", en: "Creative Thinking" },
            ].map((v, i) => (
              <div key={i} className="bg-white border border-[#DDE8DD] rounded-2xl p-5 text-center">
                <span className="text-4xl block mb-3">{v.icon}</span>
                <p className="font-bold text-[#003D1A] text-sm">{language === "bn" ? v.bn : v.en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
