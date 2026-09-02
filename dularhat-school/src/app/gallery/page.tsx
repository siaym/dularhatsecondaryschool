"use client";

import { ImageIcon } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";

const galleryItems: any[] = [];

export default function GalleryPage() {
  const { language } = useLanguage();
  return (
    <div>
      <PageHeader
        title={{ bengali: "ফটো গ্যালারি", english: "Photo Gallery" }}
        subtitle={{ bengali: "বিদ্যালয়ের অনুষ্ঠান ও কার্যক্রমের ছবি", english: "Photos of school events and activities" }}
        breadcrumbs={[{ label: { bengali: "গ্যালারি", english: "Gallery" } }]}
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

          {galleryItems.length > 0 ? (
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
          ) : (
            <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center flex flex-col items-center justify-center">
              <ImageIcon size={48} className="text-gray-200 mb-4" />
              <h3 className="text-gray-900 font-semibold mb-2 text-lg">
                {language === "bn" ? "কোনো ছবি নেই" : "No Photos"}
              </h3>
              <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
                {language === "bn"
                  ? "বর্তমানে গ্যালারিতে কোনো ছবি যুক্ত করা হয়নি।"
                  : "No photos have been added to the gallery yet."}
              </p>
            </div>
          )}

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
