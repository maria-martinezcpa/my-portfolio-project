import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProjectCarousel from './components/ProjectCarousel'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProjectCarousel />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
