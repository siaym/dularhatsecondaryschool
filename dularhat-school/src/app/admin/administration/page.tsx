import Link from 'next/link'
import { Users, User, Shield } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'

export default async function AdministrationDashboard() {
  const supabase = await createClient()

  // Fetch some quick stats
  const { count: committeeCount } = await supabase.from('committee').select('*', { count: 'exact', head: true })
  
  const { data: headmasterData } = await supabase
    .from('teachers')
    .select('id, name_bn, name_en')
    .eq('is_headmaster', true)
    .single()

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Administration</h1>
        <p className="text-gray-500 mt-1">Manage the school's leadership, managing committee, and institutional information.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Headmaster Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col h-full">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-[#016B00]">
              <User size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Headmaster</h2>
              <p className="text-sm text-gray-500">School Principal</p>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6 flex-grow">
            <p className="text-sm text-gray-600 mb-1">Current Headmaster:</p>
            <p className="font-semibold text-gray-900">
              {headmasterData ? (headmasterData.name_bn || headmasterData.name_en) : 'Not assigned'}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              The headmaster is managed in the Teachers module. The welcome message is managed in Settings.
            </p>
          </div>

          <div className="flex gap-3 mt-auto">
            {headmasterData ? (
              <Link 
                href={`/admin/teachers/${headmasterData.id}/edit`}
                className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 text-center transition-colors"
              >
                Edit Profile
              </Link>
            ) : (
              <Link 
                href="/admin/teachers"
                className="flex-1 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 text-center transition-colors"
              >
                Assign in Teachers
              </Link>
            )}
            <Link 
              href="/admin/settings"
              className="flex-1 bg-[#016B00] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#024D00] text-center transition-colors"
            >
              Edit Message
            </Link>
          </div>
        </div>

        {/* Managing Committee Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col h-full">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center text-[#016B00]">
              <Users size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Managing Committee</h2>
              <p className="text-sm text-gray-500">Including Chairman</p>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6 flex-grow flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Members</p>
              <p className="text-2xl font-bold text-gray-900">{committeeCount || 0}</p>
            </div>
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100">
              <Shield size={20} className="text-[#016B00]" />
            </div>
          </div>

          <Link 
            href="/admin/administration/committee"
            className="w-full bg-[#016B00] text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-[#024D00] text-center transition-colors mt-auto block"
          >
            Manage Committee
          </Link>
        </div>

      </div>
    </div>
  )
}
