import { site } from '../content/site.js'
import { resolveSrc } from '../content/resolveSrc.js'

export default function About() {
  const { about } = site
  return (
    <section className="container section page-top about">
      <img className="about__portrait" src={resolveSrc(about.portrait)} alt={site.name} />
      <div className="about__text">
        <span className="eyebrow">About</span>
        <h2>{about.heading}</h2>
        {about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        <p className="muted">{site.location}</p>
      </div>
    </section>
  )
}
