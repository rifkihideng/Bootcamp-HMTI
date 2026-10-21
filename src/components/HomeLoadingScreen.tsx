import { useEffect, useState } from 'react'
import CinematicLayers, { type CinematicConfig } from './CinematicLayers'

export interface HomeLoadingScreenProps {
  /** Label kecil di atas judul. */
  eyebrow?: string
  /** Judul yang diketik dengan efek typewriter. */
  title?: string
  /** Kecepatan mengetik (ms per karakter). */
  typingSpeed?: number
  /** Jeda setelah selesai mengetik sebelum otomatis ditutup (ms). */
  holdTime?: number
  /** Tampilkan petunjuk "Klik di mana saja untuk lewati". */
  showHint?: boolean
  /** Teks indikator loading. */
  spinnerText?: string
  /** Izinkan klik untuk melewati layar loading. */
  skipOnClick?: boolean
  /** Konfigurasi efek sinematik (background, zoom, letterbox, grain, vignette). */
  cinematic?: CinematicConfig
  /** Dipanggil saat loading selesai otomatis atau diklik. */
  onDone?: () => void
}

function useTypewriter(text: string, speed: number) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)

    if (!text) {
      setDone(true)
      return
    }

    let index = 0
    const interval = window.setInterval(() => {
      index += 1
      setDisplayed(text.slice(0, index))
      if (index >= text.length) {
        window.clearInterval(interval)
        setDone(true)
      }
    }, speed)

    return () => window.clearInterval(interval)
  }, [text, speed])

  return { displayed, done }
}

export default function HomeLoadingScreen({
  eyebrow = 'HMTI BOOTCAMP 2026',
  title = 'Welcome to the bootcamp',
  typingSpeed = 90,
  holdTime = 700,
  showHint = true,
  spinnerText = 'Sedang memuat...',
  skipOnClick = true,
  cinematic,
  onDone,
}: HomeLoadingScreenProps) {
  const { displayed, done } = useTypewriter(title, typingSpeed)
  const clickable = skipOnClick && Boolean(onDone)

  useEffect(() => {
    if (!done || !onDone) return
    const timeout = window.setTimeout(onDone, holdTime)
    return () => window.clearTimeout(timeout)
  }, [done, holdTime, onDone])

  return (
    <button
      type="button"
      onClick={clickable ? () => onDone?.() : undefined}
      aria-label="Lewati layar loading"
      className={`fixed inset-0 z-[60] flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center text-white ${
        clickable ? 'cursor-pointer' : 'cursor-default'
      }`}
    >
      <CinematicLayers config={cinematic}>
        {eyebrow && (
          <span className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-accent-400">
            {eyebrow}
          </span>
        )}

        <h1 className="min-h-16 max-w-3xl text-balance text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          {Array.from(displayed).map((char, index) =>
            char === ' ' ? (
              <span key={index}> </span>
            ) : (
              <span key={index} className="inline-block animate-[char-in_0.35s_ease-out_both]">
                {char}
              </span>
            ),
          )}
          <span
            className="ml-1 inline-block h-8 w-1 animate-[caret-blink_0.8s_step-end_infinite] rounded bg-accent-400 align-middle sm:h-10"
            aria-hidden="true"
          />
        </h1>

        <div className="mt-8 flex items-center gap-3 text-sm text-slate-300">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-accent-400" />
          <span>{spinnerText}</span>
        </div>

        {showHint && clickable && (
          <span className="mt-12 text-xs text-slate-500">Klik di mana saja untuk lewati</span>
        )}
      </CinematicLayers>
    </button>
  )
}
