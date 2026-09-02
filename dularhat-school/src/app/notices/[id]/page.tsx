import { createClient } from '@/utils/supabase/server'
import { NoticeDetailClient } from './NoticeDetailClient'
import { notFound } from 'next/navigation'

export const revalidate = 60

export default async function NoticeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient()
  
  const { id } = await params;

  // validate UUID to prevent Supabase error if someone types random string
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  
  if (!uuidRegex.test(id)) {
    notFound()
  }

  const { data: notice } = await supabase
    .from('notices')
    .select('*')
    .eq('id', id)
    .single()

  if (!notice) {
    notFound()
  }

  return <NoticeDetailClient notice={notice} />
}
