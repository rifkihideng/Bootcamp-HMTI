import { useRef, useState, type ChangeEvent } from 'react'
import { Download, MoveHorizontal, Printer } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { divisions, org } from '../data/content'
import SectionHeading from './SectionHeading'

const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 placeholder-slate-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30'

const labelClass = 'mb-1.5 block text-sm font-medium text-navy-900'

function formatTanggal(iso: string) {
  if (!iso) return ''
  const [year, month, day] = iso.split('-')
  const date = new Date(Number(year), Number(month) - 1, Number(day))
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function Certificate() {
  const [nama, setNama] = useState('')
  const [peminatan, setPeminatan] = useState(divisions[0].title)
  const [tanggal, setTanggal] = useState(() => new Date().toISOString().slice(0, 10))
  const [nomor, setNomor] = useState(
    () => `${org.shortName}/BDW/2026/${String(Math.floor(Math.random() * 9000) + 1000)}`,
  )
  const [downloading, setDownloading] = useState(false)
  const certRef = useRef<HTMLDivElement>(null)

  const canGenerate = nama.trim().length > 0

  const verifyUrl = import.meta.env.VITE_VERIFY_URL || 'https://hmtiunipi.or.id/verify'
  const qrValue = `${verifyUrl}?no=${encodeURIComponent(
    nomor,
  )}&nama=${encodeURIComponent(nama.trim() || 'Peserta')}`

  async function handleDownload() {
    const node = certRef.current
    if (!node || !canGenerate) return
    setDownloading(true)
    try {
      const { toPng } = await import('html-to-image')
      const dataUrl = await toPng(node, { pixelRatio: 3, cacheBust: true })
      const link = document.createElement('a')
      link.download = `sertifikat-${nama.trim().replace(/\s+/g, '-')}.png`
      link.href = dataUrl
      link.click()
    } finally {
      setDownloading(false)
    }
  }

  return (
    <section id="sertifikat" className="scroll-mt-20 bg-gradient-to-b from-white to-navy-50 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Sertifikat"
          title="Generate Sertifikat"
          description="Peserta yang telah menyelesaikan bootcamp bisa membuat sertifikat sendiri."
        />

        <div className="mt-12 space-y-10">
          <div className="mx-auto w-full max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="text-lg font-bold text-navy-900">Data Peserta</h3>
            <p className="mt-1 text-sm text-slate-600">
              Isi data di bawah ini, lalu unduh sertifikatmu.
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <label htmlFor="cert-nama" className={labelClass}>
                  Nama Lengkap
                </label>
                <input
                  id="cert-nama"
                  type="text"
                  value={nama}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setNama(e.target.value)}
                  placeholder="Nama lengkap peserta"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="cert-peminatan" className={labelClass}>
                  Peminatan
                </label>
                <select
                  id="cert-peminatan"
                  value={peminatan}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setPeminatan(e.target.value)}
                  className={inputClass}
                >
                  {divisions.map((division) => (
                    <option key={division.title} value={division.title}>
                      {division.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="cert-tanggal" className={labelClass}>
                  Tanggal Selesai
                </label>
                <input
                  id="cert-tanggal"
                  type="date"
                  value={tanggal}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setTanggal(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="cert-nomor" className={labelClass}>
                  Nomor Sertifikat
                </label>
                <input
                  id="cert-nomor"
                  type="text"
                  value={nomor}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setNomor(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={!canGenerate || downloading}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-accent-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Download className="h-4 w-4" />
                  {downloading ? 'Menyiapkan...' : 'Download PNG'}
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  disabled={!canGenerate}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Printer className="h-4 w-4" />
                  Cetak / PDF
                </button>
              </div>

              {!canGenerate && (
                <p className="text-xs text-slate-400">
                  Isi nama lengkap terlebih dahulu untuk mengaktifkan tombol unduh.
                </p>
              )}
            </div>
          </div>

          <div className="mx-auto w-full max-w-[900px]">
            <p className="mb-2 flex items-center justify-center gap-1.5 text-xs font-medium text-slate-400 lg:hidden">
              <MoveHorizontal className="h-4 w-4" />
              Geser untuk melihat sertifikat
            </p>
            <div className="overflow-x-auto py-1">
              <div
                ref={certRef}
                id="certificate"
                className="flex aspect-[297/210] w-full min-w-[862px] flex-col items-center justify-between rounded-lg bg-white px-5 py-7 text-center shadow-lg ring-1 ring-slate-200 sm:px-12"
                style={{
                  border: '8px solid #2596be',
                  outline: '2px solid #0a2940',
                  outlineOffset: '6px',
                }}
              >
              <div>
                <img
                  src="/logo-192.png"
                  alt="Logo HMTI"
                  className="mx-auto h-14 w-14 object-contain"
                />
                <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-navy-700">
                  {org.fullName}
                </p>
                <h4
                  className="mt-3 text-2xl font-bold tracking-[0.2em] text-navy-900 sm:text-3xl sm:tracking-[0.3em]"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                >
                  SERTIFIKAT
                </h4>
                <p className="mt-1 text-[11px] text-slate-500">Nomor: {nomor}</p>
              </div>

              <div className="px-2">
                <p className="text-xs uppercase tracking-wide text-slate-500">Diberikan kepada</p>
                <p
                  className="mt-2 text-3xl text-accent-600 sm:text-4xl"
                  style={{
                    fontFamily:
                      '"Segoe Script", "Lucida Handwriting", "Brush Script MT", cursive',
                  }}
                >
                  {nama.trim() || 'Nama Peserta'}
                </p>
                <div className="mx-auto mt-3 h-px w-2/3 bg-slate-300" />
                <p className="mx-auto mt-4 max-w-md text-xs leading-relaxed text-slate-600 sm:text-sm">
                  atas partisipasinya dalam <span className="font-semibold">{org.bootcampName}</span>{' '}
                  pada peminatan <span className="font-semibold">{peminatan}</span> yang
                  diselenggarakan oleh {org.fullName}.
                </p>
                <p className="mt-3 text-xs text-slate-500">
                  {formatTanggal(tanggal)}
                </p>
              </div>

              <div className="w-full">
                <div className="grid grid-cols-2 gap-8 text-center">
                  <div>
                    <p className="text-xs font-semibold text-navy-900">Ketua Pelaksana</p>
                    <div className="mx-auto mt-10 h-px w-3/4 bg-slate-300" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-navy-900">Ketua {org.shortName}</p>
                    <div className="mx-auto mt-10 h-px w-3/4 bg-slate-300" />
                  </div>
                </div>
                <div className="mt-5 flex flex-col items-center gap-1.5">
                  <div className="rounded-md bg-white p-1.5 ring-1 ring-slate-200">
                    <QRCodeSVG
                      value={qrValue}
                      size={90}
                      className="h-14 w-14 sm:h-[90px] sm:w-[90px]"
                    />
                  </div>
                  <p className="text-[10px] font-medium text-slate-400">
                    Scan untuk verifikasi
                  </p>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
