import { OWNER } from '../data'

export default function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <div className="container">
        © {new Date().getFullYear()} {OWNER}
      </div>
    </footer>
  )
}
