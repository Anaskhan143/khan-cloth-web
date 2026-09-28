import { heicTo, isHeic } from 'heic-to'
import { supabase } from './supabase'

const BUCKET = 'fabrics'

function isHeicLike(file: File) {
  const type = file.type.toLowerCase()
  const name = file.name.toLowerCase()
  return (
    type === 'image/heic' ||
    type === 'image/heif' ||
    name.endsWith('.heic') ||
    name.endsWith('.heif')
  )
}

function isLikelyImage(file: File) {
  if (file.type.startsWith('image/')) return true
  if (isHeicLike(file)) return true
  return /\.(jpe?g|png|gif|webp|bmp|avif|heic|heif)$/i.test(file.name)
}

function fileExt(file: File) {
  const fromName = file.name.split('.').pop()?.toLowerCase()
  if (fromName && /^[a-z0-9]+$/.test(fromName) && fromName.length <= 5) {
    if (fromName === 'heic' || fromName === 'heif') return 'jpg'
    return fromName
  }
  if (file.type === 'image/png') return 'png'
  if (file.type === 'image/webp') return 'webp'
  if (file.type === 'image/gif') return 'gif'
  return 'jpg'
}

/** Convert HEIC/HEIF (and similar) to JPEG so every browser can display them. */
async function prepareImageFile(file: File): Promise<File> {
  const looksHeic = isHeicLike(file)
  const detectedHeic = looksHeic || (await isHeic(file).catch(() => false))
  if (!detectedHeic) return file

  const blob = await heicTo({
    blob: file,
    type: 'image/jpeg',
    quality: 0.92,
  })
  const base = file.name.replace(/\.(heic|heif)$/i, '') || 'photo'
  return new File([blob], `${base}.jpg`, { type: 'image/jpeg' })
}

/** Upload an image to the public `fabrics` storage bucket; returns its public URL. */
export async function uploadFabricImage(file: File, folder: string): Promise<string> {
  if (!supabase) throw new Error('Supabase is not configured.')
  if (!isLikelyImage(file)) throw new Error('Please choose an image file.')

  const ready = await prepareImageFile(file)
  const path = `${folder.replace(/^\/+|\/+$/g, '')}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${fileExt(ready)}`
  const { error } = await supabase.storage.from(BUCKET).upload(path, ready, {
    cacheControl: '3600',
    upsert: false,
    contentType: ready.type || 'image/jpeg',
  })
  if (error) throw error

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}
