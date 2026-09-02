import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Bell, ImageIcon, Users, LogOut, Settings, LayoutDashboard, UserSquare2, UsersRound } from 'lucide-react'

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
          <Link href="/admin/administration/committee" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 font-medium">
            <UsersRound size={18} /> Managing Committee
          </Link>
          <Link href="/admin/academics" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-graduation-cap"><path d="M21.42 10.922a2 2 0 0 1-.019 3.022L12.55 22.42a2 2 0 0 1-2.923-.02l-8.6-8.914a2 2 0 0 1-.02-2.923l8.847-8.847a2 2 0 0 1 2.828 0l8.746 8.746Z"/><path d="M14 8h-4"/><path d="M12 11v8"/></svg> Academics
          </Link>
          <Link href="/admin/documents" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg> Documents
          </Link>
          <Link href="/admin/results" className="flex items-center gap-3 px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-award"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg> Results
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
