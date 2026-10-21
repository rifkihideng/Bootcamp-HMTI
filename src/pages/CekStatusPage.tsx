import { useState, type FormEvent } from 'react'
import { CheckCircle2, Info, Search, XCircle } from 'lucide-react'
import {
  registrationRecords,
  type RegistrationRecord,
} from '../data/content'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'

const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-navy-900 placeholder-slate-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30'

type ResultState =
  | { kind: 'idle' }
  | { kind: 'found'; record: RegistrationRecord }
  | { kind: 'not-found' }

export default function CekStatusPage() {
  const [nim, setNim] = useState('')
  const [result, setResult] = useState<ResultState>({ kind: 'idle' })

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const record = registrationRecords.find(
      (item) => item.nim.toLowerCase() === nim.trim().toLowerCase(),
    )
    if (record) {
      setResult({ kind: 'found', record })
    } else {
      setResult({ kind: 'not-found' })
    }
  }

  const statusMeta = {
    lolos: {
      label: 'Selamat, kamu Lolos Seleksi!',
      icon: CheckCircle2,
      text: 'text-emerald-600',
      iconClass: 'bg-emerald-100 text-emerald-600',
    },
    proses: {
      label: 'Seleksi Masih Diproses',
      icon: Info,
      text: 'text-amber-600',
      iconClass: 'bg-amber-100 text-amber-600',
    },
    'tidak-lolos': {
      label: 'Belum Beruntung Kali Ini',
      icon: XCircle,
      text: 'text-accent-600',
      iconClass: 'bg-red-100 text-accent-600',
    },
  } as const

  return (
    <section id="cek-status" className="bg-gradient-to-b from-white to-navy-50 pt-28 pb-20 sm:pt-32 sm:pb-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            as="h1"
            eyebrow="Cek Status"
            title="Cek Status Pendaftaran"
            description="Masukkan NIM yang kamu gunakan saat mendaftar untuk melihat hasil seleksi."
          />
        </Reveal>

        <form
          onSubmit={handleSubmit}
          className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          <label htmlFor="nim" className="mb-2 block text-sm font-medium text-navy-900">
            NIM
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="nim"
              type="text"
              value={nim}
              onChange={(e) => setNim(e.target.value)}
              placeholder="Contoh: 2024001"
              required
              className={inputClass}
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
            >
              <Search className="h-4 w-4" />
              Cek
            </button>
          </div>
          <p className="mt-3 text-xs text-slate-400">
            Contoh NIM untuk mencoba: 2024001 (lolos), 2024003 (proses), 2024004 (tidak lolos).
          </p>
        </form>

        {result.kind === 'found' && (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            {(() => {
              const meta = statusMeta[result.record.status]
              const Icon = meta.icon
              return (
                <div className="flex flex-col items-center text-center">
                  <span className={`flex h-14 w-14 items-center justify-center rounded-full ${meta.iconClass}`}>
                    <Icon className="h-7 w-7" />
                  </span>
                  <h2 className={`mt-4 text-xl font-bold ${meta.text}`}>{meta.label}</h2>
                  <div className="mt-5 w-full divide-y divide-slate-100 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
                      <span className="text-slate-500">Nama</span>
                      <span className="font-semibold text-navy-900">{result.record.name}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
                      <span className="text-slate-500">NIM</span>
                      <span className="font-semibold text-navy-900">{result.record.nim}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
                      <span className="text-slate-500">Peminatan</span>
                      <span className="font-semibold text-navy-900">
                        {result.record.peminatan}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })()}
          </div>
        )}

        {result.kind === 'not-found' && (
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-red-100 bg-red-50 p-5 text-sm text-accent-700">
            <XCircle className="h-5 w-5 shrink-0" />
            NIM tidak ditemukan. Periksa kembali NIM yang kamu masukkan, atau hubungi panitia.
          </div>
        )}
      </div>
    </section>
  )
}
