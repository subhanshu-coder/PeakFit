import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth'
import { supabase } from '@/lib/supabase'

async function exchangeOAuthCode() {
  const params = new URLSearchParams(window.location.search)
  const code = params.get('code')
  if (!code) throw new Error('Google sign-in did not return an authorization code. Please try again.')

  const { data, error } = await supabase.auth.exchangeCodeForSession(code)
  if (error) throw error
  if (!data.session) throw new Error('Could not complete Google sign-in. Please try again.')
  await supabase.auth.signOut()
  return data.session
}

let callbackSessionPromise: ReturnType<typeof exchangeOAuthCode> | null = null

export default function AuthCallback() {
  const navigate = useNavigate()
  const setSession = useAuthStore((state) => state.setSession)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    async function completeSignIn() {
      const params = new URLSearchParams(window.location.search)
      const providerError = params.get('error_description') || params.get('error')
      if (providerError) {
        if (active) setError(providerError.replaceAll('+', ' '))
        return
      }

      try {
        callbackSessionPromise ??= exchangeOAuthCode()
        const session = await callbackSessionPromise
        callbackSessionPromise = null
        if (!active) return

        const user = session.user
        setSession(session.access_token, {
          id: user.id,
          email: user.email || '',
          name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'Athlete',
        }, session.refresh_token)
        navigate('/dashboard', { replace: true })
      } catch (callbackError) {
        callbackSessionPromise = null
        if (active) setError(callbackError instanceof Error ? callbackError.message : 'Could not complete Google sign-in. Please try again.')
      }
    }

    void completeSignIn()
    return () => { active = false }
  }, [navigate, setSession])

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-6 py-16">
      <h1 className="font-display text-3xl tracking-tight">Finishing sign-in</h1>
      {error ? (
        <div className="mt-4 space-y-4">
          <p role="alert" className="text-sm text-red-400">{error}</p>
          <Link to="/login" className="text-sm text-volt hover:underline">Return to log in</Link>
        </div>
      ) : (
        <p className="mt-2 text-sm text-muted">Connecting your PeakFit account…</p>
      )}
    </div>
  )
}
