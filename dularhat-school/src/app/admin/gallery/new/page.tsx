import { GalleryForm } from '@/components/admin/GalleryForm'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewGalleryPage() {
  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/gallery" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft size={16} className="mr-1" /> Back to Gallery
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Upload Image</h1>
      </div>
      <GalleryForm />
    </div>
  )
}
