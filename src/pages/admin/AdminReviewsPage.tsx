import { useState, type FormEvent } from 'react'
import { useContent } from '../../context/ContentContext'
import type { Review } from '../../data/reviews'
import { supabase } from '../../lib/supabase'

export function AdminReviewsPage() {
  const { reviews, refresh } = useContent()
  const [editing, setEditing] = useState<Review | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const save = async (e: FormEvent) => {
    e.preventDefault()
    if (!editing || !supabase) {
      setError('Supabase is not configured.')
      return
    }
    const id = editing.id || `r-${Date.now()}`
    setBusy(true)
    const sortOrder = reviews.findIndex((r) => r.id === id)
    const { error: saveError } = await supabase.from('reviews').upsert({
      id,
      name: editing.name,
      city: editing.city,
      text: editing.text,
      sort_order: sortOrder >= 0 ? sortOrder : reviews.length,
      updated_at: new Date().toISOString(),
    })
    setBusy(false)
    if (saveError) {
      setError(saveError.message)
      return
    }
    setEditing(null)
    await refresh()
  }

  const remove = async (id: string) => {
    if (!supabase || !window.confirm('Delete this review?')) return
    await supabase.from('reviews').delete().eq('id', id)
    await refresh()
  }

  return (
    <div className="admin-stack">
      <header className="admin-page-head row">
        <div>
          <h2>Reviews</h2>
          <p className="admin-muted">Customer quotes on the homepage.</p>
        </div>
        <button
          type="button"
          className="admin-btn"
          onClick={() => setEditing({ id: '', name: '', city: '', text: '', dummy: true })}
        >
          Add review
        </button>
      </header>

      {error ? <p className="admin-error">{error}</p> : null}

      {editing ? (
        <form className="admin-card block" onSubmit={save}>
          <h3>{editing.id ? 'Edit review' : 'New review'}</h3>
          <div className="admin-grid-2">
            <label className="admin-field">
              <span>Name</span>
              <input
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                required
              />
            </label>
            <label className="admin-field">
              <span>City</span>
              <input
                value={editing.city}
                onChange={(e) => setEditing({ ...editing, city: e.target.value })}
                required
              />
            </label>
          </div>
          <label className="admin-field">
            <span>Review text</span>
            <textarea
              rows={4}
              value={editing.text}
              onChange={(e) => setEditing({ ...editing, text: e.target.value })}
              required
            />
          </label>
          <div className="admin-actions">
            <button type="submit" className="admin-btn" disabled={busy}>
              {busy ? 'Saving…' : 'Save'}
            </button>
            <button type="button" className="admin-btn ghost" onClick={() => setEditing(null)}>
              Cancel
            </button>
          </div>
        </form>
      ) : null}

      <ul className="admin-list">
        {reviews.map((item) => (
          <li key={item.id} className="admin-list-item">
            <div>
              <strong>
                {item.name} — {item.city}
              </strong>
              <p className="admin-muted">{item.text}</p>
            </div>
            <div className="admin-row-actions">
              <button type="button" className="admin-link-btn" onClick={() => setEditing(item)}>
                Edit
              </button>
              <button
                type="button"
                className="admin-link-btn danger"
                onClick={() => void remove(item.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
