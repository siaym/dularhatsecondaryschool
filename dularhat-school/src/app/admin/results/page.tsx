import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Plus, CheckCircle2, XCircle, FileText, Download } from 'lucide-react'
import { deleteResult } from './actions'

export default async function AdminResultsPage() {
  const supabase = await createClient()
  const { data: results } = await supabase
    .from('results')
    .select('*')
    .order('year', { ascending: false })
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Results</h1>
          <p className="text-gray-500 mt-1">Manage official exam results and documents.</p>
        </div>
        <Link
          href="/admin/results/new"
          className="bg-[#016B00] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#024D00] flex items-center gap-2 shadow-sm transition-colors"
        >
          <Plus size={16} /> Add Result
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-500">
                <th className="px-6 py-4 font-medium">Exam Type</th>
                <th className="px-6 py-4 font-medium">Year</th>
                <th className="px-6 py-4 font-medium">Title</th>
                <th className="px-6 py-4 font-medium">File</th>
                <th className="px-6 py-4 font-medium text-center">Published</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {(!results || results.length === 0) ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No results found. Add one!
                  </td>
                </tr>
              ) : (
                results.map((result) => (
                  <tr key={result.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {result.exam_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">
                      {result.year}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">{result.title_bn}</p>
                      {result.title_en && <p className="text-xs text-gray-500 mt-0.5">{result.title_en}</p>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-gray-400" />
                        <div className="text-sm">
                          <a href={result.file_url} target="_blank" rel="noopener noreferrer" className="text-[#016B00] hover:underline flex items-center gap-1 font-medium truncate max-w-[150px]">
                            {result.file_name} <Download size={12} />
                          </a>
                          <p className="text-xs text-gray-500">{formatFileSize(result.file_size)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {result.is_published ? (
                        <CheckCircle2 className="text-green-500 mx-auto" size={18} />
                      ) : (
                        <XCircle className="text-gray-300 mx-auto" size={18} />
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-right space-x-3 whitespace-nowrap">
                      <Link
                        href={`/admin/results/${result.id}/edit`}
                        className="text-[#016B00] hover:underline font-medium"
                      >
                        Edit
                      </Link>
                      <form action={deleteResult.bind(null, result.id, result.file_url)} className="inline">
                        <button type="submit" className="text-red-600 hover:underline font-medium">
                          Delete
                        </button>
                      </form>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
