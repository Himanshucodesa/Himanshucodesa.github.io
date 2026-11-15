import { usePreferences } from '../context/Preferences.jsx'
import { resolveSrc } from '../content/resolveSrc.js'

export default function PhotoCard({ photo, onOpen }) {
  const { t } = usePreferences()
  return (
    <button className="photo-card" onClick={() => onOpen(photo)}>
      <img
        src={resolveSrc(photo.src)}
        alt={t(photo.title)}
        width={photo.width}
        height={photo.height}
        loading="lazy"
      />
      <span className="photo-card__caption">
        <span>{t(photo.title)}</span>
        <small>{t(photo.category)}</small>
      </span>
    </button>
  )
}
