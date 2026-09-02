'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

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
  if (imageFile.size > MAX_FILE_SIZE) {
    throw new Error('Image size must be less than 5MB')
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
  if (!allowedTypes.includes(imageFile.type)) {
    throw new Error('Only JPG, PNG, and WEBP images are allowed')
  }

  // Upload image
  const fileExt = imageFile.name.split('.').pop()?.replace(/[^a-zA-Z0-9]/g, '') || 'jpg'
  const fileName = `${crypto.randomUUID()}_${Date.now()}.${fileExt}`
  const filePath = `${fileName}`

  const { error: uploadError } = await supabase.storage
    .from('gallery')
    .upload(filePath, imageFile, {
      cacheControl: '3600',
      upsert: false
    })

  if (uploadError) {
    console.error('Upload Error:', uploadError)
    throw new Error('Failed to upload image')
  }

  const { data: publicUrlData } = supabase.storage.from('gallery').getPublicUrl(filePath)
  const imageUrl = publicUrlData.publicUrl

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
    // Optionally delete uploaded image if DB insert fails
    await supabase.storage.from('gallery').remove([filePath])
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
  if (imageFile && imageFile.size > 0) {
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    if (imageFile.size > MAX_FILE_SIZE) {
      throw new Error('Image size must be less than 5MB')
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(imageFile.type)) {
      throw new Error('Only JPG, PNG, and WEBP images are allowed')
    }

    const fileExt = imageFile.name.split('.').pop()?.replace(/[^a-zA-Z0-9]/g, '') || 'jpg'
    const fileName = `${crypto.randomUUID()}_${Date.now()}.${fileExt}`
    const filePath = `${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('gallery')
      .upload(filePath, imageFile, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      console.error('Upload Error:', uploadError)
      throw new Error('Failed to upload image')
    }

    const { data: publicUrlData } = supabase.storage.from('gallery').getPublicUrl(filePath)
    
    // Optional: Delete old image from storage. 
    // Requires parsing the file path from the old URL.
    if (imageUrl) {
      try {
        const oldPath = imageUrl.split('/gallery/')[1]
        if (oldPath) {
          await supabase.storage.from('gallery').remove([oldPath])
        }
      } catch (e) {
        console.error('Error deleting old image', e)
      }
    }

    imageUrl = publicUrlData.publicUrl
  }

  const { error: dbError } = await supabase.from('gallery').update({
    title_bn,
    title_en: formData.get('title_en'),
    category: formData.get('category'),
    image_url: imageUrl,
    is_published: formData.get('is_published') === 'on',
    sort_order: parseInt(formData.get('sort_order') as string || '0', 10),
  }).eq('id', id)

  if (dbError) {
    console.error('DB Error:', dbError)
    throw new Error('Failed to update gallery item')
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

  if (imageUrl) {
    try {
      const oldPath = imageUrl.split('/gallery/')[1]
      if (oldPath) {
        await supabase.storage.from('gallery').remove([oldPath])
      }
    } catch (e) {
      console.error('Error deleting image from storage', e)
    }
  }

  revalidatePath('/admin/gallery')
  revalidatePath('/gallery')
  revalidatePath('/')
}
