import { Link } from 'react-router-dom'
import { FabricRail } from '../components/FabricRail'
import { FaqSection } from '../components/FaqSection'
import { MetersGuide } from '../components/MetersGuide'
import { ReviewsSection } from '../components/ReviewsSection'
import { SiteFooter } from '../components/SiteFooter'
import { SiteShell } from '../components/SiteShell'
import { TrustStrip } from '../components/TrustStrip'
import { shop } from '../data/shop'
import { useContent } from '../context/ContentContext'
import {
  generalOrderMessage,
  tailoringMessage,
  whatsappUrl,
} from '../lib/whatsapp'

/** How many fabrics to show on the home page before linking to the full collection. */
export const HOME_FABRIC_PREVIEW = 5

const waGeneral = whatsappUrl(generalOrderMessage())
const waTailoring = whatsappUrl(tailoringMessage())

export function HomePage() {
  const { fabrics } = useContent()
  const previewFabrics = fabrics.slice(0, HOME_FABRIC_PREVIEW)

  return (
    <SiteShell active="home">
      <main id="top">
        {/* 1. Brand */}
        <section className="hero">
          <div className="hero-plane" aria-hidden>
            <div className="hero-drape" />
            <div className="hero-sheen" />
          </div>

          <div className="hero-content">
            <img src="/logo.png?v=6" alt={shop.name} className="hero-logo" />
            <h1 className="hero-title">
              {shop.tagline.split(' | ').map((part, i, arr) => (
                <span key={part}>
                  {part}
                  {i < arr.length - 1 ? <span className="hero-pipe"> | </span> : null}
                </span>
              ))}
            </h1>
            <p className="hero-lede">
              Quiet luxury fabrics from F-8 Markaz — free delivery all over Pakistan.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-navy" to="/collection">
                View collection
              </Link>
              <a className="btn btn-ghost" href={waGeneral} target="_blank" rel="noreferrer">
                Message us
              </a>
            </div>
          </div>
        </section>

        {/* 2. Product first */}
        <section id="collection" className="section collection">
          <div className="section-intro">
            <p className="eyebrow">The collection</p>
            <h2>Chosen by hand. Sent to your door.</h2>
            <p className="lede">
              A few favourites to begin with — open any cloth for colours, stock, and WhatsApp
              ordering.
            </p>
          </div>

          <FabricRail items={previewFabrics} />

          <div className="collection-more">
            <Link className="btn btn-navy" to="/collection">
              View all collections
            </Link>
          </div>
        </section>

        {/* 3. How to buy */}
        <section id="order" className="section order">
          <div className="section-intro centered">
            <p className="eyebrow">How it works</p>
            <h2>Three quiet steps.</h2>
          </div>
          <ol className="path">
            <li>
              <span className="path-num">01</span>
              <span className="path-label">Select</span>
              <p>Choose a fabric &amp; colour — or tell us what you need.</p>
            </li>
            <li>
              <span className="path-num">02</span>
              <span className="path-label">Confirm</span>
              <p>WhatsApp meters, city, and phone. We confirm stock &amp; total.</p>
            </li>
            <li>
              <span className="path-num">03</span>
              <span className="path-label">Receive</span>
              <p>
                {shop.deliveryNote}. {shop.deliveryTiming}.
              </p>
            </li>
          </ol>
        </section>

        {/* 4. Buying help */}
        <MetersGuide />

        {/* 5. Stitching differentiator */}
        <section id="atelier" className="atelier">
          <div className="atelier-veil" aria-hidden />
          <div className="atelier-frame" aria-hidden />
          <div className="atelier-inner">
            <p className="eyebrow on-dark">Atelier</p>
            <h2>Stitching, ready for delivery.</h2>
            <p>
              Shalwar kameez stitching in our F-8 atelier — or share your measurements on WhatsApp
              and we stitch &amp; deliver across Pakistan.
            </p>
            <a className="btn btn-gold" href={waTailoring} target="_blank" rel="noreferrer">
              Ask about stitching
            </a>
          </div>
        </section>

        {/* 6. Social proof */}
        <ReviewsSection />

        {/* 7. Trust after reviews */}
        <TrustStrip />

        {/* 8. Objections */}
        <FaqSection />

        {/* 9. Place + close */}
        <section id="visit" className="visit">
          <div className="visit-stage">
            <div className="visit-lead">
              <p className="eyebrow">Visit</p>
              <h2>
                Come see
                <em> the cloth.</em>
              </h2>
              <p className="visit-lede">
                Step into our F-8 Markaz shop — or order from anywhere in Pakistan with free
                delivery.
              </p>
              <div className="visit-actions">
                <a className="btn btn-navy" href={waGeneral} target="_blank" rel="noreferrer">
                  WhatsApp us
                </a>
                <a className="btn btn-ghost" href={shop.mapsUrl} target="_blank" rel="noreferrer">
                  Open maps
                </a>
              </div>
            </div>

            <aside className="visit-panel" aria-label="Shop details">
              <div className="visit-panel-glow" aria-hidden />
              <div className="visit-block">
                <p className="visit-label">Address</p>
                <p className="visit-value">{shop.address}</p>
                <a className="text-link on-dark" href={shop.mapsUrl} target="_blank" rel="noreferrer">
                  Get directions
                </a>
              </div>
              <div className="visit-block">
                <p className="visit-label">Hours</p>
                <p className="visit-value">{shop.hours.weekdays}</p>
                <p className="visit-value soft">{shop.hours.sunday}</p>
              </div>
              <div className="visit-block">
                <p className="visit-label">WhatsApp</p>
                <a className="visit-phone" href={waGeneral} target="_blank" rel="noreferrer">
                  {shop.whatsappDisplay}
                </a>
              </div>
              <div className="visit-block last">
                <p className="visit-label">Social</p>
                <div className="socials">
                  <a href={shop.social.instagram} target="_blank" rel="noreferrer">
                    Instagram
                  </a>
                  <a href={shop.social.facebook} target="_blank" rel="noreferrer">
                    Facebook
                  </a>
                  <a href={shop.social.tiktok} target="_blank" rel="noreferrer">
                    TikTok
                  </a>
                </div>
              </div>
            </aside>
          </div>

          <SiteFooter />
        </section>
      </main>
    </SiteShell>
  )
}
