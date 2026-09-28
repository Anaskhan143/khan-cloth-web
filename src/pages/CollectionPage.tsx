import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FabricRail } from '../components/FabricRail'
import { SiteFooter } from '../components/SiteFooter'
import { SiteShell } from '../components/SiteShell'
import { useContent } from '../context/ContentContext'
import type { FabricCategory } from '../data/fabrics'
import { shop } from '../data/shop'
import { fabricCategories, filterFabrics } from '../lib/fabricsUi'
import { generalOrderMessage, whatsappUrl } from '../lib/whatsapp'

const waGeneral = whatsappUrl(generalOrderMessage())

export function CollectionPage() {
  const { fabrics } = useContent()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<FabricCategory | 'All'>('All')

  const filtered = useMemo(
    () => filterFabrics(fabrics, query, category),
    [fabrics, query, category],
  )

  return (
    <SiteShell active="collection">
      <main className="collection-page">
        <header className="collection-hero">
          <p className="eyebrow">Full collection</p>
          <h1>Every cloth we carry.</h1>
          <p className="lede">
            Search or filter, then open an article for colours &amp; stock.
            {shop.deliveryNote ? ` ${shop.deliveryNote}.` : ''}
          </p>
          <div className="collection-hero-actions">
            <a className="btn btn-navy" href={waGeneral} target="_blank" rel="noreferrer">
              Message us
            </a>
            <Link className="btn btn-ghost" to="/">
              Back home
            </Link>
          </div>
        </header>

        <div className="collection-toolbar content-wrap">
          <label className="collection-search">
            <span className="visually-hidden">Search fabrics</span>
            <input
              type="search"
              placeholder="Search by name, category, colour…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <div className="collection-filters" role="group" aria-label="Filter by category">
            {fabricCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={category === cat ? 'is-active' : undefined}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filtered.length ? (
          <FabricRail items={filtered} />
        ) : (
          <p className="collection-empty">No fabrics match that search.</p>
        )}

        <div className="collection-page-foot">
          <SiteFooter />
        </div>
      </main>
    </SiteShell>
  )
}
