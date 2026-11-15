import { usePreferences } from '../context/Preferences.jsx'
export default function CategoryFilter({ categories, active, onChange }) {
  const { t } = usePreferences()
  const all = ['All', ...categories]
  return (
    <div className="filter" role="tablist">
      {all.map((c) => (
        <button
          key={t(c)}
          role="tab"
          aria-selected={active === c}
          className={`filter__btn ${active === c ? 'is-active' : ''}`}
          onClick={() => onChange(c)}
        >
          {t(c)}
        </button>
      ))}
    </div>
  )
}
