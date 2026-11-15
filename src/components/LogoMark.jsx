// The Frame mark: a six-blade aperture inside viewfinder corner brackets.
// Uses currentColor for the lines and --accent for the brackets, so it
// follows the surrounding text colour. Size it with CSS (width/height).
export default function LogoMark({ className, title }) {
  return (
    <svg
      className={className}
      viewBox="-20 -20 40 40"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      <path d="M-19 -12V-19H-12M12 -19H19V-12M19 12V19H12M-12 19H-19V12" stroke="var(--accent, #d6b98c)" strokeWidth="1.6" />
      <circle r="15" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9.44 11.65L-5.37 3.10M-5.37 14.01L-5.37 -3.10M-14.81 2.35L0 -6.2M-9.44 -11.65L5.37 -3.10M5.37 -14.01L5.37 3.10M14.81 -2.35L0 6.2" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}
