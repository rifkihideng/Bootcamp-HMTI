import { timeline } from '../data/content'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

export default function Timeline() {
  return (
    <section id="timeline" className="scroll-mt-20 bg-gradient-to-b from-white to-navy-50 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Timeline"
            title="Timeline Kegiatan"
            description="Alur kegiatan dari pendaftaran hingga penutupan."
          />
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-3xl" delay={0.1}>
          <ol className="space-y-8">
            {timeline.map((item, index) => (
              <li key={item.title} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-900 text-sm font-bold text-accent-400">
                    {index + 1}
                  </span>
                  {index < timeline.length - 1 && (
                    <span className="mt-2 w-px flex-1 bg-slate-200" />
                  )}
                </div>
                <div className="pb-2">
                  <span className="text-sm font-semibold text-accent-600">{item.date}</span>
                  <h3 className="text-lg font-bold text-navy-900">{item.title}</h3>
                  <p className="mt-1 text-slate-600">{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}
