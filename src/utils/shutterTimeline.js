// Whole numbers are fully open scenes; each midpoint is fully closed.
// The scene changes only at that midpoint, in either direction.
export function shutterFrame(position, sceneCount) {
  const progress = Math.max(0, Math.min(sceneCount - 1, position))
  const fraction = progress - Math.floor(progress)
  return {
    progress,
    index: Math.min(sceneCount - 1, Math.floor(progress + 0.5)),
    // A small fully-open interval lets people stop and interact with each grid
    // without having to land on an exact pixel of scroll distance.
    open: Math.min(1, Math.abs(fraction - 0.5) / 0.4),
  }
}
