'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ImageIcon, X } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useLanguage } from '@/contexts/LanguageContext'
import { GalleryItem } from '@/types'

export function GalleryClient({ items }: { items: GalleryItem[] }) {
  const { language } = useLanguage()
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <SectionHeading
            eyebrow={language === 'bn' ? 'সকল ছবি' : 'All Photos'}
            title={language === 'bn' ? 'ফটো সংগ্রহ' : 'Photo Collection'}
          />
          <span className="text-sm text-gray-400 self-start mt-1">
            {items.length} {language === 'bn' ? 'টি' : 'items'}
          </span>
        </div>

        {items.length > 0 ? (
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
            {items.map((item) => (
              <div 
                key={item.id} 
                className="group relative rounded-xl overflow-hidden cursor-pointer bg-gray-100 break-inside-avoid shadow-sm hover:shadow-md transition-shadow"
                onClick={() => setSelectedImage(item)}
              >
                <div className="relative w-full" style={{ paddingBottom: '100%' }}>
                  <Image 
                    src={item.image_url} 
                    alt={language === 'bn' ? item.title_bn : (item.title_en || item.title_bn)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    unoptimized
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <p className="text-white font-medium text-sm line-clamp-2">
                    {language === 'bn' ? item.title_bn : (item.title_en || item.title_bn)}
                  </p>
                  <p className="text-white/80 text-xs mt-1 capitalize">{item.category}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center flex flex-col items-center justify-center">
            <ImageIcon size={48} className="text-gray-200 mb-4" />
            <h3 className="text-gray-900 font-semibold mb-2 text-lg">
              {language === 'bn' ? 'কোনো ছবি নেই' : 'No Photos'}
            </h3>
            <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
              {language === 'bn'
                ? 'বর্তমানে গ্যালারিতে কোনো ছবি যুক্ত করা হয়নি।'
                : 'No photos have been added to the gallery yet.'}
            </p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-50"
            onClick={() => setSelectedImage(null)}
          >
            <X size={24} />
          </button>
          
          <div className="relative w-full h-full max-w-5xl max-h-[85vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full flex-1 min-h-0 flex items-center justify-center">
              <Image 
                src={selectedImage.image_url} 
                alt={language === 'bn' ? selectedImage.title_bn : (selectedImage.title_en || selectedImage.title_bn)}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <div className="mt-4 text-center">
              <h4 className="text-white text-lg font-medium">
                {language === 'bn' ? selectedImage.title_bn : (selectedImage.title_en || selectedImage.title_bn)}
              </h4>
              <p className="text-white/70 text-sm capitalize mt-1">
                {selectedImage.category}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
