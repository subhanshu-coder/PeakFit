import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Apple, BarChart3, Dumbbell, LayoutDashboard, LogOut, Menu, Settings2, Sparkles, X } from 'lucide-react'
import { useState } from 'react'
import { useAuthStore } from '@/store/auth'
import { Button } from '@/components/ui/Button'

const LINKS = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/split-builder', label: 'My training', icon: Dumbbell },
  { to: '/exercises', label: 'Movement library', icon: BarChart3 },
  { to: '/diet', label: 'Nutrition', icon: Apple },
  { to: '/progress', label: 'Progress', icon: BarChart3 },
]

export default function Navbar() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className={`peak-nav ${user ? 'workspace-header' : 'sticky top-0 z-40'}`}>
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 md:px-10">
          <Link to={user ? '/dashboard' : '/'} data-cursor="home" className="flex items-center gap-2.5">
            <span className="brand-symbol"><Dumbbell className="h-4 w-4" /></span>
            <span className="font-display text-[19px] font-bold tracking-[-0.06em]">PEAK<span className="text-volt">FIT</span><sup className="ml-0.5 text-[8px] text-muted">®</sup></span>
          </Link>
          {!user && <span className="hidden font-mono text-[9px] tracking-[0.18em] text-muted lg:block">TRAINING, DESIGNED AROUND YOU</span>}
          {user && <nav className="workspace-links hidden items-center gap-8 md:flex">{LINKS.map((l) => <NavLink key={l.to} to={l.to} className={({ isActive }) => `font-mono text-[10px] uppercase tracking-[0.16em] transition-colors hover:text-bone ${isActive ? 'text-volt' : 'text-muted'}`}>{l.label}</NavLink>)}</nav>}
          <div className="flex items-center gap-3">
            {user ? <>
              <Button variant="ghost" size="sm" className="md:hidden" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}</Button>
              <Button variant="outline" size="sm" className="workspace-signout" onClick={() => { logout(); navigate('/') }}>Log Out</Button>
            </> : <><Button variant="ghost" size="sm" onClick={() => navigate('/login')}>Log In</Button><Button size="sm" onClick={() => navigate('/signup')}>Get Started</Button></>}
          </div>
        </div>
        {user && menuOpen && <nav className="workspace-mobile-nav border-t border-line/60 px-6 py-3 md:hidden">{LINKS.map((l) => <NavLink key={l.to} to={l.to} onClick={() => setMenuOpen(false)} className={({isActive}) => `block py-3 font-mono text-xs uppercase tracking-wider ${isActive ? 'text-volt' : 'text-muted'}`}><l.icon className="mr-2 inline h-4 w-4" />{l.label}</NavLink>)}</nav>}
      </header>
      {user && <aside className="workspace-sidebar" aria-label="Training workspace navigation">
        <Link to="/dashboard" className="workspace-side-brand"><span className="brand-symbol"><Dumbbell className="h-4 w-4" /></span><span>PEAK<span>FIT</span><sup>®</sup></span><small>PERFORMANCE OS</small></Link>
        <div className="workspace-side-label">YOUR SPACE</div>
        <nav>{LINKS.map((l) => <NavLink key={l.to} to={l.to} className={({isActive}) => `workspace-side-link ${isActive ? 'active' : ''}`}><l.icon size={17} strokeWidth={1.8} /><span>{l.label}</span></NavLink>)}</nav>
        <Link to="/split-builder" className="workspace-plan-card"><span className="plan-spark"><Sparkles size={14} /></span><strong>Make it yours</strong><small>Tune your week around the way you move.</small><span className="plan-card-link">EDIT YOUR PLAN <Settings2 size={12} /></span></Link>
        <div className="workspace-user"><span className="workspace-avatar">{user.name.slice(0,1).toUpperCase()}</span><span className="workspace-user-meta"><strong>{user.name.split(' ')[0]}</strong><small>MEMBER</small></span><button aria-label="Log out" onClick={() => { logout(); navigate('/') }}><LogOut size={16} /></button></div>
      </aside>}
    </>
  )
}
