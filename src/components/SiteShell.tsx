import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { shop } from '../data/shop'
import { StickyWhatsApp } from './StickyWhatsApp'

type SiteShellProps = {
  children: ReactNode
  active?: 'home' | 'collection'
}

const navItems = [
  { to: '/collection', label: 'Collection', match: 'collection' as const },
  { to: '/#order', label: 'Order' },
  { to: '/#atelier', label: 'Atelier' },
  { to: '/#visit', label: 'Visit' },
]

export function SiteShell({ children, active = 'home' }: SiteShellProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site">
      <div className="atmosphere" aria-hidden>
        <div className="atmosphere-weave" />
        <div className="atmosphere-glow" />
      </div>

      <header className={`topbar${scrolled ? ' is-scrolled' : ''}${menuOpen ? ' is-open' : ''}`}>
        <div className="topbar-accent" aria-hidden />
        <div className="topbar-inner">
          <Link to="/" className="brand-mark" onClick={closeMenu}>
            <span className="brand-word">Khan</span>
            <span className="brand-sub">Cloth and Tailoring Shop</span>
          </Link>

          <nav className="nav nav-desktop" aria-label="Main">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={'match' in item && active === item.match ? 'is-active' : undefined}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="topbar-actions">
            <p className="topbar-place">F-8 Markaz, Islamabad</p>
            <button
              type="button"
              className={`nav-toggle${menuOpen ? ' is-open' : ''}`}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        <div
          id="mobile-nav"
          className={`nav-panel${menuOpen ? ' is-open' : ''}`}
          aria-hidden={!menuOpen}
        >
          <nav className="nav-mobile" aria-label="Mobile">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={'match' in item && active === item.match ? 'is-active' : undefined}
                onClick={closeMenu}
                tabIndex={menuOpen ? 0 : -1}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="nav-panel-meta">{shop.address}</p>
        </div>
      </header>

      {menuOpen ? (
        <button type="button" className="nav-backdrop" aria-label="Close menu" onClick={closeMenu} />
      ) : null}

      {children}
      <StickyWhatsApp />
    </div>
  )
}
