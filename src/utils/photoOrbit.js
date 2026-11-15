export const wrapPhoto = (value, count) => count ? ((value % count) + count) % count : 0

// Screen-facing photographs travel around an oval in depth, rather than box faces.
export function photoOrbit(index, phase, count, width, height) {
  const angle = count > 1 ? (index - phase) * Math.PI * 2 / count : 0
  const depth = (Math.cos(angle) + 1) / 2
  return {
    x: Math.sin(angle) * width * 0.39,
    y: -(1 - depth) * height * 0.2,
    z: -(1 - depth) * Math.min(width * 0.45, 420),
    rotation: -Math.sin(angle) * 22,
    scale: 0.78 + depth * 0.22,
    opacity: 0.2 + Math.pow(depth, 1.8) * 0.8,
    order: Math.round(depth * 1000),
  }
}
