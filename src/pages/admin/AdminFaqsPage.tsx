import { useState, type FormEvent } from 'react'
import { useContent } from '../../context/ContentContext'
import type { FaqItem } from '../../data/faq'
import { supabase } from '../../lib/supabase'

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48)
}

export function AdminFaqsPage() {
  const { faqs, refresh } = useContent()
  const [editing, setEditing] = useState<FaqItem | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const save = async (e: FormEvent) => {
    e.preventDefault()
    if (!editing || !supabase) {
      setError('Supabase is not configured.')
      return
    }
    const id = editing.id || slugify(editing.question) || `faq-${Date.now()}`
    setBusy(true)
    const sortOrder = faqs.findIndex((f) => f.id === id)
    const { error: saveError } = await supabase.from('faqs').upsert({
      id,
      question: editing.question,
      answer: editing.answer,
      sort_order: sortOrder >= 0 ? sortOrder : faqs.length,
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
    if (!supabase || !window.confirm('Delete this FAQ?')) return
    await supabase.from('faqs').delete().eq('id', id)
    await refresh()
  }

  return (
    <div className="admin-stack">
      <header className="admin-page-head row">
        <div>
          <h2>FAQs</h2>
          <p className="admin-muted">Questions shown on the homepage FAQ section.</p>
        </div>
        <button
          type="button"
          className="admin-btn"
          onClick={() => setEditing({ id: '', question: '', answer: '' })}
        >
          Add FAQ
        </button>
      </header>

      {error ? <p className="admin-error">{error}</p> : null}

      {editing ? (
        <form className="admin-card block" onSubmit={save}>
          <h3>{editing.id ? 'Edit FAQ' : 'New FAQ'}</h3>
          <label className="admin-field">
            <span>Question</span>
            <input
              value={editing.question}
              onChange={(e) => setEditing({ ...editing, question: e.target.value })}
              required
            />
          </label>
          <label className="admin-field">
            <span>Answer</span>
            <textarea
              rows={4}
              value={editing.answer}
              onChange={(e) => setEditing({ ...editing, answer: e.target.value })}
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
        {faqs.map((item) => (
          <li key={item.id} className="admin-list-item">
            <div>
              <strong>{item.question}</strong>
              <p className="admin-muted">{item.answer}</p>
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
