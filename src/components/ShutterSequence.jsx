import { useCallback, useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { Link } from 'react-router-dom'
import { usePreferences } from '../context/Preferences.jsx'
import { site } from '../content/site.js'
import { photoChapters, heroPhoto, photos } from '../content/photos.js'
import Aperture from './Aperture.jsx'
import Hero from './Hero.jsx'
import PhotoGrid from './PhotoGrid.jsx'
import PhotoOrbit from './PhotoOrbit.jsx'
import { shutterFrame } from '../utils/shutterTimeline.js'
import { useShutterSound } from '../hooks/useShutterSound.js'
import { resolveSrc } from '../content/resolveSrc.js'
import SoundIcon from '@icons/SoundIcon.jsx'

const scenes = photoChapters.flatMap((chapter) => [
  { chapter, kind: 'cover' },
  { chapter, kind: 'grid' },
])

// Glide time constant (ms): how quickly the shutter catches up with input.
const GLIDE_MS = 110
// After input stops, a half-closed iris settles on the nearest scene.
const SETTLE_DELAY_MS = 180
// How far into a transition counts as intent to move on.
const COMMIT = 0.15
const lastScene = scenes.length - 1
const clamp = (value) => Math.max(0, Math.min(lastScene, value))

function preloadScene(scene) {
  if (!scene) return
  const sources = scene.kind === 'cover' ? [scene.chapter.cover?.src] : scene.chapter.photos.map((photo) => photo.src)
  for (const src of sources) {
    if (!src) continue
    const image = new Image()
    image.decoding = 'async'
    image.src = resolveSrc(src)
  }
}

export default function ShutterSequence() {
  const { t } = usePreferences()
  const { enabled: soundEnabled, supported: soundSupported, prime, play, toggle: toggleSound } = useShutterSound()
  const [position, setPosition] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const stageRef = useRef(null)
  const apertureRef = useRef(null)
  const frameRef = useRef(0)
  const lastFrame = useRef(0)
  const targetRef = useRef(0)
  const direction = useRef(1)
  const settleTimer = useRef(0)
  const lightboxRef = useRef(false)
  const reducedMotion = useRef(false)
  const pendingPosition = useRef(0)
  const touch = useRef(null)
  const current = shutterFrame(position, scenes.length)
  const { index } = current
  const busy = current.open < 0.98
  const scene = scenes[index]
  lightboxRef.current = lightboxOpen

  // Renders one shutter position. Input never calls this directly; it sets a
  // target and the glide loop below eases toward it, frame by frame.
  const renderAt = useCallback((value) => {
    const next = shutterFrame(value, scenes.length)
    const previous = shutterFrame(pendingPosition.current, scenes.length)
    pendingPosition.current = next.progress
    // Large slider/keyboard jumps also replace the scene behind a closed iris.
    if (previous.index !== next.index) {
      apertureRef.current?.setOpen(0)
      play()
    }
    flushSync(() => setPosition(next.progress))
    apertureRef.current?.setOpen(next.open)
  }, [play])

  const stopGlide = useCallback(() => {
    cancelAnimationFrame(frameRef.current)
    frameRef.current = 0
    lastFrame.current = 0
  }, [])

  const glide = useCallback((now) => {
    const from = pendingPosition.current
    const to = targetRef.current
    if (lightboxRef.current) {
      targetRef.current = from
      stopGlide()
      return
    }
    const elapsed = lastFrame.current ? Math.min(64, now - lastFrame.current) : 16
    lastFrame.current = now
    const diff = to - from
    if (reducedMotion.current || Math.abs(diff) < 0.0008) {
      stopGlide()
      renderAt(to)
      return
    }
    renderAt(from + diff * (1 - Math.exp(-elapsed / GLIDE_MS)))
    frameRef.current = requestAnimationFrame(glide)
  }, [renderAt, stopGlide])

  const glideTo = useCallback((value) => {
    if (lightboxRef.current) return
    targetRef.current = clamp(value)
    if (!frameRef.current) frameRef.current = requestAnimationFrame(glide)
  }, [glide])

  // Never leave the iris half-closed: once input pauses, finish the movement
  // the visitor started, or fall back to the scene they were on.
  const scheduleSettle = useCallback(() => {
    clearTimeout(settleTimer.current)
    settleTimer.current = setTimeout(() => {
      const target = targetRef.current
      if (shutterFrame(target, scenes.length).open >= 1) return
      const base = Math.floor(target)
      const fraction = target - base
      const forward = direction.current > 0 ? fraction > COMMIT : fraction > 1 - COMMIT
      glideTo(forward ? base + 1 : base)
    }, SETTLE_DELAY_MS)
  }, [glideTo])

  const scrubBy = useCallback((delta) => {
    if (!delta) return
    direction.current = Math.sign(delta)
    glideTo(targetRef.current + delta)
    scheduleSettle()
  }, [glideTo, scheduleSettle])

  // Buttons and keys move exactly one scene, with the full shutter animation.
  const stepScene = useCallback((step) => {
    clearTimeout(settleTimer.current)
    direction.current = step
    const target = targetRef.current
    glideTo(step > 0 ? Math.floor(target + 0.001) + 1 : Math.ceil(target - 0.001) - 1)
  }, [glideTo])

  // The slider is direct manipulation: follow the thumb without easing.
  const scrubTo = useCallback((value) => {
    if (lightboxRef.current) return
    stopGlide()
    direction.current = Math.sign(value - targetRef.current) || direction.current
    targetRef.current = clamp(value)
    renderAt(targetRef.current)
  }, [renderAt, stopGlide])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => { reducedMotion.current = media.matches }
    update()
    media.addEventListener('change', update)
    const resize = () => apertureRef.current?.setOpen(shutterFrame(pendingPosition.current, scenes.length).open)
    resize()
    window.addEventListener('resize', resize)
    return () => {
      stopGlide()
      clearTimeout(settleTimer.current)
      media.removeEventListener('change', update)
      window.removeEventListener('resize', resize)
    }
  }, [stopGlide])

  // Warm the neighbouring scenes so a photo is ready before the iris reopens.
  useEffect(() => {
    preloadScene(scenes[index + 1])
    preloadScene(scenes[index - 1])
  }, [index])


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
        if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(event.key)) { event.preventDefault(); stepScene(event.shiftKey ? -1 : 1) }
        if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(event.key)) { event.preventDefault(); stepScene(-1) }
        if (event.key === 'Home') { event.preventDefault(); glideTo(0) }
        if (event.key === 'End') { event.preventDefault(); glideTo(lastScene) }
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
        scheduleSettle()
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
              <span className="eyebrow">{index === 1 ? t('Selected work') : `${chapterNumber} / ${String(photoChapters.length).padStart(2, '0')} · ${t(scene.chapter.category)}`}</span>
              <h2>{t(scene.chapter.heading)}</h2>
            </div>
            {index === 1 ? <PhotoOrbit photos={photos} active={!busy} onLightboxChange={setLightboxOpen} /> :
              <PhotoGrid key={scene.chapter.category} photos={scene.chapter.photos} onLightboxChange={setLightboxOpen} />}
          </div>
        )}
      </div>
      <Aperture ref={apertureRef} />
      <div className="shutter-sequence__controls">
        <input className="shutter-sequence__scrubber" type="range" min="0" max={scenes.length - 1} step="0.001"
          value={position} onChange={(event) => scrubTo(Number(event.target.value))} disabled={lightboxOpen}
          onPointerUp={scheduleSettle} onTouchEnd={scheduleSettle}
          onKeyDown={(event) => {
            const steps = { ArrowRight: 1, ArrowUp: 1, PageUp: 1, ArrowLeft: -1, ArrowDown: -1, PageDown: -1 }
            if (steps[event.key]) { event.preventDefault(); stepScene(steps[event.key]) }
            if (event.key === 'Home') { event.preventDefault(); glideTo(0) }
            if (event.key === 'End') { event.preventDefault(); glideTo(lastScene) }
          }}
          aria-label={t('Shutter control')}
          aria-valuetext={`${t(scene.chapter.category)} · ${t(scene.kind === 'cover' ? 'Featured' : 'Gallery')} · ${Math.round(current.open * 100)}%`}
        />
        <button type="button" onClick={() => stepScene(-1)} disabled={position <= 0 || lightboxOpen} aria-label={t('Previous')}>←</button>
        <span className="shutter-sequence__status" role="status" aria-live="polite" aria-atomic="true">
          {chapterNumber} / {String(photoChapters.length).padStart(2, '0')} · {t(scene.chapter.category)} · {t(scene.kind === 'cover' ? 'Featured' : 'Gallery')}
        </span>
        <button type="button" className="shutter-sequence__sound" onClick={toggleSound}
          disabled={!soundSupported} aria-pressed={soundEnabled} aria-label={t('Shutter sound')}
          title={t(soundEnabled ? 'Mute shutter sound' : 'Enable shutter sound')}>
          <SoundIcon muted={!soundEnabled} />
        </button>
        {position === lastScene ? <Link to="/gallery" className="shutter-sequence__all">{t('Gallery')} ↗</Link> :
          <button type="button" onClick={() => stepScene(1)} disabled={position >= lastScene || lightboxOpen} aria-label={t('Next')}>→</button>}
      </div>
    </section>
  )
}
