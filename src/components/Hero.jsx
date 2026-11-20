import { usePreferences } from '../context/Preferences.jsx'
import { resolveSrc } from '../content/resolveSrc.js'

export default function Hero({ image, title, subtitle, headingLevel = 'h1', lazy = false }) {
  const { t } = usePreferences()
  const Heading = headingLevel
  return (
    <section className="hero">
      <img className="hero__img" src={resolveSrc(image.src)} alt={t(image.alt ?? image.title)} style={{ objectPosition: image.objectPosition }} loading={lazy ? 'lazy' : 'eager'} decoding="async" fetchPriority={lazy ? 'auto' : 'high'} />
      <div className="hero__overlay" />
      <div className="hero__text">
        <Heading>{title}</Heading>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </section>
  )
}
