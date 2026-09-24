import { motion } from 'framer-motion'
import { EASE, inView } from '../lib/motion'

// A hand-drafted axonometric of a four-storey building, drawn stroke by stroke:
// structural grid, massing, floor lines, openings, level tags and one element's data.
type P3 = [number, number, number]

const S = 26
const CX = 262
const CY = 262
const COS = Math.cos(Math.PI / 6)
const p = ([x, y, z]: P3): [number, number] => [CX + (x - y) * COS * S, CY + (x + y) * 0.5 * S - z * S]
const f = (n: number) => n.toFixed(1)
const seg = (a: P3, b: P3) => {
  const [x1, y1] = p(a)
  const [x2, y2] = p(b)
  return `M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}`
}
const poly = (...pts: P3[]) =>
  pts.map((q, i) => `${i ? 'L' : 'M'}${f(p(q)[0])} ${f(p(q)[1])}`).join('') + 'Z'

const W = 8
const D = 5
const H = 6.4
const LEVELS = [0, 1.6, 3.2, 4.8, H]

const ground = [
  ...[-1, 1, 3, 5, 7, 9].map((x) => seg([x, -1.5, 0], [x, 6.5, 0])),
  ...[-1, 1, 3, 5].map((y) => seg([-1.5, y, 0], [9.5, y, 0])),
].join('')

const gridX = [0, 4, 8]
const gridY = [0, 2.5, 5]
const axes = [
  ...gridX.map((x) => seg([x, -1.2, 0], [x, D + 2.2, 0])),
  ...gridY.map((y) => seg([-1.2, y, 0], [W + 2.2, y, 0])),
].join('')

const hidden = [seg([0, 0, 0], [W, 0, 0]), seg([0, 0, 0], [0, D, 0]), seg([0, 0, 0], [0, 0, H])].join('')

const massing = [
  seg([0, D, 0], [W, D, 0]),
  seg([W, D, 0], [W, 0, 0]),
  seg([0, D, 0], [0, D, H]),
  seg([W, D, 0], [W, D, H]),
  seg([W, 0, 0], [W, 0, H]),
  poly([0, 0, H], [W, 0, H], [W, D, H], [0, D, H]),
].join('')

const floors = LEVELS.slice(1, -1)
  .map((z) => seg([0, D, z], [W, D, z]) + seg([W, D, z], [W, 0, z]))
  .join('')

const openings = LEVELS.slice(0, -1)
  .flatMap((z) => [
    ...[0.8, 2.8, 4.8, 6.3].map((x) => poly([x, D, z + 0.45], [x + 1, D, z + 0.45], [x + 1, D, z + 1.25], [x, D, z + 1.25])),
    ...[0.7, 2.9].map((y) => poly([W, y, z + 0.45], [W, y + 1.4, z + 0.45], [W, y + 1.4, z + 1.25], [W, y, z + 1.25])),
  ])
  .join('')

const roof = poly([5, 1, H], [7, 1, H], [7, 2.6, H], [5, 2.6, H]) +
  poly([5, 1, H + 0.9], [7, 1, H + 0.9], [7, 2.6, H + 0.9], [5, 2.6, H + 0.9]) +
  [seg([5, 2.6, H], [5, 2.6, H + 0.9]), seg([7, 2.6, H], [7, 2.6, H + 0.9]), seg([7, 1, H], [7, 1, H + 0.9])].join('')

// Dimension line along the long facade
const dimY = D + 1.4
const dims =
  seg([0, dimY, 0], [W, dimY, 0]) +
  seg([0, D + 0.3, 0], [0, dimY + 0.3, 0]) +
  seg([W, D + 0.3, 0], [W, dimY + 0.3, 0])

function draw(delay: number, duration = 1.6) {
  return {
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: inView,
    transition: { pathLength: { duration, ease: EASE, delay }, opacity: { duration: 0.2, delay } },
  }
}

function fade(delay: number) {
  return {
    initial: { opacity: 0, y: 6 },
    whileInView: { opacity: 1, y: 0 },
    viewport: inView,
    transition: { duration: 0.9, ease: EASE, delay },
  }
}

export default function AxonDrawing({ className = '' }: { className?: string }) {
  const dimMid = p([W / 2, dimY, 0])
  const callFrom = p([3.3, D, 2.4])
  const bubbles = [
    ...gridX.map((x, i) => ({ at: p([x, D + 2.7, 0]), label: String(i + 1) })),
    ...gridY.map((y, i) => ({ at: p([W + 2.7, y, 0]), label: 'ABC'[i] })),
  ]

  return (
    <svg
      viewBox="0 70 600 420"
      className={`h-auto w-full text-fg ${className}`}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Axonometric drawing of a four-storey building model with its structural grid, levels, openings and element data"
    >
      <motion.path d={ground} strokeWidth={0.6} className="text-line" stroke="currentColor" strokeDasharray="2 5" {...draw(0, 1.2)} />
      <motion.path d={axes} strokeWidth={0.7} className="text-accent" stroke="currentColor" strokeDasharray="10 4 2 4" {...draw(0.2, 1.4)} />
      {bubbles.map((b, i) => (
        <motion.g key={b.label} {...fade(0.9 + i * 0.06)}>
          <circle cx={b.at[0]} cy={b.at[1]} r={10} strokeWidth={0.8} className="text-accent" stroke="currentColor" />
          <text x={b.at[0]} y={b.at[1] + 3.5} textAnchor="middle" fontSize={10} fill="currentColor" stroke="none" className="text-accent font-sans">
            {b.label}
          </text>
        </motion.g>
      ))}

      <motion.path d={hidden} strokeWidth={0.8} strokeDasharray="4 4" opacity={0.45} {...draw(0.5, 1.2)} />
      <motion.path d={massing} strokeWidth={1.4} {...draw(0.6, 2)} />
      <motion.path d={floors} strokeWidth={0.8} {...draw(1.2, 1.6)} />
      <motion.path d={openings} strokeWidth={0.7} {...draw(1.5, 2.2)} />
      <motion.path d={roof} strokeWidth={0.9} {...draw(1.9, 1.2)} />
      <motion.path d={dims} strokeWidth={0.7} {...draw(2.1, 1)} />
      <motion.text
        x={dimMid[0]}
        y={dimMid[1] + 16}
        textAnchor="middle"
        fontSize={10}
        fill="currentColor"
        stroke="none"
        className="font-sans"
        transform={`rotate(30 ${dimMid[0]} ${dimMid[1] + 16})`}
        {...fade(2.6)}
      >
        24 000
      </motion.text>

      {/* Level tags */}
      {LEVELS.map((z, i) => {
        const [x, y] = p([W, 0, z])
        return (
          <motion.g key={z} {...fade(2.2 + i * 0.1)}>
            <path d={`M${f(x + 6)} ${f(y)}H${f(x + 58)}`} strokeWidth={0.6} strokeDasharray="2 3" />
            <path d={`M${f(x + 58)} ${f(y - 5)}l5 5-5 5-5-5Z`} strokeWidth={0.8} />
            <text x={x + 70} y={y + 3.5} fontSize={10} fill="currentColor" stroke="none" className="font-sans">
              {`L0${i}  +${(z * 3).toFixed(2)}`}
            </text>
          </motion.g>
        )
      })}

      {/* Element callout: every object carries data */}
      <motion.path
        d={`M${f(callFrom[0])} ${f(callFrom[1])}L${f(callFrom[0] - 70)} ${f(callFrom[1] + 120)}H40`}
        strokeWidth={0.7}
        {...draw(2.6, 1)}
      />
      <motion.circle cx={callFrom[0]} cy={callFrom[1]} r={3} fill="currentColor" {...fade(2.6)} />
      <motion.g {...fade(3.1)} fill="currentColor" stroke="none" className="font-sans">
        <text x={40} y={callFrom[1] + 138} fontSize={11} fontWeight={600}>
          Basic Wall · EXT-01
        </text>
        <text x={40} y={callFrom[1] + 154} fontSize={10} className="text-muted" fill="currentColor">
          350 mm brick cavity · U 0.18 · FR 120
        </text>
      </motion.g>
    </svg>
  )
}
