import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { FileText, Calendar } from 'lucide-react'

export default async function AdminAcademicsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Academic CMS</h1>
      </div>
      
      <p className="text-gray-600 mb-8">
        Academic content like Routines, Syllabuses, and Calendars are managed as downloadable PDF documents. Use the quick links below to upload them.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Calendar size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Upload Class Routine</h3>
            <p className="text-sm text-gray-500 mb-4 mt-1 line-clamp-2">Add PDF class routines for students to download.</p>
            <Link href="/admin/documents/new?category=routine" className="text-sm text-blue-600 hover:underline font-medium inline-block bg-blue-50 px-3 py-1.5 rounded-md">
              Upload Routine &rarr;
            </Link>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-4">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileText size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Upload Syllabus</h3>
            <p className="text-sm text-gray-500 mb-4 mt-1 line-clamp-2">Add syllabus documents for any class.</p>
            <Link href="/admin/documents/new?category=syllabus" className="text-sm text-purple-600 hover:underline font-medium inline-block bg-purple-50 px-3 py-1.5 rounded-md">
              Upload Syllabus &rarr;
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-4">
          <div className="w-12 h-12 bg-green-50 text-[#016B00] rounded-lg flex items-center justify-center flex-shrink-0">
            <Calendar size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Academic Calendar</h3>
            <p className="text-sm text-gray-500 mb-4 mt-1 line-clamp-2">Upload the PDF academic calendar for the year.</p>
            <Link href="/admin/documents/new?category=academic_calendar" className="text-sm text-[#016B00] hover:underline font-medium inline-block bg-green-50 px-3 py-1.5 rounded-md">
              Upload Calendar &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
