import { createUserClient } from '../lib/supabase.js'

export async function requireAuth(req, res, next) {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'A valid Supabase access token is required' })
  }

  const accessToken = header.slice('Bearer '.length).trim()
  if (!accessToken) return res.status(401).json({ error: 'A valid Supabase access token is required' })

  try {
    const supabase = createUserClient(accessToken)
    const { data, error } = await supabase.auth.getUser(accessToken)
    if (error || !data.user) return res.status(401).json({ error: 'Invalid or expired session' })

    req.userId = data.user.id
    req.authUser = data.user
    req.supabase = supabase
    next()
  } catch (error) {
    next(error)
  }
}

