import Page from '../components/Page'
import { RevealText } from '../components/Reveal'
import { OWNER } from '../data'

export default function NotFound() {
  return (
    <Page title={`Not found | ${OWNER}`}>
      <section className="container-x flex min-h-[100svh] flex-col justify-center">
        <RevealText as="h1" instant delay={0.3} text="Nothing here." className="font-display text-[16vw] leading-none md:text-[10vw]" />
        <a href="#/" className="link-line mt-10 self-start pb-0.5 text-sm">
          Back to the homepage
        </a>
      </section>
    </Page>
  )
}
