import { useState, type FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { api } from '@/lib/api'
import { useAuthStore } from '@/store/auth'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import GoogleSignInButton from '@/components/GoogleSignInButton'

export default function Login() {
  const navigate = useNavigate()
  const setSession = useAuthStore((s) => s.setSession)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const { data } = await api.post('/auth/login', { email, password })
      setSession(data.token, data.user, data.refreshToken)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-art-panel">
        <span className="eyebrow"><span className="status-dot" /> PEAKFIT / MEMBER ACCESS</span>
        <div className="auth-art-orbit" />
        <p className="auth-art-kicker">YOUR NEXT REP<br />STARTS HERE.</p>
        <span className="auth-art-index">PF—01 / KEEP CLIMBING</span>
      </div>
      <motion.div className="auth-form-panel" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="auth-intro"><span className="eyebrow">GOOD TO HAVE YOU BACK</span><h1 className="mt-3 font-display text-4xl tracking-tight">Welcome back<span className="text-volt">.</span></h1>
        <p className="mt-2 text-sm text-muted">Pick up where your work left off.</p></div>

        <Card className="mt-8 p-6">
          <GoogleSignInButton onError={setError} />
          <div className="my-5 flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-muted">
            <span className="h-px flex-1 bg-line" />
            <span>or use email</span>
            <span className="h-px flex-1 bg-line" />
          </div>
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="text-sm text-red-400">{error}</p>}
            <Button type="submit" disabled={loading} className="mt-2 w-full">
              {loading ? 'Logging in…' : 'Log In'}
            </Button>
          </form>
        </Card>

        <p className="mt-6 text-center text-sm text-muted">
          New here?{' '}
          <Link to="/signup" className="text-volt hover:underline">
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

