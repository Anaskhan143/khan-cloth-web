import { fabrics as staticFabrics, type Fabric, type FabricColor } from '../data/fabrics'
import { faqs as staticFaqs, type FaqItem } from '../data/faq'
import { metersGuide as staticMeters, type MeterGuideItem } from '../data/metersGuide'
import { reviews as staticReviews, type Review } from '../data/reviews'
import { isSupabaseConfigured, supabase, type DbFabric } from './supabase'

function mapFabric(row: DbFabric): Fabric {
  return {
    id: row.id,
    name: row.name,
    category: row.category as Fabric['category'],
    pricePerMeter: row.price_per_meter,
    note: row.note,
    description: row.description,
    colors: (Array.isArray(row.colors) ? row.colors : []) as FabricColor[],
    image: row.image ?? undefined,
    dummy: true,
  }
}

export async function fetchFabrics(): Promise<Fabric[]> {
  if (!supabase) return staticFabrics
  const { data, error } = await supabase
    .from('fabrics')
    .select('*')
    .order('sort_order', { ascending: true })
  if (error || !data?.length) return staticFabrics
  return data.map(mapFabric)
}

export async function fetchFaqs(): Promise<FaqItem[]> {
  if (!supabase) return staticFaqs
  const { data, error } = await supabase
    .from('faqs')
    .select('id, question, answer, sort_order')
    .order('sort_order', { ascending: true })
  if (error || !data?.length) return staticFaqs
  return data.map(({ id, question, answer }) => ({ id, question, answer }))
}

export async function fetchReviews(): Promise<Review[]> {
  if (!supabase) return staticReviews
  const { data, error } = await supabase
    .from('reviews')
    .select('id, name, city, text, sort_order')
    .order('sort_order', { ascending: true })
  if (error || !data?.length) return staticReviews
  return data.map(({ id, name, city, text }) => ({ id, name, city, text, dummy: true as const }))
}

export async function fetchMeters(): Promise<MeterGuideItem[]> {
  if (!supabase) return staticMeters
  const { data, error } = await supabase
    .from('meters_guide')
    .select('id, label, meters, note, sort_order')
    .order('sort_order', { ascending: true })
  if (error || !data?.length) return staticMeters
  return data.map(({ id, label, meters, note }) => ({ id, label, meters, note }))
}

export async function seedStarterContent() {
  if (!supabase) throw new Error('Supabase is not configured')

  const fabricRows = staticFabrics.map((f, i) => ({
    id: f.id,
    name: f.name,
    category: f.category,
    price_per_meter: f.pricePerMeter,
    note: f.note,
    description: f.description,
    colors: f.colors,
    image: f.image ?? null,
    sort_order: i,
  }))

  const faqRows = staticFaqs.map((f, i) => ({
    id: f.id,
    question: f.question,
    answer: f.answer,
    sort_order: i,
  }))

  const reviewRows = staticReviews.map((r, i) => ({
    id: r.id,
    name: r.name,
    city: r.city,
    text: r.text,
    sort_order: i,
  }))

  const meterRows = staticMeters.map((m, i) => ({
    id: m.id,
    label: m.label,
    meters: m.meters,
    note: m.note,
    sort_order: i,
  }))

  const results = await Promise.all([
    supabase.from('fabrics').upsert(fabricRows),
    supabase.from('faqs').upsert(faqRows),
    supabase.from('reviews').upsert(reviewRows),
    supabase.from('meters_guide').upsert(meterRows),
  ])

  const failed = results.find((r) => r.error)
  if (failed?.error) throw failed.error
}

export { isSupabaseConfigured }
