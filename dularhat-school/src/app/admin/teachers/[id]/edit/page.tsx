import { TeacherForm } from '@/components/admin/TeacherForm'
import { createClient } from '@/utils/supabase/server'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function EditTeacherPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const supabase = await createClient()
  
  const { data: teacher } = await supabase
    .from('teachers')
    .select('*')
    .eq('id', resolvedParams.id)
    .single()

  if (!teacher) {
    notFound()
  }

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/teachers" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft size={16} className="mr-1" /> Back to Teachers
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Edit Teacher Profile</h1>
      </div>
      <TeacherForm teacher={teacher} />
    </div>
  )
}
