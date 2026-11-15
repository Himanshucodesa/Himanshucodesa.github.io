import { useEffect, useState } from 'react'
import PhotoCard from './PhotoCard.jsx'
import Lightbox from './Lightbox.jsx'

// Masonry grid + built-in lightbox. Pass any array of photos.
export default function PhotoGrid({ photos, onLightboxChange }) {
  const [index, setIndex] = useState(null)
  const isOpen = index !== null
  useEffect(() => {
    onLightboxChange?.(isOpen)
    return () => onLightboxChange?.(false)
  }, [isOpen, onLightboxChange])

  return (
    <>
      <div className="photo-grid">
        {photos.map((p, i) => (
          <PhotoCard key={p.id} photo={p} onOpen={() => setIndex(i)} />
        ))}
      </div>
      {index !== null && (
        <Lightbox
          photos={photos}
          index={index}
          onChange={setIndex}
          onClose={() => setIndex(null)}
        />
      )}
    </>
  )
}
