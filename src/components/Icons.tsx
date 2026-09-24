import type { ReactNode, SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

// Line icons on a 24px grid; they take the current text color.
function Line({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

// Filled icons (contact channels).
function Solid({ d, ...props }: IconProps & { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d={d} />
    </svg>
  )
}

export function CubeIcon(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M12 2.5 3.5 7.2v9.6l8.5 4.7 8.5-4.7V7.2L12 2.5Z" />
      <path d="m3.5 7.2 8.5 4.7 8.5-4.7M12 11.9v9.6" />
    </Line>
  )
}

export function MapIcon(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M9 4 3 6.2v13.8l6-2.2 6 2.2 6-2.2V4l-6 2.2L9 4Z" />
      <path d="M9 4v13.8M15 6.2V20" />
    </Line>
  )
}

export function CodeIcon(props: IconProps) {
  return (
    <Line {...props}>
      <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" />
    </Line>
  )
}

export function LayersIcon(props: IconProps) {
  return (
    <Line {...props}>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12.5 9 5 9-5M3 17l9 5 9-5" />
    </Line>
  )
}

export function DrawingIcon(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M14 3H6.5a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V7.5L14 3Z" />
      <path d="M14 3v4.5h4.5M9 12.5h6M9 16.5h4" />
    </Line>
  )
}

export function EyeIcon(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </Line>
  )
}

export function ScanIcon(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M4 12h16" />
    </Line>
  )
}

export function PinIcon(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </Line>
  )
}

export function ClipboardIcon(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M9 3.5h6v3H9z" />
      <path d="M9 5H6a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-3M9 14l2 2 4-4" />
    </Line>
  )
}

export function SendIcon(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M21 3 10.5 13.5M21 3l-6.5 18-4-7.5L3 9.5 21 3Z" />
    </Line>
  )
}

export function SparkIcon(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
    </Line>
  )
}

export function SearchIcon(props: IconProps) {
  return (
    <Line {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </Line>
  )
}

export function UsersIcon(props: IconProps) {
  return (
    <Line {...props}>
      <circle cx="9.5" cy="8" r="3.5" />
      <path d="M3 20v-1a4 4 0 0 1 4-4h5a4 4 0 0 1 4 4v1M17 4.3a3.5 3.5 0 0 1 0 6.9M21 20v-1a4 4 0 0 0-3-3.9" />
    </Line>
  )
}

export function ChartIcon(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M3 20h18M6.5 16.5v-5M11.5 16.5V6.5M16.5 16.5v-8" />
    </Line>
  )
}

export function GlobeIcon(props: IconProps) {
  return (
    <Line {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
    </Line>
  )
}

export function CheckIcon(props: IconProps) {
  return (
    <Line {...props}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </Line>
  )
}

export function ArrowIcon(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Line>
  )
}

export function MailIcon(props: IconProps) {
  return <Solid d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm0 2v.51l8 5 8-5V6H4Zm16 2.87-7.47 4.67a1 1 0 0 1-1.06 0L4 8.87V18h16V8.87Z" {...props} />
}

export function TelegramIcon(props: IconProps) {
  return <Solid d="M21.4 3.2 2.3 10.6c-.9.35-.88 1.63.03 1.95l4.7 1.66 1.8 5.6c.24.74 1.17.97 1.72.42l2.6-2.56 4.66 3.42c.62.45 1.5.12 1.67-.63l3.2-15.4c.17-.8-.6-1.46-1.28-1.16ZM9.9 14.3l-.5 3.6-1.2-4 9.3-6.9-7.6 7.3Z" {...props} />
}

export function PhoneIcon(props: IconProps) {
  return <Solid d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" {...props} />
}

// The site mark: an isometric model block.
export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" className="logo-mark">
      <path d="M16 2 3 9.5 16 17l13-7.5L16 2Z" fill="var(--primary)" />
      <path d="M3 9.5V23l13 7.5V17L3 9.5Z" fill="var(--primary)" opacity="0.7" />
      <path d="M29 9.5V23l-13 7.5V17l13-7.5Z" fill="var(--accent)" />
      <path d="M16 17 29 9.5" stroke="var(--bg)" strokeOpacity="0.5" strokeWidth="1" />
    </svg>
  )
}
