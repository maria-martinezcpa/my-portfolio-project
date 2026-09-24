import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef, type ElementType, type ReactNode } from 'react'
import { EASE, inView } from '../lib/motion'

// Words rise out of a mask, one after another.
export function RevealText({
  text,
  as: Tag = 'span',
  className = '',
  delay = 0,
  stagger = 0.06,
  instant = false,
}: {
  text: string
  as?: ElementType
  className?: string
  delay?: number
  stagger?: number
  instant?: boolean
}) {
  const words = text.split(' ')
  const trigger = instant ? { animate: 'shown' } : { whileInView: 'shown', viewport: inView }
  return (
    <Tag className={className} aria-label={text}>
      {/* inline, not display:contents, so the viewport observer has a box to watch */}
      <motion.span className="inline" initial="hidden" {...trigger} aria-hidden="true">
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
            <motion.span
              className="inline-block will-change-transform"
              variants={{
                hidden: { y: '110%', rotate: 2 },
                shown: { y: '0%', rotate: 0, transition: { duration: 1.1, ease: EASE, delay: delay + i * stagger } },
              }}
            >
              {w}
              {i < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}

// A block that fades up into place.
export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 32,
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: 1.2, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}

// An image that is unveiled from the bottom, settles from a slight zoom,
// drifts with the scroll, and scales slowly on hover.
export function RevealImage({
  src,
  alt = '',
  className = '',
  parallax = true,
  delay = 0,
  eager = false,
  ratio,
}: {
  src: string
  alt?: string
  className?: string
  parallax?: boolean
  delay?: number
  eager?: boolean
  /** width / height; use instead of an aspect class to keep the photo uncropped */
  ratio?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-7%', '7%'])

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden bg-surface after:pointer-events-none after:absolute after:inset-0 after:ring-1 after:ring-inset after:ring-fg/15 ${className}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={inView}
      transition={{ duration: 1.4, ease: EASE, delay }}
    >
      <motion.div className="absolute inset-x-0 -inset-y-[8%]" style={parallax && !reduce ? { y } : undefined}>
        {/* Hover zoom lives on its own layer so it never fights the entrance animation */}
        <div className="h-full w-full transition-transform duration-[1600ms] ease-[var(--ease-expo)] group-hover:scale-[1.045]">
          <motion.img
            src={src}
            alt={alt}
            loading={eager ? 'eager' : 'lazy'}
            draggable={false}
            className="h-full w-full object-cover"
            initial={{ scale: 1.25 }}
            whileInView={{ scale: 1 }}
            viewport={inView}
            transition={{ duration: 1.8, ease: EASE, delay }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
