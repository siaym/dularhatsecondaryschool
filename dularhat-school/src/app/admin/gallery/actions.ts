'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createGalleryItem(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const title_bn = formData.get('title_bn') as string
  if (!title_bn || title_bn.trim() === '') {
    throw new Error('Title (Bengali) is required')
  }

  const imageFile = formData.get('image') as File | null
  if (!imageFile || imageFile.size === 0) {
    throw new Error('Image is required')
  }

  // Upload image
  const fileExt = imageFile.name.split('.').pop()
  const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
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
    display_order: parseInt(formData.get('display_order') as string || '0', 10),
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

  const title_bn = formData.get('title_bn') as string
  if (!title_bn || title_bn.trim() === '') {
    throw new Error('Title (Bengali) is required')
  }

  const imageFile = formData.get('image') as File | null
  let imageUrl = formData.get('current_image_url') as string

  // If a new image is uploaded
  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`
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
    display_order: parseInt(formData.get('display_order') as string || '0', 10),
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
