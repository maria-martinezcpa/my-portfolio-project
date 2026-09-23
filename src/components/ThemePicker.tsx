import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { THEMES, useTheme, type ThemeChoice } from '../theme'

export default function ThemePicker() {
  const { choice, resolved, choose } = useTheme()
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const current = THEMES.find((t) => t.id === resolved) ?? THEMES[0]

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const pick = (next: ThemeChoice) => (e: MouseEvent<HTMLButtonElement>) => {
    // Keyboard clicks report 0,0: reveal from the button's centre instead.
    const box = e.currentTarget.getBoundingClientRect()
    const origin = e.clientX || e.clientY ? { x: e.clientX, y: e.clientY } : { x: box.left + box.width / 2, y: box.top + box.height / 2 }
    choose(next, origin)
  }

  return (
    <div className="theme-picker" ref={wrapRef}>
      <button
        type="button"
        className="theme-btn"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        data-testid="theme-button"
      >
        <span
          className="theme-btn-swatch"
          style={{ background: `conic-gradient(${current.preview.primary} 0 50%, ${current.preview.accent} 0)` }}
          aria-hidden="true"
        />
        <span className="theme-btn-label">{current.name}</span>
        <span className="theme-btn-caret" aria-hidden="true">
          ▾
        </span>
      </button>

      {open && (
        <div className="theme-panel" role="dialog" aria-label="Choose a theme" data-testid="theme-panel">
          <div className="theme-panel-head">
            <strong>Theme</strong>
            <button
              type="button"
              className={`theme-auto ${choice === 'system' ? 'on' : ''}`}
              aria-pressed={choice === 'system'}
              onClick={pick('system')}
            >
              <span className="theme-auto-knob" aria-hidden="true" />
              Auto
            </button>
          </div>
          <p className="theme-panel-note">
            {choice === 'system' ? 'Following your device (light or dark).' : 'Pick a look for the whole page.'}
          </p>

          <div className="theme-grid" role="radiogroup" aria-label="Themes">
            {THEMES.map((t) => {
              const selected = choice === t.id
              const { bg, surface, text, primary, accent } = t.preview
              return (
                <button
                  key={t.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  className={`theme-option ${selected ? 'selected' : ''} ${choice === 'system' && resolved === t.id ? 'auto-active' : ''}`}
                  onClick={pick(t.id)}
                  data-testid={`theme-${t.id}`}
                >
                  <span className={`theme-preview tp-${t.id}`} style={{ background: bg }} aria-hidden="true">
                    <span className="tp-title" style={{ background: text }} />
                    <span className="tp-line" style={{ background: text }} />
                    <span className="tp-card" style={{ background: surface }}>
                      <span className="tp-pill" style={{ background: primary }} />
                      <span className="tp-dot" style={{ background: accent }} />
                    </span>
                  </span>
                  <span className="theme-name">{t.name}</span>
                  <span className="theme-note">{t.note}</span>
                  {selected && (
                    <span className="theme-check" aria-hidden="true">
                      ✓
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
