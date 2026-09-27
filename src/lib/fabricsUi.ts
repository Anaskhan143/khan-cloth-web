import type { Fabric, FabricCategory, StockStatus } from '../data/fabrics'
import { fabrics } from '../data/fabrics'

export const fabricCategories: Array<FabricCategory | 'All'> = [
  'All',
  'Lawn',
  'Boski',
  'Wash & Wear',
  'Linen',
  'Winter',
  'Satin',
  'Occasion',
]

export function filterFabrics(
  items: Fabric[],
  query: string,
  category: FabricCategory | 'All',
) {
  const q = query.trim().toLowerCase()
  return items.filter((fabric) => {
    const catOk = category === 'All' || fabric.category === category
    if (!catOk) return false
    if (!q) return true
    const hay = [
      fabric.name,
      fabric.note,
      fabric.category,
      ...fabric.colors.map((c) => c.name),
    ]
      .join(' ')
      .toLowerCase()
    return hay.includes(q)
  })
}

export function stockLabel(stock: StockStatus) {
  switch (stock) {
    case 'in_stock':
      return 'In stock'
    case 'low':
      return 'Low stock'
    case 'ask':
      return 'Ask on WhatsApp'
  }
}

export { fabrics }
