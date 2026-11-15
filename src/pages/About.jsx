import { usePreferences } from '../context/Preferences.jsx'
import { site } from '../content/site.js'
import { resolveSrc } from '../content/resolveSrc.js'

export default function About() {
  const { t } = usePreferences()
  const { about } = site
  return (
    <section className="container section page-top about">
      <img className="about__portrait" src={resolveSrc(about.portrait)} alt={site.name} />
      <div className="about__text">
        <span className="eyebrow">{t('About')}</span>
        <h2>{t(about.heading)}</h2>
        {about.paragraphs.map((p, i) => <p key={i}>{t(p)}</p>)}
        <p className="muted">{t(site.location)}</p>
      </div>
    </section>
  )
}
