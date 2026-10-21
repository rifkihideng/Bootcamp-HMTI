import { Link } from 'react-router-dom'
import { Home, SearchX } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <section className="bg-gradient-to-b from-navy-900 to-navy-950 px-4 pt-32 pb-24 text-center sm:pt-40">
      <div className="mx-auto max-w-md">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-accent-400">
          <SearchX className="h-8 w-8" />
        </span>
        <p className="mt-6 text-7xl font-extrabold text-white">404</p>
        <h1 className="mt-2 text-2xl font-bold text-white">Halaman Tidak Ditemukan</h1>
        <p className="mt-3 text-slate-400">
          Maaf, halaman yang kamu cari tidak ada atau mungkin sudah dipindahkan.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-accent-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-600"
        >
          <Home className="h-4 w-4" />
          Kembali ke Beranda
        </Link>
      </div>
    </section>
  )
}
