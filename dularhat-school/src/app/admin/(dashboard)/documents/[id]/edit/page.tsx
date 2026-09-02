import { DocumentForm } from '@/components/admin/DocumentForm'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'

export default async function EditDocumentPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const supabase = await createClient()
  const { data: document } = await supabase
    .from('documents')
    .select('*')
    .eq('id', resolvedParams.id)
    .single()

  if (!document) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link 
          href="/admin/documents" 
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Documents
        </Link>
      </div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Edit Document</h1>
        <p className="text-gray-500 mt-1">Update metadata or upload a replacement file.</p>
      </div>
      
      <DocumentForm document={document} />
    </div>
  )
}
