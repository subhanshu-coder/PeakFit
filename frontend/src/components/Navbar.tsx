import { Link, useNavigate } from 'react-router-dom'
import { Dumbbell } from 'lucide-react'
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

  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-ink/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" data-cursor="home" className="flex items-center gap-2">
          <Dumbbell className="h-5 w-5 text-volt" />
          <span className="font-display text-xl tracking-wide">FitForge</span>
        </Link>

        {user && (
          <nav className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                data-cursor="view"
                className="font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-bone"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-3">
          {user ? (
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
    </header>
  )
}
