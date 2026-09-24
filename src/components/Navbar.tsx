import { useEffect, useState } from 'react'
import { OWNER, navLinks } from '../data'
import { LogoMark } from './Icons'
import ThemePicker from './ThemePicker'

// The bar stays out of the way: transparent at the top, hidden while scrolling
// down, and back as soon as the reader scrolls up.
function useScrollState() {
  const [state, setState] = useState({ scrolled: false, hidden: false })

  useEffect(() => {
    let lastY = window.scrollY
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const y = window.scrollY
        const delta = y - lastY
        if (Math.abs(delta) < 6) return
        setState({ scrolled: y > 24, hidden: delta > 0 && y > 320 })
        lastY = y
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return state
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { scrolled, hidden } = useScrollState()

  return (
    <header
      className={`navbar ${scrolled ? 'scrolled' : ''} ${hidden && !open ? 'hidden' : ''}`}
      data-testid="navbar"
    >
      <div className="container nav-inner">
        <a href="#home" className="logo">
          <LogoMark />
          <span>{OWNER}</span>
        </a>
        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
          <a href="#contact" className="nav-cta-mobile" onClick={() => setOpen(false)}>
            Contact
          </a>
        </nav>
        <div className="nav-right">
          <ThemePicker />
          <a href="#contact" className="btn btn-primary btn-sm nav-cta">
            Contact
          </a>
          <button
            className="nav-toggle"
            aria-label="Toggle menu"
            aria-expanded={open}
            data-testid="nav-toggle"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  )
}
