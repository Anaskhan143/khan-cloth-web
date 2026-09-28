import { useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '../../context/ContentContext'
import type { Fabric, FabricCategory, FabricColor, StockStatus } from '../../data/fabrics'
import { uploadFabricImage } from '../../lib/storage'
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

const stockOptions: { value: StockStatus; label: string }[] = [
  { value: 'in_stock', label: 'In stock' },
  { value: 'low', label: 'Low' },
  { value: 'ask', label: 'Ask' },
]

const emptyColor = (): FabricColor => ({
  id: '',
  name: '',
  swatch: '#c8c4bc',
  stock: 'in_stock',
})

const emptyFabric = (): Fabric => ({
  id: '',
  name: '',
  category: 'Lawn',
  pricePerMeter: 0,
  note: '',
  description: '',
  colors: [emptyColor()],
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
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [uploading, setUploading] = useState<string | null>(null)

  const sorted = useMemo(
    () => [...fabrics].sort((a, b) => a.name.localeCompare(b.name)),
    [fabrics],
  )

  const startCreate = () => {
    setEditing(emptyFabric())
    setError(null)
  }

  const startEdit = (fabric: Fabric) => {
    setEditing({
      ...fabric,
      colors: fabric.colors.length ? fabric.colors.map((c) => ({ ...c })) : [emptyColor()],
    })
    setError(null)
  }

  const updateColor = (index: number, patch: Partial<FabricColor>) => {
    setEditing((prev) => {
      if (!prev) return prev
      const colors = prev.colors.map((c, i) => (i === index ? { ...c, ...patch } : c))
      return { ...prev, colors }
    })
  }

  const addColor = () => {
    setEditing((prev) =>
      prev ? { ...prev, colors: [...prev.colors, emptyColor()] } : prev,
    )
  }

  const removeColor = (index: number) => {
    setEditing((prev) => {
      if (!prev) return prev
      const colors = prev.colors.filter((_, i) => i !== index)
      return { ...prev, colors: colors.length ? colors : [emptyColor()] }
    })
  }

  const uploadCover = async (file: File | undefined) => {
    if (!file) return
    const folder = `covers/${editing?.id || slugify(editing?.name ?? '') || 'new'}`
    setUploading('cover')
    setError(null)
    try {
      const url = await uploadFabricImage(file, folder)
      setEditing((prev) => (prev ? { ...prev, image: url } : prev))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Cover upload failed.')
    } finally {
      setUploading(null)
    }
  }

  const uploadColorImage = async (index: number, file: File | undefined) => {
    if (!file || !editing) return
    const color = editing.colors[index]
    const fabricKey = editing.id || slugify(editing.name) || 'new'
    const colorKey = slugify(color?.name ?? '') || `color-${index + 1}`
    setUploading(`color-${index}`)
    setError(null)
    try {
      const url = await uploadFabricImage(file, `colors/${fabricKey}/${colorKey}`)
      setEditing((prev) => {
        if (!prev) return prev
        const colors = prev.colors.map((c, i) => (i === index ? { ...c, image: url } : c))
        return { ...prev, colors }
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Colour image upload failed.')
    } finally {
      setUploading(null)
    }
  }

  const save = async (e: FormEvent) => {
    e.preventDefault()
    if (!editing || !supabase) {
      setError('Supabase is not configured.')
      return
    }

    const id = editing.id || slugify(editing.name)
    if (!id || !editing.name) {
      setError('Name is required.')
      return
    }

    const colors: FabricColor[] = []
    for (const [i, c] of editing.colors.entries()) {
      const name = c.name.trim()
      if (!name) {
        setError(`Colour ${i + 1} needs a name.`)
        return
      }
      colors.push({
        id: c.id || slugify(name),
        name,
        swatch: c.swatch.trim() || '#c8c4bc',
        stock: c.stock,
        ...(c.image ? { image: c.image } : {}),
      })
    }

    if (!colors.length) {
      setError('Add at least one colour.')
      return
    }

    setBusy(true)
    setError(null)
    const sortOrder = fabrics.findIndex((f) => f.id === id)
    const { error: saveError } = await supabase.from('fabrics').upsert({
      id,
      name: editing.name.trim(),
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
        <form className="admin-card block" onSubmit={(e) => void save(e)}>
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

          <div className="admin-field">
            <span>Cover image</span>
            <div className="admin-media-row">
              {editing.image ? (
                <img src={editing.image} alt="" className="admin-thumb" />
              ) : (
                <div className="admin-thumb placeholder" aria-hidden />
              )}
                  <div className="admin-media-controls">
                <input
                  type="file"
                  accept="image/*,.heic,.heif,image/heic,image/heif"
                  disabled={busy || uploading !== null}
                  onChange={(e) => void uploadCover(e.target.files?.[0])}
                />
                {uploading === 'cover' ? (
                  <span className="admin-hint">Uploading (HEIC converts to JPG)…</span>
                ) : (
                  <span className="admin-hint">JPG, PNG, WebP, HEIC — HEIC is converted automatically.</span>
                )}
                {editing.image ? (
                  <button
                    type="button"
                    className="admin-link-btn danger"
                    onClick={() =>
                      setEditing((prev) => (prev ? { ...prev, image: undefined } : prev))
                    }
                  >
                    Remove cover
                  </button>
                ) : null}
              </div>
            </div>
          </div>

          <div className="admin-colors">
            <div className="admin-colors-head">
              <h4>Colours</h4>
              <button type="button" className="admin-btn ghost" onClick={addColor}>
                Add colour
              </button>
            </div>
            <p className="admin-muted">
              Each colour needs a name, swatch, stock status, and optional photo.
            </p>

            {editing.colors.map((color, index) => (
              <div key={`${color.id || 'new'}-${index}`} className="admin-color-card">
                <div className="admin-media-row">
                  {color.image ? (
                    <img src={color.image} alt="" className="admin-thumb" />
                  ) : (
                    <div
                      className="admin-thumb"
                      style={{ background: color.swatch }}
                      aria-hidden
                    />
                  )}
                  <div className="admin-media-controls">
                    <input
                      type="file"
                      accept="image/*,.heic,.heif,image/heic,image/heif"
                      disabled={busy || uploading !== null}
                      onChange={(e) => void uploadColorImage(index, e.target.files?.[0])}
                    />
                    {uploading === `color-${index}` ? (
                      <span className="admin-hint">Uploading (HEIC converts to JPG)…</span>
                    ) : null}
                    {color.image ? (
                      <button
                        type="button"
                        className="admin-link-btn danger"
                        onClick={() => updateColor(index, { image: undefined })}
                      >
                        Remove photo
                      </button>
                    ) : null}
                  </div>
                </div>

                <div className="admin-grid-2">
                  <label className="admin-field">
                    <span>Colour name</span>
                    <input
                      value={color.name}
                      onChange={(e) => updateColor(index, { name: e.target.value })}
                      placeholder="e.g. Ivory"
                      required
                    />
                  </label>
                  <label className="admin-field">
                    <span>Stock</span>
                    <select
                      value={color.stock}
                      onChange={(e) =>
                        updateColor(index, { stock: e.target.value as StockStatus })
                      }
                    >
                      {stockOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="admin-field">
                    <span>Swatch colour</span>
                    <div className="admin-swatch-field">
                      <input
                        type="color"
                        value={
                          /^#[0-9a-fA-F]{6}$/.test(color.swatch) ? color.swatch : '#c8c4bc'
                        }
                        onChange={(e) => updateColor(index, { swatch: e.target.value })}
                        aria-label={`Swatch for ${color.name || `colour ${index + 1}`}`}
                      />
                      <input
                        value={color.swatch}
                        onChange={(e) => updateColor(index, { swatch: e.target.value })}
                        placeholder="#c8c4bc"
                      />
                    </div>
                  </label>
                </div>

                <div className="admin-actions">
                  <button
                    type="button"
                    className="admin-link-btn danger"
                    onClick={() => removeColor(index)}
                  >
                    Remove colour
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="admin-actions">
            <button type="submit" className="admin-btn" disabled={busy || uploading !== null}>
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
