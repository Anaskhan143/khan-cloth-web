import { shop } from '../data/shop'

export function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Why customers trust us">
      <div className="content-wrap trust-inner">
        <p className="eyebrow">Why customers trust us</p>
        <ul className="trust-line">
          {shop.trustPoints.map((point, i) => (
            <li key={point.id}>
              {i > 0 ? <span className="trust-sep" aria-hidden /> : null}
              <span>{point.label}</span>
            </li>
          ))}
        </ul>
        <div className="trust-meta">
          <div>
            <p className="visit-label">Payment</p>
            <p className="trust-meta-text">{shop.payment.methods.join(' · ')}</p>
            <p className="trust-meta-note">{shop.payment.note}</p>
          </div>
          <div>
            <p className="visit-label">Delivery</p>
            <p className="trust-meta-text">{shop.deliveryNote}</p>
            <p className="trust-meta-note">{shop.deliveryTiming}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
