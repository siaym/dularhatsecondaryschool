'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createTeacher(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const name_bn = formData.get('name_bn') as string
  if (!name_bn || name_bn.trim() === '') {
    throw new Error('Name (Bengali) is required')
  }

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
    is_active: formData.get('is_active') === 'on',
    sort_order: parseInt(formData.get('sort_order') as string || '0', 10),
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

  const name_bn = formData.get('name_bn') as string
  if (!name_bn || name_bn.trim() === '') {
    throw new Error('Name (Bengali) is required')
  }

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
    is_active: formData.get('is_active') === 'on',
    sort_order: parseInt(formData.get('sort_order') as string || '0', 10),
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
