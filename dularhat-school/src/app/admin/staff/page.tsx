import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { Plus } from 'lucide-react'
import { deleteStaff } from './actions'

export default async function AdminStaffPage() {
  const supabase = await createClient()
  const { data: staffList } = await supabase
    .from('staff')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Staff</h1>
        <Link
          href="/admin/staff/new"
          className="bg-[#016B00] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#024D00] flex items-center gap-2 shadow-sm transition-colors"
        >
          <Plus size={16} /> Add Staff
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-500">
                <th className="px-6 py-4 font-medium w-24">Photo</th>
                <th className="px-6 py-4 font-medium">Name (BN)</th>
                <th className="px-6 py-4 font-medium">Designation</th>
                <th className="px-6 py-4 font-medium">Order</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {(!staffList || staffList.length === 0) ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No staff found. Add one!
                  </td>
                </tr>
              ) : (
                staffList.map((staff) => (
                  <tr key={staff.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center">
                        {staff.photo_url ? (
                          <Image
                            src={staff.photo_url}
                            alt={staff.name_bn}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <span className="text-gray-400 font-bold text-lg">
                            {staff.name_bn.charAt(0)}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {staff.name_bn}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {staff.designation_bn}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {staff.sort_order}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        staff.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {staff.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-right space-x-3">
                      <Link
                        href={`/admin/staff/${staff.id}/edit`}
                        className="text-[#016B00] hover:underline font-medium"
                      >
                        Edit
                      </Link>
                      <form action={deleteStaff.bind(null, staff.id, staff.photo_url)} className="inline">
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
