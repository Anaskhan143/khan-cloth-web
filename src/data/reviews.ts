export type Review = {
  id: string
  name: string
  city: string
  text: string
  /** Dummy until real customer photos are added */
  dummy: true
}

/**
 * Placeholder reviews for layout — replace with real WhatsApp / Google reviews.
 */
export const reviews: Review[] = [
  {
    id: 'r1',
    name: 'Ahmed R.',
    city: 'Lahore',
    text: 'Ordered lawn online — colour matched what we discussed on WhatsApp. Delivery was quick.',
    dummy: true,
  },
  {
    id: 'r2',
    name: 'Sara K.',
    city: 'Islamabad',
    text: 'Visited F-8 for stitching. Measurements felt careful and the cloth quality was solid.',
    dummy: true,
  },
  {
    id: 'r3',
    name: 'Usman M.',
    city: 'Karachi',
    text: 'First time ordering from out of city. They confirmed meters before cutting — felt trustworthy.',
    dummy: true,
  },
  {
    id: 'r4',
    name: 'Hina A.',
    city: 'Rawalpindi',
    text: 'Boski colour options were clear on chat. Free delivery made it easy to try the shop online.',
    dummy: true,
  },
]
