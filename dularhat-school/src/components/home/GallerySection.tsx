"use client";

import Link from "next/link";
import { ArrowRight, ImageIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Sample gallery items - in production these come from Supabase
const sampleGalleryImages = [
  { id: 1, placeholder: "🏫", label_bn: "বিদ্যালয় ভবন", label_en: "School Building" },
  { id: 2, placeholder: "🎓", label_bn: "সমাবর্তন অনুষ্ঠান", label_en: "Graduation Ceremony" },
  { id: 3, placeholder: "📚", label_bn: "শ্রেণিকক্ষ", label_en: "Classroom" },
  { id: 4, placeholder: "⚽", label_bn: "ক্রীড়া প্রতিযোগিতা", label_en: "Sports Event" },
  { id: 5, placeholder: "🏆", label_bn: "পুরস্কার বিতরণী", label_en: "Award Ceremony" },
  { id: 6, placeholder: "🌳", label_bn: "বিদ্যালয় প্রাঙ্গণ", label_en: "School Grounds" },
];

export function GallerySection() {
  const { language } = useLanguage();

  return (
    <section className="py-16 bg-gray-50" aria-labelledby="gallery-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-block bg-pink-50 text-pink-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              <ImageIcon size={14} className="inline mr-1.5" aria-hidden="true" />
              {language === "bn" ? "ফটো গ্যালারি" : "Photo Gallery"}
            </span>
            <h2 id="gallery-heading" className="text-2xl sm:text-3xl font-bold text-gray-900">
              {language === "bn" ? "আমাদের গ্যালারি" : "Our Gallery"}
            </h2>
          </div>
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 text-[#016B00] hover:text-[#024D00] font-medium text-sm transition-colors group"
          >
            {language === "bn" ? "সব ছবি দেখুন" : "View All Photos"}
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {sampleGalleryImages.map((img) => (
            <Link
              key={img.id}
              href="/gallery"
              className="group relative bg-white rounded-2xl overflow-hidden aspect-square border border-gray-100 hover:border-[#016B00] transition-colors shadow-sm hover:shadow-md"
            >
              {/* Placeholder - in production replace with actual <Image /> */}
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-6">
                <span className="text-5xl sm:text-6xl mb-3">{img.placeholder}</span>
                <span className="text-center text-sm font-medium text-gray-600">
                  {language === "bn" ? img.label_bn : img.label_en}
                </span>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#016B00]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {language === "bn" ? "বড় করে দেখুন" : "View Image"}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center text-sm text-gray-400">
          {language === "bn"
            ? "গ্যালারি ছবি প্রশাসনিক প্যানেল থেকে আপলোড করা হবে।"
            : "Gallery images will be uploaded via the admin panel."}
        </div>
      </div>
    </section>
  );
}
