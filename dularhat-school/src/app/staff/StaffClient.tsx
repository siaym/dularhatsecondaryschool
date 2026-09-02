'use client'

import { Users, UserSquare2, Phone, Mail } from "lucide-react"
import Image from "next/image"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { useLanguage } from "@/contexts/LanguageContext"
import { Staff } from "@/types"

export function StaffClient({ staffList }: { staffList: Staff[] }) {
  const { language } = useLanguage()

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={language === "bn" ? "কর্মকর্তা ও কর্মচারীবৃন্দ" : "Officers & Staff"} />
        
        {staffList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
            {staffList.map((staff) => (
              <div key={staff.id} className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow hover:border-[#016B00]/30 group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-100 mb-4 bg-gray-50 flex items-center justify-center relative group-hover:border-[#016B00]/30 transition-colors">
                  {staff.photo_url ? (
                    <Image src={staff.photo_url} alt={language === "bn" ? staff.name_bn : (staff.name_en || staff.name_bn)} fill className="object-cover" unoptimized />
                  ) : (
                    <UserSquare2 size={40} className="text-gray-300" />
                  )}
                </div>
                <div className="flex-1 w-full flex flex-col text-center">
                  <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-[#016B00] transition-colors line-clamp-1">
                    {language === "bn" ? staff.name_bn : (staff.name_en || staff.name_bn)}
                  </h3>
                  <p className="text-gray-500 font-medium text-sm mb-1">
                    {language === "bn" ? staff.designation_bn : (staff.designation_en || staff.designation_bn)}
                  </p>
                  
                  {(staff.phone || staff.email) && (
                    <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col items-center gap-2 w-full opacity-70 group-hover:opacity-100 transition-opacity">
                      {staff.phone && (
                        <a href={`tel:${staff.phone}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#016B00] transition-colors">
                          <Phone size={14} />
                          <span>{staff.phone}</span>
                        </a>
                      )}
                      {staff.email && (
                        <a href={`mailto:${staff.email}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#016B00] transition-colors break-all">
                          <Mail size={14} />
                          <span>{staff.email}</span>
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
            <Users size={48} className="mx-auto text-[#016B00]/30 mb-4" />
            <p className="text-gray-600 font-medium">
              {language === "bn"
                ? "কর্মকর্তা ও কর্মচারীবৃন্দের তথ্য শীঘ্রই প্রকাশ করা হবে।"
                : "Staff information will be published soon."}
            </p>
          </div>
        )}

      </div>
    </section>
  )
}
