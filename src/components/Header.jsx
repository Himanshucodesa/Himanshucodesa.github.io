import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { site } from '../content/site.js'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="header">
      <Link to="/" className="brand" onClick={() => setOpen(false)}>
        {site.brand}
      </Link>
      <button
        className="menu-toggle"
        aria-expanded={open}
        aria-label="Toggle menu"
        onClick={() => setOpen((o) => !o)}
      >
        <span /><span />
      </button>
      <nav className={`nav ${open ? 'nav--open' : ''}`}>
        {site.nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
