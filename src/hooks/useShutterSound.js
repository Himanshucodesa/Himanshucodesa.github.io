import { useCallback, useEffect, useRef, useState } from 'react'

// A short, original mechanical click synthesized locally. No audio downloads.
export function useShutterSound() {
  const [enabled, setEnabled] = useState(() => {
    try { return localStorage.getItem('frame-sound') === 'on' } catch { return false }
  })
  const [supported, setSupported] = useState(true)
  const audio = useRef(null)
  const enabledRef = useRef(enabled)
  const lastPlayed = useRef(-Infinity)

  useEffect(() => {
    setSupported(Boolean(window.AudioContext || window.webkitAudioContext))
    return () => {
      const current = audio.current
      audio.current = null
      current?.context.close().catch(() => {})
    }
  }, [])

  const prime = useCallback(() => {
    if (!enabledRef.current) return
    try {
      if (!audio.current) {
        const Audio = window.AudioContext || window.webkitAudioContext
        if (!Audio) return
        const context = new Audio()
        const master = context.createGain()
        master.gain.value = 0.16
        master.connect(context.destination)
        const noise = context.createBuffer(1, Math.ceil(context.sampleRate * 0.12), context.sampleRate)
        const samples = noise.getChannelData(0)
        for (let i = 0; i < samples.length; i++) samples[i] = Math.random() * 2 - 1
        audio.current = { context, master, noise }
      }
      const { context } = audio.current
      if (context.state === 'suspended') context.resume().catch(() => {})
    } catch { /* Silent fallback when audio is unavailable or blocked. */ }
  }, [])

  const play = useCallback(() => {
    const current = audio.current
    if (!enabledRef.current || !current || current.context.state !== 'running') return
    const { context, master, noise } = current
    const now = context.currentTime
    // Reversing rapidly around a closed midpoint should not create a loud rattle.
    if (now - lastPlayed.current < 0.15) return
    lastPlayed.current = now
    try {
      for (const [delay, volume] of [[0, 0.85], [0.045, 0.45]]) {
        const source = context.createBufferSource()
        const filter = context.createBiquadFilter()
        const envelope = context.createGain()
        source.buffer = noise
        filter.type = 'bandpass'
        filter.frequency.value = 1700
        filter.Q.value = 0.7
        envelope.gain.setValueAtTime(0.0001, now + delay)
        envelope.gain.exponentialRampToValueAtTime(volume, now + delay + 0.002)
        envelope.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.065)
        source.connect(filter).connect(envelope).connect(master)
        source.onended = () => { source.disconnect(); filter.disconnect(); envelope.disconnect() }
        source.start(now + delay)
        source.stop(now + delay + 0.075)
      }
      const body = context.createOscillator()
      const envelope = context.createGain()
      body.type = 'triangle'
      body.frequency.setValueAtTime(280, now)
      body.frequency.exponentialRampToValueAtTime(85, now + 0.045)
      envelope.gain.setValueAtTime(0.3, now)
      envelope.gain.exponentialRampToValueAtTime(0.0001, now + 0.055)
      body.connect(envelope).connect(master)
      body.onended = () => { body.disconnect(); envelope.disconnect() }
      body.start(now)
      body.stop(now + 0.06)
    } catch { /* Audio must never interrupt the shutter controls. */ }
  }, [])

  const toggle = useCallback(() => {
    const next = !enabledRef.current
    enabledRef.current = next
    setEnabled(next)
    try { localStorage.setItem('frame-sound', next ? 'on' : 'off') } catch { /* Optional persistence. */ }
    if (next) {
      if (audio.current) audio.current.master.gain.value = 0.16
      prime()
    } else if (audio.current) {
      audio.current.master.gain.setValueAtTime(0, audio.current.context.currentTime)
    }
  }, [prime])

  return { enabled, supported, prime, play, toggle }
}
