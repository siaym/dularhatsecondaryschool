'use server'

import { createClient } from '@/utils/supabase/server'
import { requireAdmin } from '@/utils/supabase/admin'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createAcademicEvent(formData: FormData) {
  await requireAdmin()
  const supabase = await createClient()

  const title_bn = formData.get('title_bn') as string
  const title_en = formData.get('title_en') as string
  const description_bn = formData.get('description_bn') as string
  const description_en = formData.get('description_en') as string
  const event_date = formData.get('event_date') as string
  const end_date = formData.get('end_date') as string
  const event_type = formData.get('event_type') as string
  const is_published = formData.get('is_published') === 'true'

  if (!title_bn || !event_date) {
    throw new Error('Bengali title and event date are required.')
  }

  const { error } = await supabase.from('academic_events').insert({
    title_bn,
    title_en: title_en || null,
    description_bn: description_bn || null,
    description_en: description_en || null,
    event_date,
    end_date: end_date || null,
    event_type: event_type || 'general',
    is_published
  })

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/academics')
  revalidatePath('/academics')
  redirect('/admin/academics')
}

export async function updateAcademicEvent(id: string, formData: FormData) {
  await requireAdmin()
  const supabase = await createClient()

  const title_bn = formData.get('title_bn') as string
  const title_en = formData.get('title_en') as string
  const description_bn = formData.get('description_bn') as string
  const description_en = formData.get('description_en') as string
  const event_date = formData.get('event_date') as string
  const end_date = formData.get('end_date') as string
  const event_type = formData.get('event_type') as string
  const is_published = formData.get('is_published') === 'true'

  if (!title_bn || !event_date) {
    throw new Error('Bengali title and event date are required.')
  }

  const { error } = await supabase
    .from('academic_events')
    .update({
      title_bn,
      title_en: title_en || null,
      description_bn: description_bn || null,
      description_en: description_en || null,
      event_date,
      end_date: end_date || null,
      event_type: event_type || 'general',
      is_published
    })
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/academics')
  revalidatePath('/academics')
  redirect('/admin/academics')
}

export async function deleteAcademicEvent(id: string) {
  await requireAdmin()
  const supabase = await createClient()

  const { error } = await supabase
    .from('academic_events')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/academics')
  revalidatePath('/academics')
}

export async function toggleAcademicEventPublish(id: string, is_published: boolean) {
  await requireAdmin()
  const supabase = await createClient()

  const { error } = await supabase
    .from('academic_events')
    .update({ is_published })
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/academics')
  revalidatePath('/academics')
}
