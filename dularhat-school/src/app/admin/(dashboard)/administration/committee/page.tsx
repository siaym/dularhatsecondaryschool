import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, User, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react'
import { deleteCommitteeMember } from './actions'

export default async function AdminCommitteePage() {
  const supabase = await createClient()
  const { data: members } = await supabase
    .from('committee')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="mb-6">
        <Link 
          href="/admin/administration" 
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Administration
        </Link>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Managing Committee</h1>
          <p className="text-gray-500 mt-1">Manage the chairman and committee members.</p>
        </div>
        <Link
          href="/admin/administration/committee/new"
          className="bg-[#016B00] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#024D00] flex items-center gap-2 shadow-sm transition-colors"
        >
          <Plus size={16} /> Add Member
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-500">
                <th className="px-6 py-4 font-medium w-20">Photo</th>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Designation</th>
                <th className="px-6 py-4 font-medium">Order</th>
                <th className="px-6 py-4 font-medium text-center">Active</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {(!members || members.length === 0) ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No committee members found. Add one!
                  </td>
                </tr>
              ) : (
                members.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      {member.photo_url ? (
                        <div className="w-12 h-12 relative rounded-full overflow-hidden border border-gray-200 bg-white">
                          <Image src={member.photo_url} alt="" fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-200">
                          <User size={20} />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {member.name_bn}
                      {member.name_en && <p className="text-xs text-gray-500 font-normal mt-0.5">{member.name_en}</p>}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {member.designation_bn}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {member.sort_order}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {member.is_active ? (
                        <CheckCircle2 className="text-green-500 mx-auto" size={18} />
                      ) : (
                        <XCircle className="text-gray-300 mx-auto" size={18} />
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-right space-x-3 whitespace-nowrap">
                      <Link
                        href={`/admin/administration/committee/${member.id}/edit`}
                        className="text-[#016B00] hover:underline font-medium"
                      >
                        Edit
                      </Link>
                      <form action={deleteCommitteeMember.bind(null, member.id, member.photo_url)} className="inline">
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
