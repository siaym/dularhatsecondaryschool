"use client";

import Link from "next/link";
import { Image as ImageIcon, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { GalleryItem } from "@/types";
import Image from "next/image";

export function GallerySection({ items = [] }: { items?: GalleryItem[] }) {
  const { language } = useLanguage();
  const featured = items[0];
  const rest = items.slice(1, 5);

  return (
    <section className="py-16 bg-white" aria-labelledby="gallery-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="inline-block bg-[#016B00]/10 text-[#016B00] text-sm font-semibold px-4 py-1.5 rounded-full mb-3">
              <ImageIcon size={14} className="inline mr-1.5" aria-hidden="true" />
              {language === "bn" ? "ফটো গ্যালারি" : "Photo Gallery"}
            </span>
            <h2 id="gallery-heading" className="text-2xl sm:text-3xl font-bold text-[#17201D]">
              {language === "bn" ? "আমাদের গ্যালারি" : "Our Gallery"}
            </h2>
          </div>
          <Link href="/gallery" className="inline-flex items-center gap-2 text-[#016B00] hover:text-[#12352F] font-medium text-sm transition-colors group">
            {language === "bn" ? "সব ছবি দেখুন" : "View All Photos"}
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {/* Featured large image — spans 2 cols on sm+ */}
            {featured && (
              <Link
                href="/gallery"
                className="group relative bg-white rounded-2xl overflow-hidden sm:col-span-2 sm:row-span-2 aspect-video sm:aspect-square border border-[#DDE5E1] hover:border-[#016B00]/60 transition-colors shadow-sm hover:shadow-md"
              >  <Image src={featured.image_url}
                  alt={language === "bn" ? featured.title_bn : (featured.title_en || featured.title_bn)}
                  fill className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12352F]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                  <span className="text-white font-semibold text-sm line-clamp-2">
                    {language === "bn" ? featured.title_bn : (featured.title_en || featured.title_bn)}
                  </span>
                </div>
              </Link>
            )}
            {rest.map((img) => (
              <Link key={img.id} href="/gallery"
                className="group relative bg-white rounded-xl overflow-hidden aspect-video sm:aspect-square border border-[#DDE5E1] hover:border-[#016B00]/60 transition-colors shadow-sm hover:shadow-md">
                <Image src={img.image_url}
                  alt={language === "bn" ? img.title_bn : (img.title_en || img.title_bn)}
                  fill className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw" unoptimized />
                <div className="absolute inset-0 bg-[#12352F]/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3 text-center">
                  <span className="text-white font-medium text-xs line-clamp-2">
                    {language === "bn" ? img.title_bn : (img.title_en || img.title_bn)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-[#DDE5E1] rounded-2xl p-12 text-center flex flex-col items-center justify-center">
            <ImageIcon size={48} className="text-gray-200 mb-4" />
            <h3 className="text-[#17201D] font-semibold mb-2 text-lg">
              {language === "bn" ? "কোনো ছবি নেই" : "No Photos"}
            </h3>
            <p className="text-[#64716C] text-sm max-w-sm mx-auto leading-relaxed">
              {language === "bn" ? "বর্তমানে গ্যালারিতে কোনো ছবি যুক্ত করা হয়নি।" : "No photos have been added to the gallery yet."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
