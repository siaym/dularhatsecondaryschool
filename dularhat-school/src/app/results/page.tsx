import { createClient } from '@/utils/supabase/server'
import { PageHeader } from '@/components/ui/PageHeader'
import { ResultClient } from './ResultClient'

export const revalidate = 3600 // Cache for 1 hour

export default async function ResultsPage() {
  const supabase = await createClient()

  // Fetch only published results
  const { data: results } = await supabase
    .from('results')
    .select('*')
    .eq('is_published', true)
    .order('year', { ascending: false })
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  return (
    <div>
      <PageHeader
        title={{ bengali: 'ফলাফল', english: 'Results' }}
        subtitle={{ 
          bengali: 'বিদ্যালয়ের সকল পরীক্ষার ফলাফল', 
          english: 'All school examination results' 
        }}
        breadcrumbs={[
          { label: { bengali: 'একাডেমিক', english: 'Academics' }, href: '/academics' },
          { label: { bengali: 'ফলাফল', english: 'Results' } }
        ]}
      />
      <ResultClient initialResults={results || []} />
    </div>
  )
}
