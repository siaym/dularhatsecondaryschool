import { GalleryForm } from '@/components/admin/GalleryForm'
import { createClient } from '@/utils/supabase/server'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default async function EditGalleryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const supabase = await createClient()
  
  const { data: item } = await supabase
    .from('gallery')
    .select('*')
    .eq('id', resolvedParams.id)
    .single()

  if (!item) {
    notFound()
  }

  return (
    <div>
      <div className="mb-6">
        <Link href="/admin/gallery" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft size={16} className="mr-1" /> Back to Gallery
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Edit Image Details</h1>
      </div>
      <GalleryForm item={item} />
    </div>
  )
}
