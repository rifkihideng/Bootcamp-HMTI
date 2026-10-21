import { CheckCircle2 } from 'lucide-react'
import { about } from '../data/content'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

export default function About() {
  return (
    <section id="tentang" className="scroll-mt-20 bg-gradient-to-b from-white to-navy-50 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Tentang"
            title="Tentang Bootcamp"
            description="Dari mahasiswa, untuk mahasiswa — persiapkan dirimu menghadapi dunia kerja."
          />
        </Reveal>

        <Reveal className="mt-12 grid items-center gap-10 lg:grid-cols-2" delay={0.1}>
          <div className="space-y-4 text-slate-600">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <ul className="space-y-3">
            {about.points.map((point) => (
              <li
                key={point}
                className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" />
                <span className="font-medium text-navy-900">{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
