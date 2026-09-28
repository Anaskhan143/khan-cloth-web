import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const isSupabaseConfigured = Boolean(url && anonKey && !url.includes('YOUR_PROJECT'))

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url!, anonKey!)
  : null

export type DbFabric = {
  id: string
  name: string
  category: string
  price_per_meter: number
  note: string
  description: string
  colors: unknown
  image: string | null
  sort_order: number
}

export type DbFaq = {
  id: string
  question: string
  answer: string
  sort_order: number
}

export type DbReview = {
  id: string
  name: string
  city: string
  text: string
  sort_order: number
}

export type DbMeter = {
  id: string
  label: string
  meters: string
  note: string
  sort_order: number
}
