import { Link } from 'react-router-dom'
import { FabricRail } from '../components/FabricRail'
import { SiteFooter } from '../components/SiteFooter'
import { SiteShell } from '../components/SiteShell'
import { fabrics } from '../data/fabrics'
import { shop } from '../data/shop'
import { generalOrderMessage, whatsappUrl } from '../lib/whatsapp'

const waGeneral = whatsappUrl(generalOrderMessage())

export function CollectionPage() {
  return (
    <SiteShell active="collection">
      <main className="collection-page">
        <header className="collection-hero">
          <p className="eyebrow">Full collection</p>
          <h1>Every cloth we carry.</h1>
          <p className="lede">
            Browse the full list — sample colours for now. Tap any fabric to order on WhatsApp.
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
          <FabricRail items={fabrics} />
        </section>

        <div className="collection-page-foot">
          <SiteFooter />
        </div>
      </main>
    </SiteShell>
  )
}
