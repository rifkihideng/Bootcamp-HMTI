import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { contact, navLinks, org } from '../data/content'

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .595.045.88.134V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.72 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.76-.1z" />
    </svg>
  )
}

export default function Footer() {
  const navigate = useNavigate()
  const location = useLocation()

  function goToSection(href: string) {
    const id = href.replace('#', '')
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/', { state: { scrollTo: id } })
    }
  }

  return (
    <footer className="border-t border-white/10 bg-gradient-to-b from-navy-900 to-navy-950 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2 lg:col-span-2">
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
          <p className="mt-4 max-w-sm text-sm">{org.description}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Menu
          </h3>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  type="button"
                  onClick={() => goToSection(link.href)}
                  className="text-sm transition-colors hover:text-white"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Tautan
          </h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link to="/daftar" className="text-sm transition-colors hover:text-white">
                Daftar
              </Link>
            </li>
            <li>
              <Link to="/pengumuman" className="text-sm transition-colors hover:text-white">
                Pengumuman
              </Link>
            </li>
            <li>
              <Link to="/cek-status" className="text-sm transition-colors hover:text-white">
                Cek Status
              </Link>
            </li>
            <li>
              <Link to="/galeri" className="text-sm transition-colors hover:text-white">
                Galeri
              </Link>
            </li>
            <li>
              <Link to="/merchandise" className="text-sm transition-colors hover:text-white">
                Merchandise
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Kontak
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-accent-400" />
              <a
                href={`mailto:${contact.email}`}
                className="break-all hover:text-white"
              >
                {contact.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <InstagramIcon className="h-4 w-4 shrink-0 text-accent-400" />
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                {contact.instagramLabel}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <TikTokIcon className="h-4 w-4 shrink-0 text-accent-400" />
              <a
                href={contact.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                {contact.tiktokLabel}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-5 text-center text-sm text-slate-400 sm:px-6">
          <p>
            © 2026 {org.fullName} ({org.shortName}). Hak cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  )
}
