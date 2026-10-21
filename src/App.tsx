import { lazy, Suspense, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PillLoadingScreen from './components/PillLoadingScreen'
import HomeLoadingScreen from './components/HomeLoadingScreen'
import type { CinematicConfig } from './components/CinematicLayers'
import HomePage from './pages/HomePage'

const RegisterPage = lazy(() => import('./pages/RegisterPage'))
const PengumumanPage = lazy(() => import('./pages/PengumumanPage'))
const CekStatusPage = lazy(() => import('./pages/CekStatusPage'))
const GaleriPage = lazy(() => import('./pages/GaleriPage'))
const MerchandisePage = lazy(() => import('./pages/MerchandisePage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-accent-500" />
    </div>
  )
}

// Pengaturan layar loading halaman utama (tahap 1: pill glassmorphism).
export const pillLoadingConfig = {
  /** Teks utama pada pill. */
  label: 'Menyiapkan halaman utama...',
  /** Teks kecil di bawah pill. */
  subtitle: 'HMTI Bootcamp 2026',
  /** Logo di dalam pill. */
  avatarSrc: '/logo-192.png',
  avatarAlt: 'Logo HMTI',
  /** Warna shimmer yang berputar. */
  shimmerColor: 'rgba(123,179,207,0.85)',
  /** Lebar kilau shimmer. */
  spread: '90deg',
  /** Kecepatan rotasi shimmer. */
  speed: '4s',
  /** Kelas glow/shadow pada pill. */
  glowClass: 'shadow-[0_8px_40px_rgba(37,150,190,0.25)]',
  /** Durasi sebelum otomatis lanjut ke tahap berikutnya (ms). */
  durationMs: 2200,
  /** Izinkan klik untuk melewati layar loading. */
  skipOnClick: true,
}

// Pengaturan layar loading halaman utama (tahap 2: typewriter).
export const typewriterLoadingConfig = {
  /** Label kecil di atas judul. */
  eyebrow: 'HMTI BOOTCAMP 2026',
  /** Judul yang diketik dengan efek typewriter. */
  title: 'Welcome to the bootcamp',
  /** Kecepatan mengetik (ms per karakter). */
  typingSpeed: 65,
  /** Jeda setelah selesai mengetik sebelum otomatis ditutup (ms). */
  holdTime: 600,
  /** Tampilkan petunjuk "Klik di mana saja untuk lewati". */
  showHint: true,
  /** Teks indikator loading. */
  spinnerText: 'Sedang memuat...',
  /** Izinkan klik untuk melewati layar loading. */
  skipOnClick: true,
}

// Pengaturan efek sinematik (dipakai oleh kedua layar loading).
export const cinematicConfig: CinematicConfig = {
  /** Warna awal gradasi background. */
  bgFrom: '#031927',
  /** Warna tengah gradasi background. */
  bgVia: '#082238',
  /** Warna akhir gradasi background. */
  bgTo: '#0a2940',
  /** Skala maksimal zoom background (Ken Burns). */
  kenBurnsScale: 1.34,
  /** Durasi zoom background. */
  kenBurnsDuration: '22s',
  /** Durasi pergeseran gradasi background. */
  gradientPanDuration: '16s',
  /** Skala awal zoom konten (lebih kecil = lebih dramatis). */
  cinematicZoomScale: 0.82,
  /** Durasi zoom masuk konten. */
  cinematicZoomDuration: '1.2s',
  /** Tinggi bar letterbox atas & bawah. */
  letterboxHeight: 'clamp(4rem, 6vw, 6rem)',
  /** Warna bar letterbox. */
  letterboxColor: 'rgba(0, 0, 0, 0.9)',
  /** Opacity film grain (0-1). */
  grainOpacity: 0.04,
  /** Kekuatan vignette (0-1). */
  vignetteStrength: 0.5,
}

function HomePageRoute() {
  const [phase, setPhase] = useState<'pill' | 'typewriter' | 'done'>(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'done' : 'pill',
  )

  return (
    <>
      <HomePage />
      {phase === 'pill' && (
        <PillLoadingScreen
          {...pillLoadingConfig}
          cinematic={cinematicConfig}
          onDone={() => setPhase('typewriter')}
        />
      )}
      {phase === 'typewriter' && (
        <HomeLoadingScreen
          {...typewriterLoadingConfig}
          cinematic={cinematicConfig}
          onDone={() => setPhase('done')}
        />
      )}
    </>
  )
}

function ScrollManager() {
  const location = useLocation()

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null
    const scrollTo = state?.scrollTo
    if (scrollTo) {
      requestAnimationFrame(() => {
        document.getElementById(scrollTo)?.scrollIntoView({ behavior: 'smooth' })
      })
    } else {
      window.scrollTo(0, 0)
    }
  }, [location])

  return null
}

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <ScrollManager />
      <Navbar />
      <main>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePageRoute />} />
            <Route path="/daftar" element={<RegisterPage />} />
            <Route path="/pengumuman" element={<PengumumanPage />} />
            <Route path="/cek-status" element={<CekStatusPage />} />
            <Route path="/galeri" element={<GaleriPage />} />
            <Route path="/merchandise" element={<MerchandisePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
