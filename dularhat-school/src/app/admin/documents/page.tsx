import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Plus, FileText, CheckCircle2, XCircle } from 'lucide-react'
import { deleteDocument } from './actions'

export default async function AdminDocumentsPage() {
  const supabase = await createClient()
  const { data: documents } = await supabase
    .from('documents')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  const formatFileSize = (bytes: number | null) => {
    if (!bytes || bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
        <Link
          href="/admin/documents/new"
          className="bg-[#016B00] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#024D00] flex items-center gap-2 shadow-sm transition-colors"
        >
          <Plus size={16} /> Upload Document
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-500">
                <th className="px-6 py-4 font-medium w-16">File</th>
                <th className="px-6 py-4 font-medium">Title (BN)</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Size</th>
                <th className="px-6 py-4 font-medium">Order</th>
                <th className="px-6 py-4 font-medium text-center">Published</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {(!documents || documents.length === 0) ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    No documents found. Upload one!
                  </td>
                </tr>
              ) : (
                documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-center">
                      <FileText className="text-gray-400 mx-auto" size={24} />
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 max-w-xs truncate" title={doc.title_bn}>
                      {doc.title_bn}
                      <p className="text-xs text-gray-500 font-normal truncate mt-0.5" title={doc.file_name || ''}>
                        {doc.file_name}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 capitalize">
                      {doc.category}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {formatFileSize(doc.file_size)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {doc.sort_order}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {doc.is_published ? (
                        <CheckCircle2 className="text-green-500 mx-auto" size={18} />
                      ) : (
                        <XCircle className="text-gray-300 mx-auto" size={18} />
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-right space-x-3 whitespace-nowrap">
                      <a href={doc.file_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline font-medium">
                        View
                      </a>
                      <Link
                        href={`/admin/documents/${doc.id}/edit`}
                        className="text-[#016B00] hover:underline font-medium"
                      >
                        Edit
                      </Link>
                      <form action={deleteDocument.bind(null, doc.id, doc.file_url)} className="inline">
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
