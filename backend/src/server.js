import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.js'
import exerciseRoutes from './routes/exercises.js'
import planRoutes from './routes/plan.js'
import dietRoutes from './routes/diet.js'
import logRoutes from './routes/logs.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// ✅ Root route
app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Welcome to PeakFit API 🚀'
  })
})

// Health check
app.get('/api/health', (_req, res) =>
  res.json({
    ok: true,
    service: 'peakfit-api'
  })
)

app.use('/api/auth', authRoutes)
app.use('/api/exercises', exerciseRoutes)
app.use('/api/plan', planRoutes)
app.use('/api/diet', dietRoutes)
app.use('/api/logs', logRoutes)

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`PeakFit API running on http://localhost:${PORT}`)
})
