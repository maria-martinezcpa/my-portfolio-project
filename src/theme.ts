import { useCallback, useEffect, useState } from 'react'
import { flushSync } from 'react-dom'

export const THEMES = [
  {
    id: 'light',
    name: 'Studio',
    note: 'Clean and bright',
    preview: { bg: '#ffffff', surface: '#eef2ff', text: '#0f172a', primary: '#4f46e5', accent: '#06b6d4' },
  },
  {
    id: 'dark',
    name: 'Midnight',
    note: 'Calm dark mode',
    preview: { bg: '#0b1120', surface: '#16213a', text: '#e2e8f0', primary: '#818cf8', accent: '#22d3ee' },
  },
  {
    id: 'blueprint',
    name: 'Blueprint',
    note: 'Drafting-table grid',
    preview: { bg: '#123a6b', surface: '#1b4b85', text: '#eaf4ff', primary: '#ffd166', accent: '#7fd4ff' },
  },
  {
    id: 'concrete',
    name: 'Concrete',
    note: 'Raw and brutalist',
    preview: { bg: '#e7e5e4', surface: '#fafaf9', text: '#1c1917', primary: '#ea580c', accent: '#facc15' },
  },
  {
    id: 'timber',
    name: 'Timber',
    note: 'Warm natural materials',
    preview: { bg: '#faf6ef', surface: '#f1e9dc', text: '#2b2118', primary: '#3f6212', accent: '#b45309' },
  },
  {
    id: 'aurora',
    name: 'Aurora',
    note: 'Glowing night colors',
    preview: { bg: '#0c0a1d', surface: '#1f1a45', text: '#f1eefe', primary: '#f472b6', accent: '#a78bfa' },
  },
] as const

export type ThemeId = (typeof THEMES)[number]['id']
export type ThemeChoice = ThemeId | 'system'

// Keep in sync with the inline script in index.html.
const STORAGE_KEY = 'portfolio-theme'

const isThemeId = (v: unknown): v is ThemeId => THEMES.some((t) => t.id === v)

function readChoice(): ThemeChoice {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === 'system' || isThemeId(v)) return v
  } catch {
    // storage blocked: fall through to the default
  }
  return 'system'
}

const prefersDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches
const resolve = (choice: ThemeChoice): ThemeId => (choice === 'system' ? (prefersDark() ? 'dark' : 'light') : choice)
const paint = (id: ThemeId) => {
  document.documentElement.dataset.theme = id
}

interface ViewTransitionDoc {
  startViewTransition?: (update: () => void) => { ready: Promise<void> }
}

// Circular reveal from the click point where View Transitions are supported,
// a short cross-fade elsewhere, and an instant switch for reduced motion.
function runTransition(commit: () => void, origin?: { x: number; y: number }) {
  const root = document.documentElement
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    commit()
    return
  }
  const doc = document as unknown as ViewTransitionDoc
  if (!doc.startViewTransition) {
    root.classList.add('theme-fade')
    commit()
    window.setTimeout(() => root.classList.remove('theme-fade'), 450)
    return
  }
  const vt = doc.startViewTransition(commit)
  if (!origin) return
  const { x, y } = origin
  const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
  vt.ready
    .then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 650, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', pseudoElement: '::view-transition-new(root)' },
      )
    })
    .catch(() => {})
}

export function useTheme() {
  const [choice, setChoice] = useState<ThemeChoice>(readChoice)
  const [resolved, setResolved] = useState<ThemeId>(() => resolve(readChoice()))

  useEffect(() => {
    paint(resolved)
  }, [resolved])

  // While on "Auto", follow OS light/dark changes live.
  useEffect(() => {
    if (choice !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => runTransition(() => flushSync(() => setResolved(resolve('system'))))
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [choice])

  const choose = useCallback((next: ThemeChoice, origin?: { x: number; y: number }) => {
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // not persisted; the choice still applies for this visit
    }
    const id = resolve(next)
    runTransition(() => {
      paint(id)
      flushSync(() => {
        setChoice(next)
        setResolved(id)
      })
    }, origin)
  }, [])

  return { choice, resolved, choose }
}
