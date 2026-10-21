import { Camera } from 'lucide-react'
import { gallery, type GalleryItem } from '../data/content'

function GalleryCard({ item }: { item: GalleryItem }) {
  return (
    <div className="relative mr-6 aspect-video w-72 shrink-0 overflow-hidden rounded-2xl shadow-md sm:w-80">
      {item.image ? (
        <>
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/80 to-transparent p-4">
            <span className="text-sm font-semibold text-white">{item.title}</span>
          </div>
        </>
      ) : (
        <div
          className={`flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br ${item.gradient} text-white`}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15">
            <Camera className="h-6 w-6" />
          </span>
          <span className="text-sm font-semibold">{item.title}</span>
        </div>
      )}
    </div>
  )
}

interface RowProps {
  items: GalleryItem[]
  reverse?: boolean
  duration?: string
}

function Row({ items, reverse = false, duration = '40s' }: RowProps) {
  const doubled = [...items, ...items]

  return (
    <div
      className="flex w-max"
      style={{
        animation: `marquee ${duration} linear infinite${reverse ? ' reverse' : ''}`,
      }}
    >
      {doubled.map((item, index) => (
        <GalleryCard key={`${item.title}-${index}`} item={item} />
      ))}
    </div>
  )
}

export default function DiagonalMarquee() {
  const half = Math.ceil(gallery.length / 2)
  const rowOne = gallery.slice(0, half)
  const rowTwo = gallery.slice(half)

  return (
    <div className="relative -mx-4 overflow-hidden py-6 sm:-mx-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-navy-50 to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-navy-50 to-transparent sm:w-32" />

      <div className="-rotate-3 space-y-6">
        <Row items={rowOne} duration="38s" />
        <Row items={rowTwo} reverse duration="32s" />
        <Row items={rowOne} duration="44s" />
      </div>
    </div>
  )
}
