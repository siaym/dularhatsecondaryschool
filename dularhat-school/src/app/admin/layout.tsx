import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Bell, ImageIcon, Users, LogOut, Settings, LayoutDashboard, UserSquare2 } from 'lucide-react'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex-col hidden md:flex h-screen sticky top-0">
        <div className="h-16 flex items-center px-6 border-b border-gray-200 shrink-0">
          <Link href="/admin" className="font-bold text-lg text-gray-900 flex items-center gap-2">
            <span className="w-8 h-8 bg-[#016B00] text-white rounded flex items-center justify-center text-sm">DS</span>
            Admin Panel
          </Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 font-medium">
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link href="/admin/notices" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 font-medium">
            <Bell size={18} /> Notices
          </Link>
          <Link href="/admin/gallery" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 font-medium">
            <ImageIcon size={18} /> Gallery
          </Link>
          <Link href="/admin/teachers" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 font-medium">
            <Users size={18} /> Teachers
          </Link>
          <Link href="/admin/staff" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 font-medium">
            <UserSquare2 size={18} /> Staff
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 font-medium">
            <Settings size={18} /> Settings
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-200 shrink-0">
          <form action="/auth/signout" method="post">
            <button className="flex w-full items-center gap-3 px-3 py-2 text-red-600 rounded-md hover:bg-red-50 font-medium">
              <LogOut size={18} /> Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <div className="h-16 bg-white border-b border-gray-200 flex items-center px-6 md:hidden sticky top-0 z-10 shrink-0">
          <Link href="/admin" className="font-bold text-lg text-gray-900">
            Dularhat Admin
          </Link>
        </div>
        <div className="flex-1 p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
