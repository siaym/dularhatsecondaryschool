"use client";

import Link from "next/link";
import { ImageIcon } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { useLanguage } from "@/contexts/LanguageContext";

const galleryItems = [
  { id: 1, placeholder: "🏫", label_bn: "বিদ্যালয় ভবন", label_en: "School Building", album_bn: "বিদ্যালয় পরিচিতি", album_en: "School Overview" },
  { id: 2, placeholder: "🎓", label_bn: "সমাবর্তন অনুষ্ঠান", label_en: "Graduation Ceremony", album_bn: "অনুষ্ঠান", album_en: "Events" },
  { id: 3, placeholder: "📚", label_bn: "শ্রেণিকক্ষ", label_en: "Classroom", album_bn: "অবকাঠামো", album_en: "Infrastructure" },
  { id: 4, placeholder: "⚽", label_bn: "ক্রীড়া প্রতিযোগিতা", label_en: "Sports Event", album_bn: "খেলাধুলা", album_en: "Sports" },
  { id: 5, placeholder: "🏆", label_bn: "পুরস্কার বিতরণী", label_en: "Award Ceremony", album_bn: "অনুষ্ঠান", album_en: "Events" },
  { id: 6, placeholder: "🌳", label_bn: "বিদ্যালয় প্রাঙ্গণ", label_en: "School Grounds", album_bn: "বিদ্যালয় পরিচিতি", album_en: "School Overview" },
  { id: 7, placeholder: "🎭", label_bn: "সাংস্কৃতিক অনুষ্ঠান", label_en: "Cultural Program", album_bn: "অনুষ্ঠান", album_en: "Events" },
  { id: 8, placeholder: "📖", label_bn: "পাঠাগার", label_en: "Library", album_bn: "অবকাঠামো", album_en: "Infrastructure" },
  { id: 9, placeholder: "🖥️", label_bn: "কম্পিউটার ল্যাব", label_en: "Computer Lab", album_bn: "অবকাঠামো", album_en: "Infrastructure" },
];

export default function GalleryPage() {
  const { language } = useLanguage();

  return (
    <div className="bg-white">
      <PageHeader
        title={{ bengali: "ফটো গ্যালারি", english: "Photo Gallery" }}
        subtitle={{ bengali: "বিদ্যালয়ের বিভিন্ন অনুষ্ঠান ও কার্যক্রমের ছবি", english: "Photos of school events and activities" }}
        breadcrumbs={[{ label: { bengali: "গ্যালারি", english: "Gallery" } }]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {language === "bn" ? "সকল ছবি" : "All Photos"}
            </h2>
            <div className="w-16 h-1 bg-[#016B00] rounded mt-2" />
          </div>
          <span className="text-sm text-gray-400">
            {galleryItems.length} {language === "bn" ? "টি ছবি" : "photos"}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="group relative bg-gradient-to-br from-green-50 to-green-100 rounded-2xl aspect-square flex flex-col items-center justify-center p-4 border border-gray-100 hover:border-[#016B00] hover:shadow-md transition-all cursor-pointer"
            >
              <span className="text-5xl mb-3">{item.placeholder}</span>
              <span className="text-center text-xs font-medium text-gray-600 leading-tight">
                {language === "bn" ? item.label_bn : item.label_en}
              </span>
              <span className="mt-1 text-xs text-gray-400">
                {language === "bn" ? item.album_bn : item.album_en}
              </span>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#016B00]/80 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                <span className="text-white text-sm font-medium flex items-center gap-1.5">
                  <ImageIcon size={16} />
                  {language === "bn" ? "দেখুন" : "View"}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-center">
          <p className="text-amber-700 text-sm">
            <span className="font-bold">{language === "bn" ? "নোট: " : "Note: "}</span>
            {language === "bn"
              ? "প্রকৃত গ্যালারি ছবি বিদ্যালয়ের প্রশাসনিক প্যানেল থেকে আপলোড করা হবে। বর্তমান ছবিগুলো শুধু বিভাগ প্রদর্শনের জন্য।"
              : "Actual gallery photos will be uploaded via the school admin panel. Current cards show category placeholders only."}
          </p>
        </div>
      </div>
    </div>
  );
}
