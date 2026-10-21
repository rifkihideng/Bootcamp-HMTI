import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CalendarDays,
  ClipboardList,
  Megaphone,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { announcements } from '../data/content'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'

interface CategoryStyle {
  icon: LucideIcon
  badge: string
  ring: string
}

const categoryStyles: Record<string, CategoryStyle> = {
  Pendaftaran: {
    icon: ClipboardList,
    badge: 'bg-emerald-100 text-emerald-700',
    ring: 'bg-emerald-500/10 text-emerald-600 ring-emerald-500/20',
  },
  Seleksi: {
    icon: Users,
    badge: 'bg-amber-100 text-amber-700',
    ring: 'bg-amber-500/10 text-amber-600 ring-amber-500/20',
  },
  Pengumuman: {
    icon: Megaphone,
    badge: 'bg-accent-100 text-accent-600',
    ring: 'bg-accent-500/10 text-accent-600 ring-accent-500/20',
  },
  Kegiatan: {
    icon: CalendarDays,
    badge: 'bg-violet-100 text-violet-700',
    ring: 'bg-violet-500/10 text-violet-600 ring-violet-500/20',
  },
}

const fallbackStyle: CategoryStyle = {
  icon: Megaphone,
  badge: 'bg-slate-100 text-slate-600',
  ring: 'bg-slate-500/10 text-slate-600 ring-slate-500/20',
}

export default function PengumumanPage() {
  const [activeCategory, setActiveCategory] = useState('Semua')

  const sortedAnnouncements = [...announcements].sort((a, b) => b.isoDate.localeCompare(a.isoDate))
  const categories = ['Semua', ...new Set(sortedAnnouncements.map((a) => a.category))]
  const filtered =
    activeCategory === 'Semua'
      ? sortedAnnouncements
      : sortedAnnouncements.filter((a) => a.category === activeCategory)
  const latestTitle = sortedAnnouncements[0]?.title

  return (
    <section
      id="pengumuman"
      className="relative overflow-hidden bg-gradient-to-b from-white to-navy-50 pt-28 pb-20 sm:pt-32 sm:pb-24"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-accent-200/40 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-64 w-64 translate-x-1/4 translate-y-1/4 rounded-full bg-navy-100/60 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            as="h1"
            eyebrow="Pengumuman"
            title="Info & Pengumuman"
            description="Informasi terbaru seputar Bootcamp Himpunan Teknologi Informasi 2026."
          />
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((category) => {
              const active = category === activeCategory
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                    active
                      ? 'bg-navy-900 text-accent-300'
                      : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {category}
                </button>
              )
            })}
          </div>
        </Reveal>

        <div className="mt-12">
          {filtered.length === 0 ? (
            <p className="text-center text-slate-500">Belum ada pengumuman untuk kategori ini.</p>
          ) : (
            <ol className="space-y-8">
              {filtered.map((announcement, index) => {
                const style = categoryStyles[announcement.category] ?? fallbackStyle
                const Icon = style.icon
                const isLatest = activeCategory === 'Semua' && announcement.title === latestTitle
                const isLast = index === filtered.length - 1

                return (
                  <li key={announcement.title} className="flex gap-4 sm:gap-5">
                    <div className="flex flex-col items-center">
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ring-1 ${style.ring}`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      {!isLast && <span className="mt-2 w-px flex-1 bg-slate-200" />}
                    </div>

                    <Reveal delay={index * 0.06} className="flex-1 pb-8">
                      <article
                        className={`group rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-6 ${
                          isLatest
                            ? 'border-accent-300 bg-gradient-to-br from-accent-50 to-white shadow-sm hover:shadow-lg'
                            : 'border-slate-200 bg-white shadow-sm hover:border-accent-200'
                        }`}
                      >
                        <div className="flex flex-wrap items-center gap-3">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${style.badge}`}
                          >
                            <Icon className="h-3.5 w-3.5" />
                            {announcement.category}
                          </span>
                          {isLatest && (
                            <span className="inline-flex items-center rounded-full bg-navy-900 px-2.5 py-1 text-xs font-semibold text-accent-300">
                              Terbaru
                            </span>
                          )}
                          <time className="ml-auto text-xs text-slate-500">{announcement.date}</time>
                        </div>

                        <h2 className="mt-3 text-lg font-bold text-navy-900 sm:text-xl">
                          {announcement.title}
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-slate-600">
                          {announcement.content}
                        </p>

                        {announcement.link && (
                          <Link
                            to={announcement.link.to}
                            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-600 transition-colors hover:text-accent-700"
                          >
                            {announcement.link.label}
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                          </Link>
                        )}
                      </article>
                    </Reveal>
                  </li>
                )
              })}
            </ol>
          )}
        </div>
      </div>
    </section>
  )
}
