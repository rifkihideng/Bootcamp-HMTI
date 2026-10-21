import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { isPowerfulDevice } from '../utils/device'

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}

export default function Reveal({ children, delay = 0, y = 28, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Perangkat lemah: animasi CSS murni (ringan)
    if (!isPowerfulDevice) {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              el.classList.add('is-visible')
              observer.disconnect()
            }
          }
        },
        { threshold: 0.12 },
      )
      observer.observe(el)
      return () => observer.disconnect()
    }

    // Perangkat kuat: GSAP (dimuat on-demand, tidak memblokir halaman)
    let disposed = false
    let cleanup: (() => void) | undefined

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
      .then(([gsapMod, stMod]) => {
        if (disposed || !el.isConnected) return
        const gsap = gsapMod.default
        gsap.registerPlugin(stMod.ScrollTrigger)
        const tween = gsap.fromTo(
          el,
          { autoAlpha: 0, y },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            delay,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          },
        )
        cleanup = () => {
          tween.scrollTrigger?.kill()
          tween.kill()
        }
      })
      .catch(() => {
        if (disposed || !el.isConnected) return
        el.style.opacity = '1'
        el.style.visibility = 'visible'
        el.style.transform = 'none'
      })

    return () => {
      disposed = true
      cleanup?.()
    }
  }, [delay, y])

  const style: CSSProperties = isPowerfulDevice
    ? { opacity: 0, visibility: 'hidden' }
    : ({
        '--reveal-y': `${y}px`,
        transitionDelay: delay ? `${delay}s` : undefined,
      } as CSSProperties)

  return (
    <div
      ref={ref}
      className={`${isPowerfulDevice ? '' : 'reveal'} ${className ?? ''}`}
      style={style}
    >
      {children}
    </div>
  )
}


