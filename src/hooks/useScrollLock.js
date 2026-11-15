import { useEffect } from 'react'

// Locks page scroll while `locked` is true, compensating for the scrollbar
// so the layout does not jump sideways. Nested locks are reference-counted.
let locks = 0
export function useScrollLock(locked = true) {
  useEffect(() => {
    if (!locked) return
    const { body, documentElement } = document
    if (locks++ === 0) {
      const gap = window.innerWidth - documentElement.clientWidth
      body.style.overflow = 'hidden'
      if (gap > 0) body.style.paddingRight = `${gap}px`
    }
    return () => {
      if (--locks === 0) {
        body.style.overflow = ''
        body.style.paddingRight = ''
      }
    }
  }, [locked])
}
