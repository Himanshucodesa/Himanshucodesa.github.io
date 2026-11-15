import { useCallback, useEffect, useRef, useState } from 'react'
import { usePreferences } from '../context/Preferences.jsx'
import { resolveSrc } from '../content/resolveSrc.js'
import { photoOrbit, wrapPhoto } from '../utils/photoOrbit.js'
import Lightbox from './Lightbox.jsx'

// All photos share one continuous playhead: wrapping it never resets their positions.
export default function PhotoOrbit({ photos, active = true, onLightboxChange }) {
  const { t } = usePreferences()
  const [index, setIndex] = useState(0)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [visible, setVisible] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)
  const viewport = useRef(null)
  const cards = useRef([])
  const phase = useRef(0)
  const front = useRef(0)
  const manual = useRef(null)
  const touch = useRef(null)
  const returnFocus = useRef(null)
  const size = useRef({ width: 0, height: 0 })

  const paint = useCallback(() => {
    const { width, height } = size.current
    photos.forEach((photo, i) => {
      const card = cards.current[i]
      if (!card) return
      const frame = photoOrbit(i, phase.current, photos.length, width, height)
      card.style.transform = `translate(-50%, -50%) translate3d(${frame.x}px, ${frame.y}px, ${frame.z}px) rotateY(${frame.rotation}deg) scale(${frame.scale})`
      card.style.opacity = frame.opacity
      card.style.zIndex = frame.order
    })
    const next = wrapPhoto(Math.round(phase.current), photos.length)
    if (next !== front.current) { front.current = next; setIndex(next) }
  }, [photos])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const motion = () => setReducedMotion(media.matches)
    const visibility = () => setVisible(!document.hidden)
    motion(); visibility()
    media.addEventListener('change', motion)
    document.addEventListener('visibilitychange', visibility)
    return () => {
      media.removeEventListener('change', motion)
      document.removeEventListener('visibilitychange', visibility)
    }
  }, [])

  useEffect(() => {
    const element = viewport.current
    if (!element) return
    const resize = () => {
      size.current = { width: element.clientWidth, height: element.clientHeight }
      const { width, height } = size.current
      // A consistent 4:5 crop that fits both short and narrow viewports.
      const photoWidth = Math.min(width * (width < 600 ? 0.62 : 0.42), 460, height * 0.86 * 4 / 5)
      element.style.setProperty('--orbit-photo-width', `${photoWidth}px`)
      paint()
    }
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(element)
    return () => observer.disconnect()
  }, [paint])

  useEffect(() => {
    if (!active || !visible || expanded || photos.length < 2) return
    let frame
    let last
    const tick = (now) => {
      const elapsed = last === undefined ? 0 : Math.min(now - last, 50)
      last = now
      if (manual.current) {
        const movement = manual.current
        const progress = Math.min(1, (now - movement.start) / 650)
        phase.current = movement.from + (movement.to - movement.from) * (progress * progress * (3 - 2 * progress))
        if (progress === 1) manual.current = null
        paint()
      } else if (!hovered && !focused && !reducedMotion) {
        phase.current = wrapPhoto(phase.current + elapsed / 1800, photos.length)
        paint()
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, visible, expanded, hovered, focused, reducedMotion, photos.length, paint])

  const move = useCallback((direction) => {
    if (photos.length < 2 || !active) return
    const target = Math.round(phase.current) + direction
    if (reducedMotion) { phase.current = wrapPhoto(target, photos.length); paint() }
    else manual.current = { from: phase.current, to: target, start: performance.now() }
  }, [photos.length, active, reducedMotion, paint])

  useEffect(() => {
    onLightboxChange?.(expanded)
    return () => onLightboxChange?.(false)
  }, [expanded, onLightboxChange])

  if (!photos.length) return null
  const photo = photos[index % photos.length]
  return (
    <div className="photo-orbit" role="region" aria-roledescription={t('Photo carousel')} aria-label={t('Selected work')}
      onFocusCapture={(event) => setFocused(event.target.matches(':focus-visible'))}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false) }}
      onKeyDown={(event) => {
        if (expanded) return
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); event.stopPropagation(); move(event.key === 'ArrowRight' ? 1 : -1) }
      }}
      onTouchStart={(event) => {
        event.stopPropagation()
        if (!expanded && event.touches.length === 1) touch.current = event.touches[0].clientX
      }}
      onTouchMove={(event) => event.stopPropagation()}
      onTouchEnd={(event) => {
        event.stopPropagation()
        if (touch.current !== null && event.changedTouches.length) {
          const distance = touch.current - event.changedTouches[0].clientX
          if (Math.abs(distance) > 40) { event.preventDefault(); move(Math.sign(distance)) }
        }
        touch.current = null
      }} onTouchCancel={() => { touch.current = null }}>
      <div className="photo-orbit__stage" ref={viewport}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        {photos.map((item, i) => (
          <button type="button" key={item.id} ref={element => { cards.current[i] = element }}
            className="photo-orbit__card" tabIndex={i === index ? 0 : -1} disabled={!active}
            aria-label={`${t('View photograph')}: ${t(item.title)}`}
            style={{ opacity: i === 0 ? 1 : 0 }}
            onClick={(event) => {
              returnFocus.current = event.currentTarget
              manual.current = null
              phase.current = i
              paint()
              setExpanded(true)
            }}>
            <img src={resolveSrc(item.src)} alt={t(item.title)} decoding="async" loading="eager" draggable="false" style={{ objectPosition: item.objectPosition ?? '50% 50%' }} />
          </button>
        ))}
      </div>
      <div className="photo-orbit__caption">
        <div aria-live={focused ? 'polite' : 'off'} aria-atomic="true">
          <span className="eyebrow">{String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')} · {t(photo.category)}</span>
          <h3>{t(photo.title)}</h3>
        </div>
        <div className="photo-orbit__actions">
          <span className="photo-orbit__hint">{t('Hover to pause')}</span>
          <button type="button" onClick={() => move(-1)} disabled={photos.length < 2} aria-label={t('Previous')}>←</button>
          <button type="button" onClick={() => move(1)} disabled={photos.length < 2} aria-label={t('Next')}>→</button>
        </div>
      </div>
      {expanded && <Lightbox photos={photos} index={index} onChange={(next) => { phase.current = next; paint() }}
        onClose={() => {
          setExpanded(false)
          returnFocus.current?.focus({ preventScroll: true })
        }} />}
    </div>
  )
}
