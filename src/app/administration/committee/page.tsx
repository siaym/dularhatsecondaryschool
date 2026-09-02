import { createClient } from '@/utils/supabase/server'
import { PageHeader } from '@/components/ui/PageHeader'
import { CommitteeClient } from './CommitteeClient'

export const revalidate = 3600 // Cache for 1 hour

export default async function CommitteePage() {
  const supabase = await createClient()

  // Fetch active committee members
  const { data: members } = await supabase
    .from('committee')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })

  return (
    <div>
      <PageHeader
        title={{ bengali: 'ম্যানেজিং কমিটি', english: 'Managing Committee' }}
        subtitle={{ 
          bengali: 'বিদ্যালয় পরিচালনা পর্ষদ', 
          english: 'School Managing Committee' 
        }}
        breadcrumbs={[
          { label: { bengali: 'প্রশাসন', english: 'Administration' }, href: '/administration' },
          { label: { bengali: 'ম্যানেজিং কমিটি', english: 'Committee' } }
        ]}
      />
      <CommitteeClient initialMembers={members || []} />
    </div>
  )
}
