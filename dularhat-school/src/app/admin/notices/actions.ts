'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createNotice(formData: FormData) {
  const supabase = await createClient()

  const { error } = await supabase.from('notices').insert({
    title_bn: formData.get('title_bn'),
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

  const { error } = await supabase.from('notices').update({
    title_bn: formData.get('title_bn'),
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

  const { error } = await supabase.from('notices').delete().eq('id', id)

  if (error) {
    console.error('Error deleting notice:', error)
    throw new Error('Failed to delete notice')
  }

  revalidatePath('/admin/notices')
  revalidatePath('/notices')
}
