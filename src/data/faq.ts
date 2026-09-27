export type FaqItem = {
  id: string
  question: string
  answer: string
}

export const faqs: FaqItem[] = [
  {
    id: 'delivery',
    question: 'Do you deliver outside Islamabad?',
    answer:
      'Yes — free delivery all over Pakistan. After WhatsApp confirmation, parcels usually arrive in 2–4 working days depending on your city.',
  },
  {
    id: 'payment',
    question: 'How do I pay?',
    answer:
      'We arrange JazzCash, bank transfer, or COD (where available) on WhatsApp once stock and meters are confirmed.',
  },
  {
    id: 'meters',
    question: 'How many meters do I need for shalwar kameez?',
    answer:
      'Most adult shalwar kameez sets need about 3.5–4.5 meters depending on size and style. We help you decide on chat before cutting.',
  },
  {
    id: 'colours',
    question: 'Are the website colours exact?',
    answer:
      'Screen colours can vary. We confirm the shade on WhatsApp (and can share real photos) before we cut your meters.',
  },
  {
    id: 'returns',
    question: 'Can I return cut fabric?',
    answer:
      'Cut fabric is usually non-returnable. If something arrives damaged or wrong, message us with photos within 24 hours and we will sort it.',
  },
  {
    id: 'stitching',
    question: 'Do you stitch online orders?',
    answer:
      'Yes. Visit our F-8 Markaz shop for measurements, or send your measurements on WhatsApp — we stitch shalwar kameez and deliver across Pakistan.',
  },
]
