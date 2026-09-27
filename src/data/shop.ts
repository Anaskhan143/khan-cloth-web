export const shop = {
  name: 'Khan Cloth and Tailoring Shop',
  tagline: 'Premium Fabrics | Perfect Stitch | Perfect Fit',
  whatsapp: '923405666212',
  whatsappDisplay: '+92 340 5666212',
  address: 'B-5, Rawal Arcade, F-8 Markaz, Islamabad',
  mapsUrl: 'https://maps.app.goo.gl/Q9CZ59AdzedAndhK7?g_st=ic',
  /** Embeddable map search URL */
  mapsEmbedUrl:
    'https://maps.google.com/maps?q=Rawal%20Arcade%20F-8%20Markaz%20Islamabad&t=&z=15&ie=UTF8&iwloc=&output=embed',
  hours: {
    weekdays: 'Monday – Saturday: 10:00 AM – 10:00 PM',
    sunday: 'Sunday: usually 1:00 PM – 9:00 PM',
  },
  social: {
    instagram: 'https://instagram.com/kctsinsta',
    facebook: 'https://www.facebook.com/kctsfacebook',
    facebookLabel: 'Khan Cloth and Tailoring Shop',
    tiktok: 'https://www.tiktok.com/@kcts_1',
  },
  deliveryNote: 'Free delivery all over Pakistan',
  deliveryTiming: 'Usually 2–4 working days after confirmation',
  payment: {
    methods: ['JazzCash', 'Bank transfer', 'COD (where available)'],
    note: 'Payment details shared on WhatsApp after we confirm stock & meters.',
  },
  returns: {
    title: 'Cut fabric policy',
    points: [
      'Fabric cut to your meters is made-to-order — usually non-returnable.',
      'If the parcel arrives damaged or wrong, message us on WhatsApp with photos within 24 hours.',
      'We confirm colour & meters on chat before cutting so surprises stay rare.',
    ],
  },
  trustPoints: [
    { id: 'delivery', label: 'Free nationwide delivery' },
    { id: 'whatsapp', label: 'Order on WhatsApp' },
    { id: 'shop', label: 'F-8 Markaz, Islamabad' },
    { id: 'stitch', label: 'Stitching + delivery with measurements' },
  ],
} as const
