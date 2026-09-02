"use client";

import Link from "next/link";
import { Camera, Image as ImageIcon, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { GalleryItem } from "@/types";

import Image from "next/image";

export function GallerySection({ items = [] }: { items?: GalleryItem[] }) {
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
        {items.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {items.slice(0, 6).map((img) => (
              <Link
                key={img.id}
                href="/gallery"
                className="group relative bg-white rounded-2xl overflow-hidden aspect-square border border-gray-100 hover:border-[#016B00] transition-colors shadow-sm hover:shadow-md"
              >
                <Image
                  src={img.image_url}
                  alt={language === "bn" ? img.title_bn : (img.title_en || img.title_bn)}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 33vw"
                  unoptimized
                />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#016B00]/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 text-center">
                  <span className="text-white font-medium text-sm line-clamp-2">
                    {language === "bn" ? img.title_bn : (img.title_en || img.title_bn)}
                  </span>
                </div>
              </Link>
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

        <div className="mt-6 text-center text-sm text-gray-400">
          {language === "bn"
            ? "গ্যালারি ছবি প্রশাসনিক প্যানেল থেকে আপলোড করা হবে।"
            : "Gallery images will be uploaded via the admin panel."}
        </div>
      </div>
    </section>
  );
}
