import { usePreferences } from '../context/Preferences.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { site } from '../content/site.js'
import { Link } from 'react-router-dom'

export default function Contact() {
  const { t } = usePreferences()
  return (
    <section className="container section page-top contact">
      <SectionHeading eyebrow={t('Get in touch')} title={t(site.contact.heading)}>
        {t(site.contact.introduction)}
      </SectionHeading>
      {site.email && <a className="contact__email" href={`mailto:${site.email}`}>{site.email}</a>}
      {!site.email && site.socials.length === 0 && <Link to="/gallery" className="btn">{t('Explore the collection')}</Link>}
      {site.socials.length > 0 && <div className="contact__socials">
        {site.socials.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
        ))}
      </div>}
    </section>
  )
}
