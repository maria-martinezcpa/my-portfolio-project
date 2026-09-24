import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { EASE } from '../lib/motion'

// Each page enters and leaves behind an ink curtain: on exit a panel rises to
// cover the screen, and on enter it lifts away to reveal the new page.
export default function Page({ children, title }: { children: ReactNode; title: string }) {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      onAnimationStart={(def) => {
        if (def === 'enter') document.title = title
      }}
    >
      <motion.div
        className="pointer-events-none fixed inset-0 z-[70] bg-fg"
        style={{ originY: 0 }}
        variants={{
          initial: { scaleY: 1 },
          enter: { scaleY: 0, transition: { duration: 0.9, ease: EASE, delay: 0.05 } },
          exit: { scaleY: 0 },
        }}
      />
      <motion.div
        className="pointer-events-none fixed inset-0 z-[70] bg-fg"
        style={{ originY: 1 }}
        variants={{
          initial: { scaleY: 0 },
          enter: { scaleY: 0 },
          exit: { scaleY: 1, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } },
        }}
      />
      <motion.div
        variants={{
          initial: { opacity: 0, y: 40 },
          enter: { opacity: 1, y: 0, transition: { duration: 1.1, ease: EASE, delay: 0.25 } },
          exit: { opacity: 0, y: -40, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
