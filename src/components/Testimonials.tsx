import { useEffect, useRef } from 'react'
import { User } from 'lucide-react'
import { testimonials, type Testimonial } from '../data/content'
import Reveal from './Reveal'

const titleWords = 'Apa Kata Mereka'.split(' ')

const half = Math.ceil(testimonials.length / 2)
const rowOne = [...testimonials.slice(0, half), ...testimonials.slice(0, half)]
const rowTwo = [...testimonials.slice(half), ...testimonials.slice(half)]

function TestimonialCard({ name, role, quote }: Testimonial) {
  return (
    <figure className="mr-6 w-80 shrink-0 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-accent-500/60">
      <figcaption className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-900 text-accent-400">
          <User className="h-5 w-5" />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-navy-900">
            {name}
          </span>
          <span className="block truncate text-xs text-slate-500">{role}</span>
        </span>
      </figcaption>
      <blockquote className="mt-4 text-sm leading-relaxed text-slate-600">
        {quote}
      </blockquote>
    </figure>
  )
}

export default function Testimonials() {
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = titleRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-visible')
            observer.disconnect()
          }
        }
      },
      { threshold: 0.4 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="testimoni"
      className="group scroll-mt-20 overflow-hidden bg-gradient-to-b from-white to-navy-50 py-20 sm:py-24"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center sm:px-6">
        <Reveal>
          <span className="inline-block rounded-full bg-accent-100 px-3 py-1 text-sm font-semibold text-accent-600">
            Testimoni
          </span>
        </Reveal>

        <h2
          ref={titleRef}
          className="title-reveal text-balance text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl"
        >
          {titleWords.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="title-word mr-2 inline-block"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {word}
            </span>
          ))}
        </h2>

        <Reveal delay={0.3}>
          <p className="max-w-2xl text-balance text-slate-600">
            Cerita dari peserta yang sudah merasakan manfaatnya.
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.4} className="relative mt-12">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent sm:w-28" />

        <div className="space-y-6">
          <div
            className="flex w-max group-hover:[animation-play-state:paused]"
            style={{ animation: 'marquee 30s linear infinite' }}
          >
            {rowOne.map((testimonial, index) => (
              <TestimonialCard key={`row-one-${index}`} {...testimonial} />
            ))}
          </div>

          <div
            className="flex w-max group-hover:[animation-play-state:paused]"
            style={{ animation: 'marquee 30s linear infinite reverse' }}
          >
            {rowTwo.map((testimonial, index) => (
              <TestimonialCard key={`row-two-${index}`} {...testimonial} />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
