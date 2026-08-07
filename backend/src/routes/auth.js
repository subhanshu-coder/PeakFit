import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { nanoid } from 'nanoid'
import { db } from '../db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

function sign(userId) {
  return jwt.sign({ sub: userId }, process.env.JWT_SECRET || 'dev-secret', {
    expiresIn: '30d',
  })
}

function publicUser(user) {
  const { passwordHash, ...rest } = user
  return rest
}

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body ?? {}
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'name, email and password are required' })
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' })
  }
  const existing = db.find('users', (u) => u.email.toLowerCase() === email.toLowerCase())
  if (existing) {
    return res.status(409).json({ error: 'An account with that email already exists' })
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const user = {
    id: nanoid(),
    name,
    email,
    passwordHash,
    profile: null,
    createdAt: new Date().toISOString(),
  }
  db.insert('users', user)

  res.status(201).json({ token: sign(user.id), user: publicUser(user) })
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body ?? {}
  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' })
  }
  const user = db.find('users', (u) => u.email.toLowerCase() === email.toLowerCase())
  if (!user) return res.status(401).json({ error: 'Invalid email or password' })

  const valid = await bcrypt.compare(password, user.passwordHash)
  if (!valid) return res.status(401).json({ error: 'Invalid email or password' })

  res.json({ token: sign(user.id), user: publicUser(user) })
})

router.get('/me', requireAuth, (req, res) => {
  const user = db.find('users', (u) => u.id === req.userId)
  if (!user) return res.status(404).json({ error: 'User not found' })
  res.json({ user: publicUser(user) })
})

export default router
