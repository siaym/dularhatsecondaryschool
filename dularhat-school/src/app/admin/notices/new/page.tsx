import { NoticeForm } from '@/components/admin/NoticeForm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewNoticePage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/notices" className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 inline-flex mb-2">
          <ArrowLeft size={14} /> Back to Notices
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Create New Notice</h1>
      </div>
      <NoticeForm />
    </div>
  )
}
