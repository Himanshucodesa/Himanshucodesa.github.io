import { resolveSrc } from '../content/resolveSrc.js'

export default function PhotoCard({ photo, onOpen }) {
  return (
    <button className="photo-card" onClick={() => onOpen(photo)}>
      <img
        src={resolveSrc(photo.src)}
        alt={photo.title}
        width={photo.width}
        height={photo.height}
        loading="lazy"
      />
      <span className="photo-card__caption">
        <span>{photo.title}</span>
        <small>{photo.category}</small>
      </span>
    </button>
  )
}
