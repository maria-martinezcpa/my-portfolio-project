import { useCallback, useState } from 'react'

export type Mode = 'light' | 'dark'

// Keep in sync with the inline script in index.html.
const STORAGE_KEY = 'portfolio-mode'

const current = (): Mode => (document.documentElement.classList.contains('dark') ? 'dark' : 'light')

export function useMode() {
  const [mode, setMode] = useState<Mode>(current)

  const toggle = useCallback(() => {
    const next: Mode = current() === 'dark' ? 'light' : 'dark'
    document.documentElement.classList.toggle('dark', next === 'dark')
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // not persisted; the choice still applies for this visit
    }
    setMode(next)
  }, [])

  return { mode, toggle }
}
