import { usePreferences } from '../context/Preferences.jsx'
import { Link } from 'react-router-dom'
import ShutterHero from '../components/ShutterHero.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import PhotoGrid from '../components/PhotoGrid.jsx'
import { site } from '../content/site.js'
import { photos, heroPhoto } from '../content/photos.js'

export default function Home() {
  const { t } = usePreferences()
  const featured = photos.filter((p) => p.featured)
  return (
    <>
      <ShutterHero image={heroPhoto} title={
        <span className="hero__wordmark" aria-label={site.brand}>
          <span aria-hidden="true">{site.brandWords[0]}</span>
          <span className="hero__wordmark-bottom" aria-hidden="true"><i>{site.brandWords[1]}</i> {site.brandWords[2]}</span>
        </span>
      } subtitle={t(site.tagline)} />
      <section className="container section">
        <SectionHeading eyebrow={t('Selected work')} title={t('Featured')} />
        <PhotoGrid photos={featured} />
        <div className="center">
          <Link to="/gallery" className="btn">{t('View full gallery')}</Link>
        </div>
      </section>
    </>
  )
}
