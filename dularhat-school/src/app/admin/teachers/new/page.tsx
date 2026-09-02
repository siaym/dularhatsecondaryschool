import { TeacherForm } from '@/components/admin/TeacherForm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewTeacherPage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/teachers" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft size={16} className="mr-1" /> Back to Teachers
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Add New Teacher</h1>
      </div>
      <TeacherForm />
    </div>
  )
}
