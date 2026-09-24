import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Nav from './components/Nav'
import Preloader from './components/Preloader'
import { findProject } from './data'
import { IntroContext } from './lib/intro'
import { routeKey, useRoute, type Route } from './lib/router'
import About from './pages/About'
import Bim from './pages/Bim'
import Contact from './pages/Contact'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Project from './pages/Project'
import Work from './pages/Work'

function render(route: Route) {
  switch (route.name) {
    case 'home':
      return <Home />
    case 'work':
      return <Work />
    case 'project': {
      const project = findProject(route.id)
      return project ? <Project project={project} /> : <NotFound />
    }
    case 'bim':
      return <Bim />
    case 'about':
      return <About />
    case 'contact':
      return <Contact />
    default:
      return <NotFound />
  }
}

// The preloader plays once per visit.
const INTRO_KEY = 'portfolio-intro-seen'
function introSeen() {
  try {
    return sessionStorage.getItem(INTRO_KEY) === '1' || window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}

export default function App() {
  const route = useRoute()
  const [introDone, setIntroDone] = useState(introSeen)

  const finishIntro = () => {
    try {
      sessionStorage.setItem(INTRO_KEY, '1')
    } catch {
      // not stored; the intro may play again next load
    }
    setIntroDone(true)
  }

  return (
    <IntroContext.Provider value={introDone}>
      {!introDone && <Preloader onDone={finishIntro} />}
      <Nav route={route} />
      <main>
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
          <div key={routeKey(route)}>{render(route)}</div>
        </AnimatePresence>
      </main>
    </IntroContext.Provider>
  )
}
