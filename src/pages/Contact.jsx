import SectionHeading from '../components/SectionHeading.jsx'
import { site } from '../content/site.js'

export default function Contact() {
  return (
    <section className="container section page-top contact">
      <SectionHeading eyebrow="Get in touch" title="Let's work together">
        Commissions, prints, collaborations — drop a line.
      </SectionHeading>
      <a className="contact__email" href={`mailto:${site.email}`}>{site.email}</a>
      <div className="contact__socials">
        {site.socials.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
        ))}
      </div>
    </section>
  )
}
