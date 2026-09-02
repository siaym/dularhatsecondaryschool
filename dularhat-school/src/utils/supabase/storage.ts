import { createClient } from './server'

type UploadOptions = {
  bucket: string;
  folder: string;
  file: File;
  maxSizeBytes: number;
  allowedMimeTypes: string[];
}

/**
 * Uploads a file to Supabase storage with strict validation.
 * @returns The public URL of the uploaded file.
 * @throws Error if validation or upload fails.
 */
export async function uploadFile({
  bucket,
  folder,
  file,
  maxSizeBytes,
  allowedMimeTypes
}: UploadOptions): Promise<string> {
  if (!file || file.size === 0) {
    throw new Error('A file is required')
  }

  if (file.size > maxSizeBytes) {
    const mb = Math.round(maxSizeBytes / (1024 * 1024))
    throw new Error(`File size must be less than ${mb}MB`)
  }

  if (!allowedMimeTypes.includes(file.type)) {
    throw new Error(`Invalid file type. Allowed: ${allowedMimeTypes.join(', ')}`)
  }

  const fileExt = file.name.split('.').pop()?.replace(/[^a-zA-Z0-9]/g, '') || 'bin'
  const fileName = `${folder}/${crypto.randomUUID()}_${Date.now()}.${fileExt}`
  
  const supabase = await createClient()

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (uploadError) {
    console.error('Upload Error:', uploadError)
    throw new Error('Failed to upload file to storage')
  }

  const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(fileName)
  return publicUrlData.publicUrl
}

/**
 * Safely deletes a file from a Supabase storage bucket given its public URL.
 * Does not throw if the file URL is empty or deletion fails (it only logs), 
 * to prevent breaking the main database transaction flow.
 */
export async function deleteFileFromUrl(bucket: string, publicUrl: string | null | undefined) {
  if (!publicUrl) return;

  try {
    const supabase = await createClient()
    const urlParts = publicUrl.split(`/${bucket}/`)
    if (urlParts.length > 1) {
      const path = urlParts[1]
      await supabase.storage.from(bucket).remove([path])
    }
  } catch (e) {
    console.error(`Failed to delete file ${publicUrl} from bucket ${bucket}`, e)
  }
}
