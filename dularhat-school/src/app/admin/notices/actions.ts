'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

function validateNoticeStrings(formData: FormData) {
  const title_bn = formData.get('title_bn') as string
  if (!title_bn || title_bn.trim() === '') throw new Error('Title (Bengali) is required')
  if (title_bn.length > 255) throw new Error('Title (Bengali) is too long (max 255 chars)')
  
  const title_en = formData.get('title_en') as string | null
  if (title_en && title_en.length > 255) throw new Error('Title (English) is too long (max 255 chars)')
    
  const desc_bn = formData.get('description_bn') as string | null
  if (desc_bn && desc_bn.length > 5000) throw new Error('Description (Bengali) is too long')
    
  const desc_en = formData.get('description_en') as string | null
  if (desc_en && desc_en.length > 5000) throw new Error('Description (English) is too long')
}

export async function createNotice(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  validateNoticeStrings(formData)
  const title_bn = formData.get('title_bn') as string

  const { error } = await supabase.from('notices').insert({
    title_bn: title_bn,
    title_en: formData.get('title_en'),
    description_bn: formData.get('description_bn'),
    description_en: formData.get('description_en'),
    category: formData.get('category'),
    is_important: formData.get('is_important') === 'on',
    is_published: formData.get('is_published') === 'on',
    published_at: formData.get('is_published') === 'on' ? new Date().toISOString() : null,
  })

  if (error) {
    console.error('Error creating notice:', error)
    throw new Error('Failed to create notice')
  }

  revalidatePath('/admin/notices')
  revalidatePath('/notices')
  redirect('/admin/notices')
}

export async function updateNotice(id: string, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  validateNoticeStrings(formData)
  const title_bn = formData.get('title_bn') as string

  const { error } = await supabase.from('notices').update({
    title_bn: title_bn,
    title_en: formData.get('title_en'),
    description_bn: formData.get('description_bn'),
    description_en: formData.get('description_en'),
    category: formData.get('category'),
    is_important: formData.get('is_important') === 'on',
    is_published: formData.get('is_published') === 'on',
  }).eq('id', id)

  if (error) {
    console.error('Error updating notice:', error)
    throw new Error('Failed to update notice')
  }

  revalidatePath('/admin/notices')
  revalidatePath('/notices')
  revalidatePath(`/notices/${id}`)
  redirect('/admin/notices')
}

export async function deleteNotice(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const { error } = await supabase.from('notices').delete().eq('id', id)

  if (error) {
    console.error('Error deleting notice:', error)
    throw new Error('Failed to delete notice')
  }

  revalidatePath('/admin/notices')
  revalidatePath('/notices')
}
