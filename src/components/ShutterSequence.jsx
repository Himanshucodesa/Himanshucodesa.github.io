import { useCallback, useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { Link } from 'react-router-dom'
import { usePreferences } from '../context/Preferences.jsx'
import { site } from '../content/site.js'
import { photoChapters, heroPhoto } from '../content/photos.js'
import Aperture from './Aperture.jsx'
import Hero from './Hero.jsx'
import PhotoGrid from './PhotoGrid.jsx'
import { shutterFrame } from '../utils/shutterTimeline.js'
import { useShutterSound } from '../hooks/useShutterSound.js'
import SoundIcon from '@icons/SoundIcon.jsx'

const scenes = photoChapters.flatMap((chapter) => [
  { chapter, kind: 'cover' },
  { chapter, kind: 'grid' },
])

export default function ShutterSequence({ onStepChange }) {
  const { t } = usePreferences()
  const { enabled: soundEnabled, supported: soundSupported, prime, play, toggle: toggleSound } = useShutterSound()
  const [position, setPosition] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const stageRef = useRef(null)
  const apertureRef = useRef(null)
  const frameRef = useRef(0)
  const positionRef = useRef(0)
  const pendingPosition = useRef(0)
  const touch = useRef(null)
  const current = shutterFrame(position, scenes.length)
  const { index } = current
  const busy = current.open < 0.98
  const scene = scenes[index]

  // Scroll distance is the playhead. There is no timer or automatic completion.
  const scrubTo = useCallback((value) => {
    if (lightboxOpen) return
    const next = shutterFrame(value, scenes.length)
    positionRef.current = next.progress
    const previous = shutterFrame(pendingPosition.current, scenes.length)
    pendingPosition.current = next.progress
    // Large slider/keyboard jumps also replace the scene behind a closed iris.
    if (previous.index !== next.index) {
      apertureRef.current?.setOpen(0)
      play()
    }
    flushSync(() => setPosition(next.progress))
    apertureRef.current?.setOpen(next.open)
  }, [lightboxOpen, play])

  const scrubBy = useCallback((delta) => {
    positionRef.current = shutterFrame(positionRef.current + delta, scenes.length).progress
    if (frameRef.current) return
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = 0
      scrubTo(positionRef.current)
    })
  }, [scrubTo])

  useEffect(() => {
    const resize = () => apertureRef.current?.setOpen(shutterFrame(pendingPosition.current, scenes.length).open)
    resize()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  useEffect(() => { onStepChange?.(position > 0.02 ? index + 1 : 0) }, [index, position, onStepChange])

  useEffect(() => {
    const stage = stageRef.current
    const wheel = (event) => {
      if (event.ctrlKey || lightboxOpen) return
      event.preventDefault()
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY
      const pixels = delta * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? stage.clientHeight : 1)
      // A full close/reopen takes roughly one viewport of scrolling.
      // Bound each event so a coarse mouse wheel cannot skip a whole scene.
      scrubBy(Math.max(-0.12, Math.min(0.12, pixels / Math.max(600, stage.clientHeight))))
    }
    stage.addEventListener('wheel', wheel, { passive: false })
    return () => stage.removeEventListener('wheel', wheel)
  }, [scrubBy, lightboxOpen])

  const chapterNumber = String(Math.floor(index / 2) + 1).padStart(2, '0')
  return (
    <section className="shutter-sequence" ref={stageRef} tabIndex={0} aria-label={t('Selected work')}
      onPointerDownCapture={prime} onKeyDownCapture={prime} onTouchStartCapture={prime}
      onKeyDown={(event) => {
        if (lightboxOpen || event.target !== event.currentTarget) return
        if (['ArrowRight', 'ArrowDown', 'PageDown'].includes(event.key)) { event.preventDefault(); scrubBy(0.1) }
        if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(event.key)) { event.preventDefault(); scrubBy(-0.1) }
      }}
      onTouchStart={(event) => {
        if (lightboxOpen || event.touches.length !== 1 || event.target.closest('a, select, .shutter-sequence__controls')) return
        touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY, moved: false }
      }}
      onTouchMove={(event) => {
        const previous = touch.current
        if (!previous || event.touches.length !== 1) { touch.current = null; return }
        const { clientX: x, clientY: y } = event.touches[0]
        const dx = previous.x - x
        const dy = previous.y - y
        if (!previous.moved && Math.hypot(dx, dy) < 6) return
        touch.current = { x, y, moved: true }
        scrubBy((Math.abs(dx) > Math.abs(dy) ? dx : dy) / Math.max(320, stageRef.current.clientHeight * 0.7))
      }}
      onTouchEnd={(event) => {
        if (touch.current?.moved) event.preventDefault()
        touch.current = null
      }} onTouchCancel={() => { touch.current = null }}>
      <h1 className="sr-only">{site.brand}</h1>
      <div className="shutter-sequence__scene" inert={busy}>
        {scene.kind === 'cover' ? (
          <Hero image={index === 0 ? heroPhoto : scene.chapter.cover} headingLevel="h2"
            title={index === 0 ? (
              <span className="hero__wordmark" aria-label={site.brand}>
                <span aria-hidden="true">{site.brandWords[0]}</span>
                <span className="hero__wordmark-bottom" aria-hidden="true"><i>{site.brandWords[1]}</i> {site.brandWords[2]}</span>
              </span>
            ) : t(scene.chapter.category)}
            subtitle={t(index === 0 ? site.tagline : scene.chapter.heading)} />
        ) : (
          <div className="shutter-sequence__collection" style={{ '--photo-count': scene.chapter.photos.length }}>
            <div className="shutter-sequence__heading">
              <span className="eyebrow">{chapterNumber} / {String(photoChapters.length).padStart(2, '0')} · {t(scene.chapter.category)}</span>
              <h2>{t(scene.chapter.heading)}</h2>
            </div>
            <PhotoGrid key={scene.chapter.category} photos={scene.chapter.photos} onLightboxChange={setLightboxOpen} />
          </div>
        )}
      </div>
      <Aperture ref={apertureRef} />
      <div className="shutter-sequence__controls">
        <input className="shutter-sequence__scrubber" type="range" min="0" max={scenes.length - 1} step="0.001"
          value={position} onChange={(event) => scrubTo(Number(event.target.value))} disabled={lightboxOpen}
          onKeyDown={(event) => {
            const steps = { ArrowRight: 0.1, ArrowUp: 0.1, ArrowLeft: -0.1, ArrowDown: -0.1, PageUp: 0.25, PageDown: -0.25 }
            if (steps[event.key]) { event.preventDefault(); scrubBy(steps[event.key]) }
          }}
          aria-label={t('Shutter control')}
          aria-valuetext={`${t(scene.chapter.category)} · ${t(scene.kind === 'cover' ? 'Featured' : 'Gallery')} · ${Math.round(current.open * 100)}%`}
        />
        <button type="button" onClick={() => scrubBy(-0.1)} disabled={position <= 0 || lightboxOpen} aria-label={t('Previous')}>←</button>
        <span className="shutter-sequence__status" role="status" aria-live="polite" aria-atomic="true">
          {chapterNumber} / {String(photoChapters.length).padStart(2, '0')} · {t(scene.chapter.category)} · {t(scene.kind === 'cover' ? 'Featured' : 'Gallery')}
        </span>
        <button type="button" className="shutter-sequence__sound" onClick={toggleSound}
          disabled={!soundSupported} aria-pressed={soundEnabled} aria-label={t('Shutter sound')}
          title={t(soundEnabled ? 'Mute shutter sound' : 'Enable shutter sound')}>
          <SoundIcon muted={!soundEnabled} />
        </button>
        {position === scenes.length - 1 ? <Link to="/gallery" className="shutter-sequence__all">{t('Gallery')} ↗</Link> :
          <button type="button" onClick={() => scrubBy(0.1)} disabled={position >= scenes.length - 1 || lightboxOpen} aria-label={t('Next')}>→</button>}
      </div>
    </section>
  )
}
