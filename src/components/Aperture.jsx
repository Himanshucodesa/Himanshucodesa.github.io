import { useImperativeHandle, useRef } from 'react'

// A camera-iris overlay drawn as N overlapping blades.
// Control it imperatively for smooth 60fps updates without React re-renders:
//   const ap = useRef(); <Aperture ref={ap} />; ap.current.setOpen(0..1)
// 0 = fully closed, 1 = fully open (blades pushed off-screen).

const FAR = 3000 // how far each blade extends outward
const TWIST = 40 // degrees the iris rotates while closing

// Blade i, in its own rotated frame: inner edge on y = r (one side of the
// N-gon hole), spreading outward. Its trailing edge leans out further than the
// N-gon wedge needs, so neighbouring blades overlap like a real iris.
function bladePath(r, t) {
  const x0 = -r * t
  return `M ${x0} ${r} L ${FAR} ${r} L ${FAR} ${FAR} L ${-FAR * t * 1.6} ${FAR} Z`
}

export default function Aperture({ ref, blades = 8 }) {
  const svgRef = useRef(null)
  const groupRefs = useRef([])
  const pathRefs = useRef([])
  const t = Math.tan(Math.PI / blades)

  useImperativeHandle(ref, () => ({
    setOpen(open) {
      const o = Math.min(1, Math.max(0, open))
      // Fully open = the hole just clears the visible corners. With
      // "slice" scaling, the long side of the screen spans 1000 units.
      const box = svgRef.current?.getBoundingClientRect()
      const aspect = box && box.height ? box.width / box.height : 1
      const halfW = 500 * Math.min(1, aspect)
      const halfH = 500 * Math.min(1, 1 / aspect)
      const maxR = Math.hypot(halfW, halfH) + 20
      const d = bladePath(o * maxR, t)
      const twist = (1 - o) * TWIST
      for (let i = 0; i < blades; i++) {
        groupRefs.current[i]?.setAttribute('transform', `rotate(${(i * 360) / blades + twist})`)
        pathRefs.current[i]?.setAttribute('d', d)
      }
    },
  }))

  return (
    <svg
      ref={svgRef}
      className="aperture"
      viewBox="-500 -500 1000 1000"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="blade-shade" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="1200">
          <stop offset="0" stopColor="var(--blade-light)" />
          <stop offset="0.5" stopColor="var(--blade)" />
        </linearGradient>
      </defs>
      {Array.from({ length: blades }, (_, i) => (
        <g key={i} ref={(el) => (groupRefs.current[i] = el)}>
          <path
            ref={(el) => (pathRefs.current[i] = el)}
            className="aperture__blade"
            d={bladePath(0, t)}
          />
        </g>
      ))}
    </svg>
  )
}
