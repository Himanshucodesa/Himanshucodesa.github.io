import { usePreferences } from '../context/Preferences.jsx'
import { site } from '../content/site.js'
import { useState } from 'react'
import SectionHeading from '../components/SectionHeading.jsx'
import CategoryFilter from '../components/CategoryFilter.jsx'
import PhotoGrid from '../components/PhotoGrid.jsx'
import PhotoOrbit from '../components/PhotoOrbit.jsx'
import { photos, categories, photoChapters } from '../content/photos.js'

export default function Gallery() {
  const { t } = usePreferences()
  const [active, setActive] = useState('All')
  const shown = active === 'All' ? photos : photos.filter((p) => p.category === active)
  const useOrbit = photoChapters.find((chapter) => chapter.category === active)?.presentation === 'orbit'

  return (
    <section className="container section page-top">
      <SectionHeading eyebrow={t('Portfolio')} title={t(site.gallery.heading)}>
        {t(site.gallery.introduction)}
      </SectionHeading>
      <CategoryFilter categories={categories} active={active} onChange={setActive} />
      {/* key resets the lightbox when the filter changes */}
      {shown.length === 0 ? <p className="muted" role="status">{t(site.gallery.emptyMessage)}</p> : useOrbit ?
        <div className="portfolio-orbit"><PhotoOrbit key={active} photos={shown} /></div> :
        <PhotoGrid key={active} photos={shown} />}
    </section>
  )
}
