'use client'

import { useState, useMemo } from 'react'
import { ResultItem } from '@/types'
import { useLanguage } from '@/contexts/LanguageContext'
import { FileText, Download, Calendar, Search, Filter } from 'lucide-react'

export function ResultClient({ initialResults }: { initialResults: ResultItem[] }) {
  const { language } = useLanguage()
  const [selectedYear, setSelectedYear] = useState<string>('all')
  const [selectedExamType, setSelectedExamType] = useState<string>('all')

  // Extract unique years and exam types for filters
  const years = useMemo(() => {
    const uniqueYears = Array.from(new Set(initialResults.map(r => r.year)))
    return uniqueYears.sort((a, b) => b - a)
  }, [initialResults])

  const examTypes = useMemo(() => {
    return Array.from(new Set(initialResults.map(r => r.exam_type)))
  }, [initialResults])

  const filteredResults = initialResults.filter(result => {
    const yearMatch = selectedYear === 'all' || result.year.toString() === selectedYear
    const examMatch = selectedExamType === 'all' || result.exam_type === selectedExamType
    return yearMatch && examMatch
  })

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Filters */}
        <div className="bg-[#F5FAF6] border border-[#DDE8DD] rounded-2xl p-6 mb-10">
          <div className="flex flex-col md:flex-row gap-6 items-end">
            <div className="w-full md:w-1/3">
              <label className="block text-sm font-semibold text-[#003D1A] mb-2 flex items-center gap-2">
                <Filter size={16} />
                {language === 'bn' ? 'পরীক্ষার ধরন' : 'Exam Type'}
              </label>
              <select
                value={selectedExamType}
                onChange={(e) => setSelectedExamType(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-[#DDE8DD] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006B2D] text-gray-700"
              >
                <option value="all">{language === 'bn' ? 'সকল পরীক্ষা' : 'All Exams'}</option>
                {examTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div className="w-full md:w-1/3">
              <label className="block text-sm font-semibold text-[#003D1A] mb-2 flex items-center gap-2">
                <Calendar size={16} />
                {language === 'bn' ? 'বছর' : 'Year'}
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-[#DDE8DD] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006B2D] text-gray-700"
              >
                <option value="all">{language === 'bn' ? 'সকল বছর' : 'All Years'}</option>
                {years.map(year => (
                  <option key={year} value={year.toString()}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results List */}
        {filteredResults.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border border-gray-100 border-dashed">
            <FileText className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              {language === 'bn' ? 'কোনো ফলাফল পাওয়া যায়নি' : 'No results found'}
            </h3>
            <p className="text-gray-500">
              {language === 'bn' ? 'অনুগ্রহ করে ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।' : 'Please adjust your filters and try again.'}
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredResults.map((result) => (
              <div 
                key={result.id} 
                className="bg-white border-2 border-gray-100 hover:border-[#006B2D] rounded-2xl p-6 transition-colors shadow-sm hover:shadow-md flex flex-col md:flex-row gap-6 items-start md:items-center justify-between group"
              >
                <div className="flex-grow">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#E8F3EB] text-[#006B2D]">
                      {result.exam_type}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500">
                      <Calendar size={14} />
                      {result.year}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#006B2D] transition-colors mb-2">
                    {language === 'bn' ? result.title_bn : (result.title_en || result.title_bn)}
                  </h3>
                  
                  {(result.description_bn || result.description_en) && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {language === 'bn' ? result.description_bn : (result.description_en || result.description_bn)}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FileText size={16} className="text-gray-400" />
                    <span className="font-medium truncate max-w-[200px]" title={result.file_name}>
                      {result.file_name}
                    </span>
                    <span className="text-gray-300">&bull;</span>
                    <span>{formatFileSize(result.file_size)}</span>
                  </div>
                </div>

                <div className="w-full md:w-auto shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                  <a
                    href={result.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full md:w-auto bg-[#006B2D] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#005423] transition-colors shadow-sm hover:shadow-md"
                  >
                    <Download size={18} />
                    {language === 'bn' ? 'ডাউনলোড' : 'Download'}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
