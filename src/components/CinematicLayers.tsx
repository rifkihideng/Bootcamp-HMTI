import type { CSSProperties, ReactNode } from 'react'

export interface CinematicConfig {
  /** Warna awal gradasi background. */
  bgFrom?: string
  /** Warna tengah gradasi background. */
  bgVia?: string
  /** Warna akhir gradasi background. */
  bgTo?: string
  /** Skala maksimal zoom background (Ken Burns). */
  kenBurnsScale?: number
  /** Durasi zoom background. */
  kenBurnsDuration?: string
  /** Durasi pergeseran gradasi background. */
  gradientPanDuration?: string
  /** Skala awal zoom konten saat masuk (lebih kecil = lebih dramatis). */
  cinematicZoomScale?: number
  /** Durasi zoom masuk konten. */
  cinematicZoomDuration?: string
  /** Tinggi bar letterbox atas & bawah (boleh pakai clamp). */
  letterboxHeight?: string
  /** Warna bar letterbox. */
  letterboxColor?: string
  /** Opacity film grain (0-1). */
  grainOpacity?: number
  /** Kekuatan vignette (0-1). */
  vignetteStrength?: number
}

export default function CinematicLayers({
  children,
  config = {},
}: {
  children: ReactNode
  config?: CinematicConfig
}) {
  const {
    bgFrom = '#031927',
    bgVia = '#082238',
    bgTo = '#0a2940',
    kenBurnsScale = 1.34,
    kenBurnsDuration = '22s',
    gradientPanDuration = '16s',
    cinematicZoomScale = 0.82,
    cinematicZoomDuration = '1.2s',
    letterboxHeight = 'clamp(4rem, 6vw, 6rem)',
    letterboxColor = 'rgba(0, 0, 0, 0.9)',
    grainOpacity = 0.04,
    vignetteStrength = 0.5,
  } = config

  const vars = {
    '--bg-from': bgFrom,
    '--bg-via': bgVia,
    '--bg-to': bgTo,
    '--ken-burns-scale': String(kenBurnsScale),
    '--cinematic-zoom-scale': String(cinematicZoomScale),
    '--vignette-strength': String(vignetteStrength),
  } as CSSProperties

  return (
    <div className="contents" style={vars}>
      <div
        className="animate-ken-burns pointer-events-none absolute inset-0 overflow-hidden"
        style={{ animationDuration: kenBurnsDuration }}
        aria-hidden="true"
      >
        <div
          className="loading-bg animate-gradient-pan absolute -inset-[10%]"
          style={{ animationDuration: gradientPanDuration }}
        />
      </div>

      <div
        className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full [background:radial-gradient(circle,rgba(80,138,168,0.3),transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-28 -right-24 h-80 w-80 rounded-full [background:radial-gradient(circle,rgba(37,150,190,0.18),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="vignette pointer-events-none absolute inset-0" aria-hidden="true" />

      <div
        className="film-grain pointer-events-none absolute -inset-[5%]"
        style={{ opacity: grainOpacity }}
        aria-hidden="true"
      />

      <div
        className="animate-letterbox-top pointer-events-none absolute inset-x-0 top-0"
        style={{ height: letterboxHeight, backgroundColor: letterboxColor }}
        aria-hidden="true"
      />
      <div
        className="animate-letterbox-bottom pointer-events-none absolute inset-x-0 bottom-0"
        style={{ height: letterboxHeight, backgroundColor: letterboxColor }}
        aria-hidden="true"
      />

      <div
        className="animate-cinematic-zoom relative z-10 flex flex-col items-center"
        style={{ animationDuration: cinematicZoomDuration }}
      >
        {children}
      </div>
    </div>
  )
}
