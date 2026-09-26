import { Router } from 'express'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { requireAuth } from '../middleware/auth.js'
import { calculatePlan } from '../utils/diet.js'

const router = Router()
router.use(requireAuth)

function fromRow(row) {
  return {
    id: row.id,
    userId: row.user_id,
    input: row.input,
    bmr: row.bmr,
    tdee: row.tdee,
    calories: row.calories,
    protein: row.protein,
    carbs: row.carbs,
    fat: row.fat,
    goal: row.goal,
    meals: row.meals,
    createdAt: row.created_at,
  }
}

router.post('/calculate', asyncHandler(async (req, res) => {
  const { sex, weightKg, heightCm, age, activity, goal } = req.body ?? {}
  const activities = ['sedentary', 'light', 'moderate', 'active', 'athlete']
  const goals = ['cut', 'maintain', 'bulk']
  const values = [weightKg, heightCm, age].map(Number)
  if (!['male', 'female'].includes(sex) || values.some((value) => !Number.isFinite(value) || value <= 0) || !activities.includes(activity) || !goals.includes(goal)) {
    return res.status(400).json({ error: 'Provide a valid sex, weight, height, age, activity and goal' })
  }

  const input = { sex, weightKg: values[0], heightCm: values[1], age: values[2], activity, goal }
  const result = calculatePlan(input)
  const { data, error } = await req.supabase
    .from('diet_plans')
    .insert({ user_id: req.userId, input, ...result })
    .select('id,user_id,input,bmr,tdee,calories,protein,carbs,fat,goal,meals,created_at')
    .single()
  if (error) throw error
  res.status(201).json({ diet: fromRow(data) })
}))

router.get('/latest', asyncHandler(async (req, res) => {
  const { data, error } = await req.supabase
    .from('diet_plans')
    .select('id,user_id,input,bmr,tdee,calories,protein,carbs,fat,goal,meals,created_at')
    .eq('user_id', req.userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()
  if (error) throw error
  if (!data) return res.status(404).json({ error: 'No diet plan yet' })
  res.json({ diet: fromRow(data) })
}))

export default router

