import DiagonalMarquee from '../components/DiagonalMarquee'

export default function GaleriPage() {
  return (
    <section id="galeri" className="overflow-x-hidden bg-gradient-to-b from-white to-navy-50 pt-28 pb-20 sm:pt-32 sm:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <span className="inline-block rounded-full bg-accent-100 px-3 py-1 text-sm font-semibold text-accent-600">
            Dokumentasi
          </span>
          <h1 className="mt-4 text-3xl font-bold text-navy-900 sm:text-4xl">
            Galeri Dokumentasi
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Momen kebersamaan dan keseruan selama Bootcamp Himpunan Teknologi Informasi 2026.
          </p>
        </div>
      </div>

      <div className="mt-12">
        <DiagonalMarquee />
      </div>
    </section>
  )
}
