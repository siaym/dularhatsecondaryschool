'use client'

import { createCommitteeMember, updateCommitteeMember } from '@/app/admin/(dashboard)/administration/committee/actions'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'
import { CommitteeItem } from '@/types'
import { UploadCloud, UserCircle } from 'lucide-react'

export function CommitteeForm({ member }: { member?: CommitteeItem }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [photoPreview, setPhotoPreview] = useState<string | null>(member?.photo_url || null)
  const [removePhoto, setRemovePhoto] = useState(false)

  const action = member ? updateCommitteeMember.bind(null, member.id) : createCommitteeMember

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPhotoPreview(URL.createObjectURL(file))
      setRemovePhoto(false)
    } else {
      setPhotoPreview(member?.photo_url || null)
    }
  }

  const handleRemovePhoto = () => {
    setPhotoPreview(null)
    setRemovePhoto(true)
    const fileInput = document.getElementById('photo') as HTMLInputElement
    if (fileInput) fileInput.value = ''
  }

  return (
    <form 
      action={async (formData) => {
        setIsSubmitting(true)
        try {
          if (member?.photo_url) formData.append('current_photo_url', member.photo_url)
          if (removePhoto) formData.append('remove_photo', 'true')
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
          <div className="flex flex-col items-center gap-4">
            <div className="w-40 h-40 relative rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-md">
              {photoPreview ? (
                <Image src={photoPreview} alt="Preview" fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <UserCircle size={80} />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="photo" className="cursor-pointer inline-flex items-center gap-2 justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none w-full">
                <UploadCloud size={16} />
                Choose Photo
                <input 
                  id="photo" 
                  name="photo" 
                  type="file" 
                  className="sr-only" 
                  accept="image/jpeg,image/png,image/webp" 
                  onChange={handlePhotoChange} 
                />
              </label>
              {photoPreview && (
                <button type="button" onClick={handleRemovePhoto} className="text-sm text-red-600 hover:text-red-700 font-medium">
                  Remove Photo
                </button>
              )}
            </div>
            <p className="text-xs text-gray-500 text-center mt-2">
              Recommended: Square image, max 5MB (JPG, PNG, WEBP)
            </p>
          </div>
        </div>

        {/* Right Column: Fields */}
        <div className="md:col-span-2 space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name_bn" className="block text-sm font-medium text-gray-700">Name (Bengali) *</label>
              <input type="text" id="name_bn" name="name_bn" defaultValue={member?.name_bn} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] outline-none" />
            </div>
            <div className="space-y-2">
              <label htmlFor="name_en" className="block text-sm font-medium text-gray-700">Name (English)</label>
              <input type="text" id="name_en" name="name_en" defaultValue={member?.name_en || ''} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] outline-none" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="designation_bn" className="block text-sm font-medium text-gray-700">Designation (Bengali) *</label>
              <input type="text" id="designation_bn" name="designation_bn" defaultValue={member?.designation_bn} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] outline-none" />
            </div>
            <div className="space-y-2">
              <label htmlFor="designation_en" className="block text-sm font-medium text-gray-700">Designation (English)</label>
              <input type="text" id="designation_en" name="designation_en" defaultValue={member?.designation_en || ''} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] outline-none" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="sort_order" className="block text-sm font-medium text-gray-700">Display Order</label>
              <input type="number" id="sort_order" name="sort_order" defaultValue={member?.sort_order ?? 10} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] outline-none" />
              <p className="text-xs text-gray-500">Lower numbers appear first (e.g. 1 for Chairman).</p>
            </div>
            
            <div className="space-y-2 flex flex-col justify-center pt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="is_active" defaultChecked={member?.is_active ?? true} className="w-4 h-4 text-[#016B00] rounded border-gray-300 focus:ring-[#016B00]" />
                <span className="text-sm font-medium text-gray-700">Active (Visible on site)</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200 flex items-center justify-end gap-3">
        <Link href="/admin/administration/committee" className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
          Cancel
        </Link>
        <button type="submit" disabled={isSubmitting} className="bg-[#016B00] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#024D00] transition-colors disabled:opacity-50">
          {isSubmitting ? 'Saving...' : (member ? 'Update Member' : 'Add Member')}
        </button>
      </div>
    </form>
  )
}
