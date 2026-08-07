import { Router } from 'express'
import { nanoid } from 'nanoid'
import { db } from '../db.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
router.use(requireAuth)

router.post('/', (req, res) => {
  const { day, entries } = req.body ?? {}
  if (!day || !Array.isArray(entries)) {
    return res.status(400).json({ error: 'day and entries[] are required' })
  }
  const log = {
    id: nanoid(),
    userId: req.userId,
    day,
    entries, // [{ exerciseId, exerciseName, sets: [{ reps, weight }] }]
    date: new Date().toISOString(),
  }
  db.insert('logs', log)
  res.status(201).json({ log })
})

router.get('/', (req, res) => {
  const logs = db
    .filter('logs', (l) => l.userId === req.userId)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
  res.json({ logs })
})

// Aggregate: best weight lifted per exercise per day, useful for progress charts
router.get('/progress/:exerciseName', (req, res) => {
  const { exerciseName } = req.params
  const logs = db.filter('logs', (l) => l.userId === req.userId)

  const points = []
  for (const log of logs) {
    const entry = log.entries.find(
      (e) => e.exerciseName.toLowerCase() === exerciseName.toLowerCase()
    )
    if (!entry) continue
    const maxWeight = Math.max(...entry.sets.map((s) => Number(s.weight) || 0))
    points.push({ date: log.date, maxWeight })
  }
  res.json({ exerciseName, points })
})

export default router
