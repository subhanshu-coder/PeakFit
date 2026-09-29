import { Router } from 'express'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()
router.use(requireAuth)

function fromRow(row) {
  return { id: row.id, userId: row.user_id, day: row.day, entries: row.entries, date: row.performed_at }
}

function validEntries(entries) {
  return entries.length > 0 && entries.length <= 30 && entries.every((entry) =>
    entry !== null && typeof entry === 'object' &&
    typeof entry.exerciseName === 'string' && entry.exerciseName.trim().length > 0 &&
    Array.isArray(entry.sets) && entry.sets.length > 0 && entry.sets.length <= 20 &&
    entry.sets.every((set) => {
      if (set === null || typeof set !== 'object') return false
      const reps = Number(set.reps)
      const weight = Number(set.weight)
      return Number.isInteger(reps) && reps > 0 && Number.isFinite(weight) && weight >= 0
    })
  )
}

router.post('/', asyncHandler(async (req, res) => {
  const { day, entries } = req.body ?? {}
  if (typeof day !== 'string' || !day.trim() || day.length > 40 || !Array.isArray(entries) || !validEntries(entries)) {
    return res.status(400).json({ error: 'Provide a day and valid exercise entries with sets, reps and weight' })
  }

  const { data, error } = await req.supabase
    .from('workout_logs')
    .insert({ user_id: req.userId, day: day.trim(), entries })
    .select('id,user_id,day,entries,performed_at')
    .single()
  if (error) throw error
  res.status(201).json({ log: fromRow(data) })
}))

router.get('/', asyncHandler(async (req, res) => {
  const { data, error } = await req.supabase
    .from('workout_logs')
    .select('id,user_id,day,entries,performed_at')
    .eq('user_id', req.userId)
    .order('performed_at', { ascending: true })
  if (error) throw error
  res.json({ logs: data.map(fromRow) })
}))

router.get('/progress/:exerciseName', asyncHandler(async (req, res) => {
  const exerciseName = req.params.exerciseName.trim()
  if (!exerciseName || exerciseName.length > 100) return res.status(400).json({ error: 'Invalid exercise name' })

  const { data, error } = await req.supabase
    .from('workout_logs')
    .select('performed_at,entries')
    .eq('user_id', req.userId)
    .order('performed_at', { ascending: true })
  if (error) throw error

  const points = []
  for (const log of data) {
    const entry = log.entries.find((item) => item.exerciseName?.toLowerCase() === exerciseName.toLowerCase())
    if (!entry?.sets?.length) continue
    points.push({
      date: log.performed_at,
      maxWeight: Math.max(...entry.sets.map((set) => Number(set.weight) || 0)),
    })
  }
  res.json({ exerciseName, points })
}))

export default router

