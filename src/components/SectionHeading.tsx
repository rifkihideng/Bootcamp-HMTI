interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  dark?: boolean
  as?: 'h1' | 'h2'
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  dark = false,
  as: Heading = 'h2',
}: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span
        className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
          dark ? 'bg-white/10 text-accent-300' : 'bg-accent-100 text-accent-600'
        }`}
      >
        {eyebrow}
      </span>
      <Heading
        className={`mt-4 text-balance text-3xl font-bold sm:text-4xl ${
          dark ? 'text-white' : 'text-navy-900'
        }`}
      >
        {title}
      </Heading>
      {description && (
        <p className={`mt-4 text-balance ${dark ? 'text-slate-300' : 'text-slate-600'}`}>
          {description}
        </p>
      )}
    </div>
  )
}
