import { usePreferences } from '../context/Preferences.jsx'
import { site } from '../content/site.js'
import { useState } from 'react'
import SectionHeading from '../components/SectionHeading.jsx'
import CategoryFilter from '../components/CategoryFilter.jsx'
import PhotoGrid from '../components/PhotoGrid.jsx'
import { photos, categories } from '../content/photos.js'

export default function Gallery() {
  const { t } = usePreferences()
  const [active, setActive] = useState('All')
  const shown = active === 'All' ? photos : photos.filter((p) => p.category === active)

  return (
    <section className="container section page-top">
      <SectionHeading eyebrow={t('Gallery')} title={t(site.gallery.heading)}>
        {t(site.gallery.introduction)}
      </SectionHeading>
      <CategoryFilter categories={categories} active={active} onChange={setActive} />
      {/* key resets the lightbox when the filter changes */}
      <PhotoGrid key={active} photos={shown} />
    </section>
  )
}
