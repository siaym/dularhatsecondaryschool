'use client'

import { GraduationCap, UserSquare2, Phone, Mail } from "lucide-react"
import Image from "next/image"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { useLanguage } from "@/contexts/LanguageContext"
import { Teacher } from "@/types"

export function TeachersClient({ headmaster, teachers }: { headmaster: Teacher | undefined, teachers: Teacher[] }) {
  const { language } = useLanguage()

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Headmaster Featured Section */}
        <SectionHeading title={language === "bn" ? "প্রধান শিক্ষক" : "Headmaster"} />
        <div className="bg-gradient-to-br from-[#006B2D] to-[#003D1A] rounded-2xl p-8 flex flex-col sm:flex-row items-center sm:items-start gap-8 text-white mb-16 shadow-lg">
          <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white/10 rounded-full flex items-center justify-center border-4 border-white/20 flex-shrink-0 overflow-hidden relative">
            {headmaster?.photo_url ? (
              <Image src={headmaster.photo_url} alt={language === "bn" ? headmaster.name_bn : (headmaster.name_en || headmaster.name_bn)} fill className="object-cover" unoptimized />
            ) : (
              <GraduationCap size={64} className="text-white/50" />
            )}
          </div>
          <div className="text-center sm:text-left flex-1">
            <span className="text-[#F5C400] text-sm font-bold uppercase tracking-widest mb-2 block">
              {language === "bn" ? (headmaster?.designation_bn || "প্রধান শিক্ষক") : (headmaster?.designation_en || "Headmaster")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {headmaster ? (language === "bn" ? headmaster.name_bn : (headmaster.name_en || headmaster.name_bn)) : (language === "bn" ? "দুলারহাট মাধ্যমিক বিদ্যালয়" : "Dularhat Secondary School")}
            </h2>
            {headmaster?.subject_bn && (
              <p className="text-green-100 font-medium mb-4">
                {language === "bn" ? headmaster.subject_bn : (headmaster.subject_en || headmaster.subject_bn)}
              </p>
            )}
            
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
              {headmaster?.phone && (
                <a href={`tel:${headmaster.phone}`} className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition-colors">
                  <Phone size={16} />
                  <span>{headmaster.phone}</span>
                </a>
              )}
              {headmaster?.email && (
                <a href={`mailto:${headmaster.email}`} className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition-colors">
                  <Mail size={16} />
                  <span>Email</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Assistant Teachers Grid */}
        <SectionHeading title={language === "bn" ? "শিক্ষকমণ্ডলী" : "Teaching Faculty"} />
        {teachers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {teachers.map((teacher) => (
              <div key={teacher.id} className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow hover:border-[#016B00]/30 group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-100 mb-4 bg-gray-50 flex items-center justify-center relative group-hover:border-[#016B00]/30 transition-colors">
                  {teacher.photo_url ? (
                    <Image src={teacher.photo_url} alt={language === "bn" ? teacher.name_bn : (teacher.name_en || teacher.name_bn)} fill className="object-cover" unoptimized />
                  ) : (
                    <UserSquare2 size={40} className="text-gray-300" />
                  )}
                </div>
                <div className="flex-1 w-full flex flex-col text-center">
                  <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-[#016B00] transition-colors">
                    {language === "bn" ? teacher.name_bn : (teacher.name_en || teacher.name_bn)}
                  </h3>
                  <p className="text-gray-500 text-sm font-medium mb-1">
                    {language === "bn" ? teacher.designation_bn : (teacher.designation_en || teacher.designation_bn)}
                  </p>
                  {teacher.subject_bn && (
                    <p className="text-gray-400 text-xs">
                      {language === "bn" ? teacher.subject_bn : (teacher.subject_en || teacher.subject_bn)}
                    </p>
                  )}
                  
                  {(teacher.phone || teacher.email) && (
                    <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col items-center gap-2 w-full opacity-70 group-hover:opacity-100 transition-opacity">
                      {teacher.phone && (
                        <a href={`tel:${teacher.phone}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#016B00] transition-colors">
                          <Phone size={14} />
                          <span>{teacher.phone}</span>
                        </a>
                      )}
                      {teacher.email && (
                        <a href={`mailto:${teacher.email}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#016B00] transition-colors break-all">
                          <Mail size={14} />
                          <span>{teacher.email}</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#F5FAF6] border border-[#DDE8DD] rounded-xl p-12 text-center mt-6">
            <GraduationCap size={48} className="mx-auto text-[#016B00]/30 mb-4" />
            <p className="text-gray-600 font-medium">
              {language === "bn"
                ? "শিক্ষকবৃন্দের তথ্য শীঘ্রই প্রকাশ করা হবে।"
                : "Teacher information will be published soon."}
            </p>
          </div>
        )}

      </div>
    </section>
  )
}
