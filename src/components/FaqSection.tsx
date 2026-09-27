import { useState } from 'react'
import { faqs } from '../data/faq'
import { shop } from '../data/shop'

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null)

  return (
    <section id="faq" className="section faq">
      <div className="content-wrap faq-stage">
        <div className="section-intro faq-intro">
          <p className="eyebrow">FAQ</p>
          <h2>Questions, answered</h2>
          <p className="lede">
            Clear answers before you order — stock, meters, and delivery on WhatsApp.
          </p>
        </div>

        <div className="faq-layout">
          <ul className="faq-list">
            {faqs.map((item, i) => {
              const open = openId === item.id
              return (
                <li key={item.id} className={`faq-item${open ? ' is-open' : ''}`}>
                  <button
                    type="button"
                    className="faq-q"
                    aria-expanded={open}
                    onClick={() => setOpenId(open ? null : item.id)}
                  >
                    <span className="faq-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="faq-q-text">{item.question}</span>
                    <span className="faq-toggle" aria-hidden>
                      {open ? '−' : '+'}
                    </span>
                  </button>
                  {open ? (
                    <div className="faq-a-wrap is-open">
                      <p className="faq-a">{item.answer}</p>
                    </div>
                  ) : null}
                </li>
              )
            })}
          </ul>

          <aside className="policy-panel">
            <div className="policy-frame" aria-hidden />
            <p className="visit-label">Cut fabric policy</p>
            <h3>{shop.returns.title}</h3>
            <ul>
              {shop.returns.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  )
}
