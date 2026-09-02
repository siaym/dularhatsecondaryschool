'use client'

import { createDocument, updateDocument } from '@/app/admin/(dashboard)/documents/actions'
import Link from 'next/link'
import { useState } from 'react'
import { DocumentItem } from '@/types'
import { FileText, UploadCloud } from 'lucide-react'

export function DocumentForm({ document }: { document?: DocumentItem }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedFileName, setSelectedFileName] = useState<string | null>(document?.file_name || null)
  const [selectedFileSize, setSelectedFileSize] = useState<number | null>(document?.file_size || null)

  const action = document ? updateDocument.bind(null, document.id) : createDocument

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFileName(file.name)
      setSelectedFileSize(file.size)
    } else {
      setSelectedFileName(document?.file_name || null)
      setSelectedFileSize(document?.file_size || null)
    }
  }

  const categories = [
    { value: 'admission', label: 'Admission' },
    { value: 'routine', label: 'Routine' },
    { value: 'syllabus', label: 'Syllabus' },
    { value: 'examination', label: 'Examination' },
    { value: 'academic', label: 'Academic' },
    { value: 'academic_calendar', label: 'Academic Calendar' },
    { value: 'forms', label: 'Forms' },
    { value: 'other', label: 'Other' },
  ]

  return (
    <form 
      action={async (formData) => {
        setIsSubmitting(true)
        try {
          if (document?.file_url) {
            formData.append('current_file_url', document.file_url)
            if (document.file_name) formData.append('current_file_name', document.file_name)
            if (document.file_size) formData.append('current_file_size', document.file_size.toString())
            if (document.mime_type) formData.append('current_mime_type', document.mime_type)
          }
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
          <label className="block text-sm font-medium text-gray-700">Document File {document ? '' : '*'}</label>
          <div className="flex flex-col items-center gap-4 p-6 border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
            <FileText size={48} className={selectedFileName ? 'text-[#016B00]' : 'text-gray-400'} />
            <div className="text-center w-full">
              <label htmlFor="file" className="cursor-pointer inline-flex items-center gap-2 justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none w-full">
                <UploadCloud size={16} />
                {document ? 'Replace File' : 'Choose File'}
                <input 
                  id="file" 
                  name="file" 
                  type="file" 
                  className="sr-only" 
                  accept=".pdf,.doc,.docx,.xls,.xlsx" 
                  onChange={handleFileChange} 
                  required={!document}
                />
              </label>
              <p className="mt-2 text-xs text-gray-500">PDF, DOC, XLS up to 10MB</p>
            </div>
            {selectedFileName && (
              <div className="w-full text-center p-3 bg-white rounded border border-gray-200 break-words">
                <p className="text-sm font-medium text-gray-900 line-clamp-2" title={selectedFileName}>
                  {selectedFileName}
                </p>
                {selectedFileSize && (
                  <p className="text-xs text-gray-500 mt-1">
                    {formatFileSize(selectedFileSize)}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Fields */}
        <div className="md:col-span-2 space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="title_bn" className="block text-sm font-medium text-gray-700">Title (Bengali) *</label>
              <input type="text" id="title_bn" name="title_bn" defaultValue={document?.title_bn} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] outline-none" />
            </div>
            <div className="space-y-2">
              <label htmlFor="title_en" className="block text-sm font-medium text-gray-700">Title (English)</label>
              <input type="text" id="title_en" name="title_en" defaultValue={document?.title_en || ''} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] outline-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category *</label>
            <select id="category" name="category" defaultValue={document?.category || 'admission'} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] outline-none bg-white">
              {categories.map(c => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="description_bn" className="block text-sm font-medium text-gray-700">Description (Bengali)</label>
            <textarea id="description_bn" name="description_bn" rows={3} defaultValue={document?.description_bn || ''} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] outline-none resize-y" />
          </div>

          <div className="space-y-2">
            <label htmlFor="description_en" className="block text-sm font-medium text-gray-700">Description (English)</label>
            <textarea id="description_en" name="description_en" rows={3} defaultValue={document?.description_en || ''} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] outline-none resize-y" />
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="sort_order" className="block text-sm font-medium text-gray-700">Display Order</label>
              <input type="number" id="sort_order" name="sort_order" defaultValue={document?.sort_order ?? 10} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#016B00] outline-none" />
              <p className="text-xs text-gray-500">Lower numbers appear first.</p>
            </div>
            <div className="space-y-2 flex flex-col justify-center pt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="is_published" defaultChecked={document?.is_published ?? true} className="w-4 h-4 text-[#016B00] rounded border-gray-300 focus:ring-[#016B00]" />
                <span className="text-sm font-medium text-gray-700">Published (Visible on site)</span>
              </label>
            </div>
          </div>

        </div>
      </div>

      <div className="pt-6 border-t border-gray-200 flex items-center justify-end gap-3">
        <Link href="/admin/documents" className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
          Cancel
        </Link>
        <button type="submit" disabled={isSubmitting} className="bg-[#016B00] text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-[#024D00] transition-colors disabled:opacity-50">
          {isSubmitting ? 'Saving...' : (document ? 'Update Document' : 'Upload Document')}
        </button>
      </div>
    </form>
  )
}
