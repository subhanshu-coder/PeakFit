import { Router } from 'express'
import { nanoid } from 'nanoid'
import { db } from '../db.js'
import { requireAuth } from '../middleware/auth.js'
import { EXERCISES } from '../data/exercises.js'
import { SPLIT_TEMPLATES, DAY_ORDER } from '../data/splitTemplates.js'

const router = Router()
router.use(requireAuth)

function exercisesFor(muscles, perMuscle = 2) {
  const picked = []
  for (const muscle of muscles) {
    const pool = EXERCISES.filter((e) => e.muscle === muscle)
    picked.push(...pool.slice(0, perMuscle))
  }
  return picked
}

router.get('/templates', (_req, res) => {
  const templates = Object.entries(SPLIT_TEMPLATES).map(([key, t]) => ({
    key,
    label: t.label,
    description: t.description,
  }))
  res.json({ templates })
})

router.get('/', (req, res) => {
  const plan = db.find(
    'plans',
    (p) => p.userId === req.userId && p.id === db.filter('plans', (x) => x.userId === req.userId).at(-1)?.id
  )
  if (!plan) return res.status(404).json({ error: 'No plan yet — generate one first' })
  res.json({ plan })
})

router.post('/generate', (req, res) => {
  const { splitType = 'ppl_2x' } = req.body ?? {}
  const template = SPLIT_TEMPLATES[splitType]
  if (!template) return res.status(400).json({ error: 'Unknown splitType' })

  const days = DAY_ORDER.map((day) => {
    const dayDef = template.days[day]
    return {
      day,
      label: dayDef.label,
      muscles: dayDef.muscles,
      exercises: exercisesFor(dayDef.muscles),
    }
  })

  const plan = {
    id: nanoid(),
    userId: req.userId,
    splitType,
    label: template.label,
    days,
    createdAt: new Date().toISOString(),
  }
  db.insert('plans', plan)
  res.status(201).json({ plan })
})

// Customize a single day: override its muscle list and/or exercises
router.patch('/:planId/day/:day', (req, res) => {
  const { planId, day } = req.params
  const { muscles, exerciseIds } = req.body ?? {}

  const plans = db.get('plans')
  const plan = plans.find((p) => p.id === planId && p.userId === req.userId)
  if (!plan) return res.status(404).json({ error: 'Plan not found' })

  const dayEntry = plan.days.find((d) => d.day === day)
  if (!dayEntry) return res.status(404).json({ error: 'Day not found in plan' })

  if (Array.isArray(muscles)) {
    dayEntry.muscles = muscles
    dayEntry.exercises = exercisesFor(muscles)
  }
  if (Array.isArray(exerciseIds)) {
    dayEntry.exercises = EXERCISES.filter((e) => exerciseIds.includes(e.id))
  }

  db.update('plans', plan.id, { days: plan.days })
  res.json({ plan })
})

export default router
