import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { EMAILS, OWNER, ROLE } from '../data'
import { EASE } from '../lib/motion'
import { routeKey, type Route } from '../lib/router'
import { useMode } from '../theme'

const links = [
  { label: 'Work', href: '#/work', match: ['work', 'project'] },
  { label: 'BIM', href: '#/bim', match: ['bim'] },
  { label: 'About', href: '#/about', match: ['about'] },
  { label: 'Contact', href: '#/contact', match: ['contact'] },
]

function ModeToggle() {
  const { mode, toggle } = useMode()
  return (
    <button
      type="button"
      onClick={toggle}
      className="group relative flex h-5 w-9 items-center rounded-full border border-current"
      aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.span
        className="absolute h-3 w-3 rounded-full bg-current"
        animate={{ x: mode === 'dark' ? 19 : 3 }}
        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
      />
    </button>
  )
}

export default function Nav({ route }: { route: Route }) {
  // The menu belongs to the page it was opened on, so navigating closes it.
  const key = routeKey(route)
  const [openOn, setOpenOn] = useState<string | null>(null)
  const open = openOn === key

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  // Solid bar once the page scrolls; over the full-screen photos at the top of the
  // home and project pages it sits on a dark scrim instead.
  const [scrolled, setScrolled] = useState(() => window.scrollY > 24)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const overPhoto = !scrolled && (route.name === 'home' || route.name === 'project')
  const look = open
    ? 'border-transparent text-bg'
    : overPhoto
      ? 'border-transparent bg-gradient-to-b from-black/60 to-transparent text-white'
      : 'border-line bg-bg/90 text-fg shadow-[0_6px_24px_-12px_rgba(0,0,0,0.25)] backdrop-blur-md'

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,color,border-color,box-shadow] duration-500 ${look}`}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
      >
        <div className={`container-x flex items-center justify-between transition-[padding] duration-500 ${scrolled && !open ? 'py-4' : 'py-6 md:py-7'}`}>
          <a href="#/" className="font-display text-2xl leading-none tracking-tight md:text-[1.7rem]">
            {OWNER}
          </a>
          <span className="eyebrow hidden opacity-80 lg:block">{ROLE}</span>
          <nav className="hidden items-center gap-9 md:flex" aria-label="Main">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="link-line pb-0.5 text-sm tracking-wide"
                aria-current={l.match.includes(route.name) ? 'page' : undefined}
              >
                {l.label}
              </a>
            ))}
            <ModeToggle />
          </nav>
          <div className="flex items-center gap-5 md:hidden">
            <ModeToggle />
            <button
              type="button"
              className="eyebrow"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpenOn(open ? null : key)}
            >
              {open ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-between bg-fg px-6 pb-10 pt-32 text-bg md:hidden"
            initial={{ clipPath: 'circle(0% at 92% 4%)' }}
            animate={{ clipPath: 'circle(150% at 92% 4%)' }}
            exit={{ clipPath: 'circle(0% at 92% 4%)' }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <nav className="flex flex-col gap-2" aria-label="Mobile">
              {[{ label: 'Home', href: '#/' }, ...links].map((l, i) => (
                <div key={l.href} className="overflow-hidden">
                  <motion.a
                    href={l.href}
                    className="block font-display text-6xl leading-[1.05]"
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '100%' }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.15 + i * 0.07 }}
                  >
                    {l.label}
                  </motion.a>
                </div>
              ))}
            </nav>
            <motion.div
              className="text-sm opacity-70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              {EMAILS[0]}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
