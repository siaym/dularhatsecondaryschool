"use client";

import { PageHeader } from "@/components/ui/PageHeader";
import { PageSidebar } from "@/components/ui/PageSidebar";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HistoryPage() {
  const { language } = useLanguage();

  const sectionLinks = [
    { label: language === "bn" ? "বিদ্যালয় পরিচিতি" : "School Overview", href: "/about" },
    { label: language === "bn" ? "ইতিহাস" : "History", href: "/about/history", active: true },
    { label: language === "bn" ? "লক্ষ্য ও উদ্দেশ্য" : "Mission & Vision", href: "/about/mission" },
  ];

  return (
    <div className="bg-white">
      <PageHeader
        title={{ bengali: "বিদ্যালয়ের ইতিহাস", english: "School History" }}
        subtitle={{ bengali: "দুলারহাট মাধ্যমিক বিদ্যালয়ের গৌরবোজ্জ্বল ইতিহাস", english: "The glorious history of Dularhat Secondary School" }}
        breadcrumbs={[
          { label: { bengali: "আমাদের সম্পর্কে", english: "About" }, href: "/about" },
          { label: { bengali: "ইতিহাস", english: "History" } },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            {/* Timeline */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {language === "bn" ? "প্রতিষ্ঠার ইতিহাস" : "History of Establishment"}
              </h2>
              <div className="w-16 h-1 bg-[#016B00] rounded mb-6" />

              <div className="prose prose-gray max-w-none space-y-5 text-gray-600 leading-relaxed">
                {language === "bn" ? (
                  <>
                    <p>
                      দুলারহাট মাধ্যমিক বিদ্যালয় ১লা এপ্রিল ১৯৬৩ সালে প্রতিষ্ঠিত হয়। সেই সময় এটি
                      চরফ্যাশন উপজেলার পশ্চিমাঞ্চলের প্রথম মাধ্যমিক শিক্ষা প্রতিষ্ঠান হিসেবে স্বীকৃতি পায়।
                    </p>
                    <p>
                      নীলকমল ইউনিয়ন পরিষদের তৎকালীন চেয়ারম্যান জনাব মহবুবুর রহমান এই বিদ্যালয়ের
                      প্রতিষ্ঠাতা। শিক্ষার আলো ছড়িয়ে দেওয়ার মহৎ উদ্দেশ্যে তিনি এই বিদ্যালয়টি
                      স্থাপন করেন।
                    </p>
                    <p>
                      বিদ্যালয়ের প্রথম প্রধান শিক্ষক ছিলেন জনাব আরব আলী মিয়া (এম.এ), যিনি তাঁর
                      নিষ্ঠা ও পরিশ্রমের মাধ্যমে বিদ্যালয়টিকে একটি সুদৃঢ় ভিত্তির উপর দাঁড় করিয়েছিলেন।
                    </p>
                    <p>
                      ১৯৬৪ সালের ১লা জানুয়ারি বিদ্যালয়টি আনুষ্ঠানিক স্বীকৃতি লাভ করে এবং বরিশাল
                      শিক্ষা বোর্ডের অধীনে পাঠক্রম পরিচালনা শুরু করে।
                    </p>
                    <p>
                      প্রতিষ্ঠার পর থেকে ছাত্র-ছাত্রী, শিক্ষক, অভিভাবক, এলাকার শিক্ষা অনুরাগী ও
                      সমাজহিতৈষী ব্যক্তিদের আন্তরিক প্রচেষ্টায় এবং সার্বিক সহযোগিতায় বিদ্যালয়টি
                      সুনামের সাথে পরিচালিত হয়ে আসছে।
                    </p>
                    <p>
                      বর্তমানে বিদ্যালয়টি বরিশাল বোর্ডের অধীনে চরফ্যাশন উপজেলার JSC ও SSC পরীক্ষার
                      একটি অনুমোদিত কেন্দ্র। বিদ্যালয়ে চারটি ভবন, একটি বড় গ্যালারি এবং বিশাল
                      খেলার মাঠ রয়েছে। বিদ্যালয়টি দুলারহাট বাজারের মাঝামাঝি স্থানে, বাস স্টেশনের পাশে অবস্থিত।
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Dularhat Secondary School was established on 1st April 1963. At that time, it was
                      recognized as the first secondary educational institution in the western part of
                      Charfashion Upazila.
                    </p>
                    <p>
                      Mr. Mahabubur Rahaman, the then Chairman of Nilkomol Union Council, was the
                      founder of this school. He established the institution with the noble purpose of
                      spreading education to the community.
                    </p>
                    <p>
                      The first headmaster of the school was Mr. Arab Ali Mia (M.A), who built the
                      school on a strong foundation through his dedication and hard work.
                    </p>
                    <p>
                      On 1st January 1964, the school received official recognition and began operating
                      its curriculum under the Barisal Education Board.
                    </p>
                    <p>
                      Since its establishment, the school has been running with great reputation through
                      the sincere efforts and cooperation of students, teachers, guardians, education
                      enthusiasts, and community members.
                    </p>
                    <p>
                      Currently, the school serves as an authorized JSC and SSC examination centre for
                      Charfashion Upazila under the Barisal Board. The school has four buildings, a
                      large gallery hall, and a spacious playground. It is located in the middle of
                      Dularhat Bazar, next to the bus station.
                    </p>
                  </>
                )}
              </div>
            </section>

            {/* Timeline Visual */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {language === "bn" ? "মাইলফলকসমূহ" : "Key Milestones"}
              </h2>
              <div className="relative pl-8 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#016B00]/20">
                {[
                  {
                    year: language === "bn" ? "১৯৬৩" : "1963",
                    event: {
                      bengali: "বিদ্যালয় প্রতিষ্ঠা। জনাব মহবুবুর রহমান কর্তৃক চরফ্যাশনের পশ্চিমাঞ্চলে প্রথম মাধ্যমিক বিদ্যালয় স্থাপিত।",
                      english: "School established by Mr. Mahabubur Rahaman — the first secondary school in western Charfashion.",
                    },
                  },
                  {
                    year: language === "bn" ? "১৯৬৪" : "1964",
                    event: {
                      bengali: "বিদ্যালয় আনুষ্ঠানিক স্বীকৃতি লাভ করে এবং বরিশাল শিক্ষা বোর্ডের অন্তর্ভুক্ত হয়।",
                      english: "School received official recognition and was affiliated with Barisal Education Board.",
                    },
                  },
                  {
                    year: language === "bn" ? "বর্তমান" : "Present",
                    event: {
                      bengali: "JSC ও SSC পরীক্ষার অনুমোদিত কেন্দ্র এবং জেলার অন্যতম শ্রেষ্ঠ বিদ্যাপীঠ।",
                      english: "Authorized JSC and SSC exam centre and one of the best schools in the district.",
                    },
                  },
                ].map((item, i) => (
                  <div key={i} className="relative flex gap-4">
                    <div className="absolute -left-8 mt-1 w-6 h-6 bg-[#016B00] rounded-full flex items-center justify-center flex-shrink-0 z-10">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm flex-1 hover:border-[#016B00]/30 transition-colors">
                      <div className="font-bold text-[#016B00] mb-2 text-lg">{item.year}</div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {language === "bn" ? item.event.bengali : item.event.english}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div>
            <PageSidebar
              sectionLinks={sectionLinks}
              quickLinks={[
                { label: language === "bn" ? "প্রধান শিক্ষক" : "Headmaster", href: "/administration/headmaster" },
                { label: language === "bn" ? "শিক্ষকবৃন্দ" : "Teachers", href: "/teachers" },
                { label: language === "bn" ? "নোটিশ" : "Notices", href: "/notices" },
                { label: language === "bn" ? "যোগাযোগ" : "Contact", href: "/contact" },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
