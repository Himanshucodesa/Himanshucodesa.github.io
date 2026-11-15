import { site } from '../content/site.js'

export default function Footer() {
  return (
    <footer className="footer">
      <span>© {new Date().getFullYear()} <a href={site.url}>{site.brand}</a></span>
      {site.socials.length > 0 && <div className="footer__links">
        {site.socials.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
            {s.label}
          </a>
        ))}
      </div>}
    </footer>
  )
}
