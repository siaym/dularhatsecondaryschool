'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

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
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  validateTeacherStrings(formData)
  const name_bn = formData.get('name_bn') as string

  let photo_url = null
  const photoFile = formData.get('photo') as File | null

  if (photoFile && photoFile.size > 0) {
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    if (photoFile.size > MAX_FILE_SIZE) {
      throw new Error('Photo size must be less than 5MB')
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(photoFile.type)) {
      throw new Error('Only JPG, PNG, and WEBP images are allowed')
    }

    const fileExt = photoFile.name.split('.').pop()?.replace(/[^a-zA-Z0-9]/g, '') || 'jpg'
    const fileName = `${crypto.randomUUID()}_${Date.now()}.${fileExt}`
    
    const { error: uploadError } = await supabase.storage
      .from('teachers')
      .upload(fileName, photoFile, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      console.error('Upload Error:', uploadError)
      throw new Error('Failed to upload photo')
    }

    const { data: publicUrlData } = supabase.storage.from('teachers').getPublicUrl(fileName)
    photo_url = publicUrlData.publicUrl
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
      const oldPath = photo_url.split('/teachers/')[1]
      if (oldPath) await supabase.storage.from('teachers').remove([oldPath])
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
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  validateTeacherStrings(formData)
  const name_bn = formData.get('name_bn') as string

  const photoFile = formData.get('photo') as File | null
  let photo_url = formData.get('current_photo_url') as string | null

  if (photoFile && photoFile.size > 0) {
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    if (photoFile.size > MAX_FILE_SIZE) {
      throw new Error('Photo size must be less than 5MB')
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(photoFile.type)) {
      throw new Error('Only JPG, PNG, and WEBP images are allowed')
    }

    const fileExt = photoFile.name.split('.').pop()?.replace(/[^a-zA-Z0-9]/g, '') || 'jpg'
    const fileName = `${crypto.randomUUID()}_${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('teachers')
      .upload(fileName, photoFile, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      console.error('Upload Error:', uploadError)
      throw new Error('Failed to upload photo')
    }

    const { data: publicUrlData } = supabase.storage.from('teachers').getPublicUrl(fileName)
    
    if (photo_url) {
      try {
        const oldPath = photo_url.split('/teachers/')[1]
        if (oldPath) {
          await supabase.storage.from('teachers').remove([oldPath])
        }
      } catch (e) {
        console.error('Error deleting old photo', e)
      }
    }

    photo_url = publicUrlData.publicUrl
  }

  const { error: dbError } = await supabase.from('teachers').update({
    name_bn,
    name_en: formData.get('name_en') || null,
    designation_bn: formData.get('designation_bn') as string,
    designation_en: formData.get('designation_en') || null,
    subject_bn: formData.get('subject_bn') || null,
    subject_en: formData.get('subject_en') || null,
    photo_url,
    sort_order: parseInt(formData.get('sort_order') as string || '10', 10),
    is_headmaster: formData.get('is_headmaster') === 'on',
    is_active: formData.get('is_active') === 'on',
    updated_at: new Date().toISOString()
  }).eq('id', id)

  if (dbError) {
    console.error('DB Error:', dbError)
    throw new Error('Failed to update teacher')
  }

  revalidatePath('/admin/teachers')
  revalidatePath('/teachers')
  revalidatePath('/')
  redirect('/admin/teachers')
}

export async function deleteTeacher(id: string, photoUrl: string | null) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const { error: dbError } = await supabase.from('teachers').delete().eq('id', id)

  if (dbError) {
    console.error('DB Error:', dbError)
    throw new Error('Failed to delete teacher')
  }

  if (photoUrl) {
    try {
      const oldPath = photoUrl.split('/teachers/')[1]
      if (oldPath) {
        await supabase.storage.from('teachers').remove([oldPath])
      }
    } catch (e) {
      console.error('Error deleting photo from storage', e)
    }
  }

  revalidatePath('/admin/teachers')
  revalidatePath('/teachers')
  revalidatePath('/')
}
