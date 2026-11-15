import { usePreferences } from '../context/Preferences.jsx'
import { useEffect, useRef } from 'react'
import { resolveSrc } from '../content/resolveSrc.js'
import { useScrollLock } from '../hooks/useScrollLock.js'

export default function Lightbox({ photos, index, onChange, onClose }) {
  const { t } = usePreferences()
  const photo = photos[index]
  const touch = useRef(null)
  const closeButton = useRef(null)
  const prev = () => onChange((index - 1 + photos.length) % photos.length)
  const next = () => onChange((index + 1) % photos.length)
  // Keep the latest handlers without re-subscribing on every render.
  const actions = useRef({ prev, next, onClose })
  actions.current = { prev, next, onClose }

  useScrollLock()

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') actions.current.onClose()
      if (e.key === 'ArrowLeft') actions.current.prev()
      if (e.key === 'ArrowRight') actions.current.next()
    }
    document.addEventListener('keydown', onKey)
    closeButton.current?.focus({ preventScroll: true })
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Warm the neighbours so arrowing through feels instant.
  useEffect(() => {
    for (const offset of [-1, 1]) {
      const image = new Image()
      image.src = resolveSrc(photos[(index + offset + photos.length) % photos.length].src)
    }
  }, [index, photos])

  return (
    <div className="lightbox" role="dialog" aria-modal="true" onClick={onClose}
      onTouchStart={(e) => { if (e.touches.length === 1) touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY } }}
      onTouchEnd={(e) => {
        const start = touch.current
        touch.current = null
        if (!start || !e.changedTouches.length) return
        const dx = e.changedTouches[0].clientX - start.x
        const dy = e.changedTouches[0].clientY - start.y
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) { e.preventDefault(); dx < 0 ? next() : prev() }
        else if (dy > 90 && dy > Math.abs(dx)) { e.preventDefault(); onClose() }
      }}>
      <button ref={closeButton} className="lightbox__close" aria-label={t('Close')} onClick={onClose}>×</button>
      <button className="lightbox__nav lightbox__nav--prev" aria-label={t('Previous')}
        onClick={(e) => { e.stopPropagation(); prev() }}>‹</button>
      <figure onClick={(e) => e.stopPropagation()}>
        <img key={photo.src} className="lightbox__img" src={resolveSrc(photo.src)} alt={t(photo.title)} decoding="async" />
        <figcaption>
          {t(photo.title)} <span>· {t(photo.category)}</span>
          <span className="lightbox__count">{index + 1} / {photos.length}</span>
        </figcaption>
      </figure>
      <button className="lightbox__nav lightbox__nav--next" aria-label={t('Next')}
        onClick={(e) => { e.stopPropagation(); next() }}>›</button>
    </div>
  )
}
