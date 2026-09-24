import { useEffect, useRef } from 'react'
import type { Route } from './router'

// Has the visitor moved between pages inside the site during this visit?
// If not, "Back" goes to the page's logical parent instead of leaving the site.
let navigatedInApp = false
window.addEventListener('hashchange', () => {
  navigatedInApp = true
})

export const parentOf = (route: Route) => (route.name === 'project' ? '#/work' : '#/')

export function goBack(route: Route) {
  if (navigatedInApp) window.history.back()
  else window.location.hash = parentOf(route)
}

// Lets the browser's Back button (or a phone's back gesture) close an overlay
// such as the photo viewer or the mobile menu, instead of leaving the page.
let activeOverlays = 0
export function useBackToClose(open: boolean, close: () => void) {
  const closeRef = useRef(close)
  useEffect(() => {
    closeRef.current = close
  }, [close])

  useEffect(() => {
    if (!open) return
    activeOverlays++
    if (!window.history.state?.overlay) window.history.pushState({ overlay: true }, '')
    let popped = false
    const onPop = () => {
      popped = true
      closeRef.current()
    }
    window.addEventListener('popstate', onPop)
    return () => {
      activeOverlays--
      window.removeEventListener('popstate', onPop)
      // Closed with the on-screen button or Escape: drop the extra history entry too.
      // Deferred so a remount (e.g. React StrictMode) can reclaim the entry first.
      window.setTimeout(() => {
        if (activeOverlays === 0 && !popped && window.history.state?.overlay) window.history.back()
      }, 0)
    }
  }, [open])
}
