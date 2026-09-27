import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { shop } from '../data/shop'
import { StickyWhatsApp } from './StickyWhatsApp'

type SiteShellProps = {
  children: ReactNode
  active?: 'home' | 'collection'
}

export function SiteShell({ children, active = 'home' }: SiteShellProps) {
  return (
    <div className="site">
      <div className="atmosphere" aria-hidden>
        <div className="atmosphere-weave" />
        <div className="atmosphere-glow" />
      </div>

      <header className="topbar">
        <div className="topbar-inner">
          <Link to="/" className="brand-mark" aria-label={shop.name}>
            <img src="/logo-nav.png?v=6" alt="" className="brand-logo" />
          </Link>
          <nav className="nav" aria-label="Main">
            <Link to="/collection" className={active === 'collection' ? 'is-active' : undefined}>
              Collection
            </Link>
            <a href="/#order">Order</a>
            <a href="/#atelier">Atelier</a>
            <a href="/#visit">Visit</a>
          </nav>
          <div className="topbar-actions" aria-hidden />
        </div>
      </header>

      {children}
      <StickyWhatsApp />
    </div>
  )
}
