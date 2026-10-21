import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { navLinks, org } from '../data/content'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  function goToSection(href: string) {
    setOpen(false)
    const id = href.replace('#', '')
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/', { state: { scrollTo: id } })
    }
  }

  const sectionLinkClass =
    'rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white'

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-navy-950/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo-192.png"
            alt="Logo HMTI"
            className="h-9 w-9 rounded-lg object-contain"
          />
          <span className="text-lg font-bold text-white">
            {org.shortName}{' '}
            <span className="text-accent-400">Bootcamp</span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => goToSection(link.href)}
              className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/cek-status"
            className="rounded-lg border border-white/20 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Cek Status
          </Link>
          <Link
            to="/daftar"
            className="rounded-lg bg-accent-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
          >
            Daftar
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="rounded-md p-2 text-slate-300 hover:bg-white/10 hover:text-white md:hidden"
          aria-label="Buka menu navigasi"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div
          className="border-t border-white/10 bg-navy-950 px-4 pb-5 md:hidden"
          style={{ animation: 'menu-in 0.25s ease-out' }}
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link, index) => (
              <button
                key={link.href}
                type="button"
                onClick={() => goToSection(link.href)}
                className={sectionLinkClass}
                style={{
                  animation: 'menu-item-in 0.3s ease-out both',
                  animationDelay: `${index * 40}ms`,
                }}
              >
                {link.label}
              </button>
            ))}

            <Link
              to="/cek-status"
              onClick={() => setOpen(false)}
              className={sectionLinkClass}
              style={{
                animation: 'menu-item-in 0.3s ease-out both',
                animationDelay: `${navLinks.length * 40}ms`,
              }}
            >
              Cek Status
            </Link>

            <Link
              to="/daftar"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-lg bg-accent-500 px-3 py-2.5 text-center text-sm font-semibold text-white"
              style={{
                animation: 'menu-item-in 0.3s ease-out both',
                animationDelay: `${(navLinks.length + 1) * 40}ms`,
              }}
            >
              Daftar
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
