import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import type { Fabric } from '../data/fabrics'
import type { FaqItem } from '../data/faq'
import type { MeterGuideItem } from '../data/metersGuide'
import type { Review } from '../data/reviews'
import {
  fetchFabrics,
  fetchFaqs,
  fetchMeters,
  fetchReviews,
  isSupabaseConfigured,
} from '../lib/contentApi'

type ContentContextValue = {
  ready: boolean
  usingLive: boolean
  fabrics: Fabric[]
  faqs: FaqItem[]
  reviews: Review[]
  meters: MeterGuideItem[]
  refresh: () => Promise<void>
  getFabricById: (id: string) => Fabric | undefined
}

const ContentContext = createContext<ContentContextValue | null>(null)

export function ContentProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false)
  const [fabrics, setFabrics] = useState<Fabric[]>([])
  const [faqs, setFaqs] = useState<FaqItem[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [meters, setMeters] = useState<MeterGuideItem[]>([])

  const refresh = useCallback(async () => {
    const [f, q, r, m] = await Promise.all([
      fetchFabrics(),
      fetchFaqs(),
      fetchReviews(),
      fetchMeters(),
    ])
    setFabrics(f)
    setFaqs(q)
    setReviews(r)
    setMeters(m)
    setReady(true)
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  return (
    <ContentContext.Provider
      value={{
        ready,
        usingLive: isSupabaseConfigured,
        fabrics,
        faqs,
        reviews,
        meters,
        refresh,
        getFabricById: (id) => fabrics.find((f) => f.id === id),
      }}
    >
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used within ContentProvider')
  return ctx
}
