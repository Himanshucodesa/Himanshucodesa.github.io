import { usePreferences } from '../context/Preferences.jsx'
import { Link } from 'react-router-dom'

export default function NotFound() {
  const { t } = usePreferences()
  return (
    <section className="container section page-top center">
      <h2>{t('Out of frame.')}</h2>
      <p className="muted">{t("That page doesn't exist.")}</p>
      <Link to="/" className="btn">{t('Back home')}</Link>
    </section>
  )
}
