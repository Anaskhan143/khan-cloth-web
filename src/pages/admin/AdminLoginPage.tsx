import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { isSupabaseConfigured } from '../../lib/supabase'

export function AdminLoginPage() {
  const { signIn, session, ready, configured } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  if (ready && session) {
    return <Navigate to="/admin" replace />
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError(null)
    const message = await signIn(email.trim(), password)
    setBusy(false)
    if (message) {
      setError(message)
      return
    }
    navigate('/admin', { replace: true })
  }

  return (
    <div className="admin-login">
      <form className="admin-card" onSubmit={onSubmit}>
        <p className="admin-kicker">Khan Cloth</p>
        <h1>Admin sign in</h1>
        <p className="admin-muted">
          Use the email and password from your Supabase Auth user.
        </p>

        {!configured || !isSupabaseConfigured ? (
          <div className="admin-alert">
            Supabase is not configured yet. Add <code>VITE_SUPABASE_URL</code> and{' '}
            <code>VITE_SUPABASE_ANON_KEY</code> to <code>.env</code>, then restart the
            dev server. See <code>supabase/schema.sql</code> and README.
          </div>
        ) : null}

        <label className="admin-field">
          <span>Username (email)</span>
          <input
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={!configured}
          />
        </label>

        <label className="admin-field">
          <span>Password</span>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={!configured}
          />
        </label>

        {error ? <p className="admin-error">{error}</p> : null}

        <button type="submit" className="admin-btn" disabled={busy || !configured}>
          {busy ? 'Signing in…' : 'Sign in'}
        </button>

        <Link className="admin-link" to="/">
          ← Back to site
        </Link>
      </form>
    </div>
  )
}
