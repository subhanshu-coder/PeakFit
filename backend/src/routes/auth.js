import { Router } from 'express'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { requireAuth } from '../middleware/auth.js'
import { createPublicClient } from '../lib/supabase.js'

const router = Router()

function publicUser(user) {
  return {
    id: user.id,
    email: user.email,
    name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'Athlete',
  }
}

router.post('/register', asyncHandler(async (req, res) => {
  const { name, email, password } = req.body ?? {}
  if (typeof name !== 'string' || !name.trim() || typeof email !== 'string' || !email.trim() || typeof password !== 'string') {
    return res.status(400).json({ error: 'name, email and password are required' })
  }
  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' })
  }

  const { data, error } = await createPublicClient().auth.signUp({
    email: email.trim(),
    password,
    options: { data: { full_name: name.trim() } },
  })
  if (error) return res.status(error.status || 400).json({ error: error.message })

  res.status(201).json({
    token: data.session?.access_token ?? null,
    refreshToken: data.session?.refresh_token ?? null,
    user: data.user ? publicUser(data.user) : null,
    requiresEmailConfirmation: !data.session,
  })
}))

router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body ?? {}
  if (typeof email !== 'string' || !email.trim() || typeof password !== 'string' || !password) {
    return res.status(400).json({ error: 'email and password are required' })
  }

  const { data, error } = await createPublicClient().auth.signInWithPassword({
    email: email.trim(),
    password,
  })
  if (error) return res.status(error.status || 401).json({ error: error.message })

  res.json({ token: data.session.access_token, refreshToken: data.session.refresh_token, user: publicUser(data.user) })
}))

router.post('/refresh', asyncHandler(async (req, res) => {
  const { refreshToken } = req.body ?? {}
  if (typeof refreshToken !== 'string' || !refreshToken) {
    return res.status(400).json({ error: 'refreshToken is required' })
  }
  const { data, error } = await createPublicClient().auth.refreshSession({ refresh_token: refreshToken })
  if (error || !data.session) return res.status(401).json({ error: 'Session expired. Please sign in again.' })
  res.json({
    token: data.session.access_token,
    refreshToken: data.session.refresh_token,
    user: publicUser(data.user),
  })
}))

router.get('/me', requireAuth, (req, res) => {
  res.json({ user: publicUser(req.authUser) })
})

export default router

