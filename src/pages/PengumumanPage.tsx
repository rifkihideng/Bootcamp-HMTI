import { Megaphone } from 'lucide-react'
import { announcements } from '../data/content'

export default function PengumumanPage() {
  return (
    <section id="pengumuman" className="bg-gradient-to-b from-white to-navy-50 pt-28 pb-20 sm:pt-32 sm:pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <span className="inline-block rounded-full bg-accent-100 px-3 py-1 text-sm font-semibold text-accent-600">
            Pengumuman
          </span>
          <h1 className="mt-4 text-3xl font-bold text-navy-900 sm:text-4xl">
            Info & Pengumuman
          </h1>
          <p className="mt-4 text-slate-600">
            Informasi terbaru seputar Bootcamp Himpunan Teknologi Informasi 2026.
          </p>
        </div>

        <div className="mt-12 space-y-6">
          {announcements.map((announcement) => (
            <article
              key={announcement.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-100 px-3 py-1 text-xs font-semibold text-accent-600">
                  <Megaphone className="h-3.5 w-3.5" />
                  {announcement.category}
                </span>
                <time className="text-xs text-slate-500">{announcement.date}</time>
              </div>
              <h2 className="mt-3 text-lg font-bold text-navy-900">{announcement.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {announcement.content}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
