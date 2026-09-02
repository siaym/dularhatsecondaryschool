import { NoticeForm } from '@/components/admin/NoticeForm'
import { createClient } from '@/utils/supabase/server'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function EditNoticePage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: notice } = await supabase
    .from('notices')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!notice) {
    notFound()
  }

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/notices" className="text-sm text-gray-500 hover:text-gray-900 flex items-center gap-1 inline-flex mb-2">
          <ArrowLeft size={14} /> Back to Notices
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Edit Notice</h1>
      </div>
      <NoticeForm notice={notice} />
    </div>
  )
}
