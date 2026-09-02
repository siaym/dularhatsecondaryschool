'use client'

import { createGalleryItem, updateGalleryItem } from '@/app/admin/gallery/actions'
import Link from 'next/link'
import { useState } from 'react'
import { GalleryItem } from '@/types'
import Image from 'next/image'

export function GalleryForm({ item }: { item?: GalleryItem }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(item?.image_url || null)

  const action = item ? updateGalleryItem.bind(null, item.id) : createGalleryItem

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
          if (item?.image_url) {
            formData.append('current_image_url', item.image_url)
          }
          await action(formData)
        } finally {
          setIsSubmitting(false)
        }
      }} 
      className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm max-w-2xl space-y-6"
    >
      {/* Image Upload */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Image *</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50">
          <div className="space-y-1 text-center">
            {previewUrl ? (
              <div className="relative w-full max-w-sm mx-auto h-48 mb-4 rounded-lg overflow-hidden border border-gray-200">
                <Image src={previewUrl} alt="Preview" fill className="object-cover" unoptimized />
              </div>
            ) : (
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            <div className="flex text-sm text-gray-600 justify-center">
              <label htmlFor="image" className="relative cursor-pointer bg-white rounded-md font-medium text-[#016B00] hover:text-[#024D00] focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#016B00]">
                <span>Upload a file</span>
                <input id="image" name="image" type="file" className="sr-only" accept="image/*" required={!item} onChange={handleImageChange} />
              </label>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 5MB</p>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="title_bn" className="block text-sm font-medium text-gray-700">Title (Bengali) *</label>
          <input type="text" id="title_bn" name="title_bn" defaultValue={item?.title_bn} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] focus:border-transparent outline-none" />
        </div>
        <div className="space-y-2">
          <label htmlFor="title_en" className="block text-sm font-medium text-gray-700">Title (English)</label>
          <input type="text" id="title_en" name="title_en" defaultValue={item?.title_en} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] focus:border-transparent outline-none" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category *</label>
          <select id="category" name="category" defaultValue={item?.category || 'campus'} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] focus:border-transparent outline-none bg-white">
            <option value="campus">Campus & Facilities</option>
            <option value="events">Events & Programs</option>
            <option value="sports">Sports</option>
            <option value="awards">Awards & Achievements</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="display_order" className="block text-sm font-medium text-gray-700">Display Order</label>
          <input type="number" id="display_order" name="display_order" defaultValue={item?.display_order || 0} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] focus:border-transparent outline-none" />
        </div>
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="is_published" defaultChecked={item?.is_published ?? true} className="w-4 h-4 text-[#016B00] rounded border-gray-300 focus:ring-[#016B00]" />
          <span className="text-sm font-medium text-gray-700">Published</span>
        </label>
      </div>

      <div className="pt-4 flex items-center gap-3">
        <button type="submit" disabled={isSubmitting} className="bg-[#016B00] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#024D00] transition-colors disabled:opacity-50">
          {isSubmitting ? 'Saving...' : (item ? 'Update Image' : 'Upload Image')}
        </button>
        <Link href="/admin/gallery" className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
          Cancel
        </Link>
      </div>
    </form>
  )
}
