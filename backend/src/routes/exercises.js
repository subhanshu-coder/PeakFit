import { Router } from 'express'
import { EXERCISES, MUSCLES } from '../data/exercises.js'

const router = Router()

router.get('/', (req, res) => {
  const { muscle } = req.query
  if (muscle !== undefined && typeof muscle !== 'string') return res.status(400).json({ error: 'muscle must be a single value' })
  if (muscle && !MUSCLES.includes(muscle)) return res.status(400).json({ error: 'Unknown muscle group' })
  const list = muscle ? EXERCISES.filter((e) => e.muscle === muscle) : EXERCISES
  res.json({ exercises: list })
})

router.get('/muscles', (_req, res) => {
  res.json({ muscles: MUSCLES })
})

export default router
