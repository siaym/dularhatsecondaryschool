"use client";

import Link from "next/link";
import { GraduationCap, ArrowRight, Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Teacher } from "@/types";
import Image from "next/image";

export function HeadmasterSection({ headmaster }: { headmaster?: Teacher }) {
  const { language } = useLanguage();

  return (
    <section className="py-16 bg-white" aria-labelledby="headmaster-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-[#016B00]/10 text-[#016B00] text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
            {language === "bn" ? "নেতৃত্ব" : "Leadership"}
          </span>
          <h2 id="headmaster-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            {language === "bn" ? "প্রধান শিক্ষকের বাণী" : "Headmaster's Message"}
          </h2>
          <div className="w-16 h-1 bg-[#016B00] mx-auto rounded" />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-[#E6E9E7] overflow-hidden">
            <div className="grid md:grid-cols-3 gap-0">
              {/* Photo/Avatar Column */}
              <div className="bg-gradient-to-b from-[#016B00] to-[#024D00] p-8 flex flex-col items-center justify-center text-white text-center">
                <div className="w-28 h-28 bg-white/20 rounded-full flex items-center justify-center mb-4 border-4 border-white/30 overflow-hidden relative">
                  {headmaster?.photo_url ? (
                    <Image src={headmaster.photo_url} alt={language === "bn" ? headmaster.name_bn : (headmaster.name_en || headmaster.name_bn)} fill className="object-cover" unoptimized />
                  ) : (
                    <GraduationCap size={52} className="text-white/80" />
                  )}
                </div>
                <h3 className="font-bold text-lg mb-1 leading-snug">
                  {headmaster ? (language === "bn" ? headmaster.name_bn : (headmaster.name_en || headmaster.name_bn)) : (language === "bn" ? "প্রধান শিক্ষক" : "Headmaster")}
                </h3>
                {headmaster?.designation_bn && (
                  <p className="text-green-200 text-sm font-medium mb-1">
                    {language === "bn" ? headmaster.designation_bn : (headmaster.designation_en || headmaster.designation_bn)}
                  </p>
                )}
                <p className="text-green-200 text-sm">
                  {language === "bn"
                    ? "দুলারহাট মাধ্যমিক বিদ্যালয়"
                    : "Dularhat Secondary School"}
                </p>
                <div className="mt-4 w-12 h-0.5 bg-white/30" />
                <p className="mt-4 text-green-200 text-xs">
                  {language === "bn"
                    ? "চরফ্যাশন, ভোলা"
                    : "Charfashion, Bhola"}
                </p>
              </div>

              {/* Message Column */}
              <div className="md:col-span-2 p-8">
                <div className="mb-4">
                  <Quote size={32} className="text-green-200" />
                </div>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  {language === "bn" ? (
                    <>
                      <p>
                        প্রিয় শিক্ষার্থী, অভিভাবক ও শিক্ষানুরাগী সুধিমণ্ডলী,
                      </p>
                      <p>
                        দুলারহাট মাধ্যমিক বিদ্যালয়ের পক্ষ থেকে আপনাদের সকলকে
                        স্বাগত জানাই। ১৯৬৩ সাল থেকে এই বিদ্যালয় চরফ্যাশন
                        উপজেলার শিক্ষার আলো ছড়িয়ে আসছে। আমাদের লক্ষ্য হলো
                        প্রতিটি শিক্ষার্থীকে নৈতিক, মানবিক ও বৌদ্ধিকভাবে গড়ে
                        তোলা।
                      </p>
                      <p>
                        আমরা বিশ্বাস করি, মানসম্মত শিক্ষাই পারে একটি জাতিকে
                        এগিয়ে নিতে। তাই দক্ষ মানবসম্পদ গড়ে তুলতে আমরা
                        অঙ্গীকারাবদ্ধ।
                      </p>
                    </>
                  ) : (
                    <>
                      <p>Dear students, guardians, and education enthusiasts,</p>
                      <p>
                        On behalf of Dularhat Secondary School, I welcome you
                        all. Since 1963, this school has been spreading the
                        light of education in Charfashion Upazila. Our goal is
                        to develop every student ethically, humanistically, and
                        intellectually.
                      </p>
                      <p>
                        We believe that quality education is what can advance a
                        nation. Therefore, we are committed to developing skilled
                        human resources.
                      </p>
                    </>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {language === "bn" ? "প্রধান শিক্ষক" : "Headmaster"}
                    </p>
                    <p className="text-[#016B00] text-sm">
                      {language === "bn"
                        ? "দুলারহাট মাধ্যমিক বিদ্যালয়"
                        : "Dularhat Secondary School"}
                    </p>
                  </div>
                  <Link
                    href="/administration/headmaster"
                    className="inline-flex items-center gap-2 text-[#016B00] hover:text-[#024D00] font-medium text-sm transition-colors"
                  >
                    {language === "bn" ? "সম্পূর্ণ পড়ুন" : "Read Full Message"}
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
