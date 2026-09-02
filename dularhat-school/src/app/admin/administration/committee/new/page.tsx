import { CommitteeForm } from '@/components/admin/CommitteeForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NewCommitteePage() {
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
        <h1 className="text-2xl font-bold text-gray-900">Add Committee Member</h1>
        <p className="text-gray-500 mt-1">Add a new member to the managing committee.</p>
      </div>
      
      <CommitteeForm />
    </div>
  )
}
