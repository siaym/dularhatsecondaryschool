import { DocumentForm } from '@/components/admin/DocumentForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NewDocumentPage() {
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
        <h1 className="text-2xl font-bold text-gray-900">Upload New Document</h1>
        <p className="text-gray-500 mt-1">Upload a PDF, DOC, or XLS file to the public directory.</p>
      </div>
      
      <DocumentForm />
    </div>
  )
}
