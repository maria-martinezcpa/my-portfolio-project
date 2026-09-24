import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import { OWNER } from '../data'
import { EASE } from '../lib/motion'

// Opening curtain: a counter runs to 100 while the name rises, then the
// panel lifts away to reveal the page.
export default function Preloader({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false)
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => String(Math.round(v)).padStart(3, '0'))
  const progress = useTransform(count, [0, 100], [0, 1])

  useEffect(() => {
    const controls = animate(count, 100, {
      duration: 1.6,
      ease: [0.65, 0, 0.35, 1],
      onComplete: () => setLeaving(true),
    })
    return () => controls.stop()
  }, [count])

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex flex-col justify-between bg-fg p-6 text-bg md:p-10"
      initial={{ y: 0 }}
      animate={leaving ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: 1.1, ease: EASE }}
      onAnimationComplete={() => leaving && onDone()}
      aria-hidden="true"
    >
      <div className="eyebrow flex justify-between opacity-60">
        <span>Portfolio</span>
        <span>BIM · Architecture</span>
      </div>
      <div className="overflow-hidden">
        <motion.div
          className="font-display text-[15vw] leading-[0.9] tracking-tight md:text-[9vw]"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
        >
          {OWNER}
        </motion.div>
      </div>
      <div className="flex items-end justify-between">
        <motion.div className="h-px flex-1 origin-left bg-current opacity-40" style={{ scaleX: progress }} />
        <motion.span className="ml-6 font-display text-5xl tabular-nums md:text-7xl">{rounded}</motion.span>
      </div>
    </motion.div>
  )
}
