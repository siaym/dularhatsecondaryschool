'use server'

import { createClient } from '@/utils/supabase/server'
import { requireAdmin } from '@/utils/supabase/admin'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { uploadFile, deleteFileFromUrl } from '@/utils/supabase/storage'

const ALLOWED_CATEGORIES = ['admission', 'routine', 'syllabus', 'examination', 'academic', 'academic_calendar', 'forms', 'other']
const ALLOWED_MIME_TYPES = [
  'application/pdf', 
  'application/msword', 
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
]
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

function validateDocumentStrings(formData: FormData) {
  const title_bn = formData.get('title_bn') as string
  if (!title_bn || title_bn.trim() === '') throw new Error('Title (Bengali) is required')
  if (title_bn.length > 255) throw new Error('Title (Bengali) is too long (max 255 chars)')
  
  const title_en = formData.get('title_en') as string | null
  if (title_en && title_en.length > 255) throw new Error('Title (English) is too long')
    
  const desc_bn = formData.get('description_bn') as string | null
  if (desc_bn && desc_bn.length > 5000) throw new Error('Description (Bengali) is too long')

  const desc_en = formData.get('description_en') as string | null
  if (desc_en && desc_en.length > 5000) throw new Error('Description (English) is too long')

  const category = formData.get('category') as string
  if (!ALLOWED_CATEGORIES.includes(category)) throw new Error('Invalid category')
}

export async function createDocument(formData: FormData) {
  const supabase = await createClient()
  await requireAdmin()

  validateDocumentStrings(formData)
  
  const docFile = formData.get('file') as File | null
  if (!docFile || docFile.size === 0) {
    throw new Error('A document file is required')
  }

  let file_url = ''
  try {
    file_url = await uploadFile({
      bucket: 'school-media',
      folder: 'documents',
      file: docFile,
      maxSizeBytes: MAX_FILE_SIZE,
      allowedMimeTypes: ALLOWED_MIME_TYPES
    })
  } catch (e: unknown) {
      throw new Error(e instanceof Error ? e.message : 'Failed to upload document file')
    }

  const { error: dbError } = await supabase.from('documents').insert({
    title_bn: formData.get('title_bn') as string,
    title_en: formData.get('title_en') || null,
    description_bn: formData.get('description_bn') || null,
    description_en: formData.get('description_en') || null,
    category: formData.get('category') as string,
    file_url,
    file_name: docFile.name,
    file_size: docFile.size,
    mime_type: docFile.type,
    is_published: formData.get('is_published') === 'on',
    sort_order: parseInt(formData.get('sort_order') as string || '10', 10),
  })

  if (dbError) {
    console.error('DB Error:', dbError)
    // Cleanup orphaned upload safely
    await deleteFileFromUrl('school-media', file_url)
    throw new Error('Failed to create document record')
  }

  revalidatePath('/admin/documents')
  revalidatePath('/documents')
  redirect('/admin/documents')
}

export async function updateDocument(id: string, formData: FormData) {
  const supabase = await createClient()
  await requireAdmin()

  validateDocumentStrings(formData)
  
  const docFile = formData.get('file') as File | null
  const old_file_url = formData.get('current_file_url') as string
  
  let final_file_url = old_file_url
  let final_file_name = formData.get('current_file_name') as string | null
  let final_file_size = formData.get('current_file_size') ? parseInt(formData.get('current_file_size') as string) : null
  let final_mime_type = formData.get('current_mime_type') as string | null

  // If a new file is uploaded
  if (docFile && docFile.size > 0) {
    try {
      final_file_url = await uploadFile({
        bucket: 'school-media',
        folder: 'documents',
        file: docFile,
        maxSizeBytes: MAX_FILE_SIZE,
        allowedMimeTypes: ALLOWED_MIME_TYPES
      })
      final_file_name = docFile.name
      final_file_size = docFile.size
      final_mime_type = docFile.type
    } catch (e: unknown) {
      throw new Error(e instanceof Error ? e.message : 'Failed to upload new document file')
    }
  }

  const { error: dbError } = await supabase.from('documents').update({
    title_bn: formData.get('title_bn') as string,
    title_en: formData.get('title_en') || null,
    description_bn: formData.get('description_bn') || null,
    description_en: formData.get('description_en') || null,
    category: formData.get('category') as string,
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
    // Cleanup new orphaned upload safely if DB fails
    if (docFile && docFile.size > 0 && final_file_url !== old_file_url) {
      await deleteFileFromUrl('school-media', final_file_url)
    }
    throw new Error('Failed to update document record')
  }

  // If DB succeeds and we uploaded a new file, delete the old file
  if (docFile && docFile.size > 0 && old_file_url) {
    await deleteFileFromUrl('school-media', old_file_url)
  }

  revalidatePath('/admin/documents')
  revalidatePath('/documents')
  redirect('/admin/documents')
}

export async function deleteDocument(id: string, fileUrl: string) {
  const supabase = await createClient()
  await requireAdmin()

  const { error } = await supabase.from('documents').delete().eq('id', id)

  if (error) {
    console.error('DB Error:', error)
    throw new Error('Failed to delete document record')
  }

  await deleteFileFromUrl('school-media', fileUrl)

  revalidatePath('/admin/documents')
  revalidatePath('/documents')
}
