"use client";

import { ImageIcon } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";

const galleryItems = [
  { id: 1, emoji: "🏫", label_bn: "বিদ্যালয় ভবন", label_en: "School Building", album_bn: "পরিচিতি", album_en: "Overview" },
  { id: 2, emoji: "🎓", label_bn: "সমাবর্তন অনুষ্ঠান", label_en: "Graduation Ceremony", album_bn: "অনুষ্ঠান", album_en: "Events" },
  { id: 3, emoji: "📚", label_bn: "শ্রেণিকক্ষ", label_en: "Classroom", album_bn: "অবকাঠামো", album_en: "Infrastructure" },
  { id: 4, emoji: "⚽", label_bn: "ক্রীড়া প্রতিযোগিতা", label_en: "Sports Day", album_bn: "খেলাধুলা", album_en: "Sports" },
  { id: 5, emoji: "🏆", label_bn: "পুরস্কার বিতরণী", label_en: "Award Ceremony", album_bn: "অনুষ্ঠান", album_en: "Events" },
  { id: 6, emoji: "🌳", label_bn: "বিদ্যালয় প্রাঙ্গণ", label_en: "School Grounds", album_bn: "পরিচিতি", album_en: "Overview" },
  { id: 7, emoji: "🎭", label_bn: "সাংস্কৃতিক অনুষ্ঠান", label_en: "Cultural Program", album_bn: "অনুষ্ঠান", album_en: "Events" },
  { id: 8, emoji: "📖", label_bn: "পাঠাগার", label_en: "Library", album_bn: "অবকাঠামো", album_en: "Infrastructure" },
  { id: 9, emoji: "🖥️", label_bn: "কম্পিউটার ল্যাব", label_en: "Computer Lab", album_bn: "অবকাঠামো", album_en: "Infrastructure" },
];

export default function GalleryPage() {
  const { language } = useLanguage();
  return (
    <div>
      <PageHero
        variant="green"
        eyebrow={{ bengali: "গ্যালারি", english: "Gallery" }}
        title={{ bengali: "ফটো গ্যালারি", english: "Photo Gallery" }}
        description={{ bengali: "বিদ্যালয়ের অনুষ্ঠান ও কার্যক্রমের ছবি", english: "Photos of school events and activities" }}
        breadcrumbs={[{ label: { bengali: "গ্যালারি", english: "Gallery" } }]}
        visual={
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {["🏫", "🎓", "⚽", "🎭"].map((e, i) => (
              <div key={i} className={`w-16 h-16 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center text-3xl ${i === 0 ? "rotate-3" : i === 1 ? "-rotate-2" : i === 2 ? "rotate-1" : "-rotate-3"}`}>
                {e}
              </div>
            ))}
          </div>
        }
      />

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <SectionHeading
              eyebrow={language === "bn" ? "সকল ছবি" : "All Photos"}
              title={language === "bn" ? "ফটো সংগ্রহ" : "Photo Collection"}
            />
            <span className="text-sm text-gray-400 self-start mt-1">
              {galleryItems.length} {language === "bn" ? "টি" : "items"}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {galleryItems.map((item) => (
              <div key={item.id} className="group relative bg-[#F5FAF6] border border-[#DDE8DD] rounded-2xl aspect-square flex flex-col items-center justify-center p-4 hover:border-[#006B2D] hover:shadow-md transition-all cursor-pointer">
                <span className="text-5xl mb-2">{item.emoji}</span>
                <p className="text-center text-xs font-semibold text-[#003D1A] leading-tight">{language === "bn" ? item.label_bn : item.label_en}</p>
                <p className="text-xs text-gray-400 mt-0.5">{language === "bn" ? item.album_bn : item.album_en}</p>
                <div className="absolute inset-0 bg-[#006B2D]/85 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                  <span className="text-white text-sm font-semibold flex items-center gap-1.5">
                    <ImageIcon size={15} /> {language === "bn" ? "দেখুন" : "View"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-amber-50 border border-amber-200 rounded-xl p-5 text-center">
            <p className="text-amber-700 text-sm">
              <span className="font-bold">{language === "bn" ? "নোট: " : "Note: "}</span>
              {language === "bn"
                ? "প্রকৃত ছবি প্রশাসনিক প্যানেল থেকে আপলোড করা হবে।"
                : "Actual photos will be uploaded via the admin panel."}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
