'use client'

import { createResult, updateResult } from '@/app/admin/results/actions'
import Link from 'next/link'
import { useState } from 'react'
import { ResultItem } from '@/types'
import { FileText } from 'lucide-react'

export function ResultForm({ result }: { result?: ResultItem }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [filePreview, setFilePreview] = useState<string | null>(result?.file_url || null)
  const [fileNamePreview, setFileNamePreview] = useState<string | null>(result?.file_name || null)

  const action = result ? updateResult.bind(null, result.id) : createResult

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFilePreview(URL.createObjectURL(file))
      setFileNamePreview(file.name)
    } else {
      setFilePreview(result?.file_url || null)
      setFileNamePreview(result?.file_name || null)
    }
  }

  const currentYear = new Date().getFullYear()

  return (
    <form 
      action={async (formData) => {
        setIsSubmitting(true)
        try {
          if (result?.file_url) formData.append('current_file_url', result.file_url)
          if (result?.file_name) formData.append('current_file_name', result.file_name)
          if (result?.file_size) formData.append('current_file_size', result.file_size.toString())
          if (result?.mime_type) formData.append('current_mime_type', result.mime_type)
          await action(formData)
        } finally {
          setIsSubmitting(false)
        }
      }} 
      className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm max-w-4xl space-y-8"
    >
      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Left Column: File Upload */}
        <div className="md:col-span-1 space-y-4">
          <label className="block text-sm font-medium text-gray-700">Result Document *</label>
          <div className="flex flex-col items-center gap-4">
            <div className="w-full aspect-[3/4] relative rounded-xl overflow-hidden bg-gray-50 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-4 text-center">
              {filePreview ? (
                <div className="flex flex-col items-center text-gray-700">
                  <FileText size={48} className="text-[#016B00] mb-3" />
                  <span className="text-sm font-medium break-all">{fileNamePreview}</span>
                  <span className="text-xs text-[#016B00] mt-1">Ready to upload</span>
                </div>
              ) : (
                <div className="flex flex-col items-center text-gray-400">
                  <FileText size={48} className="mb-3" />
                  <span className="text-sm font-medium">No document selected</span>
                </div>
              )}
            </div>
            <div className="w-full">
              <label htmlFor="file" className="cursor-pointer flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none w-full transition-colors">
                Select Document
                <input 
                  id="file" 
                  name="file" 
                  type="file" 
                  className="sr-only" 
                  accept=".pdf,.doc,.docx,.xls,.xlsx" 
                  onChange={handleFileChange} 
                  required={!result}
                />
              </label>
            </div>
            <div className="text-xs text-gray-500 text-center w-full">
              <p>Max size: 10MB</p>
              <p>Allowed: PDF, DOC, DOCX, XLS, XLSX</p>
            </div>
          </div>
        </div>

        {/* Right Column: Fields */}
        <div className="md:col-span-2 space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="exam_type" className="block text-sm font-medium text-gray-700">Exam Type *</label>
              <select id="exam_type" name="exam_type" defaultValue={result?.exam_type || 'School Examination'} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] outline-none">
                <option value="SSC">SSC (Secondary School Certificate)</option>
                <option value="JSC">JSC (Junior School Certificate)</option>
                <option value="School Examination">Internal School Examination</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year *</label>
              <input type="number" id="year" name="year" defaultValue={result?.year || currentYear} min={1900} max={2100} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] outline-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="title_bn" className="block text-sm font-medium text-gray-700">Title (Bengali) *</label>
            <input type="text" id="title_bn" name="title_bn" defaultValue={result?.title_bn} required placeholder="যেমন: এসএসসি পরীক্ষার ফলাফল ২০২৪" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] outline-none" />
          </div>

          <div className="space-y-2">
            <label htmlFor="title_en" className="block text-sm font-medium text-gray-700">Title (English)</label>
            <input type="text" id="title_en" name="title_en" defaultValue={result?.title_en || ''} placeholder="e.g. SSC Examination Results 2024" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] outline-none" />
          </div>

          <div className="space-y-2">
            <label htmlFor="description_bn" className="block text-sm font-medium text-gray-700">Description (Bengali)</label>
            <textarea id="description_bn" name="description_bn" defaultValue={result?.description_bn || ''} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] outline-none resize-y" />
          </div>

          <div className="space-y-2">
            <label htmlFor="description_en" className="block text-sm font-medium text-gray-700">Description (English)</label>
            <textarea id="description_en" name="description_en" defaultValue={result?.description_en || ''} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] outline-none resize-y" />
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="sort_order" className="block text-sm font-medium text-gray-700">Display Order</label>
              <input type="number" id="sort_order" name="sort_order" defaultValue={result?.sort_order ?? 10} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] outline-none" />
              <p className="text-xs text-gray-500">Lower numbers appear first.</p>
            </div>
            
            <div className="space-y-2 flex flex-col justify-center pt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="is_published" defaultChecked={result?.is_published ?? true} className="w-4 h-4 text-[#016B00] rounded border-gray-300 focus:ring-[#016B00]" />
                <span className="text-sm font-medium text-gray-700">Published (Visible on public site)</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200 flex items-center justify-end gap-3">
        <Link href="/admin/results" className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
          Cancel
        </Link>
        <button type="submit" disabled={isSubmitting} className="bg-[#016B00] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#024D00] transition-colors disabled:opacity-50">
          {isSubmitting ? 'Saving...' : (result ? 'Update Result' : 'Add Result')}
        </button>
      </div>
    </form>
  )
}
