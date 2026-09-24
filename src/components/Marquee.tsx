import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

// A band of oversized words that drifts continuously and leans into the scroll.
export default function Marquee({ words }: { words: string[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])
  const line = [...words, ...words]

  return (
    <div ref={ref} className="overflow-hidden border-y border-line py-8 md:py-12" aria-hidden="true">
      <motion.div style={{ x }}>
        <div className="animate-marquee flex w-max items-center whitespace-nowrap">
          {line.map((w, i) => (
            <span key={i} className="flex items-center font-display text-[13vw] leading-none md:text-[8.5vw]">
              <span className={i % 2 ? 'italic text-muted' : ''}>{w}</span>
              <span className="mx-[3vw] inline-block h-[0.12em] w-[0.12em] rounded-full bg-accent" />
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
