import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FabricRail } from '../components/FabricRail'
import { SiteFooter } from '../components/SiteFooter'
import { SiteShell } from '../components/SiteShell'
import { fabrics } from '../data/fabrics'
import type { FabricCategory } from '../data/fabrics'
import { shop } from '../data/shop'
import { fabricCategories, filterFabrics } from '../lib/fabricsUi'
import { generalOrderMessage, whatsappUrl } from '../lib/whatsapp'

const waGeneral = whatsappUrl(generalOrderMessage())

export function CollectionPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<FabricCategory | 'All'>('All')

  const filtered = useMemo(
    () => filterFabrics(fabrics, query, category),
    [query, category],
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

        <section className="section collection">
          <div className="collection-toolbar">
            <label className="collection-search">
              <span className="visually-hidden">Search fabrics</span>
              <input
                type="search"
                placeholder="Search fabric or colour…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            <div className="collection-filters" role="group" aria-label="Filter by category">
              {fabricCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`filter-chip${category === cat ? ' is-active' : ''}`}
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
            <p className="collection-empty">
              No fabrics match. Try another search, or{' '}
              <a href={waGeneral} target="_blank" rel="noreferrer">
                WhatsApp us
              </a>
              .
            </p>
          )}
        </section>

        <div className="collection-page-foot">
          <SiteFooter />
        </div>
      </main>
    </SiteShell>
  )
}
