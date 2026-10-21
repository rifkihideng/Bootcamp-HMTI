import { Brain, Code2, Palette, Server, type LucideIcon } from 'lucide-react'
import { divisions } from '../data/content'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

const iconMap: Record<string, LucideIcon> = {
  code: Code2,
  server: Server,
  palette: Palette,
  brain: Brain,
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

        <Reveal className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" delay={0.1}>
          {divisions.map((division) => {
            const Icon = iconMap[division.icon]
            return (
              <div
                key={division.title}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-900 text-accent-400">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-navy-900">{division.title}</h3>
                <p className="mt-2 flex-1 text-sm text-slate-600">{division.description}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {division.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-navy-700"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
