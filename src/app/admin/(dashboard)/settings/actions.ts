'use server'

import { createClient } from '@/utils/supabase/server'
import { requireAdmin } from '@/utils/supabase/admin'
import { revalidatePath } from 'next/cache'

function validateSettingsStrings(formData: FormData) {
  const fields = [
    'school_name_bn', 'school_name_en', 'phone', 'email', 
    'address_bn', 'address_en', 'eiin', 'facebook_url', 'youtube_url',
    'footer_description_bn', 'footer_description_en'
  ]
  for (const field of fields) {
    const val = formData.get(field) as string | null
    if (val && val.length > 500) throw new Error(`${field} is too long`)
  }

  const messageFields = [
    'headmaster_message_bn', 'headmaster_message_en',
    'chairman_message_bn', 'chairman_message_en'
  ]
  for (const field of messageFields) {
    const val = formData.get(field) as string | null
    if (val && val.length > 10000) throw new Error(`${field} is too long`)
  }
}

export async function updateSettings(formData: FormData) {
  const supabase = await createClient()
  await requireAdmin()

  validateSettingsStrings(formData)

  const { error } = await supabase.from('school_settings').upsert({
    id: 1,
    school_name_bn: formData.get('school_name_bn') || null,
    school_name_en: formData.get('school_name_en') || null,
    phone: formData.get('phone') || null,
    email: formData.get('email') || null,
    address_bn: formData.get('address_bn') || null,
    address_en: formData.get('address_en') || null,
    established_year: parseInt(formData.get('established_year') as string || '1963', 10),
    eiin: formData.get('eiin') || null,
    facebook_url: formData.get('facebook_url') || null,
    youtube_url: formData.get('youtube_url') || null,
    headmaster_message_bn: formData.get('headmaster_message_bn') || null,
    headmaster_message_en: formData.get('headmaster_message_en') || null,
    chairman_message_bn: formData.get('chairman_message_bn') || null,
    chairman_message_en: formData.get('chairman_message_en') || null,
    footer_description_bn: formData.get('footer_description_bn') || null,
    footer_description_en: formData.get('footer_description_en') || null,
    updated_at: new Date().toISOString()
  }).eq('id', 1)

  if (error) {
    console.error('DB Error:', error)
    throw new Error('Failed to update settings')
  }

  // Revalidate all pages since settings are global
  revalidatePath('/', 'layout')
}
