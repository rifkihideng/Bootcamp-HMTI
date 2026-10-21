import { mentors } from '../data/content'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

function getInitials(name: string) {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
}

export default function Mentors() {
  return (
    <section id="mentor" className="scroll-mt-20 bg-gradient-to-b from-navy-50 to-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Mentor"
            title="Mentor & Pemateri"
            description="Belajar langsung dari kakak tingkat, alumni, dan dosen yang berpengalaman."
          />
        </Reveal>

        <Reveal className="mt-12 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4" delay={0.1}>
          {mentors.map((mentor) => (
            <div
              key={mentor.name}
              className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm transition-shadow hover:shadow-md sm:p-6"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-navy-900 text-2xl font-bold text-accent-400">
                {getInitials(mentor.name)}
              </div>
              <h3 className="mt-4 text-lg font-bold text-navy-900">{mentor.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{mentor.role}</p>
              <p className="mt-1 text-sm font-medium text-accent-600">{mentor.expertise}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
