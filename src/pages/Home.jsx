import { Link } from 'react-router-dom'
import ShutterHero from '../components/ShutterHero.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import PhotoGrid from '../components/PhotoGrid.jsx'
import { site } from '../content/site.js'
import { photos, heroPhoto } from '../content/photos.js'

export default function Home() {
  const featured = photos.filter((p) => p.featured)
  return (
    <>
      <ShutterHero image={heroPhoto} title={site.name} subtitle={site.tagline} />
      <section className="container section">
        <SectionHeading eyebrow="Selected work" title="Featured" />
        <PhotoGrid photos={featured} />
        <div className="center">
          <Link to="/gallery" className="btn">View full gallery</Link>
        </div>
      </section>
    </>
  )
}
