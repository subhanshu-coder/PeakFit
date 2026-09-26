import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Dumbbell, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useAuthStore } from '@/store/auth'
import { Button } from '@/components/ui/Button'

const LINKS = [
  { to: '/dashboard', label: 'Split' },
  { to: '/exercises', label: 'Exercises' },
  { to: '/diet', label: 'Diet' },
  { to: '/progress', label: 'Progress' },
]

export default function Navbar() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-ink/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" data-cursor="home" className="flex items-center gap-2">
          <Dumbbell className="h-5 w-5 text-volt" />
          <span className="font-display text-xl tracking-wide">PEAK<span className="text-volt">FIT</span></span>
        </Link>

        {user && (
          <nav className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                data-cursor="view"
                className={({ isActive }) => `font-mono text-xs uppercase tracking-wider transition-colors hover:text-bone ${isActive ? 'text-volt' : 'text-muted'}`}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-3">
          {user ? (
            <>
            <Button variant="ghost" size="sm" className="md:hidden" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                logout()
                navigate('/')
              }}
            >
              Log Out
            </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                Log In
              </Button>
              <Button size="sm" onClick={() => navigate('/signup')}>
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
      {user && menuOpen && <nav className="border-t border-line/60 px-6 py-3 md:hidden">{LINKS.map((l) => <NavLink key={l.to} to={l.to} onClick={() => setMenuOpen(false)} className={({isActive}) => `block py-3 font-mono text-xs uppercase tracking-wider ${isActive ? 'text-volt' : 'text-muted'}`}>{l.label}</NavLink>)}</nav>}
    </header>
  )
}

