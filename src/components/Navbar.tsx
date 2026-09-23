import { useState } from 'react'
import { OWNER, navLinks } from '../data'
import ThemePicker from './ThemePicker'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="navbar" data-testid="navbar">
      <div className="container nav-inner">
        <a href="#home" className="logo">
          <span className="logo-mark">◆</span> {OWNER}
        </a>
        <div className="nav-right">
          <nav className={`nav-links ${open ? 'open' : ''}`}>
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            ))}
          </nav>
          <ThemePicker />
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
