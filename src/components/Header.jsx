import { languages, usePreferences } from '../context/Preferences.jsx'
import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { site } from '../content/site.js'
import Logo from './Logo.jsx'
import { useScrollLock } from '../hooks/useScrollLock.js'
import SunIcon from '@icons/SunIcon.jsx'
import MoonIcon from '@icons/MoonIcon.jsx'

const languageFlags = { en: '🇬🇧', nl: '🇳🇱', de: '🇩🇪', fr: '🇫🇷' }

export default function Header() {
  const { t, theme, setTheme, language, setLanguage } = usePreferences()
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)

  useScrollLock(open)

  useEffect(() => {
    let frame = 0
    let lastY = window.scrollY
    const update = () => {
      frame = 0
      const y = Math.max(0, window.scrollY)
      // Tuck the header away while reading down; bring it back on any scroll up.
      const delta = y - lastY
      if (Math.abs(delta) > 6) {
        setHidden(delta > 0 && y > 160)
        lastY = y
      }
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
    }
  }, [])

  return (
    <header className={`header ${hidden && !open ? 'header--hidden' : ''}`} onFocusCapture={() => setHidden(false)}>
      <Link to="/" className="brand" aria-label={`${site.brand} ${t('home')}`} onClick={() => setOpen(false)}>
        <Logo />
      </Link>
      <button
        className="menu-toggle"
        aria-expanded={open}
        aria-label={t('Toggle menu')} aria-controls="primary-nav"
        onClick={() => setOpen((o) => !o)}
      >
        <span /><span />
      </button>
      <nav id="primary-nav" className={`nav ${open ? 'nav--open' : ''}`}>
        {site.nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}
            onClick={() => setOpen(false)}
          >
            {t(item.label)}
          </NavLink>
        ))}
        <div className="preferences">
          <div className="preference">
            <span>{t('Theme')}</span>
            <div className="theme-switch" role="group" aria-label={t('Theme')}>
              <button type="button" className="theme-switch__button" aria-label={t('Light')} title={t('Light')} aria-pressed={theme === 'light'} onClick={() => setTheme('light')}>
                <SunIcon />
              </button>
              <button type="button" className="theme-switch__button" aria-label={t('Dark')} title={t('Dark')} aria-pressed={theme === 'dark'} onClick={() => setTheme('dark')}>
                <MoonIcon />
              </button>
            </div>
          </div>
          <label className="preference">
            <span>{t('Language')}</span>
            <select className="language-select" value={language} title={languages[language]} onChange={(e) => setLanguage(e.target.value)}>
              {Object.entries(languages).map(([code, label]) => (
                <option key={code} value={code} lang={code} aria-label={label} title={label}>{languageFlags[code]}</option>
              ))}
            </select>
          </label>
        </div>
      </nav>
    </header>
  )
}
