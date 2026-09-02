'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { uploadFile, deleteFileFromUrl } from '@/utils/supabase/storage'

const ALLOWED_EXAM_TYPES = ['SSC', 'JSC', 'School Examination', 'Other']
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
]
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

function validateResultStrings(formData: FormData) {
  const title_bn = formData.get('title_bn') as string
  if (!title_bn || title_bn.trim() === '') throw new Error('Title (Bengali) is required')
  if (title_bn.length > 255) throw new Error('Title (Bengali) is too long (max 255 chars)')
  
  const title_en = formData.get('title_en') as string | null
  if (title_en && title_en.length > 255) throw new Error('Title (English) is too long (max 255 chars)')

  const exam_type = formData.get('exam_type') as string
  if (!ALLOWED_EXAM_TYPES.includes(exam_type)) {
    throw new Error('Invalid exam type')
  }

  const year = parseInt(formData.get('year') as string, 10)
  if (isNaN(year) || year < 1900 || year > 2100) {
    throw new Error('Valid year is required')
  }

  const desc_bn = formData.get('description_bn') as string | null
  if (desc_bn && desc_bn.length > 5000) throw new Error('Description (Bengali) is too long')
    
  const desc_en = formData.get('description_en') as string | null
  if (desc_en && desc_en.length > 5000) throw new Error('Description (English) is too long')
}

export async function createResult(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  validateResultStrings(formData)

  const docFile = formData.get('file') as File | null
  if (!docFile || docFile.size === 0) {
    throw new Error('A document file is required')
  }

  let file_url = ''
  try {
    file_url = await uploadFile({
      bucket: 'school-media',
      folder: 'results',
      file: docFile,
      maxSizeBytes: MAX_FILE_SIZE,
      allowedMimeTypes: ALLOWED_MIME_TYPES
    })
  } catch (e: any) {
    throw new Error(e.message || 'Failed to upload document file')
  }

  const { error: dbError } = await supabase.from('results').insert({
    title_bn: formData.get('title_bn') as string,
    title_en: formData.get('title_en') || null,
    exam_type: formData.get('exam_type') as string,
    year: parseInt(formData.get('year') as string, 10),
    description_bn: formData.get('description_bn') || null,
    description_en: formData.get('description_en') || null,
    file_url,
    file_name: docFile.name,
    file_size: docFile.size,
    mime_type: docFile.type,
    is_published: formData.get('is_published') === 'on',
    sort_order: parseInt(formData.get('sort_order') as string || '10', 10),
  })

  if (dbError) {
    console.error('DB Error:', dbError)
    await deleteFileFromUrl('school-media', file_url)
    throw new Error('Failed to create result record')
  }

  revalidatePath('/admin/results')
  revalidatePath('/results')
  redirect('/admin/results')
}

export async function updateResult(id: string, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  validateResultStrings(formData)

  const docFile = formData.get('file') as File | null
  const old_file_url = formData.get('current_file_url') as string

  let final_file_url = old_file_url
  let final_file_name = formData.get('current_file_name') as string
  let final_file_size = parseInt(formData.get('current_file_size') as string || '0', 10)
  let final_mime_type = formData.get('current_mime_type') as string

  if (docFile && docFile.size > 0) {
    try {
      final_file_url = await uploadFile({
        bucket: 'school-media',
        folder: 'results',
        file: docFile,
        maxSizeBytes: MAX_FILE_SIZE,
        allowedMimeTypes: ALLOWED_MIME_TYPES
      })
      final_file_name = docFile.name
      final_file_size = docFile.size
      final_mime_type = docFile.type
    } catch (e: any) {
      throw new Error(e.message || 'Failed to upload new document file')
    }
  }

  const { error: dbError } = await supabase.from('results').update({
    title_bn: formData.get('title_bn') as string,
    title_en: formData.get('title_en') || null,
    exam_type: formData.get('exam_type') as string,
    year: parseInt(formData.get('year') as string, 10),
    description_bn: formData.get('description_bn') || null,
    description_en: formData.get('description_en') || null,
    file_url: final_file_url,
    file_name: final_file_name,
    file_size: final_file_size,
    mime_type: final_mime_type,
    is_published: formData.get('is_published') === 'on',
    sort_order: parseInt(formData.get('sort_order') as string || '10', 10),
    updated_at: new Date().toISOString()
  }).eq('id', id)

  if (dbError) {
    console.error('DB Error:', dbError)
    if (docFile && docFile.size > 0 && final_file_url !== old_file_url) {
      await deleteFileFromUrl('school-media', final_file_url)
    }
    throw new Error('Failed to update result record')
  }

  if (docFile && docFile.size > 0 && old_file_url) {
    await deleteFileFromUrl('school-media', old_file_url)
  }

  revalidatePath('/admin/results')
  revalidatePath('/results')
  redirect('/admin/results')
}

export async function deleteResult(id: string, fileUrl: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const { error: dbError } = await supabase.from('results').delete().eq('id', id)

  if (dbError) {
    console.error('DB Error:', dbError)
    throw new Error('Failed to delete result record')
  }

  await deleteFileFromUrl('school-media', fileUrl)

  revalidatePath('/admin/results')
  revalidatePath('/results')
}
