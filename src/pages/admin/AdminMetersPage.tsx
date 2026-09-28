import { useState, type FormEvent } from 'react'
import { useContent } from '../../context/ContentContext'
import type { MeterGuideItem } from '../../data/metersGuide'
import { supabase } from '../../lib/supabase'

export function AdminMetersPage() {
  const { meters, refresh } = useContent()
  const [editing, setEditing] = useState<MeterGuideItem | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const save = async (e: FormEvent) => {
    e.preventDefault()
    if (!editing || !supabase) {
      setError('Supabase is not configured.')
      return
    }
    const id = editing.id || `m-${Date.now()}`
    setBusy(true)
    const sortOrder = meters.findIndex((m) => m.id === id)
    const { error: saveError } = await supabase.from('meters_guide').upsert({
      id,
      label: editing.label,
      meters: editing.meters,
      note: editing.note,
      sort_order: sortOrder >= 0 ? sortOrder : meters.length,
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
    if (!supabase || !window.confirm('Delete this meters row?')) return
    await supabase.from('meters_guide').delete().eq('id', id)
    await refresh()
  }

  return (
    <div className="admin-stack">
      <header className="admin-page-head row">
        <div>
          <h2>Meters guide</h2>
          <p className="admin-muted">Quick metre ranges on the homepage.</p>
        </div>
        <button
          type="button"
          className="admin-btn"
          onClick={() => setEditing({ id: '', label: '', meters: '', note: '' })}
        >
          Add row
        </button>
      </header>

      {error ? <p className="admin-error">{error}</p> : null}

      {editing ? (
        <form className="admin-card block" onSubmit={save}>
          <h3>{editing.id ? 'Edit row' : 'New row'}</h3>
          <label className="admin-field">
            <span>Label</span>
            <input
              value={editing.label}
              onChange={(e) => setEditing({ ...editing, label: e.target.value })}
              required
            />
          </label>
          <div className="admin-grid-2">
            <label className="admin-field">
              <span>Meters</span>
              <input
                value={editing.meters}
                onChange={(e) => setEditing({ ...editing, meters: e.target.value })}
                required
              />
            </label>
            <label className="admin-field">
              <span>Note</span>
              <input
                value={editing.note}
                onChange={(e) => setEditing({ ...editing, note: e.target.value })}
              />
            </label>
          </div>
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
        {meters.map((item) => (
          <li key={item.id} className="admin-list-item">
            <div>
              <strong>{item.label}</strong>
              <p className="admin-muted">
                {item.meters} — {item.note}
              </p>
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
