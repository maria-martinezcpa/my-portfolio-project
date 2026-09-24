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

// A project image in a soft "gallery mount": a light matte border with rounded
// corners and a diffuse shadow. It is unveiled from the bottom, settles from a
// slight zoom, drifts with the scroll, and on hover lifts gently while a soft
// sheen passes across the picture.
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
  /** sizing for the picture itself, e.g. an aspect-ratio class */
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
      className="relative rounded-[14px] bg-gradient-to-b from-white/75 to-surface p-1.5 shadow-[0_1px_2px_rgba(23,22,20,0.05),0_14px_36px_-16px_rgba(23,22,20,0.28)] ring-1 ring-black/[0.04] transition-[translate,box-shadow] duration-700 ease-[var(--ease-expo)] group-hover:-translate-y-1 group-hover:shadow-[0_2px_4px_rgba(23,22,20,0.05),0_26px_52px_-20px_rgba(23,22,20,0.34)] md:p-2 dark:from-white/[0.07] dark:to-white/[0.02] dark:shadow-[0_18px_44px_-20px_rgba(0,0,0,0.85)] dark:ring-white/[0.06]"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: 1.2, ease: EASE, delay }}
    >
      <motion.div
        ref={ref}
        className={`relative overflow-hidden rounded-[9px] bg-surface after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:ring-1 after:ring-inset after:ring-black/[0.06] ${className}`}
        style={ratio ? { aspectRatio: ratio } : undefined}
        initial={{ clipPath: 'inset(100% 0% 0% 0% round 9px)' }}
        whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 9px)' }}
        viewport={inView}
        transition={{ duration: 1.4, ease: EASE, delay: delay + 0.1 }}
      >
        <motion.div className="absolute inset-x-0 -inset-y-[8%]" style={parallax && !reduce ? { y } : undefined}>
          {/* Hover zoom lives on its own layer so it never fights the entrance animation */}
          <div className="h-full w-full transition-transform duration-[1600ms] ease-[var(--ease-expo)] group-hover:scale-[1.035]">
            <motion.img
              src={src}
              alt={alt}
              loading={eager ? 'eager' : 'lazy'}
              draggable={false}
              className="h-full w-full object-cover"
              initial={{ scale: 1.2 }}
              whileInView={{ scale: 1 }}
              viewport={inView}
              transition={{ duration: 1.8, ease: EASE, delay }}
            />
          </div>
        </motion.div>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent_35%,rgba(255,255,255,0.22)_50%,transparent_65%)] transition-transform duration-[1400ms] ease-[var(--ease-expo)] group-hover:translate-x-full"
        />
      </motion.div>
    </motion.div>
  )
}
