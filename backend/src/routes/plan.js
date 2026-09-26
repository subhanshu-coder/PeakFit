import { Router } from 'express'
import { EXERCISES } from '../data/exercises.js'
import { SPLIT_TEMPLATES, DAY_ORDER } from '../data/splitTemplates.js'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
router.use(requireAuth)

function exercisesFor(muscles, perMuscle = 2) {
  return muscles.flatMap((muscle) => EXERCISES.filter((exercise) => exercise.muscle === muscle).slice(0, perMuscle))
}

function fromRow(row) {
  return {
    id: row.id,
    userId: row.user_id,
    splitType: row.split_type,
    label: row.label,
    days: row.days,
    createdAt: row.created_at,
  }
}

router.get('/templates', (_req, res) => {
  const templates = Object.entries(SPLIT_TEMPLATES).map(([key, template]) => ({
    key,
    label: template.label,
    description: template.description,
  }))
  res.json({ templates })
})

router.get('/', asyncHandler(async (req, res) => {
  const { data, error } = await req.supabase
    .from('workout_plans')
    .select('id,user_id,split_type,label,days,created_at')
    .eq('user_id', req.userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()
  if (error) throw error
  if (!data) return res.status(404).json({ error: 'No plan yet — generate one first' })
  res.json({ plan: fromRow(data) })
}))

router.post('/generate', asyncHandler(async (req, res) => {
  const { splitType = 'ppl_2x' } = req.body ?? {}
  const template = SPLIT_TEMPLATES[splitType]
  if (!template) return res.status(400).json({ error: 'Unknown splitType' })

  const days = DAY_ORDER.map((day) => {
    const definition = template.days[day]
    return {
      day,
      label: definition.label,
      muscles: definition.muscles,
      exercises: exercisesFor(definition.muscles),
    }
  })
  const { data, error } = await req.supabase
    .from('workout_plans')
    .insert({ user_id: req.userId, split_type: splitType, label: template.label, days })
    .select('id,user_id,split_type,label,days,created_at')
    .single()
  if (error) throw error
  res.status(201).json({ plan: fromRow(data) })
}))

router.patch('/:planId/day/:day', asyncHandler(async (req, res) => {
  const { planId, day } = req.params
  const { muscles, exerciseIds } = req.body ?? {}
  if (muscles !== undefined && (!Array.isArray(muscles) || muscles.some((muscle) => typeof muscle !== 'string'))) {
    return res.status(400).json({ error: 'muscles must be an array of muscle names' })
  }
  if (exerciseIds !== undefined && (!Array.isArray(exerciseIds) || exerciseIds.some((id) => !Number.isInteger(id)))) {
    return res.status(400).json({ error: 'exerciseIds must be an array of exercise IDs' })
  }

  const { data: row, error: readError } = await req.supabase
    .from('workout_plans')
    .select('id,user_id,split_type,label,days,created_at')
    .eq('id', planId)
    .eq('user_id', req.userId)
    .maybeSingle()
  if (readError) throw readError
  if (!row) return res.status(404).json({ error: 'Plan not found' })

  const plan = fromRow(row)
  const dayEntry = plan.days.find((entry) => entry.day === day)
  if (!dayEntry) return res.status(404).json({ error: 'Day not found in plan' })
  if (Array.isArray(muscles)) {
    dayEntry.muscles = muscles
    dayEntry.exercises = exercisesFor(muscles)
  }
  if (Array.isArray(exerciseIds)) {
    dayEntry.exercises = EXERCISES.filter((exercise) => exerciseIds.includes(exercise.id))
  }

  const { data: updated, error } = await req.supabase
    .from('workout_plans')
    .update({ days: plan.days })
    .eq('id', planId)
    .eq('user_id', req.userId)
    .select('id,user_id,split_type,label,days,created_at')
    .single()
  if (error) throw error
  res.json({ plan: fromRow(updated) })
}))

export default router

