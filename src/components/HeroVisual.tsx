// Hero scene: a BIM building rising floor by floor on its site, with floating
// cards for the model data, its categories and the drawing set it produces.
type P3 = [number, number, number]

const S = 22
const CX = 261
const CY = 118
const COS = Math.cos(Math.PI / 6)

const p = ([x, y, z]: P3): [number, number] => [CX + (x - y) * COS * S, CY + (x + y) * 0.5 * S - z * S]
const pts = (...ps: P3[]) => ps.map((q) => p(q).map((n) => n.toFixed(1)).join(',')).join(' ')
const flat = (x0: number, y0: number, x1: number, y1: number, z = 0) =>
  pts([x0, y0, z], [x1, y0, z], [x1, y1, z], [x0, y1, z])

function Box({ a, b, color, alpha = 1 }: { a: P3; b: P3; color: string; alpha?: number }) {
  const [x0, y0, z0] = a
  const [x1, y1, z1] = b
  return (
    <g stroke={color} strokeWidth={1} strokeLinejoin="round">
      <polygon points={pts([x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1])} fill={color} fillOpacity={0.5 * alpha} />
      <polygon points={pts([x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [x1, y0, z1])} fill={color} fillOpacity={0.3 * alpha} />
      <polygon points={pts([x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1])} fill={color} fillOpacity={0.18 * alpha} />
    </g>
  )
}

const ARCH = '#60a5fa'
const SITE = '#4ade80'
const ROAD = '#334155'
const CITY = '#64748b'
const SLAB = '#94a3b8'
const GLASS = '#e0f2fe'

// Main building footprint and floors
const X0 = 5.5
const X1 = 9
const Y0 = 1
const Y1 = 4.3
const FLOORS = 6

function Floor({ i }: { i: number }) {
  const z0 = i
  const z1 = i + 1
  return (
    <g className="hv-floor" style={{ animationDelay: `${0.25 + i * 0.16}s` }}>
      <Box a={[X0, Y0, z0]} b={[X1, Y1, z1]} color={ARCH} />
      {[6, 7, 8].map((x) => (
        <polygon
          key={`f${x}`}
          points={pts([x, Y1, z0 + 0.3], [x + 0.65, Y1, z0 + 0.3], [x + 0.65, Y1, z0 + 0.78], [x, Y1, z0 + 0.78])}
          fill={GLASS}
          fillOpacity={0.85}
        />
      ))}
      {[1.5, 2.5, 3.4].map((y) => (
        <polygon
          key={`s${y}`}
          points={pts([X1, y, z0 + 0.3], [X1, y + 0.55, z0 + 0.3], [X1, y + 0.55, z0 + 0.78], [X1, y, z0 + 0.78])}
          fill={GLASS}
          fillOpacity={0.6}
        />
      ))}
    </g>
  )
}

function Scene() {
  return (
    <svg viewBox="0 0 560 420" className="hv-svg" role="img" aria-labelledby="hv-title">
      <title id="hv-title">A BIM building model on its site</title>
      <defs>
        <pattern id="hv-grid" width="22" height="22" patternUnits="userSpaceOnUse">
          <path d="M22 0H0V22" fill="none" style={{ stroke: 'var(--visual-grid)' }} strokeWidth="1" />
        </pattern>
        <radialGradient id="hv-glow" cx="50%" cy="45%" r="55%">
          <stop offset="0" stopColor={ARCH} stopOpacity="0.28" />
          <stop offset="1" stopColor={ARCH} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="560" height="420" fill="url(#hv-grid)" opacity="0.55" />
      <ellipse cx="280" cy="200" rx="260" ry="170" fill="url(#hv-glow)" />

      {/* Site slab */}
      <Box a={[0, 0, -0.5]} b={[10, 8, 0]} color={SLAB} alpha={0.5} />

      {/* Street, landscape and site boundary */}
      <polygon points={flat(0, 4.8, 10, 5.6)} fill={ROAD} fillOpacity={0.9} />
      <polyline points={pts([0, 5.2, 0], [10, 5.2, 0])} stroke="#e2e8f0" strokeOpacity={0.7} strokeDasharray="5 5" />
      <polygon points={flat(0.5, 6, 4.5, 7.6)} fill={SITE} fillOpacity={0.14} stroke={SITE} strokeOpacity={0.5} strokeDasharray="4 3" />
      <polygon points={flat(5, 0.5, 9.6, 4.6)} fill={SITE} fillOpacity={0.1} stroke={SITE} strokeWidth={1.5} className="hv-parcel" />

      {/* Context massing and trees */}
      <Box a={[0.6, 0.6, 0]} b={[2.6, 2.6, 0]} color={CITY} />
      <Box a={[0.6, 0.6, 0]} b={[2.6, 3.6, 3]} color={CITY} alpha={1.2} />
      <Box a={[1, 6.2, 0]} b={[3.2, 7.4, 1.8]} color={CITY} alpha={1.2} />
      {[
        [5.6, 6.6],
        [6.8, 7.1],
        [8, 6.5],
        [9.2, 7.2],
      ].map(([x, y]) => {
        const [tx, ty] = p([x, y, 0.8])
        return (
          <g key={`t${x}`}>
            <polyline points={pts([x, y, 0], [x, y, 0.5])} stroke="#a16207" strokeWidth={2} />
            <circle cx={tx} cy={ty} r={7} fill={SITE} fillOpacity={0.7} />
          </g>
        )
      })}

      {/* The BIM building, assembled floor by floor */}
      {Array.from({ length: FLOORS }, (_, i) => (
        <Floor key={i} i={i} />
      ))}

    </svg>
  )
}

export default function HeroVisual() {
  return (
    <div className="hero-visual">
      <Scene />

      <div className="hv-card hv-model">
        <div className="hv-card-head">
          <span className="hv-dot" style={{ background: ARCH }} />
          Tower B · Revit model
        </div>
        <dl>
          <div>
            <dt>Levels</dt>
            <dd>6</dd>
          </div>
          <div>
            <dt>LOD</dt>
            <dd>350</dd>
          </div>
          <div>
            <dt>Clashes</dt>
            <dd className="ok">0</dd>
          </div>
        </dl>
        <div className="hv-progress" aria-hidden="true">
          <span />
        </div>
      </div>

      <div className="hv-card hv-layers">
        <div className="hv-card-head">
          <span className="hv-dot" style={{ background: '#fbbf24' }} />
          Model categories
        </div>
        <ul>
          {[
            ['Walls', ARCH],
            ['Floors', SLAB],
            ['Windows', GLASS],
            ['Roofs', '#fbbf24'],
          ].map(([name, color]) => (
            <li key={name}>
              <span className="hv-check" style={{ background: color }} />
              {name}
            </li>
          ))}
        </ul>
      </div>

      <div className="hv-card hv-code">
        <div className="hv-card-head">
          <span className="hv-dot" style={{ background: '#c084fc' }} />
          Sheet set
        </div>
        <ul className="hv-sheets">
          {[
            ['A-101', 'Floor plans'],
            ['A-201', 'Elevations'],
            ['A-301', 'Sections'],
            ['A-501', 'Details'],
          ].map(([num, name]) => (
            <li key={num}>
              <b>{num}</b>
              {name}
              <span className="ok">✓</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
