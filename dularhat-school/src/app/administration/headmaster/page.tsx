"use client";

import Link from "next/link";
import { GraduationCap, Quote } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HeadmasterPage() {
  const { language } = useLanguage();

  return (
    <div className="bg-white">
      <PageHeader
        title={{ bengali: "প্রধান শিক্ষকের বাণী", english: "Headmaster's Message" }}
        subtitle={{ bengali: "বিদ্যালয়ের প্রধান শিক্ষকের পক্ষ থেকে বিশেষ বার্তা", english: "A special message from the Headmaster of the school" }}
        breadcrumbs={[
          { label: { bengali: "প্রশাসন", english: "Administration" }, href: "/administration" },
          { label: { bengali: "প্রধান শিক্ষকের বাণী", english: "Headmaster's Message" } },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Headmaster Card */}
        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-[#016B00] to-[#024D00] p-8 flex flex-col sm:flex-row items-center gap-6">
            <div className="w-28 h-28 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 border-4 border-white/40 shadow-lg">
              <GraduationCap size={52} className="text-white/80" />
            </div>
            <div className="text-white text-center sm:text-left">
              <div className="text-green-200 text-sm mb-1">
                {language === "bn" ? "দুলারহাট মাধ্যমিক বিদ্যালয়" : "Dularhat Secondary School"}
              </div>
              <h2 className="text-2xl font-bold">
                {language === "bn" ? "প্রধান শিক্ষক" : "Headmaster"}
              </h2>
              <div className="text-green-200 text-sm mt-1">
                {language === "bn" ? "চরফ্যাশন, ভোলা, বাংলাদেশ" : "Charfashion, Bhola, Bangladesh"}
              </div>
            </div>
          </div>

          <div className="p-8">
            <Quote size={36} className="text-green-100 mb-4" />
            <div className="space-y-5 text-gray-600 leading-relaxed text-base">
              {language === "bn" ? (
                <>
                  <p className="font-medium text-gray-800">
                    প্রিয় শিক্ষার্থী, অভিভাবক ও শিক্ষানুরাগী সুধিমণ্ডলী,
                  </p>
                  <p>
                    আপনাদের সকলকে দুলারহাট মাধ্যমিক বিদ্যালয়ের পক্ষ থেকে আন্তরিক স্বাগত ও শুভেচ্ছা জানাই।
                    ১৯৬৩ সাল থেকে এই বিদ্যালয় চরফ্যাশন অঞ্চলের শিক্ষার আলো ছড়িয়ে আসছে।
                  </p>
                  <p>
                    আমাদের বিদ্যালয়ের লক্ষ্য হলো প্রতিটি শিক্ষার্থীকে শুধু পাঠ্যবইয়ের জ্ঞানে নয়,
                    বরং নৈতিক মূল্যবোধ, সৃজনশীলতা ও দেশপ্রেমে সমৃদ্ধ করা। আমরা বিশ্বাস করি যে
                    একজন প্রকৃত শিক্ষার্থী কেবল পরীক্ষায় ভালো ফলাফল করে না, বরং একজন দায়িত্বশীল
                    নাগরিক হিসেবেও নিজেকে গড়ে তোলে।
                  </p>
                  <p>
                    আমাদের শিক্ষকমণ্ডলী অত্যন্ত যোগ্য ও নিবেদিতপ্রাণ। তারা প্রতিটি শিক্ষার্থীর
                    সার্বিক উন্নয়নে নিরলসভাবে কাজ করে যাচ্ছেন। অভিভাবকদের সক্রিয় সহযোগিতা এবং
                    শিক্ষার্থীদের একাগ্রতা মিলে আমরা একটি মানসম্পন্ন শিক্ষা পরিবেশ তৈরি করতে
                    সক্ষম হয়েছি।
                  </p>
                  <p>
                    &ldquo;দক্ষ মানবসম্পদ গড়ে তুলতে আমরা অঙ্গীকারাবদ্ধ&rdquo; — এই প্রতিশ্রুতি নিয়েই
                    আমরা প্রতিদিন কাজ করি। আপনাদের সকলের সহযোগিতা এবং আস্থাই আমাদের এগিয়ে যাওয়ার
                    প্রধান অনুপ্রেরণা।
                  </p>
                </>
              ) : (
                <>
                  <p className="font-medium text-gray-800">
                    Dear students, guardians, and education enthusiasts,
                  </p>
                  <p>
                    On behalf of Dularhat Secondary School, I extend a warm welcome and greetings
                    to all of you. Since 1963, this school has been spreading the light of
                    education throughout the Charfashion region.
                  </p>
                  <p>
                    Our school&apos;s goal is to enrich every student not only with textbook knowledge,
                    but also with ethical values, creativity, and patriotism. We believe that a
                    true student not only achieves good results in exams but also develops into a
                    responsible citizen.
                  </p>
                  <p>
                    Our faculty members are highly qualified and dedicated. They work tirelessly
                    for the overall development of every student. With the active cooperation of
                    guardians and the dedication of students, we have been able to create a
                    quality learning environment.
                  </p>
                  <p>
                    &ldquo;We are committed to developing skilled human resources&rdquo; — with this
                    promise, we work every day. Your cooperation and trust is our primary
                    inspiration to move forward.
                  </p>
                </>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#016B00]/10 rounded-full flex items-center justify-center">
                  <GraduationCap size={22} className="text-[#016B00]" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">
                    {language === "bn" ? "প্রধান শিক্ষক" : "Headmaster"}
                  </p>
                  <p className="text-[#016B00] text-sm">
                    {language === "bn"
                      ? "দুলারহাট মাধ্যমিক বিদ্যালয়"
                      : "Dularhat Secondary School"}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-xs text-gray-400">
                {language === "bn"
                  ? "* প্রধান শিক্ষকের নাম ও ছবি বিদ্যালয় কর্তৃপক্ষ কর্তৃক আপডেট করা হবে।"
                  : "* The headmaster's name and photo will be updated by the school authority."}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation to sibling pages */}
        <div className="flex flex-wrap gap-3">
          <Link href="/administration" className="text-sm text-[#016B00] hover:underline flex items-center gap-1">
            ← {language === "bn" ? "প্রশাসন" : "Administration"}
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/administration/committee" className="text-sm text-[#016B00] hover:underline flex items-center gap-1">
            {language === "bn" ? "ম্যানেজিং কমিটি" : "Managing Committee"} →
          </Link>
        </div>
      </div>
    </div>
  );
}
