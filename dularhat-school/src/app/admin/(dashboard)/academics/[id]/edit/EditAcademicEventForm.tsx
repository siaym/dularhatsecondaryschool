'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import { updateAcademicEvent } from '../../actions'
import type { AcademicEvent } from '@/types/academic'

export default function EditAcademicEventForm({ event }: { event: AcademicEvent }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    try {
      await updateAcademicEvent(event.id, formData)
      // Redirect happens in the server action
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/academics" className="text-gray-500 hover:text-gray-900">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Edit Academic Event</h1>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="title_bn" className="block text-sm font-medium text-gray-700">
              Title (Bengali) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title_bn"
              name="title_bn"
              required
              defaultValue={event.title_bn}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#016B00]/20 focus:border-[#016B00]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="title_en" className="block text-sm font-medium text-gray-700">
              Title (English)
            </label>
            <input
              type="text"
              id="title_en"
              name="title_en"
              defaultValue={event.title_en || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#016B00]/20 focus:border-[#016B00]"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="event_date" className="block text-sm font-medium text-gray-700">
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="event_date"
              name="event_date"
              required
              defaultValue={event.event_date}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#016B00]/20 focus:border-[#016B00]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">
              End Date (Optional)
            </label>
            <input
              type="date"
              id="end_date"
              name="end_date"
              defaultValue={event.end_date || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#016B00]/20 focus:border-[#016B00]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="event_type" className="block text-sm font-medium text-gray-700">
            Event Type <span className="text-red-500">*</span>
          </label>
          <select
            id="event_type"
            name="event_type"
            required
            defaultValue={event.event_type}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#016B00]/20 focus:border-[#016B00]"
          >
            <option value="general">General Event</option>
            <option value="holiday">Holiday</option>
            <option value="exam">Examination</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="description_bn" className="block text-sm font-medium text-gray-700">
              Description (Bengali)
            </label>
            <textarea
              id="description_bn"
              name="description_bn"
              rows={3}
              defaultValue={event.description_bn || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#016B00]/20 focus:border-[#016B00]"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description_en" className="block text-sm font-medium text-gray-700">
              Description (English)
            </label>
            <textarea
              id="description_en"
              name="description_en"
              rows={3}
              defaultValue={event.description_en || ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#016B00]/20 focus:border-[#016B00]"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          <input
            type="checkbox"
            id="is_published"
            name="is_published"
            value="true"
            defaultChecked={event.is_published}
            className="w-4 h-4 text-[#016B00] rounded focus:ring-[#016B00]"
          />
          <label htmlFor="is_published" className="text-sm font-medium text-gray-700">
            Publish immediately
          </label>
        </div>

        <div className="pt-4 flex justify-end gap-3">
          <Link
            href="/admin/academics"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-white bg-[#016B00] rounded-lg hover:bg-[#024D00] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </>
  )
}
