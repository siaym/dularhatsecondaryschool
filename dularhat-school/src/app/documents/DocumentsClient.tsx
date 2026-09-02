'use client'

import { useState } from 'react'
import { DocumentItem } from '@/types'
import { useLanguage } from '@/contexts/LanguageContext'
import { FileText, Download, FolderOpen, Search, ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function DocumentsClient({ initialDocuments }: { initialDocuments: DocumentItem[] }) {
  const { language } = useLanguage()
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    { id: 'all', bn: 'সকল', en: 'All' },
    { id: 'admission', bn: 'ভর্তি', en: 'Admission' },
    { id: 'routine', bn: 'রুটিন', en: 'Routine' },
    { id: 'syllabus', bn: 'সিলেবাস', en: 'Syllabus' },
    { id: 'examination', bn: 'পরীক্ষা', en: 'Examination' },
    { id: 'academic', bn: 'একাডেমিক', en: 'Academic' },
    { id: 'forms', bn: 'ফরম', en: 'Forms' },
    { id: 'other', bn: 'অন্যান্য', en: 'Other' },
  ]

  const filteredDocuments = initialDocuments.filter(doc => {
    const matchesCategory = activeCategory === 'all' || doc.category === activeCategory
    const searchLower = searchQuery.toLowerCase()
    const matchesSearch = 
      (doc.title_bn && doc.title_bn.toLowerCase().includes(searchLower)) ||
      (doc.title_en && doc.title_en.toLowerCase().includes(searchLower)) ||
      (doc.description_bn && doc.description_bn.toLowerCase().includes(searchLower)) ||
      (doc.description_en && doc.description_en.toLowerCase().includes(searchLower))

    return matchesCategory && matchesSearch
  })

  const formatFileSize = (bytes: number | null) => {
    if (!bytes || bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileExtension = (filename: string | null) => {
    if (!filename) return 'DOC'
    const ext = filename.split('.').pop()?.toUpperCase()
    return ext || 'DOC'
  }

  return (
    <section className="bg-[#F8FAF9] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-10 flex flex-col lg:flex-row gap-6 justify-between items-center">
          <div className="w-full lg:w-1/3 relative">
            <input 
              type="text" 
              placeholder={language === 'bn' ? 'ডকুমেন্ট খুঁজুন...' : 'Search documents...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#016B00]/50 focus:border-[#016B00] outline-none transition-all"
            />
            <Search className="absolute left-3.5 top-3.5 text-gray-400" size={20} />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-[#016B00] text-white shadow-md shadow-[#016B00]/20'
                    : 'bg-gray-50 text-gray-600 hover:bg-green-50 hover:text-[#016B00] border border-gray-200'
                }`}
              >
                {language === 'bn' ? cat.bn : cat.en}
              </button>
            ))}
          </div>
        </div>

        {/* Document Grid */}
        {filteredDocuments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredDocuments.map((doc) => (
              <a 
                key={doc.id}
                href={doc.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-[#016B00]/30 transition-all duration-300 flex flex-col h-full"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center text-[#016B00] flex-shrink-0 group-hover:scale-110 group-hover:bg-[#016B00] group-hover:text-white transition-all duration-300">
                    <FileText size={28} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#016B00] transition-colors line-clamp-2 leading-snug">
                      {language === 'bn' ? doc.title_bn : (doc.title_en || doc.title_bn)}
                    </h3>
                    <div className="flex items-center gap-3 mt-2 text-xs font-medium text-gray-500">
                      <span className="bg-gray-100 px-2.5 py-1 rounded-md uppercase">
                        {getFileExtension(doc.file_name)}
                      </span>
                      <span>{formatFileSize(doc.file_size)}</span>
                      <span className="capitalize">{doc.category}</span>
                    </div>
                  </div>
                </div>
                
                {doc.description_bn || doc.description_en ? (
                  <p className="text-sm text-gray-600 line-clamp-2 flex-grow mb-4">
                    {language === 'bn' ? (doc.description_bn || doc.description_en) : (doc.description_en || doc.description_bn)}
                  </p>
                ) : <div className="flex-grow mb-4" />}

                <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-sm font-semibold text-[#016B00]">
                  <span>{language === 'bn' ? 'ডাউনলোড করুন' : 'Download'}</span>
                  <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-[#016B00] group-hover:text-white transition-colors">
                    <Download size={16} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-gray-100 rounded-3xl p-16 text-center max-w-2xl mx-auto shadow-sm mt-8">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FolderOpen size={48} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {language === 'bn' ? 'কোনো ডকুমেন্ট পাওয়া যায়নি' : 'No documents found'}
            </h3>
            <p className="text-gray-500">
              {language === 'bn' 
                ? 'এই ক্যাটাগরিতে বর্তমানে কোনো ডকুমেন্ট আপলোড করা হয়নি। পরবর্তীতে আবার চেষ্টা করুন।'
                : 'No documents have been uploaded to this category yet. Please check back later.'}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
