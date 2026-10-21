import { KeyRound, Sticker, type LucideIcon } from 'lucide-react'
import { merchandise, type MerchandiseItem } from '../data/content'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'

const iconMap: Record<MerchandiseItem['icon'], LucideIcon> = {
  keychain: KeyRound,
  sticker: Sticker,
}

function MerchandiseCard({ item }: { item: MerchandiseItem }) {
  const Icon = iconMap[item.icon]
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div
        className={`flex aspect-square items-center justify-center bg-gradient-to-br ${item.gradient} text-white`}
      >
        <span className="flex h-24 w-24 items-center justify-center rounded-full bg-white/15">
          <Icon className="h-12 w-12" />
        </span>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-bold text-navy-900">{item.title}</h3>
        <p className="mt-2 text-sm text-slate-600">{item.description}</p>
      </div>
    </div>
  )
}

export default function MerchandisePage() {
  return (
    <section
      id="merchandise"
      className="overflow-x-hidden bg-gradient-to-b from-white to-navy-50 pt-28 pb-20 sm:pt-32 sm:pb-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            as="h1"
            eyebrow="Merchandise"
            title="Merchandise HMTI Bootcamp"
            description="Koleksi merchandise resmi Bootcamp Himpunan Teknologi Informasi 2026."
          />
        </Reveal>

        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {merchandise.map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 0.1}
              className="w-full max-w-sm sm:w-[calc(50%-0.75rem)]"
            >
              <MerchandiseCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
