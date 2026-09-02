"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AboutHistoryPage() {
  const { language } = useLanguage();
  return (
    <div>
      <PageHeader
        title={{ bengali: "বিদ্যালয়ের ইতিহাস", english: "School History" }}
        subtitle={{ bengali: "১৯৬৩ সাল থেকে শিক্ষার আলো ছড়িয়ে আসছে দুলারহাট মাধ্যমিক বিদ্যালয়", english: "Spreading the light of education since 1963" }}
        breadcrumbs={[
          { label: { bengali: "আমাদের সম্পর্কে", english: "About" }, href: "/about" },
          { label: { bengali: "ইতিহাস", english: "History" } },
        ]}
      />
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={language === "bn" ? "প্রতিষ্ঠার ইতিহাস" : "Founding History"}
            title={language === "bn" ? "কীভাবে শুরু হয়েছিল" : "How It All Began"}
          />
          <div className="space-y-5 text-gray-700 leading-relaxed text-base mb-14">
            {language === "bn" ? (
              <>
                <p>দুলারহাট মাধ্যমিক বিদ্যালয় ১লা এপ্রিল ১৯৬৩ সালে প্রতিষ্ঠিত হয়। সেই সময় এটি চরফ্যাশন উপজেলার পশ্চিমাঞ্চলের প্রথম মাধ্যমিক শিক্ষা প্রতিষ্ঠান হিসেবে স্বীকৃতি পায়।</p>
                <p>নীলকমল ইউনিয়ন পরিষদের তৎকালীন চেয়ারম্যান জনাব মহবুবুর রহমান এই বিদ্যালয়ের প্রতিষ্ঠাতা। শিক্ষার আলো ছড়িয়ে দেওয়ার মহৎ উদ্দেশ্যে তিনি এই বিদ্যালয়টি স্থাপন করেন।</p>
                <p>বিদ্যালয়ের প্রথম প্রধান শিক্ষক ছিলেন জনাব আরব আলী মিয়া (এম.এ), যিনি তাঁর নিষ্ঠা ও পরিশ্রমের মাধ্যমে বিদ্যালয়টিকে একটি সুদৃঢ় ভিত্তির উপর দাঁড় করিয়েছিলেন।</p>
                <p>১৯৬৪ সালের ১লা জানুয়ারি বিদ্যালয়টি আনুষ্ঠানিক স্বীকৃতি লাভ করে এবং বরিশাল শিক্ষা বোর্ডের অধীনে পাঠক্রম পরিচালনা শুরু করে।</p>
                <p>বর্তমানে বিদ্যালয়টি বরিশাল বোর্ডের অধীনে চরফ্যাশন উপজেলার JSC ও SSC পরীক্ষার একটি অনুমোদিত কেন্দ্র।</p>
              </>
            ) : (
              <>
                <p>Dularhat Secondary School was established on 1st April 1963. It became the first secondary educational institution in the western part of Charfashion Upazila.</p>
                <p>Mr. Mahabubur Rahaman, the then Chairman of Nilkomol Union Council, founded this school with the noble purpose of spreading education to the community.</p>
                <p>The first headmaster was Mr. Arab Ali Mia (M.A), who built the school on a strong foundation through his dedication and hard work.</p>
                <p>On 1st January 1964, the school received official recognition and began operating under the Barisal Education Board.</p>
                <p>Today, it serves as an authorized JSC and SSC examination centre for Charfashion Upazila.</p>
              </>
            )}
          </div>

          {/* Timeline */}
          <SectionHeading
            eyebrow={language === "bn" ? "মাইলফলক" : "Milestones"}
            title={language === "bn" ? "গুরুত্বপূর্ণ সালসমূহ" : "Key Years"}
          />
          <div className="relative pl-8 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#DDE8DD]">
            {[
              { year: language === "bn" ? "১৯৬৩" : "1963", event_bn: "বিদ্যালয় প্রতিষ্ঠা। চরফ্যাশনের পশ্চিমাঞ্চলে প্রথম মাধ্যমিক বিদ্যালয় স্থাপিত।", event_en: "School established — first secondary school in western Charfashion." },
              { year: language === "bn" ? "১৯৬৪" : "1964", event_bn: "বরিশাল শিক্ষা বোর্ডের আনুষ্ঠানিক স্বীকৃতি প্রাপ্তি।", event_en: "Official recognition from Barisal Education Board." },
              { year: language === "bn" ? "বর্তমান" : "Present", event_bn: "JSC ও SSC পরীক্ষার অনুমোদিত কেন্দ্র এবং জেলার অন্যতম শ্রেষ্ঠ বিদ্যাপীঠ।", event_en: "Authorized JSC and SSC exam centre, one of the best schools in the district." },
            ].map((item, i) => (
              <div key={i} className="relative flex gap-4">
                <div className="absolute -left-8 mt-1 w-6 h-6 bg-[#006B2D] rounded-full flex items-center justify-center z-10">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
                <div className="bg-[#F5FAF6] border border-[#DDE8DD] rounded-xl p-5 flex-1 hover:border-[#006B2D]/30 transition-colors">
                  <div className="font-bold text-[#006B2D] mb-1.5">{item.year}</div>
                  <p className="text-gray-600 text-sm">{language === "bn" ? item.event_bn : item.event_en}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F0FAF3] py-12 border-t border-[#DDE8DD]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#003D1A] font-bold text-lg mb-1">{language === "bn" ? "প্রতিষ্ঠার পর থেকে ৬০+ বছর" : "60+ Years Since Founding"}</p>
          <p className="text-[#4A6B4A] text-sm">{language === "bn" ? "দক্ষ মানবসম্পদ গড়ে তুলতে আমরা অঙ্গীকারাবদ্ধ।" : "We are committed to developing skilled human resources."}</p>
        </div>
      </section>
    </div>
  );
}
