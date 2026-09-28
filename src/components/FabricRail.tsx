import { Link } from 'react-router-dom'
import type { Fabric } from '../data/fabrics'
import { formatMoney } from '../lib/money'

type FabricRailProps = {
  items: Fabric[]
  indexOffset?: number
}

export function FabricRail({ items, indexOffset = 0 }: FabricRailProps) {
  return (
    <ul className="fabric-rail">
      {items.map((fabric, i) => {
        const reverse = i % 2 === 1
        const displayIndex = indexOffset + i + 1
        const face = fabric.colors[0]
        const faceImage = face?.image || fabric.image
        return (
          <li
            key={fabric.id}
            className={`fabric-row${reverse ? ' reverse' : ''}`}
            style={{ ['--i' as string]: i }}
          >
            <Link className="fabric-link" to={`/collection/${fabric.id}`}>
              <div
                className="fabric-face"
                style={
                  faceImage
                    ? {
                        backgroundImage: `url(${faceImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }
                    : { background: face?.swatch }
                }
                aria-hidden
              >
                <span className="fabric-grain" />
                <span className="fabric-index">{String(displayIndex).padStart(2, '0')}</span>
              </div>
              <div className="fabric-copy">
                <h3>{fabric.name}</h3>
                <p className="fabric-price">{formatMoney(fabric.pricePerMeter)} / metre</p>
                <p className="fabric-note">{fabric.note}</p>
                <div className="fabric-color-dots" aria-label={`${fabric.colors.length} colours`}>
                  {fabric.colors.slice(0, 5).map((c) => (
                    <span
                      key={c.id}
                      className="fabric-color-dot"
                      style={{ background: c.swatch }}
                      title={c.name}
                    />
                  ))}
                  {fabric.colors.length > 5 ? (
                    <span className="fabric-color-more">+{fabric.colors.length - 5}</span>
                  ) : null}
                </div>
                <span className="fabric-cta">View details</span>
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
