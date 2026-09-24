import { motion } from 'framer-motion'
import { useLayoutEffect, useRef, useState, type ComponentType, type SVGProps } from 'react'
import { EMAILS, PHONE, TELEGRAM } from '../data'
import { EASE } from '../lib/motion'
import { MailIcon, PhoneIcon, TelegramIcon } from './Icons'

interface Item {
  label: string
  value: string
  href: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
  external?: boolean
}

const items: Item[] = [
  ...EMAILS.map((e) => ({ label: 'Email', value: e, href: `mailto:${e}`, icon: MailIcon })),
  { label: 'Telegram', value: `@${TELEGRAM.split('/').pop()}`, href: TELEGRAM, icon: TelegramIcon, external: true },
  { label: 'Phone', value: PHONE, href: `tel:${PHONE.replace(/[^\d+]/g, '')}`, icon: PhoneIcon },
]

interface Layout {
  w: number
  h: number
  d: string
  at: number[]
  vertical: boolean
}

// A long, easy wave across the page with a crest or trough for each contact;
// on phones it turns and runs down the left edge.
const wide: Layout = {
  w: 1200,
  h: 640,
  d: 'M-40 330C60 330 90 150 190 150S330 490 470 490S620 150 760 150S910 490 1040 490S1190 330 1240 330',
  at: [],
  vertical: false,
}
const tall: Layout = {
  w: 400,
  h: 1100,
  d: 'M60 -20C60 120 22 200 48 330S112 470 92 600S30 800 60 1120',
  at: [0.14, 0.38, 0.6, 0.84],
  vertical: true,
}

// Crests and troughs of the wave, found by sampling the path.
function extremes(path: SVGPathElement) {
  const total = path.getTotalLength()
  const n = 600
  const pts = Array.from({ length: n + 1 }, (_, i) => path.getPointAtLength((total * i) / n))
  return pts.filter((p, i) => i > 0 && i < n && (p.y - pts[i - 1].y) * (pts[i + 1].y - p.y) < 0)
}

function useLayout() {
  const [layout, setLayout] = useState<Layout>(() => (window.matchMedia('(min-width: 1024px)').matches ? wide : tall))
  useLayoutEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const on = () => setLayout(mq.matches ? wide : tall)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return layout
}

export default function ContactCurve() {
  const layout = useLayout()
  const pathRef = useRef<SVGPathElement>(null)
  const [points, setPoints] = useState<{ x: number; y: number }[]>([])

  // Place each contact on the curve itself.
  useLayoutEffect(() => {
    const path = pathRef.current
    if (!path) return
    const total = path.getTotalLength()
    setPoints(layout.vertical ? layout.at.map((t) => path.getPointAtLength(total * t)) : extremes(path))
  }, [layout])

  const { w, h, d, vertical } = layout

  return (
    <motion.div
      className={`relative w-full ${vertical ? "mx-auto max-w-[520px]" : ""}`}
      style={{ aspectRatio: `${w} / ${h}` }}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
    >
      <svg viewBox={`0 0 ${w} ${h}`} className="absolute inset-0 h-full w-full overflow-visible" fill="none" aria-hidden="true">
        <motion.path
          d={d}
          stroke="var(--line)"
          strokeWidth={1}
          strokeDasharray="3 7"
          transform={vertical ? 'translate(14 0)' : 'translate(0 16)'}
          variants={{ hidden: { pathLength: 0 }, shown: { pathLength: 1, transition: { duration: 2.6, ease: EASE, delay: 0.3 } } }}
        />
        <motion.path
          ref={pathRef}
          d={d}
          stroke="var(--fg)"
          strokeWidth={1.2}
          variants={{ hidden: { pathLength: 0 }, shown: { pathLength: 1, transition: { duration: 2.2, ease: EASE } } }}
        />
        <motion.circle
          r={vertical ? 5 : 4}
          fill="var(--accent)"
          variants={{ hidden: { opacity: 0 }, shown: { opacity: 1, transition: { delay: 2.2 } } }}
        >
          <animateMotion dur="11s" repeatCount="indefinite" path={d} rotate="auto" />
        </motion.circle>
      </svg>

      {points.map((pt, i) => {
        const item = items[i]
        if (!item) return null
        const { icon: Icon } = item
        const left = (pt.x / w) * 100
        const top = (pt.y / h) * 100
        // Cards sit on the open side of the curve.
        const place = vertical ? 'right' : pt.y > h / 2 ? 'below' : 'above'
        return (
          <div key={item.href} className="absolute" style={{ left: `${left}%`, top: `${top}%` }}>
            <motion.span
              className="absolute -left-[7px] -top-[7px] block h-[14px] w-[14px] rounded-full border border-fg bg-bg"
              variants={{
                hidden: { scale: 0 },
                shown: { scale: 1, transition: { type: 'spring', stiffness: 300, damping: 18, delay: 1 + i * 0.25 } },
              }}
            >
              <span className="absolute inset-[3px] rounded-full bg-fg" />
              <span className="absolute -inset-2 animate-ping rounded-full border border-accent opacity-40 [animation-duration:2.8s]" />
            </motion.span>

            <motion.a
              href={item.href}
              {...(item.external && { target: '_blank', rel: 'noopener noreferrer' })}
             
              className={`group absolute flex w-max max-w-[62vw] items-center gap-4 md:max-w-none ${
                place === 'right'
                  ? 'left-7 -translate-y-1/2'
                  : place === 'above'
                    ? 'bottom-8 -translate-x-1/2'
                    : 'top-8 -translate-x-1/2'
              }`}
              variants={{
                hidden: { opacity: 0, y: place === 'below' ? -16 : 16 },
                shown: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE, delay: 1.1 + i * 0.25 } },
              }}
            >
              <motion.span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line transition-colors duration-500 group-hover:border-fg group-hover:bg-fg group-hover:text-bg md:h-14 md:w-14"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4 + i * 0.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Icon className="h-5 w-5" />
              </motion.span>
              <span className="flex flex-col">
                <span className="eyebrow text-muted">{item.label}</span>
                <span className="link-line font-display text-xl leading-tight md:text-[1.9rem]">{item.value}</span>
              </span>
            </motion.a>
          </div>
        )
      })}
    </motion.div>
  )
}
