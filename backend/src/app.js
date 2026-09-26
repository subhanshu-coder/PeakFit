import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { assertSupabaseConfig } from './lib/supabase.js'

import authRoutes from './routes/auth.js'
import exerciseRoutes from './routes/exercises.js'
import planRoutes from './routes/plan.js'
import dietRoutes from './routes/diet.js'
import logRoutes from './routes/logs.js'

const app = express()
const configuredOrigins = (process.env.FRONTEND_URL || 'http://localhost:3000,http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)
const vercelOrigins = [
  process.env.VERCEL_PROJECT_PRODUCTION_URL,
  process.env.VERCEL_URL,
  process.env.VERCEL_BRANCH_URL,
]
  .filter(Boolean)
  .map((host) => `https://${host}`)
const allowedOrigins = new Set([...configuredOrigins, ...vercelOrigins])

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) return callback(null, true)
    return callback(new Error('Origin is not allowed by CORS'))
  },
}))
app.use(express.json({ limit: '1mb' }))
app.use(morgan('dev'))

app.get('/', (_req, res) => res.json({ success: true, message: 'Welcome to PeakFit API' }))
app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'peakfit-api' }))

app.use('/api/auth', authRoutes)
app.use('/api/exercises', exerciseRoutes)
app.use('/api/plan', planRoutes)
app.use('/api/diet', dietRoutes)
app.use('/api/logs', logRoutes)

app.use((err, _req, res, _next) => {
  console.error(err.message || err)
  const status = Number(err.status || err.statusCode)
  const safeStatus = status >= 400 && status < 500 ? status : 500
  res.status(safeStatus).json({
    error: safeStatus === 500 ? 'Internal server error' : (err.message || 'Request failed'),
  })
})

assertSupabaseConfig()

export default app

