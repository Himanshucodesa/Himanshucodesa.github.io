import LogoMark from './LogoMark.jsx'
import { site } from '../content/site.js'

// Mark + wordmark. The wordmark is real text (brand from site.js),
// so it uses the site font and is readable by screen readers.
export default function Logo({ className = '' }) {
  return (
    <span className={`logo ${className}`}>
      <LogoMark className="logo__mark" />
      <span className="logo__word" aria-label={site.brand}>
        <span className="logo__primary" aria-hidden="true">{site.brandWords[0]}</span>
        <span className="logo__secondary" aria-hidden="true"><i>{site.brandWords[1]}</i> {site.brandWords[2]}</span>
      </span>
    </span>
  )
}
