import type { AnchorHTMLAttributes, CSSProperties, ReactNode } from 'react'
import { WandSparkles } from 'lucide-react'

export type GlassmorphismCtaProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  label?: string
  avatarSrc?: string
  avatarAlt?: string
  spread?: string
  shimmerColor?: string
  speed?: string
  loading?: boolean
}

export default function GlassmorphismCta({
  label = 'Generate My Site',
  avatarSrc = '/logo-192.png',
  avatarAlt = 'Logo HMTI',
  spread = '90deg',
  shimmerColor = 'rgba(255,255,255,0.6)',
  speed = '4s',
  className,
  href = '#',
  onClick,
  loading = false,
  ...props
}: GlassmorphismCtaProps) {
  const style = {
    '--spread': spread,
    '--shimmer-color': shimmerColor,
    '--radius': '9999px',
    '--speed': speed,
    '--cut': '1px',
    '--bg': 'rgba(255, 255, 255, 0.05)',
  } as CSSProperties

  const content: ReactNode = (
    <>
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute inset-[-200%] h-[400%] w-[400%] animate-[rotate-gradient_var(--speed)_linear_infinite]">
          <div className="absolute inset-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))]" />
        </div>
      </div>
      <div className="absolute inset-[var(--cut)] rounded-full bg-[var(--bg)] backdrop-blur" aria-hidden="true" />
      <div className="relative z-10 flex w-full items-center gap-3 overflow-hidden px-4 py-3 text-base font-medium text-white sm:w-auto">
        <div
          className="absolute left-1/2 top-1/2 h-[200%] w-[200%] animate-[borderBeamRotation_4s_linear_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),rgba(255,255,255,0.2),rgba(255,255,255,0.2),rgba(255,255,255,0.2),transparent)]"
          aria-hidden="true"
        />
        <div className="absolute inset-px rounded-full bg-[rgba(10,11,20,0.8)] backdrop-blur-lg" aria-hidden="true" />
        <img
          src={avatarSrc}
          alt={avatarAlt}
          className="relative z-10 h-8 w-8 rounded-full object-cover ring-2 ring-white/10"
        />
        <span className="relative z-10 whitespace-nowrap font-sans">{label}</span>
        <span className="relative z-10 ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
          <WandSparkles className="h-4 w-6 text-white" strokeWidth={1.5} aria-hidden="true" />
        </span>
      </div>
    </>
  )
  const classNames = `group relative isolate inline-flex overflow-hidden rounded-full shadow-[0_8px_40px_rgba(129,140,248,0.25)] transition-all duration-300 ${loading ? '' : 'cursor-pointer hover:scale-105 hover:shadow-[0_0_40px_8px_rgba(129,140,248,0.35)]'} ${className ?? ''}`

  if (loading) {
    return (
      <div
        className={classNames}
        style={style}
      >
        {content}
      </div>
    )
  }

  return (
    <a
      href={href}
      onClick={(event) => {
        if (href === '#') event.preventDefault()
        onClick?.(event)
      }}
      className={classNames}
      style={style}
      {...props}
    >
      {content}
    </a>
  )
}
