import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '../../context/ContentContext'
import { seedStarterContent } from '../../lib/contentApi'
import { isSupabaseConfigured } from '../../lib/supabase'

export function AdminDashboardPage() {
  const { fabrics, faqs, reviews, meters, refresh, usingLive } = useContent()
  const [message, setMessage] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const seed = async () => {
    setBusy(true)
    setMessage(null)
    try {
      await seedStarterContent()
      await refresh()
      setMessage('Starter content loaded into Supabase.')
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Could not seed content.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="admin-stack">
      <header className="admin-page-head">
        <h2>Dashboard</h2>
        <p className="admin-muted">
          {usingLive
            ? 'Connected to Supabase — edits appear on the live site after save.'
            : 'Running on local static data. Configure Supabase to enable saving.'}
        </p>
      </header>

      <div className="admin-stats">
        <Link to="/admin/fabrics" className="admin-stat">
          <strong>{fabrics.length}</strong>
          <span>Collections</span>
        </Link>
        <Link to="/admin/faqs" className="admin-stat">
          <strong>{faqs.length}</strong>
          <span>FAQs</span>
        </Link>
        <Link to="/admin/reviews" className="admin-stat">
          <strong>{reviews.length}</strong>
          <span>Reviews</span>
        </Link>
        <Link to="/admin/meters" className="admin-stat">
          <strong>{meters.length}</strong>
          <span>Meters</span>
        </Link>
      </div>

      {isSupabaseConfigured ? (
        <div className="admin-card block">
          <h3>Starter data</h3>
          <p className="admin-muted">
            One-click import of the current website fabrics, FAQs, reviews, and meters guide
            into your database.
          </p>
          <button type="button" className="admin-btn" onClick={() => void seed()} disabled={busy}>
            {busy ? 'Importing…' : 'Import starter content'}
          </button>
          {message ? <p className="admin-note">{message}</p> : null}
        </div>
      ) : null}
    </div>
  )
}
