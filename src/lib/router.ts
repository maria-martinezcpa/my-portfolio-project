import { useEffect, useState } from 'react'

// A tiny hash router: #/work, #/work/04, #/bim, #/about, #/contact.
// Hash URLs keep the site working on any static host without rewrites.
export type Route =
  | { name: 'home' }
  | { name: 'work' }
  | { name: 'project'; id: string }
  | { name: 'bim' }
  | { name: 'about' }
  | { name: 'contact' }
  | { name: 'notfound' }

export function parse(hash: string): Route {
  const path = hash.replace(/^#/, '').replace(/\/+$/, '') || '/'
  if (path === '/') return { name: 'home' }
  if (path === '/work') return { name: 'work' }
  const project = path.match(/^\/work\/([\w-]+)$/)
  if (project) return { name: 'project', id: project[1] }
  if (path === '/bim') return { name: 'bim' }
  if (path === '/about') return { name: 'about' }
  if (path === '/contact') return { name: 'contact' }
  return { name: 'notfound' }
}

export const routeKey = (r: Route) => (r.name === 'project' ? `project-${r.id}` : r.name)

export function useRoute() {
  const [route, setRoute] = useState<Route>(() => parse(window.location.hash))
  useEffect(() => {
    const onChange = () => setRoute(parse(window.location.hash))
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}
