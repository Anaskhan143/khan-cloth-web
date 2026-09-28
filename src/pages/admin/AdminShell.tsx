import { Navigate, Outlet, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export function AdminGuard() {
  const { ready, session, configured } = useAuth()
  const location = useLocation()

  if (!ready) {
    return (
      <div className="admin-shell">
        <p className="admin-muted">Loading…</p>
      </div>
    )
  }

  if (!configured) {
    return <Navigate to="/admin/login" replace />
  }

  if (!session) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}

export function AdminShell() {
  const { signOut, user } = useAuth()
  const location = useLocation()

  const links = [
    { to: '/admin', label: 'Dashboard', end: true },
    { to: '/admin/fabrics', label: 'Collections' },
    { to: '/admin/faqs', label: 'FAQs' },
    { to: '/admin/reviews', label: 'Reviews' },
    { to: '/admin/meters', label: 'Meters' },
  ]

  return (
    <div className="admin-shell">
      <header className="admin-top">
        <div>
          <p className="admin-kicker">Khan Cloth</p>
          <h1 className="admin-title">Admin</h1>
        </div>
        <div className="admin-top-actions">
          <span className="admin-muted">{user?.email}</span>
          <Link className="admin-link" to="/" target="_blank" rel="noreferrer">
            View site
          </Link>
          <button type="button" className="admin-btn ghost" onClick={() => void signOut()}>
            Sign out
          </button>
        </div>
      </header>

      <nav className="admin-nav" aria-label="Admin">
        {links.map((link) => {
          const active = link.end
            ? location.pathname === link.to
            : location.pathname.startsWith(link.to)
          return (
            <Link key={link.to} to={link.to} className={active ? 'is-active' : undefined}>
              {link.label}
            </Link>
          )
        })}
      </nav>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  )
}
