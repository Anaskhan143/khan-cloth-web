import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { SiteFooter } from '../components/SiteFooter'
import { SiteShell } from '../components/SiteShell'
import { metersGuide } from '../data/metersGuide'
import { getFabricById } from '../data/fabrics'
import { shop } from '../data/shop'
import { formatMoney } from '../lib/money'
import { stockLabel } from '../lib/fabricsUi'
import { fabricOrderMessage, whatsappUrl } from '../lib/whatsapp'

export function FabricDetailPage() {
  const { fabricId } = useParams<{ fabricId: string }>()
  const fabric = fabricId ? getFabricById(fabricId) : undefined
  const [colorId, setColorId] = useState(fabric?.colors[0]?.id ?? '')
  const [meters, setMeters] = useState('4')

  useEffect(() => {
    setColorId(fabric?.colors[0]?.id ?? '')
    setMeters('4')
  }, [fabric?.id, fabric?.colors])

  if (!fabric) {
    return <Navigate to="/collection" replace />
  }

  const selected = fabric.colors.find((c) => c.id === colorId) ?? fabric.colors[0]
  const orderHref = whatsappUrl(
    fabricOrderMessage(fabric.name, fabric.pricePerMeter, selected?.name).replace(
      '• Meters needed: (e.g. 3.5 – 4 for shalwar kameez)',
      `• Meters needed: ${meters}`,
    ),
  )

  return (
    <SiteShell active="collection">
      <main className="detail-page">
        <div className="detail-stage">
          <div
            className="detail-cloth"
            style={
              selected?.image
                ? {
                    backgroundImage: `url(${selected.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }
                : { background: selected?.swatch }
            }
            key={selected?.id}
            role="img"
            aria-label={`${fabric.name} — ${selected?.name ?? 'colour sample'}`}
          >
            <span className="detail-cloth-grain" />
            <span className="detail-cloth-sheen" />
            {!selected?.image ? (
              <span className="detail-photo-badge">Sample swatch · real photo soon</span>
            ) : null}
          </div>

          <div className="detail-panel">
            <Link className="detail-back" to="/collection">
              ← Collection
            </Link>

            <p className="eyebrow">{fabric.category}</p>
            <h1 className="detail-title">{fabric.name}</h1>
            <p className="detail-price">{formatMoney(fabric.pricePerMeter)} / metre</p>
            <p className="detail-note">{fabric.note}</p>
            <p className="detail-desc">{fabric.description}</p>

            <div className="detail-colors">
              <div className="detail-colors-head">
                <p className="visit-label">Colours</p>
                <p className="detail-color-active">
                  {selected?.name}
                  {selected ? (
                    <span className={`stock-pill stock-${selected.stock}`}>
                      {stockLabel(selected.stock)}
                    </span>
                  ) : null}
                </p>
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
                        <span className="detail-color-meta">
                          <span className="detail-color-name">{color.name}</span>
                          <span className={`stock-text stock-${color.stock}`}>
                            {stockLabel(color.stock)}
                          </span>
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="detail-meters">
              <label htmlFor="meters-input" className="visit-label">
                Meters (guide)
              </label>
              <div className="detail-meters-row">
                <input
                  id="meters-input"
                  type="number"
                  min={1}
                  max={20}
                  step={0.5}
                  value={meters}
                  onChange={(e) => setMeters(e.target.value)}
                />
                <div className="detail-meters-hints">
                  {metersGuide.slice(0, 2).map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      className="meters-hint"
                      onClick={() =>
                        setMeters(g.id === 'sk-standard' ? '4' : '4.5')
                      }
                    >
                      {g.label}: {g.meters}
                    </button>
                  ))}
                </div>
              </div>
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
              {shop.payment.note} {shop.deliveryTiming}.
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
