import { useEffect, useRef, useState } from 'react'
import { usePreferences } from '../context/Preferences.jsx'
import { resolveSrc } from '../content/resolveSrc.js'

export default function PhotoCard({ photo, onOpen }) {
  const { t } = usePreferences()
  const ref = useRef(null)
  const imgRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Cached images can finish before React attaches onLoad.
    if (imgRef.current?.complete) setLoaded(true)
    const element = ref.current
    if (!element || !('IntersectionObserver' in window)) { setVisible(true); return }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
    }, { rootMargin: '0px 0px -8% 0px' })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <button ref={ref} className={`photo-card ${visible ? 'is-visible' : ''} ${loaded ? 'is-loaded' : ''}`} onClick={() => onOpen(photo)}>
      <img
        ref={imgRef}
        src={resolveSrc(photo.src)}
        alt={t(photo.title)}
        width={photo.width}
        height={photo.height}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
      <span className="photo-card__caption">
        <span>{t(photo.title)}</span>
        <small>{t(photo.category)}</small>
      </span>
    </button>
  )
}
