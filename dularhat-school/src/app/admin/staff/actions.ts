'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

function validateStaffStrings(formData: FormData) {
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

export async function createStaff(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  validateStaffStrings(formData)
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
    const fileName = `staff/${crypto.randomUUID()}_${Date.now()}.${fileExt}`
    
    const { error: uploadError } = await supabase.storage
      .from('school-media')
      .upload(fileName, photoFile, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      console.error('Upload Error:', uploadError)
      throw new Error('Failed to upload photo')
    }

    const { data: publicUrlData } = supabase.storage.from('school-media').getPublicUrl(fileName)
    photo_url = publicUrlData.publicUrl
  }

  const { error: dbError } = await supabase.from('staff').insert({
    name_bn,
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
      const oldPath = photo_url.split('/school-media/')[1]
      if (oldPath) {
        await supabase.storage.from('school-media').remove([oldPath])
      }
    }
    throw new Error('Failed to create staff record')
  }

  revalidatePath('/admin/staff')
  revalidatePath('/staff')
  redirect('/admin/staff')
}

export async function updateStaff(id: string, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  validateStaffStrings(formData)
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
    const fileName = `staff/${crypto.randomUUID()}_${Date.now()}.${fileExt}`
    
    const { error: uploadError } = await supabase.storage
      .from('school-media')
      .upload(fileName, photoFile, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      console.error('Upload Error:', uploadError)
      throw new Error('Failed to upload new photo')
    }

    const { data: publicUrlData } = supabase.storage.from('school-media').getPublicUrl(fileName)
    const new_photo_url = publicUrlData.publicUrl

    if (photo_url) {
      try {
        const oldPath = photo_url.split('/school-media/')[1]
        if (oldPath) {
          await supabase.storage.from('school-media').remove([oldPath])
        }
      } catch (e) {
        console.error('Error deleting old photo', e)
      }
    }
    
    photo_url = new_photo_url
  } else if (formData.get('remove_photo') === 'true') {
    if (photo_url) {
      try {
        const oldPath = photo_url.split('/school-media/')[1]
        if (oldPath) {
          await supabase.storage.from('school-media').remove([oldPath])
        }
      } catch (e) {
        console.error('Error deleting old photo', e)
      }
    }
    photo_url = null
  }

  const { error: dbError } = await supabase.from('staff').update({
    name_bn,
    name_en: formData.get('name_en') || null,
    designation_bn: formData.get('designation_bn') as string,
    designation_en: formData.get('designation_en') || null,
    photo_url,
    sort_order: parseInt(formData.get('sort_order') as string || '10', 10),
    is_active: formData.get('is_active') === 'on',
    updated_at: new Date().toISOString()
  }).eq('id', id)

  if (dbError) {
    console.error('DB Error:', dbError)
    throw new Error('Failed to update staff record')
  }

  revalidatePath('/admin/staff')
  revalidatePath('/staff')
  redirect('/admin/staff')
}

export async function deleteStaff(id: string, photoUrl: string | null) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  if (photoUrl) {
    try {
      const oldPath = photoUrl.split('/school-media/')[1]
      if (oldPath) {
        await supabase.storage.from('school-media').remove([oldPath])
      }
    } catch (e) {
      console.error('Error deleting photo during staff deletion', e)
    }
  }

  const { error } = await supabase.from('staff').delete().eq('id', id)

  if (error) {
    console.error('DB Error:', error)
    throw new Error('Failed to delete staff record')
  }

  revalidatePath('/admin/staff')
  revalidatePath('/staff')
}
