import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { supabase } from '@/lib/supabase'

interface GoogleSignInButtonProps {
  onError: (message: string) => void
}

export default function GoogleSignInButton({ onError }: GoogleSignInButtonProps) {
  const [loading, setLoading] = useState(false)

  async function signInWithGoogle() {
    setLoading(true)
    onError('')
    try {
      const callback = new URL(import.meta.env.BASE_URL, window.location.origin)
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: callback.toString() },
      })
      if (error) onError(error.message)
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Could not start Google sign-in. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full normal-case tracking-normal"
      onClick={signInWithGoogle}
      disabled={loading}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.09-1.92 3.27-4.74 3.27-8.1Z" />
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.65l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.15v2.84A11 11 0 0 0 12 23Z" />
        <path fill="#FBBC05" d="M5.84 14.11a6.6 6.6 0 0 1 0-4.22V7.05H2.15a11 11 0 0 0 0 9.9l3.69-2.84Z" />
        <path fill="#EA4335" d="M12 5.36c1.62 0 3.06.56 4.21 1.64l3.15-3.15A10.54 10.54 0 0 0 12 1 11 11 0 0 0 2.15 7.05l3.69 2.84c.87-2.6 3.3-4.53 6.16-4.53Z" />
      </svg>
      {loading ? 'Connecting to Google…' : 'Continue with Google'}
    </Button>
  )
}
