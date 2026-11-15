import LogoMark from './LogoMark.jsx'
import { site } from '../content/site.js'

// Mark + wordmark. The wordmark is real text (brand from site.js),
// so it uses the site font and is readable by screen readers.
export default function Logo({ className = '', compact = false }) {
  return (
    <span className={`logo ${compact ? 'logo--compact' : ''} ${className}`} role="img" aria-label={site.brand}>
      <LogoMark className="logo__mark" />
      <span className="logo__type" aria-hidden="true">
        <span className="logo__word">
          <span className="logo__primary">{site.brandWords[0]}</span>
          <span className="logo__secondary"><i>{site.brandWords[1]}</i> {site.brandWords[2]}</span>
        </span>
        <span className="logo__acronym">
          {[...site.acronym].map((letter, index) => <span key={index}>{letter}</span>)}
        </span>
      </span>
    </span>
  )
}
