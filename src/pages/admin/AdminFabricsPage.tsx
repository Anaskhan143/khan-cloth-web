import { useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '../../context/ContentContext'
import type { Fabric, FabricCategory, FabricColor } from '../../data/fabrics'
import { supabase } from '../../lib/supabase'

const categories: FabricCategory[] = [
  'Lawn',
  'Boski',
  'Wash & Wear',
  'Linen',
  'Winter',
  'Satin',
  'Occasion',
]

const emptyFabric = (): Fabric => ({
  id: '',
  name: '',
  category: 'Lawn',
  pricePerMeter: 0,
  note: '',
  description: '',
  colors: [],
  dummy: true,
})

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function AdminFabricsPage() {
  const { fabrics, refresh } = useContent()
  const [editing, setEditing] = useState<Fabric | null>(null)
  const [colorsText, setColorsText] = useState('[]')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const sorted = useMemo(
    () => [...fabrics].sort((a, b) => a.name.localeCompare(b.name)),
    [fabrics],
  )

  const startCreate = () => {
    setEditing(emptyFabric())
    setColorsText('[]')
    setError(null)
  }

  const startEdit = (fabric: Fabric) => {
    setEditing({ ...fabric, colors: [...fabric.colors] })
    setColorsText(JSON.stringify(fabric.colors, null, 2))
    setError(null)
  }

  const save = async (e: FormEvent) => {
    e.preventDefault()
    if (!editing || !supabase) {
      setError('Supabase is not configured.')
      return
    }

    let colors: FabricColor[] = []
    try {
      colors = JSON.parse(colorsText) as FabricColor[]
      if (!Array.isArray(colors)) throw new Error('Colors must be an array')
    } catch {
      setError('Colors JSON is invalid.')
      return
    }

    const id = editing.id || slugify(editing.name)
    if (!id || !editing.name) {
      setError('Name is required.')
      return
    }

    setBusy(true)
    setError(null)
    const sortOrder = fabrics.findIndex((f) => f.id === id)
    const { error: saveError } = await supabase.from('fabrics').upsert({
      id,
      name: editing.name,
      category: editing.category,
      price_per_meter: Number(editing.pricePerMeter) || 0,
      note: editing.note,
      description: editing.description,
      colors,
      image: editing.image ?? null,
      sort_order: sortOrder >= 0 ? sortOrder : fabrics.length,
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
    if (!supabase) return
    if (!window.confirm('Delete this collection?')) return
    const { error: delError } = await supabase.from('fabrics').delete().eq('id', id)
    if (delError) {
      setError(delError.message)
      return
    }
    await refresh()
  }

  return (
    <div className="admin-stack">
      <header className="admin-page-head row">
        <div>
          <h2>Collections</h2>
          <p className="admin-muted">Fabrics shown on the site and collection page.</p>
        </div>
        <button type="button" className="admin-btn" onClick={startCreate}>
          Add collection
        </button>
      </header>

      {error ? <p className="admin-error">{error}</p> : null}

      {editing ? (
        <form className="admin-card block" onSubmit={save}>
          <h3>{editing.id ? 'Edit collection' : 'New collection'}</h3>
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
              <span>Category</span>
              <select
                value={editing.category}
                onChange={(e) =>
                  setEditing({ ...editing, category: e.target.value as FabricCategory })
                }
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label className="admin-field">
              <span>Price per metre (Rs)</span>
              <input
                type="number"
                min={0}
                value={editing.pricePerMeter}
                onChange={(e) =>
                  setEditing({ ...editing, pricePerMeter: Number(e.target.value) })
                }
                required
              />
            </label>
            <label className="admin-field">
              <span>Short note</span>
              <input
                value={editing.note}
                onChange={(e) => setEditing({ ...editing, note: e.target.value })}
              />
            </label>
          </div>
          <label className="admin-field">
            <span>Description</span>
            <textarea
              rows={3}
              value={editing.description}
              onChange={(e) => setEditing({ ...editing, description: e.target.value })}
            />
          </label>
          <label className="admin-field">
            <span>Colours JSON</span>
            <textarea
              rows={10}
              value={colorsText}
              onChange={(e) => setColorsText(e.target.value)}
              spellCheck={false}
            />
            <span className="admin-hint">
              Array of {'{ id, name, swatch, stock }'} — stock: in_stock | low | ask
            </span>
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

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Colours</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {sorted.map((fabric) => (
              <tr key={fabric.id}>
                <td>
                  <Link to={`/collection/${fabric.id}`} target="_blank" rel="noreferrer">
                    {fabric.name}
                  </Link>
                </td>
                <td>{fabric.category}</td>
                <td>Rs {fabric.pricePerMeter}</td>
                <td>{fabric.colors.length}</td>
                <td className="admin-row-actions">
                  <button type="button" className="admin-link-btn" onClick={() => startEdit(fabric)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="admin-link-btn danger"
                    onClick={() => void remove(fabric.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

