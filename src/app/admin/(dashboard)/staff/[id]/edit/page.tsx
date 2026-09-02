import { StaffForm } from '@/components/admin/StaffForm'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'

export default async function EditStaffPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const supabase = await createClient()
  const { data: staff } = await supabase
    .from('staff')
    .select('*')
    .eq('id', resolvedParams.id)
    .single()

  if (!staff) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link 
          href="/admin/staff" 
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Staff List
        </Link>
      </div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Edit Staff Member</h1>
        <p className="text-gray-500 mt-1">Update information for {staff.name_bn}</p>
      </div>
      
      <StaffForm staff={staff} />
    </div>
  )
}
