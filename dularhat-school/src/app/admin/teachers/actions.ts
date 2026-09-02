'use server'

import { createClient } from '@/utils/supabase/server'
import { requireAdmin } from '@/utils/supabase/admin'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { uploadFile, deleteFileFromUrl } from '@/utils/supabase/storage'

function validateTeacherStrings(formData: FormData) {
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

  const sub_bn = formData.get('subject_bn') as string | null
  if (sub_bn && sub_bn.length > 255) throw new Error('Subject (Bengali) is too long')
    
  const sub_en = formData.get('subject_en') as string | null
  if (sub_en && sub_en.length > 255) throw new Error('Subject (English) is too long')
}

export async function createTeacher(formData: FormData) {
  const supabase = await createClient()
  await requireAdmin()

  validateTeacherStrings(formData)
  const name_bn = formData.get('name_bn') as string

  let photo_url = null
  const photoFile = formData.get('photo') as File | null

  if (photoFile && photoFile.size > 0) {
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    try {
      photo_url = await uploadFile({
        bucket: 'school-media',
        folder: 'teachers',
        file: photoFile,
        maxSizeBytes: MAX_FILE_SIZE,
        allowedMimeTypes: allowedTypes
      })
    } catch (e: unknown) {
      throw new Error(e instanceof Error ? e.message : 'Failed to upload photo')
    }
  }

  const { error: dbError } = await supabase.from('teachers').insert({
    name_bn,
    name_en: formData.get('name_en') || null,
    designation_bn: formData.get('designation_bn') as string,
    designation_en: formData.get('designation_en') || null,
    subject_bn: formData.get('subject_bn') || null,
    subject_en: formData.get('subject_en') || null,
    photo_url,
    is_headmaster: formData.get('is_headmaster') === 'on',
    is_active: formData.get('is_active') === 'on',
    sort_order: parseInt(formData.get('sort_order') as string || '10', 10),
  })

  if (dbError) {
    console.error('DB Error:', dbError)
    if (photo_url) {
      await deleteFileFromUrl('school-media', photo_url)
    }
    throw new Error('Failed to create teacher')
  }

  revalidatePath('/admin/teachers')
  revalidatePath('/teachers')
  revalidatePath('/')
  redirect('/admin/teachers')
}

export async function updateTeacher(id: string, formData: FormData) {
  const supabase = await createClient()
  await requireAdmin()

  validateTeacherStrings(formData)
  const name_bn = formData.get('name_bn') as string

  const photoFile = formData.get('photo') as File | null
  const photo_url = formData.get('current_photo_url') as string | null

  let new_photo_url = photo_url
  if (photoFile && photoFile.size > 0) {
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']

    try {
      new_photo_url = await uploadFile({
        bucket: 'school-media',
        folder: 'teachers',
        file: photoFile,
        maxSizeBytes: MAX_FILE_SIZE,
        allowedMimeTypes: allowedTypes
      })
    } catch (e: unknown) {
      throw new Error(e instanceof Error ? e.message : 'Failed to upload photo')
    }
  }

  const { error: dbError } = await supabase.from('teachers').update({
    name_bn,
    name_en: formData.get('name_en') || null,
    designation_bn: formData.get('designation_bn') as string,
    designation_en: formData.get('designation_en') || null,
    subject_bn: formData.get('subject_bn') || null,
    subject_en: formData.get('subject_en') || null,
    photo_url: new_photo_url,
    sort_order: parseInt(formData.get('sort_order') as string || '10', 10),
    is_headmaster: formData.get('is_headmaster') === 'on',
    is_active: formData.get('is_active') === 'on',
    updated_at: new Date().toISOString()
  }).eq('id', id)

  if (dbError) {
    console.error('DB Error:', dbError)
    if (photoFile && photoFile.size > 0 && new_photo_url !== photo_url) {
      await deleteFileFromUrl('school-media', new_photo_url)
    }
    throw new Error('Failed to update teacher')
  }

  if (photoFile && photoFile.size > 0 && photo_url) {
    await deleteFileFromUrl('school-media', photo_url)
  }

  revalidatePath('/admin/teachers')
  revalidatePath('/teachers')
  revalidatePath('/')
  redirect('/admin/teachers')
}

export async function deleteTeacher(id: string, photoUrl: string | null) {
  const supabase = await createClient()
  await requireAdmin()

  await deleteFileFromUrl('school-media', photoUrl)

  const { error: dbError } = await supabase.from('teachers').delete().eq('id', id)

  if (dbError) {
    console.error('DB Error:', dbError)
    throw new Error('Failed to delete teacher')
  }

  revalidatePath('/admin/teachers')
  revalidatePath('/teachers')
  revalidatePath('/')
}
