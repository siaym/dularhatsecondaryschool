'use server'

import { createClient } from '@/utils/supabase/server'
import { requireAdmin } from '@/utils/supabase/admin'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { uploadFile, deleteFileFromUrl } from '@/utils/supabase/storage'

function validateCommitteeStrings(formData: FormData) {
  const name_bn = formData.get('name_bn') as string
  if (!name_bn || name_bn.trim() === '') throw new Error('Name (Bengali) is required')
  if (name_bn.length > 255) throw new Error('Name (Bengali) is too long (max 255 chars)')
  
  const name_en = formData.get('name_en') as string | null
  if (name_en && name_en.length > 255) throw new Error('Name (English) is too long')
    
  const des_bn = formData.get('designation_bn') as string
  if (!des_bn || des_bn.trim() === '') throw new Error('Designation (Bengali) is required')
  if (des_bn.length > 255) throw new Error('Designation (Bengali) is too long')

  const des_en = formData.get('designation_en') as string | null
  if (des_en && des_en.length > 255) throw new Error('Designation (English) is too long')
}

export async function createCommitteeMember(formData: FormData) {
  const supabase = await createClient()
  await requireAdmin()

  validateCommitteeStrings(formData)
  
  const photoFile = formData.get('photo') as File | null
  let photo_url = null

  if (photoFile && photoFile.size > 0) {
    try {
      photo_url = await uploadFile({
        bucket: 'school-media',
        folder: 'administration/committee',
        file: photoFile,
        maxSizeBytes: 5 * 1024 * 1024,
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp']
      })
    } catch (e: unknown) {
      throw new Error(e instanceof Error ? e.message : 'Failed to upload photo')
    }
  }

  const { error: dbError } = await supabase.from('committee').insert({
    name_bn: formData.get('name_bn') as string,
    name_en: formData.get('name_en') || null,
    designation_bn: formData.get('designation_bn') as string,
    designation_en: formData.get('designation_en') || null,
    photo_url,
    sort_order: parseInt(formData.get('sort_order') as string || '10', 10),
    is_active: formData.get('is_active') === 'on'
  })

  if (dbError) {
    console.error('DB Error:', dbError)
    if (photo_url) {
      await deleteFileFromUrl('school-media', photo_url)
    }
    throw new Error('Failed to create committee member record')
  }

  revalidatePath('/admin/administration/committee')
  revalidatePath('/administration/committee')
  redirect('/admin/administration/committee')
}

export async function updateCommitteeMember(id: string, formData: FormData) {
  const supabase = await createClient()
  await requireAdmin()

  validateCommitteeStrings(formData)

  const photoFile = formData.get('photo') as File | null
  const photo_url = formData.get('current_photo_url') as string | null

  let new_photo_url = photo_url
  if (photoFile && photoFile.size > 0) {
    try {
      new_photo_url = await uploadFile({
        bucket: 'school-media',
        folder: 'administration/committee',
        file: photoFile,
        maxSizeBytes: 5 * 1024 * 1024,
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp']
      })
    } catch (e: unknown) {
      throw new Error(e instanceof Error ? e.message : 'Failed to upload new photo')
    }
  } else if (formData.get('remove_photo') === 'true') {
    new_photo_url = null
  }

  const { error: dbError } = await supabase.from('committee').update({
    name_bn: formData.get('name_bn') as string,
    name_en: formData.get('name_en') || null,
    designation_bn: formData.get('designation_bn') as string,
    designation_en: formData.get('designation_en') || null,
    photo_url: new_photo_url,
    sort_order: parseInt(formData.get('sort_order') as string || '10', 10),
    is_active: formData.get('is_active') === 'on',
    updated_at: new Date().toISOString()
  }).eq('id', id)

  if (dbError) {
    console.error('DB Error:', dbError)
    if (photoFile && photoFile.size > 0 && new_photo_url !== photo_url) {
      await deleteFileFromUrl('school-media', new_photo_url)
    }
    throw new Error('Failed to update committee member')
  }

  if (photoFile && photoFile.size > 0 && photo_url) {
    await deleteFileFromUrl('school-media', photo_url)
  } else if (formData.get('remove_photo') === 'true' && photo_url) {
    await deleteFileFromUrl('school-media', photo_url)
  }

  revalidatePath('/admin/administration/committee')
  revalidatePath('/administration/committee')
  redirect('/admin/administration/committee')
}

export async function deleteCommitteeMember(id: string, photoUrl: string | null) {
  const supabase = await createClient()
  await requireAdmin()

  await deleteFileFromUrl('school-media', photoUrl)

  const { error } = await supabase.from('committee').delete().eq('id', id)

  if (error) {
    console.error('DB Error:', error)
    throw new Error('Failed to delete committee member')
  }

  revalidatePath('/admin/administration/committee')
  revalidatePath('/administration/committee')
}
