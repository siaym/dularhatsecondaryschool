import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import EditAcademicEventForm from './EditAcademicEventForm'

export default async function EditAcademicEventPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  const { data: event } = await supabase
    .from('academic_events')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!event) {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto">
      <EditAcademicEventForm event={event} />
    </div>
  )
}
