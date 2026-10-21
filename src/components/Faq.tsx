import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { faqs } from '../data/content'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="scroll-mt-20 bg-gradient-to-b from-navy-50 to-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Pertanyaan yang Sering Diajukan"
            description="Masih ragu? Cek jawaban dari pertanyaan yang paling sering ditanyakan."
          />
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-3xl" delay={0.1}>
          <div className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index
              return (
                <div key={faq.question}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-navy-900">{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="px-6 pb-5 text-slate-600">{faq.answer}</p>
                  )}
                </div>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
