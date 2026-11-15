import { useCallback, useEffect, useRef, useState } from 'react'
import { usePreferences } from '../context/Preferences.jsx'
import { resolveSrc } from '../content/resolveSrc.js'
import Lightbox from './Lightbox.jsx'

// Two visible faces are recycled on each quarter-turn, so the photo count is unlimited.
export default function PhotoCuboid({ photos, active = true, onLightboxChange }) {
  const { t } = usePreferences()
  const [index, setIndex] = useState(0)
  const [turn, setTurn] = useState(null)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [visible, setVisible] = useState(true)
  const viewport = useRef(null)
  const currentIndex = useRef(0)
  const pending = useRef(null)
  const touch = useRef(null)
  const openButton = useRef(null)

  useEffect(() => {
    const update = () => setVisible(!document.hidden)
    update()
    document.addEventListener('visibilitychange', update)
    return () => document.removeEventListener('visibilitychange', update)
  }, [])

  useEffect(() => {
    if (photos.length < 2) return
    // Warm adjacent faces so a new photo is ready before it starts turning.
    for (const offset of [-1, 1]) {
      const image = new Image()
      image.src = resolveSrc(photos[(index + offset + photos.length) % photos.length].src)
    }
  }, [index, photos])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const element = viewport.current
    if (!element) return
    const resize = () => element.style.setProperty('--cuboid-depth', `${element.clientWidth / 2}px`)
    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const move = useCallback((direction) => {
    if (pending.current || photos.length < 2) return
    const to = (currentIndex.current + direction + photos.length) % photos.length
    if (reducedMotion) {
      currentIndex.current = to
      setIndex(to)
      return
    }
    const next = { from: currentIndex.current, to, direction }
    pending.current = next
    setTurn(next)
  }, [photos.length, reducedMotion])

  const finish = useCallback(() => {
    const next = pending.current
    if (!next) return
    currentIndex.current = next.to
    setIndex(next.to)
    pending.current = null
    setTurn(null)
  }, [])

  useEffect(() => {
    if (!turn) return
    // Also settle if the tab is backgrounded or a transition event is interrupted.
    const timer = setTimeout(finish, reducedMotion ? 0 : 1000)
    return () => clearTimeout(timer)
  }, [turn, finish, reducedMotion])

  useEffect(() => {
    if (!active || !visible || paused || hovered || focused || expanded || reducedMotion || turn || photos.length < 2) return
    const timer = setTimeout(() => move(1), 4500)
    return () => clearTimeout(timer)
  }, [active, visible, paused, hovered, focused, expanded, reducedMotion, turn, photos.length, index, move])

  useEffect(() => {
    onLightboxChange?.(expanded)
    return () => onLightboxChange?.(false)
  }, [expanded, onLightboxChange])

  if (!photos.length) return null
  const photo = photos[index]
  const faces = turn ? [photos[turn.from], photos[turn.to]] : [photo]
  return (
    <div className="photo-cuboid" role="region" aria-roledescription={t('Photo carousel')} aria-label={t('Selected work')}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false) }}
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
      <div className="photo-cuboid__viewport" ref={viewport}>
        <div className={`photo-cuboid__rotor ${turn ? 'is-turning' : ''}`} style={{ '--turn-direction': turn?.direction ?? 1 }}
          onAnimationEnd={(event) => { if (event.target === event.currentTarget) finish() }}>
          {faces.map((face, side) => (
            <div key={side} className={`photo-cuboid__face ${side ? 'photo-cuboid__face--incoming' : ''}`} aria-hidden="true">
              <img src={resolveSrc(face.src)} alt="" />
            </div>
          ))}
        </div>
        <button ref={openButton} className="photo-cuboid__open" type="button" disabled={!!turn || !active}
          onClick={() => setExpanded(true)} aria-label={`${t('View photograph')}: ${t(photo.title)}`}>
          <span aria-hidden="true">↗</span>
        </button>
      </div>
      <div className="photo-cuboid__caption">
        <div aria-live={paused || focused ? 'polite' : 'off'} aria-atomic="true">
          <span className="eyebrow">{String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')} · {t(photo.category)}</span>
          <h3>{t(photo.title)}</h3>
        </div>
        <div className="photo-cuboid__actions">
          <button type="button" onClick={() => move(-1)} disabled={!!turn || photos.length < 2} aria-label={t('Previous')}>←</button>
          {!reducedMotion && <button type="button" onClick={() => setPaused(value => !value)} aria-label={t(paused ? 'Play slideshow' : 'Pause slideshow')} title={t(paused ? 'Play slideshow' : 'Pause slideshow')}><span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span></button>}
          <button type="button" onClick={() => move(1)} disabled={!!turn || photos.length < 2} aria-label={t('Next')}>→</button>
        </div>
      </div>
      {expanded && <Lightbox photos={photos} index={index} onChange={(next) => { currentIndex.current = next; setIndex(next) }} onClose={() => { setExpanded(false); openButton.current?.focus() }} />}
    </div>
  )
}
