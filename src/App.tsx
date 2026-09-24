import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import BimSection from './components/BimSection'
import Projects from './components/Projects'
import Process from './components/Process'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

// Fade sections in as they scroll into view. Content stays visible without the observer.
function useReveal() {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const root = document.documentElement
    root.classList.add('reveal-ready')
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('revealed')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -4% 0px', threshold: 0.05 },
    )
    document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el))
    return () => {
      io.disconnect()
      root.classList.remove('reveal-ready')
    }
  }, [])
}

export default function App() {
  useReveal()

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <BimSection />
        <Projects />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
