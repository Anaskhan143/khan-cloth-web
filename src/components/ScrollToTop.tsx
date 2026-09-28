import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Scroll to top on route change, or to the hash target when one is present. */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }

    const id = decodeURIComponent(hash.replace(/^#/, ''))
    let cancelled = false

    const scrollToHash = () => {
      if (cancelled) return
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return true
      }
      return false
    }

    // Home sections may mount just after the route change.
    if (!scrollToHash()) {
      const t1 = window.setTimeout(scrollToHash, 50)
      const t2 = window.setTimeout(scrollToHash, 200)
      return () => {
        cancelled = true
        window.clearTimeout(t1)
        window.clearTimeout(t2)
      }
    }

    return () => {
      cancelled = true
    }
  }, [pathname, hash])

  return null
}
