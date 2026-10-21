import {
  useState,
  type FormEvent,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react'
import { CheckCircle2 } from 'lucide-react'
import { divisions } from '../data/content'
import SectionHeading from './SectionHeading'

const steps = ['Data Diri', 'Peminatan', 'Konfirmasi'] as const
type Step = 0 | 1 | 2

interface RegistrationData {
  nama: string
  nim: string
  universitas: string
  jurusan: string
  angkatan: string
  whatsapp: string
  email: string
  peminatan: string
  alasan: string
  komitmen: boolean
}

const initialData: RegistrationData = {
  nama: '',
  nim: '',
  universitas: '',
  jurusan: '',
  angkatan: '',
  whatsapp: '',
  email: '',
  peminatan: divisions[0].title,
  alasan: '',
  komitmen: false,
}

const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy-900 placeholder-slate-400 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/30'

const labelClass = 'mb-1.5 block text-sm font-medium text-navy-900'

const primaryButton =
  'inline-flex items-center justify-center gap-2 rounded-lg bg-accent-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-60'

const outlineButton =
  'inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-slate-50'

interface FieldInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

function FieldInput({ label, id, ...props }: FieldInputProps) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input id={id} className={inputClass} {...props} />
    </div>
  )
}

interface FieldTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
}

function FieldTextarea({ label, id, ...props }: FieldTextareaProps) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <textarea id={id} className={inputClass} {...props} />
    </div>
  )
}

export default function Register() {
  const [step, setStep] = useState<Step>(0)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [data, setData] = useState<RegistrationData>(initialData)

  function handleStepOne(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const fd = new FormData(event.currentTarget)
    setData((prev) => ({
      ...prev,
      nama: String(fd.get('nama') ?? ''),
      nim: String(fd.get('nim') ?? ''),
      universitas: String(fd.get('universitas') ?? ''),
      jurusan: String(fd.get('jurusan') ?? ''),
      angkatan: String(fd.get('angkatan') ?? ''),
      whatsapp: String(fd.get('whatsapp') ?? ''),
      email: String(fd.get('email') ?? ''),
    }))
    setStep(1)
  }

  function handleStepTwo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const fd = new FormData(event.currentTarget)
    setData((prev) => ({
      ...prev,
      peminatan: String(fd.get('peminatan') ?? prev.peminatan),
      alasan: String(fd.get('alasan') ?? ''),
      komitmen: fd.get('komitmen') === 'on',
    }))
    setStep(2)
  }

  async function handleConfirm() {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
    setDone(true)
  }

  function resetForm() {
    setData(initialData)
    setStep(0)
    setDone(false)
  }

  if (done) {
    return (
        <section id="daftar" className="scroll-mt-20 bg-gradient-to-b from-navy-900 to-navy-950 py-20 sm:py-24">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <div className="rounded-2xl bg-white p-8 text-center shadow-xl sm:p-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="mt-5 text-2xl font-bold text-navy-900">
              Pendaftaran Terkirim!
            </h3>
            <p className="mx-auto mt-3 max-w-md text-slate-600">
              Terima kasih, <span className="font-semibold text-navy-900">{data.nama}</span>.
              Pendaftaranmu untuk peminatan{' '}
              <span className="font-semibold text-navy-900">{data.peminatan}</span> sudah kami
              terima. Panitia akan menghubungimu melalui WhatsApp untuk langkah selanjutnya.
            </p>
            <button type="button" onClick={resetForm} className={`${outlineButton} mt-6`}>
              Daftarkan Peserta Lain
            </button>
          </div>
        </div>
      </section>
    )
  }

  const summary = [
    { label: 'Nama', value: data.nama },
    { label: 'NIM', value: data.nim },
    { label: 'Universitas', value: data.universitas },
    { label: 'Jurusan', value: data.jurusan },
    { label: 'Angkatan', value: data.angkatan },
    { label: 'No. WhatsApp', value: data.whatsapp },
    { label: 'Email', value: data.email },
    { label: 'Peminatan', value: data.peminatan },
    { label: 'Komitmen', value: data.komitmen ? 'Ya' : 'Tidak' },
  ]

  return (
    <section id="daftar" className="scroll-mt-20 bg-gradient-to-b from-navy-900 to-navy-950 py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Daftar"
          title="Daftar Sekarang"
          description="Kuota terbatas! Isi formulir di bawah ini untuk mengikuti seleksi."
          dark
        />

        <div className="mt-12 rounded-2xl bg-white p-6 shadow-xl sm:p-8">
          <div className="flex items-center justify-center gap-2">
            {steps.map((label, index) => (
              <div className="flex items-center gap-2" key={label}>
                <div className="flex items-center gap-1.5">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                      index < step
                        ? 'bg-accent-500 text-white'
                        : index === step
                          ? 'border-2 border-accent-500 text-accent-500'
                          : 'border border-slate-300 text-slate-400'
                    }`}
                  >
                    {index < step ? <CheckCircle2 className="h-3.5 w-3.5" /> : index + 1}
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      index === step ? 'text-navy-900' : 'text-slate-400'
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-px w-6 ${
                      index < step ? 'bg-accent-500' : 'bg-slate-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="mt-8">
            {step === 0 && (
              <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleStepOne}>
                <FieldInput
                  label="Nama Lengkap"
                  id="nama"
                  name="nama"
                  type="text"
                  placeholder="Nama lengkap"
                  defaultValue={data.nama}
                  maxLength={100}
                  required
                />
                <FieldInput
                  label="NIM"
                  id="nim"
                  name="nim"
                  type="text"
                  placeholder="Nomor Induk Mahasiswa"
                  defaultValue={data.nim}
                  pattern="[A-Za-z0-9]{5,20}"
                  title="NIM 5–20 karakter huruf/angka"
                  maxLength={20}
                  required
                />
                <FieldInput
                  label="Universitas"
                  id="universitas"
                  name="universitas"
                  type="text"
                  placeholder="Nama universitas / kampus"
                  defaultValue={data.universitas}
                  maxLength={100}
                  required
                />
                <FieldInput
                  label="Jurusan"
                  id="jurusan"
                  name="jurusan"
                  type="text"
                  placeholder="Contoh: Teknologi Informasi"
                  defaultValue={data.jurusan}
                  maxLength={100}
                  required
                />
                <FieldInput
                  label="Angkatan"
                  id="angkatan"
                  name="angkatan"
                  type="text"
                  inputMode="numeric"
                  placeholder="Contoh: 2024"
                  defaultValue={data.angkatan}
                  pattern="\d{4}"
                  title="Masukkan tahun angkatan 4 digit, contoh: 2024"
                  maxLength={4}
                  required
                />
                <FieldInput
                  label="No. WhatsApp"
                  id="whatsapp"
                  name="whatsapp"
                  type="tel"
                  placeholder="08xxxxxxxxxx"
                  defaultValue={data.whatsapp}
                  pattern="08\d{8,12}"
                  title="Contoh: 081234567890"
                  maxLength={15}
                  required
                />
                <FieldInput
                  label="Email"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="kamu@email.com"
                  defaultValue={data.email}
                  maxLength={100}
                  required
                />
                <div className="sm:col-span-2">
                  <button type="submit" className={`${primaryButton} w-full`}>
                    Lanjut
                  </button>
                </div>
              </form>
            )}

            {step === 1 && (
              <form className="grid gap-5" onSubmit={handleStepTwo}>
                <div>
                  <span className={labelClass}>Pilih Peminatan</span>
                  <div className="mt-1.5 grid gap-3 sm:grid-cols-2">
                    {divisions.map((division) => (
                      <label
                        key={division.title}
                        className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-3.5 transition-colors has-[:checked]:border-accent-500 has-[:checked]:bg-accent-50"
                      >
                        <input
                          type="radio"
                          name="peminatan"
                          value={division.title}
                          defaultChecked={data.peminatan === division.title}
                          required
                          className="mt-0.5 h-4 w-4 accent-accent-500"
                        />
                        <span className="flex flex-col gap-0.5">
                          <span className="text-sm font-medium text-navy-900">
                            {division.title}
                          </span>
                          <span className="text-xs text-slate-500">
                            {division.description}
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <FieldTextarea
                  label="Alasan Mengikuti"
                  id="alasan"
                  name="alasan"
                  rows={3}
                  placeholder="Ceritakan singkat alasanmu ingin bergabung..."
                  defaultValue={data.alasan}
                  maxLength={500}
                  required
                />

                <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    name="komitmen"
                    defaultChecked={data.komitmen}
                    className="h-4 w-4 accent-accent-500"
                  />
                  Saya berkomitmen mengikuti seluruh rangkaian kegiatan
                </label>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className={`${outlineButton} flex-1`}
                  >
                    Kembali
                  </button>
                  <button type="submit" className={`${primaryButton} flex-1`}>
                    Lanjut
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <div className="divide-y rounded-xl border border-slate-200">
                  {summary.map((item) => (
                    <div
                      className="flex items-center justify-between gap-4 px-4 py-3 text-sm"
                      key={item.label}
                    >
                      <span className="text-slate-500">{item.label}</span>
                      <span className="text-right font-medium text-navy-900">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className={`${outlineButton} flex-1`}
                  >
                    Kembali
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirm}
                    disabled={loading}
                    className={`${primaryButton} flex-1`}
                  >
                    {loading && (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    )}
                    {loading ? 'Mengirim...' : 'Kirim Pendaftaran'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
