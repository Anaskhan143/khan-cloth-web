import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { SiteFooter } from '../components/SiteFooter'
import { SiteShell } from '../components/SiteShell'
import { getFabricById } from '../data/fabrics'
import { formatMoney } from '../lib/money'
import { fabricOrderMessage, whatsappUrl } from '../lib/whatsapp'

export function FabricDetailPage() {
  const { fabricId } = useParams<{ fabricId: string }>()
  const fabric = fabricId ? getFabricById(fabricId) : undefined
  const [colorId, setColorId] = useState(fabric?.colors[0]?.id ?? '')

  useEffect(() => {
    setColorId(fabric?.colors[0]?.id ?? '')
  }, [fabric?.id, fabric?.colors])

  if (!fabric) {
    return <Navigate to="/collection" replace />
  }

  const selected = fabric.colors.find((c) => c.id === colorId) ?? fabric.colors[0]
  const orderHref = whatsappUrl(
    fabricOrderMessage(fabric.name, fabric.pricePerMeter, selected?.name),
  )

  return (
    <SiteShell active="collection">
      <main className="detail-page">
        <div className="detail-stage">
          <div
            className="detail-cloth"
            style={{ background: selected?.swatch }}
            key={selected?.id}
            aria-hidden
          >
            <span className="detail-cloth-grain" />
            <span className="detail-cloth-sheen" />
          </div>

          <div className="detail-panel">
            <Link className="detail-back" to="/collection">
              ← Collection
            </Link>

            <p className="eyebrow">Article</p>
            <h1 className="detail-title">{fabric.name}</h1>
            <p className="detail-price">{formatMoney(fabric.pricePerMeter)} / metre</p>
            <p className="detail-note">{fabric.note}</p>
            <p className="detail-desc">{fabric.description}</p>

            <div className="detail-colors">
              <div className="detail-colors-head">
                <p className="visit-label">Colours</p>
                <p className="detail-color-active">{selected?.name}</p>
              </div>

              <ul className="detail-color-list" role="listbox" aria-label="Available colours">
                {fabric.colors.map((color) => {
                  const active = color.id === selected?.id
                  return (
                    <li key={color.id}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={active}
                        className={`detail-color-chip${active ? ' is-active' : ''}`}
                        onClick={() => setColorId(color.id)}
                      >
                        <span
                          className="detail-color-swatch"
                          style={{ background: color.swatch }}
                          aria-hidden
                        >
                          <span className="fabric-grain" />
                        </span>
                        <span className="detail-color-name">{color.name}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="detail-actions">
              <a className="btn btn-navy" href={orderHref} target="_blank" rel="noreferrer">
                Order on WhatsApp
              </a>
              <Link className="btn btn-ghost" to="/collection">
                More fabrics
              </Link>
            </div>

            <p className="detail-hint">
              Dummy colours for layout — real photos &amp; stock will replace these.
            </p>
          </div>
        </div>

        <div className="collection-page-foot">
          <SiteFooter />
        </div>
      </main>
    </SiteShell>
  )
}
