import DiagonalMarquee from '../components/DiagonalMarquee'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'

export default function GaleriPage() {
  return (
    <section id="galeri" className="overflow-x-hidden bg-gradient-to-b from-white to-navy-50 pt-28 pb-20 sm:pt-32 sm:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            as="h1"
            eyebrow="Dokumentasi"
            title="Galeri Dokumentasi"
            description="Momen kebersamaan dan keseruan selama Bootcamp Himpunan Teknologi Informasi 2026."
          />
        </Reveal>
      </div>

      <div className="mt-12">
        <DiagonalMarquee />
      </div>
    </section>
  )
}
