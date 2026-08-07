import { Router } from 'express'
import { nanoid } from 'nanoid'
import { db } from '../db.js'
import { requireAuth } from '../middleware/auth.js'
import { calculatePlan } from '../utils/diet.js'

const router = Router()
router.use(requireAuth)

router.post('/calculate', (req, res) => {
  const { sex, weightKg, heightCm, age, activity, goal } = req.body ?? {}
  if (!sex || !weightKg || !heightCm || !age || !activity || !goal) {
    return res.status(400).json({
      error: 'sex, weightKg, heightCm, age, activity and goal are required',
    })
  }

  const result = calculatePlan({
    sex,
    weightKg: Number(weightKg),
    heightCm: Number(heightCm),
    age: Number(age),
    activity,
    goal,
  })

  const diet = {
    id: nanoid(),
    userId: req.userId,
    input: { sex, weightKg, heightCm, age, activity, goal },
    ...result,
    createdAt: new Date().toISOString(),
  }
  db.insert('diets', diet)
  res.status(201).json({ diet })
})

router.get('/latest', (req, res) => {
  const diets = db.filter('diets', (d) => d.userId === req.userId)
  const latest = diets.at(-1)
  if (!latest) return res.status(404).json({ error: 'No diet plan yet' })
  res.json({ diet: latest })
})

export default router
