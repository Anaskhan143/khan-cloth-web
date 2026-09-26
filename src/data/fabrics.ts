export type FabricColor = {
  id: string
  name: string
  /** CSS colour / gradient until real photos arrive */
  swatch: string
}

export type Fabric = {
  id: string
  name: string
  pricePerMeter: number
  note: string
  description: string
  colors: FabricColor[]
  dummy: true
}

/**
 * DUMMY CATALOG — replace with real fabrics, colours & photos later.
 */
export const fabrics: Fabric[] = [
  {
    id: 'premium-lawn',
    name: 'Premium Lawn',
    pricePerMeter: 1850,
    note: 'Soft summer lawn',
    description:
      'Light, breathable lawn for summer shalwar kameez — smooth hand-feel and an easy drape.',
    colors: [
      {
        id: 'ivory',
        name: 'Ivory',
        swatch: 'linear-gradient(145deg, #f7f1e8 0%, #e8dcc8 55%, #d4c4a8 100%)',
      },
      {
        id: 'pearl',
        name: 'Pearl',
        swatch: 'linear-gradient(145deg, #f5f5f2 0%, #e4e4de 55%, #cbcbc3 100%)',
      },
      {
        id: 'mist',
        name: 'Mist Blue',
        swatch: 'linear-gradient(145deg, #d7e2ea 0%, #b4c5d4 55%, #8fa4b8 100%)',
      },
      {
        id: 'sage',
        name: 'Soft Sage',
        swatch: 'linear-gradient(145deg, #d5ddd0 0%, #b4c0a8 55%, #8f9d82 100%)',
      },
    ],
    dummy: true,
  },
  {
    id: 'boski-blend',
    name: 'Boski Blend',
    pricePerMeter: 3200,
    note: 'Smooth drape',
    description: 'A polished boski-style blend with a soft sheen — ideal for formal daily wear.',
    colors: [
      {
        id: 'sand',
        name: 'Sand',
        swatch: 'linear-gradient(145deg, #c4a574 0%, #a67c52 50%, #8b6914 100%)',
      },
      {
        id: 'walnut',
        name: 'Walnut',
        swatch: 'linear-gradient(145deg, #8b6a4a 0%, #6b4a32 55%, #4a3220 100%)',
      },
      {
        id: 'stone',
        name: 'Warm Stone',
        swatch: 'linear-gradient(145deg, #cfc4b4 0%, #b0a090 55%, #8a7a68 100%)',
      },
      {
        id: 'ink',
        name: 'Deep Ink',
        swatch: 'linear-gradient(145deg, #2a3344 0%, #1a2230 55%, #0e141c 100%)',
      },
    ],
    dummy: true,
  },
  {
    id: 'wash-wear',
    name: 'Wash & Wear',
    pricePerMeter: 2450,
    note: 'Office & daily wear',
    description: 'Easy-care wash & wear with a neat finish — crisp enough for the office, soft enough for every day.',
    colors: [
      {
        id: 'navy',
        name: 'Navy',
        swatch: 'linear-gradient(145deg, #1a2f4a 0%, #0b1c38 60%, #06101f 100%)',
      },
      {
        id: 'slate',
        name: 'Slate',
        swatch: 'linear-gradient(145deg, #6a7380 0%, #4a5360 55%, #2e3540 100%)',
      },
      {
        id: 'white',
        name: 'Classic White',
        swatch: 'linear-gradient(145deg, #fafafa 0%, #ececec 55%, #d8d8d8 100%)',
      },
      {
        id: 'sky',
        name: 'Sky',
        swatch: 'linear-gradient(145deg, #9eb8d0 0%, #6f8fad 55%, #4a6a88 100%)',
      },
      {
        id: 'black',
        name: 'Black',
        swatch: 'linear-gradient(145deg, #2a2a2a 0%, #141414 55%, #050505 100%)',
      },
    ],
    dummy: true,
  },
  {
    id: 'linen-mix',
    name: 'Linen Mix',
    pricePerMeter: 2800,
    note: 'Breathable texture',
    description: 'Open linen-mix weave with natural texture — cool and characterful for warmer months.',
    colors: [
      {
        id: 'olive',
        name: 'Olive',
        swatch: 'linear-gradient(145deg, #7a8f6a 0%, #5c6b4a 55%, #3d4a32 100%)',
      },
      {
        id: 'natural',
        name: 'Natural',
        swatch: 'linear-gradient(145deg, #e8dfd0 0%, #d2c4ae 55%, #b8a888 100%)',
      },
      {
        id: 'terracotta',
        name: 'Terracotta',
        swatch: 'linear-gradient(145deg, #c48a6a 0%, #a06648 55%, #7a4630 100%)',
      },
      {
        id: 'sea',
        name: 'Seafoam',
        swatch: 'linear-gradient(145deg, #a8c4bc 0%, #7fa098 55%, #5a7a72 100%)',
      },
    ],
    dummy: true,
  },
  {
    id: 'karandi',
    name: 'Karandi',
    pricePerMeter: 2100,
    note: 'Winter favourite',
    description: 'Classic winter karandi with a soft matte face — warm without feeling heavy.',
    colors: [
      {
        id: 'charcoal',
        name: 'Charcoal',
        swatch: 'linear-gradient(145deg, #6b6f76 0%, #3d4048 55%, #1e2024 100%)',
      },
      {
        id: 'maroon',
        name: 'Maroon',
        swatch: 'linear-gradient(145deg, #6b2a35 0%, #4a1a22 55%, #2a1014 100%)',
      },
      {
        id: 'forest',
        name: 'Forest',
        swatch: 'linear-gradient(145deg, #3d5244 0%, #2a3a30 55%, #1a241c 100%)',
      },
      {
        id: 'camel',
        name: 'Camel',
        swatch: 'linear-gradient(145deg, #c4a882 0%, #a88860 55%, #806440 100%)',
      },
    ],
    dummy: true,
  },
  {
    id: 'cotton-satin',
    name: 'Cotton Satin',
    pricePerMeter: 1950,
    note: 'Soft sheen',
    description: 'Cotton satin with a gentle lustre — smooth on skin and flattering in movement.',
    colors: [
      {
        id: 'sky',
        name: 'Sky',
        swatch: 'linear-gradient(145deg, #b8d4e8 0%, #7ba3c4 50%, #4a6f8c 100%)',
      },
      {
        id: 'rose',
        name: 'Dusty Rose',
        swatch: 'linear-gradient(145deg, #e0c4c8 0%, #c4a0a6 55%, #a07a82 100%)',
      },
      {
        id: 'mint',
        name: 'Mint',
        swatch: 'linear-gradient(145deg, #c8ddd4 0%, #a0c0b4 55%, #789e90 100%)',
      },
      {
        id: 'butter',
        name: 'Butter',
        swatch: 'linear-gradient(145deg, #f0e6c8 0%, #ddd0a8 55%, #c4b488 100%)',
      },
    ],
    dummy: true,
  },
  {
    id: 'jamawar-touch',
    name: 'Jamawar Touch',
    pricePerMeter: 4500,
    note: 'Occasion wear',
    description: 'Rich occasion cloth with a jamawar-inspired depth — made for celebrations and evenings.',
    colors: [
      {
        id: 'maroon',
        name: 'Maroon',
        swatch: 'linear-gradient(145deg, #6b1c2a 0%, #4a0f18 55%, #2a080e 100%)',
      },
      {
        id: 'gold',
        name: 'Antique Gold',
        swatch: 'linear-gradient(145deg, #c4a86a 0%, #a88848 55%, #806830 100%)',
      },
      {
        id: 'emerald',
        name: 'Emerald',
        swatch: 'linear-gradient(145deg, #1a5a48 0%, #0e3a30 55%, #06241c 100%)',
      },
      {
        id: 'royal',
        name: 'Royal Blue',
        swatch: 'linear-gradient(145deg, #1a3a6a 0%, #0e2450 55%, #061430 100%)',
      },
    ],
    dummy: true,
  },
  {
    id: 'khaddar',
    name: 'Khaddar',
    pricePerMeter: 1650,
    note: 'Casual winter',
    description: 'Honest winter khaddar with a textured hand — casual, warm, and easy to wear.',
    colors: [
      {
        id: 'cream',
        name: 'Cream',
        swatch: 'linear-gradient(145deg, #f0e6d2 0%, #d9c9a8 55%, #b8a888 100%)',
      },
      {
        id: 'rust',
        name: 'Rust',
        swatch: 'linear-gradient(145deg, #b86848 0%, #944830 55%, #6a3020 100%)',
      },
      {
        id: 'grey',
        name: 'Ash Grey',
        swatch: 'linear-gradient(145deg, #b8b4ac 0%, #949088 55%, #6e6a64 100%)',
      },
      {
        id: 'mustard',
        name: 'Mustard',
        swatch: 'linear-gradient(145deg, #d4b060 0%, #b89040 55%, #8a6828 100%)',
      },
    ],
    dummy: true,
  },
]

export function getFabricById(id: string) {
  return fabrics.find((f) => f.id === id)
}
