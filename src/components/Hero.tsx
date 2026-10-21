import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { org, registrationDeadline } from '../data/content'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calcTimeLeft(target: string): TimeLeft {
  const diff = new Date(target).getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1_000) % 60,
  }
}

function useTypewriter(text: string, typingSpeed = 70, deletingSpeed = 35, holdTime = 2000) {
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && displayed === text) {
      timeout = setTimeout(() => setDeleting(true), holdTime)
    } else if (deleting && displayed === '') {
      setDeleting(false)
    } else {
      timeout = setTimeout(
        () => {
          setDisplayed(
            deleting
              ? text.slice(0, displayed.length - 1)
              : text.slice(0, displayed.length + 1),
          )
        },
        deleting ? deletingSpeed : typingSpeed,
      )
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, text, typingSpeed, deletingSpeed, holdTime])

  return displayed
}

export default function Hero() {
  const typed = useTypewriter(org.fullName)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calcTimeLeft(registrationDeadline))

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft(registrationDeadline)), 1000)
    return () => clearInterval(id)
  }, [])

  const countdownUnits = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds },
  ]

  return (
    <section
      id="beranda"
      className="relative overflow-hidden bg-gradient-to-b from-navy-900 to-navy-950 text-white"
    >
      <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-navy-500/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-accent-400/10 blur-3xl" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pb-24 pt-32 text-center sm:px-6 sm:pt-40">
        <span className="inline-flex min-h-8 items-center rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-medium text-slate-300">
          {typed}
          <span className="ml-0.5 inline-block h-4 w-px animate-pulse bg-accent-400" />
        </span>

        <h1 className="mt-6 max-w-3xl text-balance text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Bootcamp Himpunan Teknologi Informasi{' '}
          <span className="text-accent-400">2026</span>
        </h1>

        <p className="mt-5 max-w-2xl text-balance text-lg text-slate-300 sm:text-xl">
          {org.tagline}
        </p>

        <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Pendaftaran ditutup dalam
          </p>
          <div className="mt-3 flex items-center justify-center gap-3">
            {countdownUnits.map((unit) => (
              <div
                key={unit.label}
                className="flex min-w-[4.25rem] flex-col items-center rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 backdrop-blur-sm"
              >
                <span className="text-2xl font-bold tabular-nums text-white">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-slate-400">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/daftar"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-600"
          >
            Daftar Sekarang
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="#program"
            className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
          >
            Lihat Program
          </a>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white" />
    </section>
  )
}
