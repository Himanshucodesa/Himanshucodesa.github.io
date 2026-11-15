export default function CategoryFilter({ categories, active, onChange }) {
  const all = ['All', ...categories]
  return (
    <div className="filter" role="tablist">
      {all.map((c) => (
        <button
          key={c}
          role="tab"
          aria-selected={active === c}
          className={`filter__btn ${active === c ? 'is-active' : ''}`}
          onClick={() => onChange(c)}
        >
          {c}
        </button>
      ))}
    </div>
  )
}
