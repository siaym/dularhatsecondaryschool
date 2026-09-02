'use client'

import { createNotice, updateNotice } from '@/app/admin/notices/actions'
import Link from 'next/link'
import { useState } from 'react'

export function NoticeForm({ notice }: { notice?: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const action = notice ? updateNotice.bind(null, notice.id) : createNotice

  return (
    <form 
      action={async (formData) => {
        setIsSubmitting(true)
        try {
          await action(formData)
        } finally {
          setIsSubmitting(false)
        }
      }} 
      className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm max-w-2xl space-y-6"
    >
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="title_bn" className="block text-sm font-medium text-gray-700">Title (Bengali) *</label>
          <input type="text" id="title_bn" name="title_bn" defaultValue={notice?.title_bn} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] focus:border-transparent outline-none" />
        </div>
        <div className="space-y-2">
          <label htmlFor="title_en" className="block text-sm font-medium text-gray-700">Title (English)</label>
          <input type="text" id="title_en" name="title_en" defaultValue={notice?.title_en} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] focus:border-transparent outline-none" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category *</label>
          <select id="category" name="category" defaultValue={notice?.category || 'exam'} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] focus:border-transparent outline-none bg-white">
            <option value="exam">Examination</option>
            <option value="admission">Admission</option>
            <option value="event">Event</option>
            <option value="holiday">Holiday</option>
            <option value="result">Result</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="description_bn" className="block text-sm font-medium text-gray-700">Description (Bengali)</label>
        <textarea id="description_bn" name="description_bn" rows={4} defaultValue={notice?.description_bn} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] focus:border-transparent outline-none" />
      </div>

      <div className="space-y-2">
        <label htmlFor="description_en" className="block text-sm font-medium text-gray-700">Description (English)</label>
        <textarea id="description_en" name="description_en" rows={4} defaultValue={notice?.description_en} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] focus:border-transparent outline-none" />
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="is_important" defaultChecked={notice?.is_important} className="w-4 h-4 text-[#016B00] rounded border-gray-300 focus:ring-[#016B00]" />
          <span className="text-sm font-medium text-gray-700">Mark as Important</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="is_published" defaultChecked={notice?.is_published ?? true} className="w-4 h-4 text-[#016B00] rounded border-gray-300 focus:ring-[#016B00]" />
          <span className="text-sm font-medium text-gray-700">Published</span>
        </label>
      </div>

      <div className="pt-4 flex items-center gap-3">
        <button type="submit" disabled={isSubmitting} className="bg-[#016B00] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#024D00] transition-colors disabled:opacity-50">
          {isSubmitting ? 'Saving...' : (notice ? 'Update Notice' : 'Create Notice')}
        </button>
        <Link href="/admin/notices" className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
          Cancel
        </Link>
      </div>
    </form>
  )
}
