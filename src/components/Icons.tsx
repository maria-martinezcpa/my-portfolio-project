import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

function Line({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

export function ArrowIcon(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </Line>
  )
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M20 12H4M10 6l-6 6 6 6" />
    </Line>
  )
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M7 17 17 7M8 7h9v9" />
    </Line>
  )
}

export function MailIcon(props: IconProps) {
  return (
    <Line {...props}>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="m3.5 6 8.5 7 8.5-7" />
    </Line>
  )
}

export function TelegramIcon(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M21 4 2.8 11.2c-.6.24-.6 1.1.02 1.3l4.5 1.5 1.8 5.4c.18.55.88.7 1.28.28l2.5-2.6 4.6 3.4c.5.36 1.2.1 1.34-.5L21.9 5c.14-.7-.5-1.26-1.16-1Z" />
      <path d="m7.4 14 10.1-7.2L9.6 15" />
    </Line>
  )
}

export function PhoneIcon(props: IconProps) {
  return (
    <Line {...props}>
      <path d="M5 3.5h3.2l1.6 4.2-2.1 1.4a11 11 0 0 0 5.2 5.2l1.4-2.1 4.2 1.6V17a2 2 0 0 1-2 2A15.5 15.5 0 0 1 3 5.5a2 2 0 0 1 2-2Z" />
    </Line>
  )
}
