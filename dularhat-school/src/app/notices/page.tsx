import { createClient } from '@/utils/supabase/server'
import { NoticesClient } from './NoticesClient'

export const revalidate = 60

export default async function NoticesPage() {
  const supabase = await createClient()
  
  const { data: notices } = await supabase
    .from('notices')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  return <NoticesClient notices={notices || []} />
}
