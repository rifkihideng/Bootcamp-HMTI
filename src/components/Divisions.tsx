import {
  Brain,
  Code2,
  Cpu,
  Palette,
  Rocket,
  Server,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { divisions } from '../data/content'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

const iconMap: Record<string, LucideIcon> = {
  code: Code2,
  server: Server,
  palette: Palette,
  brain: Brain,
  cpu: Cpu,
}

export default function Divisions() {
  return (
    <section id="program" className="scroll-mt-20 bg-gradient-to-b from-navy-50 to-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Program"
            title="Program Peminatan"
            description="Pilih peminatan yang sesuai dengan minat dan tujuan kariermu."
          />
        </Reveal>

        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {divisions.map((division, index) => {
            const Icon = iconMap[division.icon]
            const remaining = division.quota - division.filled
            const filledPercent = Math.round((division.filled / division.quota) * 100)

            return (
              <Reveal
                key={division.title}
                delay={index * 0.08}
                className="flex w-full max-w-sm flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-accent-400">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-navy-900">{division.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{division.description}</p>

                <div className="mt-3 rounded-lg bg-accent-50 p-3">
                  <p className="flex items-start gap-2 text-xs leading-relaxed text-navy-700">
                    <Rocket className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" />
                    <span>
                      <span className="font-semibold text-accent-700">Proyek:</span>{' '}
                      {division.project}
                    </span>
                  </p>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 font-medium text-navy-700">
                      <Users className="h-3.5 w-3.5" />
                      Kuota
                    </span>
                    <span className="font-semibold text-accent-600">Sisa {remaining}</span>
                  </div>
                  <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-accent-500"
                      style={{ width: `${filledPercent}%` }}
                    />
                  </div>
                </div>

                <ul className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                  {division.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-navy-700"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
