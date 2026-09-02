import { CommitteeForm } from '@/components/admin/CommitteeForm'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'

export default async function EditCommitteePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const supabase = await createClient()
  const { data: member } = await supabase
    .from('committee')
    .select('*')
    .eq('id', resolvedParams.id)
    .single()

  if (!member) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link 
          href="/admin/administration/committee" 
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Committee
        </Link>
      </div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Edit Committee Member</h1>
        <p className="text-gray-500 mt-1">Update profile information or photo.</p>
      </div>
      
      <CommitteeForm member={member} />
    </div>
  )
}
