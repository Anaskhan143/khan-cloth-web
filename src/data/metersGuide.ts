export type MeterGuideItem = {
  id: string
  label: string
  meters: string
  note: string
}

/** Rough guide — confirm on WhatsApp before cutting. */
export const metersGuide: MeterGuideItem[] = [
  {
    id: 'sk-standard',
    label: 'Shalwar kameez (standard)',
    meters: '3.5 – 4 m',
    note: 'Most adult sizes',
  },
  {
    id: 'sk-plus',
    label: 'Shalwar kameez (larger / loose)',
    meters: '4 – 4.5 m',
    note: 'Extra ease or longer kameez',
  },
  {
    id: 'kameez-only',
    label: 'Kameez only',
    meters: '2 – 2.5 m',
    note: 'Depends on length',
  },
  {
    id: 'shalwar-only',
    label: 'Shalwar only',
    meters: '2 – 2.5 m',
    note: 'Plain or with pocket style',
  },
]
