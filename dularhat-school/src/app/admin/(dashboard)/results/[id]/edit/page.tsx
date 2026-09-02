import { ResultForm } from '@/components/admin/ResultForm'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'

export default async function EditResultPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const supabase = await createClient()
  const { data: result } = await supabase
    .from('results')
    .select('*')
    .eq('id', resolvedParams.id)
    .single()

  if (!result) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link 
          href="/admin/results" 
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Results
        </Link>
      </div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Edit Result</h1>
        <p className="text-gray-500 mt-1">Update result information or replace the document.</p>
      </div>
      
      <ResultForm result={result} />
    </div>
  )
}
