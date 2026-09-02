import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { deleteNotice } from './actions'

export default async function AdminNoticesPage() {
  const supabase = await createClient()
  const { data: notices, error } = await supabase
    .from('notices')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Notices</h1>
        <Link
          href="/admin/notices/new"
          className="bg-[#016B00] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#024D00] flex items-center gap-2 shadow-sm transition-colors"
        >
          <Plus size={16} /> New Notice
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-500">
                <th className="px-6 py-4 font-medium">Title (BN)</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {notices?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No notices found. Create one!
                  </td>
                </tr>
              ) : (
                notices?.map((notice) => (
                  <tr key={notice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {notice.title_bn}
                      {notice.is_important && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                          Important
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 capitalize">
                      {notice.category}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        notice.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {notice.is_published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(notice.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-right space-x-3">
                      <Link
                        href={`/admin/notices/${notice.id}/edit`}
                        className="text-[#016B00] hover:underline font-medium"
                      >
                        Edit
                      </Link>
                      <form action={deleteNotice.bind(null, notice.id)} className="inline">
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
