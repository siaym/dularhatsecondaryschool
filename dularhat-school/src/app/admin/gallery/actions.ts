'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { uploadFile, deleteFileFromUrl } from '@/utils/supabase/storage'

function validateGalleryStrings(formData: FormData) {
  const title_bn = formData.get('title_bn') as string
  if (!title_bn || title_bn.trim() === '') throw new Error('Title (Bengali) is required')
  if (title_bn.length > 255) throw new Error('Title (Bengali) is too long (max 255 chars)')
  
  const title_en = formData.get('title_en') as string | null
  if (title_en && title_en.length > 255) throw new Error('Title (English) is too long (max 255 chars)')
}

export async function createGalleryItem(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  validateGalleryStrings(formData)
  const title_bn = formData.get('title_bn') as string

  const imageFile = formData.get('image') as File | null
  if (!imageFile || imageFile.size === 0) {
    throw new Error('Image is required')
  }

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']

  let imageUrl = ''
  try {
    imageUrl = await uploadFile({
      bucket: 'school-media',
      folder: 'gallery',
      file: imageFile,
      maxSizeBytes: MAX_FILE_SIZE,
      allowedMimeTypes: allowedTypes
    })
  } catch (e: any) {
    throw new Error(e.message || 'Failed to upload image')
  }

  // Insert into DB
  const { error: dbError } = await supabase.from('gallery').insert({
    title_bn,
    title_en: formData.get('title_en'),
    category: formData.get('category'),
    image_url: imageUrl,
    is_published: formData.get('is_published') === 'on',
    sort_order: parseInt(formData.get('sort_order') as string || '0', 10),
  })

  if (dbError) {
    console.error('DB Error:', dbError)
    await deleteFileFromUrl('school-media', imageUrl)
    throw new Error('Failed to create gallery item')
  }

  revalidatePath('/admin/gallery')
  revalidatePath('/gallery')
  revalidatePath('/')
  redirect('/admin/gallery')
}

export async function updateGalleryItem(id: string, formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  validateGalleryStrings(formData)
  const title_bn = formData.get('title_bn') as string

  const imageFile = formData.get('image') as File | null
  let imageUrl = formData.get('current_image_url') as string

  // If a new image is uploaded
  let newImageUrl = imageUrl
  if (imageFile && imageFile.size > 0) {
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']

    try {
      newImageUrl = await uploadFile({
        bucket: 'school-media',
        folder: 'gallery',
        file: imageFile,
        maxSizeBytes: MAX_FILE_SIZE,
        allowedMimeTypes: allowedTypes
      })
    } catch (e: any) {
      throw new Error(e.message || 'Failed to upload image')
    }
  }

  const { error: dbError } = await supabase.from('gallery').update({
    title_bn,
    title_en: formData.get('title_en'),
    category: formData.get('category'),
    image_url: newImageUrl,
    is_published: formData.get('is_published') === 'on',
    sort_order: parseInt(formData.get('sort_order') as string || '0', 10),
  }).eq('id', id)

  if (dbError) {
    console.error('DB Error:', dbError)
    if (imageFile && imageFile.size > 0 && newImageUrl !== imageUrl) {
      await deleteFileFromUrl('school-media', newImageUrl)
    }
    throw new Error('Failed to update gallery item')
  }

  if (imageFile && imageFile.size > 0 && imageUrl) {
    await deleteFileFromUrl('school-media', imageUrl)
  }

  revalidatePath('/admin/gallery')
  revalidatePath('/gallery')
  revalidatePath('/')
  redirect('/admin/gallery')
}

export async function deleteGalleryItem(id: string, imageUrl: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const { error: dbError } = await supabase.from('gallery').delete().eq('id', id)

  if (dbError) {
    console.error('DB Error:', dbError)
    throw new Error('Failed to delete gallery item')
  }

  await deleteFileFromUrl('school-media', imageUrl)

  revalidatePath('/admin/gallery')
  revalidatePath('/gallery')
  revalidatePath('/')
}
