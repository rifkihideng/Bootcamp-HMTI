import { useEffect } from 'react'
import GlassmorphismCta from './ui/glassmorphism-cta'
import CinematicLayers, { type CinematicConfig } from './CinematicLayers'

export interface PillLoadingScreenProps {
  /** Teks utama pada pill glassmorphism. */
  label?: string
  /** Teks kecil di bawah pill. */
  subtitle?: string
  /** Logo di dalam pill. */
  avatarSrc?: string
  /** Alt text untuk logo. */
  avatarAlt?: string
  /** Warna shimmer yang berputar (format CSS color). */
  shimmerColor?: string
  /** Lebar kilau shimmer, misal '90deg'. */
  spread?: string
  /** Kecepatan rotasi shimmer, misal '4s'. */
  speed?: string
  /** Kelas shadow/glow tambahan pada pill. */
  glowClass?: string
  /** Durasi sebelum otomatis lanjut (ms). */
  durationMs?: number
  /** Izinkan klik untuk melewati layar loading. */
  skipOnClick?: boolean
  /** Konfigurasi efek sinematik (background, zoom, letterbox, grain, vignette). */
  cinematic?: CinematicConfig
  /** Dipanggil saat diklik atau durasi habis. */
  onDone?: () => void
}

export default function PillLoadingScreen({
  label = 'Menyiapkan halaman utama...',
  subtitle = 'HMTI Bootcamp 2026',
  avatarSrc = '/logo-192.png',
  avatarAlt = 'Logo HMTI',
  shimmerColor = 'rgba(123,179,207,0.85)',
  spread = '90deg',
  speed = '4s',
  glowClass = 'shadow-[0_8px_40px_rgba(37,150,190,0.25)]',
  durationMs = 1200,
  skipOnClick = true,
  cinematic,
  onDone,
}: PillLoadingScreenProps) {
  const clickable = skipOnClick && Boolean(onDone)

  useEffect(() => {
    if (!onDone) return
    const timeout = window.setTimeout(onDone, durationMs)
    return () => window.clearTimeout(timeout)
  }, [durationMs, onDone])

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
        <GlassmorphismCta
          loading
          label={label}
          avatarSrc={avatarSrc}
          avatarAlt={avatarAlt}
          shimmerColor={shimmerColor}
          spread={spread}
          speed={speed}
          className={glowClass}
        />
        <p className="mt-5 text-sm text-slate-300">{subtitle}</p>
        {clickable && (
          <span className="mt-10 text-xs text-slate-500">Klik di mana saja untuk lewati</span>
        )}
      </CinematicLayers>
    </button>
  )
}
