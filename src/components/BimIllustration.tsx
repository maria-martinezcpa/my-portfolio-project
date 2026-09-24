// What is BIM: a detailed BIM building on its site (terrain, streets, parcels, utilities,
// surrounding buildings), the project lifecycle that shares the model, and the BIM dimensions (3D-7D).
type P3 = [number, number, number]

const S = 20
const CX = 185
const CY = 300
const COS = Math.cos(Math.PI / 6)

const p = ([x, y, z]: P3): [number, number] => [CX + (x - y) * COS * S, CY + (x + y) * 0.5 * S - z * S]
const pts = (...ps: P3[]) => ps.map((q) => p(q).map((n) => n.toFixed(1)).join(',')).join(' ')

function Box({ a, b, color, alpha = 1 }: { a: P3; b: P3; color: string; alpha?: number }) {
  const [x0, y0, z0] = a
  const [x1, y1, z1] = b
  return (
    <g stroke={color} strokeWidth={1} strokeLinejoin="round">
      <polygon points={pts([x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1])} fill={color} fillOpacity={0.55 * alpha} />
      <polygon points={pts([x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1])} fill={color} fillOpacity={0.35 * alpha} />
      <polygon points={pts([x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1])} fill={color} fillOpacity={0.2 * alpha} />
    </g>
  )
}

function Line({ a, b, color, width = 3, dash }: { a: P3; b: P3; color: string; width?: number; dash?: string }) {
  const [x1, y1] = p(a)
  const [x2, y2] = p(b)
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={width} strokeLinecap="round" strokeDasharray={dash} />
  )
}

function Label({ at, y, title, sub, color }: { at: P3; y: number; title: string; sub: string; color: string }) {
  const [x0, y0] = p(at)
  return (
    <g>
      <polyline points={`${x0},${y0} ${412},${y} ${424},${y}`} fill="none" stroke={color} strokeWidth={1} strokeOpacity={0.7} />
      <circle cx={x0} cy={y0} r={3} fill={color} />
      <text x={430} y={y - 3} fill="#f8fafc" fontSize={15} fontWeight={700}>
        {title}
      </text>
      <text x={430} y={y + 14} fill="#94a3b8" fontSize={12}>
        {sub}
      </text>
    </g>
  )
}

const ARCH = '#60a5fa'
const STRUCT = '#f59e0b'
const MEP = '#22d3ee'
const DUCT = '#34d399'
const SLAB = '#94a3b8'
const ENERGY = '#a3e635'
const OPS = '#f472b6'
const SITE = '#4ade80'
const CITY = '#64748b'
const POWER = '#fbbf24'

function Heading({ y, children }: { y: number; children: string }) {
  return (
    <text x={12} y={y} fill="#94a3b8" fontSize={11} fontWeight={700} letterSpacing={1.2}>
      {children}
    </text>
  )
}

function Stage({
  x,
  y = 592,
  title,
  who,
  does,
  color,
}: {
  x: number
  y?: number
  title: string
  who: string
  does: string
  color: string
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={178} height={64} rx={10} style={{ fill: 'var(--visual-card)' }} stroke={color} strokeOpacity={0.7} />
      <text x={12} y={21} fill={color} fontSize={13} fontWeight={700}>
        {title}
      </text>
      <text x={12} y={39} fill="#e2e8f0" fontSize={11.5}>
        {who}
      </text>
      <text x={12} y={55} fill="#94a3b8" fontSize={11}>
        {does}
      </text>
    </g>
  )
}

function Dimension({ i, d, title, sub, color }: { i: number; d: string; title: string; sub: string; color: string }) {
  return (
    <g transform={`translate(${12 + i * 116} 690)`}>
      <rect width={108} height={62} rx={10} style={{ fill: 'var(--visual-card)' }} stroke="#334155" />
      <rect width={108} height={4} rx={2} fill={color} />
      <text x={10} y={27} fill={color} fontSize={17} fontWeight={800}>
        {d}
      </text>
      <text x={40} y={27} fill="#f8fafc" fontSize={12.5} fontWeight={700}>
        {title}
      </text>
      <text x={10} y={48} fill="#94a3b8" fontSize={11}>
        {sub}
      </text>
    </g>
  )
}

// City blocks around the site (x 0-12, y 0-10), split by two streets.
const blocks: [P3, P3][] = [
  [[0, 0, 0], [5.5, 4.5, 0]],
  [[6.5, 0, 0], [12, 4.5, 0]],
  [[0, 5.5, 0], [5.5, 10, 0]],
  [[6.5, 5.5, 0], [12, 10, 0]],
]

// Surrounding buildings, back to front.
const context: [P3, P3][] = [
  [[0.5, 0.5, 0], [2.5, 4, 5]],
  [[3, 0.5, 0], [5, 2, 3]],
  [[7, 0.5, 0], [9, 2.5, 6.5]],
  [[9.5, 0.5, 0], [11.5, 4, 3.5]],
  [[3, 2.5, 0], [5, 4, 4]],
  [[7, 3, 0], [9, 4, 2]],
  [[0.5, 6, 0], [2.5, 8, 2]],
]

const trees: [number, number][] = [
  [3.5, 6.5], [4.6, 7.4], [3.2, 8.4], [4.4, 9.2], [1.5, 9.2],
]

// The BIM building on parcel D.
const B0: P3 = [7.5, 6.5, 0]
const B1: P3 = [11, 9, 4]
const floors = [0.8, 1.6, 2.4, 3.2]

const flat = (a: P3, b: P3, z = 0) => pts([a[0], a[1], z], [b[0], a[1], z], [b[0], b[1], z], [a[0], b[1], z])

export default function BimIllustration() {
  const pin = p([9.25, 7.75, 5.4])

  return (
    <svg
      viewBox="0 0 600 772"
      className="bim-illustration"
      role="img"
      aria-labelledby="bim-svg-title bim-svg-desc"
      fontFamily="Inter, system-ui, 'Segoe UI', sans-serif"
    >
      <title id="bim-svg-title">BIM: a building model and its data</title>
      <desc id="bim-svg-desc">
        A detailed BIM building, whose elements carry data such as floors, floor area and parcel, sits on its site with
        terrain, streets, parcels, a park, underground water and power lines, and the surrounding buildings. The same
        model is shared through design, construction and operation, and extends into 4D time, 5D cost, 6D
        sustainability and 7D facility management.
      </desc>

      <defs>
        <pattern id="bim-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" style={{ stroke: 'var(--visual-grid)' }} strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="600" height="772" fill="url(#bim-grid)" opacity="0.6" />

      {/* Title */}
      <text x={300} y={38} fill="#f8fafc" fontSize={21} fontWeight={800}>
        BIM model
      </text>
      <text x={300} y={58} fill="#94a3b8" fontSize={12}>
        The building, its data and its site
      </text>

      {/* Site: terrain slab */}
      <Box a={[0, 0, -0.6]} b={[12, 10, 0]} color={SLAB} alpha={0.45} />

      {/* Site: parcels, park and streets */}
      {blocks.map(([a, b], i) => (
        <polygon
          key={`blk${i}`}
          points={flat(a, b)}
          fill={SITE}
          fillOpacity={i === 2 ? 0.2 : 0.05}
          stroke={SITE}
          strokeOpacity={i === 3 ? 0.9 : 0.4}
          strokeWidth={i === 3 ? 1.5 : 1}
          strokeDasharray={i === 3 ? undefined : '4 3'}
        />
      ))}
      <polygon points={flat([0, 4.5, 0], [12, 5.5, 0])} fill="#334155" fillOpacity={0.85} />
      <polygon points={flat([5.5, 0, 0], [6.5, 10, 0])} fill="#334155" fillOpacity={0.85} />
      <Line a={[0, 5, 0]} b={[12, 5, 0]} color="#e2e8f0" width={0.8} dash="5 5" />
      <Line a={[6, 0, 0]} b={[6, 10, 0]} color="#e2e8f0" width={0.8} dash="5 5" />

      {/* Site: underground utility networks */}
      <Line a={[0, 5, -0.35]} b={[12, 5, -0.35]} color={MEP} width={2} dash="6 4" />
      <Line a={[6, 0, -0.35]} b={[6, 10, -0.35]} color={POWER} width={2} dash="6 4" />
      <Line a={[9, 5, -0.35]} b={[9, 6.5, -0.35]} color={MEP} width={2} />

      {/* Site: context buildings (3D massing) */}
      {context.map(([a, b], i) => (
        <Box key={`ctx${i}`} a={a} b={b} color={CITY} alpha={1.2} />
      ))}
      {trees.map(([x, y]) => {
        const [tx, ty] = p([x, y, 0.8])
        return (
          <g key={`t${x}${y}`}>
            <Line a={[x, y, 0]} b={[x, y, 0.5]} color="#a16207" width={2} />
            <circle cx={tx} cy={ty} r={7} fill={SITE} fillOpacity={0.7} />
          </g>
        )
      })}

      {/* BIM: the detailed building, with floors and windows */}
      <Box a={B0} b={B1} color={ARCH} />
      {floors.map((z) => (
        <g key={`fl${z}`}>
          <polyline points={pts([B0[0], B1[1], z], [B1[0], B1[1], z], [B1[0], B0[1], z])} fill="none" stroke={ARCH} strokeWidth={1} />
          {[7.8, 8.6, 9.4, 10.2].map((x) => (
            <polygon key={`w${x}`} points={pts([x, 9, z - 0.55], [x + 0.5, 9, z - 0.55], [x + 0.5, 9, z - 0.2], [x, 9, z - 0.2])} fill="#e0f2fe" fillOpacity={0.8} />
          ))}
          {[6.8, 7.6, 8.4].map((y) => (
            <polygon key={`sw${y}`} points={pts([11, y, z - 0.55], [11, y + 0.4, z - 0.55], [11, y + 0.4, z - 0.2], [11, y, z - 0.2])} fill="#e0f2fe" fillOpacity={0.6} />
          ))}
        </g>
      ))}

      {/* Selected element marker */}
      <Line a={[9.25, 7.75, 4]} b={[9.25, 7.75, 5.1]} color={SITE} width={1.5} />
      <circle cx={pin[0]} cy={pin[1]} r={7} fill={SITE} />
      <circle cx={pin[0]} cy={pin[1]} r={2.5} style={{ fill: 'var(--visual-bg)' }} />

      {/* Layer labels */}
      <Label at={[11.5, 0.5, 3]} y={200} title="Surroundings" sub="Neighbouring buildings" color={CITY} />
      <Label at={[11, 6.5, 3]} y={300} title="BIM building" sub="Detailed model + data" color={ARCH} />
      <Label at={[12, 5, 0]} y={410} title="Site & streets" sub="Parcel and landscape" color={SITE} />
      <Label at={[12, 8, -0.3]} y={500} title="Terrain & utilities" sub="Ground, water, power" color={MEP} />

      {/* The BIM model's data */}
      <line x1={186} y1={80} x2={pin[0] - 6} y2={pin[1] - 4} stroke="#e2e8f0" strokeWidth={1} strokeDasharray="3 3" />
      <g transform="translate(12 12)">
        <rect width={174} height={94} rx={10} style={{ fill: 'var(--visual-card)' }} stroke="#334155" />
        <text x={12} y={22} fill="#f8fafc" fontSize={13} fontWeight={700}>
          Tower B · BIM model
        </text>
        <text x={12} y={42} fill="#94a3b8" fontSize={11.5}>
          5 floors · 4,800 m² GFA
        </text>
        <text x={12} y={59} fill="#94a3b8" fontSize={11.5}>
          Parcel 12-034
        </text>
        <text x={12} y={76} fill={SITE} fontSize={11.5}>
          Level 1 · FFL +0.00
        </text>
      </g>

      {/* One model, shared across the lifecycle */}
      <Heading y={582}>ONE MODEL, SHARED ACROSS THE LIFECYCLE</Heading>
      <Stage x={12} title="1 · Design" who="Architects & engineers" does="Coordinate, find clashes" color={ARCH} />
      <Stage x={211} title="2 · Build" who="Contractors" does="Schedule, quantify, fabricate" color={STRUCT} />
      <Stage x={410} title="3 · Operate" who="Owners & facility teams" does="Maintain and manage assets" color={OPS} />
      {[193, 392].map((x) => (
        <path key={`arr${x}`} d={`M${x} 616 L${x + 10} 624 L${x} 632 Z`} fill="#64748b" />
      ))}

      {/* BIM dimensions */}
      <Heading y={680}>BIM DIMENSIONS: EACH ADDS DATA TO THE MODEL</Heading>
      <Dimension i={0} d="3D" title="Model" sub="Geometry, parts" color={ARCH} />
      <Dimension i={1} d="4D" title="Time" sub="Build schedule" color={STRUCT} />
      <Dimension i={2} d="5D" title="Cost" sub="Quantities, budget" color={DUCT} />
      <Dimension i={3} d="6D" title="Energy" sub="Sustainability" color={ENERGY} />
      <Dimension i={4} d="7D" title="Operate" sub="Facility mgmt" color={OPS} />
    </svg>
  )
}
