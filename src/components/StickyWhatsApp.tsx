import { generalOrderMessage, whatsappUrl } from '../lib/whatsapp'

const waGeneral = whatsappUrl(generalOrderMessage())

export function StickyWhatsApp() {
  return (
    <a
      className="sticky-wa"
      href={waGeneral}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <img src="/whatsapp-float.png" alt="" className="sticky-wa-icon" width={56} height={56} />
    </a>
  )
}
