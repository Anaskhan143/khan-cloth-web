import { shop } from '../data/shop'

export function SiteFooter() {
  return (
    <footer className="footer footer-standalone">
      <div className="footer-brand">
        <img src="/logo.png?v=6" alt="" className="footer-logo" />
        <div>
          <p className="footer-name">{shop.name}</p>
          <p className="footer-note">{shop.deliveryNote}</p>
        </div>
      </div>
      <p className="footer-copy">© {new Date().getFullYear()}</p>
    </footer>
  )
}
