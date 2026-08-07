import { Router } from 'express'
import { EXERCISES, MUSCLES } from '../data/exercises.js'

const router = Router()

router.get('/', (req, res) => {
  const { muscle } = req.query
  const list = muscle ? EXERCISES.filter((e) => e.muscle === muscle) : EXERCISES
  res.json({ exercises: list })
})

router.get('/muscles', (_req, res) => {
  res.json({ muscles: MUSCLES })
})

export default router
