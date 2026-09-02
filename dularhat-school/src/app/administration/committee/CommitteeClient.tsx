'use client'

import Image from 'next/image'
import { CommitteeItem } from '@/types'
import { useLanguage } from '@/contexts/LanguageContext'
import { UserCircle } from 'lucide-react'

export function CommitteeClient({ initialMembers }: { initialMembers: CommitteeItem[] }) {
  const { language } = useLanguage()

  if (initialMembers.length === 0) {
    return (
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-500 text-lg">
            {language === 'bn' ? 'ম্যানেজিং কমিটির কোনো তথ্য পাওয়া যায়নি।' : 'No managing committee information available.'}
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {initialMembers.map((member) => (
            <div 
              key={member.id} 
              className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col"
            >
              <div className="aspect-square relative w-full bg-gray-50 border-b border-gray-100">
                {member.photo_url ? (
                  <Image
                    src={member.photo_url}
                    alt={language === 'bn' ? member.name_bn : (member.name_en || member.name_bn)}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                    <UserCircle size={100} strokeWidth={1} />
                  </div>
                )}
                
                {/* Designation Badge */}
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <div className="inline-block px-4 py-1.5 bg-[#016B00]/90 backdrop-blur-sm text-white text-sm font-semibold rounded-full shadow-lg">
                    {language === 'bn' ? member.designation_bn : (member.designation_en || member.designation_bn)}
                  </div>
                </div>
              </div>
              
              <div className="p-6 text-center flex-grow flex flex-col justify-center">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#016B00] transition-colors mb-1">
                  {language === 'bn' ? member.name_bn : (member.name_en || member.name_bn)}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
