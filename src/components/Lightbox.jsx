import { useEffect } from 'react'
import { resolveSrc } from '../content/resolveSrc.js'

export default function Lightbox({ photos, index, onChange, onClose }) {
  const photo = photos[index]
  const prev = () => onChange((index - 1 + photos.length) % photos.length)
  const next = () => onChange((index + 1) % photos.length)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  })

  return (
    <div className="lightbox" role="dialog" aria-modal="true" onClick={onClose}>
      <button className="lightbox__close" aria-label="Close" onClick={onClose}>×</button>
      <button className="lightbox__nav lightbox__nav--prev" aria-label="Previous"
        onClick={(e) => { e.stopPropagation(); prev() }}>‹</button>
      <figure onClick={(e) => e.stopPropagation()}>
        <img src={resolveSrc(photo.src)} alt={photo.title} />
        <figcaption>
          {photo.title} <span>· {photo.category}</span>
          <span className="lightbox__count">{index + 1} / {photos.length}</span>
        </figcaption>
      </figure>
      <button className="lightbox__nav lightbox__nav--next" aria-label="Next"
        onClick={(e) => { e.stopPropagation(); next() }}>›</button>
    </div>
  )
}
