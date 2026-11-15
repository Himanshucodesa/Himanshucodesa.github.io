import { usePreferences } from '../context/Preferences.jsx'
import { useCallback, useEffect, useRef } from 'react'
import Hero from './Hero.jsx'
import Aperture from './Aperture.jsx'
import { useScrollProgress } from '../hooks/useScrollProgress.js'

// Full-screen hero viewed through a camera iris.
// On load the iris opens; scrolling down stops it down (f/1.4 → f/22)
// until it closes, then the page continues.

const F_STOPS = ['1.4', '2', '2.8', '4', '5.6', '8', '11', '16', '22']
const INTRO_MS = 1400
const ease = (t) => 1 - Math.pow(1 - t, 3)

export default function ShutterHero(props) {
  const { t } = usePreferences()
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const readoutRef = useRef(null)
  const apertureRef = useRef(null)
  const state = useRef({ intro: 0, scroll: 0 })

  const render = useCallback(() => {
    const { intro, scroll } = state.current
    // Hold fully open for the first 5% of scroll, then close by the end.
    const closing = Math.min(1, Math.max(0, (scroll - 0.05) / 0.9))
    const open = intro * (1 - closing)
    apertureRef.current?.setOpen(open)

    const stage = stageRef.current
    if (stage) {
      stage.style.setProperty('--zoom', 1 + closing * 0.18)
      stage.style.setProperty('--text-fade', Math.max(0, 1 - scroll * 3))
    }
    if (readoutRef.current) {
      const stop = F_STOPS[Math.round((1 - open) * (F_STOPS.length - 1))]
      readoutRef.current.textContent = `ƒ/${stop}`
    }
  }, [])

  const onScroll = useCallback((p) => {
    state.current.scroll = p
    render()
  }, [render])

  useScrollProgress(sectionRef, onScroll)

  // Intro: iris opens on first load (skipped for reduced motion).
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      state.current.intro = 1
      render()
      return
    }
    let raf
    const start = performance.now()
    const tick = (now) => {
      state.current.intro = ease(Math.min(1, (now - start) / INTRO_MS))
      render()
      if (state.current.intro < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [render])

  return (
    <section className="shutter" ref={sectionRef}>
      <div className="shutter__stage" ref={stageRef}>
        <div className="shutter__scene">
          <Hero {...props} />
        </div>
        <Aperture ref={apertureRef} />
        <span className="shutter__readout" ref={readoutRef} aria-hidden="true">ƒ/22</span>
        <span className="shutter__hint" aria-hidden="true">{t('Scroll')}</span>
      </div>
    </section>
  )
}
