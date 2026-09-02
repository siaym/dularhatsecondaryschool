'use client'

import { createStaff, updateStaff } from '@/app/admin/(dashboard)/staff/actions'
import Link from 'next/link'
import { useState } from 'react'
import { Staff } from '@/types'
import Image from 'next/image'
import { UserSquare2 } from 'lucide-react'

export function StaffForm({ staff }: { staff?: Staff }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(staff?.photo_url || null)

  const action = staff ? updateStaff.bind(null, staff.id) : createStaff

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  return (
    <form 
      action={async (formData) => {
        setIsSubmitting(true)
        try {
          if (staff?.photo_url) {
            formData.append('current_photo_url', staff.photo_url)
          }
          await action(formData)
        } finally {
          setIsSubmitting(false)
        }
      }} 
      className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm max-w-4xl space-y-8"
    >
      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Left Column: Photo Upload */}
        <div className="md:col-span-1 space-y-4">
          <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
          <div className="flex flex-col items-center gap-4 p-4 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border border-gray-200 bg-white flex items-center justify-center shadow-sm">
              {previewUrl ? (
                <Image src={previewUrl} alt="Preview" fill className="object-cover" unoptimized />
              ) : (
                <UserSquare2 size={48} className="text-gray-300" />
              )}
            </div>
            <div className="text-center">
              <label htmlFor="photo" className="cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none">
                Choose Photo
                <input id="photo" name="photo" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
              </label>
              <p className="mt-2 text-xs text-gray-500">JPG, PNG, WEBP up to 5MB</p>
            </div>
          </div>
        </div>

        {/* Right Column: Fields */}
        <div className="md:col-span-2 space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name_bn" className="block text-sm font-medium text-gray-700">Name (Bengali) *</label>
              <input type="text" id="name_bn" name="name_bn" defaultValue={staff?.name_bn} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] outline-none" />
            </div>
            <div className="space-y-2">
              <label htmlFor="name_en" className="block text-sm font-medium text-gray-700">Name (English)</label>
              <input type="text" id="name_en" name="name_en" defaultValue={staff?.name_en || ''} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] outline-none" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="designation_bn" className="block text-sm font-medium text-gray-700">Designation (Bengali)</label>
              <input type="text" id="designation_bn" name="designation_bn" defaultValue={staff?.designation_bn} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] outline-none" />
            </div>
            <div className="space-y-2">
              <label htmlFor="designation_en" className="block text-sm font-medium text-gray-700">Designation (English)</label>
              <input type="text" id="designation_en" name="designation_en" defaultValue={staff?.designation_en || ''} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] outline-none" />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number <span className="text-gray-400 font-normal">(Optional)</span></label>
              <input type="tel" id="phone" name="phone" defaultValue={staff?.phone || ''} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] outline-none" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address <span className="text-gray-400 font-normal">(Optional)</span></label>
              <input type="email" id="email" name="email" defaultValue={staff?.email || ''} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] outline-none" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="sort_order" className="block text-sm font-medium text-gray-700">Display Order</label>
              <input type="number" id="sort_order" name="sort_order" defaultValue={staff?.sort_order ?? 10} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] outline-none" />
              <p className="text-xs text-gray-500">Lower numbers appear first.</p>
            </div>
            <div className="space-y-2 flex flex-col justify-center pt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="is_active" defaultChecked={staff?.is_active ?? true} className="w-4 h-4 text-[#016B00] rounded border-gray-300 focus:ring-[#016B00]" />
                <span className="text-sm font-medium text-gray-700">Active</span>
              </label>
            </div>
          </div>

        </div>
      </div>

      <div className="pt-6 border-t border-gray-200 flex items-center justify-end gap-3">
        <Link href="/admin/staff" className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
          Cancel
        </Link>
        <button type="submit" disabled={isSubmitting} className="bg-[#016B00] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#024D00] transition-colors disabled:opacity-50">
          {isSubmitting ? 'Saving...' : (staff ? 'Update Staff Member' : 'Add Staff Member')}
        </button>
      </div>
    </form>
  )
}
